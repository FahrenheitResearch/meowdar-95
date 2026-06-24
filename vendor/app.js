import { SITES } from "./sites.js";

const ARCHIVE = "https://unidata-nexrad-level2.s3.amazonaws.com";
const CHUNKS = "https://unidata-nexrad-level2-chunks.s3.amazonaws.com";
const PRODUCTS = [
  ["REF", "REF"],
  ["VEL", "VEL"],
  ["DVEL", "DVEL"],
  ["SRV", "SRV"],
  ["DSRV", "DSRV"],
  ["SW", "SW"],
  ["ZDR", "ZDR"],
  ["CC", "CC"],
  ["PHI", "PHI"],
  ["KDP", "KDP"],
  ["CREF", "CREF"],
  ["ET", "ET"],
  ["VIL", "VIL"],
  ["VILD", "VILD"],
  ["MEHS", "MEHS"],
  ["POSH", "POSH"],
  ["POH", "POH"],
  ["MARC", "MARC"],
  ["GUST", "Gust"],
  ["AZSHR", "AzShr"],
  ["DIV", "Div"],
];
const PROFILER_SITE_IDS = new Set(["AWPA2", "HWPA2", "ROCO2", "TLKA2"]);
const RADAR_SITES = SITES.filter((site) => !PROFILER_SITE_IDS.has(site.id));
const WORKER_VERSION = "2026-06-13-cache1";

const state = {
  site: "KTLX",
  product: "REF",
  mode: "live",
  cut: 0,
  rangeKm: 230,
  frameCount: 6,
  fps: 10,
  playing: true,
  frames: [],
  images: [],
  index: 0,
  loaded: 0,
  token: 0,
  loading: false,
  polling: false,
  pixelSize: 0,
  lastAdvance: 0,
  liveTimer: null,
  map: null,
  markers: new Map(),
  rows: new Map(),
};

const els = {
  site: document.getElementById("siteInput"),
  siteSearch: document.getElementById("siteSearch"),
  siteList: document.getElementById("siteList"),
  productGrid: document.getElementById("productGrid"),
  liveMode: document.getElementById("liveModeButton"),
  recentMode: document.getElementById("recentModeButton"),
  tilt: document.getElementById("tiltSelect"),
  tiltLabel: document.getElementById("tiltLabel"),
  range: document.getElementById("rangeInput"),
  rangeLabel: document.getElementById("rangeLabel"),
  frameCount: document.getElementById("frameCountInput"),
  frameCountLabel: document.getElementById("frameCountLabel"),
  fps: document.getElementById("fpsInput"),
  fpsLabel: document.getElementById("fpsLabel"),
  load: document.getElementById("loadButton"),
  live: document.getElementById("liveButton"),
  auto: document.getElementById("autoLiveInput"),
  play: document.getElementById("playButton"),
  scrubber: document.getElementById("scrubber"),
  filmstrip: document.getElementById("filmstrip"),
  frameLabel: document.getElementById("frameLabel"),
  engineStatus: document.getElementById("engineStatus"),
  dataStatus: document.getElementById("dataStatus"),
  pixelChip: document.getElementById("pixelChip"),
  stage: document.getElementById("radarStage"),
  canvas: document.getElementById("radarCanvas"),
  overlay: document.getElementById("overlayCanvas"),
  loadVeil: document.getElementById("loadVeil"),
  loadText: document.getElementById("loadText"),
  loadMeter: document.getElementById("loadMeter"),
};

const worker = createWorkerClient();

init();

function init() {
  buildProducts();
  bindControls();
  initMap();
  renderSiteList();
  renderMarkers();
  selectSite(state.site, { center: true, load: false });
  resizeCanvases();
  loadLoop();
  requestAnimationFrame(tick);
  const onResize = debounce(() => {
    const before = state.pixelSize;
    resizeCanvases();
    state.map?.invalidateSize();
    if (Math.abs(before - state.pixelSize) > 8) rerenderLoadedLoop({ label: "resize" });
  }, 220);
  new ResizeObserver(onResize).observe(els.stage.parentElement);
  window.addEventListener("resize", onResize);
}

function buildProducts() {
  for (const [code, label] of PRODUCTS) {
    const button = document.createElement("button");
    button.textContent = label;
    button.dataset.product = code;
    button.className = code === state.product ? "pressed" : "";
    button.addEventListener("click", () => {
      if (state.product === code) return;
      state.product = code;
      state.cut = 0;
      for (const child of els.productGrid.children) {
        child.classList.toggle("pressed", child.dataset.product === code);
      }
      rerenderLoadedLoop({ updateTilts: true, label: "product" });
    });
    els.productGrid.appendChild(button);
  }
}

