import { SITES } from "./sites.js";
import {
  COMMUNITY_RADAR_FEEDS,
  COMMUNITY_RADAR_MARKERS,
  GLOBAL_RADAR_PROVIDERS,
  INTERNATIONAL_RADAR_SITES,
} from "./global-radar-catalog.js";

export {
  COMMUNITY_RADAR_FEEDS,
  COMMUNITY_RADAR_MARKERS,
  GLOBAL_RADAR_PROVIDERS,
  INTERNATIONAL_RADAR_SITES,
};

export const ARCHIVE_URL = "https://unidata-nexrad-level2.s3.amazonaws.com";
export const CHUNKS_URL = "https://unidata-nexrad-level2-chunks.s3.amazonaws.com";
export const WORKER_VERSION = "2026-06-23-native-ppi2";
export const EARTH_RADIUS_KM = 6371.0088;
export const WEB_MERCATOR_RADIUS_M = 6378137;
export const MAX_WEB_MERCATOR_LAT = 85.05112878;
export const DEFAULT_USER_PALETTE_STORAGE_KEY = "bowecho:user-palettes:v1";
export const CHMI_RADAR_SITES_ROOT = "https://opendata.chmi.cz/meteorology/weather/radar/sites";
export const DMI_RADAR_VOLUME_ITEMS_URL = "https://opendataapi.dmi.dk/v1/radardata/collections/volume/items";
export const DWD_RADAR_SITES_ROOT = "https://opendata.dwd.de/weather/radar/sites";
export const FMI_RADAR_VOLUME_BUCKET_URL = "https://fmi-opendata-radar-volume-hdf5.s3.amazonaws.com";
export const GEOSPHERE_DATAHUB_URL = "https://public.hub.geosphere.at/datahub";
export const GEOSPHERE_HOCHFICHT_PREFIX = "resources/radar_volumen_hochficht-v1-5min/filelisting/";
export const JMA_RADAR_BASE_URL = "https://pawr.nict.go.jp/jmadata/JMA-PolarCoordsRadar";
export const ORD_RADAR_BUCKET_URL = "https://s3.waw3-1.cloudferro.com/openradar-24h";
export const SHMU_RADAR_VOLUME_ROOT = "https://opendata.shmu.sk/meteorology/weather/radar/volume";
export const SMHI_RADAR_API_BASE = "https://opendata-download-radar.smhi.se/api/version/latest";
export const SPC_OUTLOOK_BASE_URL = "https://www.spc.noaa.gov/products/outlook";
export const SPC_OUTLOOK_ARCHIVE_BASE_URL = "https://www.spc.noaa.gov/products/outlook/archive";
export const SPC_REPORTS_BASE_URL = "https://www.spc.noaa.gov/climo/reports";
export const SPC_WCM_DATA_BASE_URL = "https://www.spc.noaa.gov/wcm/data";
const COMMUNITY_DIR_METADATA_EXTENSIONS = new Set([
  "json", "cfg", "txt", "html", "htm", "xml", "css", "js", "ini", "md", "php", "gis",
]);
const SPC_EVENT_RADAR_MAX_RANGE_KM = 460;
const SPC_TRACK_TRANSLATION_MPH = 30;
const SPC_TRACK_MAX_DURATION_MINUTES = 120;
export const SPC_OUTLOOK_KINDS = [
  { id: "cat", label: "Categorical" },
  { id: "torn", label: "Tornado %" },
  { id: "wind", label: "Wind %" },
  { id: "hail", label: "Hail %" },
];
export const CUSTOM_POLL_NO_MARKER_LAT_E6 = 91_000_000;
export const CUSTOM_POLL_NO_MARKER_LON_E6 = 181_000_000;
const DWD_CYCLE_WINDOW_MINUTES = 5;
const DWD_SWEEP_PRODUCTS = [
  { dir: "sweep_vol_z", quantities: ["dbzh", "zh", "th"], required: true },
  { dir: "sweep_vol_v", quantities: ["vradh", "vradv"], required: true },
  { dir: "sweep_vol_zdr", quantities: ["zdr", "uzdr"], required: false },
  { dir: "sweep_vol_rhohv", quantities: ["rhohv", "urhohv"], required: false },
  { dir: "sweep_vol_phidp", quantities: ["phidp", "uphidp"], required: false },
];
const CHMI_FRESHNESS_WINDOW_MINUTES = 12;
const CHMI_PRODUCTS = [
  { dir: "vol_z", required: true },
  { dir: "vol_v", required: true },
  { dir: "vol_zdr", required: false },
  { dir: "vol_rhohv", required: false },
  { dir: "vol_phidp", required: false },
];
const JMA_REFLECTIVITY_PRODUCT = "N5";
const JMA_STAMP_STEP_MINUTES = 5;
const JMA_LOOKBACK_MINUTES = 40;
const ORD_CYCLE_WINDOW_MINUTES = 5;
const ORD_HOUR_LOOKBACK_SLOTS = 6;
const ORD_COUNTRIES = [
  ["be", "BE", "Belgium"],
  ["ch", "CH", "Switzerland"],
  ["ee", "EE", "Estonia"],
  ["fr", "FR", "France"],
  ["hr", "HR", "Croatia"],
  ["ie", "IE", "Ireland"],
  ["is", "IS", "Iceland"],
  ["lt", "LT", "Lithuania"],
  ["mt", "MT", "Malta"],
  ["nl", "NL", "Netherlands"],
  ["no", "NO", "Norway"],
  ["pl", "PL", "Poland"],
  ["ro", "RO", "Romania"],
  ["si", "SI", "Slovenia"],
];
const ORD_PVOL_SITE_IDS = new Set([
  "bejab", "bewid",
  "hrbil", "hrdeb", "hrgra", "hrpun", "hrulj",
  "iedub", "iesha",
  "isbjo", "iskef", "isska",
  "mtgud",
  "nldhl", "nlhrw",
  "noand", "nober", "nobml", "nohas", "nohfj", "nohgb", "nohur", "norsa", "norsg", "norst", "nosmn", "nosta",
  "plbrz", "plgdy", "plgsa", "plleg", "plpas", "plpoz", "plram", "plrze", "plswi", "pluzr",
  "robar", "robob", "robuc", "rocra", "romed", "roora", "rotim",
  "silis", "sipas",
]);

export const PRODUCT_CATALOG = [
  { id: "REF", label: "REF", name: "Base Reflectivity", group: "base", units: "dBZ", colorFamily: "reflectivity" },
  { id: "VEL", label: "VEL", name: "Base Velocity", group: "velocity", units: "m/s", colorFamily: "velocity" },
  { id: "DVEL", label: "DVEL", name: "Dealiased Velocity", group: "velocity", units: "m/s", colorFamily: "velocity" },
  { id: "SRV", label: "SRV", name: "Storm Relative Velocity", group: "velocity", units: "m/s", colorFamily: "velocity" },
  { id: "DSRV", label: "DSRV", name: "Storm Relative Dealiased Velocity", group: "velocity", units: "m/s", colorFamily: "velocity" },
  { id: "SW", label: "SW", name: "Spectrum Width", group: "base", units: "m/s", colorFamily: "spectrumWidth" },
  { id: "ZDR", label: "ZDR", name: "Differential Reflectivity", group: "dual-pol", units: "dB", colorFamily: "differentialReflectivity" },
  { id: "CC", label: "CC", name: "Correlation Coefficient", group: "dual-pol", units: "", colorFamily: "correlationCoefficient" },
  { id: "PHI", label: "PHI", name: "Differential Phase", group: "dual-pol", units: "deg", colorFamily: "differentialPhase" },
  { id: "KDP", label: "KDP", name: "Specific Differential Phase", group: "dual-pol", units: "deg/km", colorFamily: "specificDifferentialPhase" },
  { id: "CREF", label: "CREF", name: "Composite Reflectivity", group: "derived", units: "dBZ", colorFamily: "reflectivity" },
  { id: "ET", label: "ET", name: "Echo Tops", group: "derived", units: "m", colorFamily: "echoTops" },
  { id: "VIL", label: "VIL", name: "Vertically Integrated Liquid", group: "derived", units: "kg/m^2", colorFamily: "vil" },
  { id: "VILD", label: "VILD", name: "VIL Density", group: "derived", units: "g/m^3", colorFamily: "vilDensity" },
  { id: "MEHS", label: "MEHS", name: "Maximum Expected Hail Size", group: "severe", units: "mm", colorFamily: "hailSize" },
  { id: "POSH", label: "POSH", name: "Probability of Severe Hail", group: "severe", units: "%", colorFamily: "echoTops" },
  { id: "POH", label: "POH", name: "Probability of Hail", group: "severe", units: "%", colorFamily: "echoTops" },
  { id: "MARC", label: "MARC", name: "Mid-Altitude Radial Convergence", group: "severe", units: "m/s", colorFamily: "vil" },
  { id: "GUST", label: "Gust", name: "Low-Level Gust Proxy", group: "severe", units: "m/s", colorFamily: "vil" },
  { id: "AZSHR", label: "AzShr", name: "Azimuthal Shear", group: "shear", units: "1e-3/s", colorFamily: "azimuthalShear" },
  { id: "DIV", label: "Div", name: "Radial Divergence", group: "shear", units: "1e-3/s", colorFamily: "azimuthalShear" },
];

export const PRODUCT_CAPABILITY_CATALOG = {
  REF: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "cut", cutIndependent: false },
  VEL: { source: "VEL", aliases: ["VEL", "V"], scope: "cut", cutIndependent: false },
  DVEL: { source: "VEL", aliases: ["VEL", "V"], scope: "cut", cutIndependent: false, usesDealiasedVelocity: true },
  SRV: { source: "VEL", aliases: ["VEL", "V"], scope: "cut", cutIndependent: false, stormRelative: true },
  DSRV: { source: "VEL", aliases: ["VEL", "V"], scope: "cut", cutIndependent: false, usesDealiasedVelocity: true, stormRelative: true },
  SW: { source: "SW", aliases: ["SW", "WIDTH", "WIDTHS"], scope: "cut", cutIndependent: false },
  ZDR: { source: "ZDR", aliases: ["ZDR"], scope: "cut", cutIndependent: false },
  CC: { source: "CC", aliases: ["CC", "RHO", "RHOHV"], scope: "cut", cutIndependent: false },
  PHI: { source: "PHI", aliases: ["PHI", "PHIDP"], scope: "cut", cutIndependent: false },
  KDP: { source: "KDP", aliases: ["KDP"], scope: "cut", cutIndependent: false },
  CREF: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "volume", cutIndependent: true },
  ET: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "volume", cutIndependent: true },
  VIL: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "volume", cutIndependent: true },
  VILD: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "volume", cutIndependent: true },
  MEHS: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "volume", cutIndependent: true },
  POSH: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "volume", cutIndependent: true },
  POH: { source: "REF", aliases: ["REF", "DBZ", "DZ"], scope: "volume", cutIndependent: true },
  MARC: { source: "VEL", aliases: ["VEL", "V"], scope: "volume", cutIndependent: true },
  GUST: { source: "VEL", aliases: ["VEL", "V"], scope: "volume", cutIndependent: true },
  AZSHR: { source: "VEL", aliases: ["VEL", "V"], scope: "cut", cutIndependent: false },
  DIV: { source: "VEL", aliases: ["VEL", "V"], scope: "cut", cutIndependent: false },
};

export const COLOR_TABLE_FAMILIES = [
  { id: "reflectivity", label: "Reflectivity", productCode: "BR", products: ["REF", "CREF"] },
  { id: "velocity", label: "Velocity / SRV", productCode: "BV", products: ["VEL", "DVEL", "SRV", "DSRV"] },
  { id: "spectrumWidth", label: "Spectrum Width", productCode: "SW", products: ["SW"] },
  { id: "correlationCoefficient", label: "Correlation Coeff (CC)", productCode: "CC", products: ["CC"] },
  { id: "differentialReflectivity", label: "Differential Refl (ZDR)", productCode: "ZDR", products: ["ZDR"] },
  { id: "echoTops", label: "Echo Tops", productCode: "ET", products: ["ET", "POSH", "POH"] },
  { id: "vil", label: "VIL", productCode: "VIL", products: ["VIL", "MARC", "GUST"] },
  { id: "vilDensity", label: "VIL Density", productCode: "VILD", products: ["VILD"] },
  { id: "hailSize", label: "Hail Size (MEHS)", productCode: "MEHS", products: ["MEHS"] },
  { id: "azimuthalShear", label: "Azimuthal Shear", productCode: "AZSHEAR", products: ["AZSHR", "DIV"] },
  { id: "differentialPhase", label: "Differential Phase (PHI)", productCode: "PHI", products: ["PHI"] },
  { id: "specificDifferentialPhase", label: "Specific Diff Phase (KDP)", productCode: "KDP", products: ["KDP"] },
  { id: "generic", label: "Other", productCode: null, products: [] },
];

export const PROFILER_SITE_IDS = new Set(["AWPA2", "HWPA2", "ROCO2", "TLKA2"]);
export const RADAR_SITES = SITES.filter((site) => !PROFILER_SITE_IDS.has(site.id));
export const SUPPORTED_BYTE_FORMATS = [
  { id: "nexrad-level2", label: "NEXRAD Level II / Archive II", kind: "volume" },
  { id: "odim-h5", label: "ODIM HDF5 PVOL/SCAN", kind: "volume" },
  { id: "cfradial-1", label: "CfRadial 1.x classic netCDF", kind: "volume" },
  { id: "dorade", label: "DORADE sweep", kind: "sweep" },
  { id: "jma-grib2-tar", label: "JMA polar radar GRIB2 tar", kind: "volume" },
];
export const SUPPORTED_ARCHIVE_FORMATS = [
  { id: "mobile-archive-zip", label: "Mobile/research radar ZIP archive", kind: "archive" },
];
export const FRAME_PROVIDER_CATALOG = [
  {
    id: "nexrad-public",
    label: "Public NEXRAD Level II",
    modes: ["live", "recent", "archive-date"],
    formats: ["nexrad-level2"],
    clientSide: true,
  },
  {
    id: "browser-import",
    label: "Browser file/byte import",
    modes: ["local-bytes", "local-file"],
    formats: [...SUPPORTED_BYTE_FORMATS, ...SUPPORTED_ARCHIVE_FORMATS].map((format) => format.id),
    clientSide: true,
  },
  {
    id: "custom-url",
    label: "CORS-enabled custom radar URL",
    modes: ["custom-url"],
    formats: SUPPORTED_BYTE_FORMATS.map((format) => format.id),
    clientSide: true,
  },
  {
    id: "community-gr2a",
    label: "Community GR2A dir.list feeds",
    modes: ["community-live", "community-recent", "custom-url"],
    formats: SUPPORTED_BYTE_FORMATS.map((format) => format.id),
    clientSide: true,
  },
  {
    id: "international-smhi",
    label: "SMHI Sweden ODIM_H5",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
  {
    id: "international-geosphere",
    label: "GeoSphere Austria ODIM_H5",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
  {
    id: "international-shmu",
    label: "SHMU Slovakia ODIM_H5 split PVOL",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
  {
    id: "international-dwd",
    label: "DWD Germany ODIM_H5 sweep merge",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
  {
    id: "international-chmi",
    label: "CHMI Czechia ODIM_H5 task merge",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
  {
    id: "international-jma",
    label: "JMA Japan GRIB2 tar",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["jma-grib2-tar"],
    clientSide: true,
  },
  {
    id: "international-ord",
    label: "EUMETNET ORD ODIM_H5 cache",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
  {
    id: "international-dmi",
    label: "DMI Denmark ODIM_H5",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
  {
    id: "international-fmi",
    label: "FMI Finland ODIM_H5",
    modes: ["international-live", "international-recent", "custom-url"],
    formats: ["odim-h5"],
    clientSide: true,
  },
];

export function createRadarToolbox(options = {}) {
  return new BowEchoRadarToolbox(options);
}

export function createRadarSession(toolboxOrOptions = {}, options = {}) {
  const usesExistingToolbox = toolboxOrOptions
    && typeof toolboxOrOptions.loadLoop === "function"
    && typeof toolboxOrOptions.rerenderLoop === "function";
  const sessionOptions = usesExistingToolbox ? options : (toolboxOrOptions || {});
  const toolbox = usesExistingToolbox
    ? toolboxOrOptions
    : createRadarToolbox(sessionOptions.toolboxOptions || {});
  return new RadarSession(toolbox, sessionOptions);
}

export function frameProviders() {
  return FRAME_PROVIDER_CATALOG.map((provider) => ({
    ...provider,
    modes: [...provider.modes],
    formats: [...provider.formats],
  }));
}

export function supportedByteFormats() {
  return SUPPORTED_BYTE_FORMATS.map((format) => ({ ...format }));
}

export function supportedArchiveFormats() {
  return SUPPORTED_ARCHIVE_FORMATS.map((format) => ({ ...format }));
}

export function colorFamilies() {
  return COLOR_TABLE_FAMILIES.map((family) => ({ ...family, products: [...family.products] }));
}

export function colorFamilyForProduct(productCode) {
  const product = PRODUCT_CATALOG.find((item) => item.id === normalizeProduct(productCode) || item.label.toUpperCase() === normalizeProduct(productCode));
  return product?.colorFamily || familyForPaletteProductCode(productCode);
}

export function productDescriptor(productCode) {
  const product = PRODUCT_CATALOG.find((item) => item.id === normalizeProduct(productCode) || item.label.toUpperCase() === normalizeProduct(productCode));
  return product ? { ...product } : null;
}

export function productCapability(productCode) {
  const product = normalizeProduct(productCode);
  const capability = PRODUCT_CAPABILITY_CATALOG[product];
  if (!capability) return null;
  return {
    product,
    source: capability.source,
    aliases: [...capability.aliases],
    scope: capability.scope,
    cutIndependent: Boolean(capability.cutIndependent),
    usesDealiasedVelocity: Boolean(capability.usesDealiasedVelocity),
    stormRelative: Boolean(capability.stormRelative),
  };
}

export function familyForPaletteProductCode(productCode) {
  const code = String(productCode || "").trim().toUpperCase();
  if (["BR", "REF", "CREF", "DR", "SDR"].includes(code)) return "reflectivity";
  if (["BV", "VEL", "DVEL", "SRV", "SRM", "DSRV", "V"].includes(code)) return "velocity";
  if (code === "SW") return "spectrumWidth";
  if (["CC", "RHO", "RHOHV"].includes(code)) return "correlationCoefficient";
  if (code === "ZDR") return "differentialReflectivity";
  if (["ET", "EET", "POSH", "POH"].includes(code)) return "echoTops";
  if (["VIL", "DVL", "MARC", "GUST"].includes(code)) return "vil";
  if (code === "VILD") return "vilDensity";
  if (["MEHS", "HAIL"].includes(code)) return "hailSize";
  if (["AZSHEAR", "AZSHR", "DIV"].includes(code)) return "azimuthalShear";
  if (["PHI", "PHIDP"].includes(code)) return "differentialPhase";
  if (code === "KDP") return "specificDifferentialPhase";
  return "generic";
}

export function paletteProductCodeForFamily(familyId) {
  return COLOR_TABLE_FAMILIES.find((family) => family.id === normalizePaletteFamily(familyId))?.productCode || null;
}

export function parseGrPalette(text, options = {}) {
  const name = String(options.name || options.fileName || "Imported Palette").replace(/\.(pal|txt)$/i, "").trim() || "Imported Palette";
  const palette = {
    type: "bowecho-palette-v1",
    name,
    format: "gr-pal",
    productCode: null,
    family: "generic",
    units: null,
    legendStep: null,
    rangeFolded: [180, 80, 255, 255],
    sampleMode: "gr-pal",
    stops: [],
    warnings: [],
  };

  for (const [lineIndex, rawLine] of String(text || "").split(/\r?\n/).entries()) {
    const lineNumber = lineIndex + 1;
    const line = rawLine.trim();
    if (!line || line.startsWith(";") || line.startsWith("#") || line.startsWith("$$")) continue;
    const pair = splitPaletteLine(line);
    if (!pair) continue;
    const key = normalizePaletteKey(pair.key);
    const value = pair.value.trim();
    try {
      if (key === "product") {
        palette.productCode = value.trim().toUpperCase() || null;
        palette.family = familyForPaletteProductCode(palette.productCode);
      } else if (key === "units") {
        palette.units = value || null;
      } else if (key === "step") {
        palette.legendStep = parseFiniteNumber(value);
      } else if (["mode", "samplemode", "interpolate", "interpolation", "smooth"].includes(key)) {
        palette.sampleMode = normalizePaletteSampleMode(value);
      } else if (["rf", "rangefolded", "rangefoldedcolor"].includes(key)) {
        palette.rangeFolded = parsePaletteColor(value, lineNumber);
      } else if (["color", "color4", "solidcolor", "solidcolor4"].includes(key)) {
        palette.stops.push(parsePaletteStop(key, value, lineNumber));
      }
    } catch (error) {
      palette.warnings.push({ line: lineNumber, message: String(error.message || error) });
    }
  }

  if (options.family) palette.family = normalizePaletteFamily(options.family);
  palette.stops = normalizePaletteStops(palette.stops);
  validatePalette(palette);
  return palette;
}

export function exportGrPalette(palette, options = {}) {
  validatePalette(palette);
  const family = normalizePaletteFamily(options.family || palette.family);
  const productCode = options.productCode === null ? null : (options.productCode || palette.productCode || paletteProductCodeForFamily(family));
  const lines = [];
  lines.push(`; ${palette.name || "BowEcho Palette"}`);
  if (productCode) lines.push(`Product: ${String(productCode).toUpperCase()}`);
  if (options.units || palette.units) lines.push(`Units: ${options.units || palette.units}`);
  if (Number.isFinite(Number(options.legendStep ?? palette.legendStep))) lines.push(`Step: ${formatPaletteNumber(options.legendStep ?? palette.legendStep)}`);
  const rangeFolded = normalizeRgba(options.rangeFolded || palette.rangeFolded || [180, 80, 255, 255]);
  lines.push(`RF: ${rangeFolded.join(" ")}`);
  for (const stop of normalizePaletteStops(palette.stops)) {
    const color = normalizeRgba(stop.color);
    const endColor = stop.endColor ? normalizeRgba(stop.endColor) : null;
    const key = stop.solid ? (color[3] === 255 ? "SolidColor" : "SolidColor4") : (color[3] === 255 && (!endColor || endColor[3] === 255) ? "Color" : "Color4");
    const values = [formatPaletteNumber(stop.value), ...color.slice(0, key.endsWith("4") ? 4 : 3)];
    if (endColor && !stop.solid) values.push(...endColor.slice(0, key.endsWith("4") ? 4 : 3));
    lines.push(`${key}: ${values.join(" ")}`);
  }
  return `${lines.join("\n")}\n`;
}

export function validatePalette(palette) {
  if (!palette || typeof palette !== "object") throw new Error("palette must be an object");
  if (!Array.isArray(palette.stops) || palette.stops.length < 2) throw new Error("palette requires at least two stops");
  let previous = -Infinity;
  for (const stop of palette.stops) {
    const value = Number(stop.value);
    if (!Number.isFinite(value)) throw new Error("palette stop values must be finite");
    if (value < previous) throw new Error("palette stops must be sorted by value");
    normalizeRgba(stop.color);
    if (stop.endColor) normalizeRgba(stop.endColor);
    previous = value;
  }
  return true;
}

export function paletteBinding(palette, productOrFamily) {
  const family = PRODUCT_CATALOG.some((product) => product.id === normalizeProduct(productOrFamily))
    ? colorFamilyForProduct(productOrFamily)
    : normalizePaletteFamily(productOrFamily || palette.family);
  return {
    family,
    productCode: paletteProductCodeForFamily(family),
    products: [...(COLOR_TABLE_FAMILIES.find((item) => item.id === family)?.products || [])],
    palette: {
      ...palette,
      stops: palette.stops.map((stop) => ({ ...stop, color: [...stop.color], endColor: stop.endColor ? [...stop.endColor] : null })),
      rangeFolded: [...(palette.rangeFolded || [180, 80, 255, 255])],
    },
  };
}

export function createPaletteFromStops(stops, options = {}) {
  const family = normalizePaletteFamily(options.family || "generic");
  const palette = {
    type: "bowecho-palette-v1",
    id: options.id || stablePaletteId(options.name || "Browser Palette", family),
    name: options.name || "Browser Palette",
    format: "gr-pal",
    productCode: options.productCode === null ? null : (options.productCode || paletteProductCodeForFamily(family)),
    family,
    units: options.units || null,
    legendStep: Number.isFinite(Number(options.legendStep)) ? Number(options.legendStep) : null,
    rangeFolded: normalizeRgba(options.rangeFolded || [180, 80, 255, 255]),
    sampleMode: options.sampleMode || "gr-pal",
    stops: normalizePaletteStops(Array.from(stops || []).map((stop) => ({
      value: Number(stop.value),
      color: normalizeRgba(stop.color),
      endColor: stop.endColor ? normalizeRgba(stop.endColor) : null,
      solid: Boolean(stop.solid),
    }))),
    warnings: [],
  };
  validatePalette(palette);
  return palette;
}

export function clonePalette(palette, options = {}) {
  if (!palette || typeof palette !== "object") throw new Error("palette must be an object");
  const family = normalizePaletteFamily(options.family || palette.family);
  const clone = {
    ...palette,
    ...options,
    type: "bowecho-palette-v1",
    id: options.id || palette.id || stablePaletteId(options.name || palette.name || "Palette", family),
    name: options.name || palette.name || "Palette",
    format: "gr-pal",
    productCode: options.productCode === undefined ? (palette.productCode ?? paletteProductCodeForFamily(family)) : options.productCode,
    family,
    units: options.units === undefined ? (palette.units ?? null) : options.units,
    legendStep: options.legendStep === undefined ? (palette.legendStep ?? null) : options.legendStep,
    rangeFolded: normalizeRgba(options.rangeFolded || palette.rangeFolded || [180, 80, 255, 255]),
    sampleMode: options.sampleMode || palette.sampleMode || "gr-pal",
    stops: normalizePaletteStops((palette.stops || []).map((stop) => ({
      ...stop,
      color: normalizeRgba(stop.color),
      endColor: stop.endColor ? normalizeRgba(stop.endColor) : null,
      solid: Boolean(stop.solid),
    }))),
    warnings: (palette.warnings || []).map((warning) => ({ ...warning })),
  };
  validatePalette(clone);
  return clone;
}

export function palettePreviewCss(palette, options = {}) {
  const normalized = clonePalette(palette);
  const min = Number.isFinite(Number(options.min)) ? Number(options.min) : normalized.stops[0].value;
  const max = Number.isFinite(Number(options.max)) ? Number(options.max) : normalized.stops[normalized.stops.length - 1].value;
  const span = Math.max(0.000001, max - min);
  const stops = normalized.stops.map((stop) => {
    const pct = Math.max(0, Math.min(100, ((stop.value - min) / span) * 100));
    const color = stop.endColor && !stop.solid ? stop.endColor : stop.color;
    return `${rgbaCss(color)} ${Number(pct.toFixed(2))}%`;
  });
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

export function serializePaletteLibrary(palettes, options = {}) {
  const items = Array.from(palettes || []).map((palette) => storedPaletteRecord(palette, options));
  const library = {
    type: "bowecho-palette-library-v1",
    version: 1,
    updatedAt: options.updatedAt || new Date().toISOString(),
    palettes: items,
  };
  return JSON.stringify(library, null, options.pretty === false ? 0 : 2);
}

export function deserializePaletteLibrary(text, options = {}) {
  if (!text) return [];
  const raw = typeof text === "string" ? JSON.parse(text) : text;
  const items = Array.isArray(raw) ? raw : (raw?.palettes || []);
  const out = [];
  for (const item of items) {
    try {
      const palette = clonePalette(item.palette || item, {
        id: item.id || item.palette?.id || item.id,
        name: item.name || item.palette?.name || item.name,
        family: item.family || item.palette?.family || item.family,
      });
      palette.createdAt = item.createdAt || palette.createdAt || null;
      palette.updatedAt = item.updatedAt || palette.updatedAt || null;
      palette.sourceName = item.sourceName || palette.sourceName || null;
      out.push(palette);
    } catch (error) {
      if (options.strict) throw error;
    }
  }
  return out;
}

export function createPaletteStore(options = {}) {
  const key = options.key || DEFAULT_USER_PALETTE_STORAGE_KEY;
  const storage = options.storage || defaultPaletteStorage();
  const listeners = new Set();
  let memoryText = options.initialText || serializePaletteLibrary(options.initialPalettes || [], { pretty: false });

  function readText() {
    try {
      return storage?.getItem ? (storage.getItem(key) || memoryText) : memoryText;
    } catch {
      return memoryText;
    }
  }

  function writeText(text) {
    memoryText = text;
    try {
      storage?.setItem?.(key, text);
    } catch {
      // Memory fallback keeps the store usable when storage is unavailable.
    }
    notify();
  }

  function load() {
    return deserializePaletteLibrary(readText());
  }

  function saveAll(palettes) {
    const normalized = Array.from(palettes || []).map((palette) => clonePalette(palette));
    writeText(serializePaletteLibrary(normalized, { pretty: options.pretty }));
    return normalized;
  }

  function savePalette(palette, saveOptions = {}) {
    const now = saveOptions.updatedAt || new Date().toISOString();
    const normalized = clonePalette(palette, {
      id: saveOptions.id || palette.id || stablePaletteId(palette.name, palette.family),
      name: saveOptions.name || palette.name,
      family: saveOptions.family || palette.family,
    });
    normalized.createdAt = palette.createdAt || saveOptions.createdAt || now;
    normalized.updatedAt = now;
    normalized.sourceName = saveOptions.sourceName || palette.sourceName || null;
    const palettes = load();
    const index = palettes.findIndex((item) => item.id === normalized.id);
    if (index >= 0) palettes[index] = normalized;
    else palettes.push(normalized);
    saveAll(palettes);
    return normalized;
  }

  function importText(text, importOptions = {}) {
    const palette = parseGrPalette(text, importOptions);
    return savePalette(palette, {
      ...importOptions,
      sourceName: importOptions.fileName || importOptions.sourceName || null,
    });
  }

  function removePalette(idOrPalette) {
    const id = typeof idOrPalette === "string" ? idOrPalette : idOrPalette?.id;
    const palettes = load();
    const kept = palettes.filter((palette) => palette.id !== id);
    saveAll(kept);
    return kept.length !== palettes.length;
  }

  function clear() {
    writeText(serializePaletteLibrary([], { pretty: options.pretty }));
    return [];
  }

  function get(id) {
    return load().find((palette) => palette.id === id) || null;
  }

  function exportText(idOrPalette, exportOptions = {}) {
    const palette = typeof idOrPalette === "string" ? get(idOrPalette) : idOrPalette;
    if (!palette) throw new Error(`unknown palette: ${idOrPalette}`);
    return exportGrPalette(palette, exportOptions);
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function notify() {
    const palettes = load();
    for (const listener of listeners) listener(palettes);
  }

  return {
    key,
    load,
    list: load,
    get,
    saveAll,
    savePalette,
    importText,
    removePalette,
    clear,
    exportText,
    subscribe,
  };
}

function paletteRenderOptions(options, product) {
  if (!options) return {};
  if (options.palette) {
    const binding = paletteBinding(options.palette, options.paletteFamily || product || options.product);
    const paletteText = exportGrPalette(binding.palette, {
      family: binding.family,
      productCode: binding.productCode,
    });
    return {
      paletteName: binding.palette.name || "browser palette",
      paletteFamily: binding.family,
      paletteText,
      paletteKey: paletteCacheKey(binding.family, paletteText),
    };
  }
  if (options.paletteText) {
    const paletteText = String(options.paletteText);
    const palette = parseGrPalette(paletteText, {
      name: options.paletteName || "browser palette",
      family: options.paletteFamily || colorFamilyForProduct(product || options.product),
    });
    const family = normalizePaletteFamily(options.paletteFamily || palette.family || colorFamilyForProduct(product || options.product));
    return {
      paletteName: options.paletteName || palette.name || "browser palette",
      paletteFamily: family,
      paletteText,
      paletteKey: paletteCacheKey(family, paletteText),
    };
  }
  return {};
}

function paletteCacheKey(family, text) {
  return `${normalizePaletteFamily(family)}:${hashString(text)}`;
}

function hashString(text) {
  const value = String(text);
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function fnv1a64Hex(text) {
  const value = String(text);
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const mask = 0xffffffffffffffffn;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= BigInt(value.charCodeAt(i) & 0xff);
    hash = (hash * prime) & mask;
  }
  return hash.toString(16).padStart(16, "0");
}

export function synchronizeRadarLoops(loops, options = {}) {
  return makeSynchronizedLoops(loops, options);
}

export function radarSitesGeoJson(options = {}) {
  return {
    type: "FeatureCollection",
    features: filterSites(options).map(siteGeoJsonFeature),
  };
}

export function radarSourceCatalog(options = {}) {
  const providerIds = normalizeStringSet(options.providerId || options.providerIds || options.providers);
  const kinds = normalizeStringSet(options.kind || options.kinds);
  const query = normalizeQuery(options.query);
  return GLOBAL_RADAR_PROVIDERS
    .filter((provider) => !providerIds.size || providerIds.has(provider.id.toUpperCase()))
    .filter((provider) => !kinds.size || kinds.has(provider.kind.toUpperCase()))
    .filter((provider) => !query || `${provider.id} ${provider.label} ${provider.country} ${provider.kind}`.toUpperCase().includes(query))
    .map(cloneCatalogRecord);
}

export function internationalRadarSites(options = {}) {
  return filterInternationalRadarSites(options).map(cloneCatalogRecord);
}

export function internationalRadarProvider(providerId) {
  const provider = findInternationalRadarProvider(providerId);
  return provider ? cloneCatalogRecord(provider) : null;
}

export function internationalRadarSite(providerOrSite, siteId = undefined) {
  const site = findInternationalRadarSite(providerOrSite, siteId);
  return site ? cloneCatalogRecord(site) : null;
}

export function smhiAreaCatalogUrl(options = {}) {
  return trimTrailingSlash(options.baseUrl || SMHI_RADAR_API_BASE);
}

export function smhiQcvolCatalogUrl(siteId, options = {}) {
  const site = resolveSmhiInternationalSite(siteId);
  return `${smhiAreaCatalogUrl(options)}/area/${encodeURIComponent(site.id)}/product/qcvol`;
}

export function smhiDatedQcvolUrl(siteId, key, options = {}) {
  const site = resolveSmhiInternationalSite(siteId);
  const stamp = smhiKeyStamp(key);
  if (!stamp) return null;
  return `${smhiAreaCatalogUrl(options)}/area/${encodeURIComponent(site.id)}/product/qcvol/${stamp.slice(0, 4)}/${stamp.slice(4, 6)}/${stamp.slice(6, 8)}/${encodeURIComponent(String(key))}.h5`;
}

export function parseSmhiAreaCatalog(textOrJson, options = {}) {
  const data = parseJsonLike(textOrJson, "SMHI area catalog");
  const areas = Array.isArray(data.areas) ? data.areas : [];
  return areas
    .map((area, index) => normalizeSmhiArea(area, index, options))
    .filter(Boolean)
    .sort((left, right) => left.id.localeCompare(right.id))
    .map(cloneCatalogRecord);
}

export function parseSmhiQcvolCatalog(siteId, textOrJson, options = {}) {
  const site = resolveSmhiInternationalSite(siteId);
  const data = parseJsonLike(textOrJson, `SMHI qcvol catalog for '${site.id}'`);
  const entries = Array.isArray(data.lastFiles) ? data.lastFiles : [];
  return entries
    .map((entry, index) => normalizeSmhiLastFile(site, entry, index, options))
    .filter(Boolean)
    .sort((left, right) => left.key.localeCompare(right.key))
    .map(cloneCatalogRecord);
}

export function smhiFramePlansFromCatalog(siteId, textOrJson, options = {}) {
  const site = resolveSmhiInternationalSite(siteId);
  let items = parseSmhiQcvolCatalog(site.id, textOrJson, options);
  if (options.count !== undefined || options.limit !== undefined) {
    items = items.slice(-clampInt(options.count ?? options.limit, 1, 1000));
  }
  return items.map((item) => makeInternationalFramePlan({
    providerId: "smhi",
    providerLabel: "SMHI Sweden",
    site,
    identity: item.key,
    parts: [{ url: item.url }],
    merge: false,
    format: "odim-h5",
    volumeTime: item.volumeTime,
    sourceItem: item,
  }));
}

export function smhiFramePlanFromCatalog(siteId, textOrJson, options = {}) {
  const plans = smhiFramePlansFromCatalog(siteId, textOrJson, options);
  if (!plans.length) throw new Error(`SMHI qcvol catalog for '${siteId}' has no lastFiles entry`);
  return plans[plans.length - 1];
}

export function s3StyleListingUrl(baseUrl, options = {}) {
  const params = new URLSearchParams();
  params.set("list-type", "2");
  if (options.prefix !== undefined && options.prefix !== null) params.set("prefix", String(options.prefix));
  if (options.delimiter !== undefined && options.delimiter !== null) params.set("delimiter", String(options.delimiter));
  if (options.startAfter !== undefined && options.startAfter !== null) params.set("start-after", String(options.startAfter));
  if (options.continuationToken !== undefined && options.continuationToken !== null) params.set("continuation-token", String(options.continuationToken));
  params.set("max-keys", String(clampInt(options.maxKeys ?? options.maxKeysPerPage ?? 1000, 1, 1000)));
  return `${trimTrailingSlash(baseUrl)}/?${params.toString()}`;
}

export function parseS3StyleListing(textOrListing) {
  if (textOrListing && typeof textOrListing === "object" && !ArrayBuffer.isView(textOrListing)) {
    const contents = Array.from(textOrListing.contents || textOrListing.objects || [])
      .map(normalizeS3Content)
      .filter((item) => item.key);
    const looseKeys = Array.from(textOrListing.keys || [])
      .map((key) => normalizeS3Content({ key }))
      .filter((item) => item.key);
    const byKey = new Map([...looseKeys, ...contents].map((item) => [item.key, item]));
    const commonPrefixes = Array.from(textOrListing.commonPrefixes || textOrListing.prefixes || [])
      .map((prefix) => String(prefix || "").trim())
      .filter(Boolean);
    return {
      type: "s3-style-listing-v1",
      contents: [...byKey.values()],
      keys: [...byKey.keys()],
      commonPrefixes,
      prefixes: [...commonPrefixes],
      isTruncated: Boolean(textOrListing.isTruncated),
      nextContinuationToken: textOrListing.nextContinuationToken || null,
    };
  }

  const xml = String(textOrListing || "");
  const contents = xmlElements(xml, "Contents")
    .map((block) => normalizeS3Content({
      key: xmlElementText(block, "Key"),
      size: Number(xmlElementText(block, "Size") || 0),
      lastModified: xmlElementText(block, "LastModified") || null,
      etag: xmlElementText(block, "ETag") || null,
    }))
    .filter((item) => item.key);
  const commonPrefixes = xmlElements(xml, "CommonPrefixes")
    .map((block) => xmlElementText(block, "Prefix"))
    .filter(Boolean);
  return {
    type: "s3-style-listing-v1",
    contents,
    keys: contents.map((item) => item.key),
    commonPrefixes,
    prefixes: [...commonPrefixes],
    isTruncated: /^true$/i.test(xmlElementText(xml, "IsTruncated")),
    nextContinuationToken: xmlElementText(xml, "NextContinuationToken") || null,
  };
}

export function nexradArchiveDatePrefix(siteId, dateOrString = new Date()) {
  const site = normalizeSite(siteId);
  const date = normalizeArchiveDate(dateOrString);
  return `${date.year}/${pad2(date.month)}/${pad2(date.day)}/${site}/`;
}

export function nexradArchiveListingUrl(siteId, dateOrString = new Date(), options = {}) {
  return s3StyleListingUrl(options.baseUrl || ARCHIVE_URL, {
    prefix: options.prefix || nexradArchiveDatePrefix(siteId, dateOrString),
    maxKeys: options.maxKeys ?? options.maxKeysPerPage ?? 1000,
    continuationToken: options.continuationToken,
    startAfter: options.startAfter,
  });
}

export function parseNexradArchiveListing(siteId, dateOrString, textOrListing, options = {}) {
  const site = normalizeSite(siteId);
  const date = normalizeArchiveDate(dateOrString);
  const prefix = options.prefix || nexradArchiveDatePrefix(site, date.iso);
  const baseUrl = options.baseUrl || ARCHIVE_URL;
  const listing = parseS3StyleListing(textOrListing);
  return listing.contents
    .filter((object) => object.size > 0 && object.key.startsWith(prefix) && !object.key.endsWith("_MDM"))
    .sort((left, right) => left.key.localeCompare(right.key))
    .map((object) => archiveFrame(baseUrl, object));
}

export function archiveFrameWindow(frames, options = {}) {
  const sorted = Array.from(frames || [])
    .filter(Boolean)
    .sort((left, right) => {
      const leftTime = frameMillis(left, Number.MAX_SAFE_INTEGER);
      const rightTime = frameMillis(right, Number.MAX_SAFE_INTEGER);
      if (leftTime !== rightTime) return leftTime - rightTime;
      return String(left.key || left.id || "").localeCompare(String(right.key || right.id || ""));
    });
  const totalFrames = sorted.length;
  if (!totalFrames) {
    return {
      type: "bowecho-nexrad-archive-window-v1",
      site: options.site ? normalizeSite(options.site) : null,
      date: options.date ? normalizeArchiveDate(options.date).iso : null,
      frames: [],
      startIndex: 0,
      endIndex: -1,
      selectedIndex: -1,
      selectedFrame: null,
      totalFrames: 0,
      targetTime: normalizeOptionalIsoTime(options.targetTime ?? options.time),
    };
  }

  let selectedGlobalIndex = totalFrames - 1;
  const explicitIndex = options.selectedIndex ?? options.index;
  if (explicitIndex !== undefined && explicitIndex !== null) {
    selectedGlobalIndex = clampInt(explicitIndex, 0, totalFrames - 1);
  } else {
    const targetMs = archiveTargetMillis(options.targetTime ?? options.time);
    if (Number.isFinite(targetMs)) {
      selectedGlobalIndex = 0;
      for (let index = 0; index < sorted.length; index += 1) {
        const time = frameMillis(sorted[index], NaN);
        if (!Number.isFinite(time)) continue;
        if (time <= targetMs) selectedGlobalIndex = index;
        else break;
      }
    }
  }

  const count = clampInt(options.frameCount ?? options.count ?? totalFrames, 1, Math.max(1, totalFrames));
  const endIndex = selectedGlobalIndex;
  const startIndex = Math.max(0, endIndex - count + 1);
  const windowFrames = sorted.slice(startIndex, endIndex + 1);
  const selectedFrame = sorted[selectedGlobalIndex] || null;
  return {
    type: "bowecho-nexrad-archive-window-v1",
    site: options.site ? normalizeSite(options.site) : selectedFrame?.site || sorted[0]?.site || null,
    date: options.date ? normalizeArchiveDate(options.date).iso : archiveDateFromFrame(selectedFrame || sorted[0]),
    frames: windowFrames,
    startIndex,
    endIndex,
    selectedIndex: selectedGlobalIndex - startIndex,
    selectedFrame,
    totalFrames,
    targetTime: normalizeOptionalIsoTime(options.targetTime ?? options.time),
  };
}

export function spcConvectiveDate(when = new Date()) {
  const date = when instanceof Date ? new Date(when.getTime()) : new Date(when);
  if (!Number.isFinite(date.getTime())) throw new Error(`SPC: invalid UTC date '${when}'`);
  if (date.getUTCHours() < 12) date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

export function spcReportTimeUtc(convectiveDate, hhmm) {
  const day = normalizeArchiveDate(convectiveDate);
  const text = String(hhmm ?? "").trim().padStart(4, "0");
  if (!/^\d{4}$/.test(text)) return null;
  const hour = Number(text.slice(0, 2));
  const minute = Number(text.slice(2, 4));
  if (hour > 23 || minute > 59) return null;
  const date = new Date(Date.UTC(day.year, day.month - 1, day.day, hour, minute, 0));
  if (hour < 12) date.setUTCDate(date.getUTCDate() + 1);
  return isoSeconds(date);
}

export function spcReportsUrls(convectiveDate, options = {}) {
  const day = normalizeArchiveDate(convectiveDate);
  const stamp = `${String(day.year).slice(2)}${pad2(day.month)}${pad2(day.day)}`;
  const baseUrl = trimTrailingSlash(options.baseUrl || options.reportsBaseUrl || SPC_REPORTS_BASE_URL);
  return [
    `${baseUrl}/${stamp}_rpts_filtered.csv`,
    `${baseUrl}/${stamp}_rpts.csv`,
  ];
}

export function spcWcmTornadoYearUrl(year, options = {}) {
  const value = clampInt(year, 1950, 3000);
  return `${trimTrailingSlash(options.baseUrl || options.wcmBaseUrl || SPC_WCM_DATA_BASE_URL)}/${value}_torn.csv`;
}

export function spcActualTornadoesUrl(endYear, options = {}) {
  const value = clampInt(endYear, 1950, 3000);
  return `${trimTrailingSlash(options.baseUrl || options.wcmBaseUrl || SPC_WCM_DATA_BASE_URL)}/1950-${value}_actual_tornadoes.csv`;
}

export function spcOutlookKinds() {
  return SPC_OUTLOOK_KINDS.map((kind) => ({ ...kind }));
}

export function spcOutlookLiveUrls(day = 1, kind = "cat", options = {}) {
  const outlookDay = normalizeSpcOutlookDay(day);
  const outlookKind = normalizeSpcOutlookKind(kind);
  const baseUrl = trimTrailingSlash(options.baseUrl || options.outlookBaseUrl || SPC_OUTLOOK_BASE_URL);
  const archiveBaseUrl = trimTrailingSlash(options.archiveBaseUrl || options.outlookArchiveBaseUrl || `${baseUrl}/archive`);
  const now = options.now instanceof Date ? new Date(options.now.getTime()) : new Date(options.now || Date.now());
  if (!Number.isFinite(now.getTime())) throw new Error(`SPC outlook: invalid UTC date '${options.now}'`);
  const liveUrl = `${baseUrl}/day${outlookDay}otlk_${outlookKind}.lyr.geojson`;
  if (outlookDay === 1 && now.getUTCHours() >= 1 && now.getUTCHours() < 12) {
    const year = now.getUTCFullYear();
    const stamp = `${year}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}`;
    return [
      `${archiveBaseUrl}/${year}/day1otlk_${stamp}_0100_${outlookKind}.lyr.geojson`,
      liveUrl,
    ];
  }
  return [liveUrl];
}

export function spcOutlookArchiveUrls(dateOrString, day = 1, kind = "cat", options = {}) {
  const date = normalizeArchiveDate(dateOrString);
  const outlookDay = normalizeSpcOutlookDay(day);
  const outlookKind = normalizeSpcOutlookKind(kind);
  const archiveBaseUrl = trimTrailingSlash(options.archiveBaseUrl || options.outlookArchiveBaseUrl || options.baseUrl || SPC_OUTLOOK_ARCHIVE_BASE_URL);
  const issues = Array.from(options.issues || ["2000", "1630", "1300", "1200", "0100"])
    .map((issue) => String(issue || "").trim().padStart(4, "0"))
    .filter((issue) => /^\d{4}$/.test(issue));
  const stamp = `${date.year}${pad2(date.month)}${pad2(date.day)}`;
  return issues.map((issue) => (
    `${archiveBaseUrl}/${date.year}/day${outlookDay}otlk_${stamp}_${issue}_${outlookKind}.lyr.geojson`
  ));
}

export function spcOutlookUrls(day = 1, kind = "cat", options = {}) {
  if (typeof day === "object" && day !== null) {
    options = day;
    day = options.day ?? 1;
    kind = options.kind ?? "cat";
  } else if (typeof kind === "object" && kind !== null) {
    options = kind;
    kind = options.kind ?? "cat";
  }
  const archiveDate = options.archiveDate ?? options.date ?? null;
  return archiveDate
    ? spcOutlookArchiveUrls(archiveDate, day, kind, options)
    : spcOutlookLiveUrls(day, kind, options);
}

export function parseSpcOutlook(textOrJson, options = {}) {
  let root = null;
  if (typeof textOrJson === "string") {
    try {
      root = JSON.parse(textOrJson || "{}");
    } catch {
      return [];
    }
  } else {
    root = textOrJson || {};
  }
  const features = Array.isArray(root?.features) ? root.features : [];
  const kind = options.kind === undefined || options.kind === null ? null : normalizeSpcOutlookKind(options.kind);
  const url = options.url || null;
  const out = [];
  for (const feature of features) {
    const properties = feature?.properties || {};
    const geometry = feature?.geometry || {};
    const rings = [];
    const parseRing = (ring) => {
      if (!Array.isArray(ring)) return [];
      return ring
        .map((point) => {
          const lon = Number(point?.[0]);
          const lat = Number(point?.[1]);
          return Number.isFinite(lon) && Number.isFinite(lat) ? [lon, lat] : null;
        })
        .filter(Boolean);
    };
    if (geometry.type === "Polygon") {
      rings.push(parseRing(geometry.coordinates?.[0]));
    } else if (geometry.type === "MultiPolygon" && Array.isArray(geometry.coordinates)) {
      for (const polygon of geometry.coordinates) rings.push(parseRing(polygon?.[0]));
    }
    const validRings = rings.filter((ring) => ring.length >= 3);
    if (!validRings.length) continue;
    const fillRgb = parseSpcOutlookRgb(properties.fill);
    const strokeRgb = parseSpcOutlookRgb(properties.stroke);
    out.push({
      type: "spc-outlook-feature-v1",
      kind,
      label: String(properties.LABEL || properties.label || ""),
      label2: String(properties.LABEL2 || properties.label2 || ""),
      fill: rgbToHex(fillRgb),
      stroke: rgbToHex(strokeRgb),
      fillRgb,
      strokeRgb,
      rings: validRings,
      url,
    });
  }
  return out;
}

export function spcOutlookFeatureCollection(outlookOrFeatures, options = {}) {
  const features = Array.isArray(outlookOrFeatures)
    ? outlookOrFeatures
    : Array.isArray(outlookOrFeatures?.features)
      ? outlookOrFeatures.features
      : [];
  return {
    type: "FeatureCollection",
    features: features.flatMap((feature, index) => {
      const rings = Array.isArray(feature?.rings) ? feature.rings : [];
      const validRings = rings
        .map(closeGeoJsonRing)
        .filter((ring) => ring.length >= 4);
      if (!validRings.length) return [];
      const geometry = validRings.length === 1
        ? { type: "Polygon", coordinates: [validRings[0]] }
        : { type: "MultiPolygon", coordinates: validRings.map((ring) => [ring]) };
      return [{
        type: "Feature",
        id: options.idPrefix ? `${options.idPrefix}-${index}` : undefined,
        properties: {
          kind: feature.kind ?? options.kind ?? null,
          label: feature.label || "",
          label2: feature.label2 || "",
          fill: feature.fill || rgbToHex(feature.fillRgb || [128, 128, 128]),
          stroke: feature.stroke || rgbToHex(feature.strokeRgb || [128, 128, 128]),
          fillRgb: feature.fillRgb || parseSpcOutlookRgb(feature.fill),
          strokeRgb: feature.strokeRgb || parseSpcOutlookRgb(feature.stroke),
          url: feature.url || options.url || null,
        },
        geometry,
      }];
    }),
  };
}

export async function fetchSpcOutlook(day = 1, kind = "cat", options = {}) {
  if (typeof day === "object" && day !== null) {
    options = day;
    day = options.day ?? 1;
    kind = options.kind ?? "cat";
  } else if (typeof kind === "object" && kind !== null) {
    options = kind;
    kind = options.kind ?? "cat";
  }
  const outlookDay = normalizeSpcOutlookDay(day);
  const outlookKind = normalizeSpcOutlookKind(kind);
  const archiveDate = options.archiveDate ?? options.date ?? null;
  const urls = spcOutlookUrls(outlookDay, outlookKind, { ...options, archiveDate });
  const attemptedUrls = [];
  for (const url of urls) {
    const response = await fetchTextMaybe(url, options);
    attemptedUrls.push(url);
    if (!response.ok) continue;
    return {
      type: "spc-outlook-v1",
      day: outlookDay,
      kind: outlookKind,
      archiveDate: archiveDate ? normalizeArchiveDate(archiveDate).iso : null,
      url,
      urls,
      attemptedUrls,
      missing: false,
      features: parseSpcOutlook(response.text, { kind: outlookKind, url }),
    };
  }
  return {
    type: "spc-outlook-v1",
    day: outlookDay,
    kind: outlookKind,
    archiveDate: archiveDate ? normalizeArchiveDate(archiveDate).iso : null,
    url: null,
    urls,
    attemptedUrls,
    missing: true,
    features: [],
  };
}

export async function fetchSpcOutlooks(kinds = ["cat"], options = {}) {
  if (typeof kinds === "object" && !Array.isArray(kinds)) {
    options = kinds;
    kinds = options.kinds || options.outlookKinds || ["cat"];
  }
  const day = normalizeSpcOutlookDay(options.day ?? 1);
  const outlookKinds = Array.from(kinds || ["cat"]).map(normalizeSpcOutlookKind);
  const outlooks = await Promise.all(outlookKinds.map((kind) => fetchSpcOutlook(day, kind, options)));
  return {
    type: "spc-outlooks-v1",
    day,
    archiveDate: options.archiveDate || options.date ? normalizeArchiveDate(options.archiveDate ?? options.date).iso : null,
    outlooks,
    features: outlooks.flatMap((outlook) => outlook.features),
  };
}

export function parseSpcReports(kind, convectiveDate, text) {
  const reportKind = normalizeSpcReportKind(kind);
  const lines = String(text || "").split(/\r?\n/).slice(1);
  return lines
    .map((line) => parseSpcReportRow(reportKind, convectiveDate, line))
    .filter(Boolean);
}

export function parseSpcReportsCombined(convectiveDate, text) {
  const out = [];
  let kind = null;
  for (const line of String(text || "").split(/\r?\n/)) {
    if (line.startsWith("Time,")) {
      const label = String(line.split(",")[1] || "").trim();
      kind = label === "F_Scale" || label === "F-Scale"
        ? "tornado"
        : label === "Speed"
          ? "wind"
          : label === "Size"
            ? "hail"
            : null;
      continue;
    }
    if (kind) {
      const report = parseSpcReportRow(kind, convectiveDate, line);
      if (report) out.push(report);
    }
  }
  return out;
}

export function spcReportMagnitudeLabel(reportOrKind, magnitude = undefined) {
  const kind = typeof reportOrKind === "object"
    ? normalizeSpcReportKind(reportOrKind.kind)
    : normalizeSpcReportKind(reportOrKind);
  const value = String(magnitude ?? reportOrKind?.magnitude ?? "").trim();
  if (!value || value.toUpperCase() === "UNK") return null;
  if (kind === "wind") return `${value} mph`;
  if (kind === "hail") {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? `${(numeric / 100).toFixed(2)}"` : value;
  }
  return value;
}

export function parseSpcTornadoSegments(convectiveDate, text) {
  const convective = normalizeArchiveDate(convectiveDate).iso;
  const out = [];
  for (const line of String(text || "").split(/\r?\n/).slice(1)) {
    const cols = line.split(",");
    if (cols.length < 24 || String(cols[23] || "").trim() !== "1") continue;
    const startUtc = spcWcmUtc(cols[4], cols[5], cols[6]);
    if (!startUtc || spcConvectiveDate(startUtc) !== convective) continue;
    const beginLat = Number(String(cols[15] || "").trim());
    const beginLon = Number(String(cols[16] || "").trim());
    if (!Number.isFinite(beginLat) || !Number.isFinite(beginLon) || beginLat === 0 || beginLat < -90 || beginLat > 90) continue;
    const endLat = Number(String(cols[17] || "").trim());
    const endLon = Number(String(cols[18] || "").trim());
    const end = Number.isFinite(endLat)
      && Number.isFinite(endLon)
      && endLat !== 0
      && endLon !== 0
      && (endLat !== beginLat || endLon !== beginLon)
      && endLat >= -90
      && endLat <= 90
      ? { lat: endLat, lon: endLon }
      : null;
    const year = Number(String(cols[1] || "").trim());
    const scale = year >= 2007 ? "EF" : "F";
    const rating = String(cols[10] || "").trim();
    const endTimeUtc = cols.length >= 31 ? spcWcmUtc(cols[29], cols[30], cols[6]) : null;
    const startTime = Date.parse(startUtc);
    const endTime = endTimeUtc ? Date.parse(endTimeUtc) : NaN;
    out.push({
      type: "spc-tornado-segment-v1",
      timeUtc: startUtc,
      efLabel: rating === "-9" || !rating ? `${scale}?` : `${scale}${rating}`,
      location: String(cols[7] || "").trim(),
      begin: { lat: beginLat, lon: beginLon },
      end,
      endTimeUtc: Number.isFinite(endTime) && endTime >= startTime ? endTimeUtc : null,
      lengthMi: finiteOrZero(cols[19]),
      widthYd: finiteOrZero(cols[20]),
      isTrack: Boolean(end),
    });
  }
  return out.sort((left, right) => Date.parse(left.timeUtc) - Date.parse(right.timeUtc));
}

export function tornadoSegmentsFromReports(reports) {
  return Array.from(reports || [])
    .filter((report) => normalizeSpcReportKind(report.kind) === "tornado")
    .map((report) => ({
      type: "spc-tornado-segment-v1",
      timeUtc: report.timeUtc,
      efLabel: spcReportMagnitudeLabel(report) || "EF?",
      location: report.location || "",
      begin: { lat: Number(report.lat), lon: Number(report.lon) },
      end: null,
      endTimeUtc: null,
      lengthMi: 0,
      widthYd: 0,
      isTrack: false,
    }))
    .filter((segment) => Number.isFinite(segment.begin.lat) && Number.isFinite(segment.begin.lon));
}

export function estimatedTornadoTrackEndTime(beginTime, lengthMi = 0, options = {}) {
  const begin = beginTime instanceof Date ? beginTime : new Date(beginTime);
  if (!Number.isFinite(begin.getTime())) throw new Error(`SPC: invalid tornado begin time '${beginTime}'`);
  const speed = Math.max(1, Number(options.translationMph ?? SPC_TRACK_TRANSLATION_MPH) || SPC_TRACK_TRANSLATION_MPH);
  const cap = Math.max(0, Number(options.maxDurationMinutes ?? SPC_TRACK_MAX_DURATION_MINUTES) || SPC_TRACK_MAX_DURATION_MINUTES);
  const minutes = Math.min(cap, Math.max(0, Number(lengthMi) || 0) / speed * 60);
  return isoSeconds(new Date(begin.getTime() + Math.round(minutes * 60_000)));
}

export function selectEventRadarSites(begin, end = begin, options = {}) {
  const beginPoint = normalizeLatLon(begin);
  const endPoint = normalizeLatLon(end || begin);
  const midpoint = {
    lat: (beginPoint.lat + endPoint.lat) * 0.5,
    lon: (beginPoint.lon + endPoint.lon) * 0.5,
  };
  const maxDistanceKm = Number(options.maxDistanceKm ?? SPC_EVENT_RADAR_MAX_RANGE_KM);
  const sites = Array.from(options.sites || RADAR_SITES)
    .filter((site) => site && site.id)
    .filter((site) => options.includeTdwr || !String(site.id).toUpperCase().startsWith("T"));
  const nearestTo = (target) => {
    let best = null;
    for (const site of sites) {
      const distanceKm = haversineDistanceKm(target.lat, target.lon, site.lat, site.lon);
      if (!Number.isFinite(distanceKm) || distanceKm > maxDistanceKm) continue;
      if (!best || distanceKm < best.distanceKm) best = { ...cloneCatalogRecord(site), distanceKm };
    }
    return best;
  };
  const primary = nearestTo(midpoint);
  if (!primary) return null;
  const overlay = nearestTo(endPoint);
  return {
    type: "bowecho-event-radar-selection-v1",
    primary,
    overlay: overlay && overlay.id !== primary.id ? overlay : null,
    midpoint,
    begin: beginPoint,
    end: endPoint,
    maxDistanceKm,
  };
}

export function eventArchiveFrameWindow(frames, options = {}) {
  const sorted = Array.from(frames || [])
    .filter(Boolean)
    .sort((left, right) => frameMillis(left, Number.MAX_SAFE_INTEGER) - frameMillis(right, Number.MAX_SAFE_INTEGER));
  const startMs = archiveTargetMillis(options.startTime ?? options.start ?? options.time);
  const endMs = archiveTargetMillis(options.endTime ?? options.end ?? options.targetTime ?? options.time);
  if (!sorted.length || !Number.isFinite(startMs) || !Number.isFinite(endMs)) {
    return {
      type: "bowecho-spc-event-archive-window-v1",
      site: options.site ? normalizeSite(options.site) : sorted[0]?.site || null,
      frames: [],
      startIndex: 0,
      endIndex: -1,
      selectedIndex: -1,
      selectedFrame: null,
      totalFrames: sorted.length,
      startTime: normalizeOptionalIsoTime(options.startTime ?? options.start ?? options.time),
      endTime: normalizeOptionalIsoTime(options.endTime ?? options.end ?? options.targetTime ?? options.time),
      padFrames: clampInt(options.padFrames ?? options.pad ?? 0, 0, 500),
      cap: clampInt(options.cap ?? options.maxFrames ?? options.frameCount ?? (sorted.length || 1), 1, Math.max(1, sorted.length || 1)),
    };
  }
  const lower = Math.min(startMs, endMs);
  const upper = Math.max(startMs, endMs);
  const startCover = nearestFrameIndexAtOrBefore(sorted, lower);
  const endCover = nearestFrameIndexAtOrBefore(sorted, upper);
  const padFrames = clampInt(options.padFrames ?? options.pad ?? 0, 0, 500);
  const cap = clampInt(options.cap ?? options.maxFrames ?? options.frameCount ?? sorted.length, 1, Math.max(1, sorted.length));
  let startIndex = Math.max(0, Math.min(startCover, endCover) - padFrames);
  const endIndex = Math.min(sorted.length - 1, Math.max(startCover, endCover) + padFrames);
  if (endIndex + 1 - startIndex > cap) startIndex = endIndex + 1 - cap;
  const windowFrames = sorted.slice(startIndex, endIndex + 1);
  return {
    type: "bowecho-spc-event-archive-window-v1",
    site: options.site ? normalizeSite(options.site) : windowFrames[0]?.site || sorted[0]?.site || null,
    frames: windowFrames,
    startIndex,
    endIndex,
    selectedIndex: Math.max(0, windowFrames.length - 1),
    selectedFrame: windowFrames[windowFrames.length - 1] || null,
    totalFrames: sorted.length,
    startTime: normalizeOptionalIsoTime(options.startTime ?? options.start ?? options.time),
    endTime: normalizeOptionalIsoTime(options.endTime ?? options.end ?? options.targetTime ?? options.time),
    padFrames,
    cap,
  };
}

export function eventArchivePlanForTrack(segmentOrReport, options = {}) {
  const segment = normalizeEventSegment(segmentOrReport);
  const endTime = segment.endTimeUtc || estimatedTornadoTrackEndTime(segment.timeUtc, segment.lengthMi, options);
  const radarSelection = selectEventRadarSites(segment.begin, segment.end || segment.begin, options);
  const archiveWindow = options.frames
    ? eventArchiveFrameWindow(options.frames, {
      ...options,
      site: options.site || radarSelection?.primary?.id,
      startTime: segment.timeUtc,
      endTime,
    })
    : null;
  return {
    type: "bowecho-spc-event-archive-plan-v1",
    segment,
    startTime: segment.timeUtc,
    endTime,
    archiveDate: isoSeconds(new Date(segment.timeUtc)).slice(0, 10),
    radarSelection,
    archiveWindow,
  };
}

export async function fetchSpcEventDay(convectiveDate, options = {}) {
  const day = normalizeArchiveDate(convectiveDate).iso;
  const data = {
    type: "spc-event-day-v1",
    convectiveDate: day,
    reports: [],
    segments: [],
    reportsFileMissing: true,
    reportUrl: null,
    segmentUrls: [],
  };
  for (const url of spcReportsUrls(day, options)) {
    const response = await fetchTextMaybe(url, options);
    if (!response.ok) continue;
    const reports = parseSpcReportsCombined(day, response.text);
    const hasHeader = String(response.text || "").split(/\r?\n/).some((line) => line.startsWith("Time,"));
    if (hasHeader) {
      data.reports = reports;
      data.reportsFileMissing = false;
      data.reportUrl = url;
      break;
    }
  }

  const years = [normalizeArchiveDate(day).year];
  const nextYear = new Date(`${day}T12:00:00Z`);
  nextYear.setUTCDate(nextYear.getUTCDate() + 1);
  if (nextYear.getUTCFullYear() !== years[0]) years.push(nextYear.getUTCFullYear());
  const missingYears = [];
  for (const year of years) {
    const url = spcWcmTornadoYearUrl(year, options);
    const response = await fetchTextMaybe(url, options);
    if (response.ok) {
      data.segments.push(...parseSpcTornadoSegments(day, response.text));
      data.segmentUrls.push(url);
    } else {
      missingYears.push(year);
    }
  }

  if (missingYears.length && options.includeConsolidated !== false) {
    const currentYear = options.currentYear || (options.now ? new Date(options.now).getUTCFullYear() : new Date().getUTCFullYear());
    for (const endYear of [currentYear - 1, currentYear - 2]) {
      if (years.some((year) => year > endYear)) continue;
      const url = spcActualTornadoesUrl(endYear, options);
      const response = await fetchTextMaybe(url, options);
      if (!response.ok) continue;
      data.segments = parseSpcTornadoSegments(day, response.text);
      data.segmentUrls = [url];
      break;
    }
  }

  if (!data.segments.length) data.segments = tornadoSegmentsFromReports(data.reports);
  data.segments.sort((left, right) => Date.parse(left.timeUtc) - Date.parse(right.timeUtc));
  return data;
}

export function geosphereStartAfterKey(dateOrNow = new Date(), lookbackHours = 12) {
  const date = dateOrNow instanceof Date ? dateOrNow : new Date(dateOrNow);
  if (!Number.isFinite(date.getTime())) throw new Error(`GeoSphere: invalid UTC date '${dateOrNow}'`);
  const lookbackMs = Math.max(0, Number(lookbackHours) || 0) * 3600_000;
  const start = new Date(date.getTime() - lookbackMs);
  return `${GEOSPHERE_HOCHFICHT_PREFIX}WXRHOF_${formatUtcYmdHm(start)}.hdf`;
}

export function geosphereVolumeListingUrl(options = {}) {
  return s3StyleListingUrl(options.baseUrl || GEOSPHERE_DATAHUB_URL, {
    prefix: options.prefix || GEOSPHERE_HOCHFICHT_PREFIX,
    maxKeys: options.maxKeys ?? options.maxKeysPerPage ?? 1000,
    startAfter: options.startAfter ?? geosphereStartAfterKey(options.now || new Date(), options.lookbackHours ?? 12),
    continuationToken: options.continuationToken,
  });
}

export function parseGeosphereVolumeListing(textOrListing, options = {}) {
  const site = resolveGeosphereInternationalSite(options.siteId || options.site || "hochficht");
  const listing = parseS3StyleListing(textOrListing);
  return listing.contents
    .map((object, index) => normalizeGeosphereVolumeItem(site, object, index, options))
    .filter(Boolean)
    .sort((left, right) => left.key.localeCompare(right.key))
    .map(cloneCatalogRecord);
}

export function geosphereFramePlansFromListing(textOrListing, options = {}) {
  const site = resolveGeosphereInternationalSite(options.siteId || options.site || "hochficht");
  let items = parseGeosphereVolumeListing(textOrListing, { ...options, siteId: site.id });
  if (options.count !== undefined || options.limit !== undefined) {
    items = items.slice(-clampInt(options.count ?? options.limit, 1, 1000));
  }
  return items.map((item) => makeInternationalFramePlan({
    providerId: "geosphere",
    providerLabel: "GeoSphere Austria",
    site,
    identity: item.fileName,
    parts: [{ url: item.url }],
    merge: false,
    format: "odim-h5",
    volumeTime: item.volumeTime,
    sourceItem: item,
  }));
}

export function geosphereFramePlanFromListing(textOrListing, options = {}) {
  const plans = geosphereFramePlansFromListing(textOrListing, options);
  if (!plans.length) throw new Error("GeoSphere returned no WXRHOF_*.hdf volume items");
  return plans[plans.length - 1];
}

export function parseAutoIndexListing(textOrEntries, options = {}) {
  if (Array.isArray(textOrEntries)) {
    return textOrEntries
      .map((entry, index) => normalizeAutoIndexEntry(entry, index, options))
      .filter(Boolean)
      .map(cloneCatalogRecord);
  }
  const baseUrl = options.baseUrl ? trimTrailingSlash(options.baseUrl) : "";
  const html = String(textOrEntries || "");
  const entries = [];
  const pattern = /<a\b[^>]*\bhref\s*=\s*["']?([^"'\s>]+)["']?[^>]*>([\s\S]*?)<\/a>/gi;
  for (const [index, match] of [...html.matchAll(pattern)].entries()) {
    const href = unescapeHtmlEntities(match[1] || "").trim();
    const label = stripHtmlTags(unescapeHtmlEntities(match[2] || "")).trim();
    if (!autoIndexHrefAllowed(href, options)) continue;
    const name = normalizeAutoIndexName(href);
    if (!name || name === "." || name === "..") continue;
    const isDir = href.endsWith("/") || name.endsWith("/");
    const cleanName = name.replace(/\/+$/g, "");
    const cleanHref = href.replace(/\/+$/g, "");
    entries.push({
      name: cleanName,
      href,
      url: isAbsoluteUrl(href) ? href : (baseUrl ? joinRawUrlPath(baseUrl, cleanHref) : href),
      isDir,
      index,
      rawLabel: label,
    });
  }
  return entries
    .filter((entry) => options.includeParent || (entry.name !== ".." && entry.href !== "../"))
    .map(cloneCatalogRecord);
}

export function shmuVolumeRootUrl(options = {}) {
  return trimTrailingSlash(options.baseUrl || SHMU_RADAR_VOLUME_ROOT);
}

export function shmuSiteCatalogUrl(siteId, options = {}) {
  const site = resolveShmuInternationalSite(siteId);
  return `${shmuVolumeRootUrl(options)}/${encodeURIComponent(site.id)}/`;
}

export function shmuProductCatalogUrl(siteId, product, options = {}) {
  const site = resolveShmuInternationalSite(siteId);
  return `${shmuSiteCatalogUrl(site.id, options)}${encodeURIComponent(validateShmuProduct(product))}/`;
}

export function shmuProductDateListingUrl(siteId, product, date, options = {}) {
  const normalizedDate = validateShmuDate(date);
  return `${shmuProductCatalogUrl(siteId, product, options)}${normalizedDate}/`;
}

export function parseShmuDateListing(textOrEntries) {
  return parseAutoIndexListing(textOrEntries)
    .filter((entry) => entry.isDir && /^\d{8}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

export function parseShmuFileListing(siteId, product, date, textOrEntries, options = {}) {
  const site = resolveShmuInternationalSite(siteId);
  const normalizedProduct = validateShmuProduct(product);
  const normalizedDate = validateShmuDate(date);
  const baseUrl = options.baseUrl || shmuProductDateListingUrl(site.id, normalizedProduct, normalizedDate, options);
  return parseAutoIndexListing(textOrEntries, { baseUrl })
    .filter((entry) => !entry.isDir)
    .map((entry, index) => normalizeShmuFileItem(site, normalizedProduct, normalizedDate, entry, index, options))
    .filter(Boolean)
    .sort((left, right) => left.stamp.localeCompare(right.stamp) || left.name.localeCompare(right.name))
    .map(cloneCatalogRecord);
}

export function shmuFramePlansFromProductFiles(siteId, filesByProduct, options = {}) {
  const site = resolveShmuInternationalSite(siteId);
  const normalized = normalizeShmuFilesByProduct(filesByProduct, site, options);
  const dbz = normalized.get("dBZ") || [];
  const vel = normalized.get("V") || [];
  const commonStamps = shmuCommonStamps(dbz, vel);
  let stamps = commonStamps;
  if (options.count !== undefined || options.limit !== undefined) {
    stamps = stamps.slice(-clampInt(options.count ?? options.limit, 1, 1000));
  }
  return stamps.map((stamp) => shmuPlanForStamp(site, stamp, normalized));
}

export function shmuFramePlanFromProductFiles(siteId, filesByProduct, options = {}) {
  const plans = shmuFramePlansFromProductFiles(siteId, filesByProduct, options);
  if (!plans.length) throw new Error(`SHMU site '${siteId}' has no timestamp common to dBZ and V`);
  return plans[plans.length - 1];
}

export function dwdSitesRootUrl(options = {}) {
  return trimTrailingSlash(options.baseUrl || DWD_RADAR_SITES_ROOT);
}

export function dwdProductCatalogUrl(productDir, options = {}) {
  return `${dwdSitesRootUrl(options)}/${encodeURIComponent(validateDwdProductDir(productDir))}/`;
}

export function dwdProductStationCatalogUrl(siteId, productDir, options = {}) {
  const site = resolveDwdInternationalSite(siteId);
  return `${dwdProductCatalogUrl(productDir, options)}${encodeURIComponent(site.id)}/`;
}

export function dwdProductHdf5CatalogUrl(siteId, productDir, options = {}) {
  return `${dwdProductStationCatalogUrl(siteId, productDir, options)}hdf5/`;
}

export function dwdProductSweepListingUrl(siteId, productDir, variant = "unfiltered", options = {}) {
  const stationUrl = dwdProductStationCatalogUrl(siteId, productDir, options);
  const cleanVariant = validateDwdVariantPath(variant || "");
  return cleanVariant ? `${stationUrl}${cleanVariant}/` : stationUrl;
}

export function parseDwdSweepListing(siteId, productDir, quantity, textOrEntries, options = {}) {
  const site = resolveDwdInternationalSite(siteId);
  const dir = validateDwdProductDir(productDir);
  const normalizedQuantity = validateDwdQuantity(quantity);
  const baseUrl = options.baseUrl || dwdProductSweepListingUrl(site.id, dir, options.variant || "unfiltered", options);
  return parseAutoIndexListing(textOrEntries, { baseUrl })
    .filter((entry) => !entry.isDir)
    .map((entry, index) => normalizeDwdSweepItem(site, dir, normalizedQuantity, entry, index, options))
    .filter(Boolean)
    .sort((left, right) => left.sweep - right.sweep || left.stamp.localeCompare(right.stamp) || left.name.localeCompare(right.name))
    .map(cloneCatalogRecord);
}

export function dwdFramePlansFromProductSweeps(siteId, sweepsByProduct, options = {}) {
  const site = resolveDwdInternationalSite(siteId);
  const normalized = normalizeDwdSweepsByProduct(sweepsByProduct, site, options);
  const baseSweeps = normalized.get("sweep_vol_z") || [];
  const anchors = dwdCycleAnchors(baseSweeps);
  if (!anchors.length) throw new Error(`DWD ${site.id}: no complete-cycle anchor in sweep_vol_z`);

  let selectedAnchors = anchors;
  if (options.count !== undefined || options.limit !== undefined) {
    selectedAnchors = selectedAnchors.slice(-clampInt(options.count ?? options.limit, 1, 1000));
  }
  return selectedAnchors.map((anchor) => dwdPlanForAnchor(site, anchor, normalized, options));
}

export function dwdFramePlanFromProductSweeps(siteId, sweepsByProduct, options = {}) {
  const plans = dwdFramePlansFromProductSweeps(siteId, sweepsByProduct, options);
  if (!plans.length) throw new Error(`DWD site '${siteId}' has no sweep-volume frame plan`);
  return plans[plans.length - 1];
}

export function chmiSitesRootUrl(options = {}) {
  return trimTrailingSlash(options.baseUrl || CHMI_RADAR_SITES_ROOT);
}

export function chmiSiteCatalogUrl(siteId, options = {}) {
  const site = resolveChmiInternationalSite(siteId);
  return `${chmiSitesRootUrl(options)}/${encodeURIComponent(site.id)}/`;
}

export function chmiProductCatalogUrl(siteId, productDir, options = {}) {
  return `${chmiSiteCatalogUrl(siteId, options)}${encodeURIComponent(validateChmiProductDir(productDir))}/`;
}

export function chmiProductHdf5ListingUrl(siteId, productDir, options = {}) {
  return `${chmiProductCatalogUrl(siteId, productDir, options)}hdf5/`;
}

export function parseChmiFileListing(siteId, productDir, textOrEntries, options = {}) {
  const site = resolveChmiInternationalSite(siteId);
  const dir = validateChmiProductDir(productDir);
  const baseUrl = options.baseUrl || chmiProductHdf5ListingUrl(site.id, dir, options);
  return parseAutoIndexListing(textOrEntries, { baseUrl })
    .filter((entry) => !entry.isDir)
    .map((entry, index) => normalizeChmiFileItem(site, dir, entry, index, options))
    .filter(Boolean)
    .sort((left, right) => left.timeMs - right.timeMs || left.task.localeCompare(right.task) || left.name.localeCompare(right.name))
    .map(cloneCatalogRecord);
}

export function chmiFramePlansFromProductFiles(siteId, filesByProduct, options = {}) {
  const site = resolveChmiInternationalSite(siteId);
  const normalized = normalizeChmiFilesByProduct(filesByProduct, site, options);
  const baseFiles = normalized.get("vol_z") || [];
  const anchors = chmiFrameAnchors(baseFiles);
  if (!anchors.length) throw new Error(`CHMI ${site.id}: no frame anchor in vol_z`);

  let selectedAnchors = anchors;
  if (options.count !== undefined || options.limit !== undefined) {
    selectedAnchors = selectedAnchors.slice(-clampInt(options.count ?? options.limit, 1, 1000));
  }
  return selectedAnchors.map((anchor) => chmiPlanForAnchor(site, anchor, normalized, options));
}

export function chmiFramePlanFromProductFiles(siteId, filesByProduct, options = {}) {
  const plans = chmiFramePlansFromProductFiles(siteId, filesByProduct, options);
  if (!plans.length) throw new Error(`CHMI site '${siteId}' has no task-volume frame plan`);
  return plans[plans.length - 1];
}

export function jmaRadarBaseUrl(options = {}) {
  return trimTrailingSlash(options.baseUrl || JMA_RADAR_BASE_URL);
}

export function jmaTarUrl(product = JMA_REFLECTIVITY_PRODUCT, stampOrDate = new Date(), options = {}) {
  const productId = validateJmaProduct(product);
  const stamp = normalizeJmaStamp(stampOrDate);
  return `${jmaRadarBaseUrl(options)}/${stamp.slice(0, 4)}/${stamp.slice(4, 6)}/${stamp.slice(6, 8)}/Z__C_RJTD_${stamp}_RDR_JMAGPV_${productId}_grib2.tar`;
}

export function jmaCandidateStamps(nowOrOptions = new Date(), maybeOptions = {}) {
  const options = isPlainOptionsObject(nowOrOptions) ? nowOrOptions : maybeOptions;
  const nowInput = isPlainOptionsObject(nowOrOptions) ? (options.now || new Date()) : nowOrOptions;
  const nowMs = dateMs(nowInput, "JMA candidate time");
  const lookbackMinutes = clampInt(options.lookbackMinutes ?? JMA_LOOKBACK_MINUTES, 0, 24 * 60);
  const stepMs = JMA_STAMP_STEP_MINUTES * 60_000;
  const floorMs = Math.floor(nowMs / stepMs) * stepMs;
  const count = Math.floor(lookbackMinutes / JMA_STAMP_STEP_MINUTES) + 1;
  return Array.from({ length: count }, (_, index) => formatUtcYmdHmsFromMs(floorMs - index * stepMs));
}

export function jmaFramePlanFromStamp(siteId, stampOrDate, options = {}) {
  const site = resolveJmaInternationalSite(siteId);
  const product = validateJmaProduct(options.jmaProduct || options.sourceProduct || options.product || JMA_REFLECTIVITY_PRODUCT);
  const stamp = normalizeJmaStamp(stampOrDate);
  const url = jmaTarUrl(product, stamp, options);
  return makeInternationalFramePlan({
    providerId: "jma",
    providerLabel: "JMA Japan",
    site,
    identity: `${stamp}_${site.id}`,
    parts: [{ url }],
    merge: false,
    format: "jma-grib2-tar",
    volumeTime: volumeTimeFromInternationalIdentity(stamp),
    sourceItem: {
      stamp,
      product,
      url,
      site: cloneCatalogRecord(site),
    },
  });
}

export function ordBucketBaseUrl(options = {}) {
  return trimTrailingSlash(options.baseUrl || ORD_RADAR_BUCKET_URL);
}

export function ordObjectKinds(siteId, options = {}) {
  if (options.objectKind || options.kind) return [validateOrdObjectKind(options.objectKind || options.kind)];
  const site = resolveOrdInternationalSite(siteId);
  return ORD_PVOL_SITE_IDS.has(site.id) ? ["PVOL", "SCAN"] : ["SCAN", "PVOL"];
}

export function ordHourPrefix(siteId, objectKind = "PVOL", hourOrDate = new Date()) {
  const site = resolveOrdInternationalSite(siteId);
  const kind = validateOrdObjectKind(objectKind);
  const country = ordCountryForCode(site.id);
  const hourMs = ordHourMs(hourOrDate);
  return `${ordDatePrefixFromMs(hourMs)}${country.dir}/${site.id}/${kind}/${site.id}@${formatUtcYmdHFromMs(hourMs)}`;
}

export function ordHourListingUrl(siteId, objectKind = "PVOL", hourOrDate = new Date(), options = {}) {
  return s3StyleListingUrl(ordBucketBaseUrl(options), {
    prefix: ordHourPrefix(siteId, objectKind, hourOrDate),
    maxKeys: options.maxKeys ?? options.maxKeysPerPage ?? 1000,
    continuationToken: options.continuationToken,
  });
}

export function parseOrdObjectKey(siteId, key) {
  const site = resolveOrdInternationalSite(siteId);
  const parsed = normalizeOrdFile(site.id, key);
  return parsed ? cloneCatalogRecord(parsed) : null;
}

export function ordFramePlansFromKeys(siteId, objectKind, keysOrListing, options = {}) {
  const site = resolveOrdInternationalSite(siteId);
  const kind = validateOrdObjectKind(objectKind);
  const files = normalizeOrdKeys(keysOrListing)
    .map((key) => normalizeOrdFile(site.id, key))
    .filter(Boolean)
    .filter((file) => file.objectKind === kind)
    .sort((left, right) => left.timeMs - right.timeMs || left.key.localeCompare(right.key));
  if (!files.length) throw new Error(`ORD '${site.id}': no parseable ${kind} object keys`);
  let anchors = [...new Set(files.map((file) => file.timeMs))].sort((left, right) => left - right);
  if (options.count !== undefined || options.limit !== undefined) {
    anchors = anchors.slice(-clampInt(options.count ?? options.limit, 1, 1000));
  }
  return anchors.map((anchorMs) => ordPlanForAnchor(site, kind, files, anchorMs, options));
}

export function ordFramePlanFromKeys(siteId, objectKind, keysOrListing, options = {}) {
  const plans = ordFramePlansFromKeys(siteId, objectKind, keysOrListing, { ...options, count: 1 });
  if (!plans.length) throw new Error(`ORD '${siteId}': no frame plan`);
  return plans[plans.length - 1];
}

export function fmiDatePrefix(dateOrPrefix = new Date()) {
  if (typeof dateOrPrefix === "string") {
    const raw = dateOrPrefix.trim();
    if (/^\d{4}\/\d{2}\/\d{2}\/?$/.test(raw)) return raw.endsWith("/") ? raw : `${raw}/`;
    const compact = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (compact) return `${compact[1]}/${compact[2]}/${compact[3]}/`;
  }
  const date = dateOrPrefix instanceof Date ? dateOrPrefix : new Date(dateOrPrefix);
  if (!Number.isFinite(date.getTime())) throw new Error(`FMI: invalid UTC date '${dateOrPrefix}'`);
  return `${date.getUTCFullYear()}/${pad2(date.getUTCMonth() + 1)}/${pad2(date.getUTCDate())}/`;
}

export function fmiCatalogListingUrl(options = {}) {
  return s3StyleListingUrl(options.baseUrl || FMI_RADAR_VOLUME_BUCKET_URL, {
    prefix: fmiDatePrefix(options.datePrefix || options.date || options.now || new Date()),
    delimiter: "/",
    maxKeys: options.maxKeys ?? 1000,
  });
}

export function fmiRadarVolumeListingUrl(siteId, options = {}) {
  const site = resolveFmiInternationalSite(siteId);
  const prefix = options.prefix || `${fmiDatePrefix(options.datePrefix || options.date || options.now || new Date())}${site.id}/`;
  return s3StyleListingUrl(options.baseUrl || FMI_RADAR_VOLUME_BUCKET_URL, {
    prefix,
    maxKeys: options.maxKeys ?? 1000,
    startAfter: options.startAfter,
    continuationToken: options.continuationToken,
  });
}

export function parseFmiVolumeListing(siteId, textOrListing, options = {}) {
  const site = resolveFmiInternationalSite(siteId);
  const listing = parseS3StyleListing(textOrListing);
  return listing.contents
    .map((object, index) => normalizeFmiVolumeItem(site, object, index, options))
    .filter(Boolean)
    .sort((left, right) => left.key.localeCompare(right.key))
    .map(cloneCatalogRecord);
}

export function fmiFramePlansFromListing(siteId, textOrListing, options = {}) {
  const site = resolveFmiInternationalSite(siteId);
  let items = parseFmiVolumeListing(site.id, textOrListing, options);
  if (options.count !== undefined || options.limit !== undefined) {
    items = items.slice(-clampInt(options.count ?? options.limit, 1, 1000));
  }
  return items.map((item) => makeInternationalFramePlan({
    providerId: "fmi",
    providerLabel: "FMI Finland",
    site,
    identity: item.fileName,
    parts: [{ url: item.url }],
    merge: false,
    format: "odim-h5",
    volumeTime: item.volumeTime,
    sourceItem: item,
  }));
}

export function fmiFramePlanFromListing(siteId, textOrListing, options = {}) {
  const plans = fmiFramePlansFromListing(siteId, textOrListing, options);
  if (!plans.length) throw new Error(`FMI returned no PVOL items for site ${siteId}`);
  return plans[plans.length - 1];
}

export function dmiVolumeItemsUrl(siteId, options = {}) {
  const params = new URLSearchParams();
  if (siteId !== undefined && siteId !== null && String(siteId).trim()) {
    params.set("stationId", validateDmiStationId(siteId));
  }
  params.set("limit", String(clampInt(options.limit ?? options.count ?? 1, 1, 200)));
  params.set("sortorder", "datetime,DESC");
  if (options.offset !== undefined) params.set("offset", String(Math.max(0, clampInt(options.offset, 0, 1000000))));
  if (options.datetime) params.set("datetime", String(options.datetime));
  return `${DMI_RADAR_VOLUME_ITEMS_URL}?${params.toString()}`;
}

export function parseDmiVolumeItems(textOrJson, options = {}) {
  const data = typeof textOrJson === "string" ? JSON.parse(textOrJson || "{}") : (textOrJson || {});
  const features = Array.isArray(data.features) ? data.features : [];
  return features
    .map((feature, index) => normalizeDmiFeature(feature, index, options))
    .filter(Boolean);
}

export function dmiFramePlansFromItems(siteId, textOrJson, options = {}) {
  const site = resolveDmiInternationalSite(siteId);
  return parseDmiVolumeItems(textOrJson, { ...options, siteId: site.id })
    .filter((item) => String(item.stationId) === String(site.id))
    .map((item) => makeInternationalFramePlan({
      providerId: "dmi",
      providerLabel: "DMI Denmark",
      site,
      identity: item.id,
      parts: [{ url: item.url }],
      merge: false,
      format: "odim-h5",
      volumeTime: item.volumeTime,
      sourceItem: item,
    }));
}

export function dmiFramePlanFromItems(siteId, textOrJson, options = {}) {
  const plans = dmiFramePlansFromItems(siteId, textOrJson, options);
  if (!plans.length) throw new Error(`DMI returned no volume items for station ${siteId}`);
  return plans[0];
}

export function isZipBytes(bytes) {
  const view = normalizeByteInput(bytes);
  return view.byteLength >= 4 && readUint32(view, 0) === 0x04034b50;
}

export function parseZipDirectory(bytes, options = {}) {
  const view = normalizeByteInput(bytes);
  const eocdOffset = findZipEndOfCentralDirectory(view);
  const entryCount = readUint16(view, eocdOffset + 10);
  const centralDirectorySize = readUint32(view, eocdOffset + 12);
  const centralDirectoryOffset = readUint32(view, eocdOffset + 16);
  if (centralDirectoryOffset === 0xffffffff || centralDirectorySize === 0xffffffff || entryCount === 0xffff) {
    throw new Error("ZIP64 mobile archives are not supported in the browser helper yet");
  }
  const decoder = new TextDecoder(options.encoding || "utf-8");
  const entries = [];
  let offset = centralDirectoryOffset;
  const end = centralDirectoryOffset + centralDirectorySize;
  while (offset < end) {
    if (readUint32(view, offset) !== 0x02014b50) throw new Error(`invalid ZIP central directory entry at ${offset}`);
    const flags = readUint16(view, offset + 8);
    const compressionMethod = readUint16(view, offset + 10);
    const lastModifiedTime = readUint16(view, offset + 12);
    const lastModifiedDate = readUint16(view, offset + 14);
    const crc32 = readUint32(view, offset + 16);
    const compressedSize = readUint32(view, offset + 20);
    const uncompressedSize = readUint32(view, offset + 24);
    const nameLength = readUint16(view, offset + 28);
    const extraLength = readUint16(view, offset + 30);
    const commentLength = readUint16(view, offset + 32);
    const localHeaderOffset = readUint32(view, offset + 42);
    if (compressedSize === 0xffffffff || uncompressedSize === 0xffffffff || localHeaderOffset === 0xffffffff) {
      throw new Error("ZIP64 mobile archive entries are not supported in the browser helper yet");
    }
    const nameBytes = view.subarray(offset + 46, offset + 46 + nameLength);
    const name = decoder.decode(nameBytes).replace(/\\/g, "/");
    entries.push({
      type: "bowecho-zip-entry-v1",
      name,
      fileName: name.split("/").filter(Boolean).pop() || name,
      directory: name.endsWith("/"),
      compressionMethod,
      encrypted: Boolean(flags & 0x0001),
      compressedSize,
      uncompressedSize,
      crc32: crc32 >>> 0,
      localHeaderOffset,
      lastModified: dosDateTimeToIso(lastModifiedDate, lastModifiedTime),
    });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries.filter((entry) => options.includeDirectories || !entry.directory);
}

export async function extractZipEntries(bytes, options = {}) {
  const view = normalizeByteInput(bytes);
  const entries = parseZipDirectory(view, options);
  const wanted = entries
    .filter((entry) => zipEntryAllowed(entry, options))
    .slice(0, clampInt(options.maxEntries ?? 1000, 1, 10000));
  const results = [];
  for (const entry of wanted) {
    results.push({
      ...entry,
      bytes: await extractZipEntryBytes(view, entry),
    });
  }
  return results;
}

export async function extractMobileArchiveEntries(bytes, options = {}) {
  const entries = await extractZipEntries(bytes, {
    ...options,
    filter: options.filter || mobileArchiveZipEntryAllowed,
  });
  return entries
    .filter((entry) => entry.bytes?.byteLength)
    .sort((left, right) => left.name.localeCompare(right.name));
}

export async function latestInternationalFramePlan(providerId, siteId, options = {}) {
  const provider = normalizeInternationalProviderId(providerId);
  if (provider === "smhi") return latestSmhiFramePlan(siteId, options);
  if (provider === "geosphere") return latestGeosphereFramePlan(siteId, options);
  if (provider === "shmu") return latestShmuFramePlan(siteId, options);
  if (provider === "dwd") return latestDwdFramePlan(siteId, options);
  if (provider === "chmi") return latestChmiFramePlan(siteId, options);
  if (provider === "jma") return latestJmaFramePlan(siteId, options);
  if (provider === "ord") return latestOrdFramePlan(siteId, options);
  if (provider === "dmi") {
    const site = resolveDmiInternationalSite(siteId);
    const text = await fetchText(dmiVolumeItemsUrl(site.id, { ...options, limit: 1 }), options);
    return dmiFramePlanFromItems(site.id, text, options);
  }
  if (provider === "fmi") return latestFmiFramePlan(siteId, options);
  throw new Error(`international provider '${provider}' is not browser-plannable yet`);
}

export async function recentInternationalFramePlans(providerId, siteId, countOrOptions = 6, maybeOptions = {}) {
  const options = typeof countOrOptions === "object" && countOrOptions !== null ? countOrOptions : maybeOptions;
  const count = clampInt(
    typeof countOrOptions === "object" && countOrOptions !== null
      ? options.frameCount ?? options.count ?? 6
      : countOrOptions,
    1,
    200,
  );
  const provider = normalizeInternationalProviderId(providerId);
  if (provider === "smhi") return recentSmhiFramePlans(siteId, count, options);
  if (provider === "geosphere") return recentGeosphereFramePlans(siteId, count, options);
  if (provider === "shmu") return recentShmuFramePlans(siteId, count, options);
  if (provider === "dwd") return recentDwdFramePlans(siteId, count, options);
  if (provider === "chmi") return recentChmiFramePlans(siteId, count, options);
  if (provider === "jma") return recentJmaFramePlans(siteId, count, options);
  if (provider === "ord") return recentOrdFramePlans(siteId, count, options);
  if (provider === "dmi") {
    const site = resolveDmiInternationalSite(siteId);
    const text = await fetchText(dmiVolumeItemsUrl(site.id, { ...options, limit: count }), options);
    return dmiFramePlansFromItems(site.id, text, options).slice(0, count).reverse();
  }
  if (provider === "fmi") return recentFmiFramePlans(siteId, count, options);
  throw new Error(`international provider '${provider}' is not browser-plannable yet`);
}

export function internationalFrameFromPlan(planOrOptions, options = {}) {
  const plan = normalizeInternationalFramePlan(planOrOptions);
  const site = normalizeInternationalSiteDescriptor(options.site || plan.site);
  const firstPart = plan.parts[0];
  if (!firstPart?.url) throw new Error("internationalFrameFromPlan requires at least one URL part");
  const id = options.id || `${plan.providerId}-${site.id}-${plan.identity}`;
  const cacheKey = options.cacheKey || `international:${plan.providerId}:${site.id}:${hashString(plan.identity)}`;
  return {
    id,
    cacheKey,
    source: options.source || "international",
    provider: options.provider || plan.providerId,
    format: options.format || plan.format || "odim-h5",
    complete: true,
    url: plan.merge ? undefined : firstPart.url,
    urls: plan.merge ? plan.parts.map((part) => part.url) : undefined,
    merge: Boolean(plan.merge),
    volumeTime: options.volumeTime || plan.volumeTime || volumeTimeFromInternationalIdentity(plan.identity) || null,
    site: site.id,
    siteLocation: { lat: site.lat, lon: site.lon },
    internationalProviderId: plan.providerId,
    internationalSiteId: site.id,
    internationalSite: site,
    siteFilteredDecode: Boolean(site.siteFilteredDecode),
    identity: plan.identity,
    plan: cloneCatalogRecord(plan),
  };
}

export async function latestInternationalFrame(providerId, siteId, options = {}) {
  return internationalFrameFromPlan(await latestInternationalFramePlan(providerId, siteId, options), options);
}

export async function recentInternationalFrames(providerId, siteId, countOrOptions = 6, maybeOptions = {}) {
  const options = typeof countOrOptions === "object" && countOrOptions !== null ? countOrOptions : maybeOptions;
  const plans = await recentInternationalFramePlans(providerId, siteId, countOrOptions, maybeOptions);
  return plans.map((plan) => internationalFrameFromPlan(plan, options));
}

export function communityRadarFeeds(options = {}) {
  const query = normalizeQuery(options.query);
  const states = normalizeStringSet(options.state || options.states);
  return COMMUNITY_RADAR_FEEDS
    .filter((feed) => !query || `${feed.id} ${feed.label} ${feed.state} ${feed.cluster || ""}`.toUpperCase().includes(query))
    .filter((feed) => !states.size || states.has(String(feed.state || "").toUpperCase()))
    .map(cloneCatalogRecord);
}

export function communityRadarFeed(feedOrId) {
  const feed = findCommunityRadarFeed(feedOrId);
  return feed ? cloneCatalogRecord(feed) : null;
}

export function communityRadarMarkers(options = {}) {
  const query = normalizeQuery(options.query);
  const feedIds = normalizeStringSet(options.feedId || options.feedIds);
  return COMMUNITY_RADAR_MARKERS
    .filter((marker) => !query || `${marker.label} ${(marker.feedIds || []).join(" ")}`.toUpperCase().includes(query))
    .filter((marker) => !feedIds.size || (marker.feedIds || []).some((id) => feedIds.has(String(id).toUpperCase())))
    .map(cloneCatalogRecord);
}

export function normalizeCustomPollUrl(input) {
  const trimmed = trimTrailingSlash(String(input || "").trim());
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
}

export function pollUrlsMatch(left, right) {
  return normalizeCustomPollUrl(left).toUpperCase() === normalizeCustomPollUrl(right).toUpperCase();
}

export function pollUrlName(url) {
  const normalized = normalizeCustomPollUrl(url);
  const withoutScheme = normalized.includes("://") ? normalized.split("://").slice(1).join("://") : normalized;
  const withoutQuery = withoutScheme.split(/[?#]/)[0];
  return withoutQuery
    .replace(/\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .pop() || "custom feed";
}

export function parseCustomPollMarkerInputs(latInput, lonInput) {
  const latText = String(latInput ?? "").trim();
  const lonText = String(lonInput ?? "").trim();
  if (!latText && !lonText) {
    return {
      latE6: CUSTOM_POLL_NO_MARKER_LAT_E6,
      lonE6: CUSTOM_POLL_NO_MARKER_LON_E6,
      lat_e6: CUSTOM_POLL_NO_MARKER_LAT_E6,
      lon_e6: CUSTOM_POLL_NO_MARKER_LON_E6,
      hasMarker: false,
    };
  }
  if (!latText || !lonText) throw new Error("Custom poll link: enter both latitude and longitude, or leave both blank");
  const lat = Number(latText);
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) throw new Error("Custom poll link: latitude must be -90 to 90");
  const lon = Number(lonText);
  if (!Number.isFinite(lon) || lon < -180 || lon > 180) throw new Error("Custom poll link: longitude must be -180 to 180");
  const latE6 = Math.round(lat * 1_000_000);
  const lonE6 = Math.round(lon * 1_000_000);
  return { latE6, lonE6, lat_e6: latE6, lon_e6: lonE6, lat, lon, hasMarker: true };
}

export function customPollEntryLatLon(entry) {
  if (!entry || typeof entry !== "object") return null;
  let lat = Number(entry.lat ?? entry.latitude);
  let lon = Number(entry.lon ?? entry.lng ?? entry.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    const latE6 = Number(entry.latE6 ?? entry.lat_e6);
    const lonE6 = Number(entry.lonE6 ?? entry.lon_e6);
    lat = latE6 / 1_000_000;
    lon = lonE6 / 1_000_000;
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return { lat, lon };
}

export function customPollEntryLabel(entry) {
  if (!entry || typeof entry !== "object") return "custom feed";
  const label = String(entry.label || entry.name || "").trim();
  if (label) return label;
  const siteId = String(entry.siteId || entry.site_id || entry.site || entry.id || "").trim();
  if (siteId) return siteId;
  return pollUrlName(entry.pollUrl || entry.poll_url || entry.url || "");
}

export function customPollUrlForGisSite(basePollUrl, siteId, options = {}) {
  const baseUrl = normalizeCustomPollUrl(basePollUrl);
  const id = String(siteId || "").trim();
  if (!baseUrl || !id) return baseUrl;
  for (const placeholder of options.placeholders || ["{site}", "{SITE}", "{id}", "{ID}"]) {
    if (baseUrl.includes(placeholder)) return baseUrl.replaceAll(placeholder, id);
  }
  const totalSites = Number(options.totalSites ?? options.count ?? 0);
  const lastSegment = baseUrl.replace(/\/+$/g, "").split("/").filter(Boolean).pop() || "";
  if (lastSegment.toUpperCase() === id.toUpperCase() || totalSites === 1) return baseUrl;
  return `${baseUrl.replace(/\/+$/g, "")}/${encodeUrlPath(id)}`;
}

export function parseCustomRadarGis(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map(parseCustomRadarGisLine)
    .filter(Boolean);
}

export function customPollLinksFromGis(text, basePollUrl, options = {}) {
  const sites = parseCustomRadarGis(text);
  if (!sites.length) throw new Error("no valid GR radar GIS site rows found");
  const baseUrl = normalizeCustomPollUrl(basePollUrl);
  if (!baseUrl) throw new Error("enter a Poll URL base before importing GIS");
  const totalSites = sites.length;
  return sites.map((site) => normalizeCustomPollLink({
    label: site.label,
    siteId: site.siteId,
    latE6: Math.round(site.lat * 1_000_000),
    lonE6: Math.round(site.lon * 1_000_000),
    pollUrl: customPollUrlForGisSite(baseUrl, site.siteId, { ...options, totalSites }),
  }));
}

export function normalizeCustomPollLink(entry, options = {}) {
  const source = entry && typeof entry === "object" ? entry : { pollUrl: entry };
  const pollUrl = normalizeCustomPollUrl(source.pollUrl || source.poll_url || source.url || options.pollUrl || options.baseUrl || "");
  if (!pollUrl && !options.allowEmptyUrl) throw new Error("Custom poll link: enter a Poll URL first");
  const siteId = String(source.siteId || source.site_id || source.site || source.id || options.siteId || "").trim();
  const labelInput = String(source.label || source.name || options.label || "").trim();
  const marker = markerMicrodegreesFromEntry(source);
  const link = {
    label: labelInput || siteId || pollUrlName(pollUrl),
    siteId,
    site_id: siteId,
    latE6: marker.latE6,
    lonE6: marker.lonE6,
    lat_e6: marker.latE6,
    lon_e6: marker.lonE6,
    pollUrl,
    poll_url: pollUrl,
  };
  const lonLat = customPollEntryLatLon(link);
  if (lonLat) Object.assign(link, lonLat);
  return link;
}

export function customPollLinkFeed(entry, options = {}) {
  const link = normalizeCustomPollLink(entry, options);
  const lonLat = customPollEntryLatLon(link) || {};
  const id = String(options.id || link.siteId || link.label || pollUrlName(link.pollUrl)).trim().toUpperCase().replace(/\s+/g, "-") || "CUSTOM";
  return {
    id,
    label: link.label || id,
    state: String(options.state || entry?.state || entry?.region || ""),
    lat: finiteOrNull(lonLat.lat),
    lon: finiteOrNull(lonLat.lon),
    pollUrl: link.pollUrl,
    cluster: options.cluster ?? entry?.cluster ?? "custom",
    customPollLink: link,
  };
}

export function customPollLinksAsFeeds(entries = [], options = {}) {
  return [...entries].map((entry) => customPollLinkFeed(entry, options));
}

export function upsertCustomPollLink(entries = [], entry, options = {}) {
  const links = [...entries].map((item) => normalizeCustomPollLink(item));
  const incoming = normalizeCustomPollLink(entry, options);
  const index = links.findIndex((existing) =>
    pollUrlsMatch(existing.pollUrl, incoming.pollUrl)
    || (incoming.siteId && String(existing.siteId || "").toUpperCase() === incoming.siteId.toUpperCase())
  );
  if (index >= 0) {
    links[index] = incoming;
    return { type: "bowecho-custom-poll-upsert-v1", updated: true, index, entry: cloneCatalogRecord(incoming), links };
  }
  links.push(incoming);
  return { type: "bowecho-custom-poll-upsert-v1", updated: false, index: links.length - 1, entry: cloneCatalogRecord(incoming), links };
}

export function customPollMarkers(entries = [], options = {}) {
  const query = normalizeQuery(options.query);
  return [...entries]
    .map((entry) => normalizeCustomPollLink(entry))
    .map((entry) => ({ entry, lonLat: customPollEntryLatLon(entry) }))
    .filter(({ entry, lonLat }) => lonLat && (!query || `${entry.siteId} ${entry.label} ${entry.pollUrl}`.toUpperCase().includes(query)))
    .map(({ entry, lonLat }) => ({
      type: "bowecho-custom-poll-marker-v1",
      id: entry.siteId || entry.label || pollUrlName(entry.pollUrl),
      label: customPollEntryLabel(entry),
      siteId: entry.siteId,
      lat: lonLat.lat,
      lon: lonLat.lon,
      pollUrl: entry.pollUrl,
      entry: cloneCatalogRecord(entry),
    }));
}

export function customPollLinksGeoJson(entries = [], options = {}) {
  return {
    type: "FeatureCollection",
    features: customPollMarkers(entries, options).map((marker) => ({
      type: "Feature",
      id: marker.id,
      geometry: { type: "Point", coordinates: [marker.lon, marker.lat] },
      properties: {
        source: "custom",
        providerId: "custom-gr2a",
        id: marker.id,
        label: marker.label,
        siteId: marker.siteId,
        pollUrl: marker.pollUrl,
        capabilities: {
          clientSideReady: true,
          corsRequired: true,
          dirListPolling: true,
          livePolling: true,
          recentLoop: true,
        },
      },
    })),
  };
}

export function parseCommunityDirList(text, options = {}) {
  const prefix = normalizeCommunityEntryPrefix(options.prefix);
  return String(text || "")
    .split(/\r?\n/)
    .map((line, index) => parseCommunityDirListLine(line, index + 1, prefix))
    .filter(Boolean)
    .sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0))
    .map(cloneCatalogRecord);
}

export function newestCommunityDirListEntry(textOrEntries, options = {}) {
  const entries = Array.isArray(textOrEntries)
    ? textOrEntries.map(cloneCatalogRecord).sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0))
    : parseCommunityDirList(textOrEntries, options);
  return entries.length ? cloneCatalogRecord(entries[entries.length - 1]) : null;
}

export function parseGrLevel2CfgSites(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^Site:/i.test(line))
    .map((line) => line.replace(/^Site:/i, "").trim())
    .filter(Boolean);
}

export async function fetchCommunityDirList(feedOrId, options = {}) {
  const feed = resolveCommunityRadarFeed(feedOrId);
  const baseUrl = trimTrailingSlash(options.baseUrl || options.pollUrl || feed.pollUrl);
  if (!baseUrl) throw new Error(`community feed ${feed.id} has no pollUrl`);
  const directUrl = `${baseUrl}/dir.list`;
  let directText = null;
  let directError = null;
  try {
    directText = await fetchText(directUrl, options);
    const entries = parseCommunityDirList(directText);
    if (entries.length) {
      return makeCommunityDirListPlan({
        feed,
        baseUrl,
        directoryUrl: baseUrl,
        listingUrl: directUrl,
        text: directText,
        entries,
        prefix: "",
      });
    }
  } catch (error) {
    directError = error;
  }

  const cfgUrl = `${baseUrl}/grlevel2.cfg`;
  const cfgText = await fetchText(cfgUrl, options).catch(() => null);
  const cfgSites = parseGrLevel2CfgSites(cfgText);
  if (cfgSites.length === 1) {
    const site = cfgSites[0];
    const prefix = normalizeCommunityEntryPrefix(site);
    const listingUrl = `${baseUrl}/${encodeUrlPath(site)}/dir.list`;
    const text = await fetchText(listingUrl, options).catch((error) => {
      throw new Error(`${site}/dir.list: ${error.message || error}`);
    });
    const entries = parseCommunityDirList(text, { prefix });
    return makeCommunityDirListPlan({
      feed,
      baseUrl,
      directoryUrl: `${baseUrl}/${encodeUrlPath(site)}`,
      listingUrl,
      text,
      entries,
      prefix,
      cfgUrl,
      cfgSites,
    });
  }
  if (cfgSites.length > 1) {
    throw new Error(`server hosts ${cfgSites.length} sites (${cfgSites.join(", ")}) - append one to the URL`);
  }
  if (directText !== null) throw new Error("dir.list: no data files listed");
  throw new Error(`dir.list: ${directError?.message || directError || "fetch failed"}`);
}

export function communityFeedFrameFromEntry(feedOrId, entryOrName, options = {}) {
  const feed = resolveCommunityRadarFeed(feedOrId);
  const entry = normalizeCommunityEntry(entryOrName);
  const baseUrl = trimTrailingSlash(options.baseUrl || options.pollUrl || feed.pollUrl);
  const path = trimLeadingSlash(options.path || entry.path || entry.name);
  if (!path) throw new Error("communityFeedFrameFromEntry requires a dir.list entry name");
  const fileName = entry.fileName || path.split("/").filter(Boolean).pop() || path;
  const url = options.url || entry.url || (isAbsoluteUrl(path) ? path : joinUrlPath(baseUrl, path));
  const identity = options.identity || entry.identity || path;
  const volumeTime = options.volumeTime || entry.volumeTime || volumeTimeFromArchiveId(fileName) || null;
  return {
    id: options.id || `${feed.id}-${fileName}`,
    cacheKey: options.cacheKey || `community-gr2a:${feed.id}:${hashString(url)}`,
    source: options.source || "community",
    provider: options.provider || "community-gr2a",
    format: options.format || entry.format || "nexrad-level2",
    complete: true,
    size: Number.isFinite(Number(options.size ?? entry.size)) ? Number(options.size ?? entry.size) : undefined,
    url,
    volumeTime,
    fileName,
    site: options.site ? normalizeSite(options.site) : String(feed.id || "RADAR").toUpperCase(),
    siteLocation: {
      lat: finiteOrNull(feed.lat),
      lon: finiteOrNull(feed.lon),
    },
    feedId: feed.id,
    feed: cloneCatalogRecord(feed),
    pollUrl: feed.pollUrl,
    directoryUrl: options.directoryUrl || entry.directoryUrl || null,
    listingUrl: options.listingUrl || entry.listingUrl || null,
    identity,
  };
}

export async function latestCommunityFrame(feedOrId, options = {}) {
  const plan = await fetchCommunityDirList(feedOrId, options);
  const entry = newestCommunityDirListEntry(plan.entries);
  if (!entry) throw new Error(`${plan.feed.id}: empty dir.list`);
  return communityFeedFrameFromEntry(plan.feed, entry, {
    ...options,
    baseUrl: plan.baseUrl,
    directoryUrl: plan.directoryUrl,
    listingUrl: plan.listingUrl,
    identity: entry.path,
  });
}

export async function recentCommunityFrames(feedOrId, countOrOptions = 6, maybeOptions = {}) {
  const options = typeof countOrOptions === "object" && countOrOptions !== null ? countOrOptions : maybeOptions;
  const count = clampInt(
    typeof countOrOptions === "object" && countOrOptions !== null
      ? options.frameCount ?? options.count ?? 6
      : countOrOptions,
    1,
    200,
  );
  const plan = await fetchCommunityDirList(feedOrId, options);
  return plan.entries
    .slice(-count)
    .map((entry) => communityFeedFrameFromEntry(plan.feed, entry, {
      ...options,
      baseUrl: plan.baseUrl,
      directoryUrl: plan.directoryUrl,
      listingUrl: plan.listingUrl,
      identity: entry.path,
    }));
}

export function globalRadarSites(options = {}) {
  return filterGlobalRadarSites(options).map(cloneCatalogRecord);
}

export function globalRadarSitesGeoJson(options = {}) {
  return {
    type: "FeatureCollection",
    features: filterGlobalRadarSites(options).map(globalRadarSiteFeature),
  };
}

export function mapboxGlobalRadarSiteSource(options = {}) {
  return {
    type: "geojson",
    data: globalRadarSitesGeoJson(options),
  };
}

export function deckGlobalRadarSiteScatterplotLayerProps(options = {}) {
  const collection = globalRadarSitesGeoJson(options);
  return {
    id: options.id || "bowecho-global-radar-sites-scatter",
    data: collection.features,
    getPosition: options.getPosition || ((feature) => feature.geometry.coordinates),
    getRadius: options.getRadius || ((feature) => Number(options.radiusMeters ?? radiusForGlobalSiteFeature(feature))),
    getFillColor: options.getFillColor || ((feature) => options.fillColor || colorForGlobalSiteFeature(feature)),
    getLineColor: options.getLineColor || (() => options.lineColor || [8, 12, 14, 255]),
    lineWidthMinPixels: Number(options.lineWidthMinPixels ?? 1),
    radiusMinPixels: Number(options.radiusMinPixels ?? 3),
    radiusMaxPixels: Number(options.radiusMaxPixels ?? 12),
    pickable: Boolean(options.pickable ?? true),
  };
}

export function nearestRadarSite(lonLat, options = {}) {
  const lon = Number(lonLat?.lon ?? lonLat?.lng ?? lonLat?.longitude ?? lonLat?.[0]);
  const lat = Number(lonLat?.lat ?? lonLat?.latitude ?? lonLat?.[1]);
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) throw new Error("nearestRadarSite requires lon/lat");
  const maxDistanceKm = Number.isFinite(Number(options.maxDistanceKm)) ? Number(options.maxDistanceKm) : Infinity;
  let best = null;
  for (const site of filterGlobalRadarSites(options)) {
    const distanceKm = haversineDistanceKm(lat, lon, site.lat, site.lon);
    if (distanceKm > maxDistanceKm) continue;
    if (!best || distanceKm < best.distanceKm) {
      best = { ...cloneCatalogRecord(site), distanceKm };
    }
  }
  return best;
}

export function radarSiteSourceSummary(options = {}) {
  const sites = filterGlobalRadarSites(options);
  const providers = {};
  const countries = {};
  const sources = {};
  for (const site of sites) {
    providers[site.providerId] = (providers[site.providerId] || 0) + 1;
    countries[site.country || "Unknown"] = (countries[site.country || "Unknown"] || 0) + 1;
    sources[site.source] = (sources[site.source] || 0) + 1;
  }
  return {
    type: "bowecho-radar-source-summary-v1",
    total: sites.length,
    sources,
    providers,
    countries,
  };
}

export function radarTextureLayer(renderedFrame, options = {}) {
  if (!renderedFrame) throw new Error("renderedFrame is required");
  const renderOptions = cleanRenderOptions({
    ...renderedFrame.renderOptions,
    ...options,
    product: options.product || renderedFrame.renderOptions?.product,
    cut: options.cut ?? renderedFrame.renderOptions?.cut,
    width: renderedFrame.width,
    height: renderedFrame.height,
  });
  const site = resolveSiteDescriptor(options.site || siteDescriptorFromMeta(renderedFrame.meta) || renderedFrame.meta?.site);
  const width = renderedFrame.width;
  const height = renderedFrame.height;
  const radarX = Number(options.radarX ?? width * 0.5);
  const radarY = Number(options.radarY ?? height * 0.5);
  const kmPerPxX = Number(options.kmPerPxX ?? ((renderOptions.rangeKm * 2) / width));
  const kmPerPxY = Number(options.kmPerPxY ?? ((renderOptions.rangeKm * 2) / height));
  const viewport = {
    width,
    height,
    radarX,
    radarY,
    rangeKm: renderOptions.rangeKm,
    kmPerPxX,
    kmPerPxY,
    northUp: true,
  };
  const corners = {
    nw: textureCorner(site, viewport, 0, 0),
    ne: textureCorner(site, viewport, width, 0),
    se: textureCorner(site, viewport, width, height),
    sw: textureCorner(site, viewport, 0, height),
  };
  const quad = [corners.nw, corners.ne, corners.se, corners.sw];
  return {
    type: "bowecho-radar-texture-v1",
    id: [
      site.id,
      renderOptions.product,
      renderOptions.cut,
      renderedFrame.frame?.id || renderedFrame.frame?.cacheKey || "frame",
    ].join(":"),
    site,
    product: renderOptions.product,
    cut: renderOptions.cut,
    source: renderedFrame.frame?.source || "unknown",
    frame: frameSummary(renderedFrame.frame),
    image: {
      rgba: renderedFrame.rgba,
      imageData: renderedFrame.imageData || null,
      width,
      height,
      premultipliedAlpha: false,
      colorSpace: "srgb",
    },
    viewport,
    center: {
      lon: site.lon,
      lat: site.lat,
      mercator: lonLatToWebMercator(site.lon, site.lat),
    },
    corners,
    quad,
    bounds: lonLatBounds(quad),
    mercatorBounds: mercatorBounds(quad),
    opacity: Number(options.opacity ?? 1),
    cacheHit: Boolean(renderedFrame.cacheHit),
    elapsedMs: renderedFrame.elapsedMs,
  };
}

export function radarCrossSectionPanel(renderedSection, options = {}) {
  if (!renderedSection) throw new Error("renderedSection is required");
  const site = resolveSiteDescriptor(options.site || siteDescriptorFromMeta(renderedSection.meta) || renderedSection.meta?.site || renderedSection.renderOptions?.site);
  const renderOptions = cleanCrossSectionOptions({
    ...renderedSection.renderOptions,
    ...options,
    site,
    product: options.product || renderedSection.renderOptions?.product || renderedSection.meta?.product,
    width: renderedSection.width,
    height: renderedSection.height,
    topKm: options.topKm ?? renderedSection.renderOptions?.topKm ?? renderedSection.meta?.topKm,
    start: options.start || renderedSection.renderOptions?.start || renderedSection.meta?.start,
    end: options.end || renderedSection.renderOptions?.end || renderedSection.meta?.end,
  }, site);
  const start = enrichCrossSectionPoint(site, renderOptions.start);
  const end = enrichCrossSectionPoint(site, renderOptions.end);
  return {
    type: "bowecho-cross-section-panel-v1",
    id: [
      site.id,
      renderOptions.product,
      renderedSection.frame?.id || renderedSection.frame?.cacheKey || "frame",
      `${formatCacheNumber(start.eastKm)},${formatCacheNumber(start.northKm)}`,
      `${formatCacheNumber(end.eastKm)},${formatCacheNumber(end.northKm)}`,
    ].join(":"),
    site,
    product: renderOptions.product,
    source: renderedSection.frame?.source || "unknown",
    frame: frameSummary(renderedSection.frame),
    image: {
      rgba: renderedSection.rgba,
      imageData: renderedSection.imageData || null,
      width: renderedSection.width,
      height: renderedSection.height,
      premultipliedAlpha: false,
      colorSpace: "srgb",
    },
    geometry: {
      start,
      end,
      lengthKm: renderedSection.meta?.lengthKm ?? crossSectionLengthKm(start, end),
      topKm: renderedSection.meta?.topKm ?? renderOptions.topKm,
      path: [start, end],
      coordinates: [[start.lon, start.lat], [end.lon, end.lat]],
      mercatorPath: [start.mercator, end.mercator],
    },
    axes: {
      x: { label: "Range", units: "km", min: 0, max: renderedSection.meta?.lengthKm ?? crossSectionLengthKm(start, end) },
      y: { label: "Height", units: "km", min: 0, max: renderedSection.meta?.topKm ?? renderOptions.topKm },
    },
    units: renderedSection.meta?.units || PRODUCT_CATALOG.find((product) => product.id === renderOptions.product)?.units || "",
    colorFamily: renderedSection.meta?.colorFamily || colorFamilyForProduct(renderOptions.product),
    valueRange: renderedSection.meta?.valueRange || null,
    opacity: Number(options.opacity ?? 1),
    cacheHit: Boolean(renderedSection.cacheHit),
    elapsedMs: renderedSection.elapsedMs,
  };
}

export function radarAnalysisOverlay(analysis, options = {}) {
  if (!analysis) throw new Error("analysis is required");
  const site = resolveSiteDescriptor(options.site || siteDescriptorFromMeta(analysis) || analysis.site || analysis.renderOptions?.site);
  const frame = frameSummary(analysis.frame);
  const cellFeatures = (analysis.cells || []).map((cell) =>
    analysisFeature(site, frame, analysis, "stormCell", cell, {
      label: cell.id,
      maxDbz: finiteOrNull(cell.maxDbz),
      areaKm2: finiteOrNull(cell.areaKm2),
      eqRadiusKm: finiteOrNull(cell.eqRadiusKm),
      mass: finiteOrNull(cell.mass),
      hlevelDbz: finiteOrNull(cell.hlevelDbz),
    })
  );
  const rotationFeatures = (analysis.rotations || []).map((rotation) =>
    analysisFeature(site, frame, analysis, "rotation", rotation, {
      label: rotation.id,
      strength: rotation.strength || "unknown",
      rank: Number(rotation.rank || 0),
      vrotMps: finiteOrNull(rotation.vrotMps),
      gateToGateDvMps: finiteOrNull(rotation.gateToGateDvMps),
      depthTilts: Number(rotation.depthTilts || 0),
      depthKm: finiteOrNull(rotation.depthKm),
      baseElevationDeg: finiteOrNull(rotation.baseElevationDeg),
      azimuthDeg: finiteOrNull(rotation.azimuthDeg),
      rangeKm: finiteOrNull(rotation.rangeKm),
    })
  );
  const features = [...cellFeatures, ...rotationFeatures];
  return {
    type: "bowecho-analysis-overlay-v1",
    id: [
      site.id,
      analysis.volumeTime || frame.volumeTime || "analysis",
      frame.cacheKey || frame.id || "frame",
    ].join(":"),
    site,
    frame,
    volumeTime: analysis.volumeTime || frame.volumeTime || null,
    cells: cellFeatures,
    rotations: rotationFeatures,
    rotationTilts: [...(analysis.rotationTilts || [])],
    counts: {
      cells: cellFeatures.length,
      rotations: rotationFeatures.length,
      features: features.length,
      rotationTilts: analysis.rotationTilts?.length || 0,
    },
    geojson: {
      type: "FeatureCollection",
      features,
    },
    cacheHit: Boolean(analysis.cacheHit),
    elapsedMs: analysis.elapsedMs,
  };
}

export function radarTorTracksLayer(renderedTracks, options = {}) {
  if (!renderedTracks) throw new Error("renderedTracks is required");
  const site = resolveSiteDescriptor(options.site || siteDescriptorFromMeta(renderedTracks.meta) || renderedTracks.meta?.site || renderedTracks.renderOptions?.site);
  const width = renderedTracks.width;
  const height = renderedTracks.height;
  const halfExtentKm = Number(options.halfExtentKm ?? renderedTracks.meta?.grid?.halfExtentKm ?? renderedTracks.renderOptions?.halfExtentKm ?? 150);
  const cellKm = Number(options.cellKm ?? renderedTracks.meta?.grid?.cellKm ?? renderedTracks.renderOptions?.cellKm ?? ((halfExtentKm * 2) / width));
  const viewport = {
    width,
    height,
    radarX: width * 0.5,
    radarY: height * 0.5,
    rangeKm: halfExtentKm,
    halfExtentKm,
    cellKm,
    kmPerPxX: (halfExtentKm * 2) / width,
    kmPerPxY: (halfExtentKm * 2) / height,
    northUp: true,
  };
  const corners = {
    nw: textureCorner(site, viewport, 0, 0),
    ne: textureCorner(site, viewport, width, 0),
    se: textureCorner(site, viewport, width, height),
    sw: textureCorner(site, viewport, 0, height),
  };
  const quad = [corners.nw, corners.ne, corners.se, corners.sw];
  const frame = frameSummary(renderedTracks.frame);
  const tdsFeatures = (renderedTracks.meta?.tds || []).map((gate, index) =>
    tdsGateFeature(site, frame, renderedTracks.meta, gate, index)
  );
  return {
    type: "bowecho-tor-tracks-layer-v1",
    id: [
      site.id,
      renderedTracks.meta?.volumeTime || frame.volumeTime || "tor-tracks",
      frame.cacheKey || frame.id || "frame",
      renderedTracks.meta?.accumulatedFrames ? `acc${renderedTracks.meta.accumulatedFrames}` : "single",
    ].join(":"),
    site,
    source: renderedTracks.frame?.source || "unknown",
    frame,
    volumeTime: renderedTracks.meta?.volumeTime || frame.volumeTime || null,
    image: {
      rgba: renderedTracks.rgba,
      imageData: renderedTracks.imageData || null,
      width,
      height,
      premultipliedAlpha: false,
      colorSpace: "srgb",
    },
    values: renderedTracks.values,
    grid: {
      ...(renderedTracks.meta?.grid || {}),
      width,
      height,
      halfExtentKm,
      cellKm,
      kmPerPxX: viewport.kmPerPxX,
      kmPerPxY: viewport.kmPerPxY,
    },
    center: {
      lon: site.lon,
      lat: site.lat,
      mercator: lonLatToWebMercator(site.lon, site.lat),
    },
    corners,
    quad,
    bounds: lonLatBounds(quad),
    mercatorBounds: mercatorBounds(quad),
    valueRange: renderedTracks.meta?.valueRange || null,
    tds: {
      gates: [...(renderedTracks.meta?.tds || [])],
      geojson: {
        type: "FeatureCollection",
        features: tdsFeatures,
      },
    },
    counts: {
      ...(renderedTracks.meta?.counts || {}),
      tds: tdsFeatures.length,
    },
    opacity: Number(options.opacity ?? 1),
    cacheHit: Boolean(renderedTracks.cacheHit),
    elapsedMs: renderedTracks.elapsedMs,
  };
}

export function compositeRadarLayers(radarLayers, options = {}) {
  const started = nowMs();
  const layers = Array.from(radarLayers || [])
    .map((layer) => normalizeRadarMapLayer(layer))
    .filter((layer) => layer?.image?.rgba?.byteLength);
  if (!layers.length) throw new Error("compositeRadarLayers requires at least one radar layer");
  const bounds = normalizeCompositeBounds(options.bounds || compositeLayerBounds(layers));
  const grid = resolveCompositeGrid(layers, bounds, options);
  const rgba = new Uint8ClampedArray(grid.width * grid.height * 4);
  const blendMode = options.blendMode || "source-over";
  const alphaThreshold = clampNumber(options.alphaThreshold ?? 1, 0, 255);
  const contributions = layers.map(() => 0);
  const sample = { r: 0, g: 0, b: 0, a: 0 };

  for (let y = 0; y < grid.height; y += 1) {
    const lat = bounds.north - ((y + 0.5) / grid.height) * (bounds.north - bounds.south);
    for (let x = 0; x < grid.width; x += 1) {
      const lon = bounds.west + ((x + 0.5) / grid.width) * (bounds.east - bounds.west);
      const outOffset = (y * grid.width + x) * 4;
      for (const [layerIndex, layer] of layers.entries()) {
        if (!sampleLayerAtLonLat(layer, lon, lat, sample)) continue;
        const alpha = sample.a * Number(layer.opacity ?? 1) * Number(options.opacity ?? 1);
        if (alpha <= alphaThreshold) continue;
        contributions[layerIndex] += 1;
        blendCompositeSample(rgba, outOffset, sample.r, sample.g, sample.b, alpha, blendMode);
      }
    }
  }

  const site = compositeCenterSite(bounds, options);
  const corners = compositeCorners(site, bounds, grid.width, grid.height);
  const quad = [corners.nw, corners.ne, corners.se, corners.sw];
  const paintedPixels = countPaintedPixels(rgba, alphaThreshold);
  return {
    type: "bowecho-radar-composite-v1",
    id: options.id || [
      "composite",
      layers.map((layer) => layer.site?.id || "RADAR").join("+"),
      grid.width,
      grid.height,
    ].join(":"),
    site,
    product: options.product || commonValue(layers.map((layer) => layer.product)) || "MIXED",
    cut: Number.isFinite(Number(options.cut)) ? Number(options.cut) : null,
    source: "composite",
    frame: {
      id: options.frameId || null,
      source: "composite",
      volumeTime: options.volumeTime || commonValue(layers.map((layer) => layer.frame?.volumeTime)) || null,
    },
    image: {
      rgba,
      imageData: typeof ImageData === "function" ? new ImageData(rgba, grid.width, grid.height) : null,
      width: grid.width,
      height: grid.height,
      premultipliedAlpha: false,
      colorSpace: "srgb",
    },
    viewport: {
      width: grid.width,
      height: grid.height,
      radarX: grid.width * 0.5,
      radarY: grid.height * 0.5,
      rangeKm: Math.max(grid.width * grid.kmPerPxX, grid.height * grid.kmPerPxY) * 0.5,
      kmPerPxX: grid.kmPerPxX,
      kmPerPxY: grid.kmPerPxY,
      northUp: true,
    },
    center: {
      lon: site.lon,
      lat: site.lat,
      mercator: lonLatToWebMercator(site.lon, site.lat),
    },
    corners,
    quad,
    bounds,
    mercatorBounds: mercatorBounds(quad),
    layers: layers.map((layer, index) => ({
      id: layer.id,
      site: layer.site,
      product: layer.product,
      cut: layer.cut,
      source: layer.source,
      frame: layer.frame,
      width: layer.image.width,
      height: layer.image.height,
      opacity: Number(layer.opacity ?? 1),
      sampledPixels: contributions[index],
      bounds: layer.bounds,
    })),
    blendMode,
    opacity: Number(options.opacity ?? 1),
    cacheHit: layers.every((layer) => Boolean(layer.cacheHit)),
    elapsedMs: nowMs() - started,
    counts: {
      layers: layers.length,
      paintedPixels,
      transparentPixels: grid.width * grid.height - paintedPixels,
      sampledPixels: contributions.reduce((sum, count) => sum + count, 0),
    },
  };
}

export function compositeSynchronizedRadarLoopSlot(multiLoop, index = undefined, options = {}) {
  if (!multiLoop?.textureLayers) throw new Error("compositeSynchronizedRadarLoopSlot requires a synchronized multi-loop");
  const slotIndex = index === undefined || index === null
    ? Math.max(0, multiLoop.length - 1)
    : Math.max(0, Math.min(multiLoop.length - 1, Number(index)));
  const layers = multiLoop.textureLayers(slotIndex, options);
  return compositeRadarLayers(layers, {
    ...options,
    id: options.id || `${multiLoop.sites.join("+")}:composite:${slotIndex}`,
    product: options.product || multiLoop.product,
    frameId: options.frameId || `slot-${slotIndex}`,
    volumeTime: multiLoop.slot(slotIndex)?.time || null,
  });
}

export function mapboxRadarCoordinates(radarLayer) {
  const layer = normalizeRadarMapLayer(radarLayer);
  return layer.quad.map((corner) => [corner.lon, corner.lat]);
}

export function mapboxRadarImageSource(radarLayer, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  const url = options.url || options.imageUrl;
  if (!url) throw new Error("mapboxRadarImageSource requires options.url; use mapboxRadarCanvasSource for in-memory RGBA/canvas overlays");
  return {
    type: "image",
    url,
    coordinates: mapboxRadarCoordinates(layer),
  };
}

export function mapboxRadarCanvasSource(radarLayer, canvas, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  if (!canvas) throw new Error("mapboxRadarCanvasSource requires a canvas element or canvas element id");
  return {
    type: "canvas",
    canvas,
    animate: Boolean(options.animate ?? false),
    coordinates: mapboxRadarCoordinates(layer),
  };
}

export function mapboxRadarRasterLayer(radarLayer, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  const sourceId = options.sourceId || options.source || `${layer.id}:source`;
  const paint = {
    "raster-opacity": Number(options.opacity ?? layer.opacity ?? 1),
    "raster-fade-duration": Number(options.fadeDuration ?? 0),
  };
  if (Number.isFinite(Number(options.emissiveStrength))) {
    paint["raster-emissive-strength"] = Number(options.emissiveStrength);
  }
  return {
    id: options.layerId || options.id || `${layer.id}:raster`,
    type: "raster",
    source: sourceId,
    paint,
  };
}

export function mapboxRadarLayerSpecs(radarLayer, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  const sourceId = options.sourceId || `${layer.id}:source`;
  const source = options.canvas
    ? mapboxRadarCanvasSource(layer, options.canvas, options)
    : mapboxRadarImageSource(layer, options);
  return {
    sourceId,
    source,
    layer: mapboxRadarRasterLayer(layer, { ...options, sourceId }),
    coordinates: mapboxRadarCoordinates(layer),
  };
}

export function mapboxRadarSiteSource(options = {}) {
  return {
    type: "geojson",
    data: radarSitesGeoJson(options),
  };
}

export function mapboxRadarSiteLayer(options = {}) {
  const sourceId = options.sourceId || options.source || "bowecho-radar-sites";
  return {
    id: options.layerId || options.id || "bowecho-radar-sites-layer",
    type: "circle",
    source: sourceId,
    paint: {
      "circle-radius": Number(options.radius ?? 4),
      "circle-color": options.color || "#f2f4f8",
      "circle-stroke-color": options.strokeColor || "#101418",
      "circle-stroke-width": Number(options.strokeWidth ?? 1),
      "circle-opacity": Number(options.opacity ?? 0.95),
    },
  };
}

export function deckRadarBitmapLayerProps(radarLayer, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  return {
    id: options.id || `${layer.id}:bitmap`,
    image: options.image || layer.image.imageData || layer.image.rgba,
    bounds: options.boundsFormat === "bbox"
      ? [layer.bounds.west, layer.bounds.south, layer.bounds.east, layer.bounds.north]
      : [
        [layer.corners.sw.lon, layer.corners.sw.lat],
        [layer.corners.nw.lon, layer.corners.nw.lat],
        [layer.corners.ne.lon, layer.corners.ne.lat],
        [layer.corners.se.lon, layer.corners.se.lat],
      ],
    opacity: Number(options.opacity ?? layer.opacity ?? 1),
    pickable: Boolean(options.pickable ?? true),
    textureParameters: {
      minFilter: "nearest",
      magFilter: "nearest",
      ...(options.textureParameters || {}),
    },
    parameters: {
      depthTest: false,
      ...(options.parameters || {}),
    },
  };
}

export function deckRadarSiteScatterplotLayerProps(options = {}) {
  const collection = radarSitesGeoJson(options);
  return {
    id: options.id || "bowecho-radar-sites-scatter",
    data: collection.features,
    getPosition: options.getPosition || ((feature) => feature.geometry.coordinates),
    getRadius: options.getRadius || (() => Number(options.radiusMeters ?? 6500)),
    getFillColor: options.getFillColor || (() => options.fillColor || [242, 244, 248, 220]),
    getLineColor: options.getLineColor || (() => options.lineColor || [16, 20, 24, 255]),
    lineWidthMinPixels: Number(options.lineWidthMinPixels ?? 1),
    radiusMinPixels: Number(options.radiusMinPixels ?? 3),
    radiusMaxPixels: Number(options.radiusMaxPixels ?? 10),
    pickable: Boolean(options.pickable ?? true),
  };
}

export function webGpuRadarTextureUpload(radarLayer, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  const width = layer.image.width;
  const height = layer.image.height;
  return {
    type: "bowecho-webgpu-texture-upload-v1",
    id: options.id || `${layer.id}:webgpu-texture`,
    width,
    height,
    format: options.format || "rgba8unorm",
    rgba: layer.image.rgba,
    createTexture: {
      size: [width, height, 1],
      format: options.format || "rgba8unorm",
      usageLabels: options.usageLabels || ["TEXTURE_BINDING", "COPY_DST", "RENDER_ATTACHMENT"],
    },
    writeTexture: {
      data: layer.image.rgba,
      dataLayout: {
        offset: 0,
        bytesPerRow: width * 4,
        rowsPerImage: height,
      },
      size: [width, height, 1],
    },
    georeference: {
      site: layer.site,
      quad: layer.quad,
      bounds: layer.bounds,
      mercatorBounds: layer.mercatorBounds,
    },
  };
}

export function radarPixelToLonLat(siteOrId, pixel, options = {}) {
  const site = resolveSiteDescriptor(siteOrId);
  const viewport = normalizeViewport(options);
  const offset = pixelToRadarOffset(pixel, viewport);
  return { ...radarOffsetToLonLat(site, offset), ...offset };
}

export function radarOffsetToLonLat(siteOrId, offset) {
  const site = resolveSiteDescriptor(siteOrId);
  const eastKm = Number(offset.eastKm ?? offset.east ?? 0);
  const northKm = Number(offset.northKm ?? offset.north ?? 0);
  const distanceKm = Math.hypot(eastKm, northKm);
  if (distanceKm === 0) return { lon: site.lon, lat: site.lat };
  const bearingRad = Math.atan2(eastKm, northKm);
  const angularDistance = distanceKm / EARTH_RADIUS_KM;
  const lat1 = degToRad(site.lat);
  const lon1 = degToRad(site.lon);
  const sinLat1 = Math.sin(lat1);
  const cosLat1 = Math.cos(lat1);
  const sinDistance = Math.sin(angularDistance);
  const cosDistance = Math.cos(angularDistance);
  const lat2 = Math.asin(
    sinLat1 * cosDistance + cosLat1 * sinDistance * Math.cos(bearingRad),
  );
  const lon2 = lon1 + Math.atan2(
    Math.sin(bearingRad) * sinDistance * cosLat1,
    cosDistance - sinLat1 * Math.sin(lat2),
  );
  return { lon: normalizeLon(radToDeg(lon2)), lat: radToDeg(lat2) };
}

export function radarOffsetFromLonLat(siteOrId, lonLat) {
  const site = resolveSiteDescriptor(siteOrId);
  const lat1 = degToRad(site.lat);
  const lat2 = degToRad(Number(lonLat.lat));
  const dLat = lat2 - lat1;
  const dLon = degToRad(normalizeLon(Number(lonLat.lon) - site.lon));
  const sinHalfLat = Math.sin(dLat * 0.5);
  const sinHalfLon = Math.sin(dLon * 0.5);
  const a = sinHalfLat * sinHalfLat
    + Math.cos(lat1) * Math.cos(lat2) * sinHalfLon * sinHalfLon;
  const distanceKm = EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
  const bearingRad = Math.atan2(
    Math.sin(dLon) * Math.cos(lat2),
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon),
  );
  return {
    eastKm: distanceKm * Math.sin(bearingRad),
    northKm: distanceKm * Math.cos(bearingRad),
    distanceKm,
    bearingDeg: normalizeDegrees(radToDeg(bearingRad)),
  };
}

export function lonLatToWebMercator(lon, lat) {
  const clampedLat = Math.max(-MAX_WEB_MERCATOR_LAT, Math.min(MAX_WEB_MERCATOR_LAT, Number(lat)));
  const x = WEB_MERCATOR_RADIUS_M * degToRad(Number(lon));
  const y = WEB_MERCATOR_RADIUS_M * Math.log(Math.tan(Math.PI * 0.25 + degToRad(clampedLat) * 0.5));
  return { x, y };
}

export function webMercatorToLonLat(x, y) {
  const lon = normalizeLon(radToDeg(Number(x) / WEB_MERCATOR_RADIUS_M));
  const lat = radToDeg(2 * Math.atan(Math.exp(Number(y) / WEB_MERCATOR_RADIUS_M)) - Math.PI * 0.5);
  return {
    lon,
    lat: clampNumber(lat, -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT),
  };
}

export function worldPixelSize(zoom, tileSize = 512) {
  return normalizeTileSize(tileSize) * (2 ** clampNumber(Number(zoom ?? 0), 0, 30));
}

export function lonLatToWorldPixel(lon, lat, options = {}) {
  const zoom = clampNumber(Number(options.zoom ?? 0), 0, 30);
  const tileSize = normalizeTileSize(options.tileSize ?? 512);
  const size = worldPixelSize(zoom, tileSize);
  const clampedLat = clampNumber(Number(lat), -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT);
  const sinLat = Math.sin(degToRad(clampedLat));
  return {
    x: ((normalizeLon(Number(lon)) + 180) / 360) * size,
    y: (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * size,
    zoom,
    tileSize,
    worldSize: size,
  };
}

export function worldPixelToLonLat(x, y, options = {}) {
  const zoom = clampNumber(Number(options.zoom ?? 0), 0, 30);
  const tileSize = normalizeTileSize(options.tileSize ?? 512);
  const size = worldPixelSize(zoom, tileSize);
  const pixelX = options.wrapX === false ? Number(x) : wrapNumber(Number(x), size);
  const pixelY = clampNumber(Number(y), 0, size);
  const lon = (pixelX / size) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * pixelY) / size;
  return {
    lon: options.wrapX === false ? lon : normalizeLon(lon),
    lat: clampNumber(radToDeg(Math.atan(Math.sinh(n))), -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT),
  };
}

export function normalizeMapView(options = {}) {
  const source = options && typeof options === "object" ? options : {};
  const width = clampNumber(source.width ?? source.clientWidth ?? 1024, 1, 262144);
  const height = clampNumber(source.height ?? source.clientHeight ?? 768, 1, 262144);
  const tileSize = normalizeTileSize(source.tileSize ?? 512);
  const minZoom = Number.isFinite(Number(source.minZoom)) ? Number(source.minZoom) : 0;
  const maxZoom = Number.isFinite(Number(source.maxZoom)) ? Number(source.maxZoom) : 22;
  const zoom = clampNumber(Number(source.zoom ?? 6), Math.min(minZoom, maxZoom), Math.max(minZoom, maxZoom));
  const center = normalizeMapCenter(source);
  const centerWorld = lonLatToWorldPixel(center.lon, center.lat, { zoom, tileSize });
  const bounds = mapViewBounds(centerWorld, width, height, { zoom, tileSize });
  return {
    type: "bowecho-map-view-v1",
    center: {
      lon: center.lon,
      lat: center.lat,
      mercator: lonLatToWebMercator(center.lon, center.lat),
      world: centerWorld,
    },
    zoom,
    width,
    height,
    tileSize,
    worldSize: centerWorld.worldSize,
    minZoom,
    maxZoom,
    bounds: bounds.bounds,
    unwrappedBounds: bounds.unwrappedBounds,
    mercatorBounds: bounds.mercatorBounds,
    antimeridian: bounds.antimeridian,
  };
}

export function fitMapViewToBounds(bounds, options = {}) {
  const geoBounds = normalizeGeoBounds(bounds);
  const padding = normalizePadding(options.padding ?? 32);
  const width = clampNumber(options.width ?? options.clientWidth ?? 1024, 1, 262144);
  const height = clampNumber(options.height ?? options.clientHeight ?? 768, 1, 262144);
  const tileSize = normalizeTileSize(options.tileSize ?? 512);
  const minZoom = Number.isFinite(Number(options.minZoom)) ? Number(options.minZoom) : 0;
  const maxZoom = Number.isFinite(Number(options.maxZoom)) ? Number(options.maxZoom) : 22;
  const base = boundsToZoomZeroWorld(geoBounds, tileSize);
  const innerWidth = Math.max(1, width - padding.left - padding.right);
  const innerHeight = Math.max(1, height - padding.top - padding.bottom);
  const spanX = Math.max(1e-9, Math.abs(base.eastX - base.westX));
  const spanY = Math.max(1e-9, Math.abs(base.southY - base.northY));
  const zoomX = Math.log2(innerWidth / spanX);
  const zoomY = Math.log2(innerHeight / spanY);
  const requestedZoom = Number.isFinite(Number(options.zoom)) ? Number(options.zoom) : Math.min(zoomX, zoomY);
  const zoom = clampNumber(requestedZoom, Math.min(minZoom, maxZoom), Math.max(minZoom, maxZoom));
  const center = worldPixelToLonLat(
    (base.westX + base.eastX) * 0.5,
    (base.northY + base.southY) * 0.5,
    { zoom: 0, tileSize },
  );
  return normalizeMapView({
    ...options,
    width,
    height,
    tileSize,
    minZoom,
    maxZoom,
    zoom,
    center,
  });
}

export function fitMapViewToLayer(radarLayer, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  return fitMapViewToBounds(layer.bounds, options);
}

export function panMapView(view, delta = {}, options = {}) {
  const current = normalizeMapView(view);
  const dx = Number(delta.dx ?? delta.x ?? delta[0] ?? 0);
  const dy = Number(delta.dy ?? delta.y ?? delta[1] ?? 0);
  const direction = options.drag === true ? -1 : 1;
  const centerWorld = current.center.world;
  const center = worldPixelToLonLat(
    centerWorld.x + dx * direction,
    centerWorld.y + dy * direction,
    { zoom: current.zoom, tileSize: current.tileSize },
  );
  return normalizeMapView({
    ...current,
    center,
  });
}

export function zoomMapView(view, zoomDelta = 0, options = {}) {
  const current = normalizeMapView(view);
  const absoluteZoom = Number.isFinite(Number(options.zoom))
    ? Number(options.zoom)
    : (options.mode === "absolute" || options.absolute === true ? Number(zoomDelta) : current.zoom + Number(zoomDelta));
  const zoom = clampNumber(absoluteZoom, current.minZoom, current.maxZoom);
  const anchor = normalizeAnchor(options.anchor ?? options, current.width, current.height);
  const oldCenter = current.center.world;
  const oldAnchorWorld = {
    x: oldCenter.x + anchor.x - current.width * 0.5,
    y: oldCenter.y + anchor.y - current.height * 0.5,
  };
  const anchorLonLat = worldPixelToLonLat(oldAnchorWorld.x, oldAnchorWorld.y, {
    zoom: current.zoom,
    tileSize: current.tileSize,
  });
  const newAnchorWorld = lonLatToWorldPixel(anchorLonLat.lon, anchorLonLat.lat, {
    zoom,
    tileSize: current.tileSize,
  });
  const center = worldPixelToLonLat(
    newAnchorWorld.x - (anchor.x - current.width * 0.5),
    newAnchorWorld.y - (anchor.y - current.height * 0.5),
    { zoom, tileSize: current.tileSize },
  );
  return normalizeMapView({
    ...current,
    zoom,
    center,
  });
}

export function mapTileCover(view, options = {}) {
  const mapView = normalizeMapView(view);
  const z = clampInt(options.z ?? options.tileZoom ?? Math.floor(mapView.zoom), 0, 30);
  const tileSize = normalizeTileSize(options.tileSize ?? mapView.tileSize);
  const scale = 2 ** (z - mapView.zoom);
  const center = lonLatToWorldPixel(mapView.center.lon, mapView.center.lat, { zoom: z, tileSize });
  const left = center.x - mapView.width * 0.5 * scale;
  const right = center.x + mapView.width * 0.5 * scale;
  const top = center.y - mapView.height * 0.5 * scale;
  const bottom = center.y + mapView.height * 0.5 * scale;
  const tileCount = 2 ** z;
  const minTileX = Math.floor(left / tileSize);
  const maxTileX = Math.floor((right - 1e-9) / tileSize);
  const minTileY = clampInt(Math.floor(top / tileSize), 0, tileCount - 1);
  const maxTileY = clampInt(Math.floor((bottom - 1e-9) / tileSize), 0, tileCount - 1);
  const maxTiles = clampInt(options.maxTiles ?? 2048, 1, 65536);
  const tiles = [];
  let clipped = false;
  for (let y = minTileY; y <= maxTileY; y += 1) {
    for (let rawX = minTileX; rawX <= maxTileX; rawX += 1) {
      if (tiles.length >= maxTiles) {
        clipped = true;
        break;
      }
      const x = wrapTileX(rawX, tileCount);
      const tile = {
        z,
        x,
        y,
        rawX,
        key: `${z}/${x}/${y}`,
        url: tileUrl(options.urlTemplate, z, x, y),
        bounds: tileLonLatBounds(rawX, y, z),
      };
      tiles.push(tile);
    }
    if (clipped) break;
  }
  return {
    type: "bowecho-map-tile-cover-v1",
    z,
    zoom: z,
    tileSize,
    worldSize: worldPixelSize(z, tileSize),
    view: mapView,
    bounds: mapView.bounds,
    antimeridian: mapView.antimeridian || minTileX < 0 || maxTileX >= tileCount,
    tiles,
    count: tiles.length,
    clipped,
  };
}

export function radarLayerQuadMesh(radarLayer, mapView = undefined, options = {}) {
  const layer = normalizeRadarMapLayer(radarLayer);
  const view = mapView ? normalizeMapView(mapView) : fitMapViewToLayer(layer, options);
  const centerWorld = view.center.world;
  const worldSize = view.worldSize;
  const corners = [
    ["nw", layer.corners.nw, [0, 0]],
    ["ne", layer.corners.ne, [1, 0]],
    ["se", layer.corners.se, [1, 1]],
    ["sw", layer.corners.sw, [0, 1]],
  ];
  const vertices = corners.map(([name, corner, uv]) => {
    const world = lonLatToWorldPixel(corner.lon, corner.lat, { zoom: view.zoom, tileSize: view.tileSize });
    const x = unwrapWorldX(world.x, centerWorld.x, worldSize);
    const y = world.y;
    const screen = [
      x - centerWorld.x + view.width * 0.5,
      y - centerWorld.y + view.height * 0.5,
    ];
    return {
      corner: name,
      lon: corner.lon,
      lat: corner.lat,
      mercator: corner.mercator,
      sourcePixel: corner.pixel,
      world: [x, y],
      screen,
      clip: [
        (screen[0] / view.width) * 2 - 1,
        1 - (screen[1] / view.height) * 2,
      ],
      uv,
    };
  });
  return {
    type: "bowecho-radar-quad-mesh-v1",
    id: `${layer.id}:quad-mesh`,
    layerId: layer.id,
    view,
    vertices,
    indices: [0, 1, 2, 0, 2, 3],
    triangles: [[0, 1, 2], [0, 2, 3]],
    opacity: Number(options.opacity ?? layer.opacity ?? 1),
    image: layer.image,
    bounds: layer.bounds,
    mercatorBounds: layer.mercatorBounds,
  };
}

export function cutChoicesFromMetadata(meta, options = {}) {
  if (!meta || typeof meta !== "object") return [];
  const requestedSelected = options.selectedCut ?? meta.selectedCut;
  const selectedCut = Number.isInteger(Number(requestedSelected)) ? Number(requestedSelected) : null;
  const displayableCuts = new Set((meta.displayableCuts || []).map((index) => Number(index)));
  const cuts = Array.isArray(meta.cuts) ? meta.cuts : [];
  const choices = cuts.length
    ? cuts.map((cut, fallbackIndex) => {
      const index = Number.isInteger(Number(cut.index)) ? Number(cut.index) : fallbackIndex;
      const displayable = displayableCuts.size
        ? displayableCuts.has(index)
        : Boolean(cut.displayable ?? true);
      const elevationDeg = Number.isFinite(Number(cut.elevationDeg)) ? Number(cut.elevationDeg) : null;
      const moments = Array.isArray(cut.moments) ? [...cut.moments] : [];
      const elevationNumber = Number.isInteger(Number(cut.elevationNumber)) ? Number(cut.elevationNumber) : null;
      return {
        index,
        value: index,
        label: formatCutChoiceLabel({ index, elevationDeg, elevationNumber }),
        elevationDeg,
        elevationNumber,
        radials: Number.isFinite(Number(cut.radials)) ? Number(cut.radials) : null,
        moments,
        products: productsForCut(cut).map((product) => product.id),
        displayable,
        selected: selectedCut !== null ? index === selectedCut : Boolean(cut.selected),
      };
    })
    : [...displayableCuts].sort((a, b) => a - b).map((index) => ({
      index,
      value: index,
      label: `Tilt ${index}`,
      elevationDeg: null,
      elevationNumber: null,
      radials: null,
      moments: [],
      displayable: true,
      selected: selectedCut !== null && index === selectedCut,
    }));
  return options.displayableOnly === false ? choices : choices.filter((choice) => choice.displayable);
}

export function productChoicesFromMetadata(meta, options = {}) {
  const selectedProduct = normalizeProduct(options.selectedProduct || options.product);
  const selectedCut = Number.isInteger(Number(options.selectedCut ?? options.cut ?? meta?.selectedCut))
    ? Number(options.selectedCut ?? options.cut ?? meta?.selectedCut)
    : null;
  const choices = PRODUCT_CATALOG.map((descriptor) => {
    const capability = productCapability(descriptor.id);
    const cuts = cutsForProduct(meta, descriptor.id, options);
    const available = cuts.length > 0;
    const defaultCut = chooseProductDefaultCut(cuts, selectedCut);
    return {
      ...descriptor,
      capability,
      available,
      selected: descriptor.id === selectedProduct,
      sourceMoment: capability?.source || descriptor.id,
      sourceAliases: capability?.aliases || [descriptor.id],
      scope: capability?.scope || "cut",
      cutIndependent: Boolean(capability?.cutIndependent),
      usesDealiasedVelocity: Boolean(capability?.usesDealiasedVelocity),
      stormRelative: Boolean(capability?.stormRelative),
      cuts,
      cutIndexes: cuts.map((cut) => cut.index),
      defaultCut,
      reason: available ? null : `requires ${capability?.source || descriptor.id}`,
    };
  });
  return options.availableOnly ? choices.filter((choice) => choice.available) : choices;
}

export function capabilityHintsFromMetadata(meta, options = {}) {
  const products = productChoicesFromMetadata(meta, options);
  const availableProducts = products.filter((product) => product.available);
  const cuts = cutChoicesFromMetadata(meta, {
    selectedCut: options.selectedCut ?? options.cut ?? meta?.selectedCut,
    displayableOnly: options.displayableOnly,
  });
  const groups = {};
  for (const product of products) {
    if (!groups[product.group]) groups[product.group] = [];
    groups[product.group].push(product.id);
  }
  const available = new Set(availableProducts.map((product) => product.id));
  return {
    type: "bowecho-capability-hints-v1",
    site: meta?.site || options.site || null,
    volumeTime: meta?.volumeTime || null,
    selectedProduct: normalizeProduct(options.selectedProduct || options.product || "REF"),
    selectedCut: Number.isInteger(Number(options.selectedCut ?? options.cut ?? meta?.selectedCut))
      ? Number(options.selectedCut ?? options.cut ?? meta?.selectedCut)
      : null,
    vcp: meta?.vcp || null,
    cuts,
    products,
    availableProducts: availableProducts.map((product) => product.id),
    unavailableProducts: products.filter((product) => !product.available).map((product) => product.id),
    groups,
    recommendedWarmProducts: recommendedWarmProducts(available, options),
    can: {
      reflectivity: available.has("REF"),
      velocity: available.has("VEL"),
      dealiasedVelocity: available.has("DVEL"),
      stormRelativeVelocity: available.has("SRV"),
      dualPol: ["ZDR", "CC", "PHI", "KDP"].some((product) => available.has(product)),
      derived: availableProducts.some((product) => product.group === "derived" || product.group === "severe"),
      shear: ["AZSHR", "DIV"].some((product) => available.has(product)),
      crossSection: ["REF", "VEL", "DVEL", "SRV", "DSRV", "SW", "ZDR", "CC", "PHI", "KDP", "CREF"].some((product) => available.has(product)),
      analysis: available.has("REF") || available.has("VEL"),
      torTracks: available.has("AZSHR") || available.has("VEL") || available.has("DVEL"),
    },
  };
}

export function loopTimeline(loop, options = {}) {
  const renderedFrames = Array.from(loop?.renderedFrames || []);
  const currentIndex = normalizeLoopIndex(options.currentIndex ?? options.index, renderedFrames.length, renderedFrames.length - 1);
  const now = Number.isFinite(Number(options.now)) ? Number(options.now) : Date.now();
  return renderedFrames.map((rendered, index) => {
    const frame = rendered.frame || {};
    const millis = frameMillis(frame, NaN);
    const ageSeconds = Number.isFinite(millis) && Number.isFinite(now)
      ? Math.max(0, Math.round((now - millis) / 1000))
      : null;
    return {
      index,
      id: frame.id || null,
      cacheKey: frame.cacheKey || null,
      source: frame.source || null,
      volumeTime: frame.volumeTime || rendered.meta?.volumeTime || null,
      millis,
      ageSeconds,
      product: rendered.renderOptions?.product || loop.product || null,
      cut: Number.isFinite(Number(rendered.renderOptions?.cut)) ? Number(rendered.renderOptions.cut) : (Number.isFinite(Number(loop.cut)) ? Number(loop.cut) : null),
      width: rendered.width,
      height: rendered.height,
      cacheHit: Boolean(rendered.cacheHit),
      elapsedMs: rendered.elapsedMs,
      current: index === currentIndex,
      latest: index === renderedFrames.length - 1,
    };
  });
}

export class BowEchoRadarToolbox {
  constructor(options = {}) {
    this.archiveUrl = options.archiveUrl || ARCHIVE_URL;
    this.chunksUrl = options.chunksUrl || CHUNKS_URL;
    this.workerUrl = options.workerUrl || new URL(`./worker.js?v=${WORKER_VERSION}`, import.meta.url);
    this.worker = options.workerClient || createWorkerClient(this.workerUrl);
  }

  products() {
    return PRODUCT_CATALOG.map((product) => ({ ...product }));
  }

  product(productCode) {
    return productDescriptor(productCode);
  }

  productCapability(productCode) {
    return productCapability(productCode);
  }

  productChoices(metaOrLoop, options = {}) {
    const meta = metaOrLoop?.meta || metaOrLoop;
    return productChoicesFromMetadata(meta, {
      selectedProduct: options.selectedProduct ?? metaOrLoop?.product,
      selectedCut: options.selectedCut ?? metaOrLoop?.cut,
      ...options,
    });
  }

  capabilityHints(metaOrLoop, options = {}) {
    const meta = metaOrLoop?.meta || metaOrLoop;
    return capabilityHintsFromMetadata(meta, {
      selectedProduct: options.selectedProduct ?? metaOrLoop?.product,
      selectedCut: options.selectedCut ?? metaOrLoop?.cut,
      ...options,
    });
  }

  frameProviders() {
    return frameProviders();
  }

  supportedByteFormats() {
    return supportedByteFormats();
  }

  supportedArchiveFormats() {
    return supportedArchiveFormats();
  }

  isZipBytes(bytes) {
    return isZipBytes(bytes);
  }

  parseZipDirectory(bytes, options = {}) {
    return parseZipDirectory(bytes, options);
  }

  extractZipEntries(bytes, options = {}) {
    return extractZipEntries(bytes, options);
  }

  extractMobileArchiveEntries(bytes, options = {}) {
    return extractMobileArchiveEntries(bytes, options);
  }

  colorFamilies() {
    return colorFamilies();
  }

  colorFamilyForProduct(product) {
    return colorFamilyForProduct(product);
  }

  parsePalette(text, options = {}) {
    return parseGrPalette(text, options);
  }

  exportPalette(palette, options = {}) {
    return exportGrPalette(palette, options);
  }

  validatePalette(palette) {
    return validatePalette(palette);
  }

  paletteBinding(palette, productOrFamily) {
    return paletteBinding(palette, productOrFamily);
  }

  createPaletteFromStops(stops, options = {}) {
    return createPaletteFromStops(stops, options);
  }

  clonePalette(palette, options = {}) {
    return clonePalette(palette, options);
  }

  palettePreviewCss(palette, options = {}) {
    return palettePreviewCss(palette, options);
  }

  createPaletteStore(options = {}) {
    return createPaletteStore(options);
  }

  serializePaletteLibrary(palettes, options = {}) {
    return serializePaletteLibrary(palettes, options);
  }

  deserializePaletteLibrary(text, options = {}) {
    return deserializePaletteLibrary(text, options);
  }

  sites(options = {}) {
    return filterSites(options).map((site) => ({ ...site }));
  }

  site(siteId) {
    const id = String(siteId || "").toUpperCase();
    const site = RADAR_SITES.find((item) => item.id === id);
    return site ? { ...site } : null;
  }

  sitesGeoJson(options = {}) {
    return radarSitesGeoJson(options);
  }

  radarSourceCatalog(options = {}) {
    return radarSourceCatalog(options);
  }

  internationalRadarSites(options = {}) {
    return internationalRadarSites(options);
  }

  internationalRadarProvider(providerId) {
    return internationalRadarProvider(providerId);
  }

  internationalRadarSite(providerOrSite, siteId = undefined) {
    return internationalRadarSite(providerOrSite, siteId);
  }

  smhiAreaCatalogUrl(options = {}) {
    return smhiAreaCatalogUrl(options);
  }

  smhiQcvolCatalogUrl(siteId, options = {}) {
    return smhiQcvolCatalogUrl(siteId, options);
  }

  smhiDatedQcvolUrl(siteId, key, options = {}) {
    return smhiDatedQcvolUrl(siteId, key, options);
  }

  parseSmhiAreaCatalog(textOrJson, options = {}) {
    return parseSmhiAreaCatalog(textOrJson, options);
  }

  parseSmhiQcvolCatalog(siteId, textOrJson, options = {}) {
    return parseSmhiQcvolCatalog(siteId, textOrJson, options);
  }

  smhiFramePlansFromCatalog(siteId, textOrJson, options = {}) {
    return smhiFramePlansFromCatalog(siteId, textOrJson, options);
  }

  smhiFramePlanFromCatalog(siteId, textOrJson, options = {}) {
    return smhiFramePlanFromCatalog(siteId, textOrJson, options);
  }

  geosphereStartAfterKey(dateOrNow = new Date(), lookbackHours = 12) {
    return geosphereStartAfterKey(dateOrNow, lookbackHours);
  }

  geosphereVolumeListingUrl(options = {}) {
    return geosphereVolumeListingUrl(options);
  }

  parseGeosphereVolumeListing(textOrListing, options = {}) {
    return parseGeosphereVolumeListing(textOrListing, options);
  }

  geosphereFramePlansFromListing(textOrListing, options = {}) {
    return geosphereFramePlansFromListing(textOrListing, options);
  }

  geosphereFramePlanFromListing(textOrListing, options = {}) {
    return geosphereFramePlanFromListing(textOrListing, options);
  }

  parseAutoIndexListing(textOrEntries, options = {}) {
    return parseAutoIndexListing(textOrEntries, options);
  }

  shmuVolumeRootUrl(options = {}) {
    return shmuVolumeRootUrl(options);
  }

  shmuSiteCatalogUrl(siteId, options = {}) {
    return shmuSiteCatalogUrl(siteId, options);
  }

  shmuProductCatalogUrl(siteId, product, options = {}) {
    return shmuProductCatalogUrl(siteId, product, options);
  }

  shmuProductDateListingUrl(siteId, product, date, options = {}) {
    return shmuProductDateListingUrl(siteId, product, date, options);
  }

  parseShmuDateListing(textOrEntries) {
    return parseShmuDateListing(textOrEntries);
  }

  parseShmuFileListing(siteId, product, date, textOrEntries, options = {}) {
    return parseShmuFileListing(siteId, product, date, textOrEntries, options);
  }

  shmuFramePlansFromProductFiles(siteId, filesByProduct, options = {}) {
    return shmuFramePlansFromProductFiles(siteId, filesByProduct, options);
  }

  shmuFramePlanFromProductFiles(siteId, filesByProduct, options = {}) {
    return shmuFramePlanFromProductFiles(siteId, filesByProduct, options);
  }

  dwdSitesRootUrl(options = {}) {
    return dwdSitesRootUrl(options);
  }

  dwdProductCatalogUrl(productDir, options = {}) {
    return dwdProductCatalogUrl(productDir, options);
  }

  dwdProductStationCatalogUrl(siteId, productDir, options = {}) {
    return dwdProductStationCatalogUrl(siteId, productDir, options);
  }

  dwdProductHdf5CatalogUrl(siteId, productDir, options = {}) {
    return dwdProductHdf5CatalogUrl(siteId, productDir, options);
  }

  dwdProductSweepListingUrl(siteId, productDir, variant = "unfiltered", options = {}) {
    return dwdProductSweepListingUrl(siteId, productDir, variant, options);
  }

  parseDwdSweepListing(siteId, productDir, quantity, textOrEntries, options = {}) {
    return parseDwdSweepListing(siteId, productDir, quantity, textOrEntries, options);
  }

  dwdFramePlansFromProductSweeps(siteId, sweepsByProduct, options = {}) {
    return dwdFramePlansFromProductSweeps(siteId, sweepsByProduct, options);
  }

  dwdFramePlanFromProductSweeps(siteId, sweepsByProduct, options = {}) {
    return dwdFramePlanFromProductSweeps(siteId, sweepsByProduct, options);
  }

  chmiSitesRootUrl(options = {}) {
    return chmiSitesRootUrl(options);
  }

  chmiSiteCatalogUrl(siteId, options = {}) {
    return chmiSiteCatalogUrl(siteId, options);
  }

  chmiProductCatalogUrl(siteId, productDir, options = {}) {
    return chmiProductCatalogUrl(siteId, productDir, options);
  }

  chmiProductHdf5ListingUrl(siteId, productDir, options = {}) {
    return chmiProductHdf5ListingUrl(siteId, productDir, options);
  }

  parseChmiFileListing(siteId, productDir, textOrEntries, options = {}) {
    return parseChmiFileListing(siteId, productDir, textOrEntries, options);
  }

  chmiFramePlansFromProductFiles(siteId, filesByProduct, options = {}) {
    return chmiFramePlansFromProductFiles(siteId, filesByProduct, options);
  }

  chmiFramePlanFromProductFiles(siteId, filesByProduct, options = {}) {
    return chmiFramePlanFromProductFiles(siteId, filesByProduct, options);
  }

  jmaRadarBaseUrl(options = {}) {
    return jmaRadarBaseUrl(options);
  }

  jmaTarUrl(product = JMA_REFLECTIVITY_PRODUCT, stampOrDate = new Date(), options = {}) {
    return jmaTarUrl(product, stampOrDate, options);
  }

  jmaCandidateStamps(nowOrOptions = new Date(), maybeOptions = {}) {
    return jmaCandidateStamps(nowOrOptions, maybeOptions);
  }

  jmaFramePlanFromStamp(siteId, stampOrDate, options = {}) {
    return jmaFramePlanFromStamp(siteId, stampOrDate, options);
  }

  ordBucketBaseUrl(options = {}) {
    return ordBucketBaseUrl(options);
  }

  ordObjectKinds(siteId, options = {}) {
    return ordObjectKinds(siteId, options);
  }

  ordHourPrefix(siteId, objectKind = "PVOL", hourOrDate = new Date()) {
    return ordHourPrefix(siteId, objectKind, hourOrDate);
  }

  ordHourListingUrl(siteId, objectKind = "PVOL", hourOrDate = new Date(), options = {}) {
    return ordHourListingUrl(siteId, objectKind, hourOrDate, options);
  }

  parseOrdObjectKey(siteId, key) {
    return parseOrdObjectKey(siteId, key);
  }

  ordFramePlansFromKeys(siteId, objectKind, keysOrListing, options = {}) {
    return ordFramePlansFromKeys(siteId, objectKind, keysOrListing, options);
  }

  ordFramePlanFromKeys(siteId, objectKind, keysOrListing, options = {}) {
    return ordFramePlanFromKeys(siteId, objectKind, keysOrListing, options);
  }

  dmiVolumeItemsUrl(siteId, options = {}) {
    return dmiVolumeItemsUrl(siteId, options);
  }

  parseDmiVolumeItems(textOrJson, options = {}) {
    return parseDmiVolumeItems(textOrJson, options);
  }

  dmiFramePlansFromItems(siteId, textOrJson, options = {}) {
    return dmiFramePlansFromItems(siteId, textOrJson, options);
  }

  dmiFramePlanFromItems(siteId, textOrJson, options = {}) {
    return dmiFramePlanFromItems(siteId, textOrJson, options);
  }

  s3StyleListingUrl(baseUrl, options = {}) {
    return s3StyleListingUrl(baseUrl, options);
  }

  parseS3StyleListing(textOrListing) {
    return parseS3StyleListing(textOrListing);
  }

  nexradArchiveDatePrefix(siteId, dateOrString = new Date()) {
    return nexradArchiveDatePrefix(siteId, dateOrString);
  }

  nexradArchiveListingUrl(siteId, dateOrString = new Date(), options = {}) {
    return nexradArchiveListingUrl(siteId, dateOrString, {
      ...options,
      baseUrl: options.baseUrl || this.archiveUrl,
    });
  }

  parseNexradArchiveListing(siteId, dateOrString, textOrListing, options = {}) {
    return parseNexradArchiveListing(siteId, dateOrString, textOrListing, {
      ...options,
      baseUrl: options.baseUrl || this.archiveUrl,
    });
  }

  archiveFrameWindow(frames, options = {}) {
    return archiveFrameWindow(frames, options);
  }

  spcConvectiveDate(when = new Date()) {
    return spcConvectiveDate(when);
  }

  spcReportTimeUtc(convectiveDate, hhmm) {
    return spcReportTimeUtc(convectiveDate, hhmm);
  }

  spcReportsUrls(convectiveDate, options = {}) {
    return spcReportsUrls(convectiveDate, options);
  }

  spcWcmTornadoYearUrl(year, options = {}) {
    return spcWcmTornadoYearUrl(year, options);
  }

  spcActualTornadoesUrl(endYear, options = {}) {
    return spcActualTornadoesUrl(endYear, options);
  }

  spcOutlookKinds() {
    return spcOutlookKinds();
  }

  spcOutlookLiveUrls(day = 1, kind = "cat", options = {}) {
    return spcOutlookLiveUrls(day, kind, options);
  }

  spcOutlookArchiveUrls(dateOrString, day = 1, kind = "cat", options = {}) {
    return spcOutlookArchiveUrls(dateOrString, day, kind, options);
  }

  spcOutlookUrls(day = 1, kind = "cat", options = {}) {
    return spcOutlookUrls(day, kind, options);
  }

  parseSpcOutlook(textOrJson, options = {}) {
    return parseSpcOutlook(textOrJson, options);
  }

  spcOutlookFeatureCollection(outlookOrFeatures, options = {}) {
    return spcOutlookFeatureCollection(outlookOrFeatures, options);
  }

  fetchSpcOutlook(day = 1, kind = "cat", options = {}) {
    return fetchSpcOutlook(day, kind, options);
  }

  fetchSpcOutlooks(kinds = ["cat"], options = {}) {
    return fetchSpcOutlooks(kinds, options);
  }

  parseSpcReports(kind, convectiveDate, text) {
    return parseSpcReports(kind, convectiveDate, text);
  }

  parseSpcReportsCombined(convectiveDate, text) {
    return parseSpcReportsCombined(convectiveDate, text);
  }

  spcReportMagnitudeLabel(reportOrKind, magnitude = undefined) {
    return spcReportMagnitudeLabel(reportOrKind, magnitude);
  }

  parseSpcTornadoSegments(convectiveDate, text) {
    return parseSpcTornadoSegments(convectiveDate, text);
  }

  tornadoSegmentsFromReports(reports) {
    return tornadoSegmentsFromReports(reports);
  }

  estimatedTornadoTrackEndTime(beginTime, lengthMi = 0, options = {}) {
    return estimatedTornadoTrackEndTime(beginTime, lengthMi, options);
  }

  selectEventRadarSites(begin, end = begin, options = {}) {
    return selectEventRadarSites(begin, end, options);
  }

  eventArchiveFrameWindow(frames, options = {}) {
    return eventArchiveFrameWindow(frames, options);
  }

  eventArchivePlanForTrack(segmentOrReport, options = {}) {
    return eventArchivePlanForTrack(segmentOrReport, options);
  }

  fetchSpcEventDay(convectiveDate, options = {}) {
    return fetchSpcEventDay(convectiveDate, options);
  }

  fmiDatePrefix(dateOrPrefix = new Date()) {
    return fmiDatePrefix(dateOrPrefix);
  }

  fmiCatalogListingUrl(options = {}) {
    return fmiCatalogListingUrl(options);
  }

  fmiRadarVolumeListingUrl(siteId, options = {}) {
    return fmiRadarVolumeListingUrl(siteId, options);
  }

  parseFmiVolumeListing(siteId, textOrListing, options = {}) {
    return parseFmiVolumeListing(siteId, textOrListing, options);
  }

  fmiFramePlansFromListing(siteId, textOrListing, options = {}) {
    return fmiFramePlansFromListing(siteId, textOrListing, options);
  }

  fmiFramePlanFromListing(siteId, textOrListing, options = {}) {
    return fmiFramePlanFromListing(siteId, textOrListing, options);
  }

  latestInternationalFramePlan(providerId, siteId, options = {}) {
    return latestInternationalFramePlan(providerId, siteId, options);
  }

  recentInternationalFramePlans(providerId, siteId, countOrOptions = 6, maybeOptions = {}) {
    return recentInternationalFramePlans(providerId, siteId, countOrOptions, maybeOptions);
  }

  internationalFrameFromPlan(planOrOptions, options = {}) {
    return internationalFrameFromPlan(planOrOptions, options);
  }

  latestInternationalFrame(providerId, siteId, options = {}) {
    return latestInternationalFrame(providerId, siteId, options);
  }

  recentInternationalFrames(providerId, siteId, countOrOptions = 6, maybeOptions = {}) {
    return recentInternationalFrames(providerId, siteId, countOrOptions, maybeOptions);
  }

  communityRadarFeeds(options = {}) {
    return communityRadarFeeds(options);
  }

  communityRadarFeed(feedOrId) {
    return communityRadarFeed(feedOrId);
  }

  communityRadarMarkers(options = {}) {
    return communityRadarMarkers(options);
  }

  normalizeCustomPollUrl(input) {
    return normalizeCustomPollUrl(input);
  }

  pollUrlsMatch(left, right) {
    return pollUrlsMatch(left, right);
  }

  pollUrlName(url) {
    return pollUrlName(url);
  }

  parseCustomPollMarkerInputs(latInput, lonInput) {
    return parseCustomPollMarkerInputs(latInput, lonInput);
  }

  customPollEntryLatLon(entry) {
    return customPollEntryLatLon(entry);
  }

  customPollEntryLabel(entry) {
    return customPollEntryLabel(entry);
  }

  customPollUrlForGisSite(basePollUrl, siteId, options = {}) {
    return customPollUrlForGisSite(basePollUrl, siteId, options);
  }

  parseCustomRadarGis(text) {
    return parseCustomRadarGis(text);
  }

  customPollLinksFromGis(text, basePollUrl, options = {}) {
    return customPollLinksFromGis(text, basePollUrl, options);
  }

  normalizeCustomPollLink(entry, options = {}) {
    return normalizeCustomPollLink(entry, options);
  }

  customPollLinkFeed(entry, options = {}) {
    return customPollLinkFeed(entry, options);
  }

  customPollLinksAsFeeds(entries = [], options = {}) {
    return customPollLinksAsFeeds(entries, options);
  }

  upsertCustomPollLink(entries = [], entry, options = {}) {
    return upsertCustomPollLink(entries, entry, options);
  }

  customPollMarkers(entries = [], options = {}) {
    return customPollMarkers(entries, options);
  }

  customPollLinksGeoJson(entries = [], options = {}) {
    return customPollLinksGeoJson(entries, options);
  }

  parseCommunityDirList(text, options = {}) {
    return parseCommunityDirList(text, options);
  }

  newestCommunityDirListEntry(textOrEntries, options = {}) {
    return newestCommunityDirListEntry(textOrEntries, options);
  }

  parseGrLevel2CfgSites(text) {
    return parseGrLevel2CfgSites(text);
  }

  fetchCommunityDirList(feedOrId, options = {}) {
    return fetchCommunityDirList(feedOrId, options);
  }

  communityFeedFrameFromEntry(feedOrId, entryOrName, options = {}) {
    return communityFeedFrameFromEntry(feedOrId, entryOrName, options);
  }

  latestCommunityFrame(feedOrId, options = {}) {
    return latestCommunityFrame(feedOrId, options);
  }

  recentCommunityFrames(feedOrId, countOrOptions = 6, maybeOptions = {}) {
    return recentCommunityFrames(feedOrId, countOrOptions, maybeOptions);
  }

  globalRadarSites(options = {}) {
    return globalRadarSites(options);
  }

  globalRadarSitesGeoJson(options = {}) {
    return globalRadarSitesGeoJson(options);
  }

  mapboxGlobalRadarSiteSource(options = {}) {
    return mapboxGlobalRadarSiteSource(options);
  }

  deckGlobalRadarSiteScatterplotLayerProps(options = {}) {
    return deckGlobalRadarSiteScatterplotLayerProps(options);
  }

  nearestRadarSite(lonLat, options = {}) {
    return nearestRadarSite(lonLat, options);
  }

  radarSiteSourceSummary(options = {}) {
    return radarSiteSourceSummary(options);
  }

  createSession(options = {}) {
    return createRadarSession(this, options);
  }

  cutChoices(metaOrLoop, options = {}) {
    const meta = metaOrLoop?.meta || metaOrLoop;
    return cutChoicesFromMetadata(meta, {
      selectedCut: options.selectedCut ?? metaOrLoop?.cut,
      ...options,
    });
  }

  loopTimeline(loop, options = {}) {
    return loopTimeline(loop, options);
  }

  textureLayer(renderedFrame, options = {}) {
    return radarTextureLayer(renderedFrame, options);
  }

  loopTextureLayers(loop, options = {}) {
    return loop.renderedFrames.map((frame, index) =>
      radarTextureLayer(frame, {
        ...loop.renderOptions,
        ...options,
        site: options.site || loop.siteDescriptor || loop.internationalSite || loop.communityFeed || loop.site,
        product: options.product || loop.product,
        cut: options.cut ?? loop.cut,
        frameIndex: index,
        frameCount: loop.renderedFrames.length,
      })
    );
  }

  compositeLayers(radarLayers, options = {}) {
    return compositeRadarLayers(radarLayers, options);
  }

  compositeLoopSlot(multiLoop, index = undefined, options = {}) {
    return compositeSynchronizedRadarLoopSlot(multiLoop, index, options);
  }

  crossSectionPanel(renderedSection, options = {}) {
    return radarCrossSectionPanel(renderedSection, options);
  }

  loopCrossSectionPanels(crossSectionLoop, options = {}) {
    return crossSectionLoop.sections.map((section, index) =>
      radarCrossSectionPanel(section, {
        ...crossSectionLoop.renderOptions,
        ...options,
        site: options.site || crossSectionLoop.site,
        product: options.product || crossSectionLoop.product,
        frameIndex: index,
        frameCount: crossSectionLoop.sections.length,
      })
    );
  }

  analysisOverlay(analysis, options = {}) {
    return radarAnalysisOverlay(analysis, options);
  }

  loopAnalysisOverlays(analysisLoop, options = {}) {
    return analysisLoop.analyses.map((analysis, index) =>
      radarAnalysisOverlay(analysis, {
        ...analysisLoop.analysisOptions,
        ...options,
        site: options.site || analysisLoop.site,
        frameIndex: index,
        frameCount: analysisLoop.analyses.length,
      })
    );
  }

  torTracksLayer(renderedTracks, options = {}) {
    return radarTorTracksLayer(renderedTracks, options);
  }

  loopTorTracksLayers(torTracksLoop, options = {}) {
    return torTracksLoop.tracks.map((track, index) =>
      radarTorTracksLayer(track, {
        ...torTracksLoop.renderOptions,
        ...options,
        site: options.site || torTracksLoop.site,
        frameIndex: index,
        frameCount: torTracksLoop.tracks.length,
      })
    );
  }

  mapboxCoordinates(radarLayer) {
    return mapboxRadarCoordinates(radarLayer);
  }

  mapboxImageSource(radarLayer, options = {}) {
    return mapboxRadarImageSource(radarLayer, options);
  }

  mapboxCanvasSource(radarLayer, canvas, options = {}) {
    return mapboxRadarCanvasSource(radarLayer, canvas, options);
  }

  mapboxRasterLayer(radarLayer, options = {}) {
    return mapboxRadarRasterLayer(radarLayer, options);
  }

  mapboxLayerSpecs(radarLayer, options = {}) {
    return mapboxRadarLayerSpecs(radarLayer, options);
  }

  mapboxSiteSource(options = {}) {
    return mapboxRadarSiteSource(options);
  }

  mapboxSiteLayer(options = {}) {
    return mapboxRadarSiteLayer(options);
  }

  deckBitmapLayerProps(radarLayer, options = {}) {
    return deckRadarBitmapLayerProps(radarLayer, options);
  }

  deckSiteScatterplotLayerProps(options = {}) {
    return deckRadarSiteScatterplotLayerProps(options);
  }

  webGpuTextureUpload(radarLayer, options = {}) {
    return webGpuRadarTextureUpload(radarLayer, options);
  }

  webMercatorToLonLat(x, y) {
    return webMercatorToLonLat(x, y);
  }

  lonLatToWorldPixel(lon, lat, options = {}) {
    return lonLatToWorldPixel(lon, lat, options);
  }

  worldPixelToLonLat(x, y, options = {}) {
    return worldPixelToLonLat(x, y, options);
  }

  mapView(options = {}) {
    return normalizeMapView(options);
  }

  fitMapViewToBounds(bounds, options = {}) {
    return fitMapViewToBounds(bounds, options);
  }

  fitMapViewToLayer(radarLayer, options = {}) {
    return fitMapViewToLayer(radarLayer, options);
  }

  panMapView(view, delta = {}, options = {}) {
    return panMapView(view, delta, options);
  }

  zoomMapView(view, zoomDelta = 0, options = {}) {
    return zoomMapView(view, zoomDelta, options);
  }

  mapTileCover(view, options = {}) {
    return mapTileCover(view, options);
  }

  radarLayerQuadMesh(radarLayer, mapView = undefined, options = {}) {
    return radarLayerQuadMesh(radarLayer, mapView, options);
  }

  synchronizeLoops(loops, options = {}) {
    return synchronizeRadarLoops(loops, options);
  }

  async loadMultiSiteLoop(sitesOrOptions = {}, options = {}) {
    if (!Array.isArray(sitesOrOptions) && typeof sitesOrOptions === "object" && sitesOrOptions.sites) {
      options = sitesOrOptions;
      sitesOrOptions = sitesOrOptions.sites;
    }
    const sites = normalizeSiteList(sitesOrOptions);
    if (!sites.length) throw new Error("loadMultiSiteLoop requires at least one site");
    const concurrency = clampInt(options.concurrency ?? Math.min(3, sites.length), 1, 8);
    const results = await mapLimit(sites, concurrency, async (site) => {
      try {
        return { site, loop: await this.loadLoop({ ...options, site }) };
      } catch (error) {
        return { site, error };
      }
    });
    const loops = results.filter((result) => result.loop).map((result) => result.loop);
    const failures = results
      .filter((result) => result.error)
      .map((result) => ({ site: result.site, error: String(result.error?.message || result.error) }));
    if (!loops.length) throw new Error(`all multi-site loop loads failed: ${failures.map((failure) => `${failure.site} ${failure.error}`).join("; ")}`);
    return makeSynchronizedLoops(loops, { ...options, failures });
  }

  async rerenderMultiSiteLoop(multiLoop, options = {}) {
    const loops = multiLoop?.loops || [];
    if (!loops.length) throw new Error("rerenderMultiSiteLoop requires a synchronized loop");
    const concurrency = clampInt(options.concurrency ?? Math.min(3, loops.length), 1, 8);
    const results = await mapLimit(loops, concurrency, async (loop) => {
      try {
        return { site: loop.site, loop: await this.rerenderLoop(loop, options) };
      } catch (error) {
        return { site: loop.site, error };
      }
    });
    const nextLoops = results.map((result, index) => result.loop || loops[index]);
    const failures = results
      .filter((result) => result.error)
      .map((result) => ({ site: result.site, error: String(result.error?.message || result.error) }));
    return makeSynchronizedLoops(nextLoops, {
      ...multiLoop.syncOptions,
      ...options,
      failures,
    });
  }

  async pollMultiSiteLive(multiLoop, options = {}) {
    const loops = multiLoop?.loops || [];
    if (!loops.length) throw new Error("pollMultiSiteLive requires a synchronized loop");
    const concurrency = clampInt(options.concurrency ?? Math.min(3, loops.length), 1, 8);
    const results = await mapLimit(loops, concurrency, async (loop) => {
      try {
        return { site: loop.site, result: await this.pollLive(loop, options) };
      } catch (error) {
        return { site: loop.site, error };
      }
    });
    const nextLoops = results.map((entry, index) => entry.result?.loop || loops[index]);
    const updates = results
      .filter((entry) => entry.result?.status === "updated")
      .map((entry) => ({ site: entry.site, frame: entry.result.frame }));
    const failures = results
      .filter((entry) => entry.error)
      .map((entry) => ({ site: entry.site, error: String(entry.error?.message || entry.error) }));
    return {
      status: updates.length ? "updated" : "idle",
      updates,
      failures,
      multiLoop: makeSynchronizedLoops(nextLoops, {
        ...multiLoop.syncOptions,
        ...options,
        failures,
      }),
    };
  }

  async sniffBytes(bytes) {
    const normalized = normalizeByteInput(bytes);
    if (isZipBytes(normalized)) {
      return { format: "mobile-archive-zip", size: normalized.byteLength };
    }
    return this.worker.sniffBytes(bytes);
  }

  async importBytesFrame(bytes, options = {}) {
    const response = await this.worker.importBytes(bytes, {
      id: options.id,
      fileName: options.fileName || options.name,
      source: options.source || "local-bytes",
      cacheKey: options.cacheKey,
      provider: options.provider || "browser-import",
    });
    return {
      frame: response.frame,
      summary: response.summary,
      elapsedMs: response.elapsedMs,
      cacheHit: Boolean(response.cacheHit),
    };
  }

  async importFileFrame(file, options = {}) {
    if (!file || typeof file.arrayBuffer !== "function") throw new Error("importFileFrame requires a File or Blob");
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (options.archive === true || isZipBytes(bytes)) {
      return this.importMobileArchiveFrame(bytes, {
        ...options,
        id: options.id || file.name,
        fileName: options.fileName || file.name,
      });
    }
    return this.importBytesFrame(bytes, {
      ...options,
      id: options.id || file.name,
      fileName: options.fileName || file.name,
      source: options.source || "local-file",
    });
  }

  async importMobileArchiveFrame(fileOrBytes, options = {}) {
    const fileName = options.fileName || options.name || fileOrBytes?.name || "mobile-radar-archive.zip";
    const bytes = typeof fileOrBytes?.arrayBuffer === "function"
      ? new Uint8Array(await fileOrBytes.arrayBuffer())
      : normalizeByteInput(fileOrBytes);
    if (!isZipBytes(bytes)) throw new Error("importMobileArchiveFrame requires a ZIP archive");
    const entries = await extractMobileArchiveEntries(bytes, options);
    if (!entries.length) throw new Error(`mobile archive '${fileName}' contains no radar-looking entries`);
    const maxParts = clampInt(options.maxParts ?? 200, 1, 2000);
    const parts = entries.slice(0, maxParts);
    const response = await this.worker.importByteParts(parts.map((entry) => entry.bytes), {
      id: options.id || fileName,
      fileName,
      source: options.source || "mobile-archive",
      cacheKey: options.cacheKey,
      provider: options.provider || "browser-import",
      format: "mobile-archive-zip",
      entries: parts.map((entry) => ({
        name: entry.name,
        fileName: entry.fileName,
        compressedSize: entry.compressedSize,
        uncompressedSize: entry.uncompressedSize,
        compressionMethod: entry.compressionMethod,
        lastModified: entry.lastModified,
      })),
    });
    return {
      frame: response.frame,
      summary: response.summary,
      entries: response.entries || parts.map((entry) => ({
        name: entry.name,
        fileName: entry.fileName,
        compressedSize: entry.compressedSize,
        uncompressedSize: entry.uncompressedSize,
        compressionMethod: entry.compressionMethod,
        lastModified: entry.lastModified,
      })),
      elapsedMs: response.elapsedMs,
      cacheHit: Boolean(response.cacheHit),
    };
  }

  async importFiles(files, options = {}) {
    const items = Array.from(files || []);
    return Promise.all(items.map((file, index) =>
      this.importFileFrame(file, { ...options, id: options.id || file.name || `file-${index + 1}` })
    ));
  }

  frameFromUrl(url, options = {}) {
    const value = String(url || "").trim();
    if (!value) throw new Error("frameFromUrl requires a URL");
    const id = options.id || value.split(/[/?#]/).filter(Boolean).pop() || "custom-radar-url";
    return {
      id,
      cacheKey: options.cacheKey || `custom-url:${hashString(value)}`,
      source: options.source || "custom-url",
      provider: options.provider || "custom-url",
      format: options.format || null,
      size: options.size,
      url: value,
      volumeTime: options.volumeTime || null,
      site: options.site ? normalizeSite(options.site) : undefined,
    };
  }

  async archiveFramesForDate(siteId, dateOrString = new Date(), options = {}) {
    const site = normalizeSite(siteId);
    const date = normalizeArchiveDate(dateOrString);
    if (options.listing || options.keys || options.contents || options.objects) {
      return parseNexradArchiveListing(site, date.iso, options.listing || options, {
        ...options,
        baseUrl: options.baseUrl || this.archiveUrl,
      });
    }

    const maxPages = clampInt(options.maxPages ?? 20, 1, 100);
    const maxKeys = clampInt(options.maxKeys ?? options.maxKeysPerPage ?? 1000, 1, 1000);
    const prefix = options.prefix || nexradArchiveDatePrefix(site, date.iso);
    const out = [];
    const seen = new Set();
    let continuationToken = options.continuationToken || null;
    let startAfter = options.startAfter || null;

    for (let page = 0; page < maxPages; page += 1) {
      const params = {
        "list-type": "2",
        prefix,
        "max-keys": String(maxKeys),
      };
      if (continuationToken) params["continuation-token"] = continuationToken;
      else if (startAfter) params["start-after"] = startAfter;

      const listing = await listS3(options.baseUrl || this.archiveUrl, params, options);
      const frames = parseNexradArchiveListing(site, date.iso, listing, {
        ...options,
        baseUrl: options.baseUrl || this.archiveUrl,
        prefix,
      });
      for (const frame of frames) {
        const key = frame.cacheKey || frame.key || frame.id;
        if (!key || seen.has(key)) continue;
        seen.add(key);
        out.push(frame);
      }

      if (!listing.isTruncated || !listing.nextContinuationToken) break;
      continuationToken = listing.nextContinuationToken;
      startAfter = null;
    }

    return out.sort((left, right) => {
      const byKey = String(left.key || left.id || "").localeCompare(String(right.key || right.id || ""));
      return byKey || frameMillis(left) - frameMillis(right);
    });
  }

  async archiveLoopFramesForDate(siteId, dateOrString = new Date(), options = {}) {
    const frames = await this.archiveFramesForDate(siteId, dateOrString, options);
    return archiveFrameWindow(frames, {
      ...options,
      site: normalizeSite(siteId),
      date: dateOrString,
    });
  }

  async loadImportedLoop(importedFrames, options = {}) {
    const frames = Array.from(importedFrames || [])
      .map((entry) => entry?.frame || entry)
      .filter(Boolean);
    if (!frames.length) throw new Error("loadImportedLoop requires at least one imported frame");
    const product = normalizeProduct(options.product);
    const metaFrame = frames[frames.length - 1];
    const meta = await this.frameMetadata(metaFrame, product);
    const cut = resolveCut(meta, options.cut);
    const siteDescriptor = siteDescriptorFromInput(options.site)
      || siteDescriptorFromMeta(meta)
      || siteDescriptorFromFrame(metaFrame);
    const site = siteDescriptor?.id || String(options.site || meta.site || metaFrame.site || "IMPORTED").toUpperCase();
    const renderedFrames = await this.renderFrames(frames, { ...options, product, cut });
    const loop = makeLoop({
      site,
      mode: options.mode || "imported",
      product,
      cut,
      frames,
      renderedFrames,
      meta,
      renderOptions: cleanRenderOptions({ ...options, product, cut }),
    });
    if (siteDescriptor) loop.siteDescriptor = cloneCatalogRecord(siteDescriptor);
    return loop;
  }

  async loadArchiveLoop(siteId, dateOrString = new Date(), options = {}) {
    const site = normalizeSite(siteId);
    const archiveWindow = await this.archiveLoopFramesForDate(site, dateOrString, options);
    if (!archiveWindow.frames.length) throw new Error(`no archive frames for ${site} on ${archiveWindow.date || dateOrString}`);
    const loop = await this.loadImportedLoop(archiveWindow.frames, {
      ...options,
      site,
      mode: options.mode || "archive",
    });
    loop.archiveWindow = archiveWindow;
    loop.source = "archive";
    return loop;
  }

  async loadCommunityLoop(feedOrId, options = {}) {
    const frameCount = clampInt(options.frameCount ?? options.count ?? 6, 1, 200);
    const frames = await recentCommunityFrames(feedOrId, frameCount, options);
    if (!frames.length) throw new Error("loadCommunityLoop requires at least one planned frame");
    const loop = await this.loadImportedLoop(frames, {
      ...options,
      mode: options.mode || "community",
    });
    loop.communityFeed = cloneCatalogRecord(frames[frames.length - 1].feed);
    loop.siteDescriptor = siteDescriptorFromFrame(frames[frames.length - 1]) || loop.siteDescriptor;
    loop.source = "community";
    return loop;
  }

  async loadInternationalLoop(providerId, siteId, options = {}) {
    const frameCount = clampInt(options.frameCount ?? options.count ?? 6, 1, 200);
    const frames = await recentInternationalFrames(providerId, siteId, frameCount, options);
    if (!frames.length) throw new Error("loadInternationalLoop requires at least one planned frame");
    const siteDescriptor = siteDescriptorFromFrame(frames[frames.length - 1]);
    const loop = await this.loadImportedLoop(frames, {
      ...options,
      site: options.site || siteDescriptor,
      mode: options.mode || "international",
    });
    loop.internationalProviderId = normalizeInternationalProviderId(providerId);
    loop.internationalSite = cloneCatalogRecord(frames[frames.length - 1].internationalSite);
    loop.siteDescriptor = siteDescriptor || loop.siteDescriptor;
    loop.source = "international";
    return loop;
  }

  async loadLoop(options = {}) {
    const site = normalizeSite(options.site);
    const product = normalizeProduct(options.product);
    const frameCount = clampInt(options.frameCount ?? 6, 1, 20);
    const mode = options.mode || "live";
    options.onProgress?.({ stage: "list", site, mode });

    const frames = mode === "recent"
      ? await this.recentArchiveFrames(site, frameCount, options)
      : await this.livePlusArchiveFrames(site, frameCount, options);
    if (!frames.length) throw new Error(`no frames for ${site}`);

    const metaFrame = frames[frames.length - 1];
    const meta = await this.frameMetadata(metaFrame, product);
    const cut = resolveCut(meta, options.cut);
    options.onProgress?.({ stage: "render", site, product, cut, frames: frames.length });

    const renderedFrames = await this.renderFrames(frames, { ...options, product, cut });
    return makeLoop({
      site,
      mode,
      product,
      cut,
      frames,
      renderedFrames,
      meta,
      renderOptions: cleanRenderOptions({ ...options, product, cut }),
    });
  }

  async rerenderLoop(loop, options = {}) {
    const product = normalizeProduct(options.product || loop.product);
    const metaFrame = loop.frames[loop.frames.length - 1];
    const meta = await this.frameMetadata(metaFrame, product);
    const cut = resolveCut(meta, options.cut ?? loop.cut);
    const renderedFrames = await this.renderFrames(loop.frames, { ...loop.renderOptions, ...options, product, cut });
    return makeLoop({
      site: loop.site,
      mode: loop.mode,
      product,
      cut,
      frames: loop.frames,
      renderedFrames,
      meta,
      renderOptions: cleanRenderOptions({ ...loop.renderOptions, ...options, product, cut }),
    });
  }

  async pollLive(loop, options = {}) {
    const site = normalizeSite(options.site || loop.site);
    const latest = await this.latestRealtimeFrame(site);
    const existingIndex = loop.frames.findIndex((frame) => frame.cacheKey === latest.cacheKey);
    if (existingIndex >= 0) return { status: "idle", frame: latest, loop };

    const product = normalizeProduct(options.product || loop.product);
    const meta = await this.frameMetadata(latest, product);
    const cut = resolveCut(meta, options.cut ?? loop.cut);
    const rendered = await this.renderFrame(latest, { ...loop.renderOptions, ...options, product, cut });
    const frames = loop.frames.filter((frame) => frame.id !== latest.id).concat(latest).slice(-(options.frameCount || loop.frames.length || 6));
    const byKey = new Map(loop.renderedFrames.map((frame) => [frame.frame.cacheKey, frame]));
    byKey.set(latest.cacheKey, rendered);
    const renderedFrames = frames.map((frame) => byKey.get(frame.cacheKey)).filter(Boolean);
    return {
      status: "updated",
      frame: latest,
      loop: makeLoop({
        site,
        mode: loop.mode,
        product,
        cut,
        frames,
        renderedFrames,
        meta,
        renderOptions: cleanRenderOptions({ ...loop.renderOptions, ...options, product, cut }),
      }),
    };
  }

  async pollCommunityLive(loop, options = {}) {
    const lastFrame = loop?.frames?.[loop.frames.length - 1] || {};
    const feedRef = options.feed || options.feedId || loop?.communityFeed || lastFrame.feed || lastFrame.feedId;
    if (!feedRef) throw new Error("pollCommunityLive requires a community feed or a loop loaded by loadCommunityLoop");
    const latest = await latestCommunityFrame(feedRef, options);
    const existingIndex = loop.frames.findIndex((frame) => frame.cacheKey === latest.cacheKey || frame.identity === latest.identity);
    if (existingIndex >= 0) return { status: "idle", frame: latest, loop };

    const product = normalizeProduct(options.product || loop.product);
    const meta = await this.frameMetadata(latest, product);
    const cut = resolveCut(meta, options.cut ?? loop.cut);
    const rendered = await this.renderFrame(latest, { ...loop.renderOptions, ...options, product, cut });
    const keep = clampInt(options.frameCount ?? loop.frames.length ?? 6, 1, 200);
    const frames = loop.frames
      .filter((frame) => frame.cacheKey !== latest.cacheKey && frame.identity !== latest.identity)
      .concat(latest)
      .slice(-keep);
    const byKey = new Map(loop.renderedFrames.map((frame) => [frame.frame.cacheKey, frame]));
    byKey.set(latest.cacheKey, rendered);
    const renderedFrames = frames.map((frame) => byKey.get(frame.cacheKey)).filter(Boolean);
    const updatedLoop = makeLoop({
      site: loop.site,
      mode: loop.mode || "community",
      product,
      cut,
      frames,
      renderedFrames,
      meta,
      renderOptions: cleanRenderOptions({ ...loop.renderOptions, ...options, product, cut }),
    });
    updatedLoop.communityFeed = cloneCatalogRecord(latest.feed || loop.communityFeed);
    updatedLoop.source = "community";
    return {
      status: "updated",
      frame: latest,
      loop: updatedLoop,
    };
  }

  async pollInternationalLive(loop, options = {}) {
    const lastFrame = loop?.frames?.[loop.frames.length - 1] || {};
    const providerId = normalizeInternationalProviderId(options.providerId || options.provider || loop?.internationalProviderId || lastFrame.internationalProviderId || lastFrame.provider);
    const siteId = options.siteId || options.internationalSiteId || loop?.internationalSite?.id || lastFrame.internationalSiteId || lastFrame.site;
    if (!providerId || !siteId) throw new Error("pollInternationalLive requires an international provider and site");
    const latest = await latestInternationalFrame(providerId, siteId, options);
    const existingIndex = loop.frames.findIndex((frame) => frame.cacheKey === latest.cacheKey || frame.identity === latest.identity);
    if (existingIndex >= 0) return { status: "idle", frame: latest, loop };

    const product = normalizeProduct(options.product || loop.product);
    const meta = await this.frameMetadata(latest, product);
    const cut = resolveCut(meta, options.cut ?? loop.cut);
    const rendered = await this.renderFrame(latest, { ...loop.renderOptions, ...options, product, cut });
    const keep = clampInt(options.frameCount ?? loop.frames.length ?? 6, 1, 200);
    const frames = loop.frames
      .filter((frame) => frame.cacheKey !== latest.cacheKey && frame.identity !== latest.identity)
      .concat(latest)
      .slice(-keep);
    const byKey = new Map(loop.renderedFrames.map((frame) => [frame.frame.cacheKey, frame]));
    byKey.set(latest.cacheKey, rendered);
    const renderedFrames = frames.map((frame) => byKey.get(frame.cacheKey)).filter(Boolean);
    const updatedLoop = makeLoop({
      site: loop.site,
      mode: loop.mode || "international",
      product,
      cut,
      frames,
      renderedFrames,
      meta,
      renderOptions: cleanRenderOptions({ ...loop.renderOptions, ...options, product, cut }),
    });
    updatedLoop.internationalProviderId = providerId;
    updatedLoop.internationalSite = cloneCatalogRecord(latest.internationalSite || loop.internationalSite);
    updatedLoop.siteDescriptor = siteDescriptorFromFrame(latest) || loop.siteDescriptor;
    updatedLoop.source = "international";
    return {
      status: "updated",
      frame: latest,
      loop: updatedLoop,
    };
  }

  async livePlusArchiveFrames(siteId, count = 6, options = {}) {
    const site = normalizeSite(siteId);
    const frames = [];
    const live = await this.latestRealtimeFrame(site).catch(() => null);
    if (live) frames.push(live);
    const archive = await this.recentArchiveFrames(site, Math.max(1, count), options);
    for (const frame of archive) {
      if (!frames.some((item) => item.cacheKey === frame.cacheKey || item.id === frame.id)) frames.push(frame);
    }
    return frames
      .sort((left, right) => frameMillis(left) - frameMillis(right))
      .slice(-count);
  }

  async recentArchiveFrames(siteId, count = 6, options = {}) {
    const site = normalizeSite(siteId);
    const daysBack = clampInt(options.daysBack ?? 3, 1, 14);
    const out = [];
    const now = options.now ? new Date(options.now) : new Date();
    for (let day = 0; day < daysBack && out.length < count; day += 1) {
      const date = new Date(now.getTime() - day * 86400_000);
      const frames = await this.archiveFramesForDate(site, date, options);
      out.push(...frames.reverse());
    }
    return out.slice(0, count).reverse();
  }

  async latestRealtimeFrame(siteId) {
    const site = normalizeSite(siteId);
    const active = await listS3(this.chunksUrl, { "list-type": "2", prefix: `${site}/`, delimiter: "/" });
    const ids = active.prefixes
      .map((prefix) => realtimeVolumeIdFromPrefix(site, prefix))
      .filter((id) => id !== null);
    const candidates = realtimeCandidates(ids);
    let best = null;
    for (const id of candidates) {
      const volume = await this.realtimeVolume(site, id).catch(() => null);
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
      urls: best.chunks.map((chunk) => `${this.chunksUrl}/${chunk.key}`),
      volumeTime: best.volumeTime,
    };
  }

  async realtimeVolume(siteId, volumeId) {
    const site = normalizeSite(siteId);
    const listing = await listS3(this.chunksUrl, {
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
      complete: chunks[chunks.length - 1]?.type === "E",
      totalSize: chunks.reduce((sum, chunk) => sum + chunk.size, 0),
      dateTime: `${chunks[0].date}-${chunks[0].time}`,
      volumeTime: `${chunks[0].date.slice(0, 4)}-${chunks[0].date.slice(4, 6)}-${chunks[0].date.slice(6, 8)}T${chunks[0].time.slice(0, 2)}:${chunks[0].time.slice(2, 4)}:${chunks[0].time.slice(4, 6)}Z`,
    };
  }

  async frameMetadata(frame, product = "REF") {
    const response = await this.worker.meta(frame, normalizeProduct(product));
    return response.meta;
  }

  async volumeDiagnostics(frame, options = {}) {
    const result = await this.worker.diagnostics(frame, options);
    return {
      ...result.diagnostics,
      frame,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
    };
  }

  async volumeDiagnosticsLoop(loop, options = {}) {
    const frames = Array.from(loop?.frames || []);
    if (!frames.length) throw new Error("volumeDiagnosticsLoop requires a radar loop");
    const concurrency = clampInt(options.concurrency ?? 4, 1, 8);
    const diagnostics = await mapLimit(frames, concurrency, async (frame) =>
      this.volumeDiagnostics(frame, options).catch((error) => ({ frame, error }))
    );
    const failures = diagnostics.filter((item) => item.error);
    if (failures.length === diagnostics.length) throw failures[0].error;
    return {
      type: "bowecho-volume-diagnostics-loop-v1",
      site: loop.site,
      mode: loop.mode,
      sourceLoop: loop,
      frames,
      diagnostics: diagnostics.filter((item) => !item.error),
      failures: failures.map((item) => ({
        frame: item.frame,
        error: String(item.error?.message || item.error),
      })),
      elapsedMs: diagnostics
        .filter((item) => !item.error)
        .reduce((sum, item) => sum + Number(item.elapsedMs || 0), 0),
      cacheHit: diagnostics.filter((item) => !item.error).every((item) => item.cacheHit),
    };
  }

  async renderFrames(frames, options = {}) {
    const rendered = await Promise.all(frames.map((frame) =>
      this.renderFrame(frame, options).catch((error) => ({ frame, error }))
    ));
    const failures = rendered.filter((item) => item.error);
    if (failures.length === rendered.length) throw failures[0].error;
    return rendered.filter((item) => !item.error);
  }

  async renderFrame(frame, options = {}) {
    const product = normalizeProduct(options.product);
    const width = clampInt(options.width ?? options.pixelSize ?? 512, 1, 4096);
    const height = clampInt(options.height ?? options.pixelSize ?? width, 1, 4096);
    const paletteRender = paletteRenderOptions(options, product);
    const result = await this.worker.render(frame, {
      product,
      cut: clampInt(options.cut ?? 0, 0, 99),
      width,
      height,
      rangeKm: Number(options.rangeKm ?? 230),
      smoothing: options.smoothing || "native",
      stormDirDeg: Number(options.stormDirDeg ?? 240),
      stormSpeedKt: Number(options.stormSpeedKt ?? 35),
      ...paletteRender,
    });
    const rgba = new Uint8ClampedArray(result.rgba);
    const renderOptions = cleanRenderOptions({ ...options, product, width, height, ...paletteRender });
    return {
      frame,
      meta: result.meta,
      rgba,
      width: result.width,
      height: result.height,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
      renderOptions,
      imageData: typeof ImageData === "function" ? new ImageData(rgba, result.width, result.height) : null,
    };
  }

  async renderCrossSection(frame, options = {}) {
    const site = resolveSiteDescriptor(options.site || options.siteId || options.radarSite || frame.site || frame.meta?.site || "KTLX");
    const renderOptions = cleanCrossSectionOptions(options, site);
    const paletteRender = paletteRenderOptions(options, renderOptions.product);
    const result = await this.worker.crossSection(frame, {
      product: renderOptions.product,
      startEastKm: renderOptions.start.eastKm,
      startNorthKm: renderOptions.start.northKm,
      endEastKm: renderOptions.end.eastKm,
      endNorthKm: renderOptions.end.northKm,
      width: renderOptions.width,
      height: renderOptions.height,
      topKm: renderOptions.topKm,
      ...paletteRender,
    });
    const rgba = new Uint8ClampedArray(result.rgba);
    return {
      frame,
      meta: result.meta,
      rgba,
      width: result.width,
      height: result.height,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
      renderOptions: cleanCrossSectionOptions({ ...renderOptions, ...paletteRender }, site),
      imageData: typeof ImageData === "function" ? new ImageData(rgba, result.width, result.height) : null,
    };
  }

  async renderCrossSections(frames, options = {}) {
    const rendered = await Promise.all(frames.map((frame) =>
      this.renderCrossSection(frame, options).catch((error) => ({ frame, error }))
    ));
    const failures = rendered.filter((item) => item.error);
    if (failures.length === rendered.length) throw failures[0].error;
    return rendered.filter((item) => !item.error);
  }

  async renderCrossSectionLoop(loop, options = {}) {
    const site = resolveSiteDescriptor(options.site || loop.site);
    const renderOptions = cleanCrossSectionOptions({
      ...loop.renderOptions,
      product: options.product || loop.product,
      ...options,
      site,
    }, site);
    const sections = await this.renderCrossSections(loop.frames, renderOptions);
    return makeCrossSectionLoop({
      site: site.id,
      mode: loop.mode,
      product: renderOptions.product,
      sourceLoop: loop,
      frames: loop.frames,
      sections,
      renderOptions,
    });
  }

  async renderNativeRhi(frame, options = {}) {
    const product = normalizeProduct(options.product);
    const paletteRender = paletteRenderOptions(options, product);
    let cut = options.cut;
    if (cut === undefined || cut === null) {
      const diagnostics = await this.volumeDiagnostics(frame, options);
      const wantedMoment = nativeRhiMomentForProduct(product);
      const rhiCut = diagnostics.cuts.find((item) =>
        item.isRhiLike && item.moments.some((moment) => moment.moment === wantedMoment)
      ) || diagnostics.cuts.find((item) => item.isRhiLike) || diagnostics.cuts[0];
      cut = rhiCut?.index ?? 0;
    }
    const result = await this.worker.nativeRhi(frame, {
      product,
      cut: clampInt(cut, 0, 99),
      width: options.width === undefined ? 0 : clampInt(options.width, 0, 8192),
      height: options.height === undefined ? 0 : clampInt(options.height, 0, 8192),
      topKm: Number(options.topKm ?? options.heightKm ?? 0),
      maxRangeKm: Number(options.maxRangeKm ?? options.rangeKm ?? 0),
      allowDownscale: Boolean(options.allowDownscale),
      requireRhi: options.requireRhi !== false,
      ...paletteRender,
    });
    const rgba = new Uint8ClampedArray(result.rgba);
    const renderOptions = {
      product,
      cut: result.meta.cutIndex ?? clampInt(cut, 0, 99),
      width: result.width,
      height: result.height,
      topKm: result.meta.topKm,
      maxRangeKm: result.meta.maxRangeKm,
      allowDownscale: Boolean(options.allowDownscale),
      requireRhi: options.requireRhi !== false,
      ...paletteRender,
    };
    return {
      frame,
      meta: result.meta,
      rgba,
      width: result.width,
      height: result.height,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
      renderOptions,
      imageData: typeof ImageData === "function" ? new ImageData(rgba, result.width, result.height) : null,
    };
  }

  async renderNativePpi(frame, options = {}) {
    const product = normalizeProduct(options.product);
    const paletteRender = paletteRenderOptions(options, product);
    let cut = options.cut;
    if (cut === undefined || cut === null) {
      const diagnostics = await this.volumeDiagnostics(frame, options);
      const wantedMoment = nativeRhiMomentForProduct(product);
      const ppiCut = diagnostics.cuts.find((item) =>
        item.isPpiLike && item.moments.some((moment) => moment.moment === wantedMoment)
      ) || diagnostics.cuts.find((item) => item.isPpiLike) || diagnostics.cuts[0];
      cut = ppiCut?.index ?? 0;
    }
    const result = await this.worker.nativePpi(frame, {
      product,
      cut: clampInt(cut, 0, 99),
      ...paletteRender,
    });
    const rgba = new Uint8ClampedArray(result.rgba);
    const azimuths = new Float32Array(result.azimuths);
    const renderOptions = {
      product,
      cut: result.meta.cutIndex ?? clampInt(cut, 0, 99),
      width: result.width,
      height: result.height,
      rangeKm: Number(options.rangeKm ?? result.rangeKm ?? result.meta.rangeKm ?? 0),
      ...paletteRender,
    };
    return {
      frame,
      meta: result.meta,
      rgba,
      azimuths,
      width: result.width,
      height: result.height,
      rangeKm: result.rangeKm,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
      renderOptions,
      imageData: typeof ImageData === "function" ? new ImageData(rgba, result.width, result.height) : null,
    };
  }

  async renderNativeRhiFrames(frames, options = {}) {
    const rendered = await Promise.all(frames.map((frame) =>
      this.renderNativeRhi(frame, options).catch((error) => ({ frame, error }))
    ));
    const failures = rendered.filter((item) => item.error);
    if (failures.length === rendered.length) throw failures[0].error;
    return rendered.filter((item) => !item.error);
  }

  async renderNativeRhiLoop(loop, options = {}) {
    const product = normalizeProduct(options.product || loop.product);
    const panels = await this.renderNativeRhiFrames(loop.frames, {
      ...options,
      product,
    });
    return makeNativeRhiLoop({
      site: loop.site,
      mode: loop.mode,
      product,
      sourceLoop: loop,
      frames: loop.frames,
      panels,
      renderOptions: panels[0]?.renderOptions || { product },
    });
  }

  async renderTorTracksFrame(frame, options = {}) {
    const site = resolveSiteDescriptor(options.site || options.siteId || options.radarSite || frame.site || frame.meta?.site || "KTLX");
    const renderOptions = cleanTorTracksOptions(options, site);
    const result = await this.worker.torTracksFrame(frame, renderOptions);
    const rgba = new Uint8ClampedArray(result.rgba);
    const values = new Float32Array(result.values);
    return {
      frame,
      meta: result.meta,
      rgba,
      values,
      width: result.width,
      height: result.height,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
      renderOptions,
      imageData: typeof ImageData === "function" ? new ImageData(rgba, result.width, result.height) : null,
    };
  }

  async renderTorTracksFrames(frames, options = {}) {
    const rendered = await Promise.all(frames.map((frame) =>
      this.renderTorTracksFrame(frame, options).catch((error) => ({ frame, error }))
    ));
    const failures = rendered.filter((item) => item.error);
    if (failures.length === rendered.length) throw failures[0].error;
    return rendered.filter((item) => !item.error);
  }

  async renderTorTracksLoop(loop, options = {}) {
    const site = resolveSiteDescriptor(options.site || loop.site);
    const renderOptions = cleanTorTracksOptions({ ...options, site }, site);
    const result = await this.worker.torTracksLoop(loop.frames, renderOptions);
    const tracks = (result.tracks || []).map((track) => {
      const rgba = new Uint8ClampedArray(track.rgba);
      const values = new Float32Array(track.values);
      return {
        frame: track.frame,
        meta: track.meta,
        rgba,
        values,
        width: track.width,
        height: track.height,
        elapsedMs: track.elapsedMs,
        cacheHit: Boolean(track.cacheHit),
        renderOptions,
        imageData: typeof ImageData === "function" ? new ImageData(rgba, track.width, track.height) : null,
      };
    });
    return makeTorTracksLoop({
      site: site.id,
      mode: loop.mode,
      sourceLoop: loop,
      frames: loop.frames,
      tracks,
      renderOptions,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
    });
  }

  async analyzeFrame(frame, options = {}) {
    const site = resolveSiteDescriptor(options.site || options.siteId || options.radarSite || frame.site || frame.meta?.site || "KTLX");
    const result = await this.worker.analysis(frame, { site: site.id });
    return {
      ...result.analysis,
      frame,
      site: result.analysis?.site || site.id,
      elapsedMs: result.elapsedMs,
      cacheHit: Boolean(result.cacheHit),
    };
  }

  async analyzeFrames(frames, options = {}) {
    const rendered = await Promise.all(frames.map((frame) =>
      this.analyzeFrame(frame, options).catch((error) => ({ frame, error }))
    ));
    const failures = rendered.filter((item) => item.error);
    if (failures.length === rendered.length) throw failures[0].error;
    return rendered.filter((item) => !item.error);
  }

  async analyzeLoop(loop, options = {}) {
    const analyses = await this.analyzeFrames(loop.frames, { ...options, site: options.site || loop.site });
    return makeAnalysisLoop({
      site: normalizeSite(options.site || loop.site),
      mode: loop.mode,
      sourceLoop: loop,
      frames: loop.frames,
      analyses,
      analysisOptions: {
        site: normalizeSite(options.site || loop.site),
      },
    });
  }

  async configureCache(options = {}) {
    return this.worker.configureCache(options);
  }

  async warmFrames(frames, options = {}) {
    const items = Array.from(frames || [])
      .map((entry) => entry?.frame || entry)
      .filter(Boolean);
    if (!items.length) {
      return {
        frames: [],
        warmed: 0,
        failed: 0,
        elapsedMs: 0,
        stats: await this.stats(),
      };
    }
    return this.worker.warm(items, {
      product: normalizeProduct(options.product || "REF"),
      metadata: options.metadata !== false,
      concurrency: options.concurrency,
    });
  }

  async warmLoop(loop, options = {}) {
    if (!loop?.frames?.length) throw new Error("warmLoop requires a loop with frames");
    return this.warmFrames(loop.frames, {
      ...options,
      product: options.product || loop.product || "REF",
    });
  }

  stats() {
    return this.worker.stats();
  }

  clearCache() {
    return this.worker.clear();
  }
}

export class RadarSession {
  constructor(toolbox, options = {}) {
    if (!toolbox || typeof toolbox.loadLoop !== "function") throw new Error("RadarSession requires a BowEchoRadarToolbox-compatible instance");
    this.toolbox = toolbox;
    this.listeners = new Set();
    this.loop = null;
    this.index = 0;
    this.status = "idle";
    this.error = null;
    this.lastPoll = null;
    this.playTimer = null;
    this.pollTimer = null;
    this.playing = false;
    this.livePolling = false;
    this.applyOptions({
      site: "KTLX",
      mode: "live",
      product: "REF",
      frameCount: 6,
      width: 768,
      height: 768,
      rangeKm: 230,
      smoothing: "native",
      stormDirDeg: 240,
      stormSpeedKt: 35,
      loopSpeedPercent: 100,
      pollIntervalMs: 60_000,
      followLatest: true,
      ...options,
    });
  }

  subscribe(listener) {
    if (typeof listener !== "function") throw new Error("RadarSession.subscribe requires a listener function");
    this.listeners.add(listener);
    listener(this.snapshot());
    return () => this.listeners.delete(listener);
  }

  snapshot() {
    const frame = this.currentFrame();
    const timeline = this.timeline();
    const capabilities = capabilityHintsFromMetadata(this.loop?.meta, {
      site: this.site,
      selectedProduct: this.product,
      selectedCut: this.cut ?? this.loop?.cut,
    });
    return {
      type: "bowecho-radar-session-v1",
      status: this.status,
      error: this.error,
      site: this.site,
      mode: this.mode,
      product: this.product,
      productDescriptor: productDescriptor(this.product),
      cut: this.cut ?? null,
      frameCount: this.frameCount,
      width: this.width,
      height: this.height,
      rangeKm: this.rangeKm,
      smoothing: this.smoothing,
      stormDirDeg: this.stormDirDeg,
      stormSpeedKt: this.stormSpeedKt,
      loopSpeedPercent: this.loopSpeedPercent,
      pollIntervalMs: this.pollIntervalMs,
      followLatest: this.followLatest,
      playing: this.playing,
      livePolling: this.livePolling,
      loaded: Boolean(this.loop),
      index: this.index,
      latestIndex: this.loop ? Math.max(0, this.loop.length - 1) : -1,
      length: this.loop?.length || 0,
      frame: frame ? summarizeRenderedFrame(frame, this.index) : null,
      timeline,
      cuts: this.cutChoices(),
      capabilities,
      lastPoll: this.lastPoll,
    };
  }

  async load(options = {}) {
    this.applyOptions(options);
    this.status = "loading";
    this.error = null;
    this.emit();
    try {
      const loop = await this.toolbox.loadLoop(this.loopOptions(options));
      this.setLoop(loop, options.index ?? "latest");
      this.status = "ready";
      this.emit();
      if (options.warmProducts) await this.warm(options.warmProducts, options.warmOptions || {});
      return this.snapshot();
    } catch (error) {
      this.status = "error";
      this.error = String(error?.message || error);
      this.emit();
      throw error;
    }
  }

  async setSite(site, options = {}) {
    return this.load({ ...options, site });
  }

  async setProduct(product, options = {}) {
    return this.rerender({ ...options, product });
  }

  async setCut(cut, options = {}) {
    return this.rerender({ ...options, cut });
  }

  async setRenderOptions(options = {}) {
    const siteChanged = options.site !== undefined && normalizeSite(options.site) !== this.site;
    const modeChanged = options.mode !== undefined && options.mode !== this.mode;
    const frameCountChanged = options.frameCount !== undefined && clampInt(options.frameCount, 1, 20) !== this.frameCount;
    if (siteChanged || modeChanged || frameCountChanged || !this.loop) return this.load(options);
    return this.rerender(options);
  }

  async rerender(options = {}) {
    this.applyOptions(options);
    if (!this.loop) return this.load(options);
    const wasLatest = this.isLatest();
    const previousFrameId = this.currentFrame()?.frame?.id || null;
    this.status = "rerendering";
    this.error = null;
    this.emit();
    try {
      const loop = await this.toolbox.rerenderLoop(this.loop, this.loopOptions(options));
      this.setLoop(loop, wasLatest ? "latest" : previousFrameId);
      this.status = "ready";
      this.emit();
      return this.snapshot();
    } catch (error) {
      this.status = "error";
      this.error = String(error?.message || error);
      this.emit();
      throw error;
    }
  }

  async warm(products = this.product, options = {}) {
    if (!this.loop) throw new Error("RadarSession.warm requires a loaded loop");
    const productList = normalizeProductList(products);
    const results = [];
    this.status = "warming";
    this.error = null;
    this.emit();
    try {
      for (const product of productList) {
        const result = await this.toolbox.warmLoop(this.loop, {
          ...options,
          product,
        });
        results.push({ product, result });
      }
      this.status = "ready";
      this.emit();
      return {
        type: "bowecho-radar-session-warm-v1",
        products: results,
        warmed: results.reduce((sum, entry) => sum + Number(entry.result?.warmed || 0), 0),
        failed: results.reduce((sum, entry) => sum + Number(entry.result?.failed || 0), 0),
        stats: results[results.length - 1]?.result?.stats || null,
      };
    } catch (error) {
      this.status = "error";
      this.error = String(error?.message || error);
      this.emit();
      throw error;
    }
  }

  async poll(options = {}) {
    if (!this.loop) return this.load(options);
    const followLatest = Boolean(options.followLatest ?? this.followLatest);
    const wasLatest = this.isLatest();
    const previousFrameId = this.currentFrame()?.frame?.id || null;
    this.status = "polling";
    this.error = null;
    this.emit();
    try {
      const result = await this.toolbox.pollLive(this.loop, this.loopOptions(options));
      this.lastPoll = {
        status: result.status,
        time: new Date().toISOString(),
        frameId: result.frame?.id || null,
        volumeTime: result.frame?.volumeTime || null,
      };
      if (result.loop) this.setLoop(result.loop, followLatest || wasLatest ? "latest" : previousFrameId);
      this.status = "ready";
      this.emit();
      return {
        status: result.status,
        frame: result.frame,
        snapshot: this.snapshot(),
      };
    } catch (error) {
      this.status = "error";
      this.error = String(error?.message || error);
      this.emit();
      throw error;
    }
  }

  startPolling(options = {}) {
    this.stopPolling();
    this.applyOptions(options);
    const interval = clampInt(options.pollIntervalMs ?? this.pollIntervalMs, 5_000, 30 * 60_000);
    this.pollIntervalMs = interval;
    this.livePolling = true;
    this.pollTimer = setInterval(() => {
      this.poll(options).catch((error) => {
        this.status = "error";
        this.error = String(error?.message || error);
        this.emit();
      });
    }, interval);
    if (options.immediate) {
      this.poll(options).catch((error) => {
        this.status = "error";
        this.error = String(error?.message || error);
        this.emit();
      });
    }
    this.emit();
    return () => this.stopPolling();
  }

  stopPolling() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = null;
    this.livePolling = false;
    this.emit();
  }

  play(options = {}) {
    this.stop();
    this.applyOptions(options);
    const interval = clampInt(options.frameIntervalMs ?? playbackIntervalMs(this.loopSpeedPercent), 16, 60_000);
    this.playing = true;
    this.playTimer = setInterval(() => this.nextFrame({ wrap: true }), interval);
    this.emit();
    return () => this.stop();
  }

  stop() {
    if (this.playTimer) clearInterval(this.playTimer);
    this.playTimer = null;
    this.playing = false;
    this.emit();
  }

  togglePlayback(options = {}) {
    return this.playing ? this.stop() : this.play(options);
  }

  setPlaybackSpeed(loopSpeedPercent) {
    const wasPlaying = this.playing;
    this.applyOptions({ loopSpeedPercent });
    if (wasPlaying) this.play({ loopSpeedPercent: this.loopSpeedPercent });
    else this.emit();
    return this.snapshot();
  }

  setIndex(index = "latest") {
    this.index = this.resolveIndex(index);
    this.emit();
    return this.snapshot();
  }

  nextFrame(options = {}) {
    if (!this.loop?.length) return this.snapshot();
    const next = this.index + 1;
    this.index = next >= this.loop.length ? (options.wrap === false ? this.loop.length - 1 : 0) : next;
    this.emit();
    return this.snapshot();
  }

  previousFrame(options = {}) {
    if (!this.loop?.length) return this.snapshot();
    const previous = this.index - 1;
    this.index = previous < 0 ? (options.wrap === false ? 0 : this.loop.length - 1) : previous;
    this.emit();
    return this.snapshot();
  }

  latestFrame() {
    return this.setIndex("latest");
  }

  currentFrame(index = this.index) {
    if (!this.loop?.length) return null;
    return this.loop.frame(this.resolveIndex(index));
  }

  cutChoices(options = {}) {
    return cutChoicesFromMetadata(this.loop?.meta, {
      selectedCut: options.selectedCut ?? this.cut ?? this.loop?.cut,
      ...options,
    });
  }

  timeline(options = {}) {
    return loopTimeline(this.loop, {
      currentIndex: this.index,
      ...options,
    });
  }

  textureLayer(index = this.index, options = {}) {
    const frame = this.currentFrame(index);
    if (!frame) throw new Error("RadarSession.textureLayer requires a loaded loop");
    return this.toolbox.textureLayer(frame, {
      ...this.loop?.renderOptions,
      ...options,
      site: options.site || this.site,
      product: options.product || this.product,
      cut: options.cut ?? this.cut,
    });
  }

  drawToCanvas(canvas, index = this.index) {
    const frame = this.currentFrame(index);
    if (!frame) throw new Error("RadarSession.drawToCanvas requires a loaded loop");
    drawFrameToCanvas(canvas, frame);
    return frame;
  }

  destroy() {
    this.stop();
    this.stopPolling();
    this.listeners.clear();
  }

  applyOptions(options = {}) {
    if (options.site !== undefined) this.site = normalizeSite(options.site);
    if (options.mode !== undefined) this.mode = String(options.mode || "live");
    if (options.product !== undefined) this.product = normalizeProduct(options.product);
    if (options.cut !== undefined) {
      const cut = Number(options.cut);
      this.cut = Number.isInteger(cut) ? cut : undefined;
    }
    if (options.frameCount !== undefined) this.frameCount = clampInt(options.frameCount, 1, 20);
    if (options.width !== undefined || options.pixelSize !== undefined) this.width = clampInt(options.width ?? options.pixelSize, 1, 4096);
    if (options.height !== undefined || options.pixelSize !== undefined) this.height = clampInt(options.height ?? options.pixelSize, 1, 4096);
    if (options.rangeKm !== undefined) this.rangeKm = clampNumber(options.rangeKm, 1, 1000);
    if (options.smoothing !== undefined) this.smoothing = options.smoothing || "native";
    if (options.stormDirDeg !== undefined) this.stormDirDeg = Number(options.stormDirDeg);
    if (options.stormSpeedKt !== undefined) this.stormSpeedKt = Number(options.stormSpeedKt);
    if (options.loopSpeedPercent !== undefined) this.loopSpeedPercent = clampInt(options.loopSpeedPercent, 10, 1000);
    if (options.pollIntervalMs !== undefined) this.pollIntervalMs = clampInt(options.pollIntervalMs, 5_000, 30 * 60_000);
    if (options.followLatest !== undefined) this.followLatest = Boolean(options.followLatest);
  }

  loopOptions(options = {}) {
    return {
      site: this.site,
      mode: this.mode,
      product: this.product,
      cut: options.cut ?? this.cut,
      frameCount: this.frameCount,
      width: this.width,
      height: this.height,
      rangeKm: this.rangeKm,
      smoothing: this.smoothing,
      stormDirDeg: this.stormDirDeg,
      stormSpeedKt: this.stormSpeedKt,
      ...options,
    };
  }

  setLoop(loop, index = "latest") {
    this.loop = loop;
    this.site = loop.site || this.site;
    this.mode = loop.mode || this.mode;
    this.product = loop.product || this.product;
    this.cut = loop.cut;
    this.width = loop.renderOptions?.width || this.width;
    this.height = loop.renderOptions?.height || this.height;
    this.rangeKm = loop.renderOptions?.rangeKm || this.rangeKm;
    this.smoothing = loop.renderOptions?.smoothing || this.smoothing;
    this.index = this.resolveIndex(index);
  }

  resolveIndex(index) {
    const length = this.loop?.length || 0;
    if (typeof index === "string" && index !== "latest" && Number.isNaN(Number(index)) && this.loop?.renderedFrames?.length) {
      const found = this.loop.renderedFrames.findIndex((frame) =>
        frame?.frame?.id === index || frame?.frame?.cacheKey === index
      );
      if (found >= 0) return found;
    }
    return normalizeLoopIndex(index, length, length - 1);
  }

  isLatest() {
    return Boolean(this.loop?.length) && this.index >= this.loop.length - 1;
  }

  emit() {
    const snapshot = this.snapshot();
    for (const listener of this.listeners) listener(snapshot);
  }
}

export function drawFrameToCanvas(canvas, renderedFrame) {
  const ctx = canvas.getContext("2d");
  canvas.width = renderedFrame.width;
  canvas.height = renderedFrame.height;
  ctx.imageSmoothingEnabled = false;
  if (renderedFrame.imageData) {
    ctx.putImageData(renderedFrame.imageData, 0, 0);
  } else {
    ctx.putImageData(new ImageData(renderedFrame.rgba, renderedFrame.width, renderedFrame.height), 0, 0);
  }
}

export function drawCrossSectionToCanvas(canvas, renderedSection) {
  drawFrameToCanvas(canvas, renderedSection);
}

export function drawNativeRhiToCanvas(canvas, renderedNativeRhi) {
  drawFrameToCanvas(canvas, renderedNativeRhi);
}

export function drawTorTracksToCanvas(canvas, renderedTracks) {
  drawFrameToCanvas(canvas, renderedTracks);
}

export function drawCompositeToCanvas(canvas, compositeLayer) {
  drawRadarLayerToCanvas(canvas, compositeLayer);
}

export function drawRadarLayerToCanvas(canvas, radarLayer) {
  const layer = normalizeRadarMapLayer(radarLayer);
  const ctx = canvas.getContext("2d");
  canvas.width = layer.image.width;
  canvas.height = layer.image.height;
  ctx.imageSmoothingEnabled = false;
  if (layer.image.imageData) {
    ctx.putImageData(layer.image.imageData, 0, 0);
  } else {
    ctx.putImageData(new ImageData(layer.image.rgba, layer.image.width, layer.image.height), 0, 0);
  }
}

function createWorkerClient(workerUrl) {
  const worker = new Worker(workerUrl, { type: "module" });
  let nextId = 1;
  const pending = new Map();
  worker.onmessage = (event) => {
    const { id, ok, result, error } = event.data;
    const request = pending.get(id);
    if (!request) return;
    pending.delete(id);
    ok ? request.resolve(result) : request.reject(new Error(error));
  };
  function call(type, payload = {}) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      worker.postMessage({ id, type, payload });
    });
  }
  return {
    sniffBytes: (bytes) => call("sniffBytes", { bytes }),
    importBytes: (bytes, options) => call("importBytes", { bytes, ...options }),
    importByteParts: (parts, options) => call("importByteParts", { parts, ...options }),
    meta: (frame, product) => call("meta", { frame, product }),
    diagnostics: (frame, options) => call("diagnostics", { frame, ...options }),
    render: (frame, options) => call("render", { frame, ...options }),
    crossSection: (frame, options) => call("crossSection", { frame, ...options }),
    nativePpi: (frame, options) => call("nativePpi", { frame, ...options }),
    nativeRhi: (frame, options) => call("nativeRhi", { frame, ...options }),
    torTracksFrame: (frame, options) => call("torTracksFrame", { frame, ...options }),
    torTracksLoop: (frames, options) => call("torTracksLoop", { frames, ...options }),
    analysis: (frame, options) => call("analysis", { frame, ...options }),
    configureCache: (options) => call("configure", options),
    warm: (frames, options) => call("warm", { frames, ...options }),
    stats: () => call("stats"),
    clear: () => call("clear"),
  };
}

function makeLoop({ site, mode, product, cut, frames, renderedFrames, meta, renderOptions }) {
  return {
    site,
    mode,
    product,
    cut,
    frames,
    renderedFrames,
    meta,
    renderOptions: renderOptions || (renderedFrames[0] ? {
      width: renderedFrames[0].width,
      height: renderedFrames[0].height,
    } : {}),
    get length() {
      return this.renderedFrames.length;
    },
    frame(index = this.renderedFrames.length - 1) {
      return this.renderedFrames[Math.max(0, Math.min(this.renderedFrames.length - 1, index))];
    },
  };
}

function makeCrossSectionLoop({ site, mode, product, sourceLoop, frames, sections, renderOptions }) {
  return {
    type: "bowecho-cross-section-loop-v1",
    site,
    mode,
    product,
    sourceLoop,
    frames,
    sections,
    renderOptions,
    get length() {
      return this.sections.length;
    },
    section(index = this.sections.length - 1) {
      return this.sections[Math.max(0, Math.min(this.sections.length - 1, index))];
    },
    panel(index = this.sections.length - 1, options = {}) {
      return radarCrossSectionPanel(this.section(index), {
        ...this.renderOptions,
        ...options,
        site: options.site || this.site,
        product: options.product || this.product,
      });
    },
  };
}

function makeNativeRhiLoop({ site, mode, product, sourceLoop, frames, panels, renderOptions }) {
  return {
    type: "bowecho-native-rhi-loop-v1",
    site,
    mode,
    product,
    sourceLoop,
    frames,
    panels,
    renderOptions,
    get length() {
      return this.panels.length;
    },
    panel(index = this.panels.length - 1) {
      return this.panels[Math.max(0, Math.min(this.panels.length - 1, index))];
    },
    frame(index = this.panels.length - 1) {
      return this.panel(index);
    },
    draw(canvas, index = this.panels.length - 1) {
      drawNativeRhiToCanvas(canvas, this.panel(index));
      return canvas;
    },
  };
}

function makeTorTracksLoop({ site, mode, sourceLoop, frames, tracks, renderOptions, elapsedMs, cacheHit }) {
  return {
    type: "bowecho-tor-tracks-loop-v1",
    site,
    mode,
    sourceLoop,
    frames,
    tracks,
    renderOptions,
    elapsedMs,
    cacheHit,
    get length() {
      return this.tracks.length;
    },
    frame(index = this.tracks.length - 1) {
      return this.tracks[Math.max(0, Math.min(this.tracks.length - 1, index))];
    },
    layer(index = this.tracks.length - 1, options = {}) {
      return radarTorTracksLayer(this.frame(index), {
        ...this.renderOptions,
        ...options,
        site: options.site || this.site,
      });
    },
  };
}

function makeAnalysisLoop({ site, mode, sourceLoop, frames, analyses, analysisOptions }) {
  return {
    type: "bowecho-analysis-loop-v1",
    site,
    mode,
    sourceLoop,
    frames,
    analyses,
    analysisOptions,
    get length() {
      return this.analyses.length;
    },
    analysis(index = this.analyses.length - 1) {
      return this.analyses[Math.max(0, Math.min(this.analyses.length - 1, index))];
    },
    overlay(index = this.analyses.length - 1, options = {}) {
      return radarAnalysisOverlay(this.analysis(index), {
        ...this.analysisOptions,
        ...options,
        site: options.site || this.site,
      });
    },
  };
}

function makeSynchronizedLoops(loops, options = {}) {
  const normalizedLoops = [...(loops || [])].filter((loop) => loop?.renderedFrames?.length);
  if (!normalizedLoops.length) throw new Error("synchronizeRadarLoops requires at least one loop with rendered frames");
  const maxSkewMs = clampInt(options.maxSkewMs ?? 6 * 60_000, 0, 60 * 60_000);
  const timeline = synchronizedTimeline(normalizedLoops, maxSkewMs);
  const syncOptions = {
    maxSkewMs,
    product: normalizeProduct(options.product || normalizedLoops[0]?.product),
    mode: options.mode || normalizedLoops[0]?.mode || "mixed",
  };
  const multiLoop = {
    type: "bowecho-synchronized-loops-v1",
    sites: normalizedLoops.map((loop) => loop.site),
    product: syncOptions.product,
    mode: syncOptions.mode,
    loops: normalizedLoops,
    frameTimes: timeline.map((slot) => slot.time),
    slots: timeline,
    maxSkewMs,
    failures: options.failures || [],
    syncOptions,
    get length() {
      return this.slots.length;
    },
    slot(index = this.slots.length - 1) {
      return this.slots[Math.max(0, Math.min(this.slots.length - 1, index))];
    },
    frames(index = this.slots.length - 1) {
      return this.slot(index).frames;
    },
    frame(siteId, index = this.slots.length - 1) {
      const site = normalizeSite(siteId);
      return this.slot(index).bySite[site]?.frame || null;
    },
    loopForSite(siteId) {
      const site = normalizeSite(siteId);
      return this.loops.find((loop) => loop.site === site) || null;
    },
    textureLayers(index = this.slots.length - 1, textureOptions = {}) {
      return this.frames(index)
        .filter((entry) => !entry.missing && entry.frame)
        .map((entry) => radarTextureLayer(entry.frame, {
          ...entry.loop.renderOptions,
          ...textureOptions,
          site: textureOptions.site || entry.site,
          product: textureOptions.product || entry.loop.product,
          cut: textureOptions.cut ?? entry.loop.cut,
          frameIndex: entry.frameIndex,
          frameCount: entry.loop.renderedFrames.length,
        }));
    },
    nearestTimeIndex(time) {
      const target = typeof time === "number" ? time : Date.parse(time);
      if (!Number.isFinite(target)) return -1;
      let bestIndex = -1;
      let bestDelta = Infinity;
      this.slots.forEach((slot, index) => {
        if (!Number.isFinite(slot.millis)) return;
        const delta = Math.abs(slot.millis - target);
        if (delta < bestDelta) {
          bestDelta = delta;
          bestIndex = index;
        }
      });
      return bestIndex;
    },
  };
  return multiLoop;
}

function synchronizedTimeline(loops, maxSkewMs) {
  const entriesByLoop = loops.map((loop) => loop.renderedFrames.map((frame, index) => ({
    loop,
    site: loop.site,
    frame,
    frameIndex: index,
    millis: frameMillis(frame.frame, NaN),
  })));
  const validTimes = entriesByLoop
    .flat()
    .map((entry) => entry.millis)
    .filter(Number.isFinite);
  if (!validTimes.length) return positionalTimeline(loops);
  const times = [...new Set(validTimes)].sort((a, b) => a - b);
  return times.map((millis) => {
    const frames = entriesByLoop.map((entries, loopIndex) => {
      const match = nearestEntry(entries, millis, maxSkewMs);
      if (!match) return missingSlotEntry(loops[loopIndex], millis);
      return {
        site: match.site,
        loop: match.loop,
        frame: match.frame,
        frameIndex: match.frameIndex,
        time: isoTime(match.millis),
        millis: match.millis,
        skewMs: match.millis - millis,
        missing: false,
      };
    });
    return makeSyncSlot(millis, frames);
  });
}

function positionalTimeline(loops) {
  const length = Math.max(...loops.map((loop) => loop.renderedFrames.length));
  return Array.from({ length }, (_, index) => {
    const frames = loops.map((loop) => {
      const frameIndex = Math.min(index, loop.renderedFrames.length - 1);
      return {
        site: loop.site,
        loop,
        frame: loop.renderedFrames[frameIndex] || null,
        frameIndex,
        time: null,
        millis: NaN,
        skewMs: 0,
        missing: !loop.renderedFrames[frameIndex],
      };
    });
    return makeSyncSlot(null, frames);
  });
}

function makeSyncSlot(millis, frames) {
  const bySite = Object.fromEntries(frames.map((entry) => [entry.site, entry]));
  return {
    time: Number.isFinite(millis) ? isoTime(millis) : null,
    millis: Number.isFinite(millis) ? millis : NaN,
    frames,
    bySite,
    complete: frames.every((entry) => !entry.missing),
  };
}

function missingSlotEntry(loop, millis) {
  return {
    site: loop.site,
    loop,
    frame: null,
    frameIndex: -1,
    time: Number.isFinite(millis) ? isoTime(millis) : null,
    millis: Number.isFinite(millis) ? millis : NaN,
    skewMs: NaN,
    missing: true,
  };
}

function nearestEntry(entries, millis, maxSkewMs) {
  let best = null;
  let bestDelta = Infinity;
  for (const entry of entries) {
    if (!Number.isFinite(entry.millis)) continue;
    const delta = Math.abs(entry.millis - millis);
    if (delta < bestDelta) {
      best = entry;
      bestDelta = delta;
    }
  }
  return best && bestDelta <= maxSkewMs ? best : null;
}

function normalizeSiteList(sites) {
  const values = Array.isArray(sites) ? sites : String(sites || "").split(/[,\s]+/);
  return [...new Set(values
    .map((site) => String(site || "").trim())
    .filter(Boolean)
    .map(normalizeSite))];
}

function isoTime(millis) {
  return Number.isFinite(millis) ? new Date(millis).toISOString() : null;
}

function filterSites(options = {}) {
  const query = String(options.query || "").trim().toUpperCase();
  const source = options.includeProfilers ? SITES : RADAR_SITES;
  return source.filter((site) => !query || `${site.id} ${site.name}`.toUpperCase().includes(query));
}

function filterInternationalRadarSites(options = {}) {
  const query = normalizeQuery(options.query);
  const providerIds = normalizeStringSet(options.providerId || options.providerIds || options.providers);
  const countries = normalizeStringSet(options.country || options.countries);
  const formats = normalizeStringSet(options.format || options.formats);
  return INTERNATIONAL_RADAR_SITES
    .filter((site) => !query || `${site.id} ${site.label} ${site.country} ${site.providerId}`.toUpperCase().includes(query))
    .filter((site) => !providerIds.size || providerIds.has(String(site.providerId).toUpperCase()))
    .filter((site) => !countries.size || countries.has(String(site.country).toUpperCase()))
    .filter((site) => !formats.size || formats.has(String(site.format).toUpperCase()));
}

function filterGlobalRadarSites(options = {}) {
  const sources = normalizeSources(options.sources || options.source);
  const providerIds = normalizeStringSet(options.providerId || options.providerIds || options.providers);
  const countries = normalizeStringSet(options.country || options.countries);
  const query = normalizeQuery(options.query);
  const sites = [];
  if (sources.has("nexrad")) {
    for (const site of filterSites({ query: options.nexradQuery || options.query, includeProfilers: options.includeProfilers })) {
      sites.push({
        source: "nexrad",
        providerId: "nexrad-level2",
        id: site.id,
        label: site.name,
        name: site.name,
        country: "United States",
        lat: site.lat,
        lon: site.lon,
        formats: ["nexrad-level2"],
        capabilities: { clientSideReady: true, livePolling: true, recentLoop: true },
      });
    }
  }
  if (sources.has("international")) {
    const providersById = new Map(GLOBAL_RADAR_PROVIDERS.map((provider) => [String(provider.id).toLowerCase(), provider]));
    sites.push(...filterInternationalRadarSites(options).map((site) => ({
      ...site,
      name: site.label,
      formats: [site.format],
      capabilities: {
        clientSideReady: Boolean(providersById.get(String(site.providerId).toLowerCase())?.capabilities?.clientSideReady),
        browserPlanner: Boolean(providersById.get(String(site.providerId).toLowerCase())?.capabilities?.browserPlanner),
        latestPlan: Boolean(providersById.get(String(site.providerId).toLowerCase())?.capabilities?.latestPlan),
        recentPlan: Boolean(providersById.get(String(site.providerId).toLowerCase())?.capabilities?.recentPlan),
        mergeParts: site.merge,
        siteFilteredDecode: site.siteFilteredDecode,
      },
    })));
  }
  if (sources.has("community")) {
    const feedsById = new Map(COMMUNITY_RADAR_FEEDS.map((feed) => [feed.id, feed]));
    for (const marker of communityRadarMarkers(options)) {
      const feedIds = [...(marker.feedIds || [])];
      sites.push({
        source: "community",
        providerId: "community-gr2a",
        id: feedIds.length === 1 ? feedIds[0] : `community:${marker.label}`,
        label: marker.label,
        name: marker.label,
        country: "United States",
        state: feedIds.map((id) => feedsById.get(id)?.state).find(Boolean) || null,
        lat: marker.lat,
        lon: marker.lon,
        feedIds,
        feeds: feedIds.map((id) => feedsById.get(id)).filter(Boolean).map(cloneCatalogRecord),
        formats: ["nexrad-level2"],
        capabilities: {
          clientSideReady: true,
          corsRequired: true,
          dirListPolling: true,
          communityFeed: true,
          livePolling: true,
          recentLoop: true,
        },
      });
    }
  }
  if (sources.has("custom")) {
    const customLinks = normalizeCustomPollLinkArray(options.customPollLinks || options.customLinks || options.customPollEntries || options.customPollLink);
    for (const marker of customPollMarkers(customLinks, options)) {
      const feed = customPollLinkFeed(marker.entry);
      sites.push({
        source: "custom",
        providerId: "custom-gr2a",
        id: marker.siteId || marker.id,
        label: marker.label,
        name: marker.label,
        country: options.customCountry || "Custom",
        state: feed.state || null,
        lat: marker.lat,
        lon: marker.lon,
        feedIds: [feed.id],
        feeds: [feed],
        customPollLink: marker.entry,
        formats: ["nexrad-level2"],
        capabilities: {
          clientSideReady: true,
          corsRequired: true,
          dirListPolling: true,
          customPollLink: true,
          livePolling: true,
          recentLoop: true,
        },
      });
    }
  }
  return sites
    .filter((site) => !query || `${site.id} ${site.label} ${site.country} ${site.providerId} ${site.source}`.toUpperCase().includes(query))
    .filter((site) => !providerIds.size || providerIds.has(String(site.providerId).toUpperCase()))
    .filter((site) => !countries.size || countries.has(String(site.country).toUpperCase()))
    .sort((left, right) => globalSourceRank(left.source) - globalSourceRank(right.source) || String(left.id).localeCompare(String(right.id)));
}

function normalizeSources(value) {
  const raw = value === undefined || value === null || value === "all"
    ? ["nexrad", "international", "community", "custom"]
    : Array.isArray(value)
      ? value
      : String(value).split(/[,\s]+/);
  const aliases = {
    level2: "nexrad",
    nexradlevel2: "nexrad",
    intl: "international",
    global: "international",
    research: "community",
    feeds: "community",
    custompoll: "custom",
    custompolls: "custom",
    customfeed: "custom",
    customfeeds: "custom",
  };
  const out = new Set();
  for (const item of raw) {
    const key = String(item || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!key) continue;
    out.add(aliases[key] || key);
  }
  if (!out.size) out.add("nexrad");
  return out;
}

function normalizeCustomPollLinkArray(value) {
  if (value === undefined || value === null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeStringSet(value) {
  if (value === undefined || value === null || value === "") return new Set();
  const raw = Array.isArray(value) ? value : String(value).split(/[,\s]+/);
  return new Set(raw.map((item) => String(item || "").trim().toUpperCase()).filter(Boolean));
}

function normalizeQuery(value) {
  return String(value || "").trim().toUpperCase();
}

function globalSourceRank(source) {
  if (source === "nexrad") return 0;
  if (source === "international") return 1;
  if (source === "community") return 2;
  if (source === "custom") return 3;
  return 9;
}

function cloneCatalogRecord(record) {
  return record && typeof record === "object" ? JSON.parse(JSON.stringify(record)) : record;
}

function findInternationalRadarProvider(providerId) {
  const id = normalizeInternationalProviderId(providerId);
  if (!id) return null;
  return GLOBAL_RADAR_PROVIDERS.find((provider) => String(provider.id).toLowerCase() === id) || null;
}

function normalizeInternationalProviderId(providerId) {
  return String(providerId || "").trim().toLowerCase();
}

function findInternationalRadarSite(providerOrSite, siteId = undefined) {
  if (providerOrSite && typeof providerOrSite === "object") {
    if (providerOrSite.source === "international" || providerOrSite.providerId || providerOrSite.lat !== undefined) {
      return normalizeInternationalSiteDescriptor(providerOrSite);
    }
  }
  let providerId = providerOrSite;
  let id = siteId;
  if (siteId === undefined && typeof providerOrSite === "string" && providerOrSite.includes(":")) {
    [providerId, id] = providerOrSite.split(":", 2);
  }
  if (siteId === undefined && typeof providerOrSite === "string" && !findInternationalRadarProvider(providerOrSite)) {
    id = providerOrSite;
    providerId = undefined;
  }
  const normalizedProvider = normalizeInternationalProviderId(providerId);
  const normalizedSite = String(id || "").trim().toUpperCase();
  if (!normalizedSite) return null;
  const match = INTERNATIONAL_RADAR_SITES.find((site) =>
    (!normalizedProvider || String(site.providerId).toLowerCase() === normalizedProvider)
    && String(site.id).toUpperCase() === normalizedSite
  );
  return match ? normalizeInternationalSiteDescriptor(match) : null;
}

function normalizeInternationalSiteDescriptor(site) {
  if (!site || typeof site !== "object") return null;
  const id = String(site.id || site.siteId || site.site || "").trim();
  const lat = Number(site.lat ?? site.latitude ?? site.latitudeDeg);
  const lon = Number(site.lon ?? site.lng ?? site.longitude ?? site.longitudeDeg);
  if (!id || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {
    id,
    name: String(site.name || site.label || id),
    label: String(site.label || site.name || id),
    providerId: normalizeInternationalProviderId(site.providerId || site.provider || ""),
    country: site.country || null,
    lat,
    lon,
    format: site.format || null,
    merge: Boolean(site.merge),
    siteFilteredDecode: Boolean(site.siteFilteredDecode),
  };
}

function resolveSmhiInternationalSite(siteId) {
  const id = validateSmhiAreaKey(siteId);
  const site = findInternationalRadarSite("smhi", id);
  if (!site) throw new Error(`SMHI: unknown area key '${siteId}'`);
  return site;
}

function resolveGeosphereInternationalSite(siteId = "hochficht") {
  const id = validateGeosphereSiteId(siteId);
  const site = findInternationalRadarSite("geosphere", id);
  if (!site) throw new Error(`GeoSphere: unknown site id '${siteId}'`);
  return site;
}

function resolveShmuInternationalSite(siteId) {
  const id = validateShmuSiteId(siteId);
  const site = findInternationalRadarSite("shmu", id);
  if (!site) throw new Error(`SHMU: unknown site id '${siteId}'`);
  return site;
}

function resolveDwdInternationalSite(siteId) {
  const id = validateDwdSiteId(siteId);
  const site = findInternationalRadarSite("dwd", id);
  if (!site) throw new Error(`DWD: unknown site id '${siteId}'`);
  return site;
}

function resolveChmiInternationalSite(siteId) {
  const id = validateChmiSiteId(siteId);
  const site = findInternationalRadarSite("chmi", id);
  if (!site) throw new Error(`CHMI: unknown site id '${siteId}'`);
  return site;
}

function resolveJmaInternationalSite(siteId) {
  const id = validateJmaSiteId(siteId);
  const site = findInternationalRadarSite("jma", id);
  if (!site) throw new Error(`JMA: unknown site id '${siteId}'`);
  return site;
}

function resolveOrdInternationalSite(siteId) {
  const id = validateOrdSiteId(siteId);
  const site = findInternationalRadarSite("ord", id);
  if (!site) throw new Error(`ORD: unknown site id '${siteId}'`);
  return site;
}

function resolveDmiInternationalSite(siteId) {
  validateDmiStationId(siteId);
  const site = findInternationalRadarSite("dmi", siteId);
  if (!site) throw new Error(`DMI: unknown station id '${siteId}'`);
  return site;
}

function resolveFmiInternationalSite(siteId) {
  const id = validateFmiSiteCode(siteId);
  const site = findInternationalRadarSite("fmi", id);
  if (!site) throw new Error(`FMI: unknown site id '${siteId}'`);
  return site;
}

function validateSmhiAreaKey(siteId) {
  const value = String(siteId || "").trim().toLowerCase();
  if (value && /^[a-z0-9]+$/.test(value)) return value;
  throw new Error(`SMHI: invalid area key '${siteId}'`);
}

function validateGeosphereSiteId(siteId) {
  const value = String(siteId || "").trim().toLowerCase();
  if (value === "hochficht") return value;
  throw new Error(`GeoSphere: invalid site id '${siteId}' (only 'hochficht')`);
}

function validateShmuSiteId(siteId) {
  const value = String(siteId || "").trim().toLowerCase();
  if (value && /^[a-z0-9_-]+$/.test(value)) return value;
  throw new Error(`SHMU: invalid site id '${siteId}'`);
}

function validateShmuProduct(product) {
  const value = String(product || "").trim();
  const canonical = shmuProductCanonical(value);
  if (canonical) return canonical;
  throw new Error(`SHMU: unsupported product '${product}'`);
}

function shmuProductCanonical(product) {
  const value = String(product || "").trim().toLowerCase();
  const products = ["dBZ", "V", "ZDR", "RhoHV", "PhiDP", "KDP"];
  return products.find((item) => item.toLowerCase() === value) || null;
}

function validateShmuDate(date) {
  const value = String(date || "").trim();
  if (/^\d{8}$/.test(value)) return value;
  throw new Error(`SHMU: invalid UTC date '${date}'`);
}

function validateDwdSiteId(siteId) {
  const value = String(siteId || "").trim().toLowerCase();
  if (value && /^[a-z0-9_-]+$/.test(value)) return value;
  throw new Error(`DWD: invalid site id '${siteId}'`);
}

function validateDwdProductDir(productDir) {
  const value = String(productDir || "").trim().toLowerCase();
  if (DWD_SWEEP_PRODUCTS.some((product) => product.dir === value)) return value;
  throw new Error(`DWD: unsupported product directory '${productDir}'`);
}

function validateChmiSiteId(siteId) {
  const value = String(siteId || "").trim().toLowerCase();
  if (value && /^[a-z0-9_-]+$/.test(value)) return value;
  throw new Error(`CHMI: invalid site id '${siteId}'`);
}

function validateChmiProductDir(productDir) {
  const value = String(productDir || "").trim().toLowerCase();
  if (CHMI_PRODUCTS.some((product) => product.dir === value)) return value;
  throw new Error(`CHMI: unsupported product directory '${productDir}'`);
}

function validateJmaSiteId(siteId) {
  const value = String(siteId || "").trim().toUpperCase();
  if (value && /^[A-Z0-9]{4}$/.test(value)) return value;
  throw new Error(`JMA: invalid site id '${siteId}'`);
}

function validateJmaProduct(product) {
  const value = String(product || JMA_REFLECTIVITY_PRODUCT).trim().toUpperCase();
  if (value === "N5" || value === "N6") return value;
  throw new Error(`JMA: unsupported product '${product}'`);
}

function validateOrdSiteId(siteId) {
  const value = String(siteId || "").trim().toLowerCase();
  if (value.length >= 3 && /^[a-z0-9]+$/.test(value)) return value;
  throw new Error(`ORD: invalid site code '${siteId}'`);
}

function validateOrdObjectKind(objectKind) {
  const value = String(objectKind || "").trim().toUpperCase();
  if (value === "PVOL" || value === "SCAN") return value;
  throw new Error(`ORD: unsupported object kind '${objectKind}'`);
}

function validateDwdQuantity(quantity) {
  const value = String(quantity || "").trim().toLowerCase();
  if (value && /^[a-z0-9]+$/.test(value)) return value;
  throw new Error(`DWD: invalid quantity '${quantity}'`);
}

function validateDwdVariantPath(variant) {
  const value = String(variant || "").trim().replace(/^\/+|\/+$/g, "");
  if (!value) return "";
  const segments = value.split("/");
  if (segments.every((segment) => segment && /^[a-z0-9_-]+$/i.test(segment))) return segments.join("/");
  throw new Error(`DWD: invalid variant path '${variant}'`);
}

function validateDmiStationId(siteId) {
  const value = String(siteId || "").trim();
  if (value && /^\d+$/.test(value)) return value;
  throw new Error(`DMI: invalid station id '${siteId}'`);
}

function validateFmiSiteCode(siteId) {
  const value = String(siteId || "").trim().toLowerCase();
  if (value && /^[a-z0-9]+$/.test(value)) return value;
  throw new Error(`FMI: invalid site code '${siteId}'`);
}

function normalizeDmiFeature(feature, index, options = {}) {
  if (!feature || typeof feature !== "object") return null;
  const id = String(feature.id || "").trim();
  const stationId = String(feature.properties?.stationId || feature.properties?.station_id || options.siteId || "").trim();
  const url = dmiFeatureHref(feature);
  if (!id || !stationId || !url) return null;
  const known = findInternationalRadarSite("dmi", stationId);
  return {
    id,
    stationId,
    url,
    index,
    volumeTime: volumeTimeFromInternationalIdentity(id),
    site: known ? cloneCatalogRecord(known) : null,
    properties: cloneCatalogRecord(feature.properties || {}),
  };
}

function dmiFeatureHref(feature) {
  const asset = feature.asset || feature.assets || {};
  return asset.data?.href || asset.Data?.href || asset.DATA?.href || null;
}

function parseJsonLike(textOrJson, label) {
  if (typeof textOrJson === "string") {
    try {
      return JSON.parse(textOrJson || "{}");
    } catch (error) {
      throw new Error(`${label} JSON parse failed: ${error.message || error}`);
    }
  }
  return textOrJson || {};
}

function normalizeSmhiArea(area, index) {
  const id = validateSmhiAreaKey(area?.key || area?.id || area?.area || "");
  if (id === "sweden") return null;
  const known = findInternationalRadarSite("smhi", id);
  return {
    id,
    key: id,
    label: known?.label || titleCaseToken(id),
    index,
    site: known ? cloneCatalogRecord(known) : null,
  };
}

function normalizeSmhiLastFile(site, entry, index, options = {}) {
  const key = String(entry?.key || entry?.id || "").trim();
  if (!key) return null;
  const url = smhiDatedQcvolUrl(site.id, key, options) || smhiFormatLink(entry, "h5") || smhiFormatLink(entry, "H5");
  if (!url) return null;
  return {
    key,
    url,
    index,
    volumeTime: volumeTimeFromInternationalIdentity(key),
    site: cloneCatalogRecord(site),
    formats: Array.isArray(entry?.formats) ? entry.formats.map(cloneCatalogRecord) : [],
  };
}

function normalizeGeosphereVolumeItem(site, object, index, options = {}) {
  const key = String(object?.key || "").trim();
  const fileName = key.split("/").pop() || key;
  if (!geosphereWxrhofFileName(fileName)) return null;
  return {
    key,
    fileName,
    siteId: site.id,
    url: options.urlForKey?.(key) || `${trimTrailingSlash(options.baseUrl || GEOSPHERE_DATAHUB_URL)}/${encodeUrlPath(key)}`,
    index,
    size: Number(object.size || 0),
    lastModified: object.lastModified || null,
    volumeTime: volumeTimeFromInternationalIdentity(fileName),
    site: cloneCatalogRecord(site),
  };
}

function geosphereWxrhofFileName(fileName) {
  return /^WXRHOF_\d{12}\.hdf$/i.test(String(fileName || ""));
}

function smhiFormatLink(entry, formatKey) {
  const formats = Array.isArray(entry?.formats) ? entry.formats : [];
  return formats.find((format) => String(format?.key || "").toLowerCase() === String(formatKey || "").toLowerCase())?.link || null;
}

function smhiKeyStamp(key) {
  const stamp = String(key || "").split("_").pop() || "";
  return /^\d{12}$/.test(stamp) ? stamp : null;
}

function titleCaseToken(value) {
  const text = String(value || "");
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : text;
}

async function latestSmhiFramePlan(siteId, options = {}) {
  const site = resolveSmhiInternationalSite(siteId);
  const text = await fetchText(smhiQcvolCatalogUrl(site.id, options), options);
  return smhiFramePlanFromCatalog(site.id, text, options);
}

async function recentSmhiFramePlans(siteId, count, options = {}) {
  const site = resolveSmhiInternationalSite(siteId);
  const text = await fetchText(smhiQcvolCatalogUrl(site.id, options), options);
  return smhiFramePlansFromCatalog(site.id, text, { ...options, count });
}

async function latestGeosphereFramePlan(siteId, options = {}) {
  const plans = await recentGeosphereFramePlans(siteId, 1, options);
  return plans[plans.length - 1];
}

async function recentGeosphereFramePlans(siteId, count, options = {}) {
  const site = resolveGeosphereInternationalSite(siteId);
  const plans = [];
  const seen = new Set();
  const errors = [];
  const explicitStartAfter = options.startAfter !== undefined && options.startAfter !== null;
  const lookbacks = explicitStartAfter ? [null] : geosphereLookbackHours(options);
  const maxPages = clampInt(options.maxPages ?? 12, 1, 100);
  const maxKeys = clampInt(options.maxKeys ?? options.maxKeysPerPage ?? 1000, 1, 1000);

  for (const lookbackHours of lookbacks) {
    let startAfter = explicitStartAfter
      ? String(options.startAfter)
      : geosphereStartAfterKey(options.now || new Date(), lookbackHours);
    const before = plans.length;

    for (let page = 0; page < maxPages; page += 1) {
      const url = geosphereVolumeListingUrl({ ...options, startAfter, maxKeys });
      let listing;
      try {
        listing = parseS3StyleListing(await fetchText(url, options));
      } catch (error) {
        errors.push(error);
        break;
      }

      const pagePlans = geosphereFramePlansFromListing(listing, { ...options, siteId: site.id });
      for (const plan of pagePlans) {
        const key = plan.sourceItem?.key || plan.identity;
        if (seen.has(key)) continue;
        seen.add(key);
        plans.push(plan);
      }

      const lastKey = listing.keys[listing.keys.length - 1];
      if (!listing.isTruncated || !lastKey || lastKey === startAfter) break;
      startAfter = lastKey;
    }

    if (plans.length > before) break;
  }

  plans.sort((left, right) => {
    const leftKey = left.sourceItem?.key || left.identity;
    const rightKey = right.sourceItem?.key || right.identity;
    return String(leftKey).localeCompare(String(rightKey));
  });
  if (!plans.length) {
    const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
    throw new Error(`GeoSphere: no WXRHOF_*.hdf files for site '${site.id}' in the requested lookback windows${suffix}`);
  }
  return plans.slice(-count);
}

function geosphereLookbackHours(options = {}) {
  const value = options.lookbackHours ?? options.lookbacks;
  const raw = value === undefined ? [12, 72] : (Array.isArray(value) ? value : [value]);
  const hours = raw
    .map(Number)
    .filter((item) => Number.isFinite(item) && item >= 0);
  return hours.length ? [...new Set(hours)] : [12, 72];
}

function normalizeAutoIndexEntry(entry, index, options = {}) {
  if (!entry || typeof entry !== "object") return null;
  const href = String(entry.href || entry.url || entry.name || "").trim();
  const name = normalizeAutoIndexName(entry.name || entry.label || href);
  if (!name) return null;
  const isDir = Boolean(entry.isDir ?? entry.directory ?? String(href || name).endsWith("/"));
  const cleanName = name.replace(/\/+$/g, "");
  const baseUrl = options.baseUrl ? trimTrailingSlash(options.baseUrl) : "";
  const url = entry.url
    ? String(entry.url)
    : (isAbsoluteUrl(href) ? href : (baseUrl ? joinRawUrlPath(baseUrl, href.replace(/\/+$/g, "")) : href));
  return {
    name: cleanName,
    href,
    url,
    isDir,
    index,
    rawLabel: entry.rawLabel || entry.label || cleanName,
  };
}

function autoIndexHrefAllowed(href, options = {}) {
  const value = String(href || "").trim();
  if (!value
    || value.startsWith("?")
    || value.startsWith("#")
    || value.startsWith("./")
    || value.startsWith("../")
    || (!options.includeAbsolute && (value.startsWith("/") || value.includes("://")))
  ) {
    return false;
  }
  const name = value.replace(/\/+$/g, "");
  if (!options.includeNested && name.includes("/")) return false;
  return true;
}

function normalizeAutoIndexName(value) {
  let text = stripHtmlTags(unescapeHtmlEntities(String(value || "").trim()));
  try {
    text = decodeURIComponent(text);
  } catch {
    // Keep raw autoindex names when a server emits a non-URI label.
  }
  return text.replace(/^\/+|\/+$/g, "");
}

function stripHtmlTags(text) {
  return String(text || "").replace(/<[^>]*>/g, "");
}

function unescapeHtmlEntities(text) {
  return String(text || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function joinRawUrlPath(baseUrl, path) {
  return `${trimTrailingSlash(baseUrl)}/${String(path || "").replace(/^\/+/g, "")}`;
}

function normalizeShmuFileItem(site, product, date, entry, index, options = {}) {
  const name = String(entry?.name || "").trim();
  const stamp = (name.match(/(\d{14})(?!\d)/) || [])[1];
  if (!stamp) return null;
  return {
    name,
    product,
    date,
    stamp,
    url: options.urlForName?.(name, { site, product, date, entry })
      || entry.url
      || `${shmuProductDateListingUrl(site.id, product, date, options)}${encodeURIComponent(name)}`,
    index,
    volumeTime: volumeTimeFromInternationalIdentity(stamp),
    site: cloneCatalogRecord(site),
  };
}

function normalizeShmuFilesByProduct(filesByProduct, site, options = {}) {
  const map = new Map();
  const entries = filesByProduct instanceof Map
    ? [...filesByProduct.entries()]
    : Object.entries(filesByProduct || {});
  for (const [rawProduct, rawItems] of entries) {
    const product = validateShmuProduct(rawProduct);
    const items = (Array.isArray(rawItems) ? rawItems : [])
      .map((item, index) => normalizeShmuExistingItem(site, product, item, index, options))
      .filter(Boolean)
      .sort((left, right) => left.stamp.localeCompare(right.stamp) || left.name.localeCompare(right.name));
    map.set(product, items);
  }
  return map;
}

function normalizeShmuExistingItem(site, product, item, index, options = {}) {
  if (!item || typeof item !== "object") return null;
  const name = String(item.name || item.fileName || item.key || "").trim();
  const stamp = String(item.stamp || (name.match(/(\d{14})(?!\d)/) || [])[1] || "").trim();
  if (!name || !/^\d{14}$/.test(stamp)) return null;
  const date = validateShmuDate(item.date || stamp.slice(0, 8));
  return {
    name,
    product,
    date,
    stamp,
    url: item.url || options.urlForName?.(name, { site, product, date, item }) || `${shmuProductDateListingUrl(site.id, product, date, options)}${encodeURIComponent(name)}`,
    index: Number.isFinite(Number(item.index)) ? Number(item.index) : index,
    volumeTime: item.volumeTime || volumeTimeFromInternationalIdentity(stamp),
    site: cloneCatalogRecord(site),
  };
}

function shmuCommonStamps(dbz, vel) {
  const velStamps = new Set(vel.map((item) => item.stamp));
  return [...new Set(dbz.map((item) => item.stamp).filter((stamp) => velStamps.has(stamp)))].sort();
}

function shmuPlanForStamp(site, stamp, filesByProduct) {
  const products = ["dBZ", "V", "ZDR", "RhoHV", "PhiDP", "KDP"];
  const parts = [];
  const sourceItems = [];
  for (const product of products) {
    const item = (filesByProduct.get(product) || []).find((candidate) => candidate.stamp === stamp);
    if (!item) {
      if (product === "dBZ" || product === "V") throw new Error(`SHMU ${site.id}: missing required ${product} part for ${stamp}`);
      continue;
    }
    parts.push({ url: item.url });
    sourceItems.push(item);
  }
  const identity = `shmu-${site.id}-${stamp}-p${parts.length}-${hashString(parts.map((part) => part.url).join("\n"))}`;
  return makeInternationalFramePlan({
    providerId: "shmu",
    providerLabel: "SHMU Slovakia",
    site,
    identity,
    parts,
    merge: true,
    format: "odim-h5",
    volumeTime: volumeTimeFromInternationalIdentity(stamp),
    sourceItem: {
      stamp,
      parts: sourceItems.map(cloneCatalogRecord),
    },
  });
}

async function latestShmuFramePlan(siteId, options = {}) {
  const plans = await recentShmuFramePlans(siteId, 1, options);
  return plans[plans.length - 1];
}

async function recentShmuFramePlans(siteId, count, options = {}) {
  const site = resolveShmuInternationalSite(siteId);
  if (options.filesByProduct) {
    return shmuFramePlansFromProductFiles(site.id, options.filesByProduct, { ...options, count });
  }

  const productNames = await shmuAvailableProducts(site.id, options);
  for (const required of ["dBZ", "V"]) {
    if (!productNames.includes(required)) throw new Error(`SHMU site '${site.id}' is missing required product directory '${required}'`);
  }

  const candidateDates = await shmuCandidateDates(site.id, options);
  const filesByProduct = {};
  const errors = [];
  for (const product of ["dBZ", "V", "ZDR", "RhoHV", "PhiDP", "KDP"].filter((item) => productNames.includes(item))) {
    filesByProduct[product] = [];
    for (const date of candidateDates) {
      try {
        const text = await fetchText(shmuProductDateListingUrl(site.id, product, date, options), options);
        filesByProduct[product].push(...parseShmuFileListing(site.id, product, date, text, options));
      } catch (error) {
        errors.push(error);
      }
    }
  }

  const plans = shmuFramePlansFromProductFiles(site.id, filesByProduct, { ...options, count });
  if (!plans.length) {
    const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
    throw new Error(`SHMU site '${site.id}' has no timestamp common to dBZ and V${suffix}`);
  }
  return plans;
}

async function shmuAvailableProducts(siteId, options = {}) {
  if (options.products) {
    return [...new Set((Array.isArray(options.products) ? options.products : [options.products]).map(validateShmuProduct))];
  }
  const text = await fetchText(shmuSiteCatalogUrl(siteId, options), options);
  const products = parseAutoIndexListing(text)
    .filter((entry) => entry.isDir)
    .map((entry) => shmuProductCanonical(entry.name))
    .filter(Boolean);
  return [...new Set(products)];
}

async function shmuCandidateDates(siteId, options = {}) {
  if (options.dates || options.date) {
    const values = options.dates || options.date;
    return [...new Set((Array.isArray(values) ? values : [values]).map(validateShmuDate))].sort();
  }
  const dates = new Set();
  const errors = [];
  for (const product of ["dBZ", "V"]) {
    try {
      const text = await fetchText(shmuProductCatalogUrl(siteId, product, options), options);
      const parsed = parseShmuDateListing(text);
      for (const date of parsed.slice(-2)) dates.add(date);
    } catch (error) {
      errors.push(error);
    }
  }
  const sorted = [...dates].sort();
  if (sorted.length) return sorted;
  const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
  throw new Error(`SHMU site '${siteId}' has no recent date directories${suffix}`);
}

function normalizeDwdSweepItem(site, productDir, quantity, entry, index, options = {}) {
  const name = String(entry?.name || "").trim();
  const marker = `_sweeph5onem_${quantity}_`;
  const markerAt = name.indexOf(marker);
  if (markerAt < 0) return null;
  const after = name.slice(markerAt + marker.length);
  const match = after.match(/^(\d{2})-(\d{16})-/);
  if (!match) return null;
  const sweep = Number(match[1]);
  const stamp16 = match[2];
  const stamp = stamp16.slice(0, 14);
  const timeMs = utcMsFromCompactStamp(stamp);
  if (!Number.isFinite(timeMs)) return null;
  return {
    name,
    productDir,
    quantity,
    sweep,
    stamp16,
    stamp,
    timeMs,
    url: options.urlForName?.(name, { site, productDir, quantity, entry })
      || entry.url
      || `${dwdProductSweepListingUrl(site.id, productDir, options.variant || "unfiltered", options)}${encodeURIComponent(name)}`,
    index,
    volumeTime: volumeTimeFromInternationalIdentity(stamp),
    site: cloneCatalogRecord(site),
  };
}

function normalizeDwdSweepsByProduct(sweepsByProduct, site, options = {}) {
  const map = new Map();
  const entries = sweepsByProduct instanceof Map
    ? [...sweepsByProduct.entries()]
    : Object.entries(sweepsByProduct || {});
  for (const [rawProductDir, rawItems] of entries) {
    const productDir = validateDwdProductDir(rawProductDir);
    const product = dwdProductByDir(productDir);
    const items = (Array.isArray(rawItems) ? rawItems : [])
      .map((item, index) => normalizeDwdExistingSweepItem(site, product, item, index, options))
      .filter(Boolean)
      .sort((left, right) => left.sweep - right.sweep || left.stamp.localeCompare(right.stamp) || left.name.localeCompare(right.name));
    map.set(productDir, items);
  }
  return map;
}

function normalizeDwdExistingSweepItem(site, product, item, index, options = {}) {
  if (!item || typeof item !== "object") return null;
  const quantity = validateDwdQuantity(item.quantity || dwdQuantityFromName(item.name || item.fileName || item.key || "", product) || product.quantities[0]);
  const name = String(item.name || item.fileName || item.key || "").trim();
  const marker = `_sweeph5onem_${quantity}_`;
  const parsed = name.includes(marker)
    ? normalizeDwdSweepItem(site, product.dir, quantity, { name, url: item.url }, Number.isFinite(Number(item.index)) ? Number(item.index) : index, options)
    : null;
  if (parsed) return { ...parsed, url: item.url || parsed.url };

  const sweep = Number(item.sweep);
  const stamp16 = String(item.stamp16 || item.stampCentiseconds || "").trim();
  const stamp = String(item.stamp || (stamp16 ? stamp16.slice(0, 14) : "")).trim();
  const timeMs = Number.isFinite(Number(item.timeMs)) ? Number(item.timeMs) : utcMsFromCompactStamp(stamp);
  if (!name || !Number.isInteger(sweep) || sweep < 0 || sweep > 99 || !/^\d{14}$/.test(stamp) || !Number.isFinite(timeMs)) return null;
  return {
    name,
    productDir: product.dir,
    quantity,
    sweep,
    stamp16: /^\d{16}$/.test(stamp16) ? stamp16 : `${stamp}00`,
    stamp,
    timeMs,
    url: item.url || options.urlForName?.(name, { site, productDir: product.dir, quantity, item }) || `${dwdProductSweepListingUrl(site.id, product.dir, item.variant || options.variant || "unfiltered", options)}${encodeURIComponent(name)}`,
    index: Number.isFinite(Number(item.index)) ? Number(item.index) : index,
    volumeTime: item.volumeTime || volumeTimeFromInternationalIdentity(stamp),
    site: cloneCatalogRecord(site),
  };
}

function dwdProductByDir(productDir) {
  return DWD_SWEEP_PRODUCTS.find((product) => product.dir === validateDwdProductDir(productDir));
}

function dwdQuantityFromName(name, product) {
  const value = String(name || "").toLowerCase();
  return product.quantities.find((quantity) => value.includes(`_sweeph5onem_${quantity}_`)) || null;
}

function dwdCycleAnchors(sweeps) {
  const lastSweep = Math.max(...sweeps.map((sweep) => sweep.sweep).filter((sweep) => Number.isInteger(sweep)));
  if (!Number.isFinite(lastSweep)) return [];
  const anchors = sweeps
    .filter((sweep) => sweep.sweep === lastSweep)
    .map((sweep) => sweep.timeMs)
    .filter((timeMs) => Number.isFinite(timeMs));
  return [...new Set(anchors)].sort((left, right) => left - right);
}

function dwdSweepsInCycle(sweeps, anchorMs) {
  const windowStart = anchorMs - DWD_CYCLE_WINDOW_MINUTES * 60_000;
  const newestBySweep = new Map();
  for (const sweep of sweeps) {
    if (!Number.isFinite(sweep.timeMs) || sweep.timeMs <= windowStart || sweep.timeMs > anchorMs) continue;
    const existing = newestBySweep.get(sweep.sweep);
    if (!existing || sweep.timeMs > existing.timeMs) newestBySweep.set(sweep.sweep, sweep);
  }
  return [...newestBySweep.values()].sort((left, right) => left.sweep - right.sweep);
}

function dwdPlanForAnchor(site, anchorMs, sweepsByProduct, options = {}) {
  const includedProducts = dwdIncludedProducts(options);
  const parts = [];
  const sourceProducts = [];
  for (const product of includedProducts) {
    const sweeps = sweepsByProduct.get(product.dir) || [];
    const chosen = dwdSweepsInCycle(sweeps, anchorMs);
    if (product.required && !chosen.length) {
      throw new Error(`DWD ${product.dir}/${site.id}: no sweeps inside cycle ending ${formatUtcYmdHmsFromMs(anchorMs)}`);
    }
    if (!chosen.length) continue;
    for (const sweep of chosen) parts.push({ url: sweep.url });
    sourceProducts.push({
      productDir: product.dir,
      quantity: chosen[0]?.quantity || product.quantities[0],
      sweepCount: chosen.length,
      sweeps: chosen.map(cloneCatalogRecord),
    });
  }
  const anchorStamp = formatUtcYmdHmsFromMs(anchorMs);
  const identity = `dwd-${site.id}-${anchorStamp}-p${parts.length}-${hashString(parts.map((part) => part.url).join("\n"))}`;
  return makeInternationalFramePlan({
    providerId: "dwd",
    providerLabel: "DWD Germany",
    site,
    identity,
    parts,
    merge: true,
    format: "odim-h5",
    volumeTime: volumeTimeFromInternationalIdentity(anchorStamp),
    sourceItem: {
      anchor: anchorStamp,
      products: sourceProducts,
    },
  });
}

async function latestDwdFramePlan(siteId, options = {}) {
  const plans = await recentDwdFramePlans(siteId, 1, options);
  return plans[plans.length - 1];
}

async function recentDwdFramePlans(siteId, count, options = {}) {
  const site = resolveDwdInternationalSite(siteId);
  if (options.sweepsByProduct) {
    return dwdFramePlansFromProductSweeps(site.id, options.sweepsByProduct, { ...options, count });
  }

  const sweepsByProduct = {};
  const errors = [];
  for (const product of dwdIncludedProducts(options)) {
    try {
      const resolved = await resolveDwdProductSweepListing(site.id, product, options);
      sweepsByProduct[product.dir] = parseDwdSweepListing(site.id, product.dir, resolved.quantity, resolved.text, {
        ...options,
        baseUrl: resolved.dirUrl,
        variant: resolved.variant,
      });
    } catch (error) {
      if (product.required) throw error;
      errors.push(error);
    }
  }

  const plans = dwdFramePlansFromProductSweeps(site.id, sweepsByProduct, { ...options, count });
  if (!plans.length) {
    const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
    throw new Error(`DWD ${site.id}: no sweep-volume frame plans${suffix}`);
  }
  return plans;
}

function dwdIncludedProducts(options = {}) {
  if (options.products) {
    const wanted = new Set((Array.isArray(options.products) ? options.products : [options.products]).map(validateDwdProductDir));
    return DWD_SWEEP_PRODUCTS.filter((product) => wanted.has(product.dir));
  }
  return DWD_SWEEP_PRODUCTS.filter((product) => product.required || Boolean(options.includeDualPol));
}

async function resolveDwdProductSweepListing(siteId, product, options = {}) {
  const stationUrl = dwdProductStationCatalogUrl(siteId, product.dir, options);
  const stationEntries = parseAutoIndexListing(await fetchText(stationUrl, options));
  let dirUrl;
  let variant;
  if (stationEntries.some((entry) => entry.isDir && entry.name === "unfiltered")) {
    variant = "unfiltered";
    dirUrl = dwdProductSweepListingUrl(siteId, product.dir, variant, options);
  } else if (stationEntries.some((entry) => entry.isDir && entry.name === "hdf5")) {
    const hdf5Url = dwdProductHdf5CatalogUrl(siteId, product.dir, options);
    const hdf5Entries = parseAutoIndexListing(await fetchText(hdf5Url, options));
    const filter = ["filter_polarimetric", "filter_simple"].find((name) => hdf5Entries.some((entry) => entry.isDir && entry.name === name));
    if (!filter) throw new Error(`DWD filter dir ${hdf5Url}: no filter_* subdirectory`);
    variant = `hdf5/${filter}`;
    dirUrl = dwdProductSweepListingUrl(siteId, product.dir, variant, options);
  } else {
    throw new Error(`DWD station dir ${stationUrl}: neither unfiltered/ nor hdf5/ present`);
  }

  const text = await fetchText(dirUrl, options);
  const entries = parseAutoIndexListing(text);
  const quantity = product.quantities.find((candidate) => entries.some((entry) => entry.name.includes(`_sweeph5onem_${candidate}_`)));
  if (!quantity) throw new Error(`DWD sweep listing ${dirUrl}: none of the quantities ${product.quantities.join(", ")} present`);
  return { dirUrl, variant, quantity, text };
}

function normalizeChmiFileItem(site, productDir, entry, index, options = {}) {
  const name = String(entry?.name || "").trim();
  const segments = name.split("_");
  if (segments[0] !== "T") return null;
  const bulletin = segments[1] || "";
  const task = bulletin.charAt(3);
  if (!/^[A-Z]$/.test(task)) return null;
  const stamp = (name.match(/(\d{14})(?!\d)/) || [])[1] || "";
  const timeMs = utcMsFromCompactStamp(stamp);
  if (!stamp || !Number.isFinite(timeMs)) return null;
  return {
    name,
    productDir,
    task,
    stamp,
    timeMs,
    url: options.urlForName?.(name, { site, productDir, task, entry })
      || entry.url
      || `${chmiProductHdf5ListingUrl(site.id, productDir, options)}${encodeURIComponent(name)}`,
    index,
    volumeTime: volumeTimeFromInternationalIdentity(stamp),
    site: cloneCatalogRecord(site),
  };
}

function normalizeChmiFilesByProduct(filesByProduct, site, options = {}) {
  const map = new Map();
  const entries = filesByProduct instanceof Map
    ? [...filesByProduct.entries()]
    : Object.entries(filesByProduct || {});
  for (const [rawProductDir, rawItems] of entries) {
    const productDir = validateChmiProductDir(rawProductDir);
    const items = (Array.isArray(rawItems) ? rawItems : [])
      .map((item, index) => normalizeChmiExistingFileItem(site, productDir, item, index, options))
      .filter(Boolean)
      .sort((left, right) => left.timeMs - right.timeMs || chmiTaskRank(left.task) - chmiTaskRank(right.task) || left.name.localeCompare(right.name));
    map.set(productDir, items);
  }
  return map;
}

function normalizeChmiExistingFileItem(site, productDir, item, index, options = {}) {
  if (!item || typeof item !== "object") return null;
  const name = String(item.name || item.fileName || item.key || "").trim();
  if (name) {
    const parsed = normalizeChmiFileItem(site, productDir, { name, url: item.url }, Number.isFinite(Number(item.index)) ? Number(item.index) : index, options);
    if (parsed) return { ...parsed, url: item.url || parsed.url };
  }

  const task = String(item.task || "").trim().toUpperCase();
  const stamp = String(item.stamp || "").trim();
  const timeMs = Number.isFinite(Number(item.timeMs)) ? Number(item.timeMs) : utcMsFromCompactStamp(stamp);
  if (!name || !/^[A-Z]$/.test(task) || !/^\d{14}$/.test(stamp) || !Number.isFinite(timeMs)) return null;
  return {
    name,
    productDir,
    task,
    stamp,
    timeMs,
    url: item.url || options.urlForName?.(name, { site, productDir, task, item }) || `${chmiProductHdf5ListingUrl(site.id, productDir, options)}${encodeURIComponent(name)}`,
    index: Number.isFinite(Number(item.index)) ? Number(item.index) : index,
    volumeTime: item.volumeTime || volumeTimeFromInternationalIdentity(stamp),
    site: cloneCatalogRecord(site),
  };
}

function chmiFrameAnchors(files) {
  if (!files.length) return [];
  const latest = Math.max(...files.map((file) => file.timeMs).filter((timeMs) => Number.isFinite(timeMs)));
  let anchors = files
    .filter((file) => file.task === "B")
    .map((file) => file.timeMs)
    .filter((timeMs) => Number.isFinite(timeMs));
  if (!anchors.length) {
    anchors = files.map((file) => file.timeMs).filter((timeMs) => Number.isFinite(timeMs));
  }
  if (Number.isFinite(latest) && anchors.length && latest > Math.max(...anchors)) {
    anchors = [...anchors, latest];
  }
  return [...new Set(anchors)].sort((left, right) => left - right);
}

function chmiFreshestPerTask(files, anchorMs) {
  const windowStart = anchorMs - CHMI_FRESHNESS_WINDOW_MINUTES * 60_000;
  const newestByTask = new Map();
  for (const file of files) {
    if (!Number.isFinite(file.timeMs) || file.timeMs < windowStart || file.timeMs > anchorMs) continue;
    const existing = newestByTask.get(file.task);
    if (!existing || file.timeMs > existing.timeMs) newestByTask.set(file.task, file);
  }
  return [...newestByTask.values()].sort((left, right) => chmiTaskRank(left.task) - chmiTaskRank(right.task) || left.timeMs - right.timeMs);
}

function chmiTaskRank(task) {
  if (task === "Z") return 0;
  if (task === "B") return 1;
  if (task === "A") return 2;
  return 3;
}

function chmiPlanForAnchor(site, anchorMs, filesByProduct, options = {}) {
  const includedProducts = chmiIncludedProducts(options);
  const picks = [];
  const sourceProducts = [];
  for (const [productRank, product] of includedProducts.entries()) {
    const files = filesByProduct.get(product.dir) || [];
    const chosen = chmiFreshestPerTask(files, anchorMs);
    if (product.required && !chosen.length) {
      throw new Error(`CHMI ${product.dir}/${site.id}: no task files inside frame ending ${formatUtcYmdHmsFromMs(anchorMs)}`);
    }
    if (!chosen.length) continue;
    for (const file of chosen) picks.push({ productRank, file });
    sourceProducts.push({
      productDir: product.dir,
      taskCount: chosen.length,
      files: chosen.map(cloneCatalogRecord),
    });
  }
  picks.sort((left, right) =>
    chmiTaskRank(left.file.task) - chmiTaskRank(right.file.task)
    || left.productRank - right.productRank
    || left.file.name.localeCompare(right.file.name)
  );
  const parts = picks.map(({ file }) => ({ url: file.url }));
  const anchorStamp = formatUtcYmdHmsFromMs(anchorMs);
  const identity = `chmi-${site.id}-${anchorStamp}-p${parts.length}-${hashString(parts.map((part) => part.url).join("\n"))}`;
  return makeInternationalFramePlan({
    providerId: "chmi",
    providerLabel: "CHMI Czechia",
    site,
    identity,
    parts,
    merge: true,
    format: "odim-h5",
    volumeTime: volumeTimeFromInternationalIdentity(anchorStamp),
    sourceItem: {
      anchor: anchorStamp,
      products: sourceProducts,
    },
  });
}

async function latestChmiFramePlan(siteId, options = {}) {
  const plans = await recentChmiFramePlans(siteId, 1, options);
  return plans[plans.length - 1];
}

async function recentChmiFramePlans(siteId, count, options = {}) {
  const site = resolveChmiInternationalSite(siteId);
  if (options.filesByProduct) {
    return chmiFramePlansFromProductFiles(site.id, options.filesByProduct, { ...options, count });
  }

  const availableProducts = await chmiAvailableProducts(site.id, options);
  const wantedProducts = chmiIncludedProducts(options).filter((product) => availableProducts.includes(product.dir));
  for (const product of chmiIncludedProducts(options).filter((item) => item.required)) {
    if (!availableProducts.includes(product.dir)) {
      throw new Error(`CHMI ${site.id}: required product directory ${product.dir} is missing`);
    }
  }

  const filesByProduct = {};
  const errors = [];
  for (const product of wantedProducts) {
    try {
      const url = chmiProductHdf5ListingUrl(site.id, product.dir, options);
      filesByProduct[product.dir] = parseChmiFileListing(site.id, product.dir, await fetchText(url, options), {
        ...options,
        baseUrl: url,
      });
    } catch (error) {
      if (product.required) throw error;
      errors.push(error);
    }
  }

  const plans = chmiFramePlansFromProductFiles(site.id, filesByProduct, { ...options, count });
  if (!plans.length) {
    const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
    throw new Error(`CHMI ${site.id}: no task-volume frame plans${suffix}`);
  }
  return plans;
}

function chmiIncludedProducts(options = {}) {
  if (options.products) {
    const wanted = new Set((Array.isArray(options.products) ? options.products : [options.products]).map(validateChmiProductDir));
    return CHMI_PRODUCTS.filter((product) => wanted.has(product.dir));
  }
  if (options.includeDualPol === false) return CHMI_PRODUCTS.filter((product) => product.required);
  return CHMI_PRODUCTS;
}

async function chmiAvailableProducts(siteId, options = {}) {
  if (options.products) return chmiIncludedProducts(options).map((product) => product.dir);
  const entries = parseAutoIndexListing(await fetchText(chmiSiteCatalogUrl(siteId, options), options));
  return entries
    .filter((entry) => entry.isDir)
    .map((entry) => String(entry.name || "").trim().toLowerCase())
    .filter((name) => CHMI_PRODUCTS.some((product) => product.dir === name));
}

async function latestJmaFramePlan(siteId, options = {}) {
  const plans = await recentJmaFramePlans(siteId, 1, options);
  return plans[plans.length - 1];
}

async function recentJmaFramePlans(siteId, count, options = {}) {
  const site = resolveJmaInternationalSite(siteId);
  const product = validateJmaProduct(options.jmaProduct || options.sourceProduct || JMA_REFLECTIVITY_PRODUCT);
  const explicitStamps = options.stamps
    ? (Array.isArray(options.stamps) ? options.stamps : [options.stamps])
    : null;
  const stamps = explicitStamps
    ? explicitStamps.map(normalizeJmaStamp)
    : jmaCandidateStamps(options.now || new Date(), options);
  const maxCount = clampInt(count, 1, 200);
  const plans = [];
  const errors = [];
  for (const stamp of stamps) {
    const url = jmaTarUrl(product, stamp, options);
    try {
      if (options.probe === false || await jmaTarExists(url, options)) {
        plans.push(jmaFramePlanFromStamp(site.id, stamp, { ...options, product }));
        if (plans.length >= maxCount) break;
      }
    } catch (error) {
      errors.push(error);
    }
  }
  if (!plans.length) {
    const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
    throw new Error(`JMA: no ${product} tar reachable for site '${site.id}' in the requested stamp window${suffix}`);
  }
  return plans.reverse();
}

async function jmaTarExists(url, options = {}) {
  if (typeof options.exists === "function") {
    return Boolean(await options.exists(url));
  }
  const fetcher = options.fetch || globalThis.fetch;
  if (typeof fetcher !== "function") throw new Error("fetch is not available in this environment");
  const response = await fetcher(url, {
    ...(options.fetchOptions || {}),
    ...(options.headFetchOptions || {}),
    method: "HEAD",
    cache: options.cache ?? "no-store",
  });
  if (response?.ok) return true;
  if ((response?.status === 405 || response?.status === 501) && options.allowGetProbe) {
    const getResponse = await fetcher(url, {
      ...(options.fetchOptions || {}),
      method: "GET",
      cache: options.cache ?? "no-store",
      headers: {
        Range: "bytes=0-0",
        ...(options.fetchOptions?.headers || {}),
      },
    });
    return Boolean(getResponse?.ok);
  }
  if (response?.status === 404 || response?.status === 403) return false;
  if (Number(response?.status || 0) >= 500) throw new Error(`${response.status} ${response.statusText || "JMA probe failed"}: ${url}`);
  return false;
}

async function latestOrdFramePlan(siteId, options = {}) {
  const plans = await recentOrdFramePlans(siteId, 1, options);
  return plans[plans.length - 1];
}

async function recentOrdFramePlans(siteId, count, options = {}) {
  const site = resolveOrdInternationalSite(siteId);
  const maxCount = clampInt(count, 1, 200);
  const explicit = ordFramePlansFromExplicitSources(site, maxCount, options);
  if (explicit) return explicit;

  const kinds = ordObjectKinds(site.id, options);
  const lookbackSlots = clampInt(options.hourLookbackSlots ?? ORD_HOUR_LOOKBACK_SLOTS, 0, 48);
  const newestHourMs = ordHourMs(options.now || new Date());
  const errors = [];

  for (const kind of kinds) {
    const keys = [];
    const seen = new Set();
    for (let slot = 0; slot <= lookbackSlots; slot += 1) {
      const hourMs = newestHourMs - slot * 60 * 60_000;
      let hourKeys = [];
      try {
        hourKeys = await fetchOrdHourKeys(site.id, kind, hourMs, options);
        ordAddUniqueKeys(keys, seen, hourKeys);
        if (hourKeys.length) {
          ordAddUniqueKeys(keys, seen, await fetchOrdHourKeys(site.id, kind, hourMs - 60 * 60_000, options));
          const plans = ordFramePlansFromKeys(site.id, kind, keys, { ...options, count: maxCount });
          if (plans.length) return plans.slice(-maxCount);
        }
      } catch (error) {
        errors.push(error);
        if (options.strict !== false) throw error;
      }
    }
  }

  const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
  throw new Error(`ORD: no files for site '${site.id}' in the requested hour window${suffix}`);
}

function ordFramePlansFromExplicitSources(site, maxCount, options = {}) {
  const entries = [];
  if (options.keysByKind) {
    entries.push(...Object.entries(options.keysByKind));
  }
  if (options.listingsByKind) {
    entries.push(...Object.entries(options.listingsByKind));
  }
  if (options.keys !== undefined || options.listing !== undefined) {
    entries.push([options.objectKind || options.kind || ordObjectKinds(site.id)[0], options.keys ?? options.listing]);
  }
  if (!entries.length) return null;

  const plans = [];
  for (const [rawKind, keysOrListing] of entries) {
    const kind = validateOrdObjectKind(rawKind);
    plans.push(...ordFramePlansFromKeys(site.id, kind, keysOrListing));
  }
  plans.sort((left, right) =>
    dateMs(left.volumeTime || 0, "ORD plan time") - dateMs(right.volumeTime || 0, "ORD plan time")
    || left.identity.localeCompare(right.identity)
  );
  return plans.slice(-maxCount);
}

async function fetchOrdHourKeys(siteId, objectKind, hourMs, options = {}) {
  const url = ordHourListingUrl(siteId, objectKind, new Date(hourMs), options);
  if (typeof options.listingForHour === "function") {
    const provided = await options.listingForHour({
      siteId,
      objectKind,
      hourMs,
      url,
      prefix: ordHourPrefix(siteId, objectKind, new Date(hourMs)),
    });
    const listing = parseS3StyleListing(provided || { keys: [] });
    if (listing.isTruncated) throw new Error(`ORD '${siteId}': hour listing is truncated for ${objectKind} ${formatUtcYmdHFromMs(hourMs)}`);
    return listing.keys;
  }
  const listing = parseS3StyleListing(await fetchText(url, options));
  if (listing.isTruncated) throw new Error(`ORD '${siteId}': hour listing is truncated for ${objectKind} ${formatUtcYmdHFromMs(hourMs)}`);
  return listing.keys;
}

function ordAddUniqueKeys(target, seen, keys) {
  for (const raw of keys || []) {
    const key = normalizeOrdKeyInput(raw);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    target.push(key);
  }
}

function normalizeOrdKeys(keysOrListing) {
  if (keysOrListing === undefined || keysOrListing === null) return [];
  if (Array.isArray(keysOrListing)) return keysOrListing.map(normalizeOrdKeyInput).filter(Boolean);
  if (typeof keysOrListing === "string") {
    const text = keysOrListing.trim();
    if (!text) return [];
    if (text.includes("<") && text.includes(">")) return parseS3StyleListing(text).keys.map(normalizeOrdKeyInput).filter(Boolean);
    if (text.includes("\n")) return text.split(/\r?\n/).map(normalizeOrdKeyInput).filter(Boolean);
    return [normalizeOrdKeyInput(text)].filter(Boolean);
  }
  return parseS3StyleListing(keysOrListing).keys.map(normalizeOrdKeyInput).filter(Boolean);
}

function normalizeOrdKeyInput(input) {
  const raw = input && typeof input === "object"
    ? String(input.key ?? input.Key ?? input.url ?? input.href ?? "").trim()
    : String(input || "").trim();
  if (!raw) return "";
  let value = raw;
  if (/^https?:\/\//i.test(value)) {
    try {
      value = new URL(value).pathname.replace(/^\/+/, "");
      value = decodeURIComponent(value);
    } catch {
      value = raw;
    }
  }
  const match = value.match(/(\d{4}\/\d{2}\/\d{2}\/[A-Z]{2}\/[a-z0-9]+\/(?:PVOL|SCAN)\/[^?#]+?\.h5)$/i);
  return match ? match[1] : value.replace(/^\/+/, "");
}

function normalizeOrdFile(siteId, keyOrObject) {
  const site = validateOrdSiteId(siteId);
  const key = normalizeOrdKeyInput(keyOrObject);
  const match = key.match(/^(\d{4})\/(\d{2})\/(\d{2})\/([A-Z]{2})\/([a-z0-9]+)\/(PVOL|SCAN)\/([a-z0-9]+)@(\d{8}T\d{4})@([^@]+)@([^@]+)\.h5$/i);
  if (!match) return null;
  const [, yyyy, mm, dd, countryDir, pathSite, objectKind, fileSite, stamp, elevationText, momentText] = match;
  if (pathSite.toLowerCase() !== site || fileSite.toLowerCase() !== site) return null;
  if (`${yyyy}${mm}${dd}` !== stamp.slice(0, 8)) return null;
  const timeMs = utcMsFromOrdStamp(stamp);
  if (!Number.isFinite(timeMs)) return null;
  const elevations = elevationText.split("_").map(Number).filter((item) => Number.isFinite(item));
  const moments = momentText.split("_").map((item) => item.trim().toUpperCase()).filter(Boolean);
  if (!elevations.length || !moments.length) return null;
  const country = ordCountryForCode(site);
  if (country.dir !== countryDir.toUpperCase()) return null;
  return {
    key,
    fileName: key.split("/").pop() || key,
    siteId: site,
    country: country.country,
    countryCode: country.dir,
    objectKind: validateOrdObjectKind(objectKind),
    stamp,
    timeMs,
    volumeTime: ordVolumeTimeFromStamp(stamp),
    elevations,
    elevationText,
    elevationCount: elevations.length,
    firstElevationDeg: elevations[0],
    moments,
    momentText: moments.join("_"),
    momentRank: ordMomentRank(moments),
    hasFilteredReflectivity: moments.some((moment) => moment === "DBZH" || moment === "DBZV"),
    unfilteredReflectivityOnly: moments.every((moment) => moment === "TH" || moment === "TV"),
  };
}

function ordPlanForAnchor(site, objectKind, files, anchorMs, options = {}) {
  const windowStartMs = anchorMs - ORD_CYCLE_WINDOW_MINUTES * 60_000;
  const freshestByGroup = new Map();
  for (const file of files) {
    if (!Number.isFinite(file.timeMs) || file.timeMs <= windowStartMs || file.timeMs > anchorMs) continue;
    const group = objectKind === "PVOL" ? file.momentText : `${file.momentText}@${file.elevationText}`;
    const existing = freshestByGroup.get(group);
    if (!existing || ordFileSortValue(file, existing) > 0) freshestByGroup.set(group, file);
  }

  let chosen = [...freshestByGroup.values()];
  const filteredReflectivityElevations = new Set(
    chosen
      .filter((file) => file.hasFilteredReflectivity)
      .map((file) => file.elevationText),
  );
  chosen = chosen.filter((file) => !(file.unfilteredReflectivityOnly && filteredReflectivityElevations.has(file.elevationText)));
  chosen.sort((left, right) =>
    left.momentRank - right.momentRank
    || right.elevationCount - left.elevationCount
    || left.firstElevationDeg - right.firstElevationDeg
    || left.key.localeCompare(right.key)
  );
  if (!chosen.length) throw new Error(`ORD ${site.id}: no ${objectKind} parts inside cycle ending ${formatOrdStampFromMs(anchorMs)}`);

  const anchor = formatOrdStampFromMs(anchorMs);
  const identity = `${site.id}_${anchor}_p${chosen.length}_h${fnv1a64Hex(chosen.map((file) => file.key).join("\n"))}`;
  const baseUrl = ordBucketBaseUrl(options);
  return makeInternationalFramePlan({
    providerId: "ord",
    providerLabel: "EUMETNET ORD",
    site,
    identity,
    parts: chosen.map((file) => ({ url: `${baseUrl}/${encodeUrlPath(file.key)}` })),
    merge: chosen.length > 1,
    format: "odim-h5",
    volumeTime: ordVolumeTimeFromStamp(anchor),
    sourceItem: {
      objectKind,
      anchor,
      cycleWindowMinutes: ORD_CYCLE_WINDOW_MINUTES,
      files: chosen.map(cloneCatalogRecord),
    },
  });
}

function ordFileSortValue(candidate, existing) {
  if (candidate.timeMs !== existing.timeMs) return candidate.timeMs - existing.timeMs;
  if (candidate.elevationCount !== existing.elevationCount) return candidate.elevationCount - existing.elevationCount;
  return candidate.key.localeCompare(existing.key);
}

function ordMomentRank(moments) {
  const values = Array.isArray(moments) ? moments : String(moments || "").split("_");
  const normalized = values.map((moment) => String(moment || "").trim().toUpperCase()).filter(Boolean);
  if (normalized.some((moment) => moment === "DBZH" || moment === "DBZV")) return 0;
  if (normalized.some((moment) => moment === "TH" || moment === "TV")) return 1;
  if (normalized.length && normalized.every((moment) => moment.startsWith("V") || moment.startsWith("W"))) return 3;
  return 2;
}

function ordCountryForCode(siteId) {
  const prefix = validateOrdSiteId(siteId).slice(0, 2);
  const entry = ORD_COUNTRIES.find(([code]) => code === prefix);
  if (!entry) throw new Error(`ORD: unknown country prefix '${prefix}'`);
  return { prefix: entry[0], dir: entry[1], country: entry[2] };
}

function ordHourMs(value) {
  const timeMs = dateMs(value, "ORD hour");
  return Math.floor(timeMs / 60 / 60_000) * 60 * 60_000;
}

function ordDatePrefixFromMs(timeMs) {
  const date = new Date(timeMs);
  return `${date.getUTCFullYear()}/${pad2(date.getUTCMonth() + 1)}/${pad2(date.getUTCDate())}/`;
}

function utcMsFromOrdStamp(stamp) {
  const value = String(stamp || "");
  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);
  if (!match) return NaN;
  return Date.UTC(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
    0,
  );
}

function formatUtcYmdHFromMs(timeMs) {
  const date = new Date(timeMs);
  return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}T${pad2(date.getUTCHours())}`;
}

function formatOrdStampFromMs(timeMs) {
  const date = new Date(timeMs);
  return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}`;
}

function ordVolumeTimeFromStamp(stamp) {
  const value = String(stamp || "");
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(9, 11)}:${value.slice(11, 13)}:00Z`;
}

function utcMsFromCompactStamp(stamp) {
  const value = String(stamp || "");
  if (!/^\d{14}$/.test(value)) return NaN;
  return Date.UTC(
    Number(value.slice(0, 4)),
    Number(value.slice(4, 6)) - 1,
    Number(value.slice(6, 8)),
    Number(value.slice(8, 10)),
    Number(value.slice(10, 12)),
    Number(value.slice(12, 14)),
  );
}

function formatUtcYmdHmsFromMs(timeMs) {
  const date = new Date(timeMs);
  return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}`;
}

function normalizeJmaStamp(value) {
  if (typeof value === "string") {
    const raw = value.trim();
    if (/^\d{14}$/.test(raw)) return raw;
    if (/^\d{12}$/.test(raw)) return `${raw}00`;
  }
  return formatUtcYmdHmsFromMs(dateMs(value, "JMA stamp"));
}

function normalizeByteInput(bytes) {
  if (bytes instanceof Uint8Array) return bytes;
  if (bytes instanceof ArrayBuffer) return new Uint8Array(bytes);
  if (ArrayBuffer.isView(bytes)) return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  throw new Error("expected bytes as Uint8Array, ArrayBuffer, or typed-array view");
}

function readUint16(bytes, offset) {
  if (offset < 0 || offset + 2 > bytes.byteLength) throw new Error("unexpected end of ZIP data");
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint32(bytes, offset) {
  if (offset < 0 || offset + 4 > bytes.byteLength) throw new Error("unexpected end of ZIP data");
  return (
    bytes[offset]
    | (bytes[offset + 1] << 8)
    | (bytes[offset + 2] << 16)
    | (bytes[offset + 3] << 24)
  ) >>> 0;
}

function findZipEndOfCentralDirectory(bytes) {
  if (bytes.byteLength < 22) throw new Error("ZIP archive is too small");
  const minOffset = Math.max(0, bytes.byteLength - 22 - 0xffff);
  for (let offset = bytes.byteLength - 22; offset >= minOffset; offset -= 1) {
    if (readUint32(bytes, offset) === 0x06054b50) return offset;
  }
  throw new Error("ZIP end-of-central-directory record not found");
}

function zipEntryAllowed(entry, options = {}) {
  if (!entry || entry.directory) return false;
  if (entry.encrypted && options.allowEncrypted !== true) return false;
  if (typeof options.filter === "function" && !options.filter(entry)) return false;
  if (options.pattern && !(new RegExp(options.pattern, "i")).test(entry.name)) return false;
  return true;
}

function mobileArchiveZipEntryAllowed(entry) {
  if (!entry || entry.directory || entry.encrypted) return false;
  const name = String(entry.name || "").replace(/\\/g, "/");
  const fileName = name.split("/").filter(Boolean).pop() || "";
  if (!fileName || name.includes("__MACOSX/") || fileName.startsWith(".")) return false;
  const ext = fileName.includes(".") ? fileName.split(".").pop().toLowerCase() : "";
  if (["txt", "md", "csv", "json", "xml", "png", "jpg", "jpeg", "gif", "kml", "kmz", "html", "htm", "log"].includes(ext)) return false;
  return true;
}

async function extractZipEntryBytes(bytes, entry) {
  if (entry.encrypted) throw new Error(`ZIP entry '${entry.name}' is encrypted`);
  const local = entry.localHeaderOffset;
  if (readUint32(bytes, local) !== 0x04034b50) throw new Error(`ZIP entry '${entry.name}' has an invalid local header`);
  const nameLength = readUint16(bytes, local + 26);
  const extraLength = readUint16(bytes, local + 28);
  const dataOffset = local + 30 + nameLength + extraLength;
  const compressed = bytes.subarray(dataOffset, dataOffset + entry.compressedSize);
  if (compressed.byteLength !== entry.compressedSize) throw new Error(`ZIP entry '${entry.name}' is truncated`);
  if (entry.compressionMethod === 0) return new Uint8Array(compressed);
  if (entry.compressionMethod === 8) {
    const inflated = await inflateRawDeflate(compressed, entry.name);
    if (entry.uncompressedSize && inflated.byteLength !== entry.uncompressedSize) {
      throw new Error(`ZIP entry '${entry.name}' inflated to ${inflated.byteLength} bytes, expected ${entry.uncompressedSize}`);
    }
    return inflated;
  }
  throw new Error(`ZIP entry '${entry.name}' uses unsupported compression method ${entry.compressionMethod}`);
}

async function inflateRawDeflate(bytes, name = "entry") {
  if (typeof DecompressionStream !== "function" || typeof Blob !== "function" || typeof Response !== "function") {
    throw new Error(`ZIP entry '${name}' is deflated; this environment lacks DecompressionStream('deflate-raw')`);
  }
  try {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch (error) {
    throw new Error(`failed to inflate ZIP entry '${name}': ${error.message || error}`);
  }
}

function dosDateTimeToIso(dateValue, timeValue) {
  if (!dateValue && !timeValue) return null;
  const year = 1980 + ((dateValue >> 9) & 0x7f);
  const month = (dateValue >> 5) & 0x0f;
  const day = dateValue & 0x1f;
  const hour = (timeValue >> 11) & 0x1f;
  const minute = (timeValue >> 5) & 0x3f;
  const second = (timeValue & 0x1f) * 2;
  if (!month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).toISOString();
}

function dateMs(value, label = "date") {
  const date = value instanceof Date ? value : new Date(value);
  const timeMs = date.getTime();
  if (Number.isFinite(timeMs)) return timeMs;
  throw new Error(`${label}: invalid date '${value}'`);
}

function isPlainOptionsObject(value) {
  return Boolean(value && typeof value === "object" && !(value instanceof Date) && !ArrayBuffer.isView(value));
}

function normalizeS3Content(object) {
  const key = String(object?.key ?? object?.Key ?? "").trim();
  return {
    key,
    size: Number(object?.size ?? object?.Size ?? 0) || 0,
    lastModified: object?.lastModified ?? object?.LastModified ?? null,
    etag: object?.etag ?? object?.ETag ?? null,
  };
}

function normalizeFmiVolumeItem(site, object, index, options = {}) {
  const key = String(object?.key || "").trim();
  const fileName = key.split("/").pop() || key;
  if (!fmiPvolKeyMatches(fileName, site.id)) return null;
  return {
    key,
    fileName,
    siteId: site.id,
    url: options.urlForKey?.(key) || `${trimTrailingSlash(options.baseUrl || FMI_RADAR_VOLUME_BUCKET_URL)}/${encodeUrlPath(key)}`,
    index,
    size: Number(object.size || 0),
    lastModified: object.lastModified || null,
    volumeTime: volumeTimeFromInternationalIdentity(fileName),
    site: cloneCatalogRecord(site),
  };
}

function fmiPvolKeyMatches(fileName, siteId) {
  return String(fileName || "").endsWith(`_${siteId}_PVOL.h5`) && /^\d{12}_/.test(String(fileName || ""));
}

async function latestFmiFramePlan(siteId, options = {}) {
  const site = resolveFmiInternationalSite(siteId);
  const errors = [];
  for (const datePrefix of fmiCandidateDatePrefixes(options)) {
    try {
      const text = await fetchText(fmiRadarVolumeListingUrl(site.id, { ...options, datePrefix }), options);
      const plans = fmiFramePlansFromListing(site.id, text, options);
      if (plans.length) return plans[plans.length - 1];
    } catch (error) {
      errors.push(error);
    }
  }
  const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
  throw new Error(`FMI: no PVOL files for site '${site.id}' today or yesterday (UTC)${suffix}`);
}

async function recentFmiFramePlans(siteId, count, options = {}) {
  const site = resolveFmiInternationalSite(siteId);
  const plans = [];
  const errors = [];
  for (const datePrefix of fmiCandidateDatePrefixes(options)) {
    try {
      const text = await fetchText(fmiRadarVolumeListingUrl(site.id, { ...options, datePrefix }), options);
      plans.push(...fmiFramePlansFromListing(site.id, text, options));
    } catch (error) {
      errors.push(error);
    }
  }
  plans.sort((left, right) => {
    const leftKey = left.sourceItem?.key || left.identity;
    const rightKey = right.sourceItem?.key || right.identity;
    return String(leftKey).localeCompare(String(rightKey));
  });
  const deduped = [];
  const seen = new Set();
  for (const plan of plans) {
    const key = plan.sourceItem?.key || plan.identity;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(plan);
  }
  if (!deduped.length) {
    const suffix = errors.length ? ` (${errors.map((error) => error.message || String(error)).join("; ")})` : "";
    throw new Error(`FMI: no PVOL files for site '${site.id}' today or yesterday (UTC)${suffix}`);
  }
  return deduped.slice(-count);
}

function fmiCandidateDatePrefixes(options = {}) {
  const explicit = options.datePrefixes || options.dates;
  if (explicit) {
    const prefixes = (Array.isArray(explicit) ? explicit : [explicit]).map(fmiDatePrefix);
    return [...new Set(prefixes)];
  }
  const now = options.now ? new Date(options.now) : new Date();
  if (!Number.isFinite(now.getTime())) throw new Error(`FMI: invalid UTC date '${options.now}'`);
  const yesterday = new Date(now.getTime() - 86400_000);
  return [fmiDatePrefix(now), fmiDatePrefix(yesterday)];
}

function xmlElements(xml, name) {
  const pattern = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "gi");
  return [...String(xml || "").matchAll(pattern)].map((match) => match[1]);
}

function xmlElementText(xml, name) {
  const block = xmlElements(xml, name)[0];
  return block === undefined ? "" : unescapeXmlEntities(block.trim());
}

function unescapeXmlEntities(text) {
  return String(text || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function makeInternationalFramePlan({ providerId, providerLabel, site, identity, parts, merge, format, volumeTime, sourceItem }) {
  const normalizedSite = normalizeInternationalSiteDescriptor(site);
  if (!normalizedSite) throw new Error("international frame plan requires a site with lat/lon");
  const normalizedParts = Array.from(parts || [])
    .map((part) => ({ url: String(part?.url || part || "").trim() }))
    .filter((part) => part.url);
  if (!normalizedParts.length) throw new Error("international frame plan requires at least one URL part");
  const id = normalizeInternationalProviderId(providerId);
  if (!id) throw new Error("international frame plan requires a provider id");
  return {
    type: "bowecho-international-frame-plan-v1",
    providerId: id,
    providerLabel: providerLabel || findInternationalRadarProvider(id)?.label || id,
    site: normalizedSite,
    siteId: normalizedSite.id,
    identity: String(identity || "").trim(),
    parts: normalizedParts,
    merge: Boolean(merge),
    format: format || normalizedSite.format || "odim-h5",
    volumeTime: volumeTime || volumeTimeFromInternationalIdentity(identity),
    sourceItem: sourceItem ? cloneCatalogRecord(sourceItem) : null,
  };
}

function normalizeInternationalFramePlan(plan) {
  if (!plan || typeof plan !== "object") throw new Error("international frame plan is required");
  return makeInternationalFramePlan({
    providerId: plan.providerId || plan.provider,
    providerLabel: plan.providerLabel,
    site: plan.site || plan.internationalSite,
    identity: plan.identity,
    parts: plan.parts,
    merge: plan.merge,
    format: plan.format,
    volumeTime: plan.volumeTime,
    sourceItem: plan.sourceItem,
  });
}

function volumeTimeFromInternationalIdentity(identity) {
  const value = String(identity || "");
  const match = value.match(/(\d{14}|\d{12})(?!\d)/);
  if (!match) return null;
  const stamp = match[1];
  const seconds = stamp.length === 14 ? stamp.slice(12, 14) : "00";
  return `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}T${stamp.slice(8, 10)}:${stamp.slice(10, 12)}:${seconds}Z`;
}

function siteDescriptorFromInput(site) {
  if (!site || typeof site !== "object") return null;
  const lat = Number(site.lat ?? site.latitude ?? site.latitudeDeg);
  const lon = Number(site.lon ?? site.lng ?? site.longitude ?? site.longitudeDeg);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const rawId = String(site.id || site.site || site.siteId || "RADAR").trim();
  const id = site.source === "international" || site.providerId ? rawId : rawId.toUpperCase();
  return {
    id,
    name: String(site.name || site.label || id),
    lat,
    lon,
  };
}

function siteDescriptorFromFrame(frame) {
  if (!frame || typeof frame !== "object") return null;
  return siteDescriptorFromInput(frame.internationalSite)
    || siteDescriptorFromInput(frame.feed)
    || siteDescriptorFromInput({
      id: frame.site || frame.internationalSiteId || frame.feedId,
      name: frame.internationalSite?.label || frame.feed?.label,
      lat: frame.siteLocation?.lat,
      lon: frame.siteLocation?.lon,
    });
}

function findCommunityRadarFeed(feedOrId) {
  if (feedOrId && typeof feedOrId === "object") {
    if (feedOrId.feed && typeof feedOrId.feed === "object") return findCommunityRadarFeed(feedOrId.feed);
    if (feedOrId.pollUrl || feedOrId.poll_url) {
      return normalizeCommunityFeedObject(feedOrId);
    }
    if (feedOrId.id || feedOrId.feedId) return findCommunityRadarFeed(feedOrId.id || feedOrId.feedId);
  }
  const id = String(feedOrId || "").trim().toUpperCase();
  if (!id) return null;
  return COMMUNITY_RADAR_FEEDS.find((feed) =>
    String(feed.id).toUpperCase() === id
    || String(feed.label || "").toUpperCase() === id
    || String(feed.pollUrl || "").toUpperCase() === id
  ) || null;
}

function resolveCommunityRadarFeed(feedOrId) {
  const feed = findCommunityRadarFeed(feedOrId);
  if (!feed) throw new Error(`unknown community radar feed: ${feedOrId}`);
  return cloneCatalogRecord(feed);
}

function markerMicrodegreesFromEntry(entry) {
  const hasLatE6 = entry.latE6 !== undefined || entry.lat_e6 !== undefined;
  const hasLonE6 = entry.lonE6 !== undefined || entry.lon_e6 !== undefined;
  if (hasLatE6 || hasLonE6) {
    const latE6 = Number(entry.latE6 ?? entry.lat_e6);
    const lonE6 = Number(entry.lonE6 ?? entry.lon_e6);
    if (!Number.isFinite(latE6) || !Number.isFinite(lonE6)) {
      throw new Error("Custom poll link: enter both latitude and longitude, or leave both blank");
    }
    return { latE6: Math.round(latE6), lonE6: Math.round(lonE6) };
  }
  const latInput = entry.lat ?? entry.latitude;
  const lonInput = entry.lon ?? entry.lng ?? entry.longitude;
  if (latInput !== undefined || lonInput !== undefined) {
    return parseCustomPollMarkerInputs(latInput, lonInput);
  }
  return {
    latE6: CUSTOM_POLL_NO_MARKER_LAT_E6,
    lonE6: CUSTOM_POLL_NO_MARKER_LON_E6,
  };
}

function parseCustomRadarGisLine(rawLine) {
  const raw = String(rawLine || "").trim().replace(/^\uFEFF/, "");
  if (!raw || raw.startsWith(";") || raw.startsWith("#") || raw.startsWith("//")) return null;
  const line = customRadarGisPayload(raw);
  return line.includes(",") ? parseCustomRadarGisCsvLine(line) : parseCustomRadarGisWhitespaceLine(line);
}

function customRadarGisPayload(line) {
  const split = String(line || "").split(/:(.*)/s);
  if (split.length >= 3) {
    const prefix = split[0].trim();
    const rest = split[1].trim();
    if (prefix && rest && !/[\s,]/.test(prefix) && rest.includes(",")) return rest;
  }
  return line;
}

function parseCustomRadarGisCsvLine(line) {
  const fields = String(line || "").split(",").map((field) => field.trim());
  if (fields.length < 4) return null;
  const siteId = fields[0] || "";
  const lat = Number(fields[2]);
  const lon = Number(fields[3]);
  const state = fields[6] || "";
  const name = fields.slice(7).filter(Boolean).join(", ");
  return customGisSiteFromParts(siteId, state, name, lat, lon);
}

function parseCustomRadarGisWhitespaceLine(line) {
  const fields = String(line || "").trim().split(/\s+/).filter(Boolean);
  if (fields.length < 4) return null;
  const siteId = fields[0] || "";
  const lat = Number(fields[2]);
  const lon = Number(fields[3]);
  const state = fields[6] || "";
  const name = fields.slice(7).join(" ");
  return customGisSiteFromParts(siteId, state, name, lat, lon);
}

function customGisSiteFromParts(siteId, state, name, lat, lon) {
  const id = String(siteId || "").trim();
  if (!id || !Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return null;
  }
  const label = String(name || "").trim() || String(state || "").trim() || id;
  return {
    siteId: id,
    site_id: id,
    label,
    lat,
    lon,
    latitude: lat,
    longitude: lon,
    state: String(state || "").trim(),
  };
}

function normalizeCommunityFeedObject(feed) {
  const id = String(feed.id || feed.feedId || feed.site || feed.label || "COMMUNITY").trim().toUpperCase();
  return {
    id,
    label: String(feed.label || feed.name || id),
    state: String(feed.state || feed.region || ""),
    lat: finiteOrNull(feed.lat ?? feed.latitude),
    lon: finiteOrNull(feed.lon ?? feed.lng ?? feed.longitude),
    pollUrl: trimTrailingSlash(feed.pollUrl || feed.poll_url || feed.url || ""),
    cluster: feed.cluster || null,
  };
}

function parseCommunityDirListLine(line, lineNumber, prefix = "") {
  const raw = String(line || "").trim();
  if (!raw) return null;
  const fields = raw.split(/\s+/);
  const name = stripEntryQuotes(fields[fields.length - 1]);
  if (!name || isCommunityMetadataEntry(name)) return null;
  const size = fields.length > 1 && /^\d+$/.test(fields[0]) ? Number(fields[0]) : null;
  const cleanName = trimLeadingSlash(name);
  const path = isAbsoluteUrl(cleanName)
    ? cleanName
    : `${prefix}${cleanName}`;
  const fileName = cleanName.split("/").filter(Boolean).pop() || cleanName;
  return {
    name: cleanName,
    path,
    fileName,
    size,
    line: lineNumber,
    raw,
    volumeTime: volumeTimeFromArchiveId(fileName),
  };
}

function normalizeCommunityEntry(entryOrName) {
  if (entryOrName && typeof entryOrName === "object") return cloneCatalogRecord(entryOrName);
  return { name: String(entryOrName || ""), path: String(entryOrName || "") };
}

function isCommunityMetadataEntry(name) {
  const value = String(name || "").trim();
  if (!value || value.endsWith("/") || value === "." || value === "..") return true;
  const path = value.split(/[?#]/)[0];
  const fileName = path.split("/").filter(Boolean).pop() || path;
  const extension = fileName.includes(".") ? fileName.split(".").pop().toLowerCase() : "";
  return Boolean(extension && COMMUNITY_DIR_METADATA_EXTENSIONS.has(extension));
}

function stripEntryQuotes(value) {
  return String(value || "").replace(/^["']|["']$/g, "");
}

function normalizeCommunityEntryPrefix(prefix) {
  const value = trimLeadingSlash(String(prefix || "").trim());
  return value ? `${value.replace(/\/+$/g, "")}/` : "";
}

function makeCommunityDirListPlan({ feed, baseUrl, directoryUrl, listingUrl, text, entries, prefix, cfgUrl, cfgSites }) {
  return {
    type: "bowecho-community-dir-list-v1",
    feed: cloneCatalogRecord(feed),
    baseUrl,
    directoryUrl,
    listingUrl,
    prefix: prefix || "",
    text,
    entries: entries.map((entry) => ({
      ...cloneCatalogRecord(entry),
      listingUrl,
      directoryUrl,
    })),
    newest: entries.length ? cloneCatalogRecord(entries[entries.length - 1]) : null,
    cfgUrl: cfgUrl || null,
    cfgSites: cfgSites ? [...cfgSites] : [],
  };
}

async function fetchText(url, options = {}) {
  const fetcher = options.fetch || globalThis.fetch;
  if (typeof fetcher !== "function") throw new Error("fetch is not available in this environment");
  const init = {
    cache: options.cache ?? "no-store",
    ...(options.fetchOptions || {}),
  };
  let timeout = null;
  let controller = null;
  if (Number.isFinite(Number(options.timeoutMs)) && typeof AbortController === "function") {
    controller = new AbortController();
    init.signal = controller.signal;
    timeout = setTimeout(() => controller.abort(), Math.max(1, Number(options.timeoutMs)));
  }
  try {
    const response = await fetcher(url, init);
    if (!response?.ok) throw new Error(`${response?.status || 0} ${response?.statusText || "fetch failed"}: ${url}`);
    return response.text();
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function fetchTextMaybe(url, options = {}) {
  const fetcher = options.fetch || globalThis.fetch;
  if (typeof fetcher !== "function") throw new Error("fetch is not available in this environment");
  const init = {
    cache: options.cache ?? "no-store",
    ...(options.fetchOptions || {}),
  };
  let timeout = null;
  let controller = null;
  if (Number.isFinite(Number(options.timeoutMs)) && typeof AbortController === "function") {
    controller = new AbortController();
    init.signal = controller.signal;
    timeout = setTimeout(() => controller.abort(), Math.max(1, Number(options.timeoutMs)));
  }
  try {
    const response = await fetcher(url, init);
    if (response?.ok) {
      return {
        ok: true,
        status: response.status || 200,
        statusText: response.statusText || "OK",
        text: await response.text(),
        url,
      };
    }
    if (response?.status === 404) {
      return {
        ok: false,
        notFound: true,
        status: 404,
        statusText: response.statusText || "Not Found",
        text: "",
        url,
      };
    }
    throw new Error(`${response?.status || 0} ${response?.statusText || "fetch failed"}: ${url}`);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function trimTrailingSlash(value) {
  return String(value || "").trim().replace(/\/+$/g, "");
}

function trimLeadingSlash(value) {
  return String(value || "").trim().replace(/^\/+/g, "");
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(String(value || ""));
}

function encodeUrlPath(path) {
  return String(path || "")
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function joinUrlPath(baseUrl, path) {
  const base = trimTrailingSlash(baseUrl);
  if (!base) throw new Error("community feed frame requires a base URL");
  return `${base}/${encodeUrlPath(path)}`;
}

function splitPaletteLine(line) {
  const colon = line.indexOf(":");
  if (colon >= 0) return { key: line.slice(0, colon), value: line.slice(colon + 1) };
  const match = line.match(/^([A-Za-z][A-Za-z0-9_ -]*)\s+(.+)$/);
  return match ? { key: match[1], value: match[2] } : null;
}

function normalizePaletteKey(key) {
  return String(key || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizePaletteSampleMode(value) {
  const key = String(value || "").trim().toLowerCase();
  if (["false", "no", "off", "0", "step", "stepped", "discrete", "nearest"].includes(key)) return "stepped";
  if (["true", "yes", "on", "1", "smooth", "interp", "interpolate", "interpolated", "linear"].includes(key)) return "interpolated";
  if (["gr", "grpal", "gr-pal", "pal"].includes(key)) return "gr-pal";
  return key || "gr-pal";
}

function parsePaletteStop(key, value, lineNumber) {
  const numbers = paletteNumbers(value);
  const colorSize = key.endsWith("4") ? 4 : 3;
  if (numbers.length < 1 + colorSize) throw new Error(`line ${lineNumber}: not enough color values`);
  const stop = {
    value: numbers[0],
    color: normalizeRgba([...numbers.slice(1, 1 + colorSize), ...(colorSize === 3 ? [255] : [])]),
    endColor: null,
    solid: key.startsWith("solid"),
  };
  if (!stop.solid && numbers.length >= 1 + colorSize * 2) {
    stop.endColor = normalizeRgba([...numbers.slice(1 + colorSize, 1 + colorSize * 2), ...(colorSize === 3 ? [255] : [])]);
  }
  return stop;
}

function parsePaletteColor(value, lineNumber) {
  const numbers = paletteNumbers(value);
  if (numbers.length < 3) throw new Error(`line ${lineNumber}: not enough RGB values`);
  return normalizeRgba(numbers.length >= 4 ? numbers.slice(0, 4) : [...numbers.slice(0, 3), 255]);
}

function paletteNumbers(value) {
  return String(value || "")
    .trim()
    .split(/[,\s]+/)
    .filter(Boolean)
    .map(Number)
    .filter((number) => Number.isFinite(number));
}

function normalizePaletteStops(stops) {
  const byValue = new Map();
  for (const stop of stops || []) {
    const value = Number(stop.value);
    if (!Number.isFinite(value)) continue;
    byValue.set(value, {
      value,
      color: normalizeRgba(stop.color),
      endColor: stop.endColor ? normalizeRgba(stop.endColor) : null,
      solid: Boolean(stop.solid),
    });
  }
  return [...byValue.values()].sort((left, right) => left.value - right.value);
}

function normalizeRgba(color) {
  if (!Array.isArray(color)) throw new Error("palette color must be an array");
  const values = color.slice(0, 4).map((value, index) => {
    const fallback = index === 3 ? 255 : 0;
    const number = Number.isFinite(Number(value)) ? Number(value) : fallback;
    return Math.max(0, Math.min(255, Math.round(number)));
  });
  while (values.length < 4) values.push(values.length === 3 ? 255 : 0);
  return values;
}

function normalizePaletteFamily(familyId) {
  const compact = String(familyId || "generic").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const family = COLOR_TABLE_FAMILIES.find((item) =>
    item.id.toLowerCase() === compact
    || item.label.toLowerCase().replace(/[^a-z0-9]/g, "") === compact
    || String(item.productCode || "").toLowerCase() === compact
  );
  return family?.id || "generic";
}

function parseFiniteNumber(value) {
  const number = Number(String(value || "").trim().split(/[,\s]+/)[0]);
  return Number.isFinite(number) ? number : null;
}

function formatPaletteNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "0";
  return Number.isInteger(number) ? String(number) : Number(number.toFixed(6)).toString();
}

function stablePaletteId(name, family = "generic") {
  const slug = String(name || "palette")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "palette";
  return `${normalizePaletteFamily(family)}:${slug}:${hashString(`${family}:${name}`)}`;
}

function storedPaletteRecord(palette, options = {}) {
  const normalized = clonePalette(palette);
  const now = options.updatedAt || new Date().toISOString();
  return {
    id: normalized.id,
    name: normalized.name,
    family: normalized.family,
    productCode: normalized.productCode,
    sourceName: normalized.sourceName || null,
    createdAt: normalized.createdAt || now,
    updatedAt: normalized.updatedAt || now,
    palette: normalized,
  };
}

function rgbaCss(color) {
  const [r, g, b, a] = normalizeRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${Number((a / 255).toFixed(3))})`;
}

function defaultPaletteStorage() {
  if (typeof localStorage !== "undefined" && localStorage?.getItem && localStorage?.setItem) {
    return localStorage;
  }
  const memory = new Map();
  return {
    getItem: (key) => memory.get(key) || null,
    setItem: (key, value) => memory.set(key, String(value)),
    removeItem: (key) => memory.delete(key),
  };
}

function siteGeoJsonFeature(site) {
  return {
    type: "Feature",
    id: site.id,
    geometry: {
      type: "Point",
      coordinates: [site.lon, site.lat],
    },
    properties: {
      id: site.id,
      name: site.name,
      profilerOnly: PROFILER_SITE_IDS.has(site.id),
    },
  };
}

function globalRadarSiteFeature(site) {
  return {
    type: "Feature",
    id: `${site.source}:${site.providerId}:${site.id}`,
    geometry: {
      type: "Point",
      coordinates: [site.lon, site.lat],
    },
    properties: {
      source: site.source,
      providerId: site.providerId,
      id: site.id,
      label: site.label,
      name: site.name || site.label,
      country: site.country,
      state: site.state || null,
      formats: site.formats || [],
      capabilities: site.capabilities || {},
      feedIds: site.feedIds || undefined,
      feeds: site.feeds || undefined,
    },
  };
}

function colorForGlobalSiteFeature(feature) {
  const source = feature?.properties?.source;
  if (source === "nexrad") return [238, 242, 246, 230];
  if (source === "international") return [255, 191, 74, 230];
  if (source === "community") return [72, 220, 210, 230];
  return [220, 220, 220, 220];
}

function radiusForGlobalSiteFeature(feature) {
  const source = feature?.properties?.source;
  if (source === "nexrad") return 6500;
  if (source === "international") return 7200;
  if (source === "community") return 8500;
  return 6500;
}

function haversineDistanceKm(latA, lonA, latB, lonB) {
  const dLat = degToRad(Number(latB) - Number(latA));
  const dLon = degToRad(Number(lonB) - Number(lonA));
  const aLat = degToRad(Number(latA));
  const bLat = degToRad(Number(latB));
  const a = Math.sin(dLat * 0.5) ** 2
    + Math.cos(aLat) * Math.cos(bLat) * Math.sin(dLon * 0.5) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}

function textureCorner(site, viewport, x, y) {
  const offset = pixelToRadarOffset({ x, y }, viewport);
  const lonLat = radarOffsetToLonLat(site, offset);
  return {
    pixel: [x, y],
    eastKm: offset.eastKm,
    northKm: offset.northKm,
    lon: lonLat.lon,
    lat: lonLat.lat,
    mercator: lonLatToWebMercator(lonLat.lon, lonLat.lat),
  };
}

function analysisFeature(site, frame, analysis, kind, item, properties) {
  const eastKm = finiteOrZero(item.eastKm);
  const northKm = finiteOrZero(item.northKm);
  const lonLat = radarOffsetToLonLat(site, { eastKm, northKm });
  return {
    type: "Feature",
    id: `${kind}:${item.id || `${formatCacheNumber(eastKm)},${formatCacheNumber(northKm)}`}`,
    geometry: {
      type: "Point",
      coordinates: [lonLat.lon, lonLat.lat],
    },
    properties: {
      kind,
      id: item.id || null,
      site: site.id,
      volumeTime: analysis.volumeTime || frame.volumeTime || null,
      frameId: frame.id || null,
      eastKm,
      northKm,
      mercator: lonLatToWebMercator(lonLat.lon, lonLat.lat),
      ...properties,
    },
  };
}

function tdsGateFeature(site, frame, meta, gate, index) {
  const eastKm = finiteOrZero(gate.eastKm);
  const northKm = finiteOrZero(gate.northKm);
  const lonLat = radarOffsetToLonLat(site, { eastKm, northKm });
  return {
    type: "Feature",
    id: `tds:${gate.id || index + 1}`,
    geometry: {
      type: "Point",
      coordinates: [lonLat.lon, lonLat.lat],
    },
    properties: {
      kind: "tds",
      id: gate.id || `T${index + 1}`,
      site: site.id,
      volumeTime: gate.volumeTime || meta?.volumeTime || frame.volumeTime || null,
      frameId: gate.frameId || frame.id || null,
      frameIndex: Number.isFinite(Number(gate.frameIndex)) ? Number(gate.frameIndex) : null,
      eastKm,
      northKm,
      cc: finiteOrNull(gate.cc),
      dbz: finiteOrNull(gate.dbz),
      mercator: lonLatToWebMercator(lonLat.lon, lonLat.lat),
    },
  };
}

function normalizeRadarMapLayer(radarLayer) {
  if (!radarLayer || typeof radarLayer !== "object") throw new Error("radar layer is required");
  if (radarLayer.image?.rgba && radarLayer.quad && radarLayer.corners && radarLayer.bounds) return radarLayer;
  if (radarLayer.rgba && Number.isFinite(Number(radarLayer.width)) && Number.isFinite(Number(radarLayer.height))) {
    return radarTextureLayer(radarLayer, radarLayer.renderOptions || {});
  }
  throw new Error("expected a radarTextureLayer/radarTorTracksLayer result or a rendered frame");
}

function compositeLayerBounds(layers) {
  return {
    west: Math.min(...layers.map((layer) => layer.bounds.west)),
    south: Math.min(...layers.map((layer) => layer.bounds.south)),
    east: Math.max(...layers.map((layer) => layer.bounds.east)),
    north: Math.max(...layers.map((layer) => layer.bounds.north)),
  };
}

function normalizeCompositeBounds(bounds) {
  if (Array.isArray(bounds)) {
    return {
      west: Number(bounds[0]),
      south: Number(bounds[1]),
      east: Number(bounds[2]),
      north: Number(bounds[3]),
    };
  }
  const out = {
    west: Number(bounds?.west),
    south: Number(bounds?.south),
    east: Number(bounds?.east),
    north: Number(bounds?.north),
  };
  if (![out.west, out.south, out.east, out.north].every(Number.isFinite)) {
    throw new Error("composite bounds must be [west, south, east, north] or {west,south,east,north}");
  }
  if (out.east <= out.west || out.north <= out.south) throw new Error("composite bounds must have positive width and height");
  return out;
}

function resolveCompositeGrid(layers, bounds, options = {}) {
  if (Number.isFinite(Number(options.width)) || Number.isFinite(Number(options.height)) || Number.isFinite(Number(options.pixelSize))) {
    const width = clampInt(options.width ?? options.pixelSize ?? options.height, 1, 8192);
    const height = clampInt(options.height ?? options.pixelSize ?? options.width, 1, 8192);
    return {
      width,
      height,
      kmPerPxX: approximateCompositeWidthKm(bounds) / width,
      kmPerPxY: approximateCompositeHeightKm(bounds) / height,
    };
  }
  const targetKmPerPixel = clampNumber(
    options.kmPerPixel ?? Math.min(...layers.map((layer) => {
      const viewport = layerSamplingViewport(layer);
      return Math.min(viewport.kmPerPxX, viewport.kmPerPxY);
    })),
    0.05,
    20,
  );
  const width = Math.max(1, Math.ceil(approximateCompositeWidthKm(bounds) / targetKmPerPixel));
  const height = Math.max(1, Math.ceil(approximateCompositeHeightKm(bounds) / targetKmPerPixel));
  const maxWidth = clampInt(options.maxWidth ?? 4096, 1, 8192);
  const maxHeight = clampInt(options.maxHeight ?? 4096, 1, 8192);
  if ((width > maxWidth || height > maxHeight) && !options.allowDownscale) {
    throw new Error(`composite grid would be ${width}x${height}; pass explicit width/height or allowDownscale:true`);
  }
  const scale = options.allowDownscale ? Math.min(1, maxWidth / width, maxHeight / height) : 1;
  const finalWidth = Math.max(1, Math.floor(width * scale));
  const finalHeight = Math.max(1, Math.floor(height * scale));
  return {
    width: finalWidth,
    height: finalHeight,
    kmPerPxX: approximateCompositeWidthKm(bounds) / finalWidth,
    kmPerPxY: approximateCompositeHeightKm(bounds) / finalHeight,
  };
}

function approximateCompositeWidthKm(bounds) {
  const centerLat = (bounds.north + bounds.south) * 0.5;
  const degrees = Math.abs(bounds.east - bounds.west);
  return Math.max(0.001, degrees * (Math.PI / 180) * EARTH_RADIUS_KM * Math.cos(degToRad(centerLat)));
}

function approximateCompositeHeightKm(bounds) {
  return Math.max(0.001, Math.abs(bounds.north - bounds.south) * (Math.PI / 180) * EARTH_RADIUS_KM);
}

function layerSamplingViewport(layer) {
  if (layer.viewport?.kmPerPxX && layer.viewport?.kmPerPxY) return layer.viewport;
  if (layer.grid?.kmPerPxX && layer.grid?.kmPerPxY) {
    return {
      width: layer.image.width,
      height: layer.image.height,
      radarX: layer.image.width * 0.5,
      radarY: layer.image.height * 0.5,
      rangeKm: Number(layer.grid.halfExtentKm ?? layer.grid.width * layer.grid.kmPerPxX * 0.5),
      kmPerPxX: Number(layer.grid.kmPerPxX),
      kmPerPxY: Number(layer.grid.kmPerPxY),
    };
  }
  const width = Number(layer.image?.width || 1);
  const height = Number(layer.image?.height || 1);
  return {
    width,
    height,
    radarX: width * 0.5,
    radarY: height * 0.5,
    rangeKm: 230,
    kmPerPxX: 460 / width,
    kmPerPxY: 460 / height,
  };
}

function sampleLayerAtLonLat(layer, lon, lat, out) {
  if (lon < layer.bounds.west || lon > layer.bounds.east || lat < layer.bounds.south || lat > layer.bounds.north) return false;
  const viewport = layerSamplingViewport(layer);
  const offset = radarOffsetFromLonLat(layer.site, { lon, lat });
  const x = Math.round(viewport.radarX + offset.eastKm / viewport.kmPerPxX);
  const y = Math.round(viewport.radarY - offset.northKm / viewport.kmPerPxY);
  if (x < 0 || y < 0 || x >= layer.image.width || y >= layer.image.height) return false;
  const index = (y * layer.image.width + x) * 4;
  const rgba = layer.image.rgba;
  out.r = rgba[index];
  out.g = rgba[index + 1];
  out.b = rgba[index + 2];
  out.a = rgba[index + 3];
  return out.a > 0;
}

function blendCompositeSample(out, offset, r, g, b, alpha, blendMode) {
  const sourceAlpha = clampNumber(alpha, 0, 255);
  if (blendMode === "first" && out[offset + 3] > 0) return;
  if (blendMode === "last" || (blendMode === "first" && out[offset + 3] === 0)) {
    out[offset] = r;
    out[offset + 1] = g;
    out[offset + 2] = b;
    out[offset + 3] = Math.round(sourceAlpha);
    return;
  }
  if (blendMode === "max-rgb") {
    const sourceScore = Math.max(r, g, b) * sourceAlpha;
    const destScore = Math.max(out[offset], out[offset + 1], out[offset + 2]) * out[offset + 3];
    if (sourceScore > destScore) {
      out[offset] = r;
      out[offset + 1] = g;
      out[offset + 2] = b;
      out[offset + 3] = Math.round(sourceAlpha);
    }
    return;
  }
  const srcA = sourceAlpha / 255;
  const dstA = out[offset + 3] / 255;
  const outA = srcA + dstA * (1 - srcA);
  if (outA <= 0) return;
  out[offset] = Math.round((r * srcA + out[offset] * dstA * (1 - srcA)) / outA);
  out[offset + 1] = Math.round((g * srcA + out[offset + 1] * dstA * (1 - srcA)) / outA);
  out[offset + 2] = Math.round((b * srcA + out[offset + 2] * dstA * (1 - srcA)) / outA);
  out[offset + 3] = Math.round(outA * 255);
}

function compositeCenterSite(bounds, options = {}) {
  const lon = Number(options.centerLon ?? ((bounds.west + bounds.east) * 0.5));
  const lat = Number(options.centerLat ?? ((bounds.south + bounds.north) * 0.5));
  return {
    id: String(options.siteId || "COMPOSITE").toUpperCase(),
    name: options.siteName || "Radar Composite",
    lon,
    lat,
  };
}

function compositeCorners(site, bounds, width, height) {
  return {
    nw: compositeCorner(site, bounds.west, bounds.north, 0, 0),
    ne: compositeCorner(site, bounds.east, bounds.north, width, 0),
    se: compositeCorner(site, bounds.east, bounds.south, width, height),
    sw: compositeCorner(site, bounds.west, bounds.south, 0, height),
  };
}

function compositeCorner(site, lon, lat, x, y) {
  const offset = radarOffsetFromLonLat(site, { lon, lat });
  return {
    pixel: [x, y],
    eastKm: offset.eastKm,
    northKm: offset.northKm,
    lon,
    lat,
    mercator: lonLatToWebMercator(lon, lat),
  };
}

function countPaintedPixels(rgba, alphaThreshold = 0) {
  let count = 0;
  for (let index = 3; index < rgba.length; index += 4) {
    if (rgba[index] > alphaThreshold) count += 1;
  }
  return count;
}

function commonValue(values) {
  const filtered = values.filter((value) => value !== undefined && value !== null);
  if (!filtered.length) return null;
  return filtered.every((value) => value === filtered[0]) ? filtered[0] : null;
}

function nowMs() {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}

function pixelToRadarOffset(pixel, viewport) {
  const x = Number(pixel.x ?? pixel[0] ?? 0);
  const y = Number(pixel.y ?? pixel[1] ?? 0);
  return {
    eastKm: (x - viewport.radarX) * viewport.kmPerPxX,
    northKm: (viewport.radarY - y) * viewport.kmPerPxY,
  };
}

function normalizeViewport(options = {}) {
  const width = clampInt(options.width ?? options.pixelSize ?? 512, 1, 4096);
  const height = clampInt(options.height ?? options.pixelSize ?? width, 1, 4096);
  const rangeKm = Number(options.rangeKm ?? 230);
  return {
    width,
    height,
    radarX: Number(options.radarX ?? width * 0.5),
    radarY: Number(options.radarY ?? height * 0.5),
    rangeKm,
    kmPerPxX: Number(options.kmPerPxX ?? ((rangeKm * 2) / width)),
    kmPerPxY: Number(options.kmPerPxY ?? ((rangeKm * 2) / height)),
  };
}

function siteDescriptorFromMeta(meta) {
  const location = meta?.siteLocation;
  if (!location || !Number.isFinite(Number(location.lat)) || !Number.isFinite(Number(location.lon))) {
    return null;
  }
  const id = String(meta.site || meta.siteId || "RADAR").toUpperCase();
  return {
    id,
    name: String(meta.siteName || meta.name || id),
    lat: Number(location.lat),
    lon: Number(location.lon),
  };
}

function resolveSiteDescriptor(siteOrId) {
  if (siteOrId && typeof siteOrId === "object" && Number.isFinite(Number(siteOrId.lat)) && Number.isFinite(Number(siteOrId.lon))) {
    const id = String(siteOrId.id || siteOrId.site || "RADAR").trim() || "RADAR";
    return {
      id,
      name: siteOrId.name || String(siteOrId.id || siteOrId.site || "Radar"),
      lat: Number(siteOrId.lat),
      lon: Number(siteOrId.lon),
    };
  }
  const id = normalizeSite(siteOrId);
  const site = SITES.find((item) => item.id === id);
  if (!site) throw new Error(`unknown radar site: ${id}`);
  return { ...site };
}

function frameSummary(frame = {}) {
  return {
    id: frame.id,
    key: frame.key,
    cacheKey: frame.cacheKey,
    source: frame.source,
    complete: frame.complete,
    size: frame.size,
    volumeTime: frame.volumeTime,
    url: frame.url,
    urls: frame.urls ? [...frame.urls] : undefined,
  };
}

function lonLatBounds(points) {
  const lons = points.map((point) => point.lon);
  const lats = points.map((point) => point.lat);
  return {
    west: Math.min(...lons),
    south: Math.min(...lats),
    east: Math.max(...lons),
    north: Math.max(...lats),
  };
}

function mercatorBounds(points) {
  const xs = points.map((point) => point.mercator.x);
  const ys = points.map((point) => point.mercator.y);
  return {
    west: Math.min(...xs),
    south: Math.min(...ys),
    east: Math.max(...xs),
    north: Math.max(...ys),
  };
}

function normalizeTileSize(tileSize) {
  return clampInt(tileSize ?? 512, 64, 8192);
}

function normalizeMapCenter(options = {}) {
  const center = options.center || options.lngLat || options.lonLat;
  let lon = options.centerLon ?? options.lon ?? options.longitude;
  let lat = options.centerLat ?? options.lat ?? options.latitude;
  if (Array.isArray(center)) {
    lon = center[0];
    lat = center[1];
  } else if (center && typeof center === "object") {
    lon = center.lon ?? center.lng ?? center.longitude ?? lon;
    lat = center.lat ?? center.latitude ?? lat;
  }
  return {
    lon: normalizeLon(Number.isFinite(Number(lon)) ? Number(lon) : -97.2777),
    lat: clampNumber(Number.isFinite(Number(lat)) ? Number(lat) : 35.3331, -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT),
  };
}

function normalizePadding(padding) {
  if (Number.isFinite(Number(padding))) {
    const value = Math.max(0, Number(padding));
    return { top: value, right: value, bottom: value, left: value };
  }
  const value = padding && typeof padding === "object" ? padding : {};
  const vertical = Math.max(0, Number(value.y ?? value.vertical ?? 0));
  const horizontal = Math.max(0, Number(value.x ?? value.horizontal ?? 0));
  return {
    top: Math.max(0, Number(value.top ?? vertical ?? 0)),
    right: Math.max(0, Number(value.right ?? horizontal ?? 0)),
    bottom: Math.max(0, Number(value.bottom ?? vertical ?? 0)),
    left: Math.max(0, Number(value.left ?? horizontal ?? 0)),
  };
}

function normalizeAnchor(anchor, width, height) {
  if (Array.isArray(anchor)) {
    return {
      x: clampNumber(Number(anchor[0]), 0, width),
      y: clampNumber(Number(anchor[1]), 0, height),
    };
  }
  const value = anchor && typeof anchor === "object" ? anchor : {};
  return {
    x: clampNumber(Number(value.anchorX ?? value.x ?? width * 0.5), 0, width),
    y: clampNumber(Number(value.anchorY ?? value.y ?? height * 0.5), 0, height),
  };
}

function normalizeGeoBounds(bounds) {
  const source = bounds || {};
  const west = Array.isArray(source) ? source[0] : source.west ?? source.minLon ?? source.left ?? source.xMin;
  const south = Array.isArray(source) ? source[1] : source.south ?? source.minLat ?? source.bottom ?? source.yMin;
  const east = Array.isArray(source) ? source[2] : source.east ?? source.maxLon ?? source.right ?? source.xMax;
  const north = Array.isArray(source) ? source[3] : source.north ?? source.maxLat ?? source.top ?? source.yMax;
  const normalized = {
    west: normalizeLon(Number.isFinite(Number(west)) ? Number(west) : -98),
    south: clampNumber(Number.isFinite(Number(south)) ? Number(south) : 35, -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT),
    east: normalizeLon(Number.isFinite(Number(east)) ? Number(east) : -96),
    north: clampNumber(Number.isFinite(Number(north)) ? Number(north) : 36, -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT),
  };
  if (normalized.south > normalized.north) {
    const southLat = normalized.north;
    normalized.north = normalized.south;
    normalized.south = southLat;
  }
  return normalized;
}

function boundsToZoomZeroWorld(bounds, tileSize) {
  const west = normalizeLon(bounds.west);
  let east = normalizeLon(bounds.east);
  if (east < west) east += 360;
  return {
    westX: lonToZoomZeroWorldX(west, tileSize),
    eastX: lonToZoomZeroWorldX(east, tileSize),
    northY: latToZoomZeroWorldY(bounds.north, tileSize),
    southY: latToZoomZeroWorldY(bounds.south, tileSize),
  };
}

function lonToZoomZeroWorldX(lon, tileSize) {
  return ((Number(lon) + 180) / 360) * tileSize;
}

function latToZoomZeroWorldY(lat, tileSize) {
  const clampedLat = clampNumber(Number(lat), -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT);
  const sinLat = Math.sin(degToRad(clampedLat));
  return (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * tileSize;
}

function mapViewBounds(centerWorld, width, height, options = {}) {
  const zoom = Number(options.zoom ?? centerWorld.zoom ?? 0);
  const tileSize = normalizeTileSize(options.tileSize ?? centerWorld.tileSize ?? 512);
  const westX = centerWorld.x - width * 0.5;
  const eastX = centerWorld.x + width * 0.5;
  const northY = centerWorld.y - height * 0.5;
  const southY = centerWorld.y + height * 0.5;
  const nw = worldPixelToLonLat(westX, northY, { zoom, tileSize, wrapX: false });
  const ne = worldPixelToLonLat(eastX, northY, { zoom, tileSize, wrapX: false });
  const sw = worldPixelToLonLat(westX, southY, { zoom, tileSize, wrapX: false });
  const se = worldPixelToLonLat(eastX, southY, { zoom, tileSize, wrapX: false });
  const west = normalizeLon(nw.lon);
  const east = normalizeLon(ne.lon);
  const antimeridian = nw.lon < -180 || ne.lon > 180 || east < west;
  const bounds = {
    west,
    south: Math.min(sw.lat, se.lat),
    east,
    north: Math.max(nw.lat, ne.lat),
  };
  return {
    bounds,
    unwrappedBounds: {
      west: nw.lon,
      south: bounds.south,
      east: ne.lon,
      north: bounds.north,
    },
    mercatorBounds: {
      west: lonLatToWebMercator(nw.lon, bounds.south).x,
      south: lonLatToWebMercator(0, bounds.south).y,
      east: lonLatToWebMercator(ne.lon, bounds.north).x,
      north: lonLatToWebMercator(0, bounds.north).y,
    },
    antimeridian,
  };
}

function tileUrl(template, z, x, y) {
  if (!template) return null;
  return String(template)
    .replace(/\{z\}/g, String(z))
    .replace(/\{x\}/g, String(x))
    .replace(/\{y\}/g, String(y));
}

function tileLonLatBounds(rawX, y, z) {
  const tileCount = 2 ** z;
  const westRaw = (rawX / tileCount) * 360 - 180;
  const eastRaw = ((rawX + 1) / tileCount) * 360 - 180;
  const north = tileYToLat(y, tileCount);
  const south = tileYToLat(y + 1, tileCount);
  return {
    west: normalizeLon(westRaw),
    south,
    east: normalizeLon(eastRaw),
    north,
    antimeridian: normalizeLon(eastRaw) < normalizeLon(westRaw),
    unwrappedWest: westRaw,
    unwrappedEast: eastRaw,
  };
}

function tileYToLat(y, tileCount) {
  const n = Math.PI - (2 * Math.PI * y) / tileCount;
  return clampNumber(radToDeg(Math.atan(Math.sinh(n))), -MAX_WEB_MERCATOR_LAT, MAX_WEB_MERCATOR_LAT);
}

function wrapTileX(x, tileCount) {
  return ((x % tileCount) + tileCount) % tileCount;
}

function wrapNumber(value, size) {
  return ((value % size) + size) % size;
}

function unwrapWorldX(x, referenceX, worldSize) {
  let unwrapped = x;
  while (unwrapped - referenceX > worldSize * 0.5) unwrapped -= worldSize;
  while (referenceX - unwrapped > worldSize * 0.5) unwrapped += worldSize;
  return unwrapped;
}

function cleanRenderOptions(options) {
  const renderOptions = {
    product: normalizeProduct(options.product),
    cut: clampInt(options.cut ?? 0, 0, 99),
    width: clampInt(options.width ?? options.pixelSize ?? 512, 1, 4096),
    height: clampInt(options.height ?? options.pixelSize ?? options.width ?? 512, 1, 4096),
    rangeKm: Number(options.rangeKm ?? 230),
    smoothing: options.smoothing || "native",
    stormDirDeg: Number(options.stormDirDeg ?? 240),
    stormSpeedKt: Number(options.stormSpeedKt ?? 35),
  };
  const paletteRender = paletteRenderOptions(options, renderOptions.product);
  return paletteRender.paletteText ? { ...renderOptions, ...paletteRender } : renderOptions;
}

function cleanCrossSectionOptions(options = {}, siteOrDescriptor) {
  const site = resolveSiteDescriptor(siteOrDescriptor || options.site || "KTLX");
  const width = clampInt(options.width ?? options.pixelSize ?? 768, 2, 4096);
  const height = clampInt(options.height ?? 320, 2, 4096);
  const start = normalizeCrossSectionPoint(
    options.start || options.startPoint || options.from || {
      eastKm: -80,
      northKm: 0,
    },
    site,
  );
  const end = normalizeCrossSectionPoint(
    options.end || options.endPoint || options.to || {
      eastKm: 80,
      northKm: 0,
    },
    site,
  );
  const topKm = clampNumber(options.topKm ?? options.heightKm ?? 18, 0.1, 80);
  const renderOptions = {
    site: site.id,
    product: normalizeProduct(options.product),
    width,
    height,
    topKm,
    start,
    end,
  };
  const paletteRender = paletteRenderOptions(options, renderOptions.product);
  return paletteRender.paletteText ? { ...renderOptions, ...paletteRender } : renderOptions;
}

function cleanTorTracksOptions(options = {}, siteOrDescriptor) {
  const site = resolveSiteDescriptor(siteOrDescriptor || options.site || "KTLX");
  return {
    site: site.id,
    halfExtentKm: clampNumber(options.halfExtentKm ?? options.rangeKm ?? 150, 10, 300),
    cellKm: clampNumber(options.cellKm ?? options.gridKm ?? 0.5, 0.25, 5),
  };
}

function normalizeCrossSectionPoint(point, siteOrDescriptor) {
  const site = resolveSiteDescriptor(siteOrDescriptor || "KTLX");
  if (Array.isArray(point)) {
    return {
      eastKm: Number(point[0] ?? 0),
      northKm: Number(point[1] ?? 0),
    };
  }
  if (point && typeof point === "object") {
    if (Number.isFinite(Number(point.lon)) && Number.isFinite(Number(point.lat))) {
      const offset = radarOffsetFromLonLat(site, point);
      return {
        eastKm: finiteOrZero(offset.eastKm),
        northKm: finiteOrZero(offset.northKm),
      };
    }
    return {
      eastKm: finiteOrZero(point.eastKm ?? point.east ?? point.x ?? 0),
      northKm: finiteOrZero(point.northKm ?? point.north ?? point.y ?? 0),
    };
  }
  return { eastKm: 0, northKm: 0 };
}

function enrichCrossSectionPoint(siteOrDescriptor, point) {
  const site = resolveSiteDescriptor(siteOrDescriptor);
  const local = normalizeCrossSectionPoint(point, site);
  const lonLat = radarOffsetToLonLat(site, local);
  return {
    eastKm: local.eastKm,
    northKm: local.northKm,
    lon: lonLat.lon,
    lat: lonLat.lat,
    mercator: lonLatToWebMercator(lonLat.lon, lonLat.lat),
  };
}

function crossSectionLengthKm(start, end) {
  return Math.hypot(Number(end.eastKm) - Number(start.eastKm), Number(end.northKm) - Number(start.northKm));
}

function formatCacheNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Number(number.toFixed(3)).toString() : "0";
}

function resolveCut(meta, requestedCut) {
  const requested = Number(requestedCut);
  const displayable = meta.displayableCuts || [];
  if (Number.isInteger(requested) && displayable.includes(requested)) return requested;
  if (Number.isInteger(meta.selectedCut)) return meta.selectedCut;
  return displayable.length ? displayable[0] : 0;
}

function archiveFrame(base, object) {
  const parts = String(object.key || "").split("/");
  const id = parts.pop();
  const site = parts.length >= 4 ? String(parts[3] || "").toUpperCase() : undefined;
  return {
    id,
    key: object.key,
    cacheKey: `archive:${object.key}:${object.size}`,
    source: "archive",
    provider: "nexrad-public",
    format: "nexrad-level2",
    site,
    size: object.size,
    url: `${trimTrailingSlash(base)}/${object.key}`,
    identity: id,
    volumeTime: volumeTimeFromArchiveId(id),
    lastModified: object.lastModified || null,
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
  return candidates.length ? candidates : [unique[unique.length - 1]];
}

async function listS3(base, params, options = {}) {
  const url = `${trimTrailingSlash(base)}/?${new URLSearchParams(params)}`;
  return parseS3StyleListing(await fetchText(url, options));
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

function frameMillis(frame, fallback = 0) {
  const time = frame.volumeTime ? Date.parse(frame.volumeTime) : NaN;
  return Number.isFinite(time) ? time : fallback;
}

function productsForCut(cut) {
  return PRODUCT_CATALOG
    .filter((product) => cutSupportsProduct(cut, product.id))
    .map((product) => ({ ...product }));
}

function cutsForProduct(meta, productId, options = {}) {
  if (!meta || typeof meta !== "object") return [];
  const selectedCut = Number.isInteger(Number(options.selectedCut ?? options.cut ?? meta.selectedCut))
    ? Number(options.selectedCut ?? options.cut ?? meta.selectedCut)
    : null;
  const displayableCuts = new Set((meta.displayableCuts || []).map((index) => Number(index)));
  const cuts = Array.isArray(meta.cuts) ? meta.cuts : [];
  return cuts
    .map((cut, fallbackIndex) => {
      const index = Number.isInteger(Number(cut.index)) ? Number(cut.index) : fallbackIndex;
      const displayable = displayableCuts.size
        ? displayableCuts.has(index)
        : Boolean(cut.displayable ?? true);
      if (options.displayableOnly !== false && !displayable) return null;
      if (!cutSupportsProduct(cut, productId)) return null;
      const elevationDeg = Number.isFinite(Number(cut.elevationDeg)) ? Number(cut.elevationDeg) : null;
      const elevationNumber = Number.isInteger(Number(cut.elevationNumber)) ? Number(cut.elevationNumber) : null;
      const moments = Array.isArray(cut.moments) ? [...cut.moments] : [];
      return {
        index,
        value: index,
        label: formatCutChoiceLabel({ index, elevationDeg, elevationNumber }),
        elevationDeg,
        elevationNumber,
        radials: Number.isFinite(Number(cut.radials)) ? Number(cut.radials) : null,
        moments,
        products: productsForCut(cut).map((product) => product.id),
        displayable,
        selected: selectedCut !== null && index === selectedCut,
      };
    })
    .filter(Boolean);
}

function cutSupportsProduct(cut, productId) {
  const capability = productCapability(productId);
  if (!capability) return false;
  const moments = new Set((cut?.moments || []).map(normalizeMomentId));
  return capability.aliases.some((alias) => moments.has(normalizeMomentId(alias)));
}

function chooseProductDefaultCut(cuts, selectedCut) {
  if (!cuts.length) return null;
  const selected = Number.isInteger(Number(selectedCut)) ? Number(selectedCut) : null;
  if (selected !== null && cuts.some((cut) => cut.index === selected)) return selected;
  return cuts[0].index;
}

function recommendedWarmProducts(available, options = {}) {
  const requested = options.recommendedWarmProducts || options.warmProducts;
  if (requested) return normalizeProductList(requested).filter((product) => available.has(product));
  const priority = ["DVEL", "SRV", "DSRV", "VEL", "REF", "AZSHR", "DIV", "CC", "ZDR"];
  return priority.filter((product) => available.has(product));
}

function normalizeMomentId(moment) {
  const value = String(moment || "").trim().toUpperCase();
  if (["RHO", "RHOHV"].includes(value)) return "CC";
  if (value === "PHIDP") return "PHI";
  if (value === "WIDTH" || value === "WIDTHS") return "SW";
  if (value === "DBZ" || value === "DZ") return "REF";
  if (value === "V") return "VEL";
  return value;
}

function formatCutChoiceLabel(cut) {
  const parts = [];
  if (Number.isFinite(Number(cut.elevationDeg))) parts.push(`${formatCacheNumber(cut.elevationDeg)} deg`);
  if (Number.isInteger(Number(cut.elevationNumber))) parts.push(`#${Number(cut.elevationNumber)}`);
  return parts.length ? parts.join(" ") : `Tilt ${cut.index}`;
}

function normalizeLoopIndex(index, length, fallback = 0) {
  if (!Number.isFinite(Number(length)) || length <= 0) return 0;
  if (index === "latest" || index === undefined || index === null) return Math.max(0, length - 1);
  if (typeof index === "string" && Number.isNaN(Number(index))) return fallback >= 0 ? Math.min(length - 1, fallback) : Math.max(0, length - 1);
  const numeric = Math.round(Number(index));
  if (!Number.isFinite(numeric)) return fallback >= 0 ? Math.min(length - 1, fallback) : Math.max(0, length - 1);
  return Math.max(0, Math.min(length - 1, numeric));
}

function summarizeRenderedFrame(renderedFrame, index) {
  return {
    index,
    id: renderedFrame.frame?.id || null,
    cacheKey: renderedFrame.frame?.cacheKey || null,
    source: renderedFrame.frame?.source || null,
    volumeTime: renderedFrame.frame?.volumeTime || renderedFrame.meta?.volumeTime || null,
    product: renderedFrame.renderOptions?.product || null,
    cut: Number.isFinite(Number(renderedFrame.renderOptions?.cut)) ? Number(renderedFrame.renderOptions.cut) : null,
    width: renderedFrame.width,
    height: renderedFrame.height,
    cacheHit: Boolean(renderedFrame.cacheHit),
    elapsedMs: renderedFrame.elapsedMs,
  };
}

function normalizeProductList(products) {
  const values = Array.isArray(products) ? products : String(products || "").split(/[,\s]+/);
  const normalized = [...new Set(values.map(normalizeProduct).filter(Boolean))];
  return normalized.length ? normalized : ["REF"];
}

function playbackIntervalMs(speedPercent = 100) {
  const speed = clampInt(speedPercent, 10, 1000);
  return Math.max(16, Math.round(650 / (speed / 100)));
}

function isoSeconds(date) {
  const value = date instanceof Date ? date : new Date(date);
  if (!Number.isFinite(value.getTime())) throw new Error(`invalid UTC date '${date}'`);
  return value.toISOString().replace(".000Z", "Z");
}

function volumeTimeFromArchiveId(id) {
  const match = id?.match(/(\d{8})[_-](\d{6})/);
  if (!match) return null;
  return `${match[1].slice(0, 4)}-${match[1].slice(4, 6)}-${match[1].slice(6, 8)}T${match[2].slice(0, 2)}:${match[2].slice(2, 4)}:${match[2].slice(4, 6)}Z`;
}

function normalizeArchiveDate(dateOrString = new Date()) {
  if (dateOrString && typeof dateOrString === "object" && Number.isInteger(dateOrString.year)) {
    const year = Number(dateOrString.year);
    const month = Number(dateOrString.month);
    const day = Number(dateOrString.day);
    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
      throw new Error(`invalid archive date '${dateOrString}'`);
    }
    return { year, month, day, iso: `${year}-${pad2(month)}-${pad2(day)}` };
  }
  if (typeof dateOrString === "string") {
    const value = dateOrString.trim();
    const dashed = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dashed) {
      const [, year, month, day] = dashed;
      return { year: Number(year), month: Number(month), day: Number(day), iso: `${year}-${month}-${day}` };
    }
    const compact = value.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (compact) {
      const [, year, month, day] = compact;
      return { year: Number(year), month: Number(month), day: Number(day), iso: `${year}-${month}-${day}` };
    }
  }
  const date = dateOrString instanceof Date ? dateOrString : new Date(dateOrString);
  if (!Number.isFinite(date.getTime())) throw new Error(`invalid archive date '${dateOrString}'`);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    iso: `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`,
  };
}

function archiveTargetMillis(value) {
  if (value === undefined || value === null || value === "") return NaN;
  const date = value instanceof Date ? value : new Date(value);
  const time = date.getTime();
  return Number.isFinite(time) ? time : NaN;
}

function normalizeOptionalIsoTime(value) {
  const time = archiveTargetMillis(value);
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

function archiveDateFromFrame(frame) {
  const time = frame?.volumeTime ? Date.parse(frame.volumeTime) : NaN;
  if (Number.isFinite(time)) return new Date(time).toISOString().slice(0, 10);
  const match = String(frame?.id || frame?.key || "").match(/(\d{4})(\d{2})(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

function splitCsvLimited(line, limit) {
  const out = [];
  let current = "";
  let quoted = false;
  const text = String(line || "");
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted && out.length < limit - 1) {
      out.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  out.push(current);
  return out;
}

function normalizeSpcReportKind(kind) {
  const value = String(kind?.kind || kind || "").trim().toLowerCase();
  if (["tor", "torn", "tornado"].includes(value)) return "tornado";
  if (["wind", "wnd"].includes(value)) return "wind";
  if (["hail", "hal"].includes(value)) return "hail";
  throw new Error(`SPC: unknown report kind '${kind}'`);
}

function normalizeSpcOutlookKind(kind) {
  const value = String(kind?.id || kind?.kind || kind || "cat").trim().toLowerCase();
  if (["cat", "categorical"].includes(value)) return "cat";
  if (["tor", "torn", "tornado", "tornadoes"].includes(value)) return "torn";
  if (["wind", "wnd"].includes(value)) return "wind";
  if (["hail", "hal"].includes(value)) return "hail";
  throw new Error(`SPC outlook: unknown kind '${kind}'`);
}

function normalizeSpcOutlookDay(day) {
  return clampInt(day, 1, 3);
}

function parseSpcOutlookRgb(value) {
  const text = String(value || "").trim().replace(/^#/, "");
  const parsePair = (start) => {
    const parsed = Number.parseInt(text.slice(start, start + 2), 16);
    return Number.isFinite(parsed) ? parsed : 128;
  };
  return text.length === 6
    ? [parsePair(0), parsePair(2), parsePair(4)]
    : [128, 128, 128];
}

function rgbToHex(rgb) {
  const values = Array.from(rgb || [128, 128, 128]).slice(0, 3);
  while (values.length < 3) values.push(128);
  return `#${values.map((value) => clampInt(value, 0, 255).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

function closeGeoJsonRing(ring) {
  const points = Array.from(ring || [])
    .map((point) => {
      const lon = Number(point?.[0]);
      const lat = Number(point?.[1]);
      return Number.isFinite(lon) && Number.isFinite(lat) ? [lon, lat] : null;
    })
    .filter(Boolean);
  if (!points.length) return points;
  const first = points[0];
  const last = points[points.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) points.push([first[0], first[1]]);
  return points;
}

function parseSpcReportRow(kind, convectiveDate, line) {
  if (!String(line || "").trim()) return null;
  const cols = splitCsvLimited(line, 8);
  if (cols.length < 8) return null;
  const lat = Number(String(cols[5] || "").trim());
  const lon = Number(String(cols[6] || "").trim());
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  const timeHhmm = String(cols[0] || "").trim().padStart(4, "0");
  const timeUtc = spcReportTimeUtc(convectiveDate, timeHhmm);
  if (!timeUtc) return null;
  const report = {
    type: "spc-storm-report-v1",
    kind: normalizeSpcReportKind(kind),
    timeHhmm,
    timeUtc,
    lat,
    lon,
    magnitude: String(cols[1] || "").trim(),
    location: `${String(cols[2] || "").trim()}, ${String(cols[3] || "").trim()} ${String(cols[4] || "").trim()}`.trim(),
    county: String(cols[3] || "").trim(),
    state: String(cols[4] || "").trim(),
    remark: String(cols[7] || "").trim(),
  };
  report.magnitudeLabel = spcReportMagnitudeLabel(report);
  return report;
}

function spcWcmUtc(dateText, timeText, tzText) {
  const date = String(dateText || "").trim();
  const time = String(timeText || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}:\d{2}$/.test(time)) return null;
  const parsed = new Date(`${date}T${time}Z`);
  if (!Number.isFinite(parsed.getTime())) return null;
  const offsetHours = String(tzText || "").trim() === "9" ? 0 : 6;
  return isoSeconds(new Date(parsed.getTime() + offsetHours * 3600_000));
}

function normalizeLatLon(value) {
  const lat = Number(value?.lat ?? value?.latitude ?? value?.[0]);
  const lon = Number(value?.lon ?? value?.lng ?? value?.longitude ?? value?.[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error("lat/lon point required");
  return { lat, lon };
}

function nearestFrameIndexAtOrBefore(frames, timeMs) {
  if (!frames.length) return -1;
  let selected = 0;
  for (let index = 0; index < frames.length; index += 1) {
    const time = frameMillis(frames[index], NaN);
    if (!Number.isFinite(time)) continue;
    if (time <= timeMs) selected = index;
    else break;
  }
  return selected;
}

function normalizeEventSegment(segmentOrReport) {
  if (!segmentOrReport || typeof segmentOrReport !== "object") throw new Error("event segment or report required");
  if (segmentOrReport.begin || segmentOrReport.type === "spc-tornado-segment-v1") {
    return {
      type: "spc-tornado-segment-v1",
      timeUtc: isoSeconds(segmentOrReport.timeUtc),
      efLabel: segmentOrReport.efLabel || "EF?",
      location: segmentOrReport.location || "",
      begin: normalizeLatLon(segmentOrReport.begin || [segmentOrReport.beginLat, segmentOrReport.beginLon]),
      end: segmentOrReport.end ? normalizeLatLon(segmentOrReport.end) : null,
      endTimeUtc: segmentOrReport.endTimeUtc ? isoSeconds(segmentOrReport.endTimeUtc) : null,
      lengthMi: finiteOrZero(segmentOrReport.lengthMi),
      widthYd: finiteOrZero(segmentOrReport.widthYd),
      isTrack: Boolean(segmentOrReport.end),
    };
  }
  return tornadoSegmentsFromReports([segmentOrReport])[0];
}

function normalizeSite(site) {
  return String(site || "KTLX").trim().toUpperCase();
}

function normalizeProduct(product) {
  return String(product || "REF").trim().toUpperCase();
}

function nativeRhiMomentForProduct(product) {
  const code = normalizeProduct(product);
  if (code === "BV") return "VEL";
  if (code === "CC") return "RHO";
  if (code === "RHO") return "RHO";
  if (code === "DVEL" || code === "SRV" || code === "DSRV") return "VEL";
  return code;
}

function normalizeLon(lon) {
  const value = Number(lon);
  if (!Number.isFinite(value)) return 0;
  return ((((value + 180) % 360) + 360) % 360) - 180;
}

function normalizeDegrees(degrees) {
  const value = Number(degrees);
  if (!Number.isFinite(value)) return 0;
  return ((value % 360) + 360) % 360;
}

function degToRad(degrees) {
  return Number(degrees) * Math.PI / 180;
}

function radToDeg(radians) {
  return Number(radians) * 180 / Math.PI;
}

function clampInt(value, min, max) {
  const number = Math.round(Number(value));
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
}

function finiteOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function finiteOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatUtcYmdHm(date) {
  return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}`;
}
