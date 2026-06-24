const EMPTY = { type: "FeatureCollection", features: [] };

export class GlmController {
  constructor({ config = {}, map = () => null, targetTime = () => new Date(), toast = () => {}, onStatus = () => {}, staticPreview = false } = {}) {
    const satellite = config.satellite || "goes18";
    const cores = Math.max(2, Number(navigator.hardwareConcurrency || 4));
    this.config = {
      enabledByDefault: false,
      satellite,
      bucket: config.bucket || `https://noaa-${satellite}.s3.amazonaws.com`,
      decoderUrl: "./vendor/h5wasm/hdf5_hl.js",
      decoderFallbackUrl: "https://cdn.jsdelivr.net/npm/h5wasm@0.10.3/dist/esm/hdf5_hl.js",
      windowMinutes: 5,
      maxFiles: 30,
      maxPoints: 12000,
      fetchConcurrency: cores <= 4 ? 2 : 3,
      bounds: [-170, 10, -50, 70],
      ...config,
    };
    this.config.fetchConcurrency = Math.max(1, Math.min(3, Number(this.config.fetchConcurrency) || 2));
    this.config.maxPoints = Math.max(1000, Math.min(30000, Number(this.config.maxPoints) || 12000));
    this.mapGetter = map;
    this.targetTimeGetter = targetTime;
    this.toast = toast;
    this.onStatus = onStatus;
    this.staticPreview = staticPreview;
    this.enabled = Boolean(this.config.enabledByDefault);
    this.windowMinutes = Number(this.config.windowMinutes) || 5;
    this.fullWindowMinutes = this.windowMinutes;
    this.profile = "full";
    this.target = new Date();
    this.live = true;
    this.followLatest = true;
    this.generation = 0;
    this.worker = null;
    this.pending = new Map();
    this.sequence = 0;
    this.granuleCache = new Map();
    this.listingCache = new Map();
    this.timer = null;
    this.syncTimer = null;
    this.abortController = null;
    this.points = [];
    this.bytes = 0;
    this.ui = {
      toggle: document.getElementById("lightningToggle"),
      window: document.getElementById("lightningWindow"),
      pill: document.getElementById("lightningPill"),
      status: document.getElementById("conditionLightning"),
      preview: document.getElementById("lightningPreviewLayer"),
    };
    this.bind();
    this.syncUi("Off");
  }

