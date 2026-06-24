# BowEcho Browser Toolbox API

The browser toolbox lives at `web/radar-toolbox.js`. It is UI-agnostic: it knows how to list radar sites, find live/archive Level II frames, decode in a Web Worker/WASM package, render products, rerender an existing loop, poll for new live chunks, and draw a rendered frame to a canvas.

The package metadata in `web/package.json` exports this same module as `@fahrenheitresearch/bowecho-radar-toolbox`, with TypeScript declarations in `web/radar-toolbox.d.ts`.

The static file server only serves files. Public Level II S3 fetches, chunk joining, decoding, product generation, and rendering happen on the user's browser.

## Minimal Use

```js
import {
  PRODUCT_CATALOG,
  RADAR_SITES,
  createRadarSession,
  createRadarToolbox,
  drawFrameToCanvas,
  drawCrossSectionToCanvas,
  drawNativeRhiToCanvas,
  drawTorTracksToCanvas,
  drawRadarLayerToCanvas,
  supportedByteFormats,
  supportedArchiveFormats,
  frameProviders,
  isZipBytes,
  parseZipDirectory,
  extractZipEntries,
  extractMobileArchiveEntries,
  mapboxRadarCanvasSource,
  mapboxRadarRasterLayer,
  fitMapViewToLayer,
  mapTileCover,
  radarLayerQuadMesh,
  deckRadarBitmapLayerProps,
  webGpuRadarTextureUpload,
  parseGrPalette,
  exportGrPalette,
  paletteBinding,
  createPaletteStore,
  palettePreviewCss,
  cutChoicesFromMetadata,
  productChoicesFromMetadata,
  capabilityHintsFromMetadata,
  communityRadarFeed,
  dmiFramePlanFromItems,
  dmiVolumeItemsUrl,
  fetchCommunityDirList,
  fetchSpcOutlook,
  geosphereFramePlansFromListing,
  geosphereVolumeListingUrl,
  internationalRadarProvider,
  internationalRadarSite,
  latestInternationalFrame,
  recentInternationalFrames,
  recentCommunityFrames,
  loopTimeline,
  radarAnalysisOverlay,
  radarCrossSectionPanel,
  radarTorTracksLayer,
  radarTextureLayer,
  globalRadarSites,
  globalRadarSitesGeoJson,
  radarSourceCatalog,
  radarSiteSourceSummary,
  nearestRadarSite,
  parseAutoIndexListing,
  synchronizeRadarLoops,
} from "./radar-toolbox.js";

const toolbox = createRadarToolbox();

const loop = await toolbox.loadLoop({
  site: "KTLX",
  mode: "live",
  product: "REF",
  frameCount: 6,
  width: 768,
  height: 768,
  rangeKm: 230,
});

drawFrameToCanvas(canvas, loop.frame(loop.length - 1));
```

## Exports

`PRODUCT_CATALOG`: product descriptors for base, velocity, dual-pol, derived, severe, and shear products.
Each product includes `colorFamily`, matching the native BowEcho color-table family used for that product.

`COLOR_TABLE_FAMILIES`: 13 palette/color-table families matching the native toolkit: reflectivity, velocity, spectrum width, CC, ZDR, echo tops, VIL, VIL density, hail size, azimuthal shear, PHI, KDP, and generic.

`SUPPORTED_BYTE_FORMATS`: supported single-buffer radar containers for browser import: NEXRAD Level II, ODIM_H5, CfRadial 1.x classic netCDF, DORADE sweep, and JMA polar radar GRIB2 tar.

`SUPPORTED_ARCHIVE_FORMATS`: supported multi-entry radar archives for browser import. The initial archive format is `mobile-archive-zip`, which groups mobile/research radar sweeps from a standard ZIP before passing separate byte parts to the worker merge path.

`FRAME_PROVIDER_CATALOG`: browser-facing provider descriptors for public NEXRAD live/recent/arbitrary-date archive frames, browser byte/file import, CORS-enabled custom URLs, community GR2A `dir.list` feeds, SMHI Sweden ODIM_H5 international frames, GeoSphere Austria ODIM_H5 international frames, SHMU Slovakia split ODIM_H5 international frames, DWD Germany sweep-merge ODIM_H5 international frames, CHMI Czechia task-merge ODIM_H5 international frames, JMA Japan GRIB2 tar frames, EUMETNET ORD ODIM_H5 frames, DMI Denmark ODIM_H5 international frames, and FMI Finland ODIM_H5 international frames.

`supportedByteFormats()`, `supportedArchiveFormats()`, and `frameProviders()`: copy-safe helper accessors for those catalogs.

`parseGrPalette(text, options)`: parses a GR-style `.pal` file into a normalized browser palette object.

`exportGrPalette(palette, options)`: exports a normalized browser palette object back to `.pal` text.

`paletteBinding(palette, productOrFamily)`: returns the family/product binding a UI should use when presenting that palette for products.

`createPaletteFromStops(stops, options)`, `clonePalette(palette, options)`, `palettePreviewCss(palette)`, `serializePaletteLibrary(palettes)`, `deserializePaletteLibrary(text)`, and `createPaletteStore(options)`: helpers for generated palette pickers/editors and local user-palette persistence.

`colorFamilyForProduct(product)`, `familyForPaletteProductCode(code)`, and `paletteProductCodeForFamily(family)`: helpers for product/palette compatibility.

`RADAR_SITES`: Level II radar sites with `id`, `name`, `lat`, and `lon`. Profiler-only IDs are filtered out.

`GLOBAL_RADAR_PROVIDERS`, `INTERNATIONAL_RADAR_SITES`, `COMMUNITY_RADAR_FEEDS`, and `COMMUNITY_RADAR_MARKERS`: generated provider/marker catalogs from the BowEcho toolkit source tables. They cover NEXRAD, nine international provider families, and community GR2A-style research feeds.

`radarSourceCatalog(options)`: filters provider descriptors by id, kind, or query.

`internationalRadarSites(options)`, `internationalRadarProvider(providerId)`, `internationalRadarSite(providerId, siteId)`, `communityRadarFeeds(options)`, `communityRadarFeed(feedOrId)`, and `communityRadarMarkers(options)`: filtered static source catalogs for global website source pickers and map markers.

`smhiAreaCatalogUrl(options)`, `smhiQcvolCatalogUrl(siteId, options)`, `smhiDatedQcvolUrl(siteId, key, options)`, `parseSmhiAreaCatalog(textOrJson)`, `parseSmhiQcvolCatalog(siteId, textOrJson)`, `smhiFramePlanFromCatalog(siteId, textOrJson)`, and `smhiFramePlansFromCatalog(siteId, textOrJson)`: browser-side planner helpers for SMHI Sweden's public `qcvol` API. The dated download URL is derived from each `lastFiles` key so frame identity and downloaded bytes stay in lockstep instead of using the identity-less `latest.h5` link.

`geosphereStartAfterKey(date, lookbackHours)`, `geosphereVolumeListingUrl(options)`, `parseGeosphereVolumeListing(textOrListing)`, `geosphereFramePlanFromListing(textOrListing)`, and `geosphereFramePlansFromListing(textOrListing)`: browser-side planner helpers for GeoSphere Austria's public S3-compatible datahub. Hochficht frames keep the native `WXRHOF_yyyymmddhhmm.hdf` identity and use `start-after` listing windows so live/recent planning does not walk the full historical bucket.

`parseAutoIndexListing(textOrEntries)`: pure browser/Node helper for nginx/Apache directory indexes. It returns normalized `{ name, href, url, isDir }` entries and is reused by split international providers.

