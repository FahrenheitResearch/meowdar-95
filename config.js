// Meowdar is static and client-rendered. OpenStreetMap data is shown through
// a configurable raster tile endpoint; switch providers here if traffic grows.
window.MEOWDAR_CONFIG = {
  radarSites: {
    // CAFIRE handoff: leave allowedSites as "all" for the full BowEcho catalog,
    // or switch activePreset / allowedSites to a regional/custom list.
    defaultSite: "KDAX",
    activePreset: null,
    allowedSites: "all",
    presets: {
      westCoastFire: [
        "KATX", "KLGX", "KOTX",
        "KRTX", "KPDT", "KMAX",
        "KBHX", "KBBX", "KDAX", "KRGX", "KMUX", "KHNX", "KEYX",
        "KVBX", "KVTX", "KSOX", "KNKX",
        "KESX", "KLRX", "KCBX", "KSFX",
        "KFSX", "KIWA", "KEMX", "KYUX",
        "KICX", "KMTX"
      ],
      california: [
        "KBHX", "KBBX", "KDAX", "KMUX", "KHNX", "KEYX",
        "KVBX", "KVTX", "KSOX", "KNKX", "KRGX", "KESX"
      ],
      pacificNorthwest: [
        "KATX", "KLGX", "KOTX", "KRTX", "KPDT", "KMAX", "KCBX", "KSFX"
      ]
    }
  },
  map: {
    tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
    libraryUrl: "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.js",
    cssUrl: "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css",
    libraryFallbackUrls: [
      "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.js"
    ],
    cssFallbackUrls: [
      "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.css"
    ],
  },
  livePollMs: 60000,
  waitingSweepPollMs: 4000,
  glm: {
    enabledByDefault: false,
    satellite: "goes18",
    windowMinutes: 5,
    maxFiles: 30,
    maxPoints: 12000,
    fetchConcurrency: 2,
    bounds: [-170, 10, -50, 70],
    decoderUrl: "./vendor/h5wasm/hdf5_hl.js",
    decoderFallbackUrl: "https://cdn.jsdelivr.net/npm/h5wasm@0.10.3/dist/esm/hdf5_hl.js"
  }
};