function bindControls() {
  els.load.addEventListener("click", loadLoop);
  els.live.addEventListener("click", () => pollLive({ replace: false }));
  els.liveMode.addEventListener("click", () => setMode("live"));
  els.recentMode.addEventListener("click", () => setMode("recent"));
  els.site.addEventListener("change", () => {
    selectSite(els.site.value.trim().toUpperCase() || "KTLX", { center: true, load: true });
  });
  els.siteSearch.addEventListener("input", renderSiteList);
  els.tilt.addEventListener("change", () => {
    state.cut = Number(els.tilt.value);
    updateTiltLabel();
    rerenderLoadedLoop({ label: "tilt" });
  });
  els.range.addEventListener("input", () => {
    state.rangeKm = Number(els.range.value);
    els.rangeLabel.textContent = `${state.rangeKm} km`;
    drawOverlay();
  });
  els.range.addEventListener("change", () => rerenderLoadedLoop({ label: "range" }));
  els.frameCount.addEventListener("input", () => {
    state.frameCount = Number(els.frameCount.value);
    els.frameCountLabel.textContent = String(state.frameCount);
  });
  els.frameCount.addEventListener("change", () => {
    if (state.frames.length > state.frameCount) {
      state.frames = state.frames.slice(-state.frameCount);
      state.images = state.images.slice(-state.frameCount);
      state.index = Math.min(state.index, state.frames.length - 1);
      state.loaded = state.images.filter(Boolean).length;
      drawFrame();
      return;
    }
    loadLoop();
  });
  els.fps.addEventListener("input", () => {
    state.fps = Number(els.fps.value);
    els.fpsLabel.textContent = `${state.fps} fps`;
  });
  els.play.addEventListener("click", () => {
    state.playing = !state.playing;
    els.play.textContent = state.playing ? "Pause" : "Play";
  });
  els.scrubber.addEventListener("input", () => {
    state.index = Number(els.scrubber.value);
    drawFrame();
  });
  els.auto.addEventListener("change", scheduleLive);
  scheduleLive();
}

function setMode(mode) {
  state.mode = mode;
  els.liveMode.classList.toggle("pressed", mode === "live");
  els.recentMode.classList.toggle("pressed", mode === "recent");
  loadLoop();
}

function initMap() {
  state.map = L.map("siteMap", {
    attributionControl: false,
    zoomControl: false,
  }).setView([37.8, -96.4], 4);
  L.control.zoom({ position: "bottomright" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 9,
  }).addTo(state.map);
}

function renderMarkers() {
  for (const marker of state.markers.values()) marker.remove();
  state.markers.clear();
  for (const site of RADAR_SITES) {
    const marker = L.circleMarker([site.lat, site.lon], markerStyle(site.id === state.site))
      .addTo(state.map)
      .bindPopup(`<b>${site.id}</b><br>${escapeHtml(site.name)}`);
    marker.on("add", () => tagMarker(marker, site));
    tagMarker(marker, site);
    marker.on("click", () => selectSite(site.id, { center: false, load: true }));
    state.markers.set(site.id, marker);
  }
}

function tagMarker(marker, site) {
  const element = marker.getElement();
  if (!element) return;
  element.dataset.site = site.id;
  element.setAttribute("aria-label", `${site.id} ${site.name}`);
}

function renderSiteList() {
  const q = els.siteSearch.value.trim().toUpperCase();
  els.siteList.innerHTML = "";
  state.rows.clear();
  for (const site of RADAR_SITES) {
    const haystack = `${site.id} ${site.name}`.toUpperCase();
    if (q && !haystack.includes(q)) continue;
    const row = document.createElement("button");
    row.className = `site-row${site.id === state.site ? " active" : ""}`;
    row.dataset.site = site.id;
    row.innerHTML = `<b>${site.id}</b><span>${escapeHtml(site.name)}</span>`;
    row.addEventListener("click", () => selectSite(site.id, { center: true, load: true }));
    els.siteList.appendChild(row);
    state.rows.set(site.id, row);
  }
}

