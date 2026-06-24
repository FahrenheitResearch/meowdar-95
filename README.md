# Meowdar 95

Meowdar 95 is a static, client-rendered professional NEXRAD workstation with a
Windows 95-inspired interface. It is intended for weather nerds, forecasters,
spotters, researchers, and anyone who wants live Level II radar and archives
without operating a radar API, image server, database, or account system.

Radar files are fetched, decoded, quality-checked, colored, and rendered in the
visitor's browser with the BowEcho radar toolbox. MapLibre GL JS supplies the
interactive map, and the default basemap uses OpenStreetMap raster tiles with no
API key. Optional GOES GLM lightning is also decoded client-side.

## Main features

- **High-resolution full default.** Full mode renders to a 3072 × 3072
  backing canvas with native gate/bin sampling and nearest-neighbor map
  resampling. Low Data is an explicit 512 × 512 mode.
- **Progressive loops.** The public GitHub Pages build defaults to practical
  3-frame loops with one-frame fallback. Local loop-test builds can expose
  larger experimental counts. The newest frame appears first; older frames fill
  in behind it.
- **Per-frame low-sweep loops.** Every volume in a loop is independently checked
  for its best completed low sweep. Meowdar does not assume that one cut index
  is valid across an entire loop.
- **Live low-tilt following.** A partial incoming sweep never replaces the last
  good image. Meowdar follows the newest completed acceptable low tilt as soon
  as it is ready, while higher elevations may continue arriving.
- **Professional sweep QC.** Operational, Strict 720, and Raw modes use product
  moment metadata, radial geometry, usable-gate counts, duplicate-cut ranking,
  and blank/constant velocity checks.
- **Reflectivity, velocity, and correlation coefficient.** SRV is intentionally
  omitted.
- **Full UTC archive workflow.** Select a station, date, and UTC time. The
  nearest frame is displayed first and the requested loop backfills around it.
  Archive coverage depends on the upstream Level II providers and station era.
- **Static archive deep links.** External static datasets can open Meowdar
  directly into an archive target with a centered 3-frame radar loop.
- **Palette laboratory.** Import BowEcho/GR-style `.pal` or `.txt` files, or
  JSON tables; edit stops, color, opacity, and interpolation; export locally;
  and persist user palettes in browser storage.
- **Product filters.** Adjust the reflectivity dBZ floor, velocity deadband,
  correlation-coefficient floor, and range-fold visibility/color without
  downloading the radar volume again.
- **Optional GOES GLM.** Display quality-controlled energy-weighted total-
  lightning flash centroids for live or archive time. It is off by default and
  runs in a dedicated worker.
- **OpenStreetMap station map.** Zoom, pan, click radar-site pills, jump to the
  nearest site, return to the selected radar, or fit the network. No map token
  is required.
- **Static deployment.** Ordinary hosting serves HTML, CSS, JavaScript, Web
  Workers, and WebAssembly. Radar, GLM, and map bytes go directly from their
  upstream providers to the browser.

## Install

### 1. Vendor the browser radar engine

macOS or Linux:

```bash
./scripts/vendor-bowecho.sh
```

Windows PowerShell:

```powershell
.\scripts\vendor-bowecho.ps1
```

The installer downloads the pinned BowEcho browser bundle and h5wasm files,
checks the expected worker/WASM assets, and preserves their upstream licenses
under `vendor/`.

### 2. Serve the folder over HTTP

```bash
python3 -m http.server 8790
```

Open the local server URL, for example `http://127.0.0.1:8790/`.

`demo.html` is a self-contained interactive presentation build with synthetic
radar and lightning. It does not fetch live data and can be opened directly.
`index.html` is the production application.

### 3. Optional configuration

Edit `config.js` to change the allowed radar sites, OpenStreetMap-compatible
tile endpoint, polling, or GLM limits:

```js
window.MEOWDAR_CONFIG = {
  radarSites: {
    // Default is the full BowEcho radar catalog.
    defaultSite: "KMUX",
    activePreset: null,

    // To restrict the app for an org, either switch activePreset or replace
    // allowedSites with explicit ICAO IDs such as ["KDAX", "KBBX", "KHNX"].
    // Use allowedSites: "all" to expose every radar in the BowEcho catalog.
    allowedSites: "all",
  },
  map: {
    tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
    libraryUrl: "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.js",
    cssUrl: "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css",
  },
  livePollMs: 10000,
  waitingSweepPollMs: 4000,
  glm: {
    enabledByDefault: false,
    satellite: "goes18",
    windowMinutes: 5,
    maxFiles: 30,
    maxPoints: 12000,
  },
};
```

## Low-sweep and QC behavior

**Operational** is the recommended default. Product-matching PPI cuts are
ranked by completion, geometry, usable gates, elevation, and diagnostics. Low
sweeps through the configured ceiling normally require all 720 native radials.
A geometrically complete low sweep can display even while the encompassing
volume is still receiving higher elevations.

**Strict 720** requires a completed 720-radial PPI and explicit matching moment
metadata. It is useful when a VCP exposes duplicate cuts or velocity moments
that need the narrowest acceptance gate.

**Raw cuts** exposes product-matching decoded cuts even when Meowdar would reject
them operationally. This is an expert inspection mode and can intentionally
show partial or poor data.

