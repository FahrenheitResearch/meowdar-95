import { PaletteManager } from "./palette-manager.js";
import { GlmController } from "./glm-controller.js";
import { normalizeCuts as assessCuts, availableCuts as selectAvailableCuts, cutAccepted as qualityCutAccepted } from "./scan-quality.js";

const MAP_CONFIG = window.MEOWDAR_CONFIG || {};
const RADAR_CONFIG = MAP_CONFIG.radarSites || MAP_CONFIG.radars || {};

let SITES = {
  KTLX: { name: "Oklahoma City radar", short: "Oklahoma City", lat: 35.333, lon: -97.278 },
  KFDR: { name: "Frederick radar", short: "Frederick", lat: 34.362, lon: -98.976 },
  KVNX: { name: "Vance AFB radar", short: "Vance AFB", lat: 36.741, lon: -98.128 },
  KINX: { name: "Tulsa radar", short: "Tulsa", lat: 36.175, lon: -95.565 },
  KICT: { name: "Wichita radar", short: "Wichita", lat: 37.654, lon: -97.443 },
  KDDC: { name: "Dodge City radar", short: "Dodge City", lat: 37.761, lon: -99.969 },
  KAMA: { name: "Amarillo radar", short: "Amarillo", lat: 35.233, lon: -101.709 },
  KLBB: { name: "Lubbock radar", short: "Lubbock", lat: 33.654, lon: -101.814 },
  KMAF: { name: "Midland radar", short: "Midland", lat: 31.943, lon: -102.189 },
  KEWX: { name: "Austin / San Antonio radar", short: "Austin / San Antonio", lat: 29.704, lon: -98.029 },
  KHGX: { name: "Houston radar", short: "Houston", lat: 29.472, lon: -95.079 },
  KFWS: { name: "Dallas / Fort Worth radar", short: "Dallas / Fort Worth", lat: 32.573, lon: -97.303 },
  KSHV: { name: "Shreveport radar", short: "Shreveport", lat: 32.451, lon: -93.841 },
  KLZK: { name: "Little Rock radar", short: "Little Rock", lat: 34.836, lon: -92.262 },
  KNQA: { name: "Memphis radar", short: "Memphis", lat: 35.345, lon: -89.873 },
  KPAH: { name: "Paducah radar", short: "Paducah", lat: 37.069, lon: -88.772 },
  KLSX: { name: "St. Louis radar", short: "St. Louis", lat: 38.699, lon: -90.683 },
  KDVN: { name: "Quad Cities radar", short: "Quad Cities", lat: 41.612, lon: -90.581 },
  KLOT: { name: "Chicago radar", short: "Chicago", lat: 41.604, lon: -88.085 },
  KMKX: { name: "Milwaukee radar", short: "Milwaukee", lat: 42.968, lon: -88.551 },
  KDTX: { name: "Detroit radar", short: "Detroit", lat: 42.700, lon: -83.472 },
  KCLE: { name: "Cleveland radar", short: "Cleveland", lat: 41.413, lon: -81.860 },
  KPBZ: { name: "Pittsburgh radar", short: "Pittsburgh", lat: 40.531, lon: -80.218 },
  KCCX: { name: "State College radar", short: "State College", lat: 40.923, lon: -78.004 },
  KLWX: { name: "Washington / Baltimore radar", short: "Washington / Baltimore", lat: 38.976, lon: -77.487 },
  KDOX: { name: "Dover radar", short: "Dover", lat: 38.826, lon: -75.440 },
  KRAX: { name: "Raleigh radar", short: "Raleigh", lat: 35.666, lon: -78.490 },
  KAKQ: { name: "Wakefield radar", short: "Wakefield", lat: 36.984, lon: -77.008 },
  KCLX: { name: "Charleston radar", short: "Charleston", lat: 32.656, lon: -81.042 },
  KJAX: { name: "Jacksonville radar", short: "Jacksonville", lat: 30.485, lon: -81.702 },
  KMLB: { name: "Melbourne radar", short: "Melbourne", lat: 28.113, lon: -80.654 },
  KAMX: { name: "Miami radar", short: "Miami", lat: 25.611, lon: -80.413 },
  KTBW: { name: "Tampa Bay radar", short: "Tampa Bay", lat: 27.706, lon: -82.402 },
  KTLH: { name: "Tallahassee radar", short: "Tallahassee", lat: 30.398, lon: -84.329 },
  KBMX: { name: "Birmingham radar", short: "Birmingham", lat: 33.172, lon: -86.770 },
  KFFC: { name: "Atlanta radar", short: "Atlanta", lat: 33.364, lon: -84.566 },
  KOHX: { name: "Nashville radar", short: "Nashville", lat: 36.247, lon: -86.563 },
  KMRX: { name: "Knoxville radar", short: "Knoxville", lat: 36.169, lon: -83.402 },
  KRLX: { name: "Charleston WV radar", short: "Charleston WV", lat: 38.311, lon: -81.723 },
  KILN: { name: "Wilmington OH radar", short: "Wilmington OH", lat: 39.420, lon: -83.822 },
  KIND: { name: "Indianapolis radar", short: "Indianapolis", lat: 39.708, lon: -86.281 },
  KMPX: { name: "Twin Cities radar", short: "Twin Cities", lat: 44.849, lon: -93.566 },
  KDMX: { name: "Des Moines radar", short: "Des Moines", lat: 41.731, lon: -93.723 },
  KOAX: { name: "Omaha radar", short: "Omaha", lat: 41.321, lon: -96.367 },
  KUEX: { name: "Hastings radar", short: "Hastings", lat: 40.321, lon: -98.442 },
  KABR: { name: "Aberdeen radar", short: "Aberdeen", lat: 45.456, lon: -98.413 },
  KBIS: { name: "Bismarck radar", short: "Bismarck", lat: 46.771, lon: -100.761 },
  KMVX: { name: "Grand Forks radar", short: "Grand Forks", lat: 47.528, lon: -97.326 },
  KUDX: { name: "Rapid City radar", short: "Rapid City", lat: 44.125, lon: -102.830 },
  KCYS: { name: "Cheyenne radar", short: "Cheyenne", lat: 41.152, lon: -104.806 },
  KFTG: { name: "Denver radar", short: "Denver", lat: 39.786, lon: -104.546 },
  KPUX: { name: "Pueblo radar", short: "Pueblo", lat: 38.460, lon: -104.181 },
  KGLD: { name: "Goodland radar", short: "Goodland", lat: 39.367, lon: -101.700 },
  KRIW: { name: "Riverton radar", short: "Riverton", lat: 43.066, lon: -108.477 },
  KMTX: { name: "Salt Lake City radar", short: "Salt Lake City", lat: 41.263, lon: -112.448 },
  KICX: { name: "Cedar City radar", short: "Cedar City", lat: 37.591, lon: -112.863 },
  KFSX: { name: "Flagstaff radar", short: "Flagstaff", lat: 34.574, lon: -111.198 },
  KIWA: { name: "Phoenix radar", short: "Phoenix", lat: 33.289, lon: -111.670 },
  KEMX: { name: "Tucson radar", short: "Tucson", lat: 31.894, lon: -110.630 },
  KEPZ: { name: "El Paso radar", short: "El Paso", lat: 31.873, lon: -106.698 },
  KABX: { name: "Albuquerque radar", short: "Albuquerque", lat: 35.150, lon: -106.824 },
  KGGW: { name: "Glasgow radar", short: "Glasgow", lat: 48.206, lon: -106.625 },
  KTFX: { name: "Great Falls radar", short: "Great Falls", lat: 47.459, lon: -111.385 },
  KMSX: { name: "Missoula radar", short: "Missoula", lat: 47.041, lon: -113.986 },
  KCBX: { name: "Boise radar", short: "Boise", lat: 43.491, lon: -116.236 },
  KSFX: { name: "Pocatello radar", short: "Pocatello", lat: 43.106, lon: -112.686 },
  KOTX: { name: "Spokane radar", short: "Spokane", lat: 47.680, lon: -117.626 },
  KPDT: { name: "Pendleton radar", short: "Pendleton", lat: 45.691, lon: -118.853 },
  KRTX: { name: "Portland radar", short: "Portland", lat: 45.715, lon: -122.965 },
  KATX: { name: "Seattle radar", short: "Seattle", lat: 48.194, lon: -122.496 },
  KLGX: { name: "Langley Hill radar", short: "Langley Hill", lat: 47.116, lon: -124.107 },
  KMAX: { name: "Medford radar", short: "Medford", lat: 42.081, lon: -122.717 },
  KBHX: { name: "Eureka radar", short: "Eureka", lat: 40.499, lon: -124.292 },
  KBBX: { name: "Beale AFB radar", short: "Beale AFB", lat: 39.496, lon: -121.632 },
  KDAX: { name: "Sacramento radar", short: "Sacramento", lat: 38.501, lon: -121.678 },
  KRGX: { name: "Reno radar", short: "Reno", lat: 39.754, lon: -119.462 },
  KMUX: { name: "Bay Area radar", short: "Bay Area", lat: 37.155, lon: -121.898 },
  KHNX: { name: "San Joaquin Valley radar", short: "San Joaquin Valley", lat: 36.315, lon: -119.632 },
  KVBX: { name: "Central Coast radar", short: "Central Coast", lat: 34.838, lon: -120.398 },
  KVTX: { name: "Los Angeles / Ventura radar", short: "Los Angeles / Ventura", lat: 34.412, lon: -119.179 },
  KSOX: { name: "Orange County radar", short: "Orange County", lat: 33.818, lon: -117.636 },
  KNKX: { name: "San Diego radar", short: "San Diego", lat: 32.919, lon: -117.041 },
  KEYX: { name: "Eastern Kern radar", short: "Eastern Kern", lat: 35.098, lon: -117.560 },
  KESX: { name: "Las Vegas radar", short: "Las Vegas", lat: 35.701, lon: -114.891 },
  KLRX: { name: "Elko radar", short: "Elko", lat: 40.740, lon: -116.803 },
  KYUX: { name: "Yuma radar", short: "Yuma", lat: 32.495, lon: -114.657 },
  PAHG: { name: "Kenai radar", short: "Kenai", lat: 60.726, lon: -151.351 },
  PAEC: { name: "Nome radar", short: "Nome", lat: 64.511, lon: -165.295 },
  PABC: { name: "Bethel radar", short: "Bethel", lat: 60.792, lon: -161.876 },
  PHKI: { name: "Kauai radar", short: "Kauai", lat: 21.894, lon: -159.552 },
  PHMO: { name: "Molokai radar", short: "Molokai", lat: 21.133, lon: -157.180 },
  PHWA: { name: "South Hawaii radar", short: "South Hawaii", lat: 19.095, lon: -155.569 },
};

SITES = restrictRadarSiteCatalog(SITES);

const PRODUCTS = {
  REF: { name: "Reflectivity", short: "Reflectivity" },
  DVEL: { name: "Velocity", short: "Velocity" },
  CC: { name: "Correlation coefficient", short: "Correlation" },
};

const QUALITY_LABELS = {
  auto: "Operational",
  strict: "720 radial",
  all: "Raw product cuts",
};

const STATIC_PREVIEW = Boolean(window.__MEOWDAR_STATIC_PREVIEW__);
const URL_PARAMS = new URLSearchParams(window.location.search);
const REQUESTED_SITE = normalizeRadarSiteCode(URL_PARAMS.get("site"));
const LOCAL_LOOP_TEST_HOSTS = new Set(["127.0.0.1", "localhost", "::1"]);
const LOOP_TEST_MODE = URL_PARAMS.get("loop-test") === "1" && LOCAL_LOOP_TEST_HOSTS.has(window.location.hostname);
const LOCAL_LOOP_COUNTS = LOOP_TEST_MODE ? [1, 3, 6, 12] : [1, 3];
const DEFAULT_LOOP_COUNT = 3;

const PROFILES = {
  full: {
    label: "Full resolution",
    renderSize: 3072,
    maxTilt: Infinity,
    concurrency: 1,
    smoothing: "native",
    note: "3072 px texture · nearest",
  },
  low: {
    label: "Low data · ≤2.5°",
    renderSize: 512,
    maxTilt: 2.5,
    concurrency: 1,
    smoothing: "native",
    note: "512 px · lowest elevations",
  },
};

const URL_LINK = parseUrlLink(URL_PARAMS);
const SPC_ARCHIVE_DATA_BASE = MAP_CONFIG.archiveCatalog?.dataBaseUrl || "https://fahrenheitresearch.github.io/spc-enhanced-day-classification/data";
const CATALOG_TARGET_LIMIT = 20;

const DEFAULTS = {
  site: chooseDefaultRadarSite("KMUX"),
  mode: "live",
  product: "REF",
  profile: "full",
  loopCount: DEFAULT_LOOP_COUNT,
  rangeKm: 230,
  quality: "auto",
  followLatestLow: true,
  lowTiltMax: 2.5,
  loopSpeedMs: 750,
  endDwellMs: 600,
};

const POLAR_RENDER_EXPERIMENT = URL_PARAMS.get("polar") === "1" || MAP_CONFIG.experimentalPolarRenderer === true;
const MAP = {
  tileUrl: MAP_CONFIG.map?.tileUrl || "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: MAP_CONFIG.map?.attribution || "© OpenStreetMap contributors",
  maxZoom: Number(MAP_CONFIG.map?.maxZoom || 19),
  libraryUrl: MAP_CONFIG.map?.libraryUrl || "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.js",
  cssUrl: MAP_CONFIG.map?.cssUrl || "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css",
  libraryFallbackUrls: Array.isArray(MAP_CONFIG.map?.libraryFallbackUrls) ? MAP_CONFIG.map.libraryFallbackUrls : [],
  cssFallbackUrls: Array.isArray(MAP_CONFIG.map?.cssFallbackUrls) ? MAP_CONFIG.map.cssFallbackUrls : [],
  sourceId: "meowdar-radar-canvas",
  layerId: "meowdar-radar-layer",
  polarLayerId: "meowdar-polar-radar-layer",
};

const state = {
  ...DEFAULTS,
  frameIndex: DEFAULTS.loopCount - 1,
  isPlaying: false,
  playTimer: null,
  module: null,
  toolbox: null,
  session: null,
  unsubscribe: null,
  loop: null,
  snapshot: null,
  allCuts: [],
  engineReady: false,
  source: "preview",
  loading: false,
  loopBuilding: false,
  loadGeneration: 0,
  backgroundGeneration: 0,
  livePollTimer: null,
  liveFrameHoldUntil: 0,
  liveFrameHoldKey: null,
  liveFrameHoldTime: null,
  demoTimes: [],
  map: null,
  mapReady: false,
  mapFailed: false,
  mapResizeObserver: null,
  markerElements: new Map(),
  radarLayer: null,
  radarSourceSignature: "",
  polarLayer: null,
  polarLayerData: null,
  polarLayerGeneration: 0,
  polarLayerFailed: false,
  polarFrameCache: new Map(),
  polarPlaybackFrameCache: new Map(),
  polarPlaybackWarmGeneration: 0,
  playbackFrameCache: new Map(),
  playbackFrameWarmGeneration: 0,
  polarDebug: null,
  perf: {
    enabled: LOOP_TEST_MODE || URL_PARAMS.get("perf") === "1",
    entries: [],
    summary: {},
  },
  toastTimer: null,
  activeCut: null,
  currentFrameTime: null,
  paletteManager: null,
  glm: null,
  snapshotSettleGeneration: 0,
  diagnosticsGeneration: 0,
  diagnostics: null,
  diagnosticsFrameKey: null,
  diagnosticsCache: new Map(),
  adaptiveFrameCache: new Map(),
  waitingForCompleteLow: false,
  hasRenderedRadar: false,
  lowTiltMax: DEFAULTS.lowTiltMax,
  loopSpeedMs: DEFAULTS.loopSpeedMs,
  endDwellMs: DEFAULTS.endDwellMs,
  siteCatalogHydrated: false,
  requestedSite: REQUESTED_SITE,
  archiveLink: URL_LINK.archive,
  catalog: {
    records: [],
    filtered: [],
    summary: null,
    selectedDay: "",
    currentTargets: [],
    loading: false,
    reportsCache: new Map(),
  },
};

const $ = (id) => document.getElementById(id);
const ui = {
  navToggle: $("navToggle"),
  primaryNav: $("primaryNav"),
  siteSelect: $("siteSelect"),
  modeControl: $("modeControl"),
  performanceControl: $("performanceControl"),
  profileNote: $("profileNote"),
  loopCountSelect: $("loopCountSelect"),
  loopSpeedSelect: $("loopSpeedSelect"),
  endDwellSelect: $("endDwellSelect"),
  loopMemoryEstimate: $("loopMemoryEstimate"),
  loopMemoryBar: $("loopMemoryBar"),
  archiveFields: $("archiveFields"),
  archiveDate: $("archiveDate"),
  archiveTime: $("archiveTime"),
  productControl: $("productControl"),
  tiltSelect: $("tiltSelect"),
  qualitySelect: $("qualitySelect"),
  followLowToggle: $("followLowToggle"),
  lowTiltMaxSelect: $("lowTiltMaxSelect"),
  scanQualitySummary: $("scanQualitySummary"),
  scanQualityPill: $("scanQualityPill"),
  radarLegend: $("radarLegend"),
  conditionRadials: $("conditionRadials"),
  conditionQuality: $("conditionQuality"),
  conditionLightning: $("conditionLightning"),
  locationButton: $("locationButton"),
  resetButton: $("resetButton"),
  loadButton: $("loadButton"),
  stationCode: $("stationCode"),
  stationName: $("stationName"),
  liveDot: $("liveDot"),
  frameTime: $("frameTime"),
  engineBadge: $("engineBadge"),
  sourcePill: $("sourcePill"),
  rangePill: $("rangePill"),
  radarStage: $("radarStage"),
  mapElement: $("map"),
  siteMarkerLayer: $("siteMarkerLayer"),
  radarCanvas: $("radarCanvas"),
  overlayCanvas: $("overlayCanvas"),
  loadingLayer: $("loadingLayer"),
  loadingTitle: $("loadingTitle"),
  loadingDetail: $("loadingDetail"),
  emptyLayer: $("emptyLayer"),
  returnPreviewButton: $("returnPreviewButton"),
  backgroundProgress: $("backgroundProgress"),
  backgroundProgressText: $("backgroundProgressText"),
  fitNetworkButton: $("fitNetworkButton"),
  centerRadarButton: $("centerRadarButton"),
  catalogButton: $("catalogButton"),
  catalogDialog: $("catalogDialog"),
  closeCatalogDialog: $("closeCatalogDialog"),
  catalogSearch: $("catalogSearch"),
  catalogPreset: $("catalogPreset"),
  catalogStatus: $("catalogStatus"),
  catalogCount: $("catalogCount"),
  catalogDayList: $("catalogDayList"),
  catalogDetail: $("catalogDetail"),
  previousButton: $("previousButton"),
  playButton: $("playButton"),
  nextButton: $("nextButton"),
  timeline: $("timeline"),
  timelineStart: $("timelineStart"),
  timelineCurrent: $("timelineCurrent"),
  refreshButton: $("refreshButton"),
  conditionHeadline: $("conditionHeadline"),
  conditionCopy: $("conditionCopy"),
  conditionProduct: $("conditionProduct"),
  conditionTilt: $("conditionTilt"),
  conditionFrames: $("conditionFrames"),
  conditionProfile: $("conditionProfile"),
  conditionMap: $("conditionMap"),
  conditionUpdated: $("conditionUpdated"),
  toast: $("toast"),
};

window.__MEOWDAR_POLAR_DEBUG__ = { status: "module-loaded" };
document.body.dataset.polarRadar = "module-loaded";
initialize();

function initialize() {
  configureLoopOptions();
  const saved = readPreferences();
  state.site = resolveSitePreference(REQUESTED_SITE) || resolveSitePreference(saved.site) || DEFAULTS.site;
  state.product = URL_LINK.product || (saved.product && PRODUCTS[saved.product] ? saved.product : DEFAULTS.product);
  state.mode = URL_LINK.mode || (saved.mode === "archive" ? "archive" : "live");
  state.profile = URL_LINK.profile || (saved.profile && PROFILES[saved.profile] ? saved.profile : DEFAULTS.profile);
  state.loopCount = normalizeLoopCount(URL_LINK.frames ?? saved.loopCount ?? DEFAULTS.loopCount);
  state.quality = ["auto", "strict", "all"].includes(saved.quality) ? saved.quality : DEFAULTS.quality;
  state.followLatestLow = saved.followLatestLow !== false;
  state.lowTiltMax = [0.9, 1.5, 2.5].includes(Number(saved.lowTiltMax)) ? Number(saved.lowTiltMax) : DEFAULTS.lowTiltMax;
  state.loopSpeedMs = [1200, 750, 450, 260].includes(Number(saved.loopSpeedMs)) ? Number(saved.loopSpeedMs) : DEFAULTS.loopSpeedMs;
  state.endDwellMs = [0, 600, 1200, 2000].includes(Number(saved.endDwellMs)) ? Number(saved.endDwellMs) : DEFAULTS.endDwellMs;
  state.frameIndex = state.loopCount - 1;

  state.paletteManager = new PaletteManager({
    product: () => state.product,
    onApply: applyPalette,
    toast: showToast,
  });
  state.glm = new GlmController({
    config: MAP_CONFIG.glm || {},
    map: () => state.map,
    targetTime: () => state.currentFrameTime || new Date(),
    toast: showToast,
    staticPreview: STATIC_PREVIEW,
  });

  populateSiteSelect();
  setArchiveDefaults();
  applyArchiveLinkToControls();
  bindEvents();
  createSitePills();
  syncControls();
  refreshDemoTimes();
  renderPreview();
  if (!STATIC_PREVIEW && URL_PARAMS.get("static") !== "1" && window.location.protocol !== "file:") {
    initializeMap();
  } else {
    state.mapFailed = true;
    ui.conditionMap.textContent = "Map preview";
  }
  if (!STATIC_PREVIEW) detectEngine();
  if (!STATIC_PREVIEW && URL_LINK.autoload) setTimeout(() => loadRadar(), 0);
  if (STATIC_PREVIEW) {
    const previewParams = new URLSearchParams(window.location.search);
    if (previewParams.get("glm") === "1") setTimeout(() => state.glm?.setEnabled(true), 0);
    if (previewParams.get("palette") === "1") setTimeout(() => state.paletteManager?.open(), 0);
  }
}

