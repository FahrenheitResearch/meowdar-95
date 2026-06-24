# BowEcho Parity Ledger

Baseline inspected in the untouched BowEcho checkout:

```text
work/bowecho
HEAD e623471
tag v0.21.2
origin/main
```

This standalone bundle is intentionally separate from the BowEcho app. The goal is to expose BowEcho-grade radar capability as a reusable browser/client toolbox, not to copy the egui shell.

## Browser-Ready Now

- NEXRAD Level II archive listing from public S3.
- Arbitrary-date NEXRAD archive replay helpers: `nexradArchiveDatePrefix`, `nexradArchiveListingUrl`, `parseNexradArchiveListing`, `archiveFrameWindow`, `archiveFramesForDate`, `archiveLoopFramesForDate`, and `loadArchiveLoop`.
- SPC event-day helpers: `spcConvectiveDate`, `parseSpcReportsCombined`, `parseSpcTornadoSegments`, `fetchSpcEventDay`, `selectEventRadarSites`, `eventArchiveFrameWindow`, and `eventArchivePlanForTrack`.
- SPC outlook overlay helpers from BowEcho v0.22.0: `spcOutlookKinds`, `spcOutlookLiveUrls`, `spcOutlookArchiveUrls`, `spcOutlookUrls`, `parseSpcOutlook`, `spcOutlookFeatureCollection`, `fetchSpcOutlook`, and `fetchSpcOutlooks`.
  - Categorical, tornado, wind, and hail outlook GeoJSON parse into SPC-published fill/stroke colors and outer rings for Polygon/MultiPolygon features.
  - Live day-1 outlooks try the same 0100 UTC archive file before 12Z that BowEcho uses, then fall back to the live headline URL.
  - Archive outlooks probe issues in `2000`, `1630`, `1300`, `1200`, `0100` order.
  - `examples/spc-outlook-planner.html` shows live/archive URL planning, mock parsing, and map-ready polygon rendering.
- NEXRAD Level II realtime chunk listing and client-side chunk joining.
- Browser-supported byte/file import for NEXRAD Level II, ODIM_H5, CfRadial 1.x, DORADE sweep, and JMA polar radar GRIB2 tar through the worker/WASM decoder router.
- Browser-supported mobile/research radar ZIP archive import through `supportedArchiveFormats`, ZIP directory/extract helpers, `importMobileArchiveFrame`, and the worker/WASM split-volume merge path.
- Provider/catalog helpers for public NEXRAD, browser byte/file import, and CORS-enabled custom URL frames.
- Client-side WASM decode through the toolkit copy.
- Product render to exact-size RGBA/ImageData buffers.
- Live plus archive loop assembly.
- BowEcho-style archive day windows by selected volume or target UTC time, with list-only planning before any radar-byte download.
- BowEcho-style tornado-event planning: SPC report/WCM track parse, primary/overlay radar selection by track midpoint/end, estimated lift time, and archive window selection with pad frames.
- Fast rerender path for product, tilt, range, smoothing, and canvas size changes.
- Worker caches for raw bytes, decoded volumes, product metadata, and rendered RGBA frames.
- Configurable worker cache limits plus `warmFrames` / `warmLoop` preloading, so larger loops can keep decoded volumes hot across DVEL/SRV/product/tilt changes instead of evicting their own frames.
- Live polling by chunk fingerprint, so unchanged live data does not force rerender.
- 204 selectable Level II radar sites, with profiler-only IDs filtered out.
- Global source/provider catalog from the latest BowEcho toolkit tables:
  - `GLOBAL_RADAR_PROVIDERS` exposes NEXRAD, nine international provider families, and community GR2A feeds with supported formats and capability flags.
  - `INTERNATIONAL_RADAR_SITES` exposes 147 static international radar markers from SMHI, DMI, GeoSphere, FMI, SHMU, DWD, CHMI, JMA, and EUMETNET ORD.
  - `COMMUNITY_RADAR_FEEDS` and `COMMUNITY_RADAR_MARKERS` expose 19 research feeds collapsed into 12 map markers, including the Norman Testbed cluster.
  - `globalRadarSites`, `globalRadarSitesGeoJson`, `mapboxGlobalRadarSiteSource`, `deckGlobalRadarSiteScatterplotLayerProps`, `nearestRadarSite`, and `radarSiteSourceSummary` provide all-source map and picker helpers.
  - `examples/global-source-catalog.html` shows a dependency-free all-source marker catalog UI.