  bind() {
    if (this.ui.toggle) {
      this.ui.toggle.checked = this.enabled;
      this.ui.toggle.addEventListener("change", () => this.setEnabled(this.ui.toggle.checked));
    }
    if (this.ui.window) {
      this.ui.window.value = String(this.windowMinutes);
      this.ui.window.addEventListener("change", () => {
        this.windowMinutes = Math.max(1, Math.min(10, Number(this.ui.window.value) || 5));
        if (this.profile !== "low") this.fullWindowMinutes = this.windowMinutes;
        if (this.enabled) this.queueRefresh(0);
      });
    }
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && this.enabled) this.queueRefresh(0);
      this.schedule();
    });
  }

  setProfile(profile) {
    const next = profile === "low" ? "low" : "full";
    if (this.profile === next) return;
    if (next === "low") {
      this.fullWindowMinutes = this.windowMinutes || this.fullWindowMinutes || 5;
      this.windowMinutes = 1;
    } else {
      this.windowMinutes = this.fullWindowMinutes || 5;
    }
    this.profile = next;
    if (this.ui.window) {
      this.ui.window.value = String(this.windowMinutes);
      this.ui.window.disabled = next === "low";
      this.ui.window.title = next === "low" ? "Low Data fixes GLM to a one-minute window" : "GLM history window";
    }
    this.trimCache();
    if (this.enabled) this.queueRefresh(0);
  }

  effectiveWindowMinutes() {
    return this.profile === "low" ? Math.min(1, this.windowMinutes) : this.windowMinutes;
  }

  effectiveFileLimit() {
    const requested = this.effectiveWindowMinutes() * 3 + 2;
    const configured = Math.max(3, Number(this.config.maxFiles) || 30);
    return this.profile === "low" ? Math.min(4, configured) : Math.min(requested, configured);
  }

  effectiveMaxPoints() {
    const configured = Math.max(1000, Number(this.config.maxPoints) || 12000);
    return this.profile === "low" ? Math.min(2000, configured) : Math.min(8000, configured);
  }

  granuleCacheLimit() {
    if (this.profile === "low") return 12;
    return Math.max(2, Number(navigator.hardwareConcurrency || 4)) <= 4 ? 24 : 40;
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (this.ui.toggle) this.ui.toggle.checked = this.enabled;
    if (!this.enabled) {
      this.generation += 1;
      clearTimeout(this.syncTimer);
      clearTimeout(this.timer);
      this.abortController?.abort();
      this.abortController = null;
      this.stopWorker("GLM disabled");
      this.points = [];
      this.bytes = 0;
      this.updateMap(EMPTY);
      this.renderPreview([]);
      this.syncUi("Off");
      return;
    }
    this.queueRefresh(0);
    this.schedule();
  }

  sync(time, { live = true, followLatest = true } = {}) {
    const parsed = time instanceof Date ? time : new Date(time || Date.now());
    if (!Number.isNaN(parsed.getTime())) this.target = parsed;
    this.live = Boolean(live);
    this.followLatest = Boolean(followLatest);
    this.schedule();
    if (this.enabled) this.queueRefresh(this.live && this.followLatest ? 80 : 180);
  }

  queueRefresh(delay = 120) {
    clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => this.refresh(), Math.max(0, delay));
  }

  mapReady() {
    this.ensureLayers();
    if (this.enabled && this.points.length) this.updateMap(this.featureCollection(this.points));
  }

  async refresh() {
    if (!this.enabled || document.hidden) return;
    const generation = ++this.generation;
    this.abortController?.abort();
    const controller = new AbortController();
    this.abortController = controller;
    const target = this.live && this.followLatest ? new Date() : new Date(this.targetTimeGetter?.() || this.target);
    this.target = target;
    this.syncUi("Loading");
    try {
      if (this.staticPreview || location.protocol === "file:") {
        const points = this.syntheticPoints(target);
        if (generation !== this.generation) return;
        this.points = points;
        this.bytes = 0;
        this.updateMap(this.featureCollection(points, target));
        this.renderPreview(points);
        this.syncUi(`${points.length} flashes`);
        return;
      }

      const windowMinutes = this.effectiveWindowMinutes();
      const start = new Date(target.getTime() - windowMinutes * 60_000);
      const keys = await this.keysForWindow(start, target, controller.signal);
      if (generation !== this.generation) return;
      const selected = keys.slice(-this.effectiveFileLimit()).reverse();
      this.bytes = 0;
      if (!selected.length) {
        this.points = [];
        this.updateMap(EMPTY);
        this.syncUi("No flashes");
        return;
      }

      const decodedSets = [];
      const loadGranule = async (key) => {
        if (generation !== this.generation) throw abortError();
        const cached = this.granuleCache.get(key);
        if (cached) {
          this.granuleCache.delete(key);
          this.granuleCache.set(key, cached);
          return cached.points;
        }
        const response = await fetch(`${this.config.bucket}/${key}`, {
          mode: "cors",
          cache: this.live ? "no-store" : "force-cache",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`GLM file request returned ${response.status}`);
        const buffer = await response.arrayBuffer();
        this.bytes += buffer.byteLength;
        const points = await this.decode(key, buffer);
        if (generation !== this.generation) throw abortError();
        this.granuleCache.set(key, { points, bytes: buffer.byteLength });
        this.trimCache();
        return points;
      };

      // Time to first lightning: decode and paint the newest available 20-second
      // granule first. A malformed just-published object must not prevent the
      // controller from falling back to the preceding granule.
      let firstLoadedIndex = -1;
      let skippedFiles = 0;
      for (let index = 0; index < selected.length; index += 1) {
        try {
          decodedSets.push(await loadGranule(selected[index]));
          firstLoadedIndex = index;
          break;
        } catch (error) {
          if (error?.name === "AbortError" || generation !== this.generation) throw error;
          skippedFiles += 1;
          console.warn("Skipping unreadable GLM granule", selected[index], error);
        }
      }
      if (firstLoadedIndex < 0) throw new Error("No readable GLM granules were available");
      if (generation !== this.generation) return;
      this.commitPoints(decodedSets, start, target, windowMinutes);
      this.syncUi(`${this.points.length} flashes · loading window`);

      // Backfill older granules serially. This keeps only one NetCDF buffer in
      // flight and avoids oversubscribing the single HDF5 worker on modest
      // laptops. Individual bad granules are skipped without discarding the
      // already-visible window.
      for (let index = firstLoadedIndex + 1; index < selected.length; index += 1) {
        try {
          decodedSets.push(await loadGranule(selected[index]));
        } catch (error) {
          if (error?.name === "AbortError" || generation !== this.generation) throw error;
          skippedFiles += 1;
          console.warn("Skipping unreadable GLM granule", selected[index], error);
          continue;
        }
        if (generation !== this.generation) return;
        if (index % 3 === 0 || index === selected.length - 1) {
          this.commitPoints(decodedSets, start, target, windowMinutes);
          this.syncUi(`${this.points.length} flashes · ${index + 1}/${selected.length}`);
        }
      }

      if (generation !== this.generation) return;
      this.commitPoints(decodedSets, start, target, windowMinutes);
      this.renderPreview([]);
      const skipped = skippedFiles ? ` · ${skippedFiles} skipped` : "";
      this.syncUi(`${this.points.length} flashes${this.bytes ? ` · ${formatBytes(this.bytes)}` : ""}${skipped}`);
    } catch (error) {
      if (generation !== this.generation || error?.name === "AbortError") return;
      console.warn("GLM layer refresh failed", error);
      this.syncUi("Unavailable", true);
    }
  }

  commitPoints(decodedSets, start, target, windowMinutes) {
    const minTime = start.getTime();
    const maxTime = target.getTime() + 30_000;
    let points = decodedSets.flat().filter((point) => point.time >= minTime && point.time <= maxTime);
    points.sort((a, b) => a.time - b.time);
    const pointLimit = this.effectiveMaxPoints();
    if (points.length > pointLimit) points = evenlySample(points, pointLimit);
    this.points = points;
    this.updateMap(this.featureCollection(points, target, windowMinutes));
  }

  schedule() {
    clearTimeout(this.timer);
    if (!this.enabled || !this.live) return;
    this.timer = setTimeout(() => {
      if (!document.hidden && this.followLatest) this.queueRefresh(0);
      this.schedule();
    }, 20_000);
  }

  async keysForWindow(start, end, signal) {
    const prefixes = new Set();
    let cursor = new Date(start);
    cursor.setUTCMinutes(0, 0, 0);
    while (cursor <= end) {
      const year = cursor.getUTCFullYear();
      const doy = dayOfYear(cursor);
      const hour = String(cursor.getUTCHours()).padStart(2, "0");
      prefixes.add(`GLM-L2-LCFA/${year}/${String(doy).padStart(3, "0")}/${hour}/`);
      cursor = new Date(cursor.getTime() + 3_600_000);
    }
    const listings = await mapPool([...prefixes], Math.min(2, this.config.fetchConcurrency), (prefix) => this.listPrefix(prefix, signal));
    return [...new Set(listings.flat())]
      .map((key) => ({ key, time: granuleStart(key)?.getTime() ?? 0 }))
      .filter((item) => item.time >= start.getTime() - 30_000 && item.time <= end.getTime() + 30_000)
      .sort((a, b) => a.time - b.time)
      .map((item) => item.key);
  }

  async listPrefix(prefix, signal) {
    const cached = this.listingCache.get(prefix);
    if (cached && (!this.live || Date.now() - cached.time < 15_000)) return cached.keys;
    const url = `${this.config.bucket}/?list-type=2&prefix=${encodeURIComponent(prefix)}`;
    const response = await fetch(url, { mode: "cors", cache: this.live ? "no-store" : "force-cache", signal });
    if (!response.ok) throw new Error(`GLM listing returned ${response.status}`);
    const xml = new DOMParser().parseFromString(await response.text(), "application/xml");
    if (xml.querySelector("parsererror")) throw new Error("GLM listing XML could not be parsed");
    const keys = [...xml.getElementsByTagName("Key")]
      .map((node) => node.textContent || "")
      .filter((key) => key.endsWith(".nc"));
    this.listingCache.set(prefix, { time: Date.now(), keys });
    return keys;
  }

  decode(key, buffer) {
    if (!this.worker) this.createWorker();
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({
        type: "decode",
        id,
        key,
        startTime: granuleStart(key)?.getTime() || 0,
        decoderUrl: new URL(this.config.decoderUrl, location.href).href,
        decoderFallbackUrl: this.config.decoderFallbackUrl,
        bounds: this.config.bounds,
        maxPoints: this.effectiveMaxPoints(),
        buffer,
      }, [buffer]);
    });
  }

  createWorker() {
    this.worker = new Worker(new URL("./lightning-worker.js", import.meta.url), { type: "module" });
    this.worker.onmessage = (event) => {
      const pending = this.pending.get(event.data?.id);
      if (!pending) return;
      this.pending.delete(event.data.id);
      if (event.data.ok) pending.resolve(event.data.points || []);
      else pending.reject(new Error(event.data.error || "GLM decoder failed"));
    };
    this.worker.onerror = (event) => this.stopWorker(event.message || "GLM worker failed");
  }

  stopWorker(reason = "GLM worker stopped") {
    for (const pending of this.pending.values()) pending.reject(new Error(reason));
    this.pending.clear();
    this.worker?.terminate();
    this.worker = null;
  }

  trimCache() {
    const granuleLimit = this.granuleCacheLimit();
    while (this.granuleCache.size > granuleLimit) this.granuleCache.delete(this.granuleCache.keys().next().value);
    while (this.listingCache.size > 12) this.listingCache.delete(this.listingCache.keys().next().value);
  }

  featureCollection(points, target = this.target, windowMinutes = this.effectiveWindowMinutes()) {
    const end = target.getTime();
    const span = Math.max(60_000, windowMinutes * 60_000);
    return {
      type: "FeatureCollection",
      features: points.map((point, index) => ({
        type: "Feature",
        id: index,
        properties: {
          age: Math.max(0, Math.min(1, (end - point.time) / span)),
          energy: Number(point.energy || 0),
          area: Number(point.area || 0),
          time: point.time,
        },
        geometry: { type: "Point", coordinates: [point.lon, point.lat] },
      })),
    };
  }

  ensureLayers() {
    const map = this.mapGetter?.();
    if (!map?.isStyleLoaded?.()) return;
    if (!map.getSource("meowdar-glm")) map.addSource("meowdar-glm", { type: "geojson", data: EMPTY });
    if (!map.getLayer("meowdar-glm-halo")) map.addLayer({
      id: "meowdar-glm-halo", type: "circle", source: "meowdar-glm",
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 5, 8, 10],
        "circle-color": ["interpolate", ["linear"], ["get", "age"], 0, "#fff9b0", .35, "#ffc126", 1, "#e85222"],
        "circle-opacity": ["interpolate", ["linear"], ["get", "age"], 0, .34, 1, .08],
        "circle-blur": .8,
      },
    });
    if (!map.getLayer("meowdar-glm-core")) map.addLayer({
      id: "meowdar-glm-core", type: "circle", source: "meowdar-glm",
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 1.7, 8, 3.1],
        "circle-color": ["interpolate", ["linear"], ["get", "age"], 0, "#ffffff", .25, "#ffe06b", 1, "#ff6b2b"],
        "circle-opacity": ["interpolate", ["linear"], ["get", "age"], 0, 1, 1, .38],
        "circle-stroke-width": .5,
        "circle-stroke-color": "rgba(20,10,0,.7)",
      },
    });
  }

  updateMap(data) {
    const map = this.mapGetter?.();
    if (!map) return;
    this.ensureLayers();
    map.getSource("meowdar-glm")?.setData?.(data);
  }

  renderPreview(points) {
    if (!this.ui.preview) return;
    this.ui.preview.replaceChildren();
    for (const point of points) {
      const dot = document.createElement("i");
      dot.style.left = `${point.x}%`;
      dot.style.top = `${point.y}%`;
      dot.style.opacity = String(.35 + (1 - point.age) * .65);
      this.ui.preview.appendChild(dot);
    }
    this.ui.preview.hidden = !this.enabled || !points.length;
  }

  syntheticPoints(target) {
    const seed = Math.floor(target.getTime() / 20_000);
    const random = mulberry32(seed);
    return Array.from({ length: 19 }, (_, index) => ({
      lat: 33.5 + random() * 4.5,
      lon: -101.5 + random() * 5.5,
      time: target.getTime() - random() * this.effectiveWindowMinutes() * 60_000,
      age: random(),
      x: 32 + random() * 36,
      y: 18 + random() * 54,
      energy: 1 + random() * 10,
      area: 1 + random() * 30,
      index,
    }));
  }

  syncUi(text, error = false) {
    const value = this.enabled ? text : "Off";
    if (this.ui.status) this.ui.status.textContent = value;
    if (this.ui.pill) {
      this.ui.pill.hidden = !this.enabled;
      this.ui.pill.textContent = `GLM · ${value}`;
      this.ui.pill.classList.toggle("warning", error);
    }
    this.onStatus({ enabled: this.enabled, text: value, points: this.points.length, bytes: this.bytes, error });
  }
}

async function mapPool(items, concurrency, task) {
  const output = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await task(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(items.length || 1, Math.max(1, concurrency)) }, worker));
  return output;
}

function evenlySample(points, limit) {
  if (points.length <= limit) return points;
  const output = [];
  const step = points.length / limit;
  for (let index = 0; index < limit; index += 1) output.push(points[Math.floor(index * step)]);
  return output;
}

function abortError() {
  try { return new DOMException("Aborted", "AbortError"); }
  catch { const error = new Error("Aborted"); error.name = "AbortError"; return error; }
}

function formatBytes(bytes) {
  const value = Math.max(0, Number(bytes) || 0);
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function granuleStart(key) {
  const match = String(key).match(/_s(\d{4})(\d{3})(\d{2})(\d{2})(\d{2})(\d?)/);
  if (!match) return null;
  const [, yearText, doyText, hourText, minuteText, secondText, tenthText] = match;
  const date = new Date(Date.UTC(Number(yearText), 0, 1, Number(hourText), Number(minuteText), Number(secondText), Number(tenthText || 0) * 100));
  date.setUTCDate(Number(doyText));
  return date;
}

function dayOfYear(date) {
  return Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - Date.UTC(date.getUTCFullYear(), 0, 0)) / 86_400_000);
}

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