`shmuVolumeRootUrl(options)`, `shmuSiteCatalogUrl(siteId, options)`, `shmuProductCatalogUrl(siteId, product, options)`, `shmuProductDateListingUrl(siteId, product, date, options)`, `parseShmuDateListing(textOrEntries)`, `parseShmuFileListing(siteId, product, date, textOrEntries)`, `shmuFramePlanFromProductFiles(siteId, filesByProduct)`, and `shmuFramePlansFromProductFiles(siteId, filesByProduct)`: browser-side planner helpers for SHMU Slovakia's split ODIM_H5 feed. dBZ and V files must share a 14-digit timestamp; matching ZDR/RhoHV/PhiDP/KDP files are merged when present. Resulting plans set `merge: true` and keep each ODIM file as a separate part.

`dwdSitesRootUrl(options)`, `dwdProductCatalogUrl(productDir, options)`, `dwdProductStationCatalogUrl(siteId, productDir, options)`, `dwdProductHdf5CatalogUrl(siteId, productDir, options)`, `dwdProductSweepListingUrl(siteId, productDir, variant, options)`, `parseDwdSweepListing(siteId, productDir, quantity, textOrEntries)`, `dwdFramePlanFromProductSweeps(siteId, sweepsByProduct)`, and `dwdFramePlansFromProductSweeps(siteId, sweepsByProduct)`: browser-side planner helpers for DWD Germany's per-sweep ODIM_H5 feed. The planner ignores `LATEST` aliases, anchors complete cycles from the newest highest sweep index, selects timestamped sweeps inside the trailing 5-minute cycle window, and emits `merge: true` frame plans.

`chmiSitesRootUrl(options)`, `chmiSiteCatalogUrl(siteId, options)`, `chmiProductCatalogUrl(siteId, productDir, options)`, `chmiProductHdf5ListingUrl(siteId, productDir, options)`, `parseChmiFileListing(siteId, productDir, textOrEntries)`, `chmiFramePlanFromProductFiles(siteId, filesByProduct)`, and `chmiFramePlansFromProductFiles(siteId, filesByProduct)`: browser-side planner helpers for CHMI Czechia's task-ODIM feed. Required `vol_z` and `vol_v` products are merged across task `Z`, `B`, and `A` files inside the trailing 12-minute freshness window; optional `vol_zdr`, `vol_rhohv`, and `vol_phidp` products are included when present or when explicitly requested. Resulting plans set `merge: true` and keep each ODIM file as a separate part.

`jmaRadarBaseUrl(options)`, `jmaTarUrl(product, stampOrDate, options)`, `jmaCandidateStamps(nowOrOptions, options)`, and `jmaFramePlanFromStamp(siteId, stampOrDate, options)`: browser-side planner helpers for JMA Japan's NICT-mirrored polar-coordinate GRIB2 tar feed. The generic planner probes newest-first 5-minute `N5` tar stamps across the 40-minute lookback window, returns recent plans oldest-to-newest for loop playback, sets `format: "jma-grib2-tar"`, and marks frames with `siteFilteredDecode: true`. In `loadInternationalLoop`, keep `product` for rendered radar products such as `REF` and use `jmaProduct` or `sourceProduct` only if you need the source tar product (`N5`/`N6`) changed. The worker uses the selected four-character JMA station id when decoding a shared tar, so choosing `ITOK` does not render whichever station appears first in the archive.

`ordBucketBaseUrl(options)`, `ordObjectKinds(siteId, options)`, `ordHourPrefix(siteId, objectKind, hourOrDate)`, `ordHourListingUrl(siteId, objectKind, hourOrDate, options)`, `parseOrdObjectKey(siteId, key)`, `ordFramePlansFromKeys(siteId, objectKind, keysOrListing)`, and `ordFramePlanFromKeys(siteId, objectKind, keysOrListing)`: browser-side planner helpers for EUMETNET ORD's public S3-compatible ODIM_H5 cache. The generic planner probes provider-native PVOL or SCAN prefixes by site, lists newest hour windows, plans frames inside a trailing 5-minute cycle, drops TH/TV-only objects shadowed by DBZH/DBZV, and preserves split files as ordered merge parts when needed.

`dmiVolumeItemsUrl(siteId, options)`, `parseDmiVolumeItems(textOrJson)`, `dmiFramePlanFromItems(siteId, textOrJson)`, and `dmiFramePlansFromItems(siteId, textOrJson)`: browser-side planner helpers for DMI Denmark's public `radardata/collections/volume/items` STAC endpoint. DMI station IDs preserve leading zeros.

`s3StyleListingUrl(baseUrl, options)` and `parseS3StyleListing(textOrListing)`: pure helpers for anonymous S3-compatible `ListObjectsV2` XML listings. The parser returns `contents`, `keys`, `commonPrefixes`, `isTruncated`, and `nextContinuationToken` without requiring `DOMParser`, so it works in browser and Node contract tests.

`nexradArchiveDatePrefix(site, date)`, `nexradArchiveListingUrl(site, date, options)`, `parseNexradArchiveListing(site, date, textOrListing)`, and `archiveFrameWindow(frames, options)`: browser-side NEXRAD Level II archive helpers for arbitrary date replay. They list `YYYY/MM/DD/SITE/` prefixes from the public Unidata archive bucket, filter `_MDM` and zero-size objects, preserve stable frame identities/cache keys, and choose a loop window ending at a selected index or target UTC time without downloading radar bytes.

`SPC_OUTLOOK_KINDS`, `spcOutlookKinds()`, `spcOutlookLiveUrls(day, kind, options)`, `spcOutlookArchiveUrls(date, day, kind, options)`, `spcOutlookUrls(day, kind, options)`, `parseSpcOutlook(text)`, `spcOutlookFeatureCollection(outlookOrFeatures)`, `fetchSpcOutlook(day, kind, options)`, and `fetchSpcOutlooks(kinds, options)`: browser-side SPC outlook helpers matching BowEcho v0.22.0. They parse SPC categorical/tornado/wind/hail GeoJSON, preserve SPC-published fill/stroke colors, keep outer rings for Polygon/MultiPolygon features, use the day-1 0100 archive fallback before 12Z, and probe archive issues in `2000`, `1630`, `1300`, `1200`, `0100` order.

`spcConvectiveDate(when)`, `spcReportTimeUtc(day, hhmm)`, `spcReportsUrls(day)`, `spcWcmTornadoYearUrl(year)`, `spcActualTornadoesUrl(endYear)`, `parseSpcReports(kind, day, text)`, `parseSpcReportsCombined(day, text)`, `parseSpcTornadoSegments(day, text)`, `tornadoSegmentsFromReports(reports)`, and `fetchSpcEventDay(day, options)`: browser-side SPC event-day helpers matching BowEcho's 12Z convective-day report convention. They parse SPC filtered/raw storm report CSVs, WCM tornado path rows, synthesize zero-length tornado segments from report dots when no WCM track file is available, and treat report-file 404s as quiet/pre-archive days rather than transport failures.

`selectEventRadarSites(begin, end, options)`, `estimatedTornadoTrackEndTime(begin, lengthMi, options)`, `eventArchiveFrameWindow(frames, options)`, and `eventArchivePlanForTrack(segment, options)`: pure event-replay planners. They choose the primary radar nearest a tornado track midpoint, an optional overlay radar nearest the track end, estimate lift time from path length when needed, and select an archive frame window covering the track plus pad frames without downloading a whole day of radar bytes.

`fmiDatePrefix(date)`, `fmiCatalogListingUrl(options)`, `fmiRadarVolumeListingUrl(siteId, options)`, `parseFmiVolumeListing(siteId, textOrListing)`, `fmiFramePlanFromListing(siteId, textOrListing)`, and `fmiFramePlansFromListing(siteId, textOrListing)`: browser-side planner helpers for FMI Finland's public `fmi-opendata-radar-volume-hdf5` bucket. FMI site IDs stay lowercase (`fianj`, `fikor`, etc.) and each `*_PVOL.h5` object is planned as one ODIM_H5 frame.

