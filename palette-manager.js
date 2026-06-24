const STORAGE_KEY = "meowdar:palettes:v1";
const SETTINGS_KEY = "meowdar:palette-settings:v1";

const PRODUCT_META = {
  REF: { family: "reflectivity", code: "BR", units: "dBZ", floor: -20 },
  VEL: { family: "velocity", code: "BV", units: "kt", floor: null },
  DVEL: { family: "velocity", code: "BV", units: "kt", floor: null },
  CC: { family: "correlationCoefficient", code: "CC", units: "", floor: null },
};

const BUILTINS = [
  makePalette("builtin-ref-operational", "Operational Reflectivity", "REF", [
    [-20, [0, 0, 0, 0]], [-5, [40, 40, 40, 120]], [0, [0, 236, 236, 255]],
    [10, [0, 160, 246, 255]], [20, [0, 0, 246, 255]], [30, [0, 255, 0, 255]],
    [40, [0, 200, 0, 255]], [50, [255, 255, 0, 255]], [60, [255, 0, 0, 255]],
    [70, [255, 0, 255, 255]], [80, [255, 255, 255, 255]],
  ], [129, 33, 139, 255]),
  makePalette("builtin-vel-operational", "Operational Velocity", "DVEL", [
    [-90, [120, 0, 90, 255]], [-60, [210, 0, 60, 255]], [-40, [255, 50, 35, 255]],
    [-20, [255, 170, 80, 255]], [-5, [80, 45, 30, 255]], [0, [24, 28, 28, 255]],
    [5, [20, 65, 45, 255]], [20, [70, 210, 120, 255]], [40, [0, 245, 140, 255]],
    [60, [0, 180, 210, 255]], [90, [70, 80, 255, 255]],
  ], [129, 33, 139, 255]),
  makePalette("builtin-cc-operational", "Operational Correlation", "CC", [
    [0.2, [20, 20, 20, 255]], [0.5, [90, 40, 130, 255]], [0.7, [0, 90, 200, 255]],
    [0.8, [0, 190, 220, 255]], [0.9, [40, 210, 80, 255]], [0.95, [230, 220, 40, 255]],
    [0.98, [255, 120, 40, 255]], [1, [255, 255, 255, 255]],
  ], [129, 33, 139, 255]),
];

function makePalette(id, name, product, stops, rangeFolded) {
  const meta = PRODUCT_META[product];
  return {
    type: "bowecho-palette-v1",
    id,
    name,
    format: "gr-pal",
    productCode: meta.code,
    family: meta.family,
    units: meta.units,
    legendStep: product === "CC" ? 0.05 : 10,
    rangeFolded,
    sampleMode: "gr-pal",
    stops: stops.map(([value, color]) => ({ value, color, endColor: null, solid: false })),
    warnings: [],
    sourceName: "Meowdar built-in",
  };
}

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function normalizeColor(color, fallback = [255, 255, 255, 255]) {
  const source = Array.isArray(color) || ArrayBuffer.isView(color) ? Array.from(color) : fallback;
  return [0, 1, 2, 3].map((index) => Math.max(0, Math.min(255, Math.round(Number(source[index] ?? fallback[index]) || 0))));
}