function selectSite(siteId, options) {
  state.site = siteId.toUpperCase();
  els.site.value = state.site;
  for (const [id, row] of state.rows) row.classList.toggle("active", id === state.site);
  for (const [id, marker] of state.markers) marker.setStyle(markerStyle(id === state.site));
  const site = RADAR_SITES.find((item) => item.id === state.site);
  if (site && options.center) state.map.setView([site.lat, site.lon], Math.max(state.map.getZoom(), 5));
  if (options.load) loadLoop();
}

function markerStyle(active) {
  return {
    radius: active ? 7 : 4,
    weight: active ? 2 : 1,
    color: active ? "#000080" : "#008060",
    fillColor: active ? "#ffff00" : "#00c080",
    fillOpacity: active ? 0.95 : 0.62,
    opacity: 1,
  };
}

function resizeCanvases() {
  const panel = els.stage.parentElement.getBoundingClientRect();
  const title = els.stage.parentElement.querySelector(".panel-title").getBoundingClientRect();
  const availableW = Math.max(1, panel.width - 20);
  let availableH = Math.max(1, panel.height - title.height - 20);
  if (availableH < 160) availableH = availableW;
  const cssSize = Math.floor(Math.min(availableW, availableH));
  els.stage.style.width = `${cssSize}px`;
  els.stage.style.height = `${cssSize}px`;
  const rect = els.canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const pixels = Math.max(1, Math.round(Math.min(rect.width, rect.height) * dpr));
  for (const canvas of [els.canvas, els.overlay]) {
    canvas.width = pixels;
    canvas.height = pixels;
  }
  state.pixelSize = pixels;
  els.pixelChip.textContent = `${pixels} px`;
  drawFrame();
  drawOverlay();
}

async function loadLoop() {
  const token = ++state.token;
  state.loading = true;
  state.site = els.site.value.trim().toUpperCase() || "KTLX";
  selectSite(state.site, { center: false, load: false });
  state.frames = [];
  state.images = [];
  state.loaded = 0;
  state.index = 0;
  renderFilmstrip();
  updateScrubber();

  try {
    setBusy(true, "listing", 5);
    if (state.mode === "live") {
      await loadLiveFirst(token);
    } else {
      await loadArchiveOnly(token);
    }
    if (token !== state.token) return;
    setBusy(false, "ready", 100);
  } catch (error) {
    if (token !== state.token) return;
    setBusy(true, String(error.message || error), 100);
    els.dataStatus.textContent = "error";
  } finally {
    if (token === state.token) state.loading = false;
  }
}

async function loadLiveFirst(token) {
  const liveFrame = await latestRealtimeFrame(state.site).catch(() => null);
  let tiltFrame = liveFrame;
  if (liveFrame) {
    const liveMeta = await worker.meta(liveFrame, state.product);
    if (token !== state.token) return;
    populateTilts(liveMeta.meta, true);
    const displayableCount = liveMeta.meta.displayableCuts?.length || 0;
    if (displayableCount <= 1) {
      const archiveFrame = (await recentArchiveFrames(state.site, 1))[0];
      if (archiveFrame) {
        const archiveMeta = await worker.meta(archiveFrame, state.product);
        if (token !== state.token) return;
        if ((archiveMeta.meta.displayableCuts?.length || 0) > displayableCount) {
          populateTilts(archiveMeta.meta, true);
          tiltFrame = archiveFrame;
        }
      }
    }
  }

  let firstFrame = liveFrame;
  if (firstFrame) {
    const rendered = await renderFrame(firstFrame, token).catch(async () => {
      const fallback = tiltFrame?.source === "archive" ? tiltFrame : (await recentArchiveFrames(state.site, 1))[0];
      return fallback ? renderFrame(fallback, token) : null;
    });
    if (rendered && token === state.token) {
      pushRendered(rendered, true);
      els.dataStatus.textContent = rendered.frame.source === "live" ? "live chunks" : "archive fallback";
    }
  }

  const archiveFrames = await recentArchiveFrames(state.site, Math.max(1, state.frameCount - 1));
  if (token !== state.token) return;
  const backfill = archiveFrames
    .filter((frame) => frame.id !== firstFrame?.id)
    .slice(-(state.frameCount - state.frames.length));
  await preloadFrames(backfill, token);
}

async function loadArchiveOnly(token) {
  const frames = await recentArchiveFrames(state.site, state.frameCount);
  if (!frames.length) throw new Error(`no recent archive frames for ${state.site}`);
  const meta = await worker.meta(frames[frames.length - 1], state.product);
  if (token !== state.token) return;
  populateTilts(meta.meta, true);
  await preloadFrames(frames, token);
}