`latestInternationalFramePlan(providerId, siteId, options)` and `recentInternationalFramePlans(providerId, siteId, count, options)`: fetch provider frame plans without downloading volume bytes. This slice currently supports providers `"smhi"`, `"geosphere"`, `"shmu"`, `"dwd"`, `"chmi"`, `"jma"`, `"ord"`, `"dmi"`, and `"fmi"`.

`internationalFrameFromPlan(plan)`, `latestInternationalFrame(providerId, siteId, options)`, and `recentInternationalFrames(providerId, siteId, count, options)`: convert international plans into normal frame descriptors with stable `identity` and `cacheKey` values. Single-file SMHI, GeoSphere, JMA, DMI, and FMI frames render through the existing worker/WASM URL path. SHMU, DWD, CHMI, and split ORD frames set `merge: true`; the worker fetches each part separately, decodes each ODIM volume in WASM, and merges via `radar_core::merge_radar_volumes`.

`parseCommunityDirList(text)`, `newestCommunityDirListEntry(textOrEntries)`, and `parseGrLevel2CfgSites(text)`: pure GR2A listing helpers. They mirror BowEcho's `dir.list` behavior: accept `<size> <filename>` or bare filenames, skip metadata sidecars, sort lexicographically, and use the newest data entry as the live identity.

`fetchCommunityDirList(feed, options)`: fetches `{pollUrl}/dir.list` in the browser. If the root listing has no data files, it falls back to `{pollUrl}/grlevel2.cfg`; with exactly one `Site:` entry it fetches that subdirectory's `dir.list`. Browser CORS still applies.

`communityFeedFrameFromEntry(feed, entry, options)`, `latestCommunityFrame(feed, options)`, and `recentCommunityFrames(feed, count, options)`: convert community listing entries into normal frame descriptors with stable `identity` and `cacheKey` values. Those frames can be passed to `frameMetadata`, `renderFrame`, or `loadImportedLoop`.

`normalizeCustomPollUrl(input)`, `pollUrlsMatch(left, right)`, `pollUrlName(url)`, `parseCustomPollMarkerInputs(lat, lon)`, `customPollEntryLatLon(entry)`, `customPollEntryLabel(entry)`, `parseCustomRadarGis(text)`, `customPollUrlForGisSite(baseUrl, siteId)`, `customPollLinksFromGis(text, baseUrl)`, `normalizeCustomPollLink(entry)`, `upsertCustomPollLink(links, entry)`, `customPollLinkFeed(entry)`, `customPollLinksAsFeeds(entries)`, `customPollMarkers(entries)`, and `customPollLinksGeoJson(entries)`: browser-side saved custom GR2A poll-link helpers matching BowEcho v0.22.0 behavior. They normalize bare hosts, preserve link-only entries with no marker, parse GR `customradars.gis`/`radars.gis` whitespace or CSV rows, expand `{site}`/`{SITE}` URL templates, and convert saved links into community-feed descriptors that can be passed directly to `fetchCommunityDirList`, `latestCommunityFrame`, `recentCommunityFrames`, `loadCommunityLoop`, or global map catalog helpers.

`globalRadarSites(options)`: returns a normalized catalog of NEXRAD, international, community, and caller-provided custom poll-link markers. Filter with `source`, `sources`, `providerId`, `country`, `state`, `feedId`, or `query`; pass `customPollLinks` to include saved custom GR2A markers.

`globalRadarSitesGeoJson(options)`, `mapboxGlobalRadarSiteSource(options)`, and `deckGlobalRadarSiteScatterplotLayerProps(options)`: map-ready global source layers. Existing `radarSitesGeoJson()` remains NEXRAD-only for compatibility.

`nearestRadarSite(lonLat, options)`: returns the nearest normalized global catalog entry, optionally bounded by `maxDistanceKm`.

`radarSiteSourceSummary(options)`: returns source/provider/country counts for picker badges and diagnostics.

`createRadarToolbox(options)`: creates a `BowEchoRadarToolbox`.

`createRadarSession(toolbox, options)` or `toolbox.createSession(options)`: creates a UI-ready session controller that owns site, product, displayable tilt, loop index, playback speed, live polling, and cache-warming state on top of the low-level toolbox methods.

`productDescriptor(product)`: returns one product descriptor by id/label.

`productCapability(product)`: returns the source-moment/cut-scope contract for a product.

`cutChoicesFromMetadata(meta, options)`: converts product metadata into displayable tilt choices with labels, elevation numbers, moments, and selected state.

`productChoicesFromMetadata(meta, options)`: converts product metadata into product picker choices, including availability, source moments, supported cuts, default cut, volume-vs-cut scope, and disabled-state reason.

`capabilityHintsFromMetadata(meta, options)`: returns a single UI contract for product availability, displayable tilts, grouped products, recommended warm products, and feature gates such as velocity, dual-pol, cross-section, analysis, and TOR tracks.

`loopTimeline(loop, options)`: converts a rendered loop into frame ids/times/current/latest metadata for timeline sliders and VCR controls.

`drawFrameToCanvas(canvas, renderedFrame)`: draws a rendered toolbox frame without scaling the pixel buffer.

`drawCrossSectionToCanvas(canvas, renderedSection)`: draws a rendered cross-section panel without scaling the pixel buffer.

`drawNativeRhiToCanvas(canvas, renderedNativeRhi)`: draws a native RHI/mobile-scan panel without scaling the pixel buffer.

`drawTorTracksToCanvas(canvas, renderedTracks)`: draws a rendered TOR-track grid without scaling the pixel buffer.

`drawRadarLayerToCanvas(canvas, radarLayer)`: draws a `radarTextureLayer` or `radarTorTracksLayer` to a canvas with exact backing pixels. Use this when feeding a Mapbox/MapLibre canvas source.

`radarSitesGeoJson(options)`: returns a GeoJSON `FeatureCollection` of radar sites for Mapbox, deck.gl, Leaflet, or any custom map shell.

`radarTextureLayer(renderedFrame, options)`: converts a rendered frame into a renderer-neutral texture descriptor with the exact RGBA/ImageData buffer, site center, four lon/lat corners, Web Mercator corners, bounds, product, cut, source frame, and viewport metadata.

`radarCrossSectionPanel(renderedSection, options)`: converts a rendered vertical section into a renderer-neutral panel descriptor with the exact RGBA/ImageData buffer, lon/lat endpoints, Web Mercator path, length/top axes, value range, product, source frame, and palette metadata.

`radarAnalysisOverlay(analysis, options)`: converts native storm-cell and rotation detections into a renderer-neutral overlay with GeoJSON point features, radar-local offsets, lon/lat, and Web Mercator coordinates.

`radarTorTracksLayer(renderedTracks, options)`: converts a rendered low-level rotation-track frame into a renderer-neutral texture descriptor with the exact RGBA buffer, raw shear values, site center, lon/lat corners, Web Mercator corners, grid metadata, accumulated-frame metadata, value range, and TDS GeoJSON.

`mapboxRadarCoordinates(layer)`, `mapboxRadarCanvasSource(layer, canvas)`, `mapboxRadarImageSource(layer, { url })`, `mapboxRadarRasterLayer(layer, options)`, and `mapboxRadarLayerSpecs(layer, options)`: Mapbox/MapLibre-style adapter helpers for radar textures. Canvas sources are the in-memory live-loop path; image sources require a URL/blob/data URL.

`mapboxRadarSiteSource(options)` and `mapboxRadarSiteLayer(options)`: Mapbox/MapLibre-style radar-site GeoJSON source and clickable site layer specs.

