let h5wasm = null;
let FS = null;
let decoderSource = null;

self.onmessage = async (event) => {
  const message = event.data || {};
  if (message.type !== "decode") return;
  try {
    await ensureDecoder(message.decoderUrl, message.decoderFallbackUrl);
    const points = decodeGranule(message);
    self.postMessage({ id: message.id, ok: true, points });
  } catch (error) {
    self.postMessage({ id: message.id, ok: false, error: String(error?.message || error) });
  }
};

async function ensureDecoder(primary, fallback) {
  if (h5wasm && FS) return;
  let imported;
  try {
    imported = await import(primary);
    decoderSource = primary;
  } catch (error) {
    if (!fallback) throw error;
    imported = await import(fallback);
    decoderSource = fallback;
  }

  // The browser ESM build exposes the API as its default export. Keeping the
  // namespace fallback makes the worker tolerant of bundlers that rewrite it.
  const candidate = imported?.default || imported;
  const ready = candidate?.ready || imported?.ready;
  if (!ready) throw new Error(`h5wasm ready promise is missing (${decoderSource})`);
  const module = await ready;
  h5wasm = candidate?.File ? candidate : imported;
  FS = module?.FS || candidate?.FS || imported?.FS;
  if (!h5wasm?.File || !FS) throw new Error(`h5wasm browser API is incomplete (${decoderSource})`);
}

function decodeGranule(message) {
  const safeName = `/glm-${message.id}-${Date.now()}.nc`;
  FS.writeFile(safeName, new Uint8Array(message.buffer));
  let file;
  try {
    file = new h5wasm.File(safeName, "r");
    const lat = readScaled(file, ["flash_lat"]);
    const lon = readScaled(file, ["flash_lon"]);
    const quality = readScaled(file, ["flash_quality_flag"], { optional: true, unsigned: true });
    const energy = readScaled(file, ["flash_energy"], { optional: true, unsigned: true });
    const area = readScaled(file, ["flash_area"], { optional: true, unsigned: true });
    const timeOffset = readScaled(file, [
      "flash_time_offset_of_last_event",
      "flash_time_offset_of_first_event",
      "flash_frame_time_offset_of_last_event",
      "flash_time_offset",
    ], { optional: true, unsigned: true });
    const timeBase = timeBaseFromUnits(timeOffset.units) ?? Number(message.startTime || 0);
    const length = Math.min(lat.values.length, lon.values.length);
    const bounds = message.bounds || [-180, -90, 180, 90];
    const pointLimit = Math.max(250, Math.min(12000, Number(message.maxPoints) || 8000));
    const points = [];
    for (let index = 0; index < length; index += 1) {
      const latitude = Number(lat.values[index]);
      const longitude = Number(lon.values[index]);
      const q = Number(quality.values[index] ?? 0);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || q !== 0) continue;
      if (longitude < bounds[0] || latitude < bounds[1] || longitude > bounds[2] || latitude > bounds[3]) continue;
      const seconds = Number(timeOffset.values[index] ?? 0);
      points.push({
        lat: latitude,
        lon: longitude,
        time: timeBase + (Number.isFinite(seconds) ? seconds * 1000 : 0),
        energy: Number(energy.values[index] ?? 0),
        area: Number(area.values[index] ?? 0),
      });
      // Per-granule guard. The controller independently applies an even sample
      // across the complete display window, so this only protects pathological
      // files from growing worker memory without bound.
      if (points.length >= pointLimit) break;
    }
    return points;
  } finally {
    try { file?.close?.(); } catch {}
    try { FS.unlink(safeName); } catch {}
  }
}

function readScaled(file, names, { optional = false, unsigned = false } = {}) {
  let dataset = null;
  for (const name of names) {
    try {
      dataset = file.get(name);
      if (dataset) break;
    } catch {}
  }
  if (!dataset) {
    if (optional) return { values: [], units: "" };
    throw new Error(`GLM dataset missing: ${names.join(" or ")} (${decoderSource})`);
  }
  const raw = dataset.value;
  const values = ArrayBuffer.isView(raw) || Array.isArray(raw) ? raw : [raw];
  const scale = attrNumber(dataset, "scale_factor", 1);
  const offset = attrNumber(dataset, "add_offset", 0);
  const fill = attrNumber(dataset, "_FillValue", NaN);
  const shouldUnsigned = unsigned || /^true$/i.test(attrString(dataset, "_Unsigned", ""));
  const bits = integerBits(dataset, values);
  const normalizeUnsigned = (value) => shouldUnsigned && value < 0 && bits ? value + 2 ** bits : value;
  const normalizedFill = Number.isFinite(fill) ? normalizeUnsigned(fill) : NaN;
  return {
    units: attrString(dataset, "units", ""),
    values: Array.from(values, (value) => {
      const rawNumber = Number(value);
      const number = normalizeUnsigned(rawNumber);
      if (Number.isFinite(normalizedFill) && number === normalizedFill) return NaN;
      return number * scale + offset;
    }),
  };
}

function integerBits(dataset, values) {
  const dtype = String(dataset?.dtype || dataset?.type || dataset?.metadata?.dtype || "").toLowerCase();
  const match = dtype.match(/(?:int|uint|i|u)(8|16|32|64)|[<>|]?[iu](1|2|4|8)/);
  if (match) {
    const direct = Number(match[1]);
    if (direct) return direct;
    const bytes = Number(match[2]);
    if (bytes) return bytes * 8;
  }
  const bytes = Number(values?.BYTES_PER_ELEMENT);
  return Number.isFinite(bytes) && bytes > 0 ? bytes * 8 : 16;
}

function timeBaseFromUnits(units) {
  const match = String(units || "").match(/seconds\s+since\s+(.+)/i);
  if (!match) return null;
  let normalized = match[1].trim().replace(/^(\d{4}-\d{2}-\d{2})\s+/, "$1T");
  if (!/(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized)) normalized += "Z";
  const time = Date.parse(normalized);
  return Number.isFinite(time) ? time : null;
}

function attributeValue(dataset, name) {
  const entry = dataset?.attrs?.[name];
  if (entry && typeof entry === "object" && "value" in entry) return entry.value;
  return entry;
}

function scalarAttribute(dataset, name) {
  const value = attributeValue(dataset, name);
  if (Array.isArray(value) || ArrayBuffer.isView(value)) return value[0];
  return value;
}

function attrNumber(dataset, name, fallback) {
  const number = Number(scalarAttribute(dataset, name));
  return Number.isFinite(number) ? number : fallback;
}

function attrString(dataset, name, fallback) {
  const value = attributeValue(dataset, name);
  if (value instanceof Uint8Array) return new TextDecoder().decode(value).replace(/\0+$/, "");
  const scalar = Array.isArray(value) || ArrayBuffer.isView(value) ? value[0] : value;
  return scalar == null ? fallback : String(scalar);
}
