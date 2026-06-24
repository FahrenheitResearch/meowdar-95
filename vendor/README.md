# BowEcho Radar Toolbox

Client-side radar toolkit for building fast browser radar apps from BowEcho-derived processing code.

The package exposes a typed JavaScript API, a Web Worker, and a WASM decoder/renderer bundle. Public Level II, community GR2A, and supported international radar feeds are fetched by the end user's browser, decoded in the worker, cached locally, and rendered without server-side radar processing.

## Install Shape

This initial release is packaged as a static browser SDK. Import from `radar-toolbox.js` in a browser app or serve this directory directly while prototyping.

```js
import {
  createRadarToolbox,
  createRadarSession,
  customPollLinksFromGis,
  drawFrameToCanvas,
  fetchSpcEventDay,
  fetchSpcOutlook,
  globalRadarSitesGeoJson,
  nexradArchiveListingUrl,
  recentInternationalFrames,
} from "./radar-toolbox.js";

const toolbox = createRadarToolbox();
const session = createRadarSession(toolbox, {
  site: "KTLX",
  mode: "live",
  product: "REF",
  frameCount: 6,
  width: 768,
  height: 768,
  rangeKm: 230,
});

await session.load({ warmProducts: ["DVEL", "SRV"], concurrency: 4 });
await session.setProduct("DVEL");
await session.setCut(session.cutChoices()[0].index);
drawFrameToCanvas(canvas, session.currentFrame());

const archiveLoop = await toolbox.loadArchiveLoop("KTLX", "2026-06-12", {
  targetTime: "2026-06-12T06:36:00Z",
  frameCount: 8,
  product: "REF",
  width: 768,
  height: 768,
});
drawFrameToCanvas(canvas, archiveLoop.frame(archiveLoop.length - 1));
console.log(nexradArchiveListingUrl("KTLX", "2026-06-12"));

const eventDay = await fetchSpcEventDay("2011-04-27", { includeConsolidated: false });
const outlook = await fetchSpcOutlook(1, "cat", { now: new Date() });
const customLinks = customPollLinksFromGis(gisText, "https://example.test/level2/raw");
const customFeed = toolbox.customPollLinkFeed(customLinks[0]);
```

## What Is Ready

- NEXRAD Level II live, recent, and arbitrary-date archive frame loading, worker/WASM decode, cache warming, product switching, arbitrary displayable tilt selection, and quick loop playback.
- SPC outlook polygon parsing/fetch planning, live/archive issue fallback, convective-day storm report parsing, dated report/WCM tornado-track fetch planning, event radar selection, and archive-window planning for track replay.
- Browser imports for NEXRAD Level II, ODIM_H5, CfRadial 1.x classic netCDF, DORADE sweep, JMA polar radar GRIB2 tar byte buffers, and mobile/research radar ZIP archives.
- Community GR2A `dir.list` feed planning and polling, plus saved custom poll-link normalization, map markers, and GR GIS import helpers.
- Browser-plannable international feeds for SMHI, GeoSphere, SHMU, DWD, CHMI, JMA, EUMETNET ORD, DMI, and FMI.
- Map/renderer adapters for canvas, Mapbox/MapLibre, deck.gl, custom WebGL/WebGPU, Web Mercator view state, tile coverage, and radar quad meshes.
- Product/cut capability hints, palette import/export, multi-site synchronized loops, pixel-level compositing, cross sections, native RHI/mobile-scan panels, storm/rotation overlays, TOR tracks, TDS markers, and decoded-volume diagnostics for 3D buffer planning.

## Rules For Generated UIs

- Keep radar fetch/decode/render work client-side unless the user explicitly asks for server processing.
- Use `createRadarSession` for ordinary single-radar controls so product, tilt, cache warming, playback, and live polling share one state machine.
- Use `session.setProduct()` and `session.setCut()` for product/tilt changes; do not reload loops for every control change.
- Use `textureLayer`, `loopTextureLayers`, and the map adapter helpers for full-resolution georeferenced radar imagery.
- Do not implicitly downscale radar pixels. Native RHI defaults to native gate/radial dimensions, and compositing refuses oversized implicit output unless `allowDownscale: true` is explicitly passed.
- Use `npm test` before publishing or handing off a generated UI.

## Examples

The `examples/` directory includes minimal usage, session controls, date archive replay, SPC event planning, cache warming, byte/archive import, map contracts, global source catalogs, community/custom GR2A feeds, international planners, synchronized loops, compositing, palettes, cross sections, native RHI/mobile scans, volume diagnostics, analysis overlays, and TOR tracks.

`examples/dogfood-radar-app.html` is the compact end-to-end app check: clickable NEXRAD map, live/recent/archive loading, product and tilt controls, playback, cache warming, SPC outlook URL planning, and exact-pixel canvas rendering.

The full API contract, AI handoff prompt, parity ledger, and release notes live in this package's `docs/` directory.
