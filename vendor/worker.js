import init, { decode_jma_tar_station, decode_level2, decode_supported_volume, decode_supported_volume_parts, supported_volume_format } from "./pkg/bowecho_client_wasm.js?v=2026-06-23-native-ppi2";

const ready = init(new URL("./pkg/bowecho_client_wasm_bg.wasm?v=2026-06-23-native-ppi2", import.meta.url));
const byteCache = new Map();
const volumeCache = new Map();
const metaCache = new Map();
const renderCache = new Map();
const sectionCache = new Map();
const nativePpiCache = new Map();
const nativeRhiCache = new Map();
const diagnosticsCache = new Map();
const analysisCache = new Map();
const torTracksCache = new Map();
const cacheLimits = {
  bytes: 32,
  volumes: 24,
  metadata: 128,
  renders: 160,
  sections: 96,
  nativePpi: 48,
  nativeRhi: 96,
  diagnostics: 96,
  analyses: 128,
  torTracks: 128,
};

self.onmessage = async (event) => {
  const { id, type, payload } = event.data;
  try {
    await ready;
    if (type === "sniffBytes") {
      const bytes = normalizeBytes(payload.bytes);
      self.postMessage({
        id,
        ok: true,
        result: {
          format: supported_volume_format(bytes),
          size: bytes.byteLength,
        },
      });
      return;
    }
    if (type === "importBytes") {
      const started = performance.now();
      const bytes = normalizeBytes(payload.bytes);
      const fingerprint = byteFingerprint(bytes);
      const source = payload.source || "local-bytes";
      const cacheKey = payload.cacheKey || `${source}:${fingerprint}`;
      byteCache.set(cacheKey, bytes);
      trimCache(byteCache, undefined, cacheLimits.bytes);
      let volume = volumeCache.get(cacheKey);
      if (!volume) {
        volume = decode_supported_volume(bytes);
        volumeCache.set(cacheKey, volume);
        trimCache(volumeCache, (value) => value?.free?.(), cacheLimits.volumes);
      }
      const summary = JSON.parse(volume.summary_json());
      const frame = {
        id: payload.id || payload.fileName || `${summary.site || "RADAR"}-${summary.volumeTime || fingerprint}`,
        cacheKey,
        source,
        size: bytes.byteLength,
        fileName: payload.fileName || null,
        format: supported_volume_format(bytes),
        provider: payload.provider || "browser-import",
        site: summary.site,
        volumeTime: summary.volumeTime,
      };
      self.postMessage({
        id,
        ok: true,
        result: {
          frame,
          summary,
          elapsedMs: performance.now() - started,
          cacheHit: false,
        },
      });
      return;
    }
    if (type === "importByteParts") {
      const started = performance.now();
      const parts = Array.from(payload.parts || []).map(normalizeBytes);
      if (!parts.length) throw new Error("importByteParts requires at least one byte part");
      const source = payload.source || "mobile-archive";
      const fingerprint = parts.map(byteFingerprint).join("+");
      const cacheKey = payload.cacheKey || `${source}:${fingerprint}`;
      byteCache.set(cacheKey, parts.map((part) => new Uint8Array(part)));
      trimCache(byteCache, undefined, cacheLimits.bytes);
      let volume = volumeCache.get(cacheKey);
      if (!volume) {
        volume = decode_supported_volume_parts(parts);
        volumeCache.set(cacheKey, volume);
        trimCache(volumeCache, (value) => value?.free?.(), cacheLimits.volumes);
      }
      const summary = JSON.parse(volume.summary_json());
      const entries = Array.isArray(payload.entries) ? payload.entries : [];
      const frame = {
        id: payload.id || payload.fileName || `${summary.site || "RADAR"}-${summary.volumeTime || hashText(fingerprint)}`,
        cacheKey,
        source,
        provider: payload.provider || "browser-import",
        format: payload.format || "mobile-archive-zip",
        size: parts.reduce((sum, part) => sum + part.byteLength, 0),
        fileName: payload.fileName || null,
        site: summary.site,
        volumeTime: summary.volumeTime,
        merge: true,
        partCount: parts.length,
        archiveEntries: entries,
      };
      self.postMessage({
        id,
        ok: true,
        result: {
          frame,
          summary,
          entries,
          elapsedMs: performance.now() - started,
          cacheHit: false,
        },
      });
      return;
    }
    if (type === "meta") {
      const volume = await getVolume(payload.frame);
      const meta = cutsMeta(volume, payload.frame, payload.product);
      self.postMessage({ id, ok: true, result: { meta } });
      return;
    }
    if (type === "diagnostics") {
      const started = performance.now();
      const volume = await getVolume(payload.frame);
      const diagnosticsKey = frameCacheKey(payload.frame);
      const cached = diagnosticsCache.get(diagnosticsKey);
      if (cached) {
        self.postMessage({
          id,
          ok: true,
          result: {
            frameId: payload.frame.id,
            diagnostics: cached,
            elapsedMs: performance.now() - started,
            cacheHit: true,
          },
        });
        return;
      }
      const diagnostics = JSON.parse(volume.volume_diagnostics_json());
      diagnosticsCache.set(diagnosticsKey, diagnostics);
      trimCache(diagnosticsCache, undefined, cacheLimits.diagnostics);
      self.postMessage({
        id,
        ok: true,
        result: {
          frameId: payload.frame.id,
          diagnostics,
          elapsedMs: performance.now() - started,
          cacheHit: false,
        },
      });
      return;
    }
    if (type === "render") {
      const started = performance.now();
      const volume = await getVolume(payload.frame);
      const meta = cutsMeta(volume, payload.frame, payload.product);
      const renderKey = renderCacheKey(payload);
      const cached = renderCache.get(renderKey);
      if (cached) {
        const rgba = new Uint8Array(cached.rgba);
        self.postMessage(
          {
            id,
            ok: true,
            result: {
              frameId: payload.frame.id,
              meta,
              rgba,
              width: cached.width,
              height: cached.height,
              elapsedMs: performance.now() - started,
              cacheHit: true,
            },
          },
          [rgba.buffer],
        );
        return;
      }
      const rgba = payload.paletteText
        ? volume.render_rgba_with_palette(
          payload.product,
          payload.cut,
          payload.width,
          payload.height,
          payload.rangeKm,
          payload.smoothing || "native",
          payload.stormDirDeg || 240,
          payload.stormSpeedKt || 35,
          payload.paletteName || "browser palette",
          payload.paletteFamily || "",
          payload.paletteText,
        )
        : volume.render_rgba(
          payload.product,
          payload.cut,
          payload.width,
          payload.height,
          payload.rangeKm,
          payload.smoothing || "native",
          payload.stormDirDeg || 240,
          payload.stormSpeedKt || 35,
        );
      renderCache.set(renderKey, {
        rgba: new Uint8Array(rgba),
        width: payload.width,
        height: payload.height,
      });
      trimCache(renderCache, undefined, cacheLimits.renders);
      self.postMessage(
        {
          id,
          ok: true,
          result: {
            frameId: payload.frame.id,
            meta,
            rgba,
            width: payload.width,
            height: payload.height,
            elapsedMs: performance.now() - started,
            cacheHit: false,
          },
        },
        [rgba.buffer],
      );
      return;
    }
    if (type === "nativePpi") {
      const started = performance.now();
      const volume = await getVolume(payload.frame);
      const nativePpiKey = nativePpiCacheKey(payload);
      const cached = nativePpiCache.get(nativePpiKey);
      if (cached) {
        const rgba = new Uint8Array(cached.rgba);
        const azimuths = new Float32Array(cached.azimuths);
        self.postMessage(
          {
            id,
            ok: true,
            result: {
              frameId: payload.frame.id,
              meta: cached.meta,
              rgba,
              azimuths,
              width: cached.width,
              height: cached.height,
              rangeKm: cached.rangeKm,
              elapsedMs: performance.now() - started,
              cacheHit: true,
            },
          },
          [rgba.buffer, azimuths.buffer],
        );
        return;
      }
      const panel = volume.render_native_ppi(
        payload.product,
        payload.cut,
        payload.paletteName || "browser native PPI palette",
        payload.paletteFamily || "",
        payload.paletteText || "",
      );
      const meta = JSON.parse(panel.meta_json());
      const rgba = panel.rgba();
      const azimuths = panel.azimuths();
      const width = panel.width();
      const height = panel.height();
      const rangeKm = panel.range_km();
      panel.free?.();
      nativePpiCache.set(nativePpiKey, {
        rgba: new Uint8Array(rgba),
        azimuths: new Float32Array(azimuths),
        width,
        height,
        rangeKm,
        meta,
      });
      trimCache(nativePpiCache, undefined, cacheLimits.nativePpi);
      self.postMessage(
        {
          id,
          ok: true,
          result: {
            frameId: payload.frame.id,
            meta,
            rgba,
            azimuths,
            width,
            height,
            rangeKm,
            elapsedMs: performance.now() - started,
            cacheHit: false,
          },
        },
        [rgba.buffer, azimuths.buffer],
      );
      return;
    }
    if (type === "crossSection") {
      const started = performance.now();
      const volume = await getVolume(payload.frame);
      const sectionKey = crossSectionCacheKey(payload);
      const cached = sectionCache.get(sectionKey);
      if (cached) {
        const rgba = new Uint8Array(cached.rgba);
        self.postMessage(
          {
            id,
            ok: true,
            result: {
              frameId: payload.frame.id,
              meta: cached.meta,
              rgba,
              width: cached.width,
              height: cached.height,
              elapsedMs: performance.now() - started,
              cacheHit: true,
            },
          },
          [rgba.buffer],
        );
        return;
      }
      const section = volume.render_cross_section(
        payload.product,
        payload.startEastKm,
        payload.startNorthKm,
        payload.endEastKm,
        payload.endNorthKm,
        payload.width,
        payload.height,
        payload.topKm,
        payload.paletteName || "browser cross-section palette",
        payload.paletteFamily || "",
        payload.paletteText || "",
      );
      const meta = JSON.parse(section.meta_json());
      const rgba = section.rgba();
      const width = section.width();
      const height = section.height();
      section.free?.();
      sectionCache.set(sectionKey, {
        rgba: new Uint8Array(rgba),
        width,
        height,
        meta,
      });
      trimCache(sectionCache, undefined, cacheLimits.sections);
      self.postMessage(
        {
          id,
          ok: true,
          result: {
            frameId: payload.frame.id,
            meta,
            rgba,
            width,
            height,
            elapsedMs: performance.now() - started,
            cacheHit: false,
          },
        },
        [rgba.buffer],
      );
      return;
    }
    if (type === "nativeRhi") {
      const started = performance.now();
      const volume = await getVolume(payload.frame);
      const nativeRhiKey = nativeRhiCacheKey(payload);
      const cached = nativeRhiCache.get(nativeRhiKey);
      if (cached) {
        const rgba = new Uint8Array(cached.rgba);
        self.postMessage(
          {
            id,
            ok: true,
            result: {
              frameId: payload.frame.id,
              meta: cached.meta,
              rgba,
              width: cached.width,
              height: cached.height,
              elapsedMs: performance.now() - started,
              cacheHit: true,
            },
          },
          [rgba.buffer],
        );
        return;
      }
      const panel = volume.render_native_rhi(
        payload.product,
        payload.cut,
        payload.width || 0,
        payload.height || 0,
        payload.topKm || 0,
        payload.maxRangeKm || payload.rangeKm || 0,
        Boolean(payload.allowDownscale),
        payload.requireRhi !== false,
        payload.paletteName || "browser native RHI palette",
        payload.paletteFamily || "",
        payload.paletteText || "",
      );
      const meta = JSON.parse(panel.meta_json());
      const rgba = panel.rgba();
      const width = panel.width();
      const height = panel.height();
      panel.free?.();
      nativeRhiCache.set(nativeRhiKey, {
        rgba: new Uint8Array(rgba),
        width,
        height,
        meta,
      });
      trimCache(nativeRhiCache, undefined, cacheLimits.nativeRhi);
      self.postMessage(
        {
          id,
          ok: true,
          result: {
            frameId: payload.frame.id,
            meta,
            rgba,
            width,
            height,
            elapsedMs: performance.now() - started,
            cacheHit: false,
          },
        },
        [rgba.buffer],
      );
      return;
    }
    if (type === "analysis") {
      const started = performance.now();
      const volume = await getVolume(payload.frame);
      const analysisKey = frameCacheKey(payload.frame);
      const cached = analysisCache.get(analysisKey);
      if (cached) {
        self.postMessage({
          id,
          ok: true,
          result: {
            frameId: payload.frame.id,
            analysis: cached,
            elapsedMs: performance.now() - started,
            cacheHit: true,
          },
        });
        return;
      }
      const analysis = JSON.parse(volume.analysis_json());
      analysisCache.set(analysisKey, analysis);
      trimCache(analysisCache, undefined, cacheLimits.analyses);
      self.postMessage({
        id,
        ok: true,
        result: {
          frameId: payload.frame.id,
          analysis,
          elapsedMs: performance.now() - started,
          cacheHit: false,
        },
      });
      return;
    }
    if (type === "torTracksFrame") {
      const result = await computeTorTracksFrame(payload);
      self.postMessage(
        {
          id,
          ok: true,
          result,
        },
        [result.rgba.buffer, result.values.buffer],
      );
      return;
    }
    if (type === "torTracksLoop") {
      const started = performance.now();
      const frames = payload.frames || [];
      let accumulator = null;
      const tracks = [];
      const transfer = [];
      const tdsByKey = new Map();
      for (const [frameIndex, frame] of frames.entries()) {
        const frameResult = await computeTorTracksFrame({ ...payload, frame });
        if (!accumulator || accumulator.length !== frameResult.values.length) {
          accumulator = nanFloat32Array(frameResult.values.length);
        }
        maxCompositeTorTrackValues(accumulator, frameResult.values);
        for (const gate of frameResult.meta.tds || []) {
          const key = `${Math.round(Number(gate.eastKm || 0) * 10)}:${Math.round(Number(gate.northKm || 0) * 10)}:${gate.id || ""}`;
          if (!tdsByKey.has(key)) {
            tdsByKey.set(key, {
              ...gate,
              frameIndex,
              frameId: frame.id || frame.cacheKey || null,
              volumeTime: frame.volumeTime || frameResult.meta.volumeTime || null,
            });
          }
        }
        const rgba = colorTorTrackValues(accumulator);
        const values = new Float32Array(accumulator);
        const meta = {
          ...frameResult.meta,
          type: "bowecho-tor-tracks-loop-frame-v1",
          frameIndex,
          frameCount: frames.length,
          accumulatedFrames: frameIndex + 1,
          tds: [...tdsByKey.values()],
          counts: {
            ...(frameResult.meta.counts || {}),
            tds: tdsByKey.size,
          },
          valueRange: torTrackValueStats(accumulator),
        };
        const track = {
          frameId: frame.id || frame.cacheKey || null,
          frame,
          meta,
          rgba,
          values,
          width: frameResult.width,
          height: frameResult.height,
          elapsedMs: frameResult.elapsedMs,
          cacheHit: frameResult.cacheHit,
        };
        transfer.push(rgba.buffer, values.buffer);
        tracks.push(track);
      }
      self.postMessage(
        {
          id,
          ok: true,
          result: {
            tracks,
            elapsedMs: performance.now() - started,
            cacheHit: tracks.length > 0 && tracks.every((track) => track.cacheHit),
          },
        },
        transfer,
      );
      return;
    }
    if (type === "warm") {
      const started = performance.now();
      const frames = Array.from(payload.frames || []).filter(Boolean);
      const product = payload.product || "REF";
      const concurrency = clampInt(payload.concurrency ?? 4, 1, 8);
      const results = await mapLimit(frames, concurrency, async (frame) => {
        const frameStarted = performance.now();
        const key = frameCacheKey(frame);
        const hadBytes = byteCache.has(key);
        const hadVolume = volumeCache.has(key);
        const metaKey = `${key}|${product}`;
        const hadMeta = metaCache.has(metaKey);
        try {
          const volume = await getVolume(frame);
          let meta = null;
          if (payload.metadata !== false) meta = cutsMeta(volume, frame, product);
          return {
            frameId: frame.id || key,
            cacheKey: key,
            byteCacheHit: hadBytes,
            volumeCacheHit: hadVolume,
            metaCacheHit: payload.metadata === false ? null : hadMeta,
            site: meta?.site || frame.site || null,
            volumeTime: meta?.volumeTime || frame.volumeTime || null,
            elapsedMs: performance.now() - frameStarted,
          };
        } catch (error) {
          return {
            frameId: frame.id || key,
            cacheKey: key,
            error: String(error?.message || error),
            elapsedMs: performance.now() - frameStarted,
          };
        }
      });
      self.postMessage({
        id,
        ok: true,
        result: {
          frames: results,
          warmed: results.filter((result) => !result.error).length,
          failed: results.filter((result) => result.error).length,
          elapsedMs: performance.now() - started,
          stats: cacheStats(),
        },
      });
      return;
    }
    if (type === "stats") {
      self.postMessage({
        id,
        ok: true,
        result: cacheStats(),
      });
      return;
    }
    if (type === "configure") {
      configureCache(payload);
      enforceCacheLimits();
      self.postMessage({ id, ok: true, result: cacheStats() });
      return;
    }
    if (type === "clear") {
      for (const value of volumeCache.values()) value?.free?.();
      byteCache.clear();
      volumeCache.clear();
      metaCache.clear();
      renderCache.clear();
      sectionCache.clear();
      nativePpiCache.clear();
      nativeRhiCache.clear();
      diagnosticsCache.clear();
      analysisCache.clear();
      torTracksCache.clear();
      self.postMessage({ id, ok: true, result: { cleared: true } });
      return;
    }
    throw new Error(`unknown worker message: ${type}`);
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: String(error?.message || error),
    });
  }
};