`deckRadarBitmapLayerProps(layer, options)` and `deckRadarSiteScatterplotLayerProps(options)`: deck.gl prop objects for full-resolution radar bitmap layers and radar-site scatterplot layers.

`webGpuRadarTextureUpload(layer, options)`: returns exact RGBA bytes plus `createTexture` and `writeTexture` layout metadata for WebGPU/wgpu-style upload code.

`lonLatToWebMercator(lon, lat)`, `webMercatorToLonLat(x, y)`, `worldPixelSize(zoom, tileSize)`, `lonLatToWorldPixel(lon, lat, options)`, and `worldPixelToLonLat(x, y, options)`: pure projection helpers for custom Mapbox-compatible or WebGPU map cameras.

`normalizeMapView(options)`: returns a stable Web Mercator map camera contract with center, zoom, dimensions, bounds, unwrapped bounds, and antimeridian state.

`fitMapViewToBounds(bounds, options)` and `fitMapViewToLayer(layer, options)`: build a map camera that fits geographic bounds or a radar layer with padding.

`panMapView(view, delta, options)` and `zoomMapView(view, zoomDelta, options)`: projection-true camera updates for drag/pan/scroll controls.

`mapTileCover(view, options)`: returns wrapped Web Mercator tile descriptors for the current view. Pass `urlTemplate: "https://.../{z}/{x}/{y}.png"` when a renderer wants URLs.

`radarLayerQuadMesh(layer, view, options)`: returns four radar quad vertices with screen, clip-space, world-pixel, lon/lat, source-pixel, and UV coordinates for custom canvas/WebGL/WebGPU renderers. The mesh references the original full-resolution RGBA buffer; it does not resample pixels.

`synchronizeRadarLoops(loops, options)`: builds a side-by-side or multi-layer synchronized timeline from existing loops.

`radarPixelToLonLat(site, pixel, options)`, `radarOffsetToLonLat(site, offset)`, and `radarOffsetFromLonLat(site, lonLat)`: helper transforms between radar-local kilometers, pixels, lon/lat, and Web Mercator-friendly coordinates.

## Toolbox Methods

`products()`: returns product descriptors.

`colorFamilies()`: returns palette family descriptors.

`parsePalette(text, options)`, `exportPalette(palette, options)`, `validatePalette(palette)`, `paletteBinding(palette, productOrFamily)`, `createPaletteFromStops(stops, options)`, `clonePalette(palette, options)`, `palettePreviewCss(palette)`, `createPaletteStore(options)`, `serializePaletteLibrary(palettes)`, and `deserializePaletteLibrary(text)`: class-method forms of the palette helpers.

`sites({ query, includeProfilers })`: returns radar site descriptors.

`site(id)`: returns one radar site descriptor or `null`.

`sitesGeoJson(options)`: class-method form of `radarSitesGeoJson(options)`.

`radarSourceCatalog`, `internationalRadarSites`, `internationalRadarProvider`, `internationalRadarSite`, `smhiAreaCatalogUrl`, `smhiQcvolCatalogUrl`, `smhiDatedQcvolUrl`, `parseSmhiAreaCatalog`, `parseSmhiQcvolCatalog`, `smhiFramePlanFromCatalog`, `smhiFramePlansFromCatalog`, `geosphereStartAfterKey`, `geosphereVolumeListingUrl`, `parseGeosphereVolumeListing`, `geosphereFramePlanFromListing`, `geosphereFramePlansFromListing`, `parseAutoIndexListing`, `shmuVolumeRootUrl`, `shmuSiteCatalogUrl`, `shmuProductCatalogUrl`, `shmuProductDateListingUrl`, `parseShmuDateListing`, `parseShmuFileListing`, `shmuFramePlanFromProductFiles`, `shmuFramePlansFromProductFiles`, `dwdSitesRootUrl`, `dwdProductCatalogUrl`, `dwdProductStationCatalogUrl`, `dwdProductHdf5CatalogUrl`, `dwdProductSweepListingUrl`, `parseDwdSweepListing`, `dwdFramePlanFromProductSweeps`, `dwdFramePlansFromProductSweeps`, `chmiSitesRootUrl`, `chmiSiteCatalogUrl`, `chmiProductCatalogUrl`, `chmiProductHdf5ListingUrl`, `parseChmiFileListing`, `chmiFramePlanFromProductFiles`, `chmiFramePlansFromProductFiles`, `jmaRadarBaseUrl`, `jmaTarUrl`, `jmaCandidateStamps`, `jmaFramePlanFromStamp`, `ordBucketBaseUrl`, `ordObjectKinds`, `ordHourPrefix`, `ordHourListingUrl`, `parseOrdObjectKey`, `ordFramePlansFromKeys`, `ordFramePlanFromKeys`, `dmiVolumeItemsUrl`, `parseDmiVolumeItems`, `dmiFramePlanFromItems`, `dmiFramePlansFromItems`, `s3StyleListingUrl`, `parseS3StyleListing`, `nexradArchiveDatePrefix`, `nexradArchiveListingUrl`, `parseNexradArchiveListing`, `archiveFrameWindow`, `archiveFramesForDate`, `archiveLoopFramesForDate`, `loadArchiveLoop`, `fmiDatePrefix`, `fmiCatalogListingUrl`, `fmiRadarVolumeListingUrl`, `parseFmiVolumeListing`, `fmiFramePlanFromListing`, `fmiFramePlansFromListing`, `latestInternationalFramePlan`, `recentInternationalFramePlans`, `internationalFrameFromPlan`, `latestInternationalFrame`, `recentInternationalFrames`, `communityRadarFeeds`, `communityRadarFeed`, `communityRadarMarkers`, `normalizeCustomPollUrl`, `pollUrlsMatch`, `pollUrlName`, `parseCustomPollMarkerInputs`, `customPollEntryLatLon`, `customPollEntryLabel`, `parseCustomRadarGis`, `customPollLinksFromGis`, `normalizeCustomPollLink`, `customPollLinkFeed`, `customPollLinksAsFeeds`, `upsertCustomPollLink`, `customPollMarkers`, `customPollLinksGeoJson`, `parseCommunityDirList`, `newestCommunityDirListEntry`, `parseGrLevel2CfgSites`, `fetchCommunityDirList`, `communityFeedFrameFromEntry`, `latestCommunityFrame`, `recentCommunityFrames`, `globalRadarSites`, `globalRadarSitesGeoJson`, `mapboxGlobalRadarSiteSource`, `deckGlobalRadarSiteScatterplotLayerProps`, `nearestRadarSite`, and `radarSiteSourceSummary`: class-method forms of the global source/provider catalog, NEXRAD date archive helpers, international planners, custom/community planner helpers.

`createSession(options)`: class-method form of `createRadarSession(toolbox, options)`.

`productCapability(product)`, `productChoices(metaOrLoop, options)`, and `capabilityHints(metaOrLoop, options)`: class-method forms of the capability helpers.

`cutChoices(metaOrLoop, options)`: class-method form of `cutChoicesFromMetadata`, accepting either raw product metadata or a rendered loop.

`loopTimeline(loop, options)`: class-method form of `loopTimeline`.

`textureLayer(renderedFrame, options)`: class-method form of `radarTextureLayer(renderedFrame, options)`.

`loopTextureLayers(loop, options)`: returns one texture descriptor for each rendered loop frame.

`crossSectionPanel(renderedSection, options)`: class-method form of `radarCrossSectionPanel(renderedSection, options)`.

`loopCrossSectionPanels(crossSectionLoop, options)`: returns one panel descriptor for each rendered section frame.

`analysisOverlay(analysis, options)`: class-method form of `radarAnalysisOverlay(analysis, options)`.