async function rerenderLoadedLoop(options = {}) {
  if (!state.frames.length) {
    loadLoop();
    return;
  }

  const token = ++state.token;
  state.loading = true;
  const frames = state.frames.slice(-state.frameCount);
  const currentFrameId = state.frames[state.index]?.id;

  try {
    setBusy(true, options.label || "render", 12);
    if (options.updateTilts) {
      const meta = await worker.meta(frames[frames.length - 1], state.product);
      if (token !== state.token) return;
      populateTilts(meta.meta, true);
    }

    const renderedFrames = await renderFrameBatch(frames, token);
    if (token !== state.token) return;
    if (!renderedFrames.length) throw new Error(`${state.product} has no displayable frames on cut ${state.cut}`);

    state.frames = [];
    state.images = [];
    state.loaded = 0;
    for (const rendered of renderedFrames) pushRendered(rendered, false, { draw: false });
    sortFramesChronological();

    const preservedIndex = state.frames.findIndex((frame) => frame.id === currentFrameId);
    state.index = preservedIndex >= 0 ? preservedIndex : Math.max(0, state.frames.length - 1);
    drawFrame();
    els.engineStatus.textContent = formatBatchEngineStatus(renderedFrames);
    els.dataStatus.textContent = "cached loop";
    setBusy(false, "ready", 100);
  } catch (error) {
    if (token !== state.token) return;
    setBusy(true, String(error.message || error), 100);
    els.dataStatus.textContent = "render error";
  } finally {
    if (token === state.token) state.loading = false;
  }
}

async function pollLive({ replace }) {
  if (state.polling) return;
  const foreground = replace || !state.frames.length;
  if (!foreground && state.loading) return;
  const token = foreground ? ++state.token : state.token;
  state.polling = true;
  try {
    if (foreground) {
      setBusy(true, "poll", 10);
    } else {
      els.dataStatus.textContent = "polling";
    }
    const frame = await latestRealtimeFrame(state.site);
    if (!replace && state.frames.some((item) => item.cacheKey === frame.cacheKey)) {
      els.dataStatus.textContent = "live idle";
      setBusy(false, "ready", 100);
      return;
    }
    const rendered = await renderFrame(frame, token);
    if (token !== state.token) return;
    if (replace || !state.frames.length) {
      pushRendered(rendered, true);
    } else {
      const existingVolumeIndex = state.frames.findIndex((item) => item.id === frame.id);
      if (existingVolumeIndex >= 0) {
        state.frames[existingVolumeIndex] = rendered.frame;
        state.images[existingVolumeIndex] = rendered.image;
        state.index = existingVolumeIndex;
        state.loaded = state.images.filter(Boolean).length;
        els.engineStatus.textContent = formatEngineStatus(rendered);
        updateScrubber();
        renderFilmstrip();
        drawFrame();
      } else {
        pushRendered(rendered, false);
        while (state.frames.length > state.frameCount) {
          state.frames.shift();
          state.images.shift();
        }
        state.index = state.frames.length - 1;
      }
    }
    els.dataStatus.textContent = "live chunks";
    setBusy(false, "ready", 100);
  } catch (error) {
    if (token === state.token && foreground) {
      setBusy(true, String(error.message || error), 100);
    } else if (token === state.token) {
      els.dataStatus.textContent = "live retry";
    }
  } finally {
    state.polling = false;
  }
}

async function preloadFrames(frames, token) {
  const renderedFrames = await renderFrameBatch(frames, token);
  if (token !== state.token) return;
  for (const rendered of renderedFrames) pushRendered(rendered, false, { draw: false });
  sortFramesChronological();
  state.index = Math.max(0, state.frames.length - 1);
  drawFrame();
}

async function renderFrameBatch(frames, token) {
  const jobs = frames.map((frame) =>
    renderFrame(frame, token)
      .then((rendered) => rendered)
      .catch((error) => {
        console.warn("frame failed", frame.id, error);
        return null;
      }),
  );
  return (await Promise.all(jobs)).filter(Boolean);
}