async function getVolume(frame) {
  const cacheKey = frame.cacheKey || frame.id || frame.url;
  if (volumeCache.has(cacheKey)) return volumeCache.get(cacheKey);
  const volume = frame.merge && frame.urls?.length
    ? decode_supported_volume_parts(await getByteParts(frame))
    : decodeFrameBytes(frame, await getBytes(frame));
  volumeCache.set(cacheKey, volume);
  trimCache(volumeCache, (value) => value?.free?.(), cacheLimits.volumes);
  return volume;
}

function decodeFrameBytes(frame, bytes) {
  if (frame.decode === "nexrad-level2") return decode_level2(bytes);
  if (frame.format === "jma-grib2-tar" || frame.siteFilteredDecode) {
    return decode_jma_tar_station(bytes, jmaStationIdFromFrame(frame));
  }
  return decode_supported_volume(bytes);
}

function jmaStationIdFromFrame(frame) {
  const value = frame.internationalSiteId || frame.site || frame.internationalSite?.id || frame.plan?.siteId || frame.plan?.site?.id;
  const station = String(value || "").trim().toUpperCase();
  if (/^[A-Z0-9]{4}$/.test(station)) return station;
  throw new Error(`JMA tar frames require a four-character station id; got '${value || ""}'`);
}

function cutsMeta(volume, frame, product) {
  const key = `${frameCacheKey(frame)}|${product}`;
  if (metaCache.has(key)) return metaCache.get(key);
  const meta = JSON.parse(volume.cuts_json(product));
  metaCache.set(key, meta);
  trimCache(metaCache, undefined, cacheLimits.metadata);
  return meta;
}