function bindEvents() {
  ui.navToggle?.addEventListener("click", () => {
    const open = ui.primaryNav.classList.toggle("open");
    ui.navToggle.setAttribute("aria-expanded", String(open));
  });

  ui.siteSelect.addEventListener("change", () => selectSite(ui.siteSelect.value, { fly: true, reload: state.source !== "preview" }));

  ui.modeControl.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-mode]");
    if (!button) return;
    state.mode = button.dataset.mode;
    savePreferences();
    syncModeControl();
    markControlsChanged();
  });

  ui.performanceControl.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-profile]");
    if (!button || state.loading) return;
    state.profile = button.dataset.profile;
    clearAdaptiveFrameCache();
    clearPolarFrameCache();
    clearPlaybackFrameCache();
    ui.loopCountSelect.value = String(state.loopCount);
    savePreferences();
    syncPerformanceControl();
    updateLoopMemoryEstimate();
    populateTiltChoices(state.allCuts, currentCutIndex());
    if (state.followLatestLow) await selectLowestCut(); else await enforceVisibleTilt();
    if (state.source === "preview") {
      refreshDemoTimes();
      state.frameIndex = state.loopCount - 1;
      renderPreview();
    }
    markControlsChanged();
  });

  ui.loopCountSelect.addEventListener("change", () => {
    state.loopCount = normalizeLoopCount(ui.loopCountSelect.value);
    ui.loopCountSelect.value = String(state.loopCount);
    savePreferences();
    refreshDemoTimes();
    state.frameIndex = Math.min(state.frameIndex, state.loopCount - 1);
    updateConditionCard();
    updateLoopMemoryEstimate();
    syncTimeline();
    if (state.source === "preview") renderPreview();
    markControlsChanged();
  });

  ui.loopSpeedSelect?.addEventListener("change", () => {
    state.loopSpeedMs = Number(ui.loopSpeedSelect.value) || DEFAULTS.loopSpeedMs;
    savePreferences();
    if (state.isPlaying) { stopPlayback(); togglePlayback(); }
  });

  ui.endDwellSelect?.addEventListener("change", () => {
    state.endDwellMs = Number(ui.endDwellSelect.value) || 0;
    savePreferences();
  });

  ui.productControl.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-product]");
    if (!button || state.loading) return;
    state.product = button.dataset.product;
    savePreferences();
    syncProductControl();
    state.paletteManager?.setProduct();
    updateLegend();
    updateConditionCard();
    if (state.source === "preview") {
      renderPreview();
      return;
    }
    await switchProduct();
  });

  ui.tiltSelect.addEventListener("change", async () => {
    state.followLatestLow = false;
    savePreferences();
    syncProfessionalControls();
    ui.conditionTilt.textContent = ui.tiltSelect.options[ui.tiltSelect.selectedIndex]?.textContent || "Lowest";
    await applyTilt(Number(ui.tiltSelect.value), { showOverlay: true });
  });

  ui.qualitySelect?.addEventListener("change", async () => {
    state.quality = ui.qualitySelect.value;
    clearAdaptiveFrameCache();
    clearPolarFrameCache();
    clearPlaybackFrameCache();
    savePreferences();
    populateTiltChoices(state.allCuts, currentCutIndex());
    if (state.followLatestLow) await selectLowestCut(); else await enforceVisibleTilt();
    updateQualityPresentation();
  });

  ui.followLowToggle?.addEventListener("change", async () => {
    state.followLatestLow = ui.followLowToggle.checked;
    clearAdaptiveFrameCache();
    clearPolarFrameCache();
    clearPlaybackFrameCache();
    savePreferences();
    syncProfessionalControls();
    if (state.followLatestLow) await selectLowestCut();
  });

  ui.lowTiltMaxSelect?.addEventListener("change", async () => {
    state.lowTiltMax = Number(ui.lowTiltMaxSelect.value) || DEFAULTS.lowTiltMax;
    clearAdaptiveFrameCache();
    clearPolarFrameCache();
    clearPlaybackFrameCache();
    savePreferences();
    populateTiltChoices(state.allCuts, currentCutIndex());
    if (state.followLatestLow) await selectLowestCut(); else await enforceVisibleTilt();
    syncProfessionalControls();
  });

  ui.locationButton.addEventListener("click", locateNearestRadar);
  ui.resetButton.addEventListener("click", resetControls);
  ui.loadButton.addEventListener("click", loadRadar);
  ui.returnPreviewButton.addEventListener("click", () => {
    ui.emptyLayer.hidden = true;
    state.source = "preview";
    renderPreview();
  });
  ui.fitNetworkButton.addEventListener("click", fitNetwork);
  ui.centerRadarButton.addEventListener("click", () => centerSelectedRadar(true));
  ui.catalogButton?.addEventListener("click", openArchiveCatalog);
  ui.closeCatalogDialog?.addEventListener("click", () => ui.catalogDialog?.close());
  ui.catalogSearch?.addEventListener("input", renderCatalog);
  ui.catalogPreset?.addEventListener("change", renderCatalog);
  ui.catalogDayList?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-day]");
    if (button) void selectCatalogDay(button.dataset.day);
  });
  ui.catalogDetail?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-catalog-target]");
    if (!button) return;
    const target = catalogTargetById(button.dataset.catalogTarget);
    if (target) void loadCatalogTarget(target);
  });

  ui.previousButton.addEventListener("click", () => void stepFrame(-1));
  ui.nextButton.addEventListener("click", () => void stepFrame(1));
  ui.playButton.addEventListener("click", togglePlayback);
  ui.timeline.addEventListener("input", () => void goToFrame(Number(ui.timeline.value)));
  ui.refreshButton.addEventListener("click", refreshRadar);

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = event.target?.tagName?.toLowerCase();
    if (["input", "select", "textarea", "button"].includes(tag) || state.paletteManager?.isOpen?.()) return;
    if (event.code === "Space") { event.preventDefault(); togglePlayback(); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); void stepFrame(-1); }
    else if (event.key === "ArrowRight") { event.preventDefault(); void stepFrame(1); }
    else if (event.key.toLowerCase() === "r") { event.preventDefault(); void refreshRadar(); }
    else if (event.key.toLowerCase() === "p") { event.preventDefault(); state.paletteManager?.open(); }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.isPlaying) stopPlayback();
  });

  window.addEventListener("resize", () => {
    updateSitePillPositions();
    state.map?.resize?.();
  });
}

function syncControls() {
  ui.siteSelect.value = state.site;
  ui.loopCountSelect.value = String(state.loopCount);
  if (ui.loopSpeedSelect) ui.loopSpeedSelect.value = String(state.loopSpeedMs);
  if (ui.endDwellSelect) ui.endDwellSelect.value = String(state.endDwellMs);
  if (ui.lowTiltMaxSelect) ui.lowTiltMaxSelect.value = String(state.lowTiltMax);
  syncModeControl();
  syncPerformanceControl();
  syncProductControl();
  syncProfessionalControls();
  updateLegend();
  updateStationLabels();
  updateSitePillSelection();
  updateConditionCard();
  updateLoopMemoryEstimate();
}

function syncModeControl() {
  [...ui.modeControl.querySelectorAll("button")].forEach((button) => {
    const selected = button.dataset.mode === state.mode;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  ui.archiveFields.hidden = state.mode !== "archive";
  ui.loadButton.querySelector(".button-label").textContent = state.mode === "archive" ? "Load archive radar" : "Load live radar";
}

function syncPerformanceControl() {
  [...ui.performanceControl.querySelectorAll("button")].forEach((button) => {
    const selected = button.dataset.profile === state.profile;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  ui.loopCountSelect.value = String(state.loopCount);
  ui.profileNote.textContent = PROFILES[state.profile].note;
  ui.conditionProfile.textContent = PROFILES[state.profile].label;
  state.glm?.setProfile(state.profile);
  updateLoopMemoryEstimate();
}

function syncProductControl() {
  [...ui.productControl.querySelectorAll("button")].forEach((button) => {
    const selected = button.dataset.product === state.product;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function syncProfessionalControls() {
  if (ui.qualitySelect) ui.qualitySelect.value = state.quality;
  if (ui.followLowToggle) ui.followLowToggle.checked = state.followLatestLow;
  if (ui.lowTiltMaxSelect) ui.lowTiltMaxSelect.value = String(state.lowTiltMax);
  if (ui.scanQualitySummary) ui.scanQualitySummary.textContent = `${QUALITY_LABELS[state.quality]}${state.followLatestLow ? " · follow" : ""}`;
  updateQualityPresentation();
}

function updateLegend() {
  const legend = state.paletteManager?.legend(state.product);
  if (!legend || !ui.radarLegend) return;
  const unit = ui.radarLegend.querySelector(".legend-unit");
  const bar = ui.radarLegend.querySelector(".legend-bar");
  const labels = ui.radarLegend.querySelector(".legend-labels");
  if (unit) unit.textContent = legend.units || "";
  if (bar) bar.style.background = String(legend.css).replace("90deg", "to top");
  if (labels) labels.replaceChildren(...legend.values.map((value) => { const item = document.createElement("i"); item.textContent = value; return item; }));
}

function normalizeRadarSiteCode(value) {
  const code = String(value || "").trim().toUpperCase();
  return code === "KSLC" ? "KMTX" : code;
}

function normalizeRadarSiteList(value) {
  if (value == null || value === false) return null;
  if (typeof value === "string") {
    const text = value.trim();
    if (!text || text.toLowerCase() === "all") return null;
    if (RADAR_CONFIG.presets?.[text]) return normalizeRadarSiteList(RADAR_CONFIG.presets[text]);
    return normalizeRadarSiteList(text.split(/[,\s]+/));
  }
  if (!Array.isArray(value)) return null;

  const seen = new Set();
  const list = [];
  value.forEach((item) => {
    const code = normalizeRadarSiteCode(item);
    if (!/^[A-Z0-9]{4}$/.test(code) || seen.has(code)) return;
    seen.add(code);
    list.push(code);
  });
  return list.length ? list : null;
}

function configuredAllowedRadarSiteIds() {
  const explicit = RADAR_CONFIG.allowedSites ?? RADAR_CONFIG.allowed ?? RADAR_CONFIG.sites ?? MAP_CONFIG.allowedRadarSites;
  if (explicit != null) return normalizeRadarSiteList(explicit);

  const presetName = RADAR_CONFIG.activePreset ?? RADAR_CONFIG.preset;
  if (typeof presetName === "string") {
    const text = presetName.trim().toLowerCase();
    if (!text || text === "all") return null;
  }
  return presetName ? normalizeRadarSiteList(RADAR_CONFIG.presets?.[presetName]) : null;
}

function restrictRadarSiteCatalog(catalog) {
  const allowedSites = configuredAllowedRadarSiteIds();
  if (!allowedSites) return catalog;

  const filtered = {};
  allowedSites.forEach((code) => {
    if (catalog[code]) filtered[code] = catalog[code];
  });

  if (Object.keys(filtered).length) return filtered;
  console.warn("Configured radar-site restriction did not match the site catalog; keeping the full catalog.");
  return catalog;
}

function chooseDefaultRadarSite(fallback = "KDAX") {
  const configured = normalizeRadarSiteCode(RADAR_CONFIG.defaultSite ?? RADAR_CONFIG.default ?? MAP_CONFIG.defaultRadarSite ?? fallback);
  if (configured && SITES[configured]) return configured;

  const allowedSites = configuredAllowedRadarSiteIds();
  const firstAllowedSite = allowedSites?.find((code) => SITES[code]);
  if (firstAllowedSite) return firstAllowedSite;

  const fallbackCode = normalizeRadarSiteCode(fallback);
  if (fallbackCode && SITES[fallbackCode]) return fallbackCode;
  return Object.keys(SITES)[0];
}

function resolveSitePreference(value) {
  const code = normalizeRadarSiteCode(value);
  return code && SITES[code] ? code : "";
}

function updateStationLabels() {
  const site = SITES[state.site];
  ui.stationCode.textContent = state.site;
  ui.stationName.textContent = site.name;
}

function populateSiteSelect() {
  const entries = Object.entries(SITES).sort(([a], [b]) => a.localeCompare(b));
  ui.siteSelect.replaceChildren(...entries.map(([code, site]) => new Option(`${code} — ${site.short}`, code)));
  if (SITES[state.site]) ui.siteSelect.value = state.site;
}

function hydrateRadarSites(module) {
  const candidate = module?.RADAR_SITES || module?.NEXRAD_SITES || module?.radarSites || module?.SITES || state.toolbox?.RADAR_SITES || state.toolbox?.sites;
  if (!candidate) return false;
  const entries = candidate instanceof Map ? [...candidate.entries()]
    : Array.isArray(candidate) ? candidate.map((value, index) => [value?.id || value?.site || value?.icao || index, value])
    : typeof candidate === "object" ? Object.entries(candidate) : [];
  const catalog = {};
  for (const [key, raw] of entries) {
    const value = raw && typeof raw === "object" ? raw : {};
    const code = normalizeRadarSiteCode(value.id || value.site || value.icao || value.code || key || "");
    const lat = Number(Array.isArray(raw) ? raw[0] : value.lat ?? value.latitude ?? value.y);
    const lon = Number(Array.isArray(raw) ? raw[1] : value.lon ?? value.lng ?? value.longitude ?? value.x);
    if (!/^[A-Z0-9]{4}$/.test(code) || !Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    const location = String(value.short || value.location || value.city || value.name || (Array.isArray(raw) ? raw[2] : "") || code)
      .replace(/\s+(NEXRAD|WSR-?88D|RADAR)(\s+SITE)?\s*$/i, "").trim();
    catalog[code] = {
      name: /radar/i.test(String(value.name || "")) ? String(value.name) : `${location} radar`,
      short: location || code,
      lat,
      lon,
    };
  }
  if (Object.keys(catalog).length < 20) return false;
  SITES = restrictRadarSiteCatalog(catalog);
  const requestedSite = resolveSitePreference(state.requestedSite);
  const savedSite = resolveSitePreference(readPreferences().site);
  if (requestedSite) state.site = requestedSite;
  else if (savedSite) state.site = savedSite;
  else if (!SITES[state.site]) state.site = chooseDefaultRadarSite(DEFAULTS.site);
  state.siteCatalogHydrated = true;
  populateSiteSelect();
  createSitePills();
  updateStationLabels();
  updateConditionCard();
  if (state.mapReady && state.source === "preview") centerSelectedRadar(false);
  else updateSitePillPositions();
  return true;
}

function updateLoopMemoryEstimate() {
  if (!ui.loopMemoryEstimate || !ui.loopMemoryBar) return;
  const size = PROFILES[state.profile].renderSize;
  const bytes = size * size * 4 * state.loopCount;
  const mib = bytes / (1024 * 1024);
  const label = mib >= 1024 ? `${(mib / 1024).toFixed(1)} GiB` : `${Math.round(mib)} MiB`;
  ui.loopMemoryEstimate.textContent = `~${label} raw pixel ceiling`;
  ui.loopMemoryBar.style.width = `${Math.min(100, Math.max(4, bytes / (768 * 1024 * 1024) * 100))}%`;
  const heavy = bytes > 512 * 1024 * 1024;
  ui.loopMemoryEstimate.classList.toggle("warning", heavy);
  ui.loopMemoryBar.classList.toggle("warning", heavy);
  ui.loopCountSelect.title = heavy
    ? "Large full-resolution loops can use substantial memory. Loading is progressive, but 12 frames may take a while to build."
    : "Loop frames load after the newest scan is visible.";
}

function recordPerf(name, startTime, detail = {}) {
  if (!state.perf?.enabled || typeof performance === "undefined") return;
  const ms = Math.max(0, performance.now() - startTime);
  const entry = {
    name,
    ms: Number(ms.toFixed(2)),
    at: Number(performance.now().toFixed(2)),
    ...detail,
  };
  state.perf.entries.push(entry);
  if (state.perf.entries.length > 400) state.perf.entries.splice(0, state.perf.entries.length - 400);
  const summary = state.perf.summary[name] || { count: 0, totalMs: 0, maxMs: 0, lastMs: 0 };
  summary.count += 1;
  summary.totalMs += ms;
  summary.maxMs = Math.max(summary.maxMs, ms);
  summary.lastMs = ms;
  summary.avgMs = summary.totalMs / summary.count;
  state.perf.summary[name] = summary;
  window.__MEOWDAR_PERF__ = state.perf;
}

function markPerf(name, detail = {}) {
  recordPerf(name, performance.now(), detail);
}

function timeSync(name, detail, task) {
  const start = performance.now();
  try {
    return task();
  } finally {
    recordPerf(name, start, detail);
  }
}

async function timeAsync(name, detail, task) {
  const start = performance.now();
  try {
    return await task();
  } finally {
    recordPerf(name, start, detail);
  }
}

function instrumentToolboxForPerf(toolbox) {
  if (!toolbox || toolbox.__meowdarPerfInstrumented) return toolbox;
  const methods = {
    loadLoop: (...args) => ({ options: perfOptions(args[0]), site: args[0]?.site, frameCount: args[0]?.frameCount }),
    livePlusArchiveFrames: (...args) => ({ site: args[0], count: args[1] }),
    recentArchiveFrames: (...args) => ({ site: args[0], count: args[1] }),
    latestRealtimeFrame: (...args) => ({ site: args[0] }),
    realtimeVolume: (...args) => ({ site: args[0], volumeId: args[1] }),
    archiveFramesForDate: (...args) => ({ site: args[0], date: args[1]?.toISOString?.() || String(args[1] || "") }),
    frameMetadata: (...args) => ({ frame: frameIdentity(args[0]), product: args[1] }),
    renderFrames: (...args) => ({ frames: Array.isArray(args[0]) ? args[0].length : 0, options: perfOptions(args[1]) }),
    renderFrame: (...args) => ({ frame: frameIdentity(args[0]), options: perfOptions(args[1]) }),
    volumeDiagnostics: (...args) => ({ frame: frameIdentity(args[0]) }),
    renderNativePpi: (...args) => ({ frame: frameIdentity(args[0]), options: perfOptions(args[1]) }),
    warmLoop: (...args) => ({ frames: args[0]?.frames?.length || args[0]?.length || 0, options: perfOptions(args[1]) }),
    warmFrames: (...args) => ({ frames: Array.isArray(args[0]) ? args[0].length : 0, options: perfOptions(args[1]) }),
  };

  for (const [method, detail] of Object.entries(methods)) {
    if (typeof toolbox[method] !== "function") continue;
    const original = toolbox[method];
    toolbox[method] = async function perfWrappedToolboxMethod(...args) {
      const start = performance.now();
      try {
        return await original.apply(this, args);
      } finally {
        recordPerf(`bowecho.${method}`, start, detail(...args));
      }
    };
  }

  Object.defineProperty(toolbox, "__meowdarPerfInstrumented", {
    value: true,
    configurable: true,
  });
  return toolbox;
}

function perfOptions(options = {}) {
  if (!options || typeof options !== "object") return {};
  return {
    mode: options.mode,
    product: options.product,
    cut: options.cut ?? options.cutIndex,
    width: options.width,
    height: options.height,
    rangeKm: options.rangeKm,
    smoothing: options.smoothing,
    frameCount: options.frameCount,
  };
}

function loopConcurrency() {
  const cores = Math.max(2, Number(navigator.hardwareConcurrency || 4));
  if (state.profile === "low") return cores <= 4 || state.loopCount > 48 ? 1 : 2;
  if (cores <= 4 || state.loopCount > 24) return 1;
  return PROFILES[state.profile].concurrency;
}

function activeTiltCeiling() {
  const profileCeiling = PROFILES[state.profile].maxTilt;
  if (state.profile === "low") return Math.min(profileCeiling, state.lowTiltMax);
  return state.followLatestLow ? state.lowTiltMax : profileCeiling;
}

function updateConditionCard(options = {}) {
  const product = PRODUCTS[state.product];
  const previewUpdated = STATIC_PREVIEW ? "Preview" : "No radar loaded";
  ui.conditionProduct.textContent = product.short;
  ui.conditionHeadline.textContent = options.headline || `${state.site} · ${product.short}`;
  ui.conditionCopy.textContent = options.copy || (state.source === "preview" ? SITES[state.site].short : state.mode === "archive" ? "Archive" : "Live");
  const count = currentFrameCount();
  ui.conditionFrames.textContent = `${count} scan${count === 1 ? "" : "s"}`;
  ui.conditionProfile.textContent = PROFILES[state.profile].label;
  ui.conditionUpdated.textContent = options.updated || (state.source === "preview" ? previewUpdated : "Just now");
}

function markControlsChanged() {
  if (state.source !== "preview") {
    ui.loadButton.querySelector(".button-label").textContent = state.mode === "archive" ? "Update archive radar" : "Update live radar";
  }
}

function selectSite(code, { fly = false, reload = false } = {}) {
  code = normalizeRadarSiteCode(code);
  if (!SITES[code]) return;
  const changed = state.site !== code;
  state.site = code;
  ui.siteSelect.value = code;
  savePreferences();
  updateStationLabels();
  updateSitePillSelection();
  updateConditionCard();
  if (fly) centerSelectedRadar(true);

  if (state.source === "preview") {
    renderPreview();
  } else if (changed && reload) {
    loadRadar();
  } else if (changed) {
    markControlsChanged();
  }
}

function createSitePills() {
  ui.siteMarkerLayer.innerHTML = "";
  state.markerElements.clear();

  Object.entries(SITES).forEach(([code, site]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "site-pill";
    button.dataset.site = code;
    button.setAttribute("aria-label", `Select ${code}, ${site.short}`);
    button.title = `${code} · ${site.short}`;
    button.innerHTML = `<i aria-hidden="true"></i><span>${code}</span><em>${site.short}</em>`;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const wasPreview = state.source === "preview";
      selectSite(code, { fly: true, reload: !wasPreview });
      // A radar-site click is an explicit user request, so production can fetch
      // the one-scan first paint immediately. The self-contained demo remains
      // data-free and only changes the visual selection.
      if (wasPreview && !STATIC_PREVIEW) loadRadar();
    });
    ui.siteMarkerLayer.append(button);
    state.markerElements.set(code, button);
  });

  updateSitePillSelection();
  requestAnimationFrame(updateSitePillPositions);
}

function updateSitePillSelection() {
  state.markerElements.forEach((element, code) => element.classList.toggle("selected", code === state.site));
}

function updateSitePillPositions() {
  const rect = ui.radarStage.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const zoom = Number(state.mapReady && state.map?.getZoom?.() || 0);
  const detail = Boolean(state.mapReady && zoom >= 6.5);
  const overview = Boolean(state.mapReady && zoom < 4.2);
  ui.siteMarkerLayer.classList.toggle("detail", detail);

  state.markerElements.forEach((element, code) => {
    const site = SITES[code];
    let x;
    let y;
    if (state.mapReady && state.map) {
      const point = state.map.project([site.lon, site.lat]);
      x = point.x;
      y = point.y;
    } else {
      const bounds = activeSiteBounds();
      x = ((site.lon - bounds.west) / (bounds.east - bounds.west)) * rect.width;
      y = ((bounds.north - site.lat) / (bounds.north - bounds.south)) * rect.height;
    }
    const margin = 42;
    const offscreen = x < -margin || y < -margin || x > rect.width + margin || y > rect.height + margin;
    element.classList.toggle("offscreen", offscreen || (overview && code !== state.site));
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
}

function resizeMapToStage() {
  if (!state.mapReady || !state.map) return;
  state.map.resize?.();
  updateSitePillPositions();
  if (state.radarLayer || state.hasRenderedRadar) pulseCanvasSource(state.map.getSource?.(MAP.sourceId));
}

function scheduleMapResize() {
  requestAnimationFrame(() => resizeMapToStage());
}

function activeSiteBounds(paddingRatio = 0.08) {
  const sites = Object.values(SITES).filter((site) => Number.isFinite(site.lat) && Number.isFinite(site.lon));
  if (!sites.length) return { west: -126.5, east: -65.0, south: 23.0, north: 50.8 };

  const bounds = sites.reduce((current, site) => ({
    west: Math.min(current.west, site.lon),
    east: Math.max(current.east, site.lon),
    south: Math.min(current.south, site.lat),
    north: Math.max(current.north, site.lat),
  }), { west: Infinity, east: -Infinity, south: Infinity, north: -Infinity });

  const lonPadding = Math.max(0.75, (bounds.east - bounds.west) * paddingRatio);
  const latPadding = Math.max(0.75, (bounds.north - bounds.south) * paddingRatio);
  return {
    west: Math.max(-180, bounds.west - lonPadding),
    east: Math.min(180, bounds.east + lonPadding),
    south: Math.max(-85, bounds.south - latPadding),
    north: Math.min(85, bounds.north + latPadding),
  };
}

function activeMapBounds() {
  const bounds = activeSiteBounds();
  return [[bounds.west, bounds.south], [bounds.east, bounds.north]];
}

function initialMapView() {
  const site = SITES[state.site] || SITES[DEFAULTS.site];
  if (site) {
    return {
      center: [site.lon, site.lat],
      zoom: 6.1,
    };
  }

  const bounds = activeSiteBounds();
  const lonSpan = bounds.east - bounds.west;
  const latSpan = bounds.north - bounds.south;
  const span = Math.max(lonSpan, latSpan);
  const zoom = span > 40 ? 3.15 : span > 24 ? 3.6 : span > 16 ? 4.1 : span > 10 ? 4.55 : span > 5 ? 5.05 : 6.0;
  return {
    center: [(bounds.west + bounds.east) / 2, (bounds.south + bounds.north) / 2],
    zoom,
  };
}

async function initializeMap() {
  try {
    await ensureMapLibre();
    if (!window.maplibregl) throw new Error("MapLibre did not initialize.");
    const view = initialMapView();

    state.map = new window.maplibregl.Map({
      container: ui.mapElement,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [MAP.tileUrl],
            tileSize: 256,
            maxzoom: MAP.maxZoom,
            attribution: MAP.attribution,
          },
        },
        layers: [{ id: "osm-basemap", type: "raster", source: "osm", minzoom: 0, maxzoom: MAP.maxZoom }],
      },
      center: view.center,
      zoom: view.zoom,
      minZoom: 2.1,
      maxZoom: Math.min(16, MAP.maxZoom),
      pitchWithRotate: false,
      dragRotate: false,
      touchPitch: false,
      attributionControl: true,
      cooperativeGestures: false,
    });

    state.map.addControl(new window.maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }), "top-right");
    window.addEventListener("resize", scheduleMapResize);
    if (window.ResizeObserver && !state.mapResizeObserver) {
      state.mapResizeObserver = new ResizeObserver(scheduleMapResize);
      state.mapResizeObserver.observe(ui.radarStage);
    }
    state.map.on("move", updateSitePillPositions);
    state.map.on("zoom", updateSitePillPositions);
    state.map.on("load", () => {
      state.mapReady = true;
      ui.radarStage.classList.add("map-ready");
      ui.conditionMap.textContent = "OpenStreetMap";
      scheduleMapResize();
      updateSitePillPositions();
      if (state.radarLayer || state.source === "preview") mountRadarCanvas(state.radarLayer);
      if (POLAR_RENDER_EXPERIMENT && state.polarLayerData && ensurePolarRadarLayer()) setRadarRasterFallbackVisible(false);
      state.glm?.mapReady();
    });
    state.map.on("error", (event) => {
      if (!state.mapReady) console.info("Basemap resource error; retaining static fallback.", event?.error || event);
    });
  } catch (error) {
    state.mapFailed = true;
    ui.conditionMap.textContent = "Map preview";
    console.info("OpenStreetMap basemap unavailable; using the built-in fallback map.", error);
    updateSitePillPositions();
  }
}

async function ensureMapLibre() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);

  const cssUrls = [MAP.cssUrl, ...MAP.cssFallbackUrls].filter(Boolean);
  for (const href of cssUrls) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.append(link);
    }
  }

  const libraryUrls = [MAP.libraryUrl, ...MAP.libraryFallbackUrls].filter(Boolean);
  let lastError = null;
  for (const url of libraryUrls) {
    try {
      await loadMapLibreScript(url);
      if (window.maplibregl) return window.maplibregl;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Could not load MapLibre GL JS.");
}

function loadMapLibreScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve(window.maplibregl);
      return;
    }
    if (existing && existing.dataset.failed !== "true") {
      existing.addEventListener("load", () => resolve(window.maplibregl), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Could not load MapLibre GL JS from ${url}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve(window.maplibregl);
    };
    script.onerror = () => {
      script.dataset.failed = "true";
      reject(new Error(`Could not load MapLibre GL JS from ${url}`));
    };
    document.head.append(script);
  });
}