function normalizePalette(input, fallbackProduct = "REF") {
  if (!input || typeof input !== "object") throw new Error("The color table is not a palette object.");
  const palette = clone(input);
  const inferredProduct = palette.family === "velocity" ? "DVEL"
    : palette.family === "correlationCoefficient" ? "CC"
    : palette.family === "reflectivity" ? "REF"
    : inferFamily(palette.productCode, palette.sourceName || palette.name) === "velocity" ? "DVEL"
    : inferFamily(palette.productCode, palette.sourceName || palette.name) === "correlationCoefficient" ? "CC"
    : fallbackProduct;
  const meta = PRODUCT_META[inferredProduct] || PRODUCT_META.REF;
  const stops = Array.isArray(palette.stops) ? palette.stops : [];
  palette.type = "bowecho-palette-v1";
  palette.id = String(palette.id || `user-${Date.now().toString(36)}`);
  palette.name = String(palette.name || "Imported palette").slice(0, 80);
  palette.format ||= "gr-pal";
  palette.productCode ||= meta.code;
  palette.family = palette.family || meta.family;
  palette.units ??= meta.units;
  palette.sampleMode ||= "gr-pal";
  palette.rangeFolded = normalizeColor(palette.rangeFolded, [129, 33, 139, 255]);
  palette.stops = stops.map((stop) => {
    const value = Number(stop?.value);
    if (!Number.isFinite(value)) return null;
    return {
      value,
      color: normalizeColor(stop?.color, [255, 255, 255, 255]),
      endColor: stop?.endColor == null ? null : normalizeColor(stop.endColor, stop.color),
      solid: Boolean(stop?.solid),
    };
  }).filter(Boolean).sort((a, b) => a.value - b.value);
  if (palette.stops.length < 2) throw new Error("A color table needs at least two valid stops.");
  palette.warnings = Array.isArray(palette.warnings) ? palette.warnings : [];
  return palette;
}

function paletteContentSignature(palette) {
  if (!palette) return "";
  return JSON.stringify({
    family: palette.family,
    units: palette.units,
    legendStep: palette.legendStep,
    rangeFolded: palette.rangeFolded,
    sampleMode: palette.sampleMode,
    stops: palette.stops,
  });
}

function safeJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function rgbaToHex(color) {
  const values = Array.isArray(color) ? color : [0, 0, 0, 255];
  return `#${values.slice(0, 3).map((value) => Math.max(0, Math.min(255, Number(value) || 0)).toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgba(hex, alpha = 255) {
  const clean = String(hex || "#000000").replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((part) => part + part).join("") : clean.padEnd(6, "0").slice(0, 6);
  return [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16) || 0).concat(Math.max(0, Math.min(255, Number(alpha) || 0)));
}

function paletteProduct(palette) {
  const family = palette?.family;
  if (family === "velocity") return "DVEL";
  if (family === "correlationCoefficient") return "CC";
  return "REF";
}

function productFamily(product) {
  return PRODUCT_META[product]?.family || PRODUCT_META.REF.family;
}

function productLabel(product) {
  const family = productFamily(product);
  if (family === "velocity") return "velocity";
  if (family === "correlationCoefficient") return "correlation";
  return "reflectivity";
}

function defaultPaletteForProduct(product) {
  const family = productFamily(product);
  return clone(BUILTINS.find((palette) => palette.family === family) || null);
}

function colorAt(palette, value) {
  const stops = [...(palette?.stops || [])].sort((a, b) => a.value - b.value);
  if (!stops.length) return [255, 255, 255, 255];
  if (value <= stops[0].value) return [...stops[0].color];
  if (value >= stops.at(-1).value) return [...stops.at(-1).color];
  const upperIndex = stops.findIndex((stop) => stop.value >= value);
  const lower = stops[Math.max(0, upperIndex - 1)];
  const upper = stops[upperIndex];
  if (lower.solid || upper.value === lower.value) return [...lower.color];
  const amount = (value - lower.value) / (upper.value - lower.value);
  return lower.color.map((channel, index) => Math.round(channel + (upper.color[index] - channel) * amount));
}

function applyReflectivityFloor(palette, floor) {
  if (!Number.isFinite(floor)) return palette;
  const output = clone(palette);
  const visibleColor = colorAt(output, floor);
  output.stops = output.stops
    .filter((stop) => Math.abs(Number(stop.value) - floor) > 0.0001)
    .map((stop) => Number(stop.value) < floor
      ? { ...stop, color: [stop.color[0], stop.color[1], stop.color[2], 0], endColor: stop.endColor ? [stop.endColor[0], stop.endColor[1], stop.endColor[2], 0] : null }
      : stop);
  output.stops.push({ value: floor - 0.001, color: [visibleColor[0], visibleColor[1], visibleColor[2], 0], endColor: null, solid: true });
  output.stops.push({ value: floor, color: visibleColor, endColor: null, solid: true });
  output.stops.sort((a, b) => a.value - b.value);
  return output;
}

function transparentColor(color) {
  const normalized = normalizeColor(color, [0, 0, 0, 0]);
  return [normalized[0], normalized[1], normalized[2], 0];
}

function applyVelocityDeadband(palette, deadband) {
  const threshold = Math.max(0, Number(deadband) || 0);
  if (!threshold) return palette;
  const output = clone(palette);
  const negativeVisible = colorAt(output, -threshold);
  const positiveVisible = colorAt(output, threshold);
  const epsilon = Math.max(0.001, threshold / 10000);
  output.stops = output.stops
    .filter((stop) => Math.abs(Math.abs(Number(stop.value)) - threshold) > epsilon / 2)
    .map((stop) => Math.abs(Number(stop.value)) < threshold
      ? { ...stop, color: transparentColor(stop.color), endColor: stop.endColor ? transparentColor(stop.endColor) : null }
      : stop);
  output.stops.push(
    { value: -threshold - epsilon, color: negativeVisible, endColor: null, solid: true },
    { value: -threshold, color: transparentColor(negativeVisible), endColor: null, solid: true },
    { value: threshold - epsilon, color: transparentColor(positiveVisible), endColor: null, solid: true },
    { value: threshold, color: positiveVisible, endColor: null, solid: true },
  );
  output.stops.sort((a, b) => a.value - b.value);
  return output;
}

function applyCorrelationFloor(palette, floor) {
  const threshold = Number(floor);
  if (!Number.isFinite(threshold)) return palette;
  const output = clone(palette);
  const visibleColor = colorAt(output, threshold);
  const epsilon = 0.0001;
  output.stops = output.stops
    .filter((stop) => Math.abs(Number(stop.value) - threshold) > epsilon / 2)
    .map((stop) => Number(stop.value) < threshold
      ? { ...stop, color: transparentColor(stop.color), endColor: stop.endColor ? transparentColor(stop.endColor) : null }
      : stop);
  output.stops.push(
    { value: threshold - epsilon, color: transparentColor(visibleColor), endColor: null, solid: true },
    { value: threshold, color: visibleColor, endColor: null, solid: true },
  );
  output.stops.sort((a, b) => a.value - b.value);
  return output;
}

function inferFamily(productCode, fileName = "") {
  const probe = `${productCode || ""} ${fileName}`.toUpperCase();
  if (/VEL|BV|VR/.test(probe)) return "velocity";
  if (/CC|RHO/.test(probe)) return "correlationCoefficient";
  return "reflectivity";
}

function parseFallback(text, options = {}) {
  const lines = String(text || "").split(/\r?\n/);
  let productCode = null;
  let units = null;
  let legendStep = null;
  let rangeFolded = [129, 33, 139, 255];
  const stops = [];
  for (const original of lines) {
    const line = original.trim();
    if (!line || line.startsWith(";") || line.startsWith("#")) continue;
    const split = line.split(":");
    if (split.length < 2) continue;
    const key = split.shift().trim().toLowerCase();
    const payload = split.join(":").trim();
    const fields = payload.split(/[\s,]+/).filter(Boolean).map(Number);
    if (key === "product") productCode = payload || null;
    else if (key === "units") units = payload || null;
    else if (key === "step") legendStep = Number.isFinite(fields[0]) ? fields[0] : null;
    else if (key === "rf" && fields.length >= 3) rangeFolded = [fields[0], fields[1], fields[2], fields[3] ?? 255].map((v) => Math.max(0, Math.min(255, v)));
    else if ((key === "color" || key === "solidcolor") && fields.length >= 4) {
      stops.push({ value: fields[0], color: [fields[1], fields[2], fields[3], 255], endColor: fields.length >= 7 ? [fields[4], fields[5], fields[6], 255] : null, solid: key === "solidcolor" });
    } else if (key === "color4" && fields.length >= 5) {
      stops.push({ value: fields[0], color: [fields[1], fields[2], fields[3], fields[4]], endColor: fields.length >= 9 ? [fields[5], fields[6], fields[7], fields[8]] : null, solid: false });
    }
  }
  if (!stops.length) throw new Error("No Color, Color4, or SolidColor rows were found.");
  const family = options.family || inferFamily(productCode, options.fileName || options.name);
  return {
    type: "bowecho-palette-v1",
    id: options.id || `user-${Date.now().toString(36)}`,
    name: options.name || "Imported palette",
    format: "gr-pal",
    productCode,
    family,
    units,
    legendStep,
    rangeFolded,
    sampleMode: "gr-pal",
    stops: stops.sort((a, b) => a.value - b.value),
    warnings: [],
    sourceName: options.fileName || null,
  };
}

function exportFallback(palette) {
  const lines = [];
  if (palette.productCode) lines.push(`Product: ${palette.productCode}`);
  if (palette.units) lines.push(`Units: ${palette.units}`);
  if (palette.legendStep != null) lines.push(`Step: ${palette.legendStep}`);
  lines.push(`RF: ${palette.rangeFolded.join(" ")}`);
  for (const stop of [...palette.stops].sort((a, b) => a.value - b.value)) {
    const key = stop.solid ? "SolidColor" : stop.color[3] !== 255 || stop.endColor?.[3] !== 255 ? "Color4" : "Color";
    const start = key === "Color4" ? stop.color : stop.color.slice(0, 3);
    const end = stop.endColor ? (key === "Color4" ? stop.endColor : stop.endColor.slice(0, 3)) : [];
    lines.push(`${key}: ${stop.value} ${[...start, ...end].join(" ")}`);
  }
  return `${lines.join("\n")}\n`;
}

export class PaletteManager {
  constructor({ product = () => "REF", onApply = () => {}, toast = () => {} } = {}) {
    this.product = product;
    this.onApply = onApply;
    this.toast = toast;
    this.toolbox = null;
    this.store = null;
    this.palettes = this.loadPalettes();
    this.settings = {
      active: { REF: "default", VEL: "default", DVEL: "default", CC: "default" },
      dbzFloor: -10,
      velocityDeadband: 0,
      ccFloor: 0.2,
      rangeFoldMode: "show",
      rangeFoldColor: "#81218b",
      ...safeJson(SETTINGS_KEY, {}),
    };
    this.draft = null;
    this.originalDraftSignature = "";
    this.ui = this.collectUi();
    this.bind();
    this.syncCompact();
  }

  collectUi() {
    const byId = (id) => document.getElementById(id);
    return {
      button: byId("paletteButton"), compactButton: byId("openPaletteButton"), dialog: byId("paletteDialog"), close: byId("closePaletteDialog"),
      select: byId("paletteSelect"), name: byId("paletteName"), preview: byId("palettePreview"), stops: byId("paletteStops"),
      addStop: byId("addPaletteStop"), importButton: byId("importPaletteButton"), file: byId("paletteFile"), exportButton: byId("exportPaletteButton"),
      deleteButton: byId("deletePaletteButton"), floor: byId("paletteDbzFloor"), floorValue: byId("dbzFloorValue"),
      velocityDeadband: byId("paletteVelocityDeadband"), velocityDeadbandValue: byId("velocityDeadbandValue"),
      ccFloor: byId("paletteCcFloor"), ccFloorValue: byId("ccFloorValue"),
      rfMode: byId("rangeFoldMode"), rfColor: byId("rangeFoldColor"), apply: byId("applyPaletteButton"), status: byId("paletteStatus"),
      label: byId("paletteLabel"), swatch: document.querySelector("#openPaletteButton .palette-swatch"), floorRow: byId("dbzFloorRow"),
      velocityDeadbandRow: byId("velocityDeadbandRow"), ccFloorRow: byId("ccFloorRow"),
    };
  }

  connectToolbox(toolbox) {
    this.toolbox = toolbox || null;
    try {
      this.store = toolbox?.createPaletteStore?.({ key: STORAGE_KEY }) || null;
      if (this.store) {
        const existing = new Map(this.store.list().map((palette) => [palette.id, palette]));
        for (const palette of this.palettes) {
          if (!existing.has(palette.id)) this.store.savePalette(palette, { id: palette.id, name: palette.name, family: palette.family, sourceName: palette.sourceName });
        }
        this.palettes = this.store.list();
      }
    } catch (error) {
      console.warn("Palette store initialization failed; using local fallback.", error);
      this.store = null;
    }
    this.syncCompact();
  }

  setProduct() {
    this.syncCompact();
    if (this.ui.dialog?.open) this.open();
  }

  activeId(product = this.product()) {
    return this.settings.active?.[product] || "default";
  }

  activeBasePalette(product = this.product()) {
    const id = this.activeId(product);
    if (id === "default") return defaultPaletteForProduct(product);
    return clone(this.listForProduct(product).find((palette) => palette.id === id) || null);
  }

  renderPalette(product = this.product()) {
    let palette = this.activeBasePalette(product);
    if (!palette) return null;
    const family = productFamily(product);
    if (family === "reflectivity") palette = applyReflectivityFloor(palette, Number(this.settings.dbzFloor));
    else if (family === "velocity") palette = applyVelocityDeadband(palette, Number(this.settings.velocityDeadband));
    else if (family === "correlationCoefficient") palette = applyCorrelationFloor(palette, Number(this.settings.ccFloor));
    if (this.settings.rangeFoldMode === "hide") palette.rangeFolded = [0, 0, 0, 0];
    else if (this.settings.rangeFoldMode === "custom") palette.rangeFolded = hexToRgba(this.settings.rangeFoldColor, 255);
    return palette;
  }

  renderOverrides(product = this.product()) {
    const palette = this.renderPalette(product);
    return palette ? { palette } : {};
  }

  legend(product = this.product()) {
    const palette = this.renderPalette(product);
    if (!palette?.stops?.length) return null;
    return { css: this.gradientCss(palette), units: palette.units || PRODUCT_META[product]?.units || "", values: this.legendValues(palette) };
  }

  listForProduct(product = this.product()) {
    const family = PRODUCT_META[product]?.family;
    return this.allPalettes().filter((palette) => palette.family === family || paletteProduct(palette) === product);
  }

  allPalettes() {
    const list = this.store ? this.store.list() : this.palettes;
    const seen = new Set();
    return [...BUILTINS, ...list].filter((palette) => palette?.id && !seen.has(palette.id) && seen.add(palette.id));
  }

  loadPalettes() {
    const saved = safeJson(STORAGE_KEY, []);
    return (Array.isArray(saved) ? saved : []).filter((palette) => palette?.id && !String(palette.id).startsWith("builtin-"));
  }

  persist() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
      if (!this.store) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.palettes));
    } catch (error) {
      console.warn("Palette preferences could not be persisted.", error);
    }
    this.syncCompact();
  }

  bind() {
    this.ui.button?.addEventListener("click", () => this.open());
    this.ui.compactButton?.addEventListener("click", () => this.open());
    this.ui.close?.addEventListener("click", () => this.ui.dialog?.close());
    this.ui.dialog?.addEventListener("click", (event) => { if (event.target === this.ui.dialog) this.ui.dialog.close(); });
    this.ui.select?.addEventListener("change", () => this.select(this.ui.select.value));
    this.ui.name?.addEventListener("input", () => { if (this.draft) { this.draft.name = this.ui.name.value || "Custom palette"; this.updatePreview(); } });
    this.ui.addStop?.addEventListener("click", () => this.addStop());
    this.ui.stops?.addEventListener("input", (event) => this.editStop(event));
    this.ui.stops?.addEventListener("click", (event) => this.removeStop(event));
    this.ui.importButton?.addEventListener("click", () => this.ui.file?.click());
    this.ui.file?.addEventListener("change", () => this.importFile());
    this.ui.exportButton?.addEventListener("click", () => this.exportCurrent());
    this.ui.deleteButton?.addEventListener("click", () => this.deleteCurrent());
    this.ui.floor?.addEventListener("input", () => { this.ui.floorValue.textContent = `${this.ui.floor.value} dBZ`; });
    this.ui.velocityDeadband?.addEventListener("input", () => { this.ui.velocityDeadbandValue.textContent = `±${this.ui.velocityDeadband.value} kt`; });
    this.ui.ccFloor?.addEventListener("input", () => { this.ui.ccFloorValue.textContent = Number(this.ui.ccFloor.value).toFixed(2); });
    this.ui.rfMode?.addEventListener("change", () => { this.ui.rfColor.disabled = this.ui.rfMode.value !== "custom"; });
    this.ui.apply?.addEventListener("click", () => this.apply());
  }

  open() {
    const product = this.product();
    const current = this.activeId(product);
    const family = productFamily(product);
    this.ui.select.replaceChildren(new Option("Operational", "default"));
    for (const palette of this.listForProduct(product).filter((item) => !String(item.id).startsWith("builtin-"))) this.ui.select.add(new Option(palette.name, palette.id));
    this.ui.select.value = [...this.ui.select.options].some((option) => option.value === current) ? current : "default";
    this.ui.floorRow.hidden = family !== "reflectivity";
    this.ui.velocityDeadbandRow.hidden = family !== "velocity";
    this.ui.ccFloorRow.hidden = family !== "correlationCoefficient";
    this.ui.floor.value = String(Number.isFinite(Number(this.settings.dbzFloor)) ? this.settings.dbzFloor : -10);
    this.ui.floorValue.textContent = `${this.ui.floor.value} dBZ`;
    this.ui.velocityDeadband.value = String(Number.isFinite(Number(this.settings.velocityDeadband)) ? this.settings.velocityDeadband : 0);
    this.ui.velocityDeadbandValue.textContent = `±${this.ui.velocityDeadband.value} kt`;
    this.ui.ccFloor.value = String(Number.isFinite(Number(this.settings.ccFloor)) ? this.settings.ccFloor : 0.2);
    this.ui.ccFloorValue.textContent = Number(this.ui.ccFloor.value).toFixed(2);
    this.ui.rfMode.value = this.settings.rangeFoldMode || "show";
    this.ui.rfColor.value = this.settings.rangeFoldColor || "#81218b";
    this.ui.rfColor.disabled = this.ui.rfMode.value !== "custom";
    this.select(this.ui.select.value, false);
    if (this.ui.dialog && !this.ui.dialog.open) this.ui.dialog.showModal();
  }

  select(id, updateSetting = false) {
    const product = this.product();
    if (updateSetting) this.settings.active[product] = id;
    const palette = id === "default" ? defaultPaletteForProduct(product) : clone(this.allPalettes().find((item) => item.id === id));
    this.draft = palette;
    this.originalDraftSignature = paletteContentSignature(palette);
    this.ui.name.value = id === "default" ? "Operational" : palette?.name || "Custom palette";
    this.ui.name.disabled = false;
    this.ui.deleteButton.disabled = id === "default" || String(id).startsWith("builtin-");
    this.ui.exportButton.disabled = !palette;
    this.renderStops();
    this.updatePreview();
  }

  renderStops() {
    if (!this.ui.stops) return;
    this.ui.stops.replaceChildren();
    for (const [index, stop] of (this.draft?.stops || []).entries()) {
      const row = document.createElement("div");
      row.className = "palette-stop-row";
      row.dataset.index = String(index);
      row.innerHTML = `
        <input class="stop-value" type="number" step="0.1" value="${Number(stop.value)}" aria-label="Palette stop value">
        <input class="stop-color" type="color" value="${rgbaToHex(stop.color)}" aria-label="Palette stop color">
        <input class="stop-alpha" type="range" min="0" max="255" step="1" value="${Number(stop.color?.[3] ?? 255)}" aria-label="Palette stop opacity">
        <label class="stop-solid" title="Stepped color"><input type="checkbox" ${stop.solid ? "checked" : ""}><span>S</span></label>
        <button class="stop-remove" type="button" aria-label="Remove palette stop">×</button>`;
      this.ui.stops.appendChild(row);
    }
  }

  editStop(event) {
    const row = event.target.closest(".palette-stop-row");
    if (!row || !this.draft) return;
    const stop = this.draft.stops[Number(row.dataset.index)];
    if (!stop) return;
    stop.value = Number(row.querySelector(".stop-value").value);
    const alpha = Number(row.querySelector(".stop-alpha").value);
    stop.color = hexToRgba(row.querySelector(".stop-color").value, alpha);
    stop.solid = row.querySelector(".stop-solid input").checked;
    this.updatePreview();
  }

  removeStop(event) {
    const button = event.target.closest(".stop-remove");
    if (!button || !this.draft) return;
    const row = button.closest(".palette-stop-row");
    this.draft.stops.splice(Number(row.dataset.index), 1);
    this.renderStops();
    this.updatePreview();
  }

  addStop() {
    if (!this.draft) return;
    const last = this.draft.stops.at(-1);
    this.draft.stops.push({ value: Number(last?.value ?? 0) + 5, color: [...(last?.color || [255, 255, 255, 255])], endColor: null, solid: false });
    this.draft.stops.sort((a, b) => a.value - b.value);
    this.renderStops();
    this.updatePreview();
    this.ui.stops?.lastElementChild?.scrollIntoView?.({ block: "nearest" });
  }

  updatePreview() {
    if (!this.draft || !this.ui.preview) return;
    this.ui.preview.style.background = this.gradientCss(this.draft);
    this.ui.status.textContent = `${this.draft.stops.length} stops · ${PRODUCT_META[this.product()]?.units || "native units"}`;
  }

  gradientCss(palette) {
    const stops = [...(palette?.stops || [])].sort((a, b) => a.value - b.value);
    if (!stops.length) return "transparent";
    const min = stops[0].value;
    const max = stops.at(-1).value;
    const span = Math.max(0.0001, max - min);
    return `linear-gradient(90deg, ${stops.map((stop) => {
      const pct = ((stop.value - min) / span) * 100;
      const color = stop.color || [0, 0, 0, 0];
      return `rgba(${color[0]},${color[1]},${color[2]},${(color[3] ?? 255) / 255}) ${pct.toFixed(2)}%`;
    }).join(", ")})`;
  }

  legendValues(palette) {
    const stops = [...palette.stops].sort((a, b) => a.value - b.value);
    const min = stops[0].value;
    const max = stops.at(-1).value;
    return Array.from({ length: 6 }, (_, index) => max - ((max - min) * index / 5)).map((value) => Math.abs(value) < 2 ? value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "") : Math.round(value));
  }

  async importFile() {
    const file = this.ui.file?.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const name = file.name.replace(/\.(pal|txt|json)$/i, "");
      let palette;
      if (/\.json$/i.test(file.name)) palette = JSON.parse(text);
      else if (this.store?.importText) palette = this.store.importText(text, { name, fileName: file.name });
      else if (this.toolbox?.parseGrPalette) palette = this.toolbox.parseGrPalette(text, { name, fileName: file.name });
      else if (this.toolbox?.parsePalette) palette = this.toolbox.parsePalette(text, { name, fileName: file.name });
      else palette = parseFallback(text, { name, fileName: file.name });
      palette.id ||= `user-${Date.now().toString(36)}`;
      palette.sourceName ||= file.name;
      const targetProduct = paletteProduct(normalizePalette(palette, this.product()));
      palette = normalizePalette(palette, targetProduct);
      this.savePalette(palette);
      this.settings.active[targetProduct] = palette.id;
      if (productFamily(targetProduct) === productFamily(this.product())) this.settings.active[this.product()] = palette.id;
      this.persist();
      if (productFamily(targetProduct) === productFamily(this.product())) this.open();
      this.toast(`Imported ${palette.name} for ${productLabel(targetProduct)}`);
    } catch (error) {
      this.toast(`Palette import failed: ${error.message || error}`);
    } finally {
      if (this.ui.file) this.ui.file.value = "";
    }
  }

  savePalette(palette) {
    const product = paletteProduct(palette);
    palette = normalizePalette(palette, product);
    if (this.store?.savePalette) {
      const saved = this.store.savePalette(palette, { id: palette.id, name: palette.name, family: palette.family, sourceName: palette.sourceName });
      this.palettes = this.store.list();
      return saved;
    }
    const index = this.palettes.findIndex((item) => item.id === palette.id);
    if (index >= 0) this.palettes[index] = clone(palette);
    else this.palettes.push(clone(palette));
    this.persist();
    return palette;
  }

  async apply() {
    const product = this.product();
    const selectedId = this.ui.select.value;
    this.settings.dbzFloor = Number(this.ui.floor.value);
    this.settings.velocityDeadband = Number(this.ui.velocityDeadband.value);
    this.settings.ccFloor = Number(this.ui.ccFloor.value);
    this.settings.rangeFoldMode = this.ui.rfMode.value;
    this.settings.rangeFoldColor = this.ui.rfColor.value;

    if (this.draft) {
      let draft = normalizePalette(this.draft, product);
      const readonly = selectedId === "default" || String(selectedId).startsWith("builtin-");
      const edited = paletteContentSignature(draft) !== this.originalDraftSignature;
      if (readonly && edited) {
        const baseName = selectedId === "default" ? BUILTINS.find((item) => paletteProduct(item) === product)?.name : draft.name;
        draft.id = `user-${Date.now().toString(36)}`;
        draft.name = this.ui.name.value && this.ui.name.value !== "Operational" ? this.ui.name.value : `${baseName || "Palette"} custom`;
        this.savePalette(draft);
        this.settings.active[product] = draft.id;
      } else if (!readonly) {
        draft.id = String(draft.id || selectedId || `user-${Date.now().toString(36)}`);
        draft.name = this.ui.name.value || draft.name || "Custom palette";
        this.savePalette(draft);
        this.settings.active[product] = draft.id;
      } else {
        this.settings.active[product] = selectedId;
      }
    }

    this.persist();
    this.ui.dialog?.close();
    await this.onApply(this.renderPalette(product));
  }

  exportCurrent() {
    if (!this.draft) return;
    try {
      const palette = normalizePalette(this.draft, this.product());
      const text = this.store?.exportText ? this.store.exportText(palette)
        : this.toolbox?.exportGrPalette ? this.toolbox.exportGrPalette(palette)
        : this.toolbox?.exportPalette ? this.toolbox.exportPalette(palette)
        : exportFallback(palette);
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);
      anchor.download = `${(this.draft.name || "palette").replace(/[^a-z0-9_-]+/gi, "-").toLowerCase()}.pal`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(anchor.href), 0);
    } catch (error) {
      this.toast(`Palette export failed: ${error.message || error}`);
    }
  }

  deleteCurrent() {
    const id = this.ui.select.value;
    if (!id || id === "default" || id.startsWith("builtin-")) return;
    if (this.store?.removePalette) this.store.removePalette(id);
    else this.palettes = this.palettes.filter((palette) => palette.id !== id);
    for (const product of Object.keys(this.settings.active)) if (this.settings.active[product] === id) this.settings.active[product] = "default";
    this.persist();
    this.open();
  }

  isOpen() {
    return Boolean(this.ui.dialog?.open);
  }

  syncCompact() {
    const product = this.product();
    const id = this.activeId(product);
    const palette = id === "default" ? this.activeBasePalette(product) : this.allPalettes().find((item) => item.id === id);
    if (this.ui.label) this.ui.label.textContent = palette?.name || "Operational";
    if (this.ui.swatch && palette) this.ui.swatch.style.background = this.gradientCss(palette);
  }
}
