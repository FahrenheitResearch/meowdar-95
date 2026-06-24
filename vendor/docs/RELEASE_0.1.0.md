# BowEcho Radar Toolbox 0.1.0 Release Notes

Initial standalone browser-toolkit release candidate for building client-side BowEcho-derived radar websites.

## Release Artifacts

- Static bundle zip: `outputs/bowecho-user-side-radar.zip`
- NPM package source: `work/bowecho-user-web/web`
- Package name: `@fahrenheitresearch/bowecho-radar-toolbox`
- Version: `0.1.0`

## Included

- Browser worker/WASM decode and render path for Level II and supported imported radar containers.
- Typed SDK entrypoint: `web/radar-toolbox.js` plus `web/radar-toolbox.d.ts`.
- Local session state machine for site, product, arbitrary displayable tilt, playback, live polling, cache warming, and rerendering.
- Arbitrary-date NEXRAD archive planning and replay through `archiveFramesForDate`, `archiveLoopFramesForDate`, and `loadArchiveLoop`, with list-only timeline planning before radar-byte downloads.
- SPC outlook overlay planning through categorical/tornado/wind/hail GeoJSON parsers, live day-1 0100 UTC fallback URL ordering, archive issue-order probing, and GeoJSON/map-ready feature output.
- SPC event-day planning through dated storm reports and WCM tornado tracks, including primary/overlay radar selection, estimated track end times, and archive frame windows.
- Full-resolution map/texture adapters for canvas, Mapbox/MapLibre, deck.gl, custom WebGL/WebGPU, Web Mercator cameras, tile coverage, and radar quad meshes.
- Client-side provider planning for NEXRAD Level II, community/custom GR2A feeds, SMHI, GeoSphere, SHMU, DWD, CHMI, JMA, EUMETNET ORD, DMI, and FMI.
- BowEcho v0.22.0-style custom GR2A poll-link helpers for saved links, map markers, GR GIS import, and conversion into the existing community planner/poller path.
- Byte/archive import support for NEXRAD Level II, ODIM_H5, CfRadial 1.x classic netCDF, DORADE sweep, JMA polar radar GRIB2 tar files, and mobile/research radar ZIP archives, with selected-station JMA decode for planned frames.
- Product capability hints, palette helpers, synchronized multi-site loops, pixel-level compositing, reconstructed cross sections, native RHI/mobile-scan panels, decoded-volume diagnostics, analysis overlays, TOR tracks, and TDS markers.
- Example pages covering the major API surfaces.
- `web/examples/dogfood-radar-app.html` demonstrates a compact end-to-end radar app using only the public SDK: clickable NEXRAD map, live/recent/archive loading, product and tilt controls, playback, cache warming, SPC outlook URL planning, and exact-pixel canvas rendering.
- `web/examples/archive-replay.html` demonstrates date archive listing, target-time frame windows, loop rendering, and product/cut rerendering.
- `web/examples/spc-event-planner.html` demonstrates SPC event-day parsing, tornado-track plotting, primary/overlay radar choices, and archive replay window planning.
- `web/examples/custom-poll-links.html` demonstrates saved custom GR2A links, GR GIS import, map marker picking, and `dir.list` planning.

## Verification Gate

Run from `work/bowecho-user-web/web`:

```powershell
npm test
npm pack --dry-run
```

Run from `outputs/bowecho-user-side-radar/web` after rebuilding the zip:

```powershell
npm test
```

Browser smoke checks used for this release candidate:

- `web/examples/international-chmi-planner.html?v=chmi-planner1`
- CHMI mock planner returns two `merge: true` frames with six URL parts each.
- CHMI map marker click switches from `brd` to `ska` and replans without console errors.
- `web/examples/international-jma-planner.html?v=jma-planner1`
- JMA mock planner returns two `jma-grib2-tar` frames with `siteFilteredDecode: true`.
- JMA map marker click switches selected stations and replans without console errors.
- `web/examples/international-ord-planner.html?v=ord-planner1`
- ORD mock planner returns PVOL, SCAN, and delayed-velocity split examples with stable identities and correct `merge` flags.
- ORD map marker click switches selected sites and replans without console errors.
- `web/examples/native-rhi.html?v=native-rhi1`
- Native RHI example loads without console errors and exposes local file/archive rendering controls; actual rendering requires an RHI/mobile scan file in the browser.
- `web/examples/archive-replay.html?v=archive-replay1`
- Archive replay example loads without console errors and exposes site/date/target-time planning controls; actual rendering downloads selected archive volumes in the browser.
- `web/examples/spc-event-planner.html?v=spc-event1`
- SPC event planner loads without console errors, parses mock 2011-04-27 reports/WCM segments, selects primary/overlay radars, and displays an archive replay window plan.
- `web/examples/spc-outlook-planner.html?v=spc-outlook1`
- SPC outlook planner loads without console errors, parses mock categorical outlook polygons, draws SPC fill/stroke colors, and lists live/archive candidate URLs.
- `web/examples/custom-poll-links.html?v=custom-poll1`
- Custom poll-link planner loads without console errors, imports mock GR GIS rows, draws selectable custom markers, and plans mock `dir.list` frames through the community-feed path.
- `web/examples/dogfood-radar-app.html?v=live-debug2`
- Dogfood app loads without console errors, opens in live mode, exposes a clickable NEXRAD map, and a real 1-frame KTLX live loop renders at exact 768x768 backing pixels.
- Live KTLX REF rendered `2026-06-14T00:15:30Z` with sampled `nonBlackRatio: 0.042603`, `maxRgb: 248`, and product/tilt controls populated.
- Switching the same live volume to DVEL rerendered client-side with sampled `nonBlackRatio: 0.09729`, `maxRgb: 255`, and about 52 ms render time.

## Known Gaps

- No hosted server-side radar processing is included or required. Public feed CORS behavior still controls whether a purely static website can fetch a given live provider directly from the browser.
- This is an initial SDK release candidate, not a claim that every latest native BowEcho feature has a polished browser UI. Native RHI rendering is exposed in the SDK, while a polished general 3D volumetric browser view remains future work.

## Release Rules

- Do not downscale radar pixels implicitly.
- Do not reload or refetch loops for ordinary product/tilt changes; use session/rerender/cache APIs.
- Keep original BowEcho untouched. This release is self-contained in `work/bowecho-user-web` and the generated `outputs` artifacts.