function fitNetwork() {
  if (state.mapReady && state.map) {
    state.map.fitBounds(activeMapBounds(), { padding: { top: 52, right: 48, bottom: 48, left: 48 }, duration: 650 });
  } else {
    showToast("The network overview is already visible in the fallback map");
  }
}

function centerSelectedRadar(animate = false) {
  const site = SITES[state.site];
  if (state.mapReady && state.map) {
    state.map.flyTo({ center: [site.lon, site.lat], zoom: Math.max(state.map.getZoom(), 6.1), duration: animate ? 650 : 0, essential: true });
  }
}

function setArchiveDefaults() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  ui.archiveDate.max = formatDateInput(now);
  ui.archiveDate.value = formatDateInput(yesterday);
}

function formatDateInput(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function truthyUrlParam(value) {
  return /^(1|true|yes|on)$/i.test(String(value || "").trim());
}

function parseArchiveUrlTime(params) {
  const isoValue = params.get("time") || params.get("archive") || params.get("at");
  if (isoValue) {
    const normalized = String(isoValue).trim();
    const date = new Date(normalized);
    if (Number.isFinite(date.getTime())) {
      const iso = date.toISOString();
      return {
        iso,
        date: iso.slice(0, 10),
        time: iso.slice(11, 16),
      };
    }
  }

  const dateValue = params.get("date") || params.get("archiveDate");
  const timeValue = params.get("utc") || params.get("archiveTime");
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(dateValue || "")) && /^\d{2}:\d{2}(:\d{2})?$/.test(String(timeValue || ""))) {
    const date = new Date(`${dateValue}T${timeValue}${String(timeValue).length === 5 ? ":00" : ""}Z`);
    if (Number.isFinite(date.getTime())) {
      const iso = date.toISOString();
      return {
        iso,
        date: iso.slice(0, 10),
        time: iso.slice(11, 16),
      };
    }
  }

  return null;
}

function parseUrlLink(params) {
  const archive = parseArchiveUrlTime(params);
  const modeParam = String(params.get("mode") || "").toLowerCase();
  const productParam = String(params.get("product") || "").toUpperCase();
  const profileParam = String(params.get("profile") || "").toLowerCase();
  const rawFramesParam = params.get("frames") || params.get("frameCount") || params.get("loop");
  const framesParam = rawFramesParam == null ? NaN : Number(rawFramesParam);
  return {
    mode: modeParam === "archive" || archive ? "archive" : modeParam === "live" ? "live" : "",
    product: PRODUCTS[productParam] ? productParam : "",
    profile: PROFILES[profileParam] ? profileParam : "",
    frames: Number.isFinite(framesParam) ? framesParam : null,
    autoload: truthyUrlParam(params.get("autoload")) || truthyUrlParam(params.get("load")),
    archive: archive
      ? {
        ...archive,
        center: truthyUrlParam(params.get("center")) || /^(middle|center|peak|event)$/i.test(String(params.get("target") || "")),
      }
      : null,
  };
}

function applyArchiveLinkToControls() {
  if (!state.archiveLink) return;
  ui.archiveDate.value = state.archiveLink.date;
  ui.archiveTime.value = state.archiveLink.time;
}