- Browser-side community GR2A feed planning:
  - `parseCommunityDirList`, `newestCommunityDirListEntry`, and `parseGrLevel2CfgSites` mirror BowEcho's custom URL poller listing rules.
  - `fetchCommunityDirList` supports direct `{pollUrl}/dir.list` and the single-site `grlevel2.cfg` root-discovery fallback.
  - `communityFeedFrameFromEntry`, `latestCommunityFrame`, `recentCommunityFrames`, `loadCommunityLoop`, and `pollCommunityLive` expose stable frame identities/cache keys so CORS-enabled community feeds use the normal worker/WASM decode, render, quick-loop, and refresh path.
  - `examples/community-feed-planner.html` shows the planner contract with mock listings and optional live CORS probing.
- Browser-side custom GR2A poll-link management from BowEcho v0.22.0:
  - `normalizeCustomPollUrl`, `pollUrlsMatch`, `pollUrlName`, `parseCustomPollMarkerInputs`, `customPollEntryLatLon`, and `customPollEntryLabel` mirror BowEcho's saved custom-link semantics, including bare-host normalization and link-only entries.
  - `parseCustomRadarGis`, `customPollUrlForGisSite`, `customPollLinksFromGis`, `normalizeCustomPollLink`, `upsertCustomPollLink`, `customPollLinkFeed`, `customPollLinksAsFeeds`, `customPollMarkers`, and `customPollLinksGeoJson` expose GR `customradars.gis`/`radars.gis` import, map markers, and community-feed conversion in browser UI-neutral form.
  - `globalRadarSites`, `globalRadarSitesGeoJson`, `nearestRadarSite`, and map adapter helpers accept `customPollLinks` with `source: "custom"` so private/mobile/research feeds can sit beside NEXRAD, international, and built-in community markers.
  - `examples/custom-poll-links.html` shows saved custom links, GIS import, map marker picking, and `dir.list` planning against the existing community-feed path.
- Browser-side DMI Denmark international planning:
  - DMI station IDs are preserved as WMO-style strings with leading zeros (`06177`, etc.) in the standalone catalog.
  - `dmiVolumeItemsUrl`, `parseDmiVolumeItems`, `dmiFramePlanFromItems`, and `dmiFramePlansFromItems` mirror DMI's public STAC `volume/items` contract.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` expose stable frame identities/cache keys for DMI's single-file ODIM_H5 frames.
  - International loops attach `internationalSite` and `siteDescriptor` so map adapters can place non-NEXRAD radar textures by real coordinates.
  - `examples/international-dmi-planner.html` shows the DMI planner contract with mock STAC items and optional live CORS probing.
- Browser-side SMHI Sweden international planning:
  - SMHI area keys remain provider-native lowercase (`angelholm`, `vara`, etc.) through frame descriptors, loop descriptors, and texture layers.
  - `smhiAreaCatalogUrl`, `smhiQcvolCatalogUrl`, `smhiDatedQcvolUrl`, `parseSmhiAreaCatalog`, `parseSmhiQcvolCatalog`, `smhiFramePlanFromCatalog`, and `smhiFramePlansFromCatalog` mirror SMHI's public `qcvol` API.
  - SMHI frame URLs use the dated path derived from each `lastFiles` key, keeping frame identity and downloaded bytes in lockstep instead of relying on `latest.h5`.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover SMHI's single-file ODIM_H5 PVOL frames.
  - `examples/international-smhi-planner.html` shows the SMHI planner contract with mock `qcvol` JSON and optional live CORS probing.