`loopAnalysisOverlays(analysisLoop, options)`: returns one analysis overlay for each analyzed frame.

`torTracksLayer(renderedTracks, options)`: class-method form of `radarTorTracksLayer(renderedTracks, options)`.

`loopTorTracksLayers(torTracksLoop, options)`: returns one georeferenced TOR-track layer for each accumulated track frame.

`mapboxCoordinates`, `mapboxImageSource`, `mapboxCanvasSource`, `mapboxRasterLayer`, `mapboxLayerSpecs`, `mapboxSiteSource`, `mapboxSiteLayer`, `deckBitmapLayerProps`, `deckSiteScatterplotLayerProps`, and `webGpuTextureUpload`: class-method forms of the adapter helpers.

`mapView`, `fitMapViewToBounds`, `fitMapViewToLayer`, `panMapView`, `zoomMapView`, `mapTileCover`, and `radarLayerQuadMesh`: class-method forms of the Web Mercator camera, tile, and mesh helpers.

`synchronizeLoops(loops, options)`: class-method form of `synchronizeRadarLoops(loops, options)`.

`compositeLayers(layers, options)`: class-method form of `compositeRadarLayers(layers, options)`.

`compositeLoopSlot(multiLoop, index, options)`: composites one synchronized multi-site slot into a single georeferenced full-resolution RGBA texture.

`loadMultiSiteLoop(sites, options)`: loads several radar loops concurrently and returns a synchronized multi-loop.

`rerenderMultiSiteLoop(multiLoop, options)`: fast-rerenders every loop in a synchronized multi-loop for product, cut, range, smoothing, or canvas-size changes.

`pollMultiSiteLive(multiLoop, options)`: polls every site in a synchronized live loop and returns `{ status, updates, failures, multiLoop }`.

`sniffBytes(bytes)`: returns `{ format, size }` for an unknown byte buffer without rendering it. ZIP archives are identified as `mobile-archive-zip` before falling through to the worker format sniffer.

`isZipBytes(bytes)`, `parseZipDirectory(bytes, options)`, `extractZipEntries(bytes, options)`, and `extractMobileArchiveEntries(bytes, options)`: browser-side ZIP helpers. They parse a standard ZIP central directory, extract stored or deflated entries, filter metadata sidecars from mobile archives, and keep every selected radar sweep as a separate byte part. ZIP64 and encrypted entries are rejected by default.

`importBytesFrame(bytes, options)`: imports a `Uint8Array`/`ArrayBuffer` into the worker byte cache, decodes it with the supported-format router, and returns `{ frame, summary, elapsedMs, cacheHit }`.

`importFileFrame(file, options)`: reads a browser `File`/`Blob` and imports it as a radar frame. ZIP files are auto-detected, and `{ archive: true }` forces the mobile/research archive path.

`importMobileArchiveFrame(fileOrBytes, options)`: extracts a mobile/research radar ZIP archive, imports the selected sweep parts with `decode_supported_volume_parts`, caches the parts in the worker byte cache, and returns a single `merge: true` frame descriptor plus archive entry metadata.

`importFiles(files, options)`: imports several browser files.

`frameFromUrl(url, options)`: creates a CORS-enabled custom URL frame descriptor that can be passed to `frameMetadata`, `renderFrame`, or `loadImportedLoop`.

`loadImportedLoop(importedFrames, options)`: renders imported frame descriptors through the normal loop shape, so all existing quick-loop, layer, cross-section, analysis, and TOR-track helpers keep working. Frames returned by `importMobileArchiveFrame` should be reused like any other imported frame; product and tilt changes should go through `rerenderLoop` so archive parts are not re-extracted.

`loadInternationalLoop(providerId, siteId, options)`: plans recent frames from a browser-plannable international provider, then renders them through the imported-loop path. This slice supports SMHI Sweden (`providerId: "smhi"`), GeoSphere Austria (`providerId: "geosphere"`), SHMU Slovakia (`providerId: "shmu"`), DWD Germany (`providerId: "dwd"`), CHMI Czechia (`providerId: "chmi"`), JMA Japan (`providerId: "jma"`), EUMETNET ORD (`providerId: "ord"`), DMI Denmark (`providerId: "dmi"`), and FMI Finland (`providerId: "fmi"`), and attaches `loop.internationalSite` plus `loop.siteDescriptor` for map adapters.

`pollInternationalLive(loop, options)`: checks the provider's latest frame identity. Returns idle when unchanged, or renders and appends the new frame while reusing cached older frames. This slice supports SMHI, GeoSphere, SHMU, DWD, CHMI, JMA, ORD, DMI, and FMI.

`loadCommunityLoop(feed, options)`: plans recent frames from a community GR2A feed, then renders them through the imported-loop path. It preserves the normal loop shape and attaches `loop.communityFeed`.

`pollCommunityLive(loop, options)`: checks the feed's latest `dir.list` identity. Returns idle when unchanged, or renders and appends the new frame while reusing cached older frames.

`loadLoop(options)`: loads and renders a loop.

Options:

```js
{
  site: "KTLX",
  mode: "live",       // "live" or "recent"
  product: "REF",
  cut: 0,             // optional; toolbox auto-selects a displayable cut
  frameCount: 6,
  width: 768,
  height: 768,
  rangeKm: 230,
  smoothing: "native", // "native", "soften", "interpolated"
  stormDirDeg: 240,
  stormSpeedKt: 35,
  onProgress: (event) => {},
}
```

`rerenderLoop(loop, options)`: reuses the existing frame descriptors and worker caches for product, tilt, range, smoothing, or pixel-size changes. This is the fast path UI controls should use.

`pollLive(loop, options)`: checks the current live chunk fingerprint. Returns `{ status: "idle", loop }` if nothing changed or `{ status: "updated", loop }` when a new live frame was rendered.

`latestRealtimeFrame(site)`: returns a live frame descriptor with chunk URLs.

`archiveFramesForDate(site, date, options)`: lists one NEXRAD archive date and returns normal frame descriptors without downloading volume bytes.

`archiveLoopFramesForDate(site, date, options)`: returns a selected `archiveFrameWindow` for one date. Use `targetTime`, `selectedIndex`, and `frameCount` to match BowEcho-style event replay windows.

`loadArchiveLoop(site, date, options)`: lists a date, selects a frame window, and renders it through the normal loop shape. The returned loop carries `archiveWindow` and supports `rerenderLoop`, `warmLoop`, map texture helpers, analysis helpers, and playback like live loops.

`recentArchiveFrames(site, count, options)`: returns recent archive frame descriptors.

`fetchSpcEventDay(day, options)`, `selectEventRadarSites(begin, end, options)`, `eventArchiveFrameWindow(frames, options)`, and `eventArchivePlanForTrack(segment, options)`: class-method forms of the SPC event replay helpers. Use these with `archiveFramesForDate` when a UI lets the user click a tornado track and jump directly into the radar loop around that event.

`frameMetadata(frame, product)`: returns cut and displayability metadata.

`volumeDiagnostics(frame, options)`: returns decoded-volume diagnostics from the worker/WASM path, including scan mode, per-cut radial/gate geometry, moment coverage, RHI-like/PPI-like flags, source decode counters, and full-resolution 3D buffer estimates. It reuses the decoded-volume cache and has its own worker diagnostics cache.

`volumeDiagnosticsLoop(loop, options)`: runs `volumeDiagnostics` over an existing loop's frame descriptors with bounded concurrency and returns a quick-loopable diagnostics collection.

`renderFrame(frame, options)`: renders one frame to `{ frame, meta, rgba, imageData, width, height, elapsedMs, cacheHit }`.

`renderFrames(frames, options)`: renders many frames and skips frames that cannot display the requested product/cut.