async function renderFrame(frame, token) {
  const result = await worker.render(frame, {
    product: state.product,
    cut: state.cut,
    width: state.pixelSize,
    height: state.pixelSize,
    rangeKm: state.rangeKm,
    smoothing: "native",
  });
  if (token !== state.token) return null;
  const clamped = new Uint8ClampedArray(result.rgba);
  const image = new ImageData(clamped, result.width, result.height);
  return { frame, image, meta: result.meta, elapsedMs: result.elapsedMs, cacheHit: result.cacheHit };
}

function pushRendered(rendered, replace, options = { draw: true }) {
  if (!rendered) return;
  if (replace) {
    state.frames = [rendered.frame];
    state.images = [rendered.image];
    state.index = 0;
  } else {
    state.frames.push(rendered.frame);
    state.images.push(rendered.image);
    state.index = state.frames.length - 1;
  }
  state.loaded = state.images.filter(Boolean).length;
  els.engineStatus.textContent = formatEngineStatus(rendered);
  updateScrubber();
  renderFilmstrip();
  if (options.draw) drawFrame();
}

function formatEngineStatus(rendered) {
  return rendered.cacheHit
    ? `WASM cache ${Math.round(rendered.elapsedMs)} ms`
    : `WASM ${Math.round(rendered.elapsedMs)} ms`;
}

function formatBatchEngineStatus(renderedFrames) {
  const cacheHits = renderedFrames.filter((frame) => frame.cacheHit).length;
  const maxMs = Math.max(...renderedFrames.map((frame) => frame.elapsedMs));
  if (cacheHits) return `WASM ${cacheHits}/${renderedFrames.length} cache ${Math.round(maxMs)} ms`;
  return `WASM ${Math.round(maxMs)} ms`;
}

function sortFramesChronological() {
  const pairs = state.frames.map((frame, index) => ({ frame, image: state.images[index] }));
  pairs.sort((a, b) => frameMillis(a.frame) - frameMillis(b.frame));
  state.frames = pairs.map((pair) => pair.frame);
  state.images = pairs.map((pair) => pair.image);
}

function frameMillis(frame) {
  const time = frame.volumeTime ? Date.parse(frame.volumeTime) : NaN;
  return Number.isFinite(time) ? time : 0;
}

function populateTilts(meta, allowAdjust) {
  const cuts = meta.cuts || [];
  const displayable = cuts.filter((cut) => cut.displayable);
  if (!displayable.some((cut) => cut.index === state.cut) && displayable.length && allowAdjust) {
    state.cut = displayable[0].index;
  }
  els.tilt.innerHTML = "";
  for (const cut of cuts) {
    const option = document.createElement("option");
    option.value = String(cut.index);
    option.disabled = !cut.displayable;
    option.textContent = `cut ${String(cut.index).padStart(2, "0")}  ${Number(cut.elevationDeg).toFixed(2)} deg`;
    els.tilt.appendChild(option);
  }
  if (!cuts.length) {
    const option = document.createElement("option");
    option.value = "0";
    option.textContent = "cut 00";
    els.tilt.appendChild(option);
  }
  els.tilt.value = String(state.cut);
  updateTiltLabel();
}

async function recentArchiveFrames(site, count) {
  const out = [];
  for (let day = 0; day < 3 && out.length < count; day += 1) {
    const date = new Date(Date.now() - day * 86400_000);
    const prefix = `${date.getUTCFullYear()}/${pad2(date.getUTCMonth() + 1)}/${pad2(date.getUTCDate())}/${site}/`;
    const listing = await listS3(ARCHIVE, { "list-type": "2", prefix, "max-keys": "1000" });
    const frames = listing.contents
      .filter((item) => item.size > 0 && !item.key.endsWith("_MDM"))
      .sort((a, b) => a.key.localeCompare(b.key))
      .map(archiveFrame);
    out.push(...frames.reverse());
  }
  return out.slice(0, count).reverse();
}

function archiveFrame(object) {
  const id = object.key.split("/").pop();
  return {
    id,
    key: object.key,
    cacheKey: `archive:${object.key}:${object.size}`,
    source: "archive",
    size: object.size,
    url: `${ARCHIVE}/${object.key}`,
    volumeTime: volumeTimeFromArchiveId(id),
  };
}