- Browser-side GeoSphere Austria international planning:
  - GeoSphere exposes the Hochficht research radar as provider-native lowercase `hochficht` through frame descriptors, loop descriptors, and texture layers.
  - `geosphereStartAfterKey`, `geosphereVolumeListingUrl`, `parseGeosphereVolumeListing`, `geosphereFramePlanFromListing`, and `geosphereFramePlansFromListing` mirror the public S3-compatible datahub path.
  - GeoSphere frame identities stay on the native `WXRHOF_yyyymmddhhmm.hdf` keys, and recent/live planning uses `start-after` windows so the browser does not walk the full historical bucket.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover GeoSphere's single-file ODIM_H5 frames.
  - `examples/international-geosphere-planner.html` shows the GeoSphere planner contract with mock S3 XML and optional live CORS probing.
- Browser-side split-volume ODIM merge support:
  - The WASM package exports `decode_supported_volume_parts`, which decodes each ODIM/CfRadial/etc. part independently and merges decoded volumes through `radar_core::merge_radar_volumes`.
  - The worker treats `frame.merge && frame.urls.length` as split-volume assembly; NEXRAD chunk URLs still use the existing byte-concatenation path.
- Browser-side mobile/research archive grouping:
  - `isZipBytes`, `parseZipDirectory`, `extractZipEntries`, and `extractMobileArchiveEntries` parse standard ZIP archives in the browser, skip metadata sidecars, and keep radar sweep files as separate byte parts.
  - `importMobileArchiveFrame` and archive auto-detect in `importFileFrame` pass the parts through `decode_supported_volume_parts`, cache the parts in the worker, and return one `merge: true` frame descriptor with `archiveEntries`.
- Browser-side SHMU Slovakia international planning:
  - SHMU station IDs remain provider-native lowercase (`skjav`, `skkoj`, `skkub`, `sklaz`) through frame descriptors, loop descriptors, and texture layers.
  - `parseAutoIndexListing`, `shmuSiteCatalogUrl`, `shmuProductCatalogUrl`, `shmuProductDateListingUrl`, `parseShmuDateListing`, `parseShmuFileListing`, `shmuFramePlanFromProductFiles`, and `shmuFramePlansFromProductFiles` mirror SHMU's public autoindex tree.
  - SHMU frame planning requires a common dBZ/V 14-digit timestamp and merges optional ZDR/RhoHV/PhiDP/KDP files only when they share that timestamp.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover SHMU's split ODIM_H5 PVOL frames with `merge: true`.
  - `examples/international-shmu-planner.html` shows the SHMU split-volume planner contract with mock autoindex pages and optional live CORS probing.
- Browser-side DWD Germany international planning:
  - DWD station IDs remain provider-native lowercase (`asb`, `boo`, etc.) through frame descriptors, loop descriptors, and texture layers.
  - `dwdSitesRootUrl`, `dwdProductCatalogUrl`, `dwdProductStationCatalogUrl`, `dwdProductHdf5CatalogUrl`, `dwdProductSweepListingUrl`, `parseDwdSweepListing`, `dwdFramePlanFromProductSweeps`, and `dwdFramePlansFromProductSweeps` mirror DWD's public nginx autoindex tree.
  - DWD frame planning ignores `LATEST` aliases, anchors a complete cycle from the newest highest sweep index, selects timestamped sweeps inside the trailing 5-minute window, and plans reflectivity+velocity as 20 separate ODIM parts by default.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover DWD's split ODIM_H5 sweep frames with `merge: true`.
  - `examples/international-dwd-planner.html` shows the DWD sweep-merge planner contract with mock autoindex pages and optional live CORS probing.
- Browser-side CHMI Czechia international planning:
  - CHMI site IDs remain provider-native lowercase (`brd`, `ska`) through frame descriptors, loop descriptors, and texture layers.
  - `chmiSitesRootUrl`, `chmiSiteCatalogUrl`, `chmiProductCatalogUrl`, `chmiProductHdf5ListingUrl`, `parseChmiFileListing`, `chmiFramePlanFromProductFiles`, and `chmiFramePlansFromProductFiles` mirror CHMI's public autoindex tree.
  - CHMI frame planning anchors recent task-volume frames from `vol_z`, selects freshest task `Z`, `B`, and `A` files inside the trailing 12-minute window, and merges required `vol_z`/`vol_v` plus optional dual-pol products when present.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover CHMI's task ODIM_H5 frames with `merge: true`.
  - `examples/international-chmi-planner.html` shows the CHMI task-merge planner contract with mock autoindex pages and optional live CORS probing.