`renderCrossSection(frame, options)`: reconstructs one vertical section from a decoded volume and returns `{ frame, meta, rgba, imageData, width, height, elapsedMs, cacheHit }`.

`renderCrossSections(frames, options)`: renders many vertical sections and skips frames that cannot produce the requested product.

`renderCrossSectionLoop(loop, options)`: reuses an existing radar loop's frame descriptors and decoded-volume cache to build a quick-loopable vertical section loop.

`renderTorTracksFrame(frame, options)`: renders one BowEcho-style low-level rotation-track grid from a decoded volume and returns `{ frame, meta, rgba, values, imageData, width, height, elapsedMs, cacheHit }`.

`renderTorTracksFrames(frames, options)`: renders many per-frame rotation-track grids and skips frames that cannot be decoded.

`renderTorTracksLoop(loop, options)`: reuses an existing radar loop's frame descriptors and decoded-volume cache to build a quick-loopable running-max TOR-track loop with TDS gates.

`analyzeFrame(frame, options)`: runs native storm-cell and rotation detection on one decoded volume and returns `{ cells, rotations, rotationTilts, counts, elapsedMs, cacheHit }`.

`analyzeFrames(frames, options)`: analyzes many frame descriptors and skips frames that cannot be decoded/analyzed.

`analyzeLoop(loop, options)`: reuses an existing loop's frame descriptors and decoded-volume cache to build a quick-loopable analysis loop.

`configureCache(options)`: adjusts worker cache limits for bytes, decoded volumes, metadata, PPI renders, cross-sections, native RHI panels, volume diagnostics, analyses, and TOR tracks. Defaults hold 24 decoded volumes and 160 rendered PPI frames, so ordinary 20-frame loops do not evict their own decoded volumes.

`warmFrames(frames, options)`: fetches and decodes frame descriptors into the worker cache without rendering new imagery. Pass `{ product, metadata, concurrency }` to also warm cut metadata.

`warmLoop(loop, options)`: convenience wrapper for `warmFrames(loop.frames, options)`. Call it after `loadLoop` when a generated UI expects fast product/tilt switching over a larger loop.

`stats()`: returns worker cache sizes and limits.

`clearCache()`: clears byte, decoded-volume, metadata, PPI render, cross-section render, native RHI render, diagnostics, analysis, and TOR-track caches.

## Session Controller

Use the session controller for normal websites where site, product, tilt, live polling, and playback controls all need to stay in sync.

```js
const toolbox = createRadarToolbox();
await toolbox.configureCache({ volumes: 32, renders: 220, metadata: 220 });

const session = createRadarSession(toolbox, {
  site: "KTLX",
  mode: "live",
  product: "REF",
  frameCount: 8,
  width: 768,
  height: 768,
  rangeKm: 230,
});

session.subscribe((state) => {
  for (const option of productSelect.options) {
    const product = state.capabilities.products.find((item) => item.id === option.value);
    option.disabled = Boolean(product && !product.available && product.id !== state.product);
  }
  productSelect.value = state.product;
  tiltSelect.replaceChildren(
    ...state.cuts.map((cut) => new Option(cut.label, cut.index, cut.selected, cut.selected)),
  );
  if (session.currentFrame()) drawFrameToCanvas(canvas, session.currentFrame());
});

await session.load({ warmProducts: ["DVEL", "SRV", "DSRV"] });
await session.setProduct("DVEL"); // rerenders existing frames; does not reload the loop
await session.setCut(1);           // rerenders existing frames at the requested displayable tilt
await session.warm(session.snapshot().capabilities.recommendedWarmProducts, { metadata: true });
session.play({ loopSpeedPercent: 150 });
await session.poll();              // appends the newest live frame when the chunk fingerprint changes
```

Important methods:

- `load(options)`: loads the initial live/recent loop.
- `setSite(site)`: loads a new site.
- `setProduct(product)`, `setCut(cut)`, and `setRenderOptions(options)`: rerender an existing loop when possible.
- `warm(products, options)`: warms decoded volumes and product metadata for fast product/tilt switching.
- `poll(options)`: uses `pollLive` and preserves the loop/timeline state.
- `play`, `stop`, `nextFrame`, `previousFrame`, `latestFrame`, and `setPlaybackSpeed`: VCR controls for quick looping.
- `cutChoices()`, `timeline()`, `currentFrame()`, and `textureLayer()`: UI/readout helpers for controls and map layers.
- `snapshot().capabilities`: product availability, supported cut lists, recommended warm products, and feature gates derived from the current loop metadata.

## Map Renderer Contract

Renderers should treat the SDK output as a texture plus georeference, not as a pre-scaled map image.

```js
const layer = toolbox.textureLayer(loop.frame(loop.length - 1), {
  site: loop.site,
});

// Upload this to WebGL/wgpu, draw it to a canvas, or pass it to a map image layer.
const { rgba, width, height } = layer.image;

// Four-corner placement order is NW, NE, SE, SW.
const coordinates = layer.quad.map((corner) => [corner.lon, corner.lat]);

// Mapbox/deck.gl marker source:
const sites = toolbox.sitesGeoJson();
```

Texture descriptors use a north-up radar-local tangent plane. Pixel X maps to east kilometers, pixel Y maps to north kilometers, and corners are calculated from the same full-resolution render viewport used by the worker.

## Supported Byte Import

Use this for drag/drop local radar files, custom CORS URLs, or provider integrations that already have radar bytes. The browser worker uses the native toolkit's supported-format router, so imported bytes can be NEXRAD Level II, ODIM_H5, CfRadial 1.x classic netCDF, DORADE sweep, or JMA polar radar GRIB2 tar.

```js
const imported = await toolbox.importFileFrame(file);
const loop = await toolbox.loadImportedLoop([imported], {
  product: "REF",
  width: 768,
  height: 768,
  rangeKm: 230,
});

drawFrameToCanvas(canvas, loop.frame(0));
```

For provider code that receives bytes directly:

```js
const sniffed = await toolbox.sniffBytes(bytes);
const imported = await toolbox.importBytesFrame(bytes, {
  id: "provider-frame-001",
  fileName: "provider-frame.odim.h5",
  source: "provider-bytes",
});
```

For CORS-enabled custom URLs:

```js
const frame = toolbox.frameFromUrl("https://example.com/radar.odim.h5", {
  format: "odim-h5",
});
const rendered = await toolbox.renderFrame(frame, {
  product: "REF",
  width: 768,
  height: 768,
});
```

`importBytesFrame` stores the byte buffer and decoded volume in the worker caches under a stable byte fingerprint. After import, use the returned `frame` descriptor instead of resending the bytes for every product/tilt/range change. If a UI calls `clearCache`, local imported frames must be imported again before rendering.

Imported frames carry decoded `site`, `volumeTime`, `format`, and `siteLocation` metadata when the source format provides it. Map helpers use decoded site coordinates, so ODIM/CfRadial/DORADE/JMA frames do not need to appear in the built-in NEXRAD site catalog.

## Cache And Warm Path

The worker keeps separate caches for raw bytes, decoded volumes, product metadata, PPI renders, cross-sections, native RHI panels, analysis results, and TOR tracks. The defaults are intentionally larger than the maximum built-in `frameCount` so a 20-frame loop can stay hot while the user flips products or tilts.

```js
const toolbox = createRadarToolbox();
await toolbox.configureCache({
  bytes: 40,
  volumes: 32,
  renders: 220,
  nativeRhi: 96,
});

const loop = await toolbox.loadLoop({
  site: "KTLX",
  mode: "live",
  product: "REF",
  frameCount: 12,
  width: 768,
  height: 768,
});

await toolbox.warmLoop(loop, {
  product: "DVEL",
  metadata: true,
  concurrency: 4,
});

const dvel = await toolbox.rerenderLoop(loop, {
  product: "DVEL",
  cut: 0,
});

const stats = await toolbox.stats();
```