When **Low-sweep loop / follow live** is enabled, each frame gets its own
lowest accepted cut. When it is disabled, operators can choose a specific
available elevation.

## Palette and filter format

The fallback parser accepts BowEcho/GR-style rows such as:

```text
Product: BR
Units: dBZ
RF: 129 33 139 255
Color: 0 0 236 236
SolidColor: 10 0 160 246
Color4: 20 0 0 246 255
```

The importer keeps or infers the table's product family instead of silently
assigning it to whatever product happens to be on screen. Filter changes reuse
already-decoded data whenever the toolbox can rerender it.

## OpenStreetMap tile use

The default `tile.openstreetmap.org` basemap is convenient for development,
personal use, and modest traffic, but it is a best-effort community service—not
an unlimited production CDN. Meowdar:

- keeps OpenStreetMap attribution visible;
- sends no bulk tile prefetch requests;
- uses ordinary browser caching;
- identifies no fake or misleading tile source; and
- exposes the tile URL in `config.js` so a public deployment can switch to a
  compliant hosted OSM-derived provider or a self-hosted tile service.

For sustained public traffic, replace the default tile endpoint rather than
assuming the community tile servers will absorb unlimited use.

## Performance and large loops

The 3-frame Full loop is the practical public default. Larger native loops are
useful for local analysis but can become browser-hostile quickly: 12 raw
3072 x 3072 RGBA frames alone represent about 432 MiB before decoded volumes,
JavaScript object overhead, browser/GPU copies, and map textures. Meowdar does
not quietly reduce resolution to make that number disappear.

Large loops therefore:

- load the newest frame first;
- use one background radar job on four-core devices and for larger Full loops;
- keep a deliberately small adaptive low-sweep render cache;
- show the estimated raw pixel ceiling in the UI; and
- remain operator-selected rather than the default.

Low Data keeps the same archive, QC, product, palette, and low-sweep controls at
512 x 512. See `RESOURCE_BUDGET.md` for the full table.

## Archive Links

Meowdar can be launched from static event/catalog pages with query parameters:

```text
https://fahrenheitresearch.github.io/meowdar-95/?site=KPAH&mode=archive&time=2021-12-11T02%3A54%3A00Z&frames=3&center=1&autoload=1&polar=1
```

Supported link parameters:

- `site`: four-character radar ID.
- `mode=archive`: select archive mode.
- `time`: UTC ISO timestamp for the event or peak.
- `frames=3`: public-safe loop size.
- `center=1`: put the target scan in the middle frame when surrounding scans
  exist.
- `autoload=1`: load radar automatically on page open.
- `product`: optional `REF`, `DVEL`, or `CC`; defaults to reflectivity.

## GLM scope

The GLM overlay shows total-lightning flash centroids from NOAA's Level 2 LCFA
product, not exact ground-strike positions or cloud-to-ground classification.
Each source file represents a 20-second interval. Meowdar downloads and decodes
GLM only after the operator enables it, paints the newest interval first, and
caps files, points, cache size, and worker concurrency.

## Deployment

Upload the folder to any static host.

- For GitHub Pages, commit this folder at the publishing root, keep `.nojekyll`
  present, and select the branch/folder in repository Pages settings. No build
  step, server, API key, or environment variable is required.
- Serve `.wasm` as `application/wasm`.
- Keep `index.html` and `config.js` lightly cached.
- Cache pinned `vendor/` assets immutably.
- Keep OpenStreetMap attribution visible.
- Permit the selected radar providers, tile host, NOAA GOES S3, MapLibre CDN,
  and optional h5wasm fallback in the site's Content Security Policy.
- Permit `worker-src 'self' blob:` when enforcing CSP.

No Meowdar radar API, tile proxy, database, render farm, authentication service,
or server-side archive process is required.

## Files

```text
index.html                  production application shell
styles.css                  responsive Windows 95 interface
config.js                   map, polling, and GLM configuration
app.js                      map, radar, archive, loop, and live-follow logic
scan-quality.js             product-aware sweep validation and ranking
palette-manager.js          palette import/editor/filters/persistence
glm-controller.js           NOAA listing, cache, map layer, and scheduling
lightning-worker.js         worker-side NetCDF4/HDF5 GLM decoder
demo.html                   self-contained interactive presentation build
preview.png                 desktop preview
palette-preview.png         palette editor preview
mobile-preview.png          mobile preview
RESOURCE_BUDGET.md          browser memory/network/CPU guardrails
QA.md                       automated checks and staging checklist
scripts/vendor-bowecho.*    one-time dependency installers
```

## Upstream

- BowEcho radar toolbox: https://github.com/FahrenheitResearch/bowecho-radar-toolbox
- BowEcho app: https://github.com/FahrenheitResearch/bowecho
- MapLibre GL JS: https://maplibre.org/maplibre-gl-js/
- OpenStreetMap: https://www.openstreetmap.org/
- h5wasm: https://github.com/usnistgov/h5wasm
- NOAA GOES open data: https://registry.opendata.aws/noaa-goes/

## Operational disclaimer

Meowdar is an analysis and visualization workstation, not an official warning
service. Confirm hazardous-weather decisions against authoritative NWS products
and local emergency guidance.