async function latestRealtimeFrame(site) {
  const active = await listS3(CHUNKS, { "list-type": "2", prefix: `${site}/`, delimiter: "/" });
  const ids = active.prefixes
    .map((prefix) => realtimeVolumeIdFromPrefix(site, prefix))
    .filter((id) => id !== null);
  const candidates = realtimeCandidates(ids);
  let best = null;
  for (const id of candidates) {
    const volume = await realtimeVolume(site, id).catch(() => null);
    if (!volume) continue;
    if (!best || volume.volumeTime > best.volumeTime || (volume.volumeTime === best.volumeTime && volume.chunks.length > best.chunks.length)) {
      best = volume;
    }
  }
  if (!best) throw new Error(`no realtime chunks for ${site}`);
  return {
    id: `${site}-${best.dateTime}-${String(best.volumeId).padStart(3, "0")}`,
    cacheKey: `live:${site}:${best.volumeId}:${best.chunks.length}:${best.totalSize}`,
    source: "live",
    complete: best.complete,
    urls: best.chunks.map((chunk) => `${CHUNKS}/${chunk.key}`),
    volumeTime: best.volumeTime,
  };
}

async function realtimeVolume(site, volumeId) {
  const listing = await listS3(CHUNKS, {
    "list-type": "2",
    prefix: `${site}/${volumeId}/`,
    "max-keys": "1000",
  });
  const chunks = listing.contents
    .filter((object) => object.size > 0)
    .map(parseRealtimeChunk)
    .filter(Boolean)
    .sort((a, b) => a.chunkId - b.chunkId);
  if (!chunks.length) throw new Error(`no chunks in ${site}/${volumeId}`);
  return {
    site,
    volumeId,
    chunks,
    complete: chunks.at(-1)?.type === "E",
    totalSize: chunks.reduce((sum, chunk) => sum + chunk.size, 0),
    dateTime: `${chunks[0].date}-${chunks[0].time}`,
    volumeTime: `${chunks[0].date.slice(0, 4)}-${chunks[0].date.slice(4, 6)}-${chunks[0].date.slice(6, 8)}T${chunks[0].time.slice(0, 2)}:${chunks[0].time.slice(2, 4)}:${chunks[0].time.slice(4, 6)}Z`,
  };
}

function parseRealtimeChunk(object) {
  const [site, volumeId, filename, extra] = object.key.split("/");
  if (!site || !volumeId || !filename || extra) return null;
  const [date, time, chunkId, type, more] = filename.split("-");
  if (!date || !time || !chunkId || !type || more) return null;
  return {
    key: object.key,
    size: object.size,
    site,
    volumeId: Number(volumeId),
    date,
    time,
    chunkId: Number(chunkId),
    type,
  };
}

function realtimeVolumeIdFromPrefix(site, prefix) {
  const parts = prefix.replace(/\/$/, "").split("/");
  if (parts.length !== 2 || parts[0] !== site) return null;
  const id = Number(parts[1]);
  return Number.isInteger(id) && id >= 0 && id < 1000 ? id : null;
}

function realtimeCandidates(ids) {
  const unique = [...new Set(ids)].sort((a, b) => a - b);
  if (unique.length <= 1) return unique;
  const candidates = [];
  let largestGap = 0;
  for (let i = 0; i < unique.length; i += 1) {
    const current = unique[i];
    const next = i + 1 === unique.length ? unique[0] + 1000 : unique[i + 1];
    const gap = next - current;
    if (gap > largestGap) largestGap = gap;
    if (gap > 1) candidates.push(current);
  }
  return candidates.length ? candidates : [unique.at(-1)];
}