async function computeTorTracksFrame(payload) {
  const started = performance.now();
  const volume = await getVolume(payload.frame);
  const tracksKey = torTracksCacheKey(payload);
  const cached = torTracksCache.get(tracksKey);
  if (cached) {
    return {
      frameId: payload.frame.id,
      meta: cached.meta,
      rgba: new Uint8Array(cached.rgba),
      values: new Float32Array(cached.values),
      width: cached.width,
      height: cached.height,
      elapsedMs: performance.now() - started,
      cacheHit: true,
    };
  }
  const tracks = volume.render_tor_tracks_frame(
    payload.halfExtentKm || 150,
    payload.cellKm || 0.5,
  );
  const meta = JSON.parse(tracks.meta_json());
  const rgba = new Uint8Array(tracks.rgba());
  const values = new Float32Array(tracks.values());
  const width = tracks.width();
  const height = tracks.height();
  tracks.free?.();
  torTracksCache.set(tracksKey, {
    meta,
    rgba: new Uint8Array(rgba),
    values: new Float32Array(values),
    width,
    height,
  });
  trimCache(torTracksCache, undefined, cacheLimits.torTracks);
  return {
    frameId: payload.frame.id,
    meta,
    rgba,
    values,
    width,
    height,
    elapsedMs: performance.now() - started,
    cacheHit: false,
  };
}