Use the returned `cacheHit` flags and `stats().limits` in performance panels. Do not call `clearCache` as part of normal product, tilt, range, or playback controls.

## Map And GPU Adapters

Use these helpers when a generated UI wants Mapbox, MapLibre, deck.gl, WebGL, WebGPU, or custom-canvas display without rewriting coordinate and texture glue.

```js
const frame = loop.frame(loop.length - 1);
const layer = toolbox.textureLayer(frame, { site: loop.site });

drawRadarLayerToCanvas(radarCanvas, layer);

const mapboxSource = toolbox.mapboxCanvasSource(layer, radarCanvas, {
  animate: false,
});
const mapboxLayer = toolbox.mapboxRasterLayer(layer, {
  sourceId: "radar-source",
  layerId: "radar-layer",
});

const deckProps = toolbox.deckBitmapLayerProps(layer, {
  id: "radar-bitmap",
});

const gpuUpload = toolbox.webGpuTextureUpload(layer);
```

Mapbox/MapLibre coordinate order is NW, NE, SE, SW, matching image/canvas source corner order. `mapboxRadarImageSource` requires a URL, blob URL, or data URL. For live client-side radar, prefer `drawRadarLayerToCanvas` plus `mapboxRadarCanvasSource` so the browser never has to encode a PNG between frames.

deck.gl bitmap bounds default to four corners in `[SW, NW, NE, SE]` order, matching deck.gl's four-corner `BitmapLayer` contract. Texture filters default to `nearest` so radar pixels are not smoothed by the adapter.

`webGpuRadarTextureUpload` returns:

- `rgba`: the exact `Uint8ClampedArray` from the rendered radar layer.
- `createTexture`: size/format/usage labels for a GPU texture.
- `writeTexture`: data, `bytesPerRow`, `rowsPerImage`, and size for `queue.writeTexture`-style upload code.
- `georeference`: site, quad, lon/lat bounds, and Web Mercator bounds for placing the texture.

Site helpers:

```js
map.addSource("radar-sites", toolbox.mapboxSiteSource());
map.addLayer(toolbox.mapboxSiteLayer({ sourceId: "radar-sites" }));

const siteScatterProps = toolbox.deckSiteScatterplotLayerProps();
```

## Multi-Site Composites

Use this when a generated map UI wants one merged radar texture rather than several independent site layers. The composite path does not re-fetch or re-decode radar files; it consumes existing full-resolution `radarTextureLayer` / `loopTextureLayers` output.

```js
const multiLoop = await toolbox.loadMultiSiteLoop(["KTLX", "KFWS"], {
  product: "REF",
  frameCount: 1,
  width: 512,
  height: 512,
  rangeKm: 230,
});

const composite = toolbox.compositeLoopSlot(multiLoop, multiLoop.length - 1, {
  width: 1024,
  height: 1024,
  blendMode: "source-over",
});

drawCompositeToCanvas(canvas, composite);
map.addSource("radar-composite", toolbox.mapboxCanvasSource(composite, canvas));
```

`compositeRadarLayers(layers, options)` accepts one or more `radarTextureLayer`, `radarTorTracksLayer`, composite, or rendered-frame inputs and returns a `bowecho-radar-composite-v1` map layer with `image.rgba`, `bounds`, `quad`, `mercatorBounds`, source-layer summaries, and pixel counts. It maps output pixels back into each radar's local km/pixel grid and samples nearest-neighbor so radar pixels stay crisp.

If `width`/`height` are omitted, the SDK infers an output grid from the finest source-layer km/pixel spacing and refuses to downscale beyond `maxWidth` / `maxHeight` unless `allowDownscale: true` is explicitly set.

## Multi-Site Sync

Use this for side-by-side radar dashboards or map renderers that need several radar textures on one timeline.

```js
const multiLoop = await toolbox.loadMultiSiteLoop(["KTLX", "KFWS", "KINX"], {
  mode: "live",
  product: "REF",
  frameCount: 3,
  width: 512,
  height: 512,
  rangeKm: 230,
  maxSkewMs: 6 * 60_000,
});

const slot = multiLoop.slot(multiLoop.length - 1);
const ktlxFrame = multiLoop.frame("KTLX", multiLoop.length - 1);
const mapLayers = multiLoop.textureLayers(multiLoop.length - 1);
```

The synchronized object has:

- `sites`: ordered site IDs.
- `slots`: synchronized timeline entries.
- `frame(site, index)`: nearest rendered frame for a site at a timeline index.
- `frames(index)`: per-site frame entries including `skewMs` and `missing`.
- `textureLayers(index)`: georeferenced full-resolution texture descriptors for every present site frame.
- `nearestTimeIndex(time)`: helper for scrubbers and external timeline sync.

`maxSkewMs` controls how far apart site volume times can be before a site is marked missing for that slot. When frames do not have parseable times, the sync object falls back to positional indexing.

## Cross-Section Panels

Use this for RHI-style vertical sections reconstructed from a Level II volume. Endpoints can be radar-local offsets in kilometers or lon/lat points from a map drag.

```js
const sectionLoop = await toolbox.renderCrossSectionLoop(loop, {
  site: loop.site,
  product: "REF",
  start: { eastKm: -120, northKm: -35 },
  end: { eastKm: 120, northKm: 35 },
  width: 768,
  height: 288,
  topKm: 18,
});

const section = sectionLoop.section(sectionLoop.length - 1);
drawCrossSectionToCanvas(sectionCanvas, section);

const panel = sectionLoop.panel(sectionLoop.length - 1);
const { rgba, width, height } = panel.image;
const pathForMap = panel.geometry.coordinates;
```

The section renderer uses the same browser worker/WASM decoded-volume cache as PPI rendering. REF/CREF use reflectivity columns, VEL/DVEL/SRV/DSRV use the dealiased velocity section path, and SW/ZDR/CC/PHI/KDP use the native moment section path with the matching color family. Custom palettes can be passed through the same `palette` or `paletteText` options used by PPI rendering.

Cross-section panels preserve exact backing pixels: `rgba.byteLength === width * height * 4`. Draw with `drawCrossSectionToCanvas` or upload the returned RGBA buffer directly to WebGL/wgpu.

## Native RHI And Mobile Scans

Use this for actual native RHI-like sweeps from mobile/research radar files or archives. Unlike reconstructed cross sections, `renderNativeRhi` renders a decoded RHI cut directly through the native toolkit RHI path.

```js
const imported = await toolbox.importFileFrame(file, {
  archive: file.name.toLowerCase().endsWith(".zip"),
});

const diagnostics = await toolbox.volumeDiagnostics(imported.frame);
const rhiCut = diagnostics.cuts.find((cut) => cut.isRhiLike);

const panel = await toolbox.renderNativeRhi(imported.frame, {
  product: "REF",
  cut: rhiCut?.index,
});

drawNativeRhiToCanvas(canvas, panel);
```

If `width` or `height` are omitted, the renderer uses the native gate count by native radial count for that cut. Passing smaller dimensions without `allowDownscale: true` throws instead of silently reducing radar resolution. `renderNativeRhiFrames` and `renderNativeRhiLoop` provide the same quick-loop shape for multiple imported/mobile frames.

Supported native RHI products are REF, VEL/BV, SW, ZDR, CC/RHO, PHI, and KDP. Derived products such as DVEL, SRV, CREF, analysis overlays, and TOR tracks still use their dedicated PPI/volume paths.

## TOR Tracks And TDS