- Browser-side JMA Japan international planning:
  - JMA station IDs remain provider-native uppercase (`ITOK`, `KASH`, etc.) through frame descriptors, loop descriptors, and texture layers.
  - `jmaRadarBaseUrl`, `jmaTarUrl`, `jmaCandidateStamps`, and `jmaFramePlanFromStamp` mirror the NICT-mirrored JMA `Z__C_RJTD_{stamp}_RDR_JMAGPV_N5_grib2.tar` URL contract.
  - Recent/live planning probes newest-first 5-minute `N5` tar stamps across a 40-minute lookback, returns loop frames oldest-to-newest, and keeps stable identities as `{stamp}_{site}`.
  - The worker/WASM path exports `decode_jma_tar_station` so the selected site filters the shared multi-station tar before rendering; the URL byte cache also lets multiple station selections reuse the same downloaded tar when possible.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover JMA's single-tar frames with `format: "jma-grib2-tar"` and `siteFilteredDecode: true`.
  - `examples/international-jma-planner.html` shows the JMA tar planner contract with mock HEAD probes and optional live CORS probing.
- Browser-side EUMETNET ORD international planning:
  - ORD site IDs remain provider-native lowercase (`nlhrw`, `frtou`, `nohur`, etc.) through frame descriptors, loop descriptors, and texture layers.
  - `ordBucketBaseUrl`, `ordObjectKinds`, `ordHourPrefix`, `ordHourListingUrl`, `parseOrdObjectKey`, `ordFramePlansFromKeys`, and `ordFramePlanFromKeys` mirror the public S3-compatible `openradar-24h` ODIM_H5 cache.
  - Recent/live planning probes the preferred PVOL or SCAN object kind, lists newest hour prefixes, selects parts inside the trailing 5-minute cycle window, and includes adjacent previous-hour keys at boundaries.
  - The planner drops TH/TV-only reflectivity files when matching DBZH/DBZV files cover the same elevations, keeps delayed velocity parts such as Norway's one-minute offset, and sets `merge: true` only when the selected ORD frame really has multiple parts.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover ORD single-file and split ODIM_H5 frames.
  - `examples/international-ord-planner.html` shows the ORD PVOL/SCAN planner contract with mock S3 XML and optional live CORS probing.