async function getBytes(frame) {
  const cacheKeys = byteCacheKeys(frame);
  for (const cacheKey of cacheKeys) {
    if (byteCache.has(cacheKey)) return byteCache.get(cacheKey);
  }
  let bytes;
  if (frame.bytes) {
    bytes = normalizeBytes(frame.bytes);
  } else if (frame.urls?.length) {
    bytes = await fetchMany(frame.urls);
  } else if (frame.url) {
    bytes = new Uint8Array(await fetchArrayBuffer(frame.url));
  } else {
    throw new Error(`no bytes or URL cached for frame ${cacheKeys[0]}; import the frame again or avoid clearing the worker cache`);
  }
  for (const cacheKey of cacheKeys) byteCache.set(cacheKey, bytes);
  trimCache(byteCache, undefined, cacheLimits.bytes);
  return bytes;
}

function byteCacheKeys(frame) {
  const keys = [frameCacheKey(frame)];
  if (frame.url) keys.push(`url:${frame.url}`);
  return [...new Set(keys.filter(Boolean))];
}

async function getByteParts(frame) {
  const cacheKey = frameCacheKey(frame);
  if (byteCache.has(cacheKey)) {
    const cached = byteCache.get(cacheKey);
    if (Array.isArray(cached)) return cached.map((part) => new Uint8Array(part));
  }
  if (!frame.urls?.length) throw new Error(`no part URLs for merged frame ${cacheKey}`);
  const parts = await mapLimit(frame.urls, 8, async (url) => new Uint8Array(await fetchArrayBuffer(url)));
  byteCache.set(cacheKey, parts.map((part) => new Uint8Array(part)));
  trimCache(byteCache, undefined, cacheLimits.bytes);
  return parts;
}