function currentArchiveTargetTime(date, time) {
  const link = state.archiveLink;
  if (link?.iso && link.date === date && link.time === time) return link.iso;
  return new Date(`${date}T${time}:00Z`).toISOString();
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function formatCatalogClass(value = "") {
  return String(value || "").replaceAll("_", " ");
}

function catalogDayText(record) {
  return [
    record.day,
    record.risk,
    record.primary,
    record.ofb,
    record.ofb_reason,
    record.narrative,
    ...(record.secondary || []),
    ...(record.tags || []),
    ...(record.boundaries || []),
    ...(record.modes || []),
    ...(record.hazards || []),
    ...(record.challenges || []),
  ].join(" ").toLowerCase();
}

async function catalogJson(path) {
  const response = await fetch(`${SPC_ARCHIVE_DATA_BASE}/${path}`);
  if (!response.ok) throw new Error(`catalog ${path} HTTP ${response.status}`);
  return response.json();
}

async function openArchiveCatalog() {
  if (ui.catalogDialog?.showModal) ui.catalogDialog.showModal();
  else ui.catalogDialog?.setAttribute("open", "");
  await ensureArchiveCatalog();
}

async function ensureArchiveCatalog() {
  if (state.catalog.records.length || state.catalog.loading) {
    renderCatalog();
    return;
  }
  state.catalog.loading = true;
  ui.catalogStatus.textContent = "Loading SPC enhanced-day archive...";
  try {
    const [records, summary] = await Promise.all([
      catalogJson("classifications.json"),
      catalogJson("tornado_radar_summary.json").catch(() => ({ days: {} })),
    ]);
    state.catalog.records = records.sort((a, b) => b.day.localeCompare(a.day));
    state.catalog.summary = summary;
    ui.catalogStatus.textContent = `${records.length.toLocaleString()} classified days loaded`;
    renderCatalog();
  } catch (error) {
    ui.catalogStatus.textContent = `Catalog load failed: ${friendlyError(error)}`;
    ui.catalogDetail.innerHTML = `<p class="catalog-empty">Could not load the SPC archive catalog.</p>`;
  } finally {
    state.catalog.loading = false;
  }
}

function catalogMatchesPreset(record, preset) {
  const text = catalogDayText(record);
  if (preset === "mcswind") return /mcs|derecho|bow|qlcs|wind/.test(text);
  if (preset === "hail") return /hail|lapse/.test(text);
  if (preset === "tornado") return /tornado|supercell|cyclic/.test(text) || Boolean(state.catalog.summary?.days?.[record.day]);
  if (preset === "ofb") return ["core", "likely"].includes(record.ofb);
  if (preset === "high") return record.risk === "HIGH";
  return true;
}

function renderCatalog() {
  const query = String(ui.catalogSearch?.value || "").trim().toLowerCase();
  const preset = ui.catalogPreset?.value || "all";
  const filtered = state.catalog.records.filter((record) => {
    if (!catalogMatchesPreset(record, preset)) return false;
    return !query || catalogDayText(record).includes(query);
  });
  state.catalog.filtered = filtered;
  ui.catalogCount.textContent = `${filtered.length.toLocaleString()} days`;
  ui.catalogDayList.innerHTML = filtered.slice(0, 250).map((record) => {
    const selected = record.day === state.catalog.selectedDay ? " selected" : "";
    const torn = state.catalog.summary?.days?.[record.day];
    const torText = torn ? `${torn.tornado_count} tor ${torn.strongest_rating || ""}` : "";
    return `
      <button class="catalog-day${selected}" type="button" data-day="${escapeHtml(record.day)}">
        <b>${escapeHtml(record.day)}</b>
        <span>${escapeHtml(record.risk)}</span>
        <span>${escapeHtml(formatCatalogClass(record.primary))}</span>
        <small>${escapeHtml(record.ofb || "none")} OFB/MCS ${escapeHtml(torText)}</small>
      </button>
    `;
  }).join("");
  if (!filtered.length) {
    ui.catalogDayList.innerHTML = `<p class="catalog-empty">No matching days.</p>`;
  }
}

async function selectCatalogDay(day) {
  const record = state.catalog.records.find((item) => item.day === day);
  if (!record) return;
  state.catalog.selectedDay = day;
  state.catalog.currentTargets = [];
  renderCatalog();
  renderCatalogDetail(record, { loading: true });
  try {
    if (!state.engineReady) await detectEngine();
    const eventDay = await fetchCatalogReports(day);
    const targets = buildCatalogTargets(record, eventDay).slice(0, CATALOG_TARGET_LIMIT);
    state.catalog.currentTargets = targets;
    renderCatalogDetail(record, { eventDay, targets });
    ui.catalogStatus.textContent = `${day}: ${targets.length} radar target${targets.length === 1 ? "" : "s"} generated`;
  } catch (error) {
    renderCatalogDetail(record, { error });
    ui.catalogStatus.textContent = `${day}: target generation failed`;
  }
}

async function fetchCatalogReports(day) {
  if (state.catalog.reportsCache.has(day)) return state.catalog.reportsCache.get(day);
  const loader = state.module?.fetchSpcEventDay;
  if (typeof loader !== "function") throw new Error("SPC report parser is not available yet.");
  const promise = loader(day, { includeConsolidated: false });
  state.catalog.reportsCache.set(day, promise);
  return promise;
}

function dominantCatalogKind(record) {
  const text = catalogDayText(record);
  if (/mcs|derecho|bow|qlcs|wind damage|damaging wind/.test(text)) return "wind";
  if (/hail|lapse rate/.test(text)) return "hail";
  if (/tornado|supercell|cyclic/.test(text)) return "tornado";
  return "";
}

function reportMagnitude(report) {
  const match = String(report.magnitude || "").match(/\d+(?:\.\d+)?/);
  const numeric = match ? Number(match[0]) : 0;
  if (!Number.isFinite(numeric)) return 0;
  if (report.kind === "hail" && numeric > 20) return numeric / 100;
  return numeric;
}

function catalogReportScore(report, preferredKind) {
  const kindBase = report.kind === "tornado" ? 3500 : report.kind === "wind" ? 2500 : report.kind === "hail" ? 2200 : 1000;
  const preferred = preferredKind && report.kind === preferredKind ? 20000 : 0;
  const magnitude = report.kind === "hail" ? reportMagnitude(report) * 900 : reportMagnitude(report) * 35;
  return kindBase + preferred + magnitude;
}

function nearestCatalogRadars(report, limit = 3) {
  const lat = Number(report.lat ?? report.beginLat ?? report.begin_lat);
  const lon = Number(report.lon ?? report.lng ?? report.beginLon ?? report.begin_lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return [];
  return Object.entries(SITES)
    .map(([id, site]) => ({
      id,
      name: site.short || site.name || id,
      distanceMi: haversineMiles(lat, lon, Number(site.lat), Number(site.lon)),
    }))
    .filter((radar) => Number.isFinite(radar.distanceMi))
    .sort((a, b) => a.distanceMi - b.distanceMi)
    .slice(0, limit);
}

function haversineMiles(lat1, lon1, lat2, lon2) {
  const toRad = (value) => value * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function buildCatalogTargets(record, eventDay) {
  const preferredKind = dominantCatalogKind(record);
  const reports = Array.from(eventDay?.reports || [])
    .filter((report) => report?.timeUtc && Number.isFinite(Number(report.lat)) && Number.isFinite(Number(report.lon)))
    .map((report, index) => {
      const radars = nearestCatalogRadars(report);
      return {
        id: `${record.day}-${index}`,
        record,
        report,
        radars,
        score: catalogReportScore(report, preferredKind),
      };
    })
    .filter((target) => target.radars.length);

  const selected = [];
  const seen = new Set();
  for (const target of reports.sort((a, b) => b.score - a.score)) {
    const hour = String(target.report.timeUtc).slice(0, 13);
    const latBucket = Math.round(Number(target.report.lat) * 2) / 2;
    const lonBucket = Math.round(Number(target.report.lon) * 2) / 2;
    const key = `${target.report.kind}:${hour}:${latBucket}:${lonBucket}`;
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(target);
    if (selected.length >= CATALOG_TARGET_LIMIT) break;
  }
  return selected;
}

function renderCatalogDetail(record, { loading = false, eventDay = null, targets = [], error = null } = {}) {
  const text = catalogDayText(record);
  const packs = [
    record.risk,
    `${record.ofb || "none"} OFB/MCS`,
    ...(record.hazards || []).slice(0, 4),
    ...(record.modes || []).slice(0, 4),
    ...(record.tags || []).slice(0, 5),
  ].filter(Boolean);
  const reportCounts = eventDay?.reports?.reduce((acc, report) => {
    acc[report.kind] = (acc[report.kind] || 0) + 1;
    return acc;
  }, {}) || {};
  ui.catalogDetail.innerHTML = `
    <h3>${escapeHtml(record.day)} - ${escapeHtml(formatCatalogClass(record.primary))}</h3>
    <p>${escapeHtml(record.narrative || "")}</p>
    <div class="catalog-chip-row">${packs.map((item) => `<span class="catalog-chip">${escapeHtml(formatCatalogClass(item))}</span>`).join("")}</div>
    <p class="catalog-muted">${escapeHtml(record.ofb_reason || "")}</p>
    ${loading ? `<p class="catalog-empty">Generating report-based radar targets...</p>` : ""}
    ${error ? `<p class="catalog-empty">Could not generate targets: ${escapeHtml(friendlyError(error))}</p>` : ""}
    ${eventDay ? `<p class="catalog-muted">SPC reports: ${reportCounts.wind || 0} wind, ${reportCounts.hail || 0} hail, ${reportCounts.tornado || 0} tornado. Showing top ${targets.length} ranked radar targets.</p>` : ""}
    ${targets.length ? `<div class="catalog-target-list">${targets.map(renderCatalogTarget).join("")}</div>` : (!loading && !error ? `<p class="catalog-empty">No report-based targets found for this day.</p>` : "")}
  `;
}

function renderCatalogTarget(target) {
  const report = target.report;
  const time = new Date(report.timeUtc);
  const label = `${String(report.kind || "report").toUpperCase()} ${report.magnitudeLabel || report.magnitude || ""}`.trim();
  const place = [report.location, report.county, report.state].filter(Boolean).join(", ");
  return `
    <article class="catalog-target">
      <div class="catalog-target-head">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(Number.isFinite(time.getTime()) ? formatTime(time, true) : String(report.timeUtc))}</span>
      </div>
      <div class="catalog-target-meta">
        <span>${escapeHtml(place || `${report.lat}, ${report.lon}`)}</span>
        <span>score ${Math.round(target.score)}</span>
      </div>
      <div class="catalog-radar-row">
        ${target.radars.map((radar, index) => `<button type="button" data-catalog-target="${escapeHtml(target.id)}:${index}">${escapeHtml(radar.id)} ${Math.round(radar.distanceMi)} mi</button>`).join("")}
      </div>
    </article>
  `;
}

function catalogTargetById(value) {
  const [targetId, radarIndexText] = String(value || "").split(":");
  const target = state.catalog.currentTargets.find((item) => item.id === targetId);
  const radar = target?.radars?.[Number(radarIndexText) || 0];
  return target && radar ? { ...target, radar } : null;
}

async function loadCatalogTarget(target) {
  const report = target.report;
  const radar = target.radar;
  const targetDate = new Date(report.timeUtc);
  if (!Number.isFinite(targetDate.getTime())) {
    showToast("That report does not have a usable UTC time");
    return;
  }
  const site = normalizeRadarSiteCode(radar.id);
  if (!SITES[site] && !state.siteCatalogHydrated) await detectEngine();
  if (!SITES[site]) {
    showToast(`Radar ${site} is not available in the current catalog`);
    return;
  }

  const iso = targetDate.toISOString();
  state.requestedSite = site;
  state.archiveLink = {
    iso,
    date: iso.slice(0, 10),
    time: iso.slice(11, 16),
    center: true,
  };
  state.site = site;
  state.mode = "archive";
  state.product = "REF";
  state.loopCount = normalizeLoopCount(3);
  ui.archiveDate.value = state.archiveLink.date;
  ui.archiveTime.value = state.archiveLink.time;
  savePreferences();
  syncControls();
  centerSelectedRadar(true);
  ui.catalogDialog?.close();
  showToast(`Loading ${site} ${String(report.kind || "report")} target at ${state.archiveLink.time}Z`);
  await loadRadar();
}

function readPreferences() {
  try {
    return JSON.parse(localStorage.getItem("meowdar-preferences-v2") || "{}");
  } catch {
    return {};
  }
}

function savePreferences() {
  try {
    localStorage.setItem("meowdar-preferences-v2", JSON.stringify({
      site: state.site,
      product: state.product,
      mode: state.mode,
      profile: state.profile,
      loopCount: state.loopCount,
      quality: state.quality,
      followLatestLow: state.followLatestLow,
      lowTiltMax: state.lowTiltMax,
      loopSpeedMs: state.loopSpeedMs,
      endDwellMs: state.endDwellMs,
    }));
  } catch {
    // Local storage is optional.
  }
}

function resetControls() {
  state.site = DEFAULTS.site;
  state.mode = DEFAULTS.mode;
  state.product = DEFAULTS.product;
  state.profile = DEFAULTS.profile;
  state.loopCount = DEFAULTS.loopCount;
  state.quality = DEFAULTS.quality;
  state.followLatestLow = DEFAULTS.followLatestLow;
  state.lowTiltMax = DEFAULTS.lowTiltMax;
  state.loopSpeedMs = DEFAULTS.loopSpeedMs;
  state.endDwellMs = DEFAULTS.endDwellMs;
  state.frameIndex = state.loopCount - 1;
  state.allCuts = [];
  savePreferences();
  syncControls();
  stopPlayback();
  cleanupRadarSession();
  state.source = "preview";
  ui.emptyLayer.hidden = true;
  refreshDemoTimes();
  renderPreview();
  centerSelectedRadar(true);
  showToast("Radar controls reset");
}

async function detectEngine() {
  try {
    const module = await import("./vendor/radar-toolbox.js?v=native-ppi-2");
    const createToolbox = module.createRadarToolbox;
    if (typeof createToolbox !== "function") throw new Error("The BowEcho module does not export createRadarToolbox().");
    state.module = module;
    state.toolbox = createToolbox();
    if (state.perf?.enabled) instrumentToolboxForPerf(state.toolbox);
    hydrateRadarSites(module);
    if (state.toolbox?.configureCache) {
      const cores = Math.max(2, Number(navigator.hardwareConcurrency || 4));
      await state.toolbox.configureCache(cores <= 4
        ? { volumes: 6, renders: 10, metadata: 32 }
        : { volumes: 12, renders: 20, metadata: 64 });
    }
    state.paletteManager?.connectToolbox(state.toolbox);
    state.engineReady = true;
    ui.engineBadge.textContent = "Engine ready";
    ui.engineBadge.classList.add("ready");
  } catch (error) {
    state.engineReady = false;
    console.info("BowEcho live engine is not installed; staying in map preview mode.", error);
  }
}

async function loadRadar() {
  if (state.loading) return;
  stopPlayback();
  ui.emptyLayer.hidden = true;
  const generation = ++state.loadGeneration;
  state.backgroundGeneration += 1;
  hideBackgroundProgress();

  if (!state.engineReady) {
    setLoading(true, "Checking radar engine", "Looking for the local BowEcho browser bundle…");
    await detectEngine();
    if (generation !== state.loadGeneration) return;
    setLoading(false);
  }

  if (!state.engineReady) {
    ui.emptyLayer.hidden = false;
    return;
  }

  try {
    if (state.mode === "archive") await loadArchiveRadar(generation);
    else await loadLiveRadar(generation);
  } catch (error) {
    if (generation !== state.loadGeneration) return;
    console.error(error);
    showToast(`Radar load failed: ${friendlyError(error)}`);
    ui.emptyLayer.hidden = false;
    ui.emptyLayer.querySelector("strong").textContent = "Radar data could not be loaded";
    ui.emptyLayer.querySelector("p").textContent = "The public provider may be unavailable, blocked by browser policy, or outside the selected station's archive history. The map preview remains available.";
  } finally {
    if (generation === state.loadGeneration) setLoading(false);
  }
}

async function loadLiveRadar(generation) {
  const profile = PROFILES[state.profile];
  const initialFrameCount = 1;
  const targetFrameCount = state.loopCount;
  setLoading(
    true,
    `Loading the newest ${state.site} scan`,
    targetFrameCount > 1
      ? "Fetching the newest Level II volume first..."
      : "Fetching one Level II volume..."
  );
  cleanupRadarSession({ preserveGeneration: true });

  const options = radarOptionsWithProgress(
    radarOptions({ mode: "live", frameCount: initialFrameCount }),
    "live.initialLoad",
  );
  state.session = createSession(options);

  if (typeof state.session.subscribe === "function") {
    state.unsubscribe = state.session.subscribe((snapshot) => {
      if (generation !== state.loadGeneration) return;
      state.snapshot = snapshot;
      syncSessionSnapshot(snapshot);
    });
  }

  await timeAsync("live.initialLoad", { frameCount: initialFrameCount }, () =>
    state.session.load({ ...options, frameCount: initialFrameCount, concurrency: 1 })
  );
  if (generation !== state.loadGeneration) return;

  state.snapshot = state.session.snapshot?.() || state.snapshot;
  state.allCuts = readSessionCuts();
  state.source = "live";
  state.loop = null;
  await moveLiveToLatest();
  syncSessionSnapshot(state.snapshot);
  let rendered = await settleLiveSnapshot();
  if (!rendered && liveFrameCount() > 1) {
    rendered = await settleBestLiveFrame({ startIndex: liveFrameCount() - 1, allowNewerFallback: false });
  }
  if (!rendered) showToast("Waiting for the newest complete low sweep");
  setLivePresentation("Live", "NOAA Level II");
  setLoading(false);
  scheduleLivePoll();

  if (targetFrameCount > initialFrameCount) scheduleLiveBackgroundLoop(generation, profile);
  else if (targetFrameCount > 1) await warmPlaybackFrameCache();
}

function createSession(options) {
  if (typeof state.toolbox?.createSession === "function") return state.toolbox.createSession(options);
  if (typeof state.module?.createRadarSession === "function") return state.module.createRadarSession(state.toolbox, options);
  throw new Error("This BowEcho build does not expose a radar session API.");
}

function radarOptions({ mode, frameCount }) {
  const profile = PROFILES[state.profile];
  return {
    site: state.site,
    mode,
    product: state.product,
    frameCount,
    width: profile.renderSize,
    height: profile.renderSize,
    rangeKm: DEFAULTS.rangeKm,
    smoothing: profile.smoothing,
    maxTilt: activeTiltCeiling(),
    ...state.paletteManager?.renderOverrides(state.product),
  };
}

function radarOptionsWithProgress(options, scope) {
  return {
    ...options,
    onProgress: (event) => markPerf("bowecho.progress", {
      scope,
      stage: event?.stage,
      site: event?.site,
      mode: event?.mode,
      product: event?.product,
      cut: event?.cut,
      frames: event?.frames,
    }),
  };
}

function scheduleLiveBackgroundLoop(generation, profile) {
  const backgroundId = ++state.backgroundGeneration;
  scheduleIdle(async () => {
    if (generation !== state.loadGeneration || backgroundId !== state.backgroundGeneration || !state.session) return;
    state.loopBuilding = true;
    showBackgroundProgress(`Adding ${state.loopCount - 1} older scans…`);
    try {
      if (typeof state.session.setLoop === "function" && state.toolbox?.livePlusArchiveFrames && state.toolbox?.renderFrame) {
        await expandLiveLoopIncrementally();
      } else {
        const options = radarOptionsWithProgress(
          radarOptions({ mode: "live", frameCount: state.loopCount }),
          "live.loopLoad",
        );
        await timeAsync("live.loopLoad", { frameCount: state.loopCount }, () =>
          state.session.load({ ...options, concurrency: 1 })
        );
      }
      if (generation !== state.loadGeneration || backgroundId !== state.backgroundGeneration) return;
      state.snapshot = state.session.snapshot?.() || state.snapshot;
      await moveLiveToLatest();
      await settleLiveSnapshot();
      await warmPlaybackFrameCache();
      showToast(`${liveFrameCount()}-scan loop ready`);
    } catch (error) {
      console.warn("Background loop expansion failed; keeping the first scan.", error);
      showToast("The first scan is ready; older loop frames could not be added");
    } finally {
      if (backgroundId === state.backgroundGeneration) {
        state.loopBuilding = false;
        hideBackgroundProgress();
      }
    }
  });
}

async function expandLiveLoopIncrementally() {
  const options = radarOptionsWithProgress(
    radarOptions({ mode: "live", frameCount: state.loopCount }),
    "live.loopExpand",
  );
  await timeAsync("live.loopExpand", { frameCount: state.loopCount }, async () => {
    const existingLoop = state.session?.loop;
    const existingRendered = new Map();
    for (const rendered of existingLoop?.renderedFrames || []) {
      const frame = rendered?.frame || rendered?.sourceFrame || rendered;
      for (const key of renderedFrameLookupKeys(frame)) existingRendered.set(key, rendered);
    }

    const frames = await state.toolbox.livePlusArchiveFrames(state.site, state.loopCount, options);
    const cut = Number.isFinite(Number(state.session?.cut))
      ? Number(state.session.cut)
      : Number.isFinite(Number(existingLoop?.cut))
        ? Number(existingLoop.cut)
        : Number.isFinite(Number(currentCutIndex()))
          ? Number(currentCutIndex())
          : 0;
    const renderOptions = { ...options, cut };
    delete renderOptions.onProgress;

    const renderedFrames = [];
    for (const frame of frames) {
      const cached = renderedFrameLookupKeys(frame)
        .map((key) => existingRendered.get(key))
        .find(Boolean);
      if (cached) {
        renderedFrames.push(cached);
        continue;
      }
      try {
        const rendered = await timeAsync("live.loopRenderMissingFrame", { frame: frameIdentity(frame), cut }, () =>
          state.toolbox.renderFrame(frame, renderOptions)
        );
        renderedFrames.push(rendered);
      } catch (error) {
        console.warn("Skipped an older live loop frame that could not render.", error);
      }
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    if (!renderedFrames.length) throw new Error("no renderable live loop frames");
    const loop = makeSessionLoop({
      site: state.site,
      mode: "live",
      product: state.product,
      cut,
      frames,
      renderedFrames,
      meta: existingLoop?.meta || renderedFrames[renderedFrames.length - 1]?.meta || null,
      renderOptions,
    });
    if (typeof state.session.applyOptions === "function") state.session.applyOptions({ frameCount: state.loopCount, cut });
    else state.session.frameCount = state.loopCount;
    state.session.setLoop(loop, "latest");
  });
}

function renderedFrameLookupKeys(frame) {
  const keys = [
    frame?.cacheKey,
    frame?.id,
    frameIdentity(frame),
  ];
  const time = extractFrameTime(frame);
  if (time) keys.push(`time:${time.toISOString()}`);
  return [...new Set(keys.filter(Boolean))];
}

function makeSessionLoop({ site, mode, product, cut, frames, renderedFrames, meta, renderOptions }) {
  return {
    site,
    mode,
    product,
    cut,
    frames,
    renderedFrames,
    meta,
    renderOptions,
    get length() {
      return this.renderedFrames.length;
    },
    frame(index = this.renderedFrames.length - 1) {
      const safeIndex = Math.max(0, Math.min(this.renderedFrames.length - 1, Number(index) || 0));
      return this.renderedFrames[safeIndex];
    },
  };
}

async function loadArchiveRadar(generation) {
  const date = ui.archiveDate.value;
  const time = ui.archiveTime.value || "12:00";
  if (!date) throw new Error("Choose an archive date.");

  const targetTime = currentArchiveTargetTime(date, time);
  setLoading(true, `Finding the nearest ${state.site} archive scan`, `Searching ${date} ${time} UTC…`);
  cleanupRadarSession({ preserveGeneration: true });

  const options = radarOptions({ mode: "archive", frameCount: 1 });
  state.loop = await state.toolbox.loadArchiveLoop(state.site, date, {
    targetTime,
    frameCount: 1,
    product: options.product,
    width: options.width,
    height: options.height,
    rangeKm: options.rangeKm,
    smoothing: options.smoothing,
    maxTilt: options.maxTilt,
    ...state.paletteManager?.renderOverrides(state.product),
    concurrency: 1,
  });
  if (generation !== state.loadGeneration) return;

  const count = archiveFrameCount();
  if (!count) throw new Error("No scans were returned for that archive time.");

  state.source = "archive";
  state.frameIndex = count - 1;
  await settleArchiveFrame();
  setLivePresentation("Archive", `NOAA Level II · ${date}`);
  setLoading(false);

  if (state.loopCount > 1) scheduleArchiveBackgroundLoop(generation, date, targetTime);
}

async function loadArchiveLoopAroundTarget(site, date, options) {
  const frameCount = normalizeLoopCount(options.frameCount);
  const centerTarget = Boolean(options.centerTarget && frameCount > 1 && options.targetTime);
  if (!centerTarget || typeof state.toolbox?.archiveFramesForDate !== "function" || typeof state.toolbox?.archiveFrameWindow !== "function") {
    return state.toolbox.loadArchiveLoop(site, date, options);
  }

  const archiveFrames = await state.toolbox.archiveFramesForDate(site, date);
  const targetWindow = state.toolbox.archiveFrameWindow(archiveFrames, {
    site,
    date,
    targetTime: options.targetTime,
    frameCount: 1,
  });
  const targetGlobalIndex = Number(targetWindow?.endIndex);
  if (!Number.isInteger(targetGlobalIndex) || targetGlobalIndex < 0) {
    return state.toolbox.loadArchiveLoop(site, date, options);
  }

  const selectedIndex = Math.min(archiveFrames.length - 1, targetGlobalIndex + Math.floor(frameCount / 2));
  const loop = await state.toolbox.loadArchiveLoop(site, date, {
    ...options,
    frameCount,
    selectedIndex,
  });
  const localTargetIndex = targetGlobalIndex - Number(loop.archiveWindow?.startIndex ?? 0);
  if (Number.isInteger(localTargetIndex)) {
    loop.meowdarTargetIndex = Math.max(0, Math.min(Number(loop.length || loop.frames?.length || 1) - 1, localTargetIndex));
  }
  return loop;
}

function preferredArchiveFrameIndex(loop) {
  const count = Number(loop?.length || loop?.renderedFrames?.length || loop?.frames?.length || archiveFrameCount());
  if (Number.isInteger(loop?.meowdarTargetIndex)) return Math.max(0, Math.min(count - 1, loop.meowdarTargetIndex));
  return Math.max(0, count - 1);
}

function scheduleArchiveBackgroundLoop(generation, date, targetTime) {
  const backgroundId = ++state.backgroundGeneration;
  const profile = PROFILES[state.profile];
  scheduleIdle(async () => {
    if (generation !== state.loadGeneration || backgroundId !== state.backgroundGeneration) return;
    state.loopBuilding = true;
    showBackgroundProgress(`Building ${state.loopCount}-scan archive loop…`);
    try {
      const expanded = await loadArchiveLoopAroundTarget(state.site, date, {
        targetTime,
        frameCount: state.loopCount,
        centerTarget: state.archiveLink?.center,
        product: state.product,
        width: profile.renderSize,
        height: profile.renderSize,
        rangeKm: DEFAULTS.rangeKm,
        smoothing: profile.smoothing,
        maxTilt: activeTiltCeiling(),
        ...state.paletteManager?.renderOverrides(state.product),
        concurrency: 1,
      });
      if (generation !== state.loadGeneration || backgroundId !== state.backgroundGeneration) return;
      if (!Number(expanded?.length || expanded?.frames?.length || 0)) throw new Error("No additional archive scans were returned.");
      state.loop = expanded;
      state.frameIndex = preferredArchiveFrameIndex(expanded);
      await settleArchiveFrame();
      await warmPlaybackFrameCache();
      showToast(`${archiveFrameCount()}-scan archive loop ready`);
    } catch (error) {
      console.warn("Archive loop expansion failed; keeping the first scan.", error);
      showToast("The archive scan is ready; the wider loop could not be added");
    } finally {
      if (backgroundId === state.backgroundGeneration) {
        state.loopBuilding = false;
        hideBackgroundProgress();
      }
    }
  });
}

async function settleArchiveFrame() {
  const generation = ++state.diagnosticsGeneration;
  const index = state.frameIndex;
  const frame = getArchiveFrame(index);
  if (!frame) return false;
  const key = frameIdentity(frame);
  if (!await assessCurrentFrame(frame, generation)) return false;
  if (generation !== state.diagnosticsGeneration || state.source !== "archive" || state.frameIndex !== index) return false;
  const current = getArchiveFrame(index);
  if (!current || frameIdentity(current) !== key) return false;

  populateTiltChoices(state.allCuts, state.loop?.cut ?? state.loop?.cutIndex ?? currentCutIndex());
  const selected = state.followLatestLow
    ? await selectLowestCut({ render: false })
    : await enforceVisibleTilt({ render: false });
  if (!selected) return false;
  if (generation !== state.diagnosticsGeneration || state.source !== "archive" || state.frameIndex !== index) return false;
  const displayFrame = state.followLatestLow
    ? await renderAdaptiveLowSweepFrame(current, { sourceFrame: getArchiveSourceFrame(index) })
    : current;
  if (generation !== state.diagnosticsGeneration || state.source !== "archive" || state.frameIndex !== index) return false;
  renderArchiveFrame(displayFrame);
  return frameReadyForRender(displayFrame);
}

function cleanupRadarSession({ preserveGeneration = false } = {}) {
  clearTimeout(state.livePollTimer);
  state.livePollTimer = null;
  state.liveFrameHoldUntil = 0;
  state.liveFrameHoldKey = null;
  state.liveFrameHoldTime = null;
  state.backgroundGeneration += 1;
  state.loopBuilding = false;
  hideBackgroundProgress();
  if (typeof state.unsubscribe === "function") state.unsubscribe();
  state.unsubscribe = null;
  if (state.session?.stop) state.session.stop();
  if (state.session?.destroy) state.session.destroy();
  state.session = null;
  state.snapshot = null;
  state.loop = null;
  state.allCuts = [];
  state.activeCut = null;
  state.diagnostics = null;
  state.diagnosticsFrameKey = null;
  state.diagnosticsCache.clear();
  clearAdaptiveFrameCache();
  clearPolarFrameCache();
  clearPlaybackFrameCache();
  removePolarRadarLayer();
  state.waitingForCompleteLow = false;
  state.hasRenderedRadar = false;
  state.snapshotSettleGeneration += 1;
  state.diagnosticsGeneration += 1;
  if (!preserveGeneration) state.loadGeneration += 1;
}

function frameIdentity(frame) {
  const source = frame?.frame ?? frame?.sourceFrame ?? frame?.source ?? frame;
  const metadata = source?.metadata || frame?.metadata || {};
  const key = source?.identity ?? source?.cacheKey ?? source?.key ?? source?.objectKey ?? source?.url ?? source?.id
    ?? metadata.identity ?? metadata.cacheKey ?? metadata.key ?? metadata.url ?? metadata.id;
  const time = extractFrameTime(frame)?.toISOString() || extractFrameTime(source)?.toISOString();
  return `${state.site}:${time || key || "unknown"}`;
}

function currentSourceFrame() {
  if (state.source === "archive") return getArchiveFrame(state.frameIndex);
  if (state.source === "live") return state.session?.currentFrame?.();
  return null;
}

function invalidateCurrentDiagnostics(frame = currentSourceFrame()) {
  if (!frame) return;
  const key = frameIdentity(frame);
  state.diagnosticsCache.delete(key);
  if (state.diagnosticsFrameKey === key) {
    state.diagnostics = null;
    state.diagnosticsFrameKey = null;
  }
}

async function diagnosticsForFrame(frame) {
  if (!frame || typeof state.toolbox?.volumeDiagnostics !== "function") return null;
  const key = frameIdentity(frame);
  if (state.diagnosticsCache.has(key)) return state.diagnosticsCache.get(key);
  const candidates = [frame?.frame, frame?.sourceFrame, frame]
    .filter((candidate, index, list) => candidate && list.indexOf(candidate) === index);
  let lastError = null;
  for (const candidate of candidates) {
    try {
      const diagnostics = await state.toolbox.volumeDiagnostics(candidate);
      if (diagnostics) {
        state.diagnosticsCache.set(key, diagnostics);
        while (state.diagnosticsCache.size > 18) state.diagnosticsCache.delete(state.diagnosticsCache.keys().next().value);
        return diagnostics;
      }
    } catch (error) {
      lastError = error;
    }
  }
  if (lastError) console.warn("BowEcho volume diagnostics failed; using conservative cut metadata.", lastError);
  return null;
}

function markDiagnosticsPending(key) {
  if (state.diagnosticsFrameKey === key && state.diagnostics) return;
  state.diagnostics = null;
  state.diagnosticsFrameKey = key;
  state.waitingForCompleteLow = true;
  if (ui.conditionQuality) ui.conditionQuality.textContent = state.hasRenderedRadar ? "Holding last complete" : "Checking sweep";
  if (ui.scanQualityPill) {
    ui.scanQualityPill.textContent = state.hasRenderedRadar ? "QC · holding" : "QC · checking";
    ui.scanQualityPill.classList.remove("good", "bad");
    ui.scanQualityPill.classList.add("warning");
  }
}

async function assessCurrentFrame(frame, generation) {
  const key = frameIdentity(frame);
  const cached = state.diagnosticsCache.get(key);
  if (cached) {
    state.diagnostics = cached;
    state.diagnosticsFrameKey = key;
  } else {
    markDiagnosticsPending(key);
    state.diagnostics = await timeAsync("frame.diagnostics", { key }, () => diagnosticsForFrame(frame));
  }
  if (generation !== state.diagnosticsGeneration) return false;

  state.diagnosticsFrameKey = key;
  state.allCuts = state.source === "archive" ? extractLoopCuts(state.loop) : readSessionCuts();
  const accepted = selectAvailableCuts(state.allCuts, {
    diagnostics: state.diagnostics,
    product: state.product,
    quality: state.quality,
    maxTilt: activeTiltCeiling(),
  });
  state.waitingForCompleteLow = accepted.length === 0;
  return true;
}

function syncSessionSnapshot(snapshot) {
  if (!snapshot) return;
  const cuts = snapshot.cuts || snapshot.capabilities?.cuts || readSessionCuts();
  if (Array.isArray(cuts) && cuts.length) state.allCuts = cuts;
  if (Number.isInteger(snapshot.index)) {
    const count = Math.max(1, Number(snapshot.timeline?.length || snapshot.length || snapshot.frameCount || currentFrameCount()));
    const snapshotIsLatest = snapshot.index >= count - 1;
    if (!(liveFrameHoldActive(count) && snapshotIsLatest)) state.frameIndex = snapshot.index;
  }
  syncTimeline();
  if (snapshot.error) showToast(friendlyError(snapshot.error));

  if (state.source === "live" && !state.loading && !playbackLoopActive()) {
    const frame = state.session?.currentFrame?.();
    if (frame && frameIdentity(frame) !== state.diagnosticsFrameKey) {
      void settleLiveSnapshot().catch((error) => console.warn("Could not settle live radar frame", error));
    }
  }
}

async function settleLiveSnapshot({ restoreHeld = true } = {}) {
  const settlementGeneration = ++state.snapshotSettleGeneration;
  const diagnosticsGeneration = ++state.diagnosticsGeneration;
  const heldKey = state.liveFrameHoldKey;
  if (restoreHeld && heldKey && liveFrameHoldActive()) await restoreLiveHeldFrame(heldKey);
  const frame = state.session?.currentFrame?.();
  if (!frame) return false;
  const key = frameIdentity(frame);
  if (!await assessCurrentFrame(frame, diagnosticsGeneration)) return false;
  if (settlementGeneration !== state.snapshotSettleGeneration || state.source !== "live") return false;
  const current = state.session?.currentFrame?.();
  if (!current || frameIdentity(current) !== key) return false;

  populateTiltChoices(state.allCuts, state.snapshot?.cut ?? state.snapshot?.cutIndex ?? currentCutIndex());
  const selected = state.followLatestLow
    ? await selectLowestCut({ render: false })
    : await enforceVisibleTilt({ render: false });
  if (!selected) return false;
  if (settlementGeneration !== state.snapshotSettleGeneration || state.source !== "live") return false;

  state.snapshot = state.session?.snapshot?.() || state.snapshot;
  if (Number.isInteger(state.snapshot?.index)) {
    const count = Math.max(1, Number(state.snapshot?.timeline?.length || state.snapshot?.length || state.snapshot?.frameCount || currentFrameCount()));
    const snapshotIsLatest = state.snapshot.index >= count - 1;
    if (!(liveFrameHoldActive(count) && snapshotIsLatest)) state.frameIndex = state.snapshot.index;
  }
  const displayFrame = state.followLatestLow && !playbackLoopActive()
    ? await renderAdaptiveLowSweepFrame(current, { sourceFrame: current?.frame || current?.sourceFrame || current })
    : current;
  if (settlementGeneration !== state.snapshotSettleGeneration || state.source !== "live") return false;
  renderLiveCurrentFrame(displayFrame);
  return frameReadyForRender(displayFrame);
}

async function settleBestLiveFrame({ startIndex = liveFrameCount() - 1, allowNewerFallback = true } = {}) {
  if (!state.session) return false;
  const count = liveFrameCount();
  if (count < 1) return false;
  const start = Math.max(0, Math.min(Number(startIndex) || 0, count - 1));
  const candidates = [];
  for (let index = start; index >= 0; index -= 1) candidates.push(index);
  if (allowNewerFallback) {
    for (let index = start + 1; index < count; index += 1) candidates.push(index);
  }

  const originalIndex = state.frameIndex;
  const previousHold = {
    until: state.liveFrameHoldUntil,
    key: state.liveFrameHoldKey,
    time: state.liveFrameHoldTime,
  };

  for (const index of candidates) {
    try {
      if (typeof state.session.setFrame === "function") await state.session.setFrame(index);
      else if (index !== state.frameIndex) continue;
      state.snapshot = state.session.snapshot?.() || state.snapshot;
      state.frameIndex = Number.isInteger(state.snapshot?.index) ? state.snapshot.index : index;
      syncTimeline();
      if (await settleLiveSnapshot({ restoreHeld: false })) {
        if (state.frameIndex < liveFrameCount() - 1) rememberLiveFrameHold();
        else clearLiveFrameHold();
        return true;
      }
    } catch (error) {
      console.debug("Skipped non-renderable live frame", error);
    }
  }

  if (state.hasRenderedRadar && typeof state.session.setFrame === "function") {
    await state.session.setFrame(Math.max(0, Math.min(originalIndex, count - 1)));
    state.snapshot = state.session.snapshot?.() || state.snapshot;
    state.frameIndex = Number.isInteger(state.snapshot?.index) ? state.snapshot.index : originalIndex;
    state.liveFrameHoldUntil = previousHold.until;
    state.liveFrameHoldKey = previousHold.key;
    state.liveFrameHoldTime = previousHold.time;
    syncTimeline();
  }
  return false;
}

function readSessionCuts() {
  try {
    const choices = state.session?.cutChoices?.({ displayableOnly: false }) || state.session?.cutChoices?.();
    if (Array.isArray(choices) && choices.length) return choices;
  } catch {
    // Fall through to snapshot metadata.
  }
  return state.snapshot?.cuts || state.snapshot?.capabilities?.cuts || [];
}

function extractLoopCuts(loop) {
  try {
    const choices = state.toolbox?.cutChoices?.(loop, { selectedCut: loop?.cut, displayableOnly: false });
    if (Array.isArray(choices) && choices.length) return choices;
  } catch {
    // Fall through to loop metadata.
  }
  return loop?.cuts || loop?.capabilities?.cuts || loop?.metadata?.cuts || [];
}

function normalizeCuts(cuts) {
  return assessCuts(cuts, { diagnostics: state.diagnostics, product: state.product });
}

function cutAccepted(cut, quality = state.quality) {
  return qualityCutAccepted(cut, quality);
}

function availableCuts(cuts = state.allCuts) {
  return selectAvailableCuts(cuts, {
    diagnostics: state.diagnostics,
    product: state.product,
    quality: state.quality,
    maxTilt: activeTiltCeiling(),
  });
}

function populateTiltChoices(cuts, selectedCut) {
  const all = normalizeCuts(cuts);
  const visible = availableCuts(cuts);
  ui.tiltSelect.innerHTML = "";

  if (!visible.length) {
    const waiting = new Option(all.length ? (state.hasRenderedRadar ? "Holding last complete" : "Waiting for complete sweep") : "No decoded cuts", "", true, true);
    waiting.disabled = true;
    ui.tiltSelect.add(waiting);
    state.activeCut = null;
    ui.conditionTilt.textContent = all.length ? "Waiting" : "Lowest";
    updateQualityPresentation();
    return;
  }

  const angleCounts = new Map();
  for (const cut of visible) {
    const key = Number.isFinite(cut.angle) ? cut.angle.toFixed(1) : `position-${cut.position}`;
    angleCounts.set(key, (angleCounts.get(key) || 0) + 1);
  }

  visible.forEach((cut, position) => {
    const parts = [Number.isFinite(cut.angle) ? `${cut.angle.toFixed(1)}°` : `Tilt ${position + 1}`];
    if (cut.preferredMoment) parts.push(cut.preferredMoment);
    if (Number.isFinite(cut.radials) && Number.isFinite(cut.expected)) parts.push(`${cut.radials}/${cut.expected}`);
    else if (Number.isFinite(cut.radials)) parts.push(`${cut.radials} rays`);
    const angleKey = Number.isFinite(cut.angle) ? cut.angle.toFixed(1) : `position-${cut.position}`;
    if (state.quality === "all" || angleCounts.get(angleKey) > 1) parts.push(`C${Number(cut.index) + 1}`);
    if (state.quality === "all" && !cut.goodAuto) parts.push("raw");
    const selected = String(cut.index) === String(selectedCut);
    ui.tiltSelect.add(new Option(parts.join(" · "), String(cut.index), selected, selected));
  });

  if (selectedCut == null || ui.tiltSelect.selectedIndex < 0) ui.tiltSelect.selectedIndex = 0;
  state.activeCut = normalizedCutByIndex(Number(ui.tiltSelect.value));
  ui.conditionTilt.textContent = ui.tiltSelect.options[ui.tiltSelect.selectedIndex]?.textContent || "Lowest";
  updateQualityPresentation();
}

function normalizedCutByIndex(index) {
  return normalizeCuts(state.allCuts).find((cut) => cut.index === Number(index)) || null;
}

function currentCutIndex() {
  if (ui.tiltSelect.selectedIndex < 0 || !ui.tiltSelect.value) return null;
  return Number(ui.tiltSelect.value);
}

async function selectLowestCut({ render = true } = {}) {
  const cuts = availableCuts();
  if (!cuts.length) {
    updateQualityPresentation();
    return false;
  }
  const target = cuts[0];
  const previous = currentSnapshotCutIndex();
  ui.tiltSelect.value = String(target.index);
  state.activeCut = target;
  if (previous === target.index || render === false) {
    updateQualityPresentation();
    return true;
  }
  return applyTilt(target.index, { showOverlay: false, render });
}

function currentSnapshotCutIndex() {
  const value = state.snapshot?.cut ?? state.snapshot?.cutIndex ?? state.snapshot?.currentCut ?? state.loop?.cut ?? state.loop?.cutIndex;
  return Number.isFinite(Number(value)) ? Number(value) : currentCutIndex();
}

async function enforceVisibleTilt({ render = true } = {}) {
  const allowed = [...ui.tiltSelect.options].map((option) => Number(option.value)).filter(Number.isFinite);
  if (!allowed.length) {
    updateQualityPresentation();
    return false;
  }
  const current = currentCutIndex();
  const previous = currentSnapshotCutIndex();
  const target = allowed.includes(current) ? current : allowed[0];
  ui.tiltSelect.value = String(target);
  state.activeCut = normalizedCutByIndex(target);
  if (previous !== target && !await applyTilt(target, { showOverlay: false, render })) return false;
  updateQualityPresentation();
  return true;
}

async function applyTilt(cutIndex, { showOverlay = false, render = true } = {}) {
  if (!Number.isFinite(cutIndex)) return false;
  clearAdaptiveFrameCache();
  clearPolarFrameCache();
  clearPlaybackFrameCache();
  if (state.source === "preview") return true;
  const cut = normalizedCutByIndex(cutIndex);
  if (cut && !cutAccepted(cut)) {
    showToast("That cut is not available under the current quality policy");
    return false;
  }
  try {
    if (showOverlay) setLoading(true, "Rendering elevation tilt", "Reusing the decoded volume already on this device…");
    if (state.source === "live" && state.session?.setCut) {
      await state.session.setCut(cutIndex);
      state.snapshot = state.session.snapshot?.() || state.snapshot;
      state.activeCut = cut || normalizedCutByIndex(cutIndex);
      if (render) renderLiveCurrentFrame();
    } else if (state.source === "archive" && state.loop && state.toolbox?.rerenderLoop) {
      state.loop = await state.toolbox.rerenderLoop(state.loop, {
        product: state.product, cut: cutIndex, cutIndex,
        ...state.paletteManager?.renderOverrides(state.product),
      });
      state.activeCut = cut || normalizedCutByIndex(cutIndex);
      if (render) renderArchiveFrame();
    } else {
      return false;
    }
    ui.conditionTilt.textContent = ui.tiltSelect.options[ui.tiltSelect.selectedIndex]?.textContent || "Lowest";
    updateQualityPresentation();
    return true;
  } catch (error) {
    showToast(`Could not render that tilt: ${friendlyError(error)}`);
    return false;
  } finally {
    if (showOverlay) setLoading(false);
  }
}

function frameIsComplete(frame) {
  const flags = [frame?.complete, frame?.frame?.complete, frame?.metadata?.complete];
  return !flags.some((value) => value === false);
}

function frameReadyForRender(frame) {
  if (!frame) return false;
  if (!state.allCuts.length) return frameIsComplete(frame);
  const cut = state.activeCut || normalizedCutByIndex(currentCutIndex()) || normalizedCutByIndex(currentSnapshotCutIndex());
  if (!cut || !cutAccepted(cut)) return false;
  // Raw cuts are an explicit expert override. Operational and 720-radial modes
  // never paint a partially received low sweep.
  if (state.quality === "all") return true;
  return cut.geometryComplete === true;
}

function updateQualityPresentation({ preview = false } = {}) {
  const noDataPreview = preview && !STATIC_PREVIEW;
  const selected = state.activeCut || normalizedCutByIndex(currentCutIndex());
  const candidates = preview ? [] : normalizeCuts(state.allCuts).filter((cut) => (
    cut.angle == null || cut.angle <= activeTiltCeiling() + 0.001
  ));
  const cut = selected || candidates[0] || null;
  const radials = noDataPreview
    ? null
    : preview
    ? { radials: 720, expected: 720, preferredMoment: state.product, goodAuto: true, goodStrict: true, reason: "good" }
    : cut;
  const radialText = noDataPreview
    ? "No data"
    : Number.isFinite(radials?.radials) && Number.isFinite(radials?.expected)
    ? `${radials.radials} / ${radials.expected}`
    : Number.isFinite(radials?.radials) ? `${radials.radials}` : "—";
  if (ui.conditionRadials) ui.conditionRadials.textContent = radialText;

  let status = "Checking sweep";
  let className = "warning";
  if (preview) {
    status = noDataPreview ? "No data" : "Preview";
  } else if (!selected && state.waitingForCompleteLow) {
    status = state.hasRenderedRadar ? "Holding last complete" : "Waiting for complete sweep";
    className = "warning";
  } else if (!cut) {
    status = state.diagnosticsFrameKey ? "No accepted cut" : "Checking sweep";
    className = state.diagnosticsFrameKey ? "bad" : "warning";
  } else if (state.quality === "all") {
    const moment = cut.preferredMoment ? ` · ${cut.preferredMoment}` : "";
    status = cut.goodAuto ? `Raw · complete${moment}` : `Raw · ${cut.reason || "warning"}${moment}`;
    className = cut.goodAuto ? "good" : "warning";
  } else if (cutAccepted(cut)) {
    const moment = cut.preferredMoment ? ` · ${cut.preferredMoment}` : "";
    status = state.quality === "strict" ? `720${moment}` : `Complete${moment}`;
    className = "good";
  } else {
    status = cut.reason || "Rejected";
    className = cut.reason === "checking" ? "warning" : "bad";
  }

  if (ui.conditionQuality) ui.conditionQuality.textContent = status;
  if (ui.scanQualityPill) {
    ui.scanQualityPill.textContent = `QC · ${status}`;
    ui.scanQualityPill.classList.remove("good", "warning", "bad");
    ui.scanQualityPill.classList.add(className);
  }
  if (ui.scanQualitySummary) {
    ui.scanQualitySummary.textContent = `${QUALITY_LABELS[state.quality]}${state.followLatestLow ? " · follow" : ""}`;
  }
}

async function switchProduct() {
  if (state.loading) return;
  clearAdaptiveFrameCache();
  clearPolarFrameCache();
  clearPlaybackFrameCache();
  try {
    setLoading(true, `Rendering ${PRODUCTS[state.product].short}`, "Rendering from the local decoded volume…");
    state.paletteManager?.setProduct();
    state.activeCut = null;
    // Never leave a previous product painted under a newly selected product label.
    clearRadarCanvas();
    state.hasRenderedRadar = false;
    updateLegend();

    if (state.source === "live" && state.session?.setProduct) {
      await state.session.setProduct(state.product);
      const overrides = state.paletteManager?.renderOverrides(state.product) || {};
      if (typeof state.session.setPalette === "function") await state.session.setPalette(overrides.palette);
      else if (typeof state.session.rerender === "function") await state.session.rerender({ product: state.product, ...overrides });
      else if (overrides.palette) {
        const profile = PROFILES[state.profile];
        await state.session.load({ ...radarOptions({ mode: "live", frameCount: liveFrameCount() }), concurrency: loopConcurrency() });
      }
      state.snapshot = state.session.snapshot?.() || state.snapshot;
      await settleLiveSnapshot();
    } else if (state.source === "archive" && state.loop && state.toolbox?.rerenderLoop) {
      const preferred = availableCuts(state.allCuts)[0];
      const cutOptions = Number.isFinite(preferred?.index)
        ? { cut: preferred.index, cutIndex: preferred.index }
        : {};
      state.loop = await state.toolbox.rerenderLoop(state.loop, {
        product: state.product,
        ...cutOptions,
        ...state.paletteManager?.renderOverrides(state.product),
      });
      await settleArchiveFrame();
    } else if (state.source !== "preview") {
      await loadRadar();
    }
  } catch (error) {
    showToast(`Product unavailable for this volume: ${friendlyError(error)}`);
  } finally {
    updateLegend();
    setLoading(false);
  }
}

async function applyPalette() {
  clearAdaptiveFrameCache();
  clearPolarFrameCache();
  clearPlaybackFrameCache();
  updateLegend();
  if (state.source === "preview") {
    renderPreview();
    showToast("Color table saved");
    return;
  }
  if (state.loading) return;
  try {
    setLoading(true, "Applying color table", "Re-rendering cached radar data in this browser…");
    const overrides = state.paletteManager?.renderOverrides(state.product) || {};
    if (state.source === "live" && state.session) {
      if (typeof state.session.setPalette === "function") {
        await state.session.setPalette(overrides.palette);
      } else if (typeof state.session.rerender === "function") {
        await state.session.rerender({ product: state.product, cut: currentCutIndex(), ...overrides });
      } else {
        const profile = PROFILES[state.profile];
        await state.session.load({ ...radarOptions({ mode: "live", frameCount: liveFrameCount() }), concurrency: loopConcurrency() });
      }
      state.snapshot = state.session.snapshot?.() || state.snapshot;
      await settleLiveSnapshot();
    } else if (state.source === "archive" && state.loop && state.toolbox?.rerenderLoop) {
      const selectedCut = currentCutIndex();
      const cutOptions = Number.isFinite(selectedCut) ? { cut: selectedCut, cutIndex: selectedCut } : {};
      state.loop = await state.toolbox.rerenderLoop(state.loop, {
        product: state.product, ...cutOptions, ...overrides,
      });
      await settleArchiveFrame();
    }
    showToast("Color table applied");
  } catch (error) {
    showToast(`Could not apply color table: ${friendlyError(error)}`);
  } finally {
    setLoading(false);
  }
}

function renderLiveCurrentFrame(frameOverride = null) {
  if (!state.session && !frameOverride) return;
  const frame = frameOverride || state.session.currentFrame?.();
  if (!frame) return;
  state.source = "live";
  if (!frameReadyForRender(frame)) {
    updateQualityPresentation();
    if (!state.hasRenderedRadar) clearRadarCanvas();
    return;
  }
  renderFrame(frame);
}

function renderArchiveFrame(frameOverride = null) {
  if (!state.loop && !frameOverride) return;
  const frame = frameOverride || getArchiveFrame(state.frameIndex);
  if (!frame) return;
  state.source = "archive";
  if (!frameReadyForRender(frame)) {
    updateQualityPresentation();
    if (!state.hasRenderedRadar) clearRadarCanvas();
    return;
  }
  renderFrame(frame);
}

function clearRadarCanvas() {
  const context = ui.radarCanvas.getContext("2d", { alpha: true });
  context?.clearRect(0, 0, ui.radarCanvas.width, ui.radarCanvas.height);
  state.polarLayerData = null;
  removePolarRadarLayer();
  pulseCanvasSource(state.map?.getSource?.(MAP.sourceId));
}

function getArchiveFrame(index) {
  if (typeof state.loop?.frame === "function") return state.loop.frame(index);
  return state.loop?.renderedFrames?.[index] || state.loop?.frames?.[index];
}

function getArchiveSourceFrame(index) {
  return state.loop?.frames?.[index]
    || getArchiveFrame(index)?.frame
    || getArchiveFrame(index)?.sourceFrame
    || getArchiveFrame(index);
}

function clearAdaptiveFrameCache() {
  state.adaptiveFrameCache?.clear?.();
}

function clearPolarFrameCache() {
  state.polarFrameCache?.clear?.();
  clearPolarPlaybackFrameCache();
}

function clearPolarPlaybackFrameCache() {
  state.polarPlaybackFrameCache?.clear?.();
  state.polarPlaybackWarmGeneration += 1;
}

function clearPlaybackFrameCache() {
  for (const entry of state.playbackFrameCache?.values?.() || []) {
    entry?.bitmap?.close?.();
  }
  state.playbackFrameCache?.clear?.();
  state.playbackFrameWarmGeneration += 1;
}

function playbackLoopActive() {
  return state.isPlaying && currentFrameCount() > 1;
}

function nativePolarPlaybackEnabled() {
  return POLAR_RENDER_EXPERIMENT
    && state.profile === "full"
    && state.source !== "preview"
    && typeof state.toolbox?.renderNativePpi === "function"
    && currentFrameCount() > 1;
}

function nativePolarAllowedForCurrentFrame() {
  return !playbackLoopActive();
}

function adaptiveFrameCacheLimit() {
  const cores = Math.max(2, Number(navigator.hardwareConcurrency || 4));
  const visibleFrames = Math.max(1, currentFrameCount());
  if (state.profile === "low") return Math.min(Math.max(visibleFrames, state.loopCount), cores <= 4 ? 48 : 96);
  return Math.min(Math.max(visibleFrames, state.loopCount), cores <= 4 ? 12 : 24);
}

function shortHash(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function playbackFrameCacheKey(frame) {
  return [
    frameIdentity(frame),
    state.product,
    state.profile,
    frame?.width || frame?.image?.width || "",
    frame?.height || frame?.image?.height || "",
    state.activeCut?.index ?? frame?.renderOptions?.cut ?? frame?.renderOptions?.cutIndex ?? "",
  ].join("|");
}

function renderedFrameImageData(frame) {
  const width = Number(frame?.width || frame?.image?.width || 0);
  const height = Number(frame?.height || frame?.image?.height || 0);
  if (!width || !height) return null;
  if (frame?.imageData instanceof ImageData) return frame.imageData;
  if (frame?.image?.imageData instanceof ImageData) return frame.image.imageData;
  const rgba = frame?.rgba || frame?.image?.rgba;
  if (!rgba) return null;
  const pixels = rgba instanceof Uint8ClampedArray ? rgba : new Uint8ClampedArray(rgba);
  return new ImageData(pixels, width, height);
}

async function ensurePlaybackFrameBitmap(frame) {
  if (!frame || typeof createImageBitmap !== "function") return null;
  const key = playbackFrameCacheKey(frame);
  const cached = state.playbackFrameCache.get(key);
  if (cached) {
    state.playbackFrameCache.delete(key);
    state.playbackFrameCache.set(key, cached);
    return cached;
  }
  const entry = await timeAsync("playback.bitmap.create", { key }, async () => {
    const imageData = renderedFrameImageData(frame);
    if (!imageData) return null;
    const bitmap = await createImageBitmap(imageData);
    return {
      key,
      bitmap,
      width: imageData.width,
      height: imageData.height,
    };
  });
  if (!entry) return null;
  state.playbackFrameCache.set(key, entry);
  const maxEntries = Math.max(3, currentFrameCount());
  while (state.playbackFrameCache.size > maxEntries) {
    const first = state.playbackFrameCache.keys().next().value;
    const old = state.playbackFrameCache.get(first);
    old?.bitmap?.close?.();
    state.playbackFrameCache.delete(first);
  }
  return entry;
}

function cachedPlaybackFrame(frame) {
  return state.playbackFrameCache.get(playbackFrameCacheKey(frame));
}

function playbackFrames() {
  const frames = [];
  for (let index = 0; index < currentFrameCount(); index += 1) {
    const frame = state.source === "live" ? liveFrameAt(index) : getArchiveFrame(index);
    if (frame) frames.push(frame);
  }
  return frames;
}

function playbackFrameCacheReady() {
  const frames = playbackFrames();
  return frames.length >= currentFrameCount() && frames.every((frame) => cachedPlaybackFrame(frame)?.bitmap);
}

function cachedNativePolarPlaybackFrame(frame) {
  return state.polarPlaybackFrameCache.get(playbackFrameCacheKey(frame));
}

function nativePolarPlaybackCacheReady() {
  if (!nativePolarPlaybackEnabled()) return false;
  const frames = playbackFrames();
  return frames.length >= currentFrameCount() && frames.every((frame) => cachedNativePolarPlaybackFrame(frame)?.data);
}

async function preparePlaybackFrameCache({ generation = state.playbackFrameWarmGeneration } = {}) {
  if (currentFrameCount() < 2) return;
  const frames = playbackFrames();
  if (!frames.length) return;
  updatePolarDebug({ ...(state.polarDebug || {}), playbackCache: "warming" });
  const start = performance.now();
  for (const frame of frames) {
    if (generation !== state.playbackFrameWarmGeneration) return;
    try {
      await ensurePlaybackFrameBitmap(frame);
    } catch (error) {
      console.warn("Could not warm playback frame cache", error);
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  recordPerf("playback.cache.warm", start, { frames: frames.length, cacheSize: state.playbackFrameCache.size });
  updatePolarDebug({ ...(state.polarDebug || {}), playbackCache: "ready", playbackCacheSize: state.playbackFrameCache.size });
}

async function prepareNativePolarPlaybackCache({ generation = state.polarPlaybackWarmGeneration } = {}) {
  if (!nativePolarPlaybackEnabled()) return false;
  const frames = playbackFrames();
  if (!frames.length) return false;
  const start = performance.now();
  let ready = 0;
  updatePolarDebug({ ...(state.polarDebug || {}), nativePlaybackCache: "warming" });

  for (const frame of frames) {
    if (generation !== state.polarPlaybackWarmGeneration) return false;
    const key = playbackFrameCacheKey(frame);
    if (state.polarPlaybackFrameCache.get(key)?.data) {
      ready += 1;
      continue;
    }
    try {
      const data = await buildPolarLayerData(frame);
      if (data) {
        state.polarPlaybackFrameCache.set(key, { key, data });
        ready += 1;
      }
    } catch (error) {
      console.warn("Could not warm native polar playback frame", error);
    }
    while (state.polarPlaybackFrameCache.size > Math.max(3, currentFrameCount())) {
      state.polarPlaybackFrameCache.delete(state.polarPlaybackFrameCache.keys().next().value);
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  const complete = ready >= frames.length;
  recordPerf("polar.playback.cache.warm", start, {
    frames: frames.length,
    ready,
    complete,
    cacheSize: state.polarPlaybackFrameCache.size,
  });
  updatePolarDebug({
    ...(state.polarDebug || {}),
    nativePlaybackCache: complete ? "ready" : "partial",
    nativePlaybackCacheSize: state.polarPlaybackFrameCache.size,
  });
  return complete;
}

async function warmPlaybackFrameCache() {
  if (currentFrameCount() < 2) return;
  const generation = ++state.playbackFrameWarmGeneration;
  scheduleIdle(async () => {
    await preparePlaybackFrameCache({ generation });
  });
  warmNativePolarPlaybackCache();
}

async function warmNativePolarPlaybackCache() {
  if (!nativePolarPlaybackEnabled()) return;
  const generation = ++state.polarPlaybackWarmGeneration;
  scheduleIdle(async () => {
    await prepareNativePolarPlaybackCache({ generation });
  });
}

function renderCachedNativePolarFrame(frame) {
  if (!nativePolarPlaybackEnabled()) return false;
  const cached = cachedNativePolarPlaybackFrame(frame);
  if (!cached?.data) return false;
  return timeSync("polar.playback.frame.cachedSwap", { key: cached.data.key }, () => {
    clearPreviewOverlay();
    state.polarLayerData = cached.data;
    if (!ensurePolarRadarLayer()) return false;
    setRadarRasterFallbackVisible(false);
    state.map?.triggerRepaint?.();
    state.hasRenderedRadar = true;
    updateFramePresentation(frame);
    updateQualityPresentation();
    updatePolarDebug({
      status: "native-playback",
      playbackCache: "native",
      nativePlaybackCache: "hit",
      nativePlaybackCacheSize: state.polarPlaybackFrameCache.size,
      gateCount: cached.data.gateCount,
      radialCount: cached.data.radialCount,
      rangeKm: cached.data.rangeKm,
    });
    return true;
  });
}

function renderCachedPlaybackFrame(frame) {
  const cached = cachedPlaybackFrame(frame);
  if (!cached?.bitmap) return false;
  return timeSync("playback.frame.cachedDraw", { key: cached.key }, () => {
    clearPreviewOverlay();
    const context = ui.radarCanvas.getContext("2d", { alpha: true });
    if (!context) return false;
    if (ui.radarCanvas.width !== cached.width) ui.radarCanvas.width = cached.width;
    if (ui.radarCanvas.height !== cached.height) ui.radarCanvas.height = cached.height;
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, cached.width, cached.height);
    context.drawImage(cached.bitmap, 0, 0);
    if (state.mapReady && state.map) {
      const source = state.map.getSource?.(MAP.sourceId);
      if (source) pulseCanvasSource(source);
      else mountRadarCanvas(null);
    }
    state.polarLayerData = null;
    updatePolarDebug({ status: "raster-playback", playbackCache: "hit", playbackCacheSize: state.playbackFrameCache.size });
    removePolarRadarLayer();
    setRadarRasterFallbackVisible(true);
    state.hasRenderedRadar = true;
    updateFramePresentation(frame);
    updateQualityPresentation();
    return true;
  });
}

async function renderAdaptiveLowSweepFrame(frame, { sourceFrame = null } = {}) {
  if (!state.followLatestLow || !frame || !state.activeCut || typeof state.toolbox?.renderFrame !== "function") return frame;
  const source = sourceFrame || frame?.frame || frame?.sourceFrame || frame;
  const profile = PROFILES[state.profile];
  const overrides = state.paletteManager?.renderOverrides(state.product) || {};
  const key = [
    frameIdentity(source), state.product, state.profile, state.activeCut.index,
    state.quality, state.lowTiltMax, shortHash(JSON.stringify(overrides.palette || null)),
  ].join("|");
  const cached = state.adaptiveFrameCache.get(key);
  if (cached) {
    state.adaptiveFrameCache.delete(key);
    state.adaptiveFrameCache.set(key, cached);
    return cached;
  }

  const rendered = await timeAsync("frame.adaptiveRender", { key }, () => state.toolbox.renderFrame(source, {
    product: state.product,
    cut: state.activeCut.index,
    cutIndex: state.activeCut.index,
    width: profile.renderSize,
    height: profile.renderSize,
    rangeKm: DEFAULTS.rangeKm,
    smoothing: profile.smoothing,
    ...overrides,
  }));
  if (!rendered) return frame;
  if (typeof rendered === "object") {
    rendered.sourceFrame = rendered.sourceFrame || source;
    const sourceTime = extractFrameTime(source);
    if (sourceTime && rendered.timestamp == null && rendered.time == null && rendered.scanTime == null) {
      rendered.timestamp = sourceTime.toISOString();
    }
  }
  state.adaptiveFrameCache.set(key, rendered);
  while (state.adaptiveFrameCache.size > adaptiveFrameCacheLimit()) {
    state.adaptiveFrameCache.delete(state.adaptiveFrameCache.keys().next().value);
  }
  return rendered;
}

function renderFrame(frame) {
  return timeSync("frame.render", { playback: playbackLoopActive(), key: frameIdentity(frame) }, () => {
    clearPreviewOverlay();
    const layer = timeSync("frame.buildLayer", {}, () => buildRadarLayer(frame));
    state.radarLayer = layer;

    try {
      timeSync("frame.canvasDraw", { method: layer ? "layer" : "frame" }, () => {
        const context = ui.radarCanvas.getContext("2d", { alpha: true });
        if (context) context.imageSmoothingEnabled = false;
        if (layer && typeof state.module?.drawRadarLayerToCanvas === "function") {
          state.module.drawRadarLayerToCanvas(ui.radarCanvas, layer);
        } else if (typeof state.module?.drawFrameToCanvas === "function") {
          state.module.drawFrameToCanvas(ui.radarCanvas, frame);
        } else {
          throw new Error("This BowEcho bundle does not expose a canvas renderer.");
        }
      });
    } catch (error) {
      console.warn("Radar canvas rendering failed.", error);
      throw error;
    }

    timeSync("frame.mountCanvas", {}, () => mountRadarCanvas(layer));
    if (nativePolarAllowedForCurrentFrame()) {
      schedulePolarRadarLayer(frame);
    } else {
      state.polarLayerData = null;
      updatePolarDebug({ status: playbackLoopActive() ? "raster-playback" : "inactive" });
      removePolarRadarLayer();
      setRadarRasterFallbackVisible(true);
    }
    state.hasRenderedRadar = true;
    updateFramePresentation(frame);
    updateQualityPresentation();
  });
}

function buildRadarLayer(frame) {
  try {
    if (typeof state.toolbox?.textureLayer === "function") return state.toolbox.textureLayer(frame, { site: state.site, rangeKm: DEFAULTS.rangeKm });
    if (typeof state.module?.radarTextureLayer === "function") return state.module.radarTextureLayer(frame, { site: state.site, rangeKm: DEFAULTS.rangeKm });
  } catch (error) {
    console.warn("BowEcho map layer adapter was unavailable; using a calculated radar footprint.", error);
  }
  return null;
}

function mountRadarCanvas(layer) {
  if (!state.mapReady || !state.map) return;
  state.map.resize?.();

  let sourceSpec;
  try {
    if (layer && typeof state.module?.mapboxRadarCanvasSource === "function") {
      sourceSpec = state.module.mapboxRadarCanvasSource(layer, ui.radarCanvas, { animate: false });
    }
  } catch (error) {
    console.warn("BowEcho canvas source adapter failed; using the fallback georeference.", error);
  }

  if (!sourceSpec) {
    sourceSpec = {
      type: "canvas",
      canvas: ui.radarCanvas,
      animate: false,
      coordinates: radarCanvasCoordinates(SITES[state.site], DEFAULTS.rangeKm),
    };
  }

  sourceSpec = { ...sourceSpec, type: "canvas", canvas: ui.radarCanvas, animate: false };
  const coordinates = sourceSpec.coordinates || radarCanvasCoordinates(SITES[state.site], DEFAULTS.rangeKm);
  sourceSpec.coordinates = coordinates;
  const signature = JSON.stringify(coordinates);
  const existing = state.map.getSource(MAP.sourceId);

  if (existing && state.radarSourceSignature === signature) {
    existing.setCoordinates?.(coordinates);
    pulseCanvasSource(existing);
    return;
  }

  removeRadarMapLayer();
  state.map.addSource(MAP.sourceId, sourceSpec);

  let layerSpec;
  try {
    if (layer && typeof state.module?.mapboxRadarRasterLayer === "function") {
      layerSpec = state.module.mapboxRadarRasterLayer(layer, { sourceId: MAP.sourceId, layerId: MAP.layerId, opacity: .82 });
    }
  } catch (error) {
    console.warn("BowEcho raster layer adapter failed; using a standard raster layer.", error);
  }

  layerSpec = {
    ...(layerSpec || {}),
    id: MAP.layerId,
    type: "raster",
    source: MAP.sourceId,
    paint: {
      ...(layerSpec?.paint || {}),
      "raster-opacity": state.source === "preview" ? .72 : .82,
      "raster-fade-duration": 0,
      "raster-resampling": "nearest",
    },
  };

  const beforeId = state.map.getStyle()?.layers?.find((candidate) => candidate.type === "symbol")?.id;
  state.map.addLayer(layerSpec, beforeId);
  state.radarSourceSignature = signature;
  pulseCanvasSource(state.map.getSource(MAP.sourceId));
}

function removeRadarMapLayer() {
  if (!state.map) return;
  removePolarRadarLayer();
  if (state.map.getLayer(MAP.layerId)) state.map.removeLayer(MAP.layerId);
  if (state.map.getSource(MAP.sourceId)) state.map.removeSource(MAP.sourceId);
  state.radarSourceSignature = "";
}

function pulseCanvasSource(source) {
  source?.play?.();
  state.map?.triggerRepaint?.();
  requestAnimationFrame(() => requestAnimationFrame(() => source?.pause?.()));
}

function schedulePolarRadarLayer(frame) {
  if (!POLAR_RENDER_EXPERIMENT) {
    state.polarLayerData = null;
    updatePolarDebug({ status: "disabled" });
    removePolarRadarLayer();
    setRadarRasterFallbackVisible(true);
    return;
  }

  const generation = ++state.polarLayerGeneration;
  updatePolarDebug({ status: "building", generation });
  setRadarRasterFallbackVisible(true);

  if (!state.mapReady || !state.map || state.profile !== "full" || state.source === "preview") {
    state.polarLayerData = null;
    updatePolarDebug({ status: "inactive", generation });
    removePolarRadarLayer();
    return;
  }

  void buildPolarLayerData(frame)
    .then((data) => {
      if (generation !== state.polarLayerGeneration || !data) return;
      state.polarLayerData = data;
      if (ensurePolarRadarLayer()) {
        state.map.triggerRepaint?.();
        setRadarRasterFallbackVisible(false);
        updatePolarDebug({
          status: "active",
          generation,
          source: data.source,
          gateCount: data.gateCount,
          radialCount: data.radialCount,
          rangeKm: data.rangeKm,
          cacheSize: state.polarFrameCache.size,
        });
      }
    })
    .catch((error) => {
      if (generation !== state.polarLayerGeneration) return;
      console.warn("BowEcho polar radar layer failed; keeping raster fallback.", error);
      state.polarLayerData = null;
      updatePolarDebug({ status: "fallback", generation, error: friendlyError(error) });
      removePolarRadarLayer();
      setRadarRasterFallbackVisible(true);
    });
}

function schedulePolarLoopPreload() {
  // Native PPI frames are rendered on demand; preloading several 3072 px polar
  // products can lock up browsers on GitHub Pages.
  return;
  if (!POLAR_RENDER_EXPERIMENT || state.profile !== "full" || typeof state.toolbox?.renderNativePpi !== "function") return;
  const frames = state.source === "live"
    ? (state.session?.loop?.renderedFrames || state.session?.loop?.frames)
    : state.loop?.frames;
  if (!Array.isArray(frames) || frames.length < 2) return;
  const generation = state.polarLayerGeneration;
  scheduleIdle(async () => {
    for (const frame of frames) {
      if (state.source === "preview" || generation !== state.polarLayerGeneration) return;
      try {
        await buildPolarLayerData(frame);
      } catch (error) {
        console.debug("Polar loop frame preload skipped", error);
      }
    }
    updatePolarDebug({ status: state.polarLayerData ? "active" : "preloaded", cacheSize: state.polarFrameCache.size });
  });
}

function updatePolarDebug(update) {
  state.polarDebug = { ...(state.polarDebug || {}), ...update };
  window.__MEOWDAR_POLAR_DEBUG__ = state.polarDebug;
  document.body.dataset.polarRadar = state.polarDebug.status || "";
  if (Number.isFinite(state.polarDebug.gateCount)) document.body.dataset.polarGates = String(state.polarDebug.gateCount);
  if (Number.isFinite(state.polarDebug.radialCount)) document.body.dataset.polarRadials = String(state.polarDebug.radialCount);
}

async function buildPolarLayerData(frame) {
  if (typeof state.toolbox?.renderNativePpi !== "function") return null;
  const sourceFrame = frame?.frame || frame?.sourceFrame || frame;
  const render = frame?.renderOptions || {};
  const cutIndex = Number(
    state.activeCut?.index
      ?? render.cut
      ?? render.cutIndex
      ?? frame?.meta?.selectedCut
      ?? currentCutIndex()
      ?? 0
  );
  const paletteOverrides = state.paletteManager?.renderOverrides(state.product) || {};
  const nativeOptions = {
    product: state.product,
    cut: Number.isFinite(cutIndex) ? cutIndex : 0,
    rangeKm: DEFAULTS.rangeKm,
    palette: render.palette,
    paletteText: render.paletteText,
    paletteName: render.paletteName,
    paletteFamily: render.paletteFamily,
    paletteKey: render.paletteKey,
    ...paletteOverrides,
  };
  const paletteKey = nativeOptions.paletteKey
    || shortHash(JSON.stringify({
      name: nativeOptions.paletteName || "",
      family: nativeOptions.paletteFamily || "",
      text: nativeOptions.paletteText || "",
      palette: nativeOptions.palette || null,
    }));
  const key = [
    frameIdentity(sourceFrame),
    "native-ppi",
    state.product,
    nativeOptions.cut,
    paletteKey,
  ].join("|");
  const cached = state.polarFrameCache.get(key);
  if (cached) {
    state.polarFrameCache.delete(key);
    state.polarFrameCache.set(key, cached);
    return cached;
  }

  const native = await timeAsync("polar.nativePpi", { key }, () => state.toolbox.renderNativePpi(sourceFrame, nativeOptions));
  const meta = native?.meta || {};
  const gateRange = meta.gateRange || {};
  const texture = new Uint8Array(native.rgba);
  const radialCount = Math.max(1, Number(native.height || meta.native?.radialCount || 0));
  const gateCount = Math.max(1, Number(native.width || gateRange.gateCount || 0));
  const nativeRangeKm = Number(native.rangeKm || meta.rangeKm || 0);
  const rangeKm = Math.min(DEFAULTS.rangeKm, nativeRangeKm > 0 ? nativeRangeKm : DEFAULTS.rangeKm);
  const firstAzimuthDeg = Number.isFinite(Number(meta.azimuth?.firstDeg))
    ? Number(meta.azimuth.firstDeg)
    : Number(native.azimuths?.[0] || 0);
  const radialStepDeg = Number.isFinite(Number(meta.azimuth?.stepDeg)) && Number(meta.azimuth.stepDeg) > 0
    ? Number(meta.azimuth.stepDeg)
    : 360 / radialCount;
  const site = SITES[state.site];
  const data = {
    key,
    source: meta.source || "native-ppi-gates",
    texture,
    azimuths: native.azimuths,
    site,
    rangeKm,
    firstGateKm: Number(gateRange.firstGateM || 0) / 1000,
    gateSpacingKm: Number(gateRange.gateSpacingM || 0) / 1000,
    gateCount,
    radialCount,
    firstAzimuthDeg,
    radialStepDeg,
    meta,
    coordinates: radarCanvasCoordinates(site, rangeKm),
  };

  state.polarFrameCache.set(key, data);
  while (state.polarFrameCache.size > Math.max(3, Math.min(currentFrameCount(), 12))) {
    state.polarFrameCache.delete(state.polarFrameCache.keys().next().value);
  }
  return data;
}

function renderedFrameRgba(frame) {
  return frame?.rgba || frame?.image?.rgba || null;
}

async function polarGeometryForFrame(frame) {
  const diagnostics = state.diagnosticsFrameKey === frameIdentity(frame) && state.diagnostics
    ? state.diagnostics
    : await diagnosticsForFrame(frame);
  const cuts = Array.isArray(diagnostics?.cuts) ? diagnostics.cuts : [];
  if (!cuts.length) return null;

  const cutIndex = Number(
    state.activeCut?.index
      ?? frame?.renderOptions?.cut
      ?? frame?.renderOptions?.cutIndex
      ?? frame?.meta?.selectedCut
      ?? currentCutIndex()
      ?? 0
  );
  const cut = cuts.find((item) => Number(item.index) === cutIndex)
    || cuts.find((item) => item.isPpiLike)
    || cuts[0];
  if (!cut || cut.isRhiLike) return null;

  const moment = Array.isArray(cut.moments)
    ? cut.moments.find((item) => momentMatchesProduct(item.moment, state.product)) || cut.moments[0]
    : null;
  const gateRange = moment?.gateRange || cut.gateRanges?.[0];
  const radialCount = Number(moment?.radialCount || cut.radialCount);
  const gateCount = Number(gateRange?.gateCount);
  const gateSpacingM = Number(gateRange?.gateSpacingM);
  const firstGateM = Number(gateRange?.firstGateM || 0);
  const rangeKm = Number(frame?.renderOptions?.rangeKm || DEFAULTS.rangeKm);

  if (!Number.isFinite(radialCount) || !Number.isFinite(gateCount) || !Number.isFinite(gateSpacingM)) return null;
  if (radialCount < 90 || gateCount < 100 || rangeKm <= 0) return null;

  return {
    cutIndex: Number(cut.index),
    radialCount: Math.round(radialCount),
    gateCount: Math.round(gateCount),
    gateSpacingM,
    firstGateM,
    rangeKm,
  };
}

function momentMatchesProduct(moment, product) {
  const value = String(moment || "").toUpperCase();
  const target = String(product || "").toUpperCase();
  if (value === target) return true;
  if (target === "REF") return ["REF", "DBZ", "DBZH", "TH"].includes(value);
  if (target === "DVEL") return ["DVEL", "VEL", "BV", "VRAD", "VRADH"].includes(value);
  if (target === "CC") return ["CC", "RHO", "RHOHV"].includes(value);
  return false;
}

function polarFrameCacheKey(frame, geometry) {
  const render = frame?.renderOptions || {};
  const paletteKey = render.paletteKey
    || shortHash(JSON.stringify({
      name: render.paletteName || "",
      family: render.paletteFamily || "",
      text: render.paletteText || "",
    }));
  return [
    frameIdentity(frame),
    state.product,
    geometry.cutIndex,
    geometry.radialCount,
    geometry.gateCount,
    frame?.width || render.width || 0,
    frame?.height || render.height || 0,
    paletteKey,
  ].join("|");
}

function buildPolarTextureFromRenderedFrame(frame, geometry) {
  const source = renderedFrameRgba(frame);
  const sourceWidth = Math.max(1, Number(frame.width || frame.image?.width || frame.renderOptions?.width || 0));
  const sourceHeight = Math.max(1, Number(frame.height || frame.image?.height || frame.renderOptions?.height || sourceWidth));
  const { radialCount, gateCount, firstGateM, gateSpacingM, rangeKm } = geometry;
  const texture = new Uint8Array(radialCount * gateCount * 4);
  const centerX = (sourceWidth - 1) / 2;
  const centerY = (sourceHeight - 1) / 2;
  const xScale = centerX / rangeKm;
  const yScale = centerY / rangeKm;

  for (let radial = 0; radial < radialCount; radial += 1) {
    const angle = ((radial + 0.5) / radialCount) * Math.PI * 2;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const outRow = radial * gateCount * 4;

    for (let gate = 0; gate < gateCount; gate += 1) {
      const gateRangeKm = (firstGateM + (gate + 0.5) * gateSpacingM) / 1000;
      const out = outRow + gate * 4;
      if (gateRangeKm > rangeKm) continue;

      const x = Math.round(centerX + sin * gateRangeKm * xScale);
      const y = Math.round(centerY - cos * gateRangeKm * yScale);
      if (x < 0 || y < 0 || x >= sourceWidth || y >= sourceHeight) continue;

      const input = (y * sourceWidth + x) * 4;
      texture[out] = source[input];
      texture[out + 1] = source[input + 1];
      texture[out + 2] = source[input + 2];
      texture[out + 3] = source[input + 3];
    }
  }

  return texture;
}

function ensurePolarRadarLayer() {
  if (!state.mapReady || !state.map || state.polarLayerFailed || !state.polarLayerData) return false;
  if (!state.polarLayer) state.polarLayer = createPolarRadarCustomLayer();
  if (!state.map.getLayer(MAP.polarLayerId)) {
    const beforeId = state.map.getStyle()?.layers?.find((candidate) => candidate.type === "symbol")?.id;
    try {
      state.map.addLayer(state.polarLayer, beforeId);
    } catch (error) {
      state.polarLayerFailed = true;
      console.warn("Could not add BowEcho polar radar layer.", error);
      return false;
    }
  }
  return true;
}

function removePolarRadarLayer() {
  if (state.map?.getLayer?.(MAP.polarLayerId)) state.map.removeLayer(MAP.polarLayerId);
  state.polarLayer = null;
  setRadarRasterFallbackVisible(true);
}

function setRadarRasterFallbackVisible(visible) {
  if (!state.map?.getLayer?.(MAP.layerId)) return;
  try {
    state.map.setPaintProperty(MAP.layerId, "raster-opacity", visible ? (state.source === "preview" ? .72 : .82) : 0);
  } catch {
    // The raster fallback is best effort during style/layer churn.
  }
}

function createPolarRadarCustomLayer() {
  return {
    id: MAP.polarLayerId,
    type: "custom",
    renderingMode: "2d",
    program: null,
    positionBuffer: null,
    localBuffer: null,
    texture: null,
    uploadedKey: "",
    uniformLocations: null,
    attributeLocations: null,
    onAdd(map, gl) {
      const vertexShader = compileRadarShader(gl, gl.VERTEX_SHADER, `
        attribute vec2 a_pos;
        attribute vec2 a_local;
        uniform mat4 u_matrix;
        varying vec2 v_local;
        void main() {
          v_local = a_local;
          gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
        }
      `);
      const fragmentShader = compileRadarShader(gl, gl.FRAGMENT_SHADER, `
        precision mediump float;
        varying vec2 v_local;
        uniform sampler2D u_polar;
        uniform float u_rangeKm;
        uniform float u_firstGateKm;
        uniform float u_gateSpacingKm;
        uniform float u_gateCount;
        uniform float u_radialCount;
        uniform float u_firstAzimuthRad;
        uniform float u_radialStepRad;
        uniform float u_opacity;
        const float TWO_PI = 6.283185307179586;
        void main() {
          float rangeKm = length(v_local);
          if (rangeKm <= 0.0 || rangeKm > u_rangeKm) discard;
          float gate = floor((rangeKm - u_firstGateKm) / u_gateSpacingKm);
          if (gate < 0.0 || gate >= u_gateCount) discard;
          float azimuth = atan(v_local.x, v_local.y);
          if (azimuth < 0.0) azimuth += TWO_PI;
          float radialStep = u_radialStepRad > 0.0 ? u_radialStepRad : TWO_PI / u_radialCount;
          float relativeAzimuth = mod(azimuth - u_firstAzimuthRad + radialStep * 0.5 + TWO_PI, TWO_PI);
          float radial = floor(relativeAzimuth / radialStep);
          if (radial < 0.0 || radial >= u_radialCount) discard;
          vec2 uv = vec2((gate + 0.5) / u_gateCount, (radial + 0.5) / u_radialCount);
          vec4 color = texture2D(u_polar, uv);
          if (color.a <= 0.01) discard;
          gl_FragColor = vec4(color.rgb, color.a * u_opacity);
        }
      `);
      this.program = linkRadarProgram(gl, vertexShader, fragmentShader);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      this.positionBuffer = gl.createBuffer();
      this.localBuffer = gl.createBuffer();
      this.texture = gl.createTexture();
      this.attributeLocations = {
        pos: gl.getAttribLocation(this.program, "a_pos"),
        local: gl.getAttribLocation(this.program, "a_local"),
      };
      this.uniformLocations = {
        matrix: gl.getUniformLocation(this.program, "u_matrix"),
        polar: gl.getUniformLocation(this.program, "u_polar"),
        rangeKm: gl.getUniformLocation(this.program, "u_rangeKm"),
        firstGateKm: gl.getUniformLocation(this.program, "u_firstGateKm"),
        gateSpacingKm: gl.getUniformLocation(this.program, "u_gateSpacingKm"),
        gateCount: gl.getUniformLocation(this.program, "u_gateCount"),
        radialCount: gl.getUniformLocation(this.program, "u_radialCount"),
        firstAzimuthRad: gl.getUniformLocation(this.program, "u_firstAzimuthRad"),
        radialStepRad: gl.getUniformLocation(this.program, "u_radialStepRad"),
        opacity: gl.getUniformLocation(this.program, "u_opacity"),
      };
    },
    render(gl, matrix) {
      const data = state.polarLayerData;
      if (!data || !this.program) return;
      const matrixArray = customLayerMatrix(matrix);
      if (!matrixArray) return;

      gl.useProgram(this.program);
      uploadPolarLayerIfNeeded(gl, this, data);
      uploadPolarLayerVertices(gl, this, data);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.uniform1i(this.uniformLocations.polar, 0);
      gl.uniformMatrix4fv(this.uniformLocations.matrix, false, matrixArray);
      gl.uniform1f(this.uniformLocations.rangeKm, data.rangeKm);
      gl.uniform1f(this.uniformLocations.firstGateKm, data.firstGateKm);
      gl.uniform1f(this.uniformLocations.gateSpacingKm, data.gateSpacingKm);
      gl.uniform1f(this.uniformLocations.gateCount, data.gateCount);
      gl.uniform1f(this.uniformLocations.radialCount, data.radialCount);
      gl.uniform1f(this.uniformLocations.firstAzimuthRad, (Number(data.firstAzimuthDeg) || 0) * Math.PI / 180);
      gl.uniform1f(this.uniformLocations.radialStepRad, (Number(data.radialStepDeg) || (360 / data.radialCount)) * Math.PI / 180);
      gl.uniform1f(this.uniformLocations.opacity, .82);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    onRemove(map, gl) {
      if (this.positionBuffer) gl.deleteBuffer(this.positionBuffer);
      if (this.localBuffer) gl.deleteBuffer(this.localBuffer);
      if (this.texture) gl.deleteTexture(this.texture);
      if (this.program) gl.deleteProgram(this.program);
      this.program = null;
      this.positionBuffer = null;
      this.localBuffer = null;
      this.texture = null;
      this.uploadedKey = "";
    },
  };
}

function customLayerMatrix(value) {
  if (Array.isArray(value) || ArrayBuffer.isView(value)) return value;
  return value?.defaultProjectionData?.mainMatrix
    || value?.modelViewProjectionMatrix
    || value?.matrix
    || value?.projectionMatrix
    || null;
}

function compileRadarShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) || "unknown shader compile failure";
    gl.deleteShader(shader);
    throw new Error(info);
  }
  return shader;
}

function linkRadarProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) || "unknown shader link failure";
    gl.deleteProgram(program);
    throw new Error(info);
  }
  return program;
}

function uploadPolarLayerIfNeeded(gl, layer, data) {
  if (layer.uploadedKey === data.key) return;
  gl.bindTexture(gl.TEXTURE_2D, layer.texture);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    data.gateCount,
    data.radialCount,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    data.texture
  );
  layer.uploadedKey = data.key;
}

function uploadPolarLayerVertices(gl, layer, data) {
  const coordinates = data.coordinates;
  const order = [0, 1, 3, 2];
  const positions = new Float32Array(8);
  order.forEach((sourceIndex, vertexIndex) => {
    const [lng, lat] = coordinates[sourceIndex];
    const mercator = window.maplibregl.MercatorCoordinate.fromLngLat({ lng, lat });
    positions[vertexIndex * 2] = mercator.x;
    positions[vertexIndex * 2 + 1] = mercator.y;
  });
  const range = data.rangeKm;
  const locals = new Float32Array([
    -range, range,
    range, range,
    -range, -range,
    range, -range,
  ]);

  gl.bindBuffer(gl.ARRAY_BUFFER, layer.positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(layer.attributeLocations.pos);
  gl.vertexAttribPointer(layer.attributeLocations.pos, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, layer.localBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, locals, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(layer.attributeLocations.local);
  gl.vertexAttribPointer(layer.attributeLocations.local, 2, gl.FLOAT, false, 0, 0);
}

function radarCanvasCoordinates(site, rangeKm) {
  const latDelta = rangeKm / 111.32;
  const lonDelta = rangeKm / (111.32 * Math.max(.2, Math.cos(site.lat * Math.PI / 180)));
  return [
    [site.lon - lonDelta, site.lat + latDelta],
    [site.lon + lonDelta, site.lat + latDelta],
    [site.lon + lonDelta, site.lat - latDelta],
    [site.lon - lonDelta, site.lat - latDelta],
  ];
}

function updateFramePresentation(frame) {
  const time = extractFrameTime(frame);
  state.currentFrameTime = time || new Date();
  state.glm?.sync(state.currentFrameTime, { live: state.source === "live", followLatest: state.frameIndex === currentFrameCount() - 1 });
  ui.frameTime.textContent = time ? formatTime(time, true) : state.mode === "archive" ? "Archived scan" : "Latest available scan";
  ui.timelineCurrent.textContent = time ? formatTime(time) : `Scan ${state.frameIndex + 1}`;
  const updated = time ? formatRelativeTime(time) : "Just now";
  ui.conditionUpdated.textContent = updated;
  updateConditionCard({ updated });
  syncTimeline();
}

function setLivePresentation(label, sourceText) {
  ui.liveDot.classList.add("live");
  ui.engineBadge.textContent = label;
  ui.engineBadge.classList.add("ready");
  ui.sourcePill.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9M12 3v9l6 3"/></svg>${sourceText}`;
  ui.loadButton.querySelector(".button-label").textContent = state.mode === "archive" ? "Update archive radar" : "Update live radar";
}

function extractFrameTime(frame) {
  const value = frame?.volumeTime ?? frame?.timestamp ?? frame?.time ?? frame?.scanTime ?? frame?.generatedAt
    ?? frame?.metadata?.volumeTime ?? frame?.metadata?.timestamp ?? frame?.metadata?.time
    ?? frame?.frame?.volumeTime ?? frame?.frame?.timestamp ?? frame?.frame?.time ?? frame?.frame?.scanTime
    ?? frame?.frame?.metadata?.volumeTime ?? frame?.frame?.metadata?.timestamp ?? frame?.frame?.metadata?.time;
  if (value == null) return null;
  const date = value instanceof Date ? value : new Date(typeof value === "number" && value < 1e12 ? value * 1000 : value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function currentFrameCount() {
  if (state.source === "live") return liveFrameCount();
  if (state.source === "archive") return archiveFrameCount();
  return STATIC_PREVIEW ? state.loopCount : 0;
}

function liveFrameCount() {
  const timeline = state.snapshot?.timeline;
  if (Array.isArray(timeline) && timeline.length) return timeline.length;
  return Math.max(1, Number(state.snapshot?.length || state.session?.loop?.length || state.snapshot?.frameCount || state.session?.length || 1));
}

function liveFrameAt(index) {
  if (typeof state.session?.currentFrame === "function") {
    const frame = state.session.currentFrame(index);
    if (frame) return frame;
  }
  if (typeof state.session?.loop?.frame === "function") {
    const frame = state.session.loop.frame(index);
    if (frame) return frame;
  }
  const frame = typeof state.session?.frame === "function" ? state.session.frame(index) : null;
  if (frame) return frame;
  const frames = state.snapshot?.frames;
  return Array.isArray(frames) ? frames[index] : null;
}

function liveFrameTimeAt(index) {
  const timeline = state.snapshot?.timeline;
  const timelineTime = Array.isArray(timeline) ? timelineEntryDate(timeline[index])?.toISOString() : null;
  if (timelineTime) return timelineTime;
  const frameTime = extractFrameTime(liveFrameAt(index));
  return frameTime ? frameTime.toISOString() : null;
}

function clearLiveFrameHold() {
  state.liveFrameHoldUntil = 0;
  state.liveFrameHoldKey = null;
  state.liveFrameHoldTime = null;
}

function rememberLiveFrameHold(count = currentFrameCount()) {
  if (state.source !== "live" || state.frameIndex >= Math.max(0, count - 1)) {
    clearLiveFrameHold();
    return;
  }
  state.liveFrameHoldUntil = Date.now() + 60_000;
  const frame = liveFrameAt(state.frameIndex) || state.session?.currentFrame?.();
  state.liveFrameHoldKey = frame ? frameIdentity(frame) : state.liveFrameHoldKey;
  state.liveFrameHoldTime = liveFrameTimeAt(state.frameIndex) || state.liveFrameHoldTime;
}

async function restoreLiveHeldFrame(heldKey = state.liveFrameHoldKey, fallbackIndex = state.frameIndex) {
  const heldTime = state.liveFrameHoldTime;
  if (state.source !== "live" || !state.session || !liveFrameHoldActive() || (!heldKey && !heldTime)) return false;
  const count = Math.max(1, liveFrameCount());
  let target = -1;
  if (heldTime) {
    for (let i = 0; i < count; i += 1) {
      if (liveFrameTimeAt(i) === heldTime) {
        target = i;
        break;
      }
    }
  }
  if (target < 0 && heldKey) {
    for (let i = 0; i < count; i += 1) {
      const frame = liveFrameAt(i);
      if (!frame || frameIdentity(frame) !== heldKey) continue;
      target = i;
      break;
    }
  }
  if (target < 0) target = Math.min(Math.max(0, Number(fallbackIndex) || 0), Math.max(0, count - 2));
  if (typeof state.session.setFrame === "function") {
    await state.session.setFrame(target);
  } else {
    while (state.frameIndex > target) {
      if (typeof state.session.previousFrame !== "function") break;
      await state.session.previousFrame();
      state.frameIndex -= 1;
    }
    while (state.frameIndex < target) {
      if (typeof state.session.nextFrame !== "function") break;
      await state.session.nextFrame();
      state.frameIndex += 1;
    }
  }
  state.snapshot = state.session.snapshot?.() || state.snapshot;
  state.frameIndex = Number.isInteger(state.snapshot?.index) ? state.snapshot.index : target;
  const restored = liveFrameAt(state.frameIndex) || state.session?.currentFrame?.();
  state.liveFrameHoldKey = restored ? frameIdentity(restored) : heldKey;
  state.liveFrameHoldTime = liveFrameTimeAt(state.frameIndex) || heldTime;
  state.liveFrameHoldUntil = Date.now() + 60_000;
  return true;
}

async function moveLiveToLatest() {
  if (!state.session) return;
  clearLiveFrameHold();
  const target = Math.max(0, liveFrameCount() - 1);
  if (typeof state.session.latestFrame === "function") {
    await state.session.latestFrame();
  } else if (typeof state.session.setFrame === "function") {
    await state.session.setFrame(target);
  }
  state.snapshot = state.session.snapshot?.() || state.snapshot;
  state.frameIndex = Number.isInteger(state.snapshot?.index) ? state.snapshot.index : target;
}

function archiveFrameCount() {
  return Math.max(0, Number(state.loop?.length || state.loop?.frames?.length || 0));
}

function syncTimeline() {
  const rawCount = currentFrameCount();
  const count = Math.max(1, rawCount);
  state.frameIndex = Math.max(0, Math.min(state.frameIndex, count - 1));
  ui.timeline.max = String(count - 1);
  ui.timeline.value = String(state.frameIndex);
  ui.timeline.disabled = rawCount < 2;
  ui.previousButton.disabled = rawCount < 2;
  ui.nextButton.disabled = rawCount < 2;
  ui.playButton.disabled = rawCount < 2;
  ui.conditionFrames.textContent = `${rawCount} scan${rawCount === 1 ? "" : "s"}`;

  if (state.source === "preview") {
    if (STATIC_PREVIEW) {
      ui.timelineStart.textContent = formatTime(state.demoTimes[0]);
      ui.timelineCurrent.textContent = formatTime(state.demoTimes[state.frameIndex]);
    } else {
      ui.timelineStart.textContent = "--:--";
      ui.timelineCurrent.textContent = "No data";
    }
  } else if (state.source === "live") {
    const timeline = state.snapshot?.timeline;
    if (Array.isArray(timeline) && timeline.length) {
      const first = timelineEntryDate(timeline[0]);
      const current = timelineEntryDate(timeline[state.frameIndex]);
      ui.timelineStart.textContent = first ? formatTime(first) : "First scan";
      ui.timelineCurrent.textContent = current ? formatTime(current) : `${state.frameIndex + 1} / ${count}`;
    } else {
      ui.timelineStart.textContent = "First scan";
      ui.timelineCurrent.textContent = `${state.frameIndex + 1} / ${count}`;
    }
  } else {
    const first = extractFrameTime(getArchiveFrame(0));
    const current = extractFrameTime(getArchiveFrame(state.frameIndex));
    ui.timelineStart.textContent = first ? formatTime(first) : "First scan";
    ui.timelineCurrent.textContent = current ? formatTime(current) : `${state.frameIndex + 1} / ${count}`;
  }

  const max = Math.max(1, count - 1);
  const pct = count <= 1 ? 100 : (state.frameIndex / max) * 100;
  ui.timeline.style.background = `linear-gradient(90deg, #000080 0 ${pct}%, #808080 ${pct}% 100%)`;
}

function timelineEntryDate(entry) {
  const value = typeof entry === "object" ? entry?.volumeTime ?? entry?.timestamp ?? entry?.time ?? entry?.scanTime : entry;
  if (value == null) return null;
  const date = new Date(typeof value === "number" && value < 1e12 ? value * 1000 : value);
  return Number.isNaN(date.getTime()) ? null : date;
}

async function stepFrame(direction) {
  const count = currentFrameCount();
  if (count < 2) return;
  await goToFrame((state.frameIndex + direction + count) % count);
}

async function goToFrame(index) {
  const activePlayback = playbackLoopActive();
  return timeAsync("frame.goTo", { index, playback: activePlayback }, async () => {
    const count = currentFrameCount();
    state.frameIndex = Math.max(0, Math.min(index, count - 1));

    try {
      if (activePlayback) {
        if (state.source === "preview") {
          renderPreview();
        } else if (state.source === "archive") {
          const frame = getArchiveFrame(state.frameIndex);
          if (renderCachedNativePolarFrame(frame)) {
            return;
          }
          if (!renderCachedPlaybackFrame(frame)) {
            recordPerf("playback.cache.miss", performance.now(), { source: "archive" });
            renderArchiveFrame(frame);
          }
        } else if (state.source === "live") {
          if (state.session && Number.isFinite(Number(state.session.index))) state.session.index = state.frameIndex;
          const frame = liveFrameAt(state.frameIndex);
          if (renderCachedNativePolarFrame(frame)) {
            return;
          }
          if (!renderCachedPlaybackFrame(frame)) {
            recordPerf("playback.cache.miss", performance.now(), { source: "live" });
            renderLiveCurrentFrame(frame);
          }
        }
        return;
      }

      if (state.source === "live") rememberLiveFrameHold(count);
      syncTimeline();

      if (state.source === "preview") {
        renderPreview();
      } else if (state.source === "archive") {
        await settleArchiveFrame();
      } else if (state.source === "live") {
        if (state.session?.setFrame) {
          await state.session.setFrame(state.frameIndex);
        } else if (state.frameIndex < Number(state.snapshot?.index ?? count - 1)) {
          const delta = Number(state.snapshot?.index ?? count - 1) - state.frameIndex;
          for (let i = 0; i < delta; i += 1) await state.session?.previousFrame?.();
        } else if (state.frameIndex > Number(state.snapshot?.index ?? 0)) {
          const delta = state.frameIndex - Number(state.snapshot?.index ?? 0);
          for (let i = 0; i < delta; i += 1) await state.session?.nextFrame?.({ wrap: true });
        }
        state.snapshot = state.session?.snapshot?.() || state.snapshot;
        if (Number.isInteger(state.snapshot?.index)) state.frameIndex = state.snapshot.index;
        rememberLiveFrameHold();
        if (!await settleLiveSnapshot()) {
          await settleBestLiveFrame({ startIndex: state.frameIndex, allowNewerFallback: true });
        }
      }
    } catch (error) {
      console.warn("Could not change radar frame", error);
    } finally {
      if (!activePlayback) syncTimeline();
    }
  });
}

function schedulePlaybackStep() {
  clearTimeout(state.playTimer);
  if (!state.isPlaying || currentFrameCount() < 2) return;
  const atLastFrame = state.frameIndex >= currentFrameCount() - 1;
  const delay = state.loopSpeedMs + (atLastFrame ? state.endDwellMs : 0);
  state.playTimer = window.setTimeout(async () => {
    if (!state.isPlaying) return;
    await timeAsync("playback.tick", { index: state.frameIndex }, () => stepFrame(1));
    schedulePlaybackStep();
  }, Math.max(100, delay));
}

async function togglePlayback() {
  if (state.isPlaying) {
    stopPlayback();
    return;
  }
  if (currentFrameCount() < 2) return;
  if (!playbackFrameCacheReady()) {
    showBackgroundProgress("Preparing loop playback...");
    try {
      const generation = ++state.playbackFrameWarmGeneration;
      await preparePlaybackFrameCache({ generation });
    } finally {
      hideBackgroundProgress();
    }
  }
  if (nativePolarPlaybackEnabled() && !nativePolarPlaybackCacheReady()) {
    showBackgroundProgress("Preparing native radar loop...");
    try {
      const generation = ++state.polarPlaybackWarmGeneration;
      await prepareNativePolarPlaybackCache({ generation });
    } finally {
      hideBackgroundProgress();
    }
  }
  state.isPlaying = true;
  ui.playButton.classList.add("playing");
  ui.playButton.setAttribute("aria-pressed", "true");
  ui.playButton.setAttribute("aria-label", "Pause radar loop");
  schedulePlaybackStep();
}

function stopPlayback() {
  clearTimeout(state.playTimer);
  state.playTimer = null;
  state.isPlaying = false;
  ui.playButton.classList.remove("playing");
  ui.playButton.setAttribute("aria-pressed", "false");
  ui.playButton.setAttribute("aria-label", "Play radar loop");
  if (state.source === "live" && currentFrameCount() > 1) {
    void settleLiveSnapshot().catch((error) => console.warn("Could not refresh paused radar frame", error));
  } else if (state.source === "archive" && currentFrameCount() > 1) {
    void settleArchiveFrame().catch((error) => console.warn("Could not refresh paused archive frame", error));
  }
}

async function refreshRadar() {
  if (state.loading) return;
  ui.refreshButton.classList.add("spinning");
  try {
    if (state.source === "live" && state.session?.poll) {
      setLoading(true, "Checking for a new scan", "Only newly available public radar data will be requested…");
      invalidateCurrentDiagnostics();
      await state.session.poll(radarOptions({ mode: "live", frameCount: 1 }));
      state.snapshot = state.session.snapshot?.() || state.snapshot;
      await moveLiveToLatest();
      await settleLiveSnapshot();
      showToast(frameReadyForRender(state.session.currentFrame?.()) ? "Radar is up to date" : "Waiting for the newest complete low tilt");
    } else if (state.source === "archive") {
      await loadRadar();
    } else if (STATIC_PREVIEW) {
      refreshDemoTimes();
      state.frameIndex = state.loopCount - 1;
      renderPreview();
      showToast("Map preview refreshed");
    } else {
      renderPreview();
      showToast("Load radar to fetch live NOAA data");
    }
  } catch (error) {
    showToast(`Refresh failed: ${friendlyError(error)}`);
  } finally {
    setLoading(false);
    ui.refreshButton.classList.remove("spinning");
  }
}

function scheduleLivePoll() {
  clearTimeout(state.livePollTimer);
  state.livePollTimer = setTimeout(async () => {
    const session = state.session;
    const generation = state.loadGeneration;
    if (!document.hidden && state.source === "live" && session?.poll && !state.isPlaying && !state.loopBuilding) {
      try {
        const wasFollowingLatest = !liveFrameHoldActive() && state.frameIndex >= currentFrameCount() - 1;
        const heldKey = state.liveFrameHoldKey;
        const heldIndex = state.frameIndex;
        invalidateCurrentDiagnostics(session.currentFrame?.());
        await session.poll(radarOptions({ mode: "live", frameCount: 1 }));
        if (generation !== state.loadGeneration || session !== state.session || state.source !== "live") return;
        state.snapshot = session.snapshot?.() || state.snapshot;
        if (heldKey && liveFrameHoldActive()) await restoreLiveHeldFrame(heldKey, heldIndex);
        if (wasFollowingLatest) await moveLiveToLatest();
        else syncSessionSnapshot(state.snapshot);
        if (generation !== state.loadGeneration || session !== state.session || state.source !== "live") return;
        await settleLiveSnapshot();
        if (state.loopCount > 1) scheduleLiveBackgroundLoop(generation, PROFILES[state.profile]);
      } catch (error) {
        if (generation === state.loadGeneration && session === state.session) console.warn("Background radar refresh failed", error);
      }
    }
    if (generation === state.loadGeneration && state.source === "live") scheduleLivePoll();
  }, Math.max(5_000, Number(state.waitingForCompleteLow
    ? MAP_CONFIG.waitingSweepPollMs || 6_000
    : MAP_CONFIG.livePollMs || 12_000)));
}

function setLoading(loading, title = "Loading radar", detail = "Fetching Level II data…") {
  state.loading = loading;
  ui.loadingLayer.hidden = !loading;
  ui.loadButton.disabled = loading;
  ui.loadButton.classList.toggle("loading", loading);
  ui.loadingTitle.textContent = title;
  ui.loadingDetail.textContent = detail;
}

function showBackgroundProgress(text) {
  ui.backgroundProgressText.textContent = text;
  ui.backgroundProgress.hidden = false;
}

function hideBackgroundProgress() {
  ui.backgroundProgress.hidden = true;
}

function scheduleIdle(task) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(() => task(), { timeout: 1200 });
  } else {
    window.setTimeout(task, 180);
  }
}

async function locateNearestRadar() {
  if (!navigator.geolocation) {
    showToast("Location is not supported by this browser");
    return;
  }
  ui.locationButton.disabled = true;
  const original = ui.locationButton.innerHTML;
  ui.locationButton.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/></svg>Locating…`;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const point = { lat: position.coords.latitude, lon: position.coords.longitude };
      const [nearestCode, nearest] = Object.entries(SITES)
        .map(([code, site]) => [code, haversineKm(point, site)])
        .sort((a, b) => a[1] - b[1])[0];
      selectSite(nearestCode, { fly: true, reload: state.source !== "preview" });
      showToast(`${SITES[nearestCode].short} selected · ${Math.round(nearest)} km away`);
      ui.locationButton.disabled = false;
      ui.locationButton.innerHTML = original;
    },
    (error) => {
      showToast(error.code === 1 ? "Location permission was not granted" : "Your location could not be determined");
      ui.locationButton.disabled = false;
      ui.locationButton.innerHTML = original;
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 30 * 60 * 1000 },
  );
}

function haversineKm(a, b) {
  const toRad = (degrees) => (degrees * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function refreshDemoTimes() {
  const now = new Date();
  const rounded = new Date(Math.floor(now.getTime() / (5 * 60 * 1000)) * 5 * 60 * 1000);
  state.demoTimes = Array.from({ length: state.loopCount }, (_, index) => new Date(rounded.getTime() - (state.loopCount - 1 - index) * 5 * 60 * 1000));
}

function renderPreview() {
  state.source = "preview";
  state.radarLayer = null;
  if (!STATIC_PREVIEW) {
    stopPlayback();
    state.currentFrameTime = null;
    state.allCuts = [];
    state.activeCut = null;
    state.waitingForCompleteLow = false;
    state.hasRenderedRadar = false;
    clearRadarCanvas();
    removeRadarMapLayer();
    drawPreviewOverlay();
    ui.liveDot.classList.remove("live");
    ui.frameTime.textContent = "No radar loaded";
    ui.sourcePill.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9M12 3v9l6 3"/></svg>No radar loaded`;
    ui.engineBadge.textContent = state.engineReady ? "Engine ready" : "No data";
    ui.engineBadge.classList.toggle("ready", state.engineReady);
    state.glm?.sync(new Date(), { live: false, followLatest: false });
    updateConditionCard({ copy: SITES[state.site].short, updated: "No radar loaded" });
    updateQualityPresentation({ preview: true });
    syncTimeline();
    return;
  }

  drawDemoRadar(ui.radarCanvas, state.frameIndex, state.product, state.site);
  drawPreviewOverlay();
  mountRadarCanvas(null);
  ui.liveDot.classList.remove("live");
  ui.frameTime.textContent = "Preview";
  ui.sourcePill.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9M12 3v9l6 3"/></svg>Preview`;
  ui.engineBadge.textContent = state.engineReady ? "Ready" : "Preview";
  ui.engineBadge.classList.toggle("ready", state.engineReady);
  state.currentFrameTime = state.demoTimes[state.frameIndex] || new Date();
  state.glm?.sync(state.currentFrameTime, { live: true, followLatest: state.frameIndex === state.loopCount - 1 });
  updateConditionCard({ copy: SITES[state.site].short });
  updateQualityPresentation({ preview: true });
  syncTimeline();
}

function drawDemoRadar(canvas, frameIndex, product, siteCode) {
  const size = PROFILES[state.profile].renderSize;
  if (canvas.width !== size) canvas.width = size;
  if (canvas.height !== size) canvas.height = size;
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.imageSmoothingEnabled = false;
  const w = canvas.width;
  const h = canvas.height;
  const phase = frameIndex / Math.max(1, state.loopCount - 1);
  const siteOffset = Object.keys(SITES).indexOf(siteCode) * .37;
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = .17;
  ctx.strokeStyle = "rgba(225,239,233,.35)";
  ctx.lineWidth = 1;
  [64, 128, 192, 244].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();

  if (product === "REF") drawReflectivity(ctx, w, h, phase, siteOffset);
  if (product === "DVEL") drawVelocity(ctx, w, h, phase, false);
  if (product === "CC") drawCorrelation(ctx, w, h, phase);

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.fillStyle = "rgba(255,255,255,.96)";
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,91,36,.95)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawReflectivity(ctx, w, h, phase, seedOffset) {
  const drift = phase * 45;
  const clusters = [
    { x: .57 + drift / w, y: .37, rx: .24, ry: .12, angle: -.35, strength: .86, seed: 31 },
    { x: .73 + drift / w * .45, y: .57, rx: .18, ry: .09, angle: .42, strength: .66, seed: 47 },
    { x: .42 + drift / w * .2, y: .70, rx: .12, ry: .07, angle: -.15, strength: .48, seed: 63 },
    { x: .32 + Math.sin(seedOffset) * .04, y: .28, rx: .09, ry: .05, angle: .2, strength: .35, seed: 81 },
  ];
  clusters.forEach((cluster) => drawRadarCell(ctx, cluster.x * w, cluster.y * h, cluster.rx * w, cluster.ry * h, cluster.angle, cluster.strength, cluster.seed + seedOffset * 10));
}

function drawRadarCell(ctx, x, y, rx, ry, angle, intensity, seed) {
  const rng = mulberry32(Math.floor(seed * 7919));
  const colors = [
    ["rgba(32,171,105,.70)", 1],
    ["rgba(67,196,90,.75)", .78],
    ["rgba(224,218,52,.80)", .55],
    ["rgba(245,147,34,.86)", .34],
    ["rgba(231,49,59,.9)", .19],
    ["rgba(213,74,211,.88)", .09],
  ];

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  colors.forEach(([color, scale], index) => {
    if (intensity < (index + 1) * .13) return;
    const path = new Path2D();
    const points = state.profile === "full" ? 320 : 54;
    for (let i = 0; i <= points; i += 1) {
      const theta = (i / points) * Math.PI * 2;
      const detail = state.profile === "full" ? (rng() - .5) * .022 : (rng() - .5) * .075;
      const noise = .91
        + Math.sin(theta * (3 + index) + seed) * .055
        + Math.sin(theta * (7 + index * 2) + seed * .73) * .032
        + Math.sin(theta * (13 + index) + seed * 1.31) * .018
        + detail;
      const px = Math.cos(theta) * rx * scale * noise;
      const py = Math.sin(theta) * ry * scale * noise;
      if (i === 0) path.moveTo(px, py); else path.lineTo(px, py);
    }
    path.closePath();
    ctx.fillStyle = color;
    ctx.filter = "none";
    ctx.fill(path);
  });
  ctx.restore();
  ctx.filter = "none";
}

function drawVelocity(ctx, w, h, phase, stormRelative) {
  const cx = w * (.5 + Math.sin(phase * Math.PI * 2) * .025);
  const cy = h * (.48 + Math.cos(phase * Math.PI * 2) * .018);
  const radius = w * (stormRelative ? .31 : .42);
  const gradient = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
  gradient.addColorStop(0, "rgba(28,125,74,0)");
  gradient.addColorStop(.15, "rgba(38,174,99,.64)");
  gradient.addColorStop(.46, "rgba(62,220,133,.82)");
  gradient.addColorStop(.49, "rgba(8,22,21,.30)");
  gradient.addColorStop(.51, "rgba(8,22,21,.30)");
  gradient.addColorStop(.54, "rgba(238,86,86,.82)");
  gradient.addColorStop(.85, "rgba(188,45,49,.66)");
  gradient.addColorStop(1, "rgba(125,28,34,0)");

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(stormRelative ? -.28 : .12);
  ctx.translate(-cx, -cy);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius, radius * .58, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "destination-in";
  const mask = ctx.createRadialGradient(cx, cy, radius * .18, cx, cy, radius);
  mask.addColorStop(0, "rgba(0,0,0,.96)");
  mask.addColorStop(.78, "rgba(0,0,0,.76)");
  mask.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = mask;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  ctx.restore();
  ctx.globalCompositeOperation = "source-over";
}

function drawCorrelation(ctx, w, h, phase) {
  const cx = w * (.57 + phase * .035);
  const cy = h * .48;
  const radius = w * .33;
  const gradient = ctx.createRadialGradient(cx, cy, 8, cx, cy, radius);
  gradient.addColorStop(0, "rgba(247,212,53,.87)");
  gradient.addColorStop(.22, "rgba(92,211,177,.82)");
  gradient.addColorStop(.58, "rgba(108,82,220,.72)");
  gradient.addColorStop(.88, "rgba(186,66,225,.52)");
  gradient.addColorStop(1, "rgba(186,66,225,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius, radius * .55, -.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(20,28,29,.55)";
  for (let i = 0; i < 25; i += 1) {
    const theta = i * 2.399;
    const r = (i / 25) * radius * .75;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(theta) * r, cy + Math.sin(theta) * r * .5, 2 + (i % 4), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPreviewOverlay() {
  const canvas = ui.overlayCanvas;
  const rect = ui.radarStage.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width || 1000));
  const height = Math.max(1, Math.round(rect.height || 650));
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  if (state.mapReady) return;

  const site = SITES[state.site];
  const bounds = activeSiteBounds();
  const x = ((site.lon - bounds.west) / (bounds.east - bounds.west)) * width;
  const y = ((bounds.north - site.lat) / (bounds.north - bounds.south)) * height;
  ctx.save();
  ctx.strokeStyle = "rgba(255,91,36,.20)";
  ctx.lineWidth = 1;
  [42, 82, 122].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function clearPreviewOverlay() {
  const ctx = ui.overlayCanvas.getContext("2d");
  ctx.clearRect(0, 0, ui.overlayCanvas.width, ui.overlayCanvas.height);
}

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function formatTime(date, includeDate = false) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, includeDate
    ? { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" }
    : { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" }).format(date);
}

function formatRelativeTime(date) {
  const deltaMinutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (Math.abs(deltaMinutes) < 2) return "Just now";
  if (deltaMinutes >= 0 && deltaMinutes < 60) return `${deltaMinutes} min ago`;
  return formatTime(date, true);
}

function configureLoopOptions() {
  if (!ui.loopCountSelect) return;
  const allowed = new Set(LOCAL_LOOP_COUNTS.map(String));
  for (const option of Array.from(ui.loopCountSelect.options)) {
    if (!allowed.has(option.value)) option.remove();
  }
  for (const count of LOCAL_LOOP_COUNTS) {
    const value = String(count);
    if (Array.from(ui.loopCountSelect.options).some((option) => option.value === value)) continue;
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    ui.loopCountSelect.append(option);
  }
}

function normalizeLoopCount(value) {
  const numeric = Number(value);
  return LOCAL_LOOP_COUNTS.includes(numeric) ? numeric : DEFAULTS.loopCount;
}

function liveFrameHoldActive(count = currentFrameCount()) {
  return state.source === "live"
    && Number(state.liveFrameHoldUntil) > 0
    && Date.now() < state.liveFrameHoldUntil
    && state.frameIndex < Math.max(1, count) - 1;
}

function friendlyError(error) {
  const message = error?.message || String(error || "Unknown error");
  return message.replace(/^Error:\s*/i, "").slice(0, 180);
}

function showToast(message) {
  clearTimeout(state.toastTimer);
  ui.toast.textContent = message;
  ui.toast.classList.add("show");
  state.toastTimer = setTimeout(() => ui.toast.classList.remove("show"), 3600);
}