- Browser-side FMI Finland international planning:
  - FMI station IDs remain provider-native lowercase (`fianj`, `fikor`, etc.) through frame descriptors, loop descriptors, and texture layers.
  - `s3StyleListingUrl` and `parseS3StyleListing` provide reusable browser/Node helpers for S3-compatible `ListObjectsV2` XML catalogs.
  - `fmiDatePrefix`, `fmiCatalogListingUrl`, `fmiRadarVolumeListingUrl`, `parseFmiVolumeListing`, `fmiFramePlanFromListing`, and `fmiFramePlansFromListing` mirror FMI's public `fmi-opendata-radar-volume-hdf5` bucket contract.
  - `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `loadInternationalLoop`, and `pollInternationalLive` now cover FMI's single-file ODIM_H5 PVOL frames.
  - `examples/international-fmi-planner.html` shows the FMI planner contract with mock S3 XML and optional live CORS probing.
- Displayable tilt discovery per product.
- UI-ready single-radar session controller:
  - `createRadarSession` and `toolbox.createSession` own site, mode, product, displayable tilt, frame index, loop speed, live polling, cache warming, and current frame/layer state.
  - `session.setProduct`, `session.setCut`, and `session.setRenderOptions` rerender existing frame descriptors instead of re-listing/re-downloading loops.
  - `session.cutChoices`, `session.timeline`, `productDescriptor`, `cutChoicesFromMetadata`, and `loopTimeline` expose the state generated UIs need for arbitrary tilt selectors and VCR controls.
  - `productCapability`, `productChoicesFromMetadata`, `capabilityHintsFromMetadata`, class wrappers, and `session.snapshot().capabilities` expose BowEcho-style product availability, supported cut lists, grouped products, feature gates, and recommended warm products from the current loop metadata.
  - `examples/radar-session-controller.html` shows site/product/tilt/live-loop controls using the session API.
  - `examples/dogfood-radar-app.html` shows a compact end-to-end app built only from the public SDK surface: clickable NEXRAD map, live/recent/archive loading, capability-driven product and tilt controls, playback, cache warming, SPC outlook URL planning, and exact-pixel canvas rendering.
- Product catalog exposed to arbitrary UI code:
  - REF, VEL, DVEL, SRV, DSRV, SW
  - ZDR, CC, PHI, KDP
  - CREF, ET, VIL, VILD
  - MEHS, POSH, POH, MARC, Gust
  - AzShr, Div
- Renderer-neutral map contract:
  - GeoJSON radar-site export for arbitrary map libraries.
  - Full-resolution radar texture descriptors with RGBA/ImageData, lon/lat corners, Web Mercator corners, bounds, and north-up local radar viewport metadata.
  - Radar pixel/local-kilometer/lon-lat conversion helpers for Mapbox, deck.gl, WebGL, wgpu, or custom canvas renderers.
  - First-party dependency-free Mapbox/MapLibre image/canvas/raster/site specs, deck.gl bitmap/site props, and WebGPU texture-upload descriptors.
  - Web Mercator map viewport helpers for fit-to-radar, projection-true pan/zoom, world pixels, tile cover/wrapping, antimeridian-aware bounds, and radar quad meshes.
  - `examples/map-viewport.html` shows a dependency-free map camera, tile grid, full-resolution radar quad placement, and clickable radar sites.
- Package/typing/test contract:
  - `web/package.json` exposes the SDK as `@fahrenheitresearch/bowecho-radar-toolbox`.
  - `web/radar-toolbox.d.ts` describes products, sites, loops, frames, worker contracts, render options, cache stats, and texture metadata.
  - `web/CHANGELOG.md` tracks the browser SDK surface by version.
  - `web/tests/sdk-contract.mjs` verifies catalog shape, profiler filtering, full-resolution texture payloads, coordinate helpers, fake-worker render paths, and cache APIs.
- Multi-site synchronized loops:
  - `loadMultiSiteLoop`, `rerenderMultiSiteLoop`, and `pollMultiSiteLive` support concurrent side-by-side or map-layer radar workflows.
  - `synchronizeRadarLoops` builds a shared timeline from existing loops, matching nearest frames by volume time with a configurable skew limit.
  - Synchronized loops expose per-site frames, timeline slots, missing/skew metadata, nearest-time lookup, and full-resolution texture layers for every present radar.
- Pixel-level multi-site compositing:
  - `compositeRadarLayers` and `compositeLoopSlot` merge existing full-resolution radar texture layers into one georeferenced RGBA/ImageData texture.
  - The compositor maps each output pixel back into each radar's local km/pixel grid and samples nearest-neighbor, preserving crisp radar pixels.
  - Inferred output grids use the finest source-layer km/pixel spacing and refuse implicit downscale beyond configured max dimensions unless explicitly allowed.
- Palette import/export contract:
  - Product descriptors expose native `colorFamily` bindings.
  - `COLOR_TABLE_FAMILIES` exposes the same family buckets as the native toolkit.
  - `parseGrPalette`, `exportGrPalette`, `validatePalette`, and `paletteBinding` support GR-style `.pal` import/export and product-family compatibility in generated UIs.
  - Parsed palettes can be passed to render calls and are applied inside WASM through the native `ColorTableSet` path.
  - `createPaletteStore`, `createPaletteFromStops`, `clonePalette`, `palettePreviewCss`, `serializePaletteLibrary`, and `deserializePaletteLibrary` support local user-palette picker/editor workflows and browser persistence.
  - `examples/palette-store-editor.html` shows a persisted palette picker/editor applying custom palettes through `rerenderLoop`.
- Reconstructed vertical cross-section loops:
  - `renderCrossSection`, `renderCrossSections`, and `renderCrossSectionLoop` expose first-class RHI-style volume sections from existing Level II frame descriptors.
  - Endpoints accept radar-local kilometers or lon/lat map points, and `radarCrossSectionPanel` returns full-resolution RGBA/ImageData plus lon/lat and Web Mercator endpoint/path metadata.
  - REF/CREF, velocity, SW, ZDR, CC, PHI, and KDP section products use the native toolkit's volumetric cross-section functions and color-table families.
  - Cross-section rendering reuses the worker decoded-volume cache and has its own render cache keyed by frame, endpoints, size, top height, product, and palette.
- Native RHI/mobile scan rendering:
  - `renderNativeRhi`, `renderNativeRhiFrames`, and `renderNativeRhiLoop` expose the native toolkit RHI renderer for actual RHI-like cuts from imported/provider frames.
  - The browser worker caches native RHI panels separately from reconstructed cross sections and PPI renders.
  - Width/height default to native gate count by radial count. Explicit smaller panels require `allowDownscale: true`.
  - `examples/native-rhi.html` demonstrates local file/mobile-archive import, diagnostics-driven RHI cut selection, and exact-pixel canvas drawing.
- Decoded-volume diagnostics and 3D readiness:
  - `volumeDiagnostics` and `volumeDiagnosticsLoop` expose scan mode, source decode counters, per-cut radial/gate geometry, moment coverage, RHI-like/PPI-like/sector flags, and full-resolution 3D buffer-size estimates.
  - Diagnostics reuse decoded-volume caches and keep a separate worker diagnostics cache, so generated UIs can branch on RHI/mobile scans or allocate WebGPU/Three.js buffers without re-fetching or inferring geometry from rendered pixels.
- Native analysis overlays:
  - `analyzeFrame`, `analyzeFrames`, and `analyzeLoop` run native storm-cell and rotation detection in the browser worker/WASM path.
  - `radarAnalysisOverlay` and loop overlay helpers expose map-ready GeoJSON features plus radar-local offsets and Web Mercator coordinates.
  - Storm cells use the toolkit's enhanced-watershed composite-reflectivity identifier; rotations use the toolkit's vertically-continuous mesocyclone/TVS detector.
  - Analysis results reuse decoded-volume caches and have their own worker cache keyed by source frame.
- TOR tracks and TDS:
  - `renderTorTracksFrame`, `renderTorTracksFrames`, and `renderTorTracksLoop` expose BowEcho-style low-level cyclonic azimuthal-shear grids from existing Level II frame descriptors.
  - The default browser grid is +/-150 km at 0.5 km cells, producing 600x600 full-resolution RGBA plus raw `Float32Array` shear values in `1e-3/s`.
  - `renderTorTracksLoop` accumulates a running max in the worker for quick loop scrubbing and reuses per-frame shear-grid caches.
  - `radarTorTracksLayer` and loop layer helpers expose map-ready texture metadata, lon/lat corners, Web Mercator bounds, value ranges, and TDS GeoJSON features.

## Native Toolkit Copy Already Contains

These crates are present in `bowecho-toolkit` and are candidates for more browser/API exposure:

- `data_source`: NEXRAD archive/realtime, community feeds, international provider scaffolding.
- `nexrad_io`: Level II plus CfRadial, DORADE, ODIM/HDF5-lite, JMA, mobile archive, netCDF3 routing pieces.
- `render2d`: smoothing, gate filters, RHI, cells, shear, tracking, tracks, volumetric helpers, wind/hail probes.
- `product_engine`: app-independent product catalog, displayability, derived products, RGBA rendering.
- `color_tables`: color-table families and palette support.
- `timeline`, `cache`, and `radar_core`.

## Still To Port Or Expose

- Interactive 3D volumetric views as first-class browser SDK calls. Native RHI/mobile scan rendering, reconstructed volume cross-section loops, volume diagnostics/3D buffer planning, per-frame cell/rotation overlays, accumulated TOR tracks, and TDS gates are now exposed.
- Deeper hosted-map integrations and shader effects. First-party Mapbox/MapLibre, deck.gl, WebGPU data-shape helpers, map viewport/tile-cover helpers, and radar quad meshes are now exposed.
- Broader browser/API examples for generated UI agents.

## API Direction

All future UI shells should use `web/radar-toolbox.js` rather than copying logic out of `web/app.js`.

Required fast paths:

- `loadLoop` for site/mode/source changes.
- `createRadarSession` / `toolbox.createSession` for ordinary site/product/tilt/live-loop UI state.
- `capabilityHintsFromMetadata` / `toolbox.capabilityHints` / `session.snapshot().capabilities` for product grids, tilt availability, feature gates, and warm-target choices.
- `importBytesFrame`, `importFileFrame`, `importMobileArchiveFrame`, `frameFromUrl`, and `loadImportedLoop` for local files, mobile/research archives, custom provider bytes, and CORS-enabled custom radar URLs.
- `loadInternationalLoop`, `pollInternationalLive`, `latestInternationalFrame`, and `recentInternationalFrames` for SMHI, GeoSphere, SHMU, DWD, CHMI, JMA, ORD, DMI, and FMI international loops.
- `loadCommunityLoop`, `pollCommunityLive`, `latestCommunityFrame`, and `recentCommunityFrames` for CORS-enabled community GR2A feed loops.
- `customPollLinksFromGis`, `upsertCustomPollLink`, `customPollLinkFeed`, and `customPollMarkers` for BowEcho v0.22-style saved custom GR2A feed catalogs.
- `archiveFramesForDate`, `archiveLoopFramesForDate`, and `loadArchiveLoop` for NEXRAD date archive loops and event replay.
- `fetchSpcOutlook`, `fetchSpcOutlooks`, `parseSpcOutlook`, and `spcOutlookFeatureCollection` for SPC outlook polygon overlays and live/archive issue fallback.
- `fetchSpcEventDay`, `selectEventRadarSites`, `eventArchiveFrameWindow`, and `eventArchivePlanForTrack` for SPC tornado-track event replay planning.
- `radarSourceCatalog`, `globalRadarSites`, `globalRadarSitesGeoJson`, and `nearestRadarSite` for all-source provider pickers and clickable radar maps.
- `rerenderLoop` for product/tilt/range/smoothing/canvas changes.
- `configureCache` and `warmLoop` for larger quick loops where product/tilt changes must reuse already-fetched/decoded volumes.
- `pollLive` for auto-refresh.
- `drawFrameToCanvas` or equivalent exact backing-store drawing.
- `mapView` / `fitMapViewToLayer` / `mapTileCover` / `radarLayerQuadMesh` for custom map cameras, slippy tiles, and WebGPU/WebGL radar quad placement.
- `renderCrossSectionLoop` for quick-loopable vertical sections from existing loop frames.
- `renderNativeRhi` / `renderNativeRhiLoop` for true RHI/mobile-scan cuts with native gate/radial resolution by default.
- `volumeDiagnostics` / `volumeDiagnosticsLoop` for scan-mode handling, RHI/mobile-scan branching, diagnostics panes, and full-resolution 3D buffer planning from decoded volumes.
- `analyzeLoop` for quick-loopable storm-cell and rotation overlays from existing loop frames.
- `renderTorTracksLoop` for quick-loopable low-level rotation tracks and TDS gates from existing loop frames.
- Map/GPU adapters for generated websites: `mapboxCanvasSource`, `mapboxRasterLayer`, `deckBitmapLayerProps`, `webGpuTextureUpload`, `mapTileCover`, and `radarLayerQuadMesh`.
- `compositeLoopSlot` / `compositeRadarLayers` for one-texture multi-radar map products.

The demo UI can keep evolving, but feature parity should land in the toolbox API first.