function frameCacheKey(frame) {
  return frame.cacheKey || frame.id || frame.url || frame.urls?.join("|");
}

function renderCacheKey(payload) {
  return [
    frameCacheKey(payload.frame),
    payload.product,
    payload.cut,
    payload.width,
    payload.height,
    payload.rangeKm,
    payload.smoothing || "native",
    payload.stormDirDeg || 240,
    payload.stormSpeedKt || 35,
    payload.paletteKey || "",
  ].join("|");
}

function crossSectionCacheKey(payload) {
  return [
    frameCacheKey(payload.frame),
    "xsection",
    payload.product,
    payload.startEastKm,
    payload.startNorthKm,
    payload.endEastKm,
    payload.endNorthKm,
    payload.width,
    payload.height,
    payload.topKm,
    payload.paletteKey || "",
  ].join("|");
}

function nativeRhiCacheKey(payload) {
  return [
    frameCacheKey(payload.frame),
    "native-rhi",
    payload.product,
    payload.cut,
    payload.width || 0,
    payload.height || 0,
    payload.topKm || 0,
    payload.maxRangeKm || payload.rangeKm || 0,
    payload.allowDownscale ? "downscale" : "native",
    payload.requireRhi === false ? "any-scan" : "rhi-only",
    payload.paletteKey || "",
  ].join("|");
}