async function listS3(base, params) {
  const url = `${base}/?${new URLSearchParams(params)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  const text = await response.text();
  const xml = new DOMParser().parseFromString(text, "application/xml");
  return {
    contents: [...xml.querySelectorAll("Contents")].map((node) => ({
      key: textOf(node, "Key"),
      size: Number(textOf(node, "Size") || 0),
      lastModified: textOf(node, "LastModified"),
    })),
    prefixes: [...xml.querySelectorAll("CommonPrefixes > Prefix")].map((node) => node.textContent),
  };
}

function tick(now) {
  if (state.playing && state.images.length > 1) {
    const interval = 1000 / state.fps;
    if (now - state.lastAdvance >= interval) {
      state.index = (state.index + 1) % state.images.length;
      state.lastAdvance = now;
      drawFrame();
    }
  }
  requestAnimationFrame(tick);
}

function drawFrame() {
  const ctx = els.canvas.getContext("2d");
  const size = state.pixelSize;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#050606";
  ctx.fillRect(0, 0, size, size);
  const image = state.images[state.index];
  if (image) ctx.putImageData(image, 0, 0);
  updateScrubber();
  renderFilmstrip();
  updateFrameLabel();
  drawOverlay();
}

function drawOverlay() {
  const canvas = els.overlay;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const c = size / 2;
  ctx.clearRect(0, 0, size, size);
  ctx.lineWidth = Math.max(1, size / 900);
  ctx.strokeStyle = "rgba(170, 220, 220, 0.25)";
  ctx.fillStyle = "rgba(230, 255, 255, 0.85)";
  ctx.font = `${Math.max(10, Math.round(size / 92))}px 'MS Sans Serif', sans-serif`;
  for (const km of [50, 100, 150, 200, 250, 300, 350, 400]) {
    if (km > state.rangeKm) continue;
    const r = (km / state.rangeKm) * c;
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillText(String(km), c + r + 6, c - 4);
  }
  ctx.strokeStyle = "rgba(0, 180, 120, 0.38)";
  for (let a = 0; a < 360; a += 30) {
    const rad = (a - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.lineTo(c + Math.cos(rad) * c, c + Math.sin(rad) * c);
    ctx.stroke();
  }
}

function renderFilmstrip() {
  els.filmstrip.innerHTML = "";
  state.frames.forEach((frame, index) => {
    const button = document.createElement("button");
    button.className = `thumb${index === state.index ? " active" : ""}`;
    button.textContent = labelFrame(frame, index);
    button.addEventListener("click", () => {
      state.index = index;
      drawFrame();
    });
    els.filmstrip.appendChild(button);
  });
}

function updateScrubber() {
  els.scrubber.max = Math.max(0, state.frames.length - 1);
  els.scrubber.value = String(Math.max(0, state.index));
}

function updateFrameLabel() {
  const frame = state.frames[state.index];
  if (!frame) {
    els.frameLabel.textContent = `${state.site} ${state.product} cut ${String(state.cut).padStart(2, "0")}`;
    return;
  }
  els.frameLabel.textContent = `${state.site} ${state.product} ${frame.source.toUpperCase()} ${labelFrame(frame, state.index)} cut ${String(state.cut).padStart(2, "0")} ${state.pixelSize}x${state.pixelSize}`;
}

function updateTiltLabel() {
  els.tiltLabel.textContent = els.tilt.selectedOptions[0]?.textContent || `cut ${String(state.cut).padStart(2, "0")}`;
}

function setBusy(visible, text, percent) {
  els.loadVeil.classList.toggle("visible", visible);
  els.loadText.textContent = text;
  els.loadMeter.style.width = `${Math.max(0, Math.min(100, percent))}%`;
}

function scheduleLive() {
  if (state.liveTimer) clearInterval(state.liveTimer);
  state.liveTimer = null;
  if (els.auto.checked) state.liveTimer = setInterval(() => pollLive({ replace: false }), 15000);
}

function createWorkerClient() {
  const worker = new Worker(`./worker.js?v=${WORKER_VERSION}`, { type: "module" });
  let nextId = 1;
  const pending = new Map();
  worker.onmessage = (event) => {
    const { id, ok, result, error } = event.data;
    const request = pending.get(id);
    if (!request) return;
    pending.delete(id);
    ok ? request.resolve(result) : request.reject(new Error(error));
  };
  function call(type, payload) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      worker.postMessage({ id, type, payload });
    });
  }
  return {
    meta: (frame, product) => call("meta", { frame, product }),
    render: (frame, options) => call("render", { frame, ...options }),
  };
}

function labelFrame(frame, index) {
  const time = frame.volumeTime ? new Date(frame.volumeTime) : null;
  if (time && Number.isFinite(time.getTime())) return time.toISOString().slice(11, 16);
  const match = frame.id?.match(/(\d{8})[_-](\d{6})/);
  if (match) return `${match[2].slice(0, 2)}:${match[2].slice(2, 4)}`;
  return String(index + 1).padStart(2, "0");
}

function volumeTimeFromArchiveId(id) {
  const match = id?.match(/(\d{8})[_-](\d{6})/);
  if (!match) return null;
  return `${match[1].slice(0, 4)}-${match[1].slice(4, 6)}-${match[1].slice(6, 8)}T${match[2].slice(0, 2)}:${match[2].slice(2, 4)}:${match[2].slice(4, 6)}Z`;
}

function textOf(node, selector) {
  return node.querySelector(selector)?.textContent || "";
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function debounce(fn, delay) {
  let timer = 0;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