Use this for BowEcho-style low-level rotation tracks and tornado-debris-signature flags. The browser worker computes one frame's low-level cyclonic azimuthal-shear grid in WASM, caches it by source frame and grid spec, and `renderTorTracksLoop` builds a running-max accumulation for loop scrubbing.

```js
const trackLoop = await toolbox.renderTorTracksLoop(loop, {
  site: loop.site,
  halfExtentKm: 150,
  cellKm: 0.5,
});

const tracks = trackLoop.frame(trackLoop.length - 1);
drawTorTracksToCanvas(trackCanvas, tracks);

const layer = trackLoop.layer(trackLoop.length - 1);
const tdsSource = layer.tds.geojson;
```

The default grid matches the native rotation-track product: +/-150 km around the radar at 0.5 km cells, yielding a 600x600 full-resolution RGBA texture plus a `Float32Array` of raw shear values in `1e-3/s`. The SDK does not downscale this output; if a UI wants a coarser grid, it must ask for a larger `cellKm` explicitly.

`radarTorTracksLayer` returns a map-ready layer with the same four-corner placement contract as `radarTextureLayer`, plus `grid`, `values`, `valueRange`, and `tds.geojson`. TDS features carry `eastKm`, `northKm`, `cc`, `dbz`, `frameIndex`, and Web Mercator coordinates in `properties`.

## Analysis Overlays

Use this for native BowEcho storm-cell and rotation overlays. Analysis runs in the browser worker/WASM path against the same decoded volume cache as rendering.

```js
const frame = loop.frame(loop.length - 1);
const analysis = await toolbox.analyzeFrame(frame.frame, { site: loop.site });
const overlay = toolbox.analysisOverlay(analysis, { site: loop.site });

// Mapbox/deck.gl source:
const source = overlay.geojson;

// Canvas/WebGL placement:
for (const feature of overlay.geojson.features) {
  const { eastKm, northKm, kind } = feature.properties;
}
```

`analysis.cells` contains enhanced-watershed storm cells with `eastKm`, `northKm`, `maxDbz`, `areaKm2`, `eqRadiusKm`, `mass`, and `hlevelDbz`.

`analysis.rotations` contains vertically-continuous rotation detections with `eastKm`, `northKm`, `azimuthDeg`, `rangeKm`, `vrotMps`, `gateToGateDvMps`, `rank`, `depthTilts`, `depthKm`, `baseElevationDeg`, and `strength` (`weak`, `moderate`, `mesocyclone`, or `tvs`).

`radarAnalysisOverlay` returns `overlay.geojson` as a `FeatureCollection` with both cell and rotation features. Each feature carries radar-local offsets and Web Mercator coordinates in `properties`, so map renderers and canvas renderers can use the same analysis object.

## Palette Import/Export

The browser SDK can parse, validate, bind, and export GR-style palettes:

```js
const palette = parseGrPalette(fileText, { name: "My Velocity Palette" });
const binding = paletteBinding(palette, "DVEL");
const palText = exportGrPalette(palette);
```

Parsed palettes have:

- `type: "bowecho-palette-v1"`
- optional `id`, `createdAt`, `updatedAt`, and `sourceName` for persisted user libraries
- `productCode`: GR-style code such as `BR`, `BV`, `CC`, `ZDR`, `PHI`, or `KDP`
- `family`: SDK color family such as `reflectivity` or `velocity`
- `units`, `legendStep`, `rangeFolded`
- `stops`: sorted value/color rows with optional `endColor` and `solid`
- `warnings`: non-fatal parse warnings with source line numbers

For user palette pickers/editors, use the bundled store instead of writing custom localStorage glue:

```js
const store = createPaletteStore();
const saved = store.importText(fileText, {
  name: "My Reflectivity Palette",
  fileName: "my-ref.pal",
});

const palettes = store.list();
const preview = palettePreviewCss(saved);
const exported = store.exportText(saved.id);
```

`createPaletteStore` uses `localStorage` in browsers and a memory store elsewhere. Pass `{ key, storage }` to isolate an app, swap in IndexedDB/session storage wrappers, or test with a fake storage adapter. Store entries remain normal `bowecho-palette-v1` objects, so they can be passed directly to `rerenderLoop`.

Pass a parsed palette to `loadLoop`, `rerenderLoop`, `renderFrame`, `renderCrossSection`, `renderCrossSectionLoop`, `loadMultiSiteLoop`, or `rerenderMultiSiteLoop` to apply it through the WASM render path:

```js
const palette = parseGrPalette(fileText, { name: "My Reflectivity Palette" });
const loop = await toolbox.loadLoop({
  site: "KTLX",
  product: "REF",
  palette,
  width: 768,
  height: 768,
});
```

The worker cache key includes the palette family and exported `.pal` text, so default and custom renders stay distinct while still reusing decoded volumes.

## Package Contract

The browser folder is also a package-shaped SDK surface:

```text
web/package.json
web/radar-toolbox.js
web/radar-toolbox.d.ts
web/worker.js
web/pkg/
```

Run the zero-dependency contract test from `web`:

```powershell
npm test
```

The test imports the actual SDK module and verifies catalog shape, provider/format catalogs, profiler filtering, NEXRAD date archive planning/replay, palette parsing/export/store persistence, renderer texture metadata, Mapbox/deck/WebGPU adapter specs, supported-format byte import, mobile archive ZIP grouping, cross-section panel metadata, native RHI no-downscale defaults, volume diagnostics and 3D buffer estimates, analysis overlay GeoJSON, TOR-track/TDS layer metadata, coordinate helpers, fake-worker rendering, multi-site sync, cache configure/warm methods, and no-downscale pixel counts.

## Loop Shape

`loadLoop` and `rerenderLoop` return:

```js
{
  site,
  mode,
  product,
  cut,
  frames,          // source frame descriptors
  renderedFrames,  // rendered ImageData/RGBA results
  meta,            // metadata for the selected product
  renderOptions,
  length,
  frame(index),    // returns one rendered frame
}
```

## Performance Rules

Use `loadLoop` only when the site, mode, frame count expansion, or manual reload changes the source data.

Use `importBytesFrame`, `importFileFrame`, `importMobileArchiveFrame`, or `frameFromUrl` when a provider supplies bytes, a ZIP archive, or a CORS-enabled custom URL, then use `loadImportedLoop` to enter the normal loop shape.

Use `rerenderLoop` for product, tilt, range, smoothing, and canvas-size changes.

Use `renderCrossSectionLoop` after `loadLoop` when a UI needs vertical sections over the same loop frames.

Use `renderNativeRhi`, `renderNativeRhiFrames`, or `renderNativeRhiLoop` for actual RHI/mobile-scan cuts from imported or provider-supplied RHI frames. Leave `width` and `height` unset to preserve native gate/radial resolution.

Use `volumeDiagnostics` / `volumeDiagnosticsLoop` after `loadLoop`, imported loops, or cache warming when a UI needs scan-mode badges, RHI/mobile-scan branching, data-quality panels, or full-resolution 3D buffer planning without re-decoding.

Use `analyzeLoop` after `loadLoop` when a UI needs storm-cell or rotation overlays over the same loop frames.

Use `renderTorTracksLoop` after `loadLoop` when a UI needs accumulated rotation tracks or TDS markers over the same loop frames.

Use `compositeLoopSlot` or `compositeRadarLayers` when a map needs one merged multi-radar texture instead of stacked independent image layers.

Use `configureCache` if a UI allows larger loops, and call `warmLoop` after the initial load when product/tilt controls should feel instant.

Use `pollLive` for auto-refresh. It avoids rerendering when the current live chunk fingerprint is unchanged.

Keep canvas backing pixels equal to the desired render size. Do not render at one size and CSS-scale it to another size.