function nativePpiCacheKey(payload) {
  return [
    frameCacheKey(payload.frame),
    "native-ppi",
    payload.product,
    payload.cut,
    payload.paletteKey || "",
  ].join("|");
}

function torTracksCacheKey(payload) {
  return [
    frameCacheKey(payload.frame),
    "tor-tracks",
    payload.halfExtentKm || 150,
    payload.cellKm || 0.5,
  ].join("|");
}

async function fetchMany(urls) {
  const parts = await mapLimit(urls, 8, async (url) => new Uint8Array(await fetchArrayBuffer(url)));
  const total = parts.reduce((sum, part) => sum + part.byteLength, 0);
  const joined = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    joined.set(part, offset);
    offset += part.byteLength;
  }
  return joined;
}

async function fetchArrayBuffer(url) {
  const response = await fetch(url, { cache: "default" });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.arrayBuffer();
}

function normalizeBytes(bytes) {
  if (bytes instanceof Uint8Array) return bytes;
  if (bytes instanceof ArrayBuffer) return new Uint8Array(bytes);
  if (ArrayBuffer.isView(bytes)) return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  throw new Error("expected bytes as Uint8Array, ArrayBuffer, or typed-array view");
}

function byteFingerprint(bytes) {
  let hash = 2166136261;
  for (let index = 0; index < bytes.length; index += 1) {
    hash ^= bytes[index];
    hash = Math.imul(hash, 16777619);
  }
  return `${bytes.byteLength.toString(16)}-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function hashText(text) {
  const value = String(text || "");
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      out[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return out;
}

function trimCache(cache, dispose, maxItems) {
  while (cache.size > maxItems) {
    const key = cache.keys().next().value;
    const value = cache.get(key);
    cache.delete(key);
    dispose?.(value);
  }
}

function clampInt(value, min, max) {
  const number = Math.trunc(Number(value));
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
}

function configureCache(options = {}) {
  for (const [key, value] of Object.entries(options || {})) {
    if (!(key in cacheLimits)) continue;
    cacheLimits[key] = clampInt(value, 0, 2048);
  }
}

function enforceCacheLimits() {
  trimCache(byteCache, undefined, cacheLimits.bytes);
  trimCache(volumeCache, (value) => value?.free?.(), cacheLimits.volumes);
  trimCache(metaCache, undefined, cacheLimits.metadata);
  trimCache(renderCache, undefined, cacheLimits.renders);
  trimCache(sectionCache, undefined, cacheLimits.sections);
  trimCache(nativePpiCache, undefined, cacheLimits.nativePpi);
  trimCache(nativeRhiCache, undefined, cacheLimits.nativeRhi);
  trimCache(diagnosticsCache, undefined, cacheLimits.diagnostics);
  trimCache(analysisCache, undefined, cacheLimits.analyses);
  trimCache(torTracksCache, undefined, cacheLimits.torTracks);
}

function cacheStats() {
  return {
    bytes: byteCache.size,
    volumes: volumeCache.size,
    metadata: metaCache.size,
    renders: renderCache.size,
    sections: sectionCache.size,
    nativePpi: nativePpiCache.size,
    nativeRhi: nativeRhiCache.size,
    diagnostics: diagnosticsCache.size,
    analyses: analysisCache.size,
    torTracks: torTracksCache.size,
    limits: { ...cacheLimits },
    maxBytes: cacheLimits.bytes,
    maxVolumes: cacheLimits.volumes,
    maxMetadata: cacheLimits.metadata,
    maxRenders: cacheLimits.renders,
    maxSections: cacheLimits.sections,
    maxNativePpi: cacheLimits.nativePpi,
    maxNativeRhi: cacheLimits.nativeRhi,
    maxDiagnostics: cacheLimits.diagnostics,
    maxAnalyses: cacheLimits.analyses,
    maxTorTracks: cacheLimits.torTracks,
  };
}

function nanFloat32Array(length) {
  const out = new Float32Array(length);
  out.fill(Number.NaN);
  return out;
}

function maxCompositeTorTrackValues(accumulator, frame) {
  for (let index = 0; index < accumulator.length && index < frame.length; index += 1) {
    const value = frame[index];
    if (Number.isFinite(value) && (!Number.isFinite(accumulator[index]) || value > accumulator[index])) {
      accumulator[index] = value;
    }
  }
}

function colorTorTrackValues(values) {
  const rgba = new Uint8Array(values.length * 4);
  for (let index = 0; index < values.length; index += 1) {
    rgba.set(rotationTrackColor(values[index]), index * 4);
  }
  return rgba;
}

function rotationTrackColor(shearE3) {
  if (!Number.isFinite(shearE3) || shearE3 < 3) return [0, 0, 0, 0];
  const stops = [
    [3, 35, 70, 220, 150],
    [8, 255, 230, 70, 205],
    [14, 235, 35, 35, 235],
    [20, 255, 40, 255, 255],
  ];
  const last = stops[stops.length - 1];
  if (shearE3 >= last[0]) return last.slice(1);
  for (let index = 0; index < stops.length - 1; index += 1) {
    const lo = stops[index];
    const hi = stops[index + 1];
    if (shearE3 < hi[0]) {
      const t = Math.max(0, Math.min(1, (shearE3 - lo[0]) / (hi[0] - lo[0])));
      return [
        Math.round(lo[1] + (hi[1] - lo[1]) * t),
        Math.round(lo[2] + (hi[2] - lo[2]) * t),
        Math.round(lo[3] + (hi[3] - lo[3]) * t),
        Math.round(lo[4] + (hi[4] - lo[4]) * t),
      ];
    }
  }
  return last.slice(1);
}

function torTrackValueStats(values) {
  let min = Infinity;
  let max = -Infinity;
  let finite = 0;
  let painted = 0;
  for (const value of values) {
    if (!Number.isFinite(value)) continue;
    min = Math.min(min, value);
    max = Math.max(max, value);
    finite += 1;
    if (value >= 3) painted += 1;
  }
  return finite > 0
    ? { min, max, finite, painted }
    : { min: null, max: null, finite: 0, painted: 0 };
}
