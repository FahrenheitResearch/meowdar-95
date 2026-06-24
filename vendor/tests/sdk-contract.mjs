import assert from "node:assert/strict";
import {
  COMMUNITY_RADAR_FEEDS,
  COMMUNITY_RADAR_MARKERS,
  CUSTOM_POLL_NO_MARKER_LAT_E6,
  GLOBAL_RADAR_PROVIDERS,
  INTERNATIONAL_RADAR_SITES,
  PRODUCT_CATALOG,
  FRAME_PROVIDER_CATALOG,
  RADAR_SITES,
  SUPPORTED_BYTE_FORMATS,
  SUPPORTED_ARCHIVE_FORMATS,
  archiveFrameWindow,
  capabilityHintsFromMetadata,
  colorFamilies,
  colorFamilyForProduct,
  compositeRadarLayers,
  compositeSynchronizedRadarLoopSlot,
  createPaletteFromStops,
  createPaletteStore,
  createRadarSession,
  createRadarToolbox,
  chmiFramePlanFromProductFiles,
  chmiFramePlansFromProductFiles,
  chmiProductCatalogUrl,
  chmiProductHdf5ListingUrl,
  chmiSiteCatalogUrl,
  chmiSitesRootUrl,
  jmaCandidateStamps,
  jmaFramePlanFromStamp,
  jmaRadarBaseUrl,
  jmaTarUrl,
  ordBucketBaseUrl,
  ordFramePlanFromKeys,
  ordFramePlansFromKeys,
  ordHourListingUrl,
  ordHourPrefix,
  ordObjectKinds,
  parseOrdObjectKey,
  dmiFramePlanFromItems,
  dmiFramePlansFromItems,
  dmiVolumeItemsUrl,
  dwdFramePlanFromProductSweeps,
  dwdFramePlansFromProductSweeps,
  dwdProductCatalogUrl,
  dwdProductHdf5CatalogUrl,
  dwdProductStationCatalogUrl,
  dwdProductSweepListingUrl,
  dwdSitesRootUrl,
  estimatedTornadoTrackEndTime,
  eventArchiveFrameWindow,
  eventArchivePlanForTrack,
  fmiCatalogListingUrl,
  fmiDatePrefix,
  fmiFramePlanFromListing,
  fmiFramePlansFromListing,
  fmiRadarVolumeListingUrl,
  geosphereFramePlanFromListing,
  geosphereFramePlansFromListing,
  geosphereStartAfterKey,
  geosphereVolumeListingUrl,
  smhiAreaCatalogUrl,
  smhiDatedQcvolUrl,
  smhiFramePlanFromCatalog,
  smhiFramePlansFromCatalog,
  smhiQcvolCatalogUrl,
  deckRadarBitmapLayerProps,
  cutChoicesFromMetadata,
  deckRadarSiteScatterplotLayerProps,
  drawNativeRhiToCanvas,
  exportGrPalette,
  familyForPaletteProductCode,
  fitMapViewToLayer,
  frameProviders,
  extractMobileArchiveEntries,
  extractZipEntries,
  fetchCommunityDirList,
  fetchSpcEventDay,
  fetchSpcOutlook,
  fetchSpcOutlooks,
  globalRadarSites,
  globalRadarSitesGeoJson,
  internationalRadarSites,
  internationalFrameFromPlan,
  internationalRadarProvider,
  internationalRadarSite,
  isZipBytes,
  latestInternationalFrame,
  latestInternationalFramePlan,
  latestCommunityFrame,
  loopTimeline,
  lonLatToWebMercator,
  lonLatToWorldPixel,
  mapTileCover,
  mapboxGlobalRadarSiteSource,
  mapboxRadarCanvasSource,
  mapboxRadarCoordinates,
  mapboxRadarImageSource,
  mapboxRadarLayerSpecs,
  mapboxRadarRasterLayer,
  mapboxRadarSiteLayer,
  mapboxRadarSiteSource,
  paletteBinding,
  paletteProductCodeForFamily,
  palettePreviewCss,
  parseGrPalette,
  parseAutoIndexListing,
  productCapability,
  productChoicesFromMetadata,
  productDescriptor,
  radarAnalysisOverlay,
  radarLayerQuadMesh,
  nearestRadarSite,
  nexradArchiveDatePrefix,
  nexradArchiveListingUrl,
  parseFmiVolumeListing,
  parseGeosphereVolumeListing,
  parseNexradArchiveListing,
  parseSpcOutlook,
  parseSpcReportsCombined,
  parseSpcTornadoSegments,
  radarOffsetFromLonLat,
  radarOffsetToLonLat,
  radarCrossSectionPanel,
  radarPixelToLonLat,
  radarSitesGeoJson,
  radarSiteSourceSummary,
  radarSourceCatalog,
  radarTorTracksLayer,
  radarTextureLayer,
  serializePaletteLibrary,
  deserializePaletteLibrary,
  synchronizeRadarLoops,
  supportedByteFormats,
  webGpuRadarTextureUpload,
  webMercatorToLonLat,
  worldPixelSize,
  worldPixelToLonLat,
  normalizeMapView,
  panMapView,
  zoomMapView,
  communityFeedFrameFromEntry,
  customPollEntryLatLon,
  customPollEntryLabel,
  customPollLinkFeed,
  customPollLinksAsFeeds,
  customPollLinksFromGis,
  customPollLinksGeoJson,
  customPollMarkers,
  communityRadarFeed,
  communityRadarFeeds,
  communityRadarMarkers,
  deckGlobalRadarSiteScatterplotLayerProps,
  newestCommunityDirListEntry,
  normalizeCustomPollLink,
  normalizeCustomPollUrl,
  parseCommunityDirList,
  parseCustomPollMarkerInputs,
  parseCustomRadarGis,
  parseChmiFileListing,
  parseGrLevel2CfgSites,
  parseDmiVolumeItems,
  parseDwdSweepListing,
  parseSmhiAreaCatalog,
  parseSmhiQcvolCatalog,
  parseShmuDateListing,
  parseShmuFileListing,
  parseS3StyleListing,
  parseZipDirectory,
  recentInternationalFrames,
  recentInternationalFramePlans,
  recentCommunityFrames,
  pollUrlName,
  pollUrlsMatch,
  s3StyleListingUrl,
  selectEventRadarSites,
  shmuFramePlanFromProductFiles,
  shmuFramePlansFromProductFiles,
  shmuProductCatalogUrl,
  shmuProductDateListingUrl,
  shmuSiteCatalogUrl,
  shmuVolumeRootUrl,
  spcActualTornadoesUrl,
  spcConvectiveDate,
  spcOutlookArchiveUrls,
  spcOutlookFeatureCollection,
  spcOutlookKinds,
  spcOutlookLiveUrls,
  spcOutlookUrls,
  spcReportMagnitudeLabel,
  spcReportTimeUtc,
  spcReportsUrls,
  spcWcmTornadoYearUrl,
  supportedArchiveFormats,
  tornadoSegmentsFromReports,
  upsertCustomPollLink,
} from "../radar-toolbox.js";

function storedZip(entries) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  const push16 = (target, value) => {
    target.push(value & 0xff, (value >>> 8) & 0xff);
  };
  const push32 = (target, value) => {
    target.push(value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff);
  };
  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const data = entry.bytes instanceof Uint8Array ? entry.bytes : new Uint8Array(entry.bytes);
    const local = [];
    push32(local, 0x04034b50);
    push16(local, 20);
    push16(local, 0);
    push16(local, 0);
    push16(local, 0);
    push16(local, 0);
    push32(local, 0);
    push32(local, data.byteLength);
    push32(local, data.byteLength);
    push16(local, name.byteLength);
    push16(local, 0);
    local.push(...name, ...data);
    chunks.push(new Uint8Array(local));

    const dir = [];
    push32(dir, 0x02014b50);
    push16(dir, 20);
    push16(dir, 20);
    push16(dir, 0);
    push16(dir, 0);
    push16(dir, 0);
    push16(dir, 0);
    push32(dir, 0);
    push32(dir, data.byteLength);
    push32(dir, data.byteLength);
    push16(dir, name.byteLength);
    push16(dir, 0);
    push16(dir, 0);
    push16(dir, 0);
    push16(dir, 0);
    push32(dir, 0);
    push32(dir, offset);
    dir.push(...name);
    central.push(new Uint8Array(dir));
    offset += local.length;
  }
  const centralOffset = offset;
  const centralSize = central.reduce((sum, item) => sum + item.byteLength, 0);
  const eocd = [];
  push32(eocd, 0x06054b50);
  push16(eocd, 0);
  push16(eocd, 0);
  push16(eocd, entries.length);
  push16(eocd, entries.length);
  push32(eocd, centralSize);
  push32(eocd, centralOffset);
  push16(eocd, 0);
  const all = [...chunks, ...central, new Uint8Array(eocd)];
  const total = all.reduce((sum, item) => sum + item.byteLength, 0);
  const out = new Uint8Array(total);
  let cursor = 0;
  for (const chunk of all) {
    out.set(chunk, cursor);
    cursor += chunk.byteLength;
  }
  return out;
}

const productIds = PRODUCT_CATALOG.map((product) => product.id);
assert.equal(PRODUCT_CATALOG.length, 21, "product catalog should expose every browser-ready product");
assert.deepEqual(productIds.slice(0, 6), ["REF", "VEL", "DVEL", "SRV", "DSRV", "SW"]);
assert.ok(productIds.includes("AZSHR"), "azimuthal shear should be exposed");
assert.ok(productIds.includes("DIV"), "radial divergence should be exposed");
assert.equal(PRODUCT_CATALOG.find((product) => product.id === "DVEL").colorFamily, "velocity");
assert.equal(PRODUCT_CATALOG.find((product) => product.id === "KDP").colorFamily, "specificDifferentialPhase");
assert.equal(productDescriptor("dvel").name, "Dealiased Velocity");
assert.equal(productDescriptor("NOPE"), null);
assert.equal(productCapability("DSRV").source, "VEL");
assert.equal(productCapability("CREF").scope, "volume");
assert.equal(productCapability("CREF").cutIndependent, true);
assert.ok(SUPPORTED_BYTE_FORMATS.some((format) => format.id === "odim-h5"));
assert.ok(SUPPORTED_BYTE_FORMATS.some((format) => format.id === "cfradial-1"));
assert.ok(SUPPORTED_ARCHIVE_FORMATS.some((format) => format.id === "mobile-archive-zip"));
assert.ok(FRAME_PROVIDER_CATALOG.some((provider) => provider.id === "browser-import"));
assert.ok(frameProviders().find((provider) => provider.id === "nexrad-public").modes.includes("archive-date"));
assert.ok(frameProviders().find((provider) => provider.id === "custom-url").formats.includes("jma-grib2-tar"));
assert.ok(frameProviders().find((provider) => provider.id === "browser-import").formats.includes("mobile-archive-zip"));
assert.ok(frameProviders().find((provider) => provider.id === "community-gr2a").modes.includes("community-live"));
assert.ok(frameProviders().find((provider) => provider.id === "international-smhi").formats.includes("odim-h5"));
assert.ok(frameProviders().find((provider) => provider.id === "international-geosphere").modes.includes("international-recent"));
assert.ok(frameProviders().find((provider) => provider.id === "international-shmu").modes.includes("international-recent"));
assert.ok(frameProviders().find((provider) => provider.id === "international-dwd").modes.includes("international-recent"));
assert.ok(frameProviders().find((provider) => provider.id === "international-chmi").modes.includes("international-recent"));
assert.ok(frameProviders().find((provider) => provider.id === "international-jma").formats.includes("jma-grib2-tar"));
assert.ok(frameProviders().find((provider) => provider.id === "international-ord").modes.includes("international-recent"));
assert.ok(frameProviders().find((provider) => provider.id === "international-dmi").formats.includes("odim-h5"));
assert.ok(frameProviders().find((provider) => provider.id === "international-fmi").modes.includes("international-recent"));
assert.equal(supportedByteFormats().find((format) => format.id === "nexrad-level2").kind, "volume");
assert.equal(supportedArchiveFormats().find((format) => format.id === "mobile-archive-zip").kind, "archive");
assert.equal(GLOBAL_RADAR_PROVIDERS.length, 11);
assert.equal(INTERNATIONAL_RADAR_SITES.length, 147);
assert.equal(COMMUNITY_RADAR_FEEDS.length, 19);
assert.equal(COMMUNITY_RADAR_MARKERS.length, 12);
assert.equal(radarSourceCatalog({ query: "JMA" })[0].id, "jma");
assert.equal(internationalRadarSites({ providerId: "jma" }).length, 20);
assert.ok(internationalRadarSites({ country: "Norway" }).length >= 10);
assert.equal(internationalRadarProvider("smhi").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("smhi").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("geosphere").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("geosphere").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("shmu").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("shmu").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("shmu").capabilities.mergeParts, true);
assert.equal(internationalRadarProvider("dwd").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("dwd").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("dwd").capabilities.mergeParts, true);
assert.equal(internationalRadarProvider("chmi").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("chmi").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("chmi").capabilities.mergeParts, true);
assert.equal(internationalRadarProvider("jma").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("jma").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("jma").capabilities.siteFilteredDecode, true);
assert.equal(internationalRadarProvider("ord").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("ord").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("ord").capabilities.mergeParts, "mixed");
assert.equal(internationalRadarProvider("dmi").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("dmi").capabilities.recentPlan, true);
assert.equal(internationalRadarProvider("fmi").capabilities.clientSideReady, true);
assert.equal(internationalRadarProvider("fmi").capabilities.recentPlan, true);
assert.equal(internationalRadarSite("smhi", "angelholm").id, "angelholm");
assert.equal(internationalRadarSite("geosphere", "hochficht").label, "Hochficht");
assert.equal(internationalRadarSite("shmu", "skjav").id, "skjav");
assert.equal(internationalRadarSite("dwd", "asb").id, "asb");
assert.equal(internationalRadarSite("chmi", "brd").label, "Brdy-Praha");
assert.equal(internationalRadarSite("jma", "ITOK").label, "ITOK (RS47937)");
assert.equal(internationalRadarSite("jma", "ITOK").siteFilteredDecode, true);
assert.equal(internationalRadarSite("ord", "nlhrw").label, "Herwijnen (Netherlands)");
assert.equal(internationalRadarSite("dmi", "06177").label, "Stevns");
assert.equal(internationalRadarSite("dmi", "06177").id, "06177", "DMI station ids must keep leading zeros");
assert.equal(internationalRadarSite("fmi", "fianj").label, "Anjalankoski");
assert.equal(smhiAreaCatalogUrl(), "https://opendata-download-radar.smhi.se/api/version/latest");
assert.equal(smhiQcvolCatalogUrl("angelholm"), "https://opendata-download-radar.smhi.se/api/version/latest/area/angelholm/product/qcvol");
assert.equal(smhiDatedQcvolUrl("angelholm", "radar_angelholm_qcvol_202606120635"), "https://opendata-download-radar.smhi.se/api/version/latest/area/angelholm/product/qcvol/2026/06/12/radar_angelholm_qcvol_202606120635.h5");
assert.equal(geosphereStartAfterKey("2026-06-12T18:35:00Z", 12), "resources/radar_volumen_hochficht-v1-5min/filelisting/WXRHOF_202606120635.hdf");
assert.equal(geosphereVolumeListingUrl({ now: "2026-06-12T18:35:00Z", lookbackHours: 12 }), "https://public.hub.geosphere.at/datahub/?list-type=2&prefix=resources%2Fradar_volumen_hochficht-v1-5min%2Ffilelisting%2F&start-after=resources%2Fradar_volumen_hochficht-v1-5min%2Ffilelisting%2FWXRHOF_202606120635.hdf&max-keys=1000");
assert.equal(shmuVolumeRootUrl(), "https://opendata.shmu.sk/meteorology/weather/radar/volume");
assert.equal(shmuSiteCatalogUrl("skjav"), "https://opendata.shmu.sk/meteorology/weather/radar/volume/skjav/");
assert.equal(shmuProductCatalogUrl("skjav", "dBZ"), "https://opendata.shmu.sk/meteorology/weather/radar/volume/skjav/dBZ/");
assert.equal(shmuProductDateListingUrl("skjav", "V", "20260612"), "https://opendata.shmu.sk/meteorology/weather/radar/volume/skjav/V/20260612/");
assert.equal(dwdSitesRootUrl(), "https://opendata.dwd.de/weather/radar/sites");
assert.equal(dwdProductCatalogUrl("sweep_vol_z"), "https://opendata.dwd.de/weather/radar/sites/sweep_vol_z/");
assert.equal(dwdProductStationCatalogUrl("asb", "sweep_vol_z"), "https://opendata.dwd.de/weather/radar/sites/sweep_vol_z/asb/");
assert.equal(dwdProductHdf5CatalogUrl("asb", "sweep_vol_v"), "https://opendata.dwd.de/weather/radar/sites/sweep_vol_v/asb/hdf5/");
assert.equal(dwdProductSweepListingUrl("asb", "sweep_vol_v", "hdf5/filter_polarimetric"), "https://opendata.dwd.de/weather/radar/sites/sweep_vol_v/asb/hdf5/filter_polarimetric/");
assert.equal(chmiSitesRootUrl(), "https://opendata.chmi.cz/meteorology/weather/radar/sites");
assert.equal(chmiSiteCatalogUrl("brd"), "https://opendata.chmi.cz/meteorology/weather/radar/sites/brd/");
assert.equal(chmiProductCatalogUrl("brd", "vol_z"), "https://opendata.chmi.cz/meteorology/weather/radar/sites/brd/vol_z/");
assert.equal(chmiProductHdf5ListingUrl("brd", "vol_v"), "https://opendata.chmi.cz/meteorology/weather/radar/sites/brd/vol_v/hdf5/");
assert.equal(jmaRadarBaseUrl(), "https://pawr.nict.go.jp/jmadata/JMA-PolarCoordsRadar");
assert.equal(jmaTarUrl("N5", "20260612064000"), "https://pawr.nict.go.jp/jmadata/JMA-PolarCoordsRadar/2026/06/12/Z__C_RJTD_20260612064000_RDR_JMAGPV_N5_grib2.tar");
assert.equal(jmaTarUrl("N6", "20260612064000"), "https://pawr.nict.go.jp/jmadata/JMA-PolarCoordsRadar/2026/06/12/Z__C_RJTD_20260612064000_RDR_JMAGPV_N6_grib2.tar");
assert.deepEqual(jmaCandidateStamps("2026-06-12T06:43:17Z"), [
  "20260612064000",
  "20260612063500",
  "20260612063000",
  "20260612062500",
  "20260612062000",
  "20260612061500",
  "20260612061000",
  "20260612060500",
  "20260612060000",
]);
assert.equal(ordBucketBaseUrl(), "https://s3.waw3-1.cloudferro.com/openradar-24h");
assert.deepEqual(ordObjectKinds("nlhrw"), ["PVOL", "SCAN"]);
assert.deepEqual(ordObjectKinds("frtou"), ["SCAN", "PVOL"]);
assert.equal(ordHourPrefix("nlhrw", "PVOL", "2026-06-12T14:07:30Z"), "2026/06/12/NL/nlhrw/PVOL/nlhrw@20260612T14");
assert.equal(ordHourListingUrl("nlhrw", "PVOL", "2026-06-12T14:07:30Z"), "https://s3.waw3-1.cloudferro.com/openradar-24h/?list-type=2&prefix=2026%2F06%2F12%2FNL%2Fnlhrw%2FPVOL%2Fnlhrw%4020260612T14&max-keys=1000");
assert.equal(dmiVolumeItemsUrl("06177"), "https://opendataapi.dmi.dk/v1/radardata/collections/volume/items?stationId=06177&limit=1&sortorder=datetime%2CDESC");
assert.equal(fmiDatePrefix("2026-06-12T06:35:00Z"), "2026/06/12/");
assert.equal(fmiCatalogListingUrl({ now: "2026-06-12T06:35:00Z" }), "https://fmi-opendata-radar-volume-hdf5.s3.amazonaws.com/?list-type=2&prefix=2026%2F06%2F12%2F&delimiter=%2F&max-keys=1000");
assert.equal(fmiRadarVolumeListingUrl("fianj", { datePrefix: "2026/06/12" }), "https://fmi-opendata-radar-volume-hdf5.s3.amazonaws.com/?list-type=2&prefix=2026%2F06%2F12%2Ffianj%2F&max-keys=1000");
const mobileZip = storedZip([
  { name: "DOW7/20260612_145500.SWP", bytes: new Uint8Array([0x52, 0x44, 0x52, 0x31]) },
  { name: "DOW7/20260612_145530.SWP", bytes: new Uint8Array([0x52, 0x44, 0x52, 0x32]) },
  { name: "DOW7/readme.txt", bytes: new TextEncoder().encode("metadata") },
]);
assert.equal(isZipBytes(mobileZip), true);
assert.equal(isZipBytes(new Uint8Array([1, 2, 3, 4])), false);
assert.deepEqual(parseZipDirectory(mobileZip).map((entry) => entry.name), [
  "DOW7/20260612_145500.SWP",
  "DOW7/20260612_145530.SWP",
  "DOW7/readme.txt",
]);
assert.deepEqual((await extractMobileArchiveEntries(mobileZip)).map((entry) => entry.fileName), [
  "20260612_145500.SWP",
  "20260612_145530.SWP",
]);
assert.equal((await extractZipEntries(mobileZip, { pattern: "readme" }))[0].fileName, "readme.txt");
assert.equal(communityRadarFeeds({ state: "OK" }).length, 8);
assert.equal(communityRadarFeed("WILU").pollUrl, "https://mesonet-nexrad.agron.iastate.edu/level2/raw/WILU");
assert.equal(communityRadarMarkers({ query: "Norman" })[0].feedIds.length, 8);
assert.equal(CUSTOM_POLL_NO_MARKER_LAT_E6, 91_000_000);
assert.equal(normalizeCustomPollUrl("192.0.2.8:8080/armor/"), "http://192.0.2.8:8080/armor");
assert.equal(pollUrlsMatch("HTTP://EXAMPLE.COM/fwlx/", "http://example.com/fwlx"), true);
assert.equal(pollUrlName("http://example.com/poll/ARMOR/"), "ARMOR");
const blankCustomMarker = parseCustomPollMarkerInputs("  ", "");
assert.equal(blankCustomMarker.hasMarker, false);
assert.equal(blankCustomMarker.latE6, CUSTOM_POLL_NO_MARKER_LAT_E6);
assert.equal(customPollEntryLatLon({ label: "Mobile radar", latE6: blankCustomMarker.latE6, lonE6: blankCustomMarker.lonE6, pollUrl: "http://192.0.2.8:8080" }), null);
const validCustomMarker = parseCustomPollMarkerInputs("34.6464", "-86.7722");
assert.equal(validCustomMarker.latE6, 34_646_400);
assert.equal(validCustomMarker.lonE6, -86_772_200);
assert.throws(() => parseCustomPollMarkerInputs("34.0", ""), /both latitude and longitude/);
assert.throws(() => parseCustomPollMarkerInputs("95.0", "-86.0"), /latitude/);
const customGisText = `
; comments are ignored
kund rdr1 47.922 -97.087 254 1 ND University of North Dakota
FWLX: fwlx,fwlx, 35.254, -87.325, 220, 1, TN, WLX X-Band
dan1, kcri, 35.238274, -97.460030, 366, 1, OK, BUILD 12 SUPER,RESOLUTION
`;
const customGisSites = parseCustomRadarGis(customGisText);
assert.equal(customGisSites.length, 3);
assert.equal(customGisSites[0].siteId, "kund");
assert.equal(customGisSites[0].label, "University of North Dakota");
assert.equal(customGisSites[1].label, "WLX X-Band");
assert.equal(customGisSites[2].label, "BUILD 12 SUPER, RESOLUTION");
const customGisLinks = customPollLinksFromGis(
  "fwlx,fwlx, 35.254, -87.325, 220, 1, TN, WLX X-Band\nwilu,wilu, 40.465, -90.685, 212, 1, IL, WIU",
  "https://example.com/level2/raw",
);
assert.equal(customGisLinks[0].pollUrl, "https://example.com/level2/raw/fwlx");
assert.equal(customGisLinks[1].pollUrl, "https://example.com/level2/raw/wilu");
assert.equal(customPollLinksFromGis("armor armor 34.646 -86.772 190 1 AL ARMOR", "192.0.2.5:8080")[0].pollUrl, "http://192.0.2.5:8080");
assert.equal(customPollLinksFromGis("fwlx,fwlx,35.254,-87.325,220,1,TN,WLX", "https://example.com/{SITE}/poll")[0].pollUrl, "https://example.com/fwlx/poll");
const normalizedCustomLink = normalizeCustomPollLink({ siteId: "ARMOR", lat: 34.6464, lon: -86.7722, pollUrl: "192.0.2.8:8080/armor/" });
assert.equal(normalizedCustomLink.label, "ARMOR");
assert.equal(normalizedCustomLink.pollUrl, "http://192.0.2.8:8080/armor");
assert.equal(customPollEntryLabel({ pollUrl: "https://example.com/mobile/FWLX" }), "FWLX");
const customUpsert = upsertCustomPollLink(customGisLinks, { siteId: "FWLX", label: "Updated FWLX", lat: 35.25, lon: -87.32, pollUrl: "https://example.com/new/fwlx" });
assert.equal(customUpsert.updated, true);
assert.equal(customUpsert.links[0].label, "Updated FWLX");
const customMarkers = customPollMarkers(customGisLinks);
assert.deepEqual(customMarkers.map((marker) => marker.siteId), ["fwlx", "wilu"]);
assert.equal(customPollLinksGeoJson(customGisLinks).features.length, 2);
const customFeeds = customPollLinksAsFeeds(customGisLinks);
assert.equal(customFeeds[0].id, "FWLX");
assert.equal(customPollLinkFeed(customGisLinks[0]).pollUrl, "https://example.com/level2/raw/fwlx");
const customGlobalSites = globalRadarSites({ source: "custom", customPollLinks: customGisLinks });
assert.equal(customGlobalSites.length, 2);
assert.equal(customGlobalSites[0].source, "custom");
assert.equal(nearestRadarSite({ lon: -87.325, lat: 35.254 }, { source: "custom", customPollLinks: customGisLinks, maxDistanceKm: 1 }).id, "fwlx");
const globalSummary = radarSiteSourceSummary();
assert.equal(globalSummary.sources.nexrad, 204);
assert.equal(globalSummary.sources.international, 147);
assert.equal(globalSummary.sources.community, 12);
const globalGeo = globalRadarSitesGeoJson({ sources: ["international", "community"], query: "Japan" });
assert.equal(globalGeo.type, "FeatureCollection");
assert.ok(globalGeo.features.every((feature) => feature.properties.source === "international"));
assert.equal(globalRadarSites({ source: "community", query: "Norman" })[0].feedIds.length, 8);
assert.equal(mapboxGlobalRadarSiteSource({ source: "community" }).data.features.length, 12);
const deckGlobalSites = deckGlobalRadarSiteScatterplotLayerProps({ source: "international", providerId: "smhi" });
assert.equal(deckGlobalSites.data.length, 12);
assert.deepEqual(deckGlobalSites.getFillColor(deckGlobalSites.data[0]), [255, 191, 74, 230]);
const nearestGlobal = nearestRadarSite({ lon: -97.2777, lat: 35.3331 }, { sources: ["nexrad", "international", "community"], maxDistanceKm: 5 });
assert.equal(nearestGlobal.id, "KTLX");
assert.equal(nearestRadarSite({ lon: 127.765, lat: 26.1533 }, { source: "international", providerId: "jma", maxDistanceKm: 2 }).id, "ITOK");
assert.equal(globalRadarSites({ source: "community", query: "Norman" })[0].capabilities.clientSideReady, true);
assert.equal(globalRadarSites({ source: "international", providerId: "smhi" })[0].capabilities.clientSideReady, true);
assert.equal(globalRadarSites({ source: "international", providerId: "geosphere" })[0].capabilities.clientSideReady, true);
assert.equal(globalRadarSites({ source: "international", providerId: "shmu" })[0].capabilities.clientSideReady, true);
assert.equal(globalRadarSites({ source: "international", providerId: "dwd" })[0].capabilities.clientSideReady, true);
assert.equal(globalRadarSites({ source: "international", providerId: "chmi" })[0].capabilities.clientSideReady, true);
assert.equal(globalRadarSites({ source: "international", providerId: "dmi" })[0].capabilities.clientSideReady, true);
assert.equal(globalRadarSites({ source: "international", providerId: "fmi" })[0].capabilities.clientSideReady, true);

const smhiAreas = {
  areas: [
    { key: "angelholm" },
    { key: "vara" },
    { key: "sweden" },
  ],
};
const smhiAreaItems = parseSmhiAreaCatalog(JSON.stringify(smhiAreas));
assert.deepEqual(smhiAreaItems.map((area) => area.id), ["angelholm", "vara"]);
assert.equal(smhiAreaItems[0].site.id, "angelholm");
const smhiQcvol = {
  lastFiles: [
    {
      key: "radar_angelholm_qcvol_202606120625",
      formats: [{ key: "h5", link: "https://smhi.example/latest.h5" }],
    },
    {
      key: "radar_angelholm_qcvol_202606120630",
      formats: [{ key: "h5", link: "https://smhi.example/latest.h5" }],
    },
    {
      key: "radar_angelholm_qcvol_202606120635",
      formats: [{ key: "h5", link: "https://smhi.example/latest.h5" }],
    },
  ],
};
const smhiItems = parseSmhiQcvolCatalog("angelholm", smhiQcvol);
assert.deepEqual(smhiItems.map((item) => item.key), [
  "radar_angelholm_qcvol_202606120625",
  "radar_angelholm_qcvol_202606120630",
  "radar_angelholm_qcvol_202606120635",
]);
assert.equal(smhiItems[2].url, "https://opendata-download-radar.smhi.se/api/version/latest/area/angelholm/product/qcvol/2026/06/12/radar_angelholm_qcvol_202606120635.h5");
assert.equal(smhiItems[2].volumeTime, "2026-06-12T06:35:00Z");
const smhiPlan = smhiFramePlanFromCatalog("angelholm", smhiQcvol);
assert.equal(smhiPlan.providerId, "smhi");
assert.equal(smhiPlan.identity, "radar_angelholm_qcvol_202606120635");
assert.equal(smhiPlan.parts[0].url.endsWith("/radar_angelholm_qcvol_202606120635.h5"), true);
assert.deepEqual(smhiFramePlansFromCatalog("angelholm", smhiQcvol, { count: 2 }).map((plan) => plan.identity), [
  "radar_angelholm_qcvol_202606120630",
  "radar_angelholm_qcvol_202606120635",
]);
const smhiFetch = async (url) => {
  assert.equal(String(url), "https://opendata-download-radar.smhi.se/api/version/latest/area/angelholm/product/qcvol");
  return { ok: true, status: 200, statusText: "OK", text: async () => JSON.stringify(smhiQcvol) };
};
const latestSmhiPlan = await latestInternationalFramePlan("smhi", "angelholm", { fetch: smhiFetch });
assert.equal(latestSmhiPlan.identity, "radar_angelholm_qcvol_202606120635");
const latestSmhiFrame = await latestInternationalFrame("smhi", "angelholm", { fetch: smhiFetch });
assert.equal(latestSmhiFrame.internationalSite.id, "angelholm");
assert.ok(latestSmhiFrame.cacheKey.startsWith("international:smhi:angelholm:"));
const recentSmhiPlans = await recentInternationalFramePlans("smhi", "angelholm", 2, { fetch: smhiFetch });
assert.deepEqual(recentSmhiPlans.map((plan) => plan.identity), [
  "radar_angelholm_qcvol_202606120630",
  "radar_angelholm_qcvol_202606120635",
]);
const recentSmhiFrames = await recentInternationalFrames("smhi", "angelholm", 2, { fetch: smhiFetch });
assert.deepEqual(recentSmhiFrames.map((frame) => frame.identity), [
  "radar_angelholm_qcvol_202606120630",
  "radar_angelholm_qcvol_202606120635",
]);

const geosphereListing = `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult>
  <Name>datahub</Name>
  <Prefix>resources/radar_volumen_hochficht-v1-5min/filelisting/</Prefix>
  <Contents>
    <Key>resources/radar_volumen_hochficht-v1-5min/filelisting/WXRHOF_202606120625.hdf</Key>
    <LastModified>2026-06-12T06:26:00.000Z</LastModified>
    <Size>33000000</Size>
  </Contents>
  <Contents>
    <Key>resources/radar_volumen_hochficht-v1-5min/filelisting/README.txt</Key>
    <LastModified>2026-06-12T06:27:00.000Z</LastModified>
    <Size>128</Size>
  </Contents>
  <Contents>
    <Key>resources/radar_volumen_hochficht-v1-5min/filelisting/WXRHOF_202606120630.hdf</Key>
    <LastModified>2026-06-12T06:31:00.000Z</LastModified>
    <Size>33100000</Size>
  </Contents>
  <Contents>
    <Key>resources/radar_volumen_hochficht-v1-5min/filelisting/WXRHOF_202606120635.hdf</Key>
    <LastModified>2026-06-12T06:36:00.000Z</LastModified>
    <Size>33200000</Size>
  </Contents>
  <IsTruncated>false</IsTruncated>
</ListBucketResult>`;
const geosphereItems = parseGeosphereVolumeListing(geosphereListing);
assert.deepEqual(geosphereItems.map((item) => item.fileName), [
  "WXRHOF_202606120625.hdf",
  "WXRHOF_202606120630.hdf",
  "WXRHOF_202606120635.hdf",
]);
assert.equal(geosphereItems[2].url, "https://public.hub.geosphere.at/datahub/resources/radar_volumen_hochficht-v1-5min/filelisting/WXRHOF_202606120635.hdf");
assert.equal(geosphereItems[2].volumeTime, "2026-06-12T06:35:00Z");
const geospherePlan = geosphereFramePlanFromListing(geosphereListing);
assert.equal(geospherePlan.providerId, "geosphere");
assert.equal(geospherePlan.identity, "WXRHOF_202606120635.hdf");
assert.equal(geospherePlan.parts[0].url.endsWith("/WXRHOF_202606120635.hdf"), true);
assert.deepEqual(geosphereFramePlansFromListing(geosphereListing, { count: 2 }).map((plan) => plan.identity), [
  "WXRHOF_202606120630.hdf",
  "WXRHOF_202606120635.hdf",
]);
const geosphereFetch = async (url) => {
  assert.ok(String(url).includes("public.hub.geosphere.at/datahub"), `unexpected GeoSphere URL ${url}`);
  assert.ok(String(url).includes("start-after="), `GeoSphere listing must use start-after ${url}`);
  return { ok: true, status: 200, statusText: "OK", text: async () => geosphereListing };
};
const latestGeospherePlan = await latestInternationalFramePlan("geosphere", "hochficht", { fetch: geosphereFetch, now: "2026-06-12T18:35:00Z" });
assert.equal(latestGeospherePlan.identity, "WXRHOF_202606120635.hdf");
const latestGeosphereFrame = await latestInternationalFrame("geosphere", "hochficht", { fetch: geosphereFetch, now: "2026-06-12T18:35:00Z" });
assert.equal(latestGeosphereFrame.internationalSite.id, "hochficht");
assert.ok(latestGeosphereFrame.cacheKey.startsWith("international:geosphere:hochficht:"));
const recentGeospherePlans = await recentInternationalFramePlans("geosphere", "hochficht", 2, { fetch: geosphereFetch, now: "2026-06-12T18:35:00Z" });
assert.deepEqual(recentGeospherePlans.map((plan) => plan.identity), [
  "WXRHOF_202606120630.hdf",
  "WXRHOF_202606120635.hdf",
]);
const recentGeosphereFrames = await recentInternationalFrames("geosphere", "hochficht", 2, { fetch: geosphereFetch, now: "2026-06-12T18:35:00Z" });
assert.deepEqual(recentGeosphereFrames.map((frame) => frame.identity), [
  "WXRHOF_202606120630.hdf",
  "WXRHOF_202606120635.hdf",
]);

const shmuProductsHtml = `
<html><body>
  <a href="../">../</a>
  <a href="dBZ/">dBZ/</a>
  <a href="V/">V/</a>
  <a href="ZDR/">ZDR/</a>
  <a href="RhoHV/">RhoHV/</a>
  <a href="PhiDP/">PhiDP/</a>
  <a href="KDP/">KDP/</a>
  <a href="metadata/">metadata/</a>
</body></html>`;
const shmuDatesHtml = `
<html><body>
  <a href="../">../</a>
  <a href="20260611/">20260611/</a>
  <a href="20260612/">20260612/</a>
</body></html>`;
const shmuDbzHtml = `
<html><body>
  <a href="../">../</a>
  <a href="T_PAGZ41_C_LZIB_20260612063000.hdf">T_PAGZ41_C_LZIB_20260612063000.hdf</a>
  <a href="T_PAGZ41_C_LZIB_20260612063500.hdf">T_PAGZ41_C_LZIB_20260612063500.hdf</a>
</body></html>`;
const shmuVHtml = `
<html><body>
  <a href="../">../</a>
  <a href="T_PAHZ41_C_LZIB_20260612063000.hdf">T_PAHZ41_C_LZIB_20260612063000.hdf</a>
  <a href="T_PAHZ41_C_LZIB_20260612063500.hdf">T_PAHZ41_C_LZIB_20260612063500.hdf</a>
</body></html>`;
const shmuZdrHtml = `
<html><body>
  <a href="../">../</a>
  <a href="T_PAZZ41_C_LZIB_20260612063500.hdf">T_PAZZ41_C_LZIB_20260612063500.hdf</a>
</body></html>`;
const shmuEmptyHtml = `<html><body><a href="../">../</a></body></html>`;
const autoIndexEntries = parseAutoIndexListing(shmuProductsHtml);
assert.equal(autoIndexEntries.find((entry) => entry.name === "dBZ").isDir, true);
assert.deepEqual(parseShmuDateListing(shmuDatesHtml), ["20260611", "20260612"]);
const shmuFiles = {
  dBZ: parseShmuFileListing("skjav", "dBZ", "20260612", shmuDbzHtml),
  V: parseShmuFileListing("skjav", "V", "20260612", shmuVHtml),
  ZDR: parseShmuFileListing("skjav", "ZDR", "20260612", shmuZdrHtml),
};
assert.deepEqual(shmuFiles.dBZ.map((item) => item.stamp), ["20260612063000", "20260612063500"]);
assert.equal(shmuFiles.dBZ[1].url, "https://opendata.shmu.sk/meteorology/weather/radar/volume/skjav/dBZ/20260612/T_PAGZ41_C_LZIB_20260612063500.hdf");
assert.equal(shmuFiles.V[1].volumeTime, "2026-06-12T06:35:00Z");
const shmuPlan = shmuFramePlanFromProductFiles("skjav", shmuFiles);
assert.equal(shmuPlan.providerId, "shmu");
assert.equal(shmuPlan.merge, true);
assert.equal(shmuPlan.parts.length, 3);
assert.equal(shmuPlan.volumeTime, "2026-06-12T06:35:00Z");
assert.ok(shmuPlan.identity.startsWith("shmu-skjav-20260612063500-p3-"));
const shmuFrame = internationalFrameFromPlan(shmuPlan);
assert.equal(shmuFrame.url, undefined);
assert.equal(shmuFrame.urls.length, 3);
assert.equal(shmuFrame.merge, true);
assert.ok(shmuFrame.cacheKey.startsWith("international:shmu:skjav:"));
assert.deepEqual(shmuFramePlansFromProductFiles("skjav", shmuFiles, { count: 1 }).map((plan) => plan.volumeTime), [
  "2026-06-12T06:35:00Z",
]);
const shmuFetch = async (url) => {
  const value = String(url);
  if (value.endsWith("/skjav/")) return { ok: true, status: 200, statusText: "OK", text: async () => shmuProductsHtml };
  if (value.endsWith("/skjav/dBZ/") || value.endsWith("/skjav/V/")) return { ok: true, status: 200, statusText: "OK", text: async () => shmuDatesHtml };
  if (value.endsWith("/skjav/dBZ/20260612/")) return { ok: true, status: 200, statusText: "OK", text: async () => shmuDbzHtml };
  if (value.endsWith("/skjav/V/20260612/")) return { ok: true, status: 200, statusText: "OK", text: async () => shmuVHtml };
  if (value.endsWith("/skjav/ZDR/20260612/")) return { ok: true, status: 200, statusText: "OK", text: async () => shmuZdrHtml };
  if (value.endsWith("/skjav/RhoHV/20260612/") || value.endsWith("/skjav/PhiDP/20260612/") || value.endsWith("/skjav/KDP/20260612/")) {
    return { ok: true, status: 200, statusText: "OK", text: async () => shmuEmptyHtml };
  }
  if (value.endsWith("/20260611/")) return { ok: true, status: 200, statusText: "OK", text: async () => shmuEmptyHtml };
  throw new Error(`unexpected SHMU URL ${url}`);
};
const latestShmuPlan = await latestInternationalFramePlan("shmu", "skjav", { fetch: shmuFetch });
assert.equal(latestShmuPlan.merge, true);
assert.equal(latestShmuPlan.parts.length, 3);
const latestShmuFrame = await latestInternationalFrame("shmu", "skjav", { fetch: shmuFetch });
assert.equal(latestShmuFrame.internationalSite.id, "skjav");
assert.equal(latestShmuFrame.urls.length, 3);
const recentShmuPlans = await recentInternationalFramePlans("shmu", "skjav", 2, { fetch: shmuFetch });
assert.deepEqual(recentShmuPlans.map((plan) => plan.volumeTime), [
  "2026-06-12T06:30:00Z",
  "2026-06-12T06:35:00Z",
]);
const recentShmuFrames = await recentInternationalFrames("shmu", "skjav", 2, { fetch: shmuFetch });
assert.deepEqual(recentShmuFrames.map((frame) => frame.urls.length), [2, 3]);

const dwdZStationHtml = `<html><body><pre><a href="../">../</a><a href="hdf5/">hdf5/</a><a href="unfiltered/">unfiltered/</a></pre></body></html>`;
const dwdVStationHtml = `<html><body><pre><a href="../">../</a><a href="hdf5/">hdf5/</a></pre></body></html>`;
const dwdVHdf5Html = `<html><body><pre><a href="../">../</a><a href="filter_polarimetric/">filter_polarimetric/</a><a href="filter_simple/">filter_simple/</a></pre></body></html>`;
const dwdCycleStamps = [
  [
    "2026061206355700", "2026061206362000", "2026061206364300", "2026061206370700", "2026061206373000",
    "2026061206380000", "2026061206382200", "2026061206383500", "2026061206384900", "2026061206390200",
  ],
  [
    "2026061206405700", "2026061206412000", "2026061206414300", "2026061206420600", "2026061206423000",
    "2026061206430000", "2026061206432200", "2026061206433500", "2026061206434900", "2026061206440200",
  ],
];
function dwdSweepHtml(quantity, extra = []) {
  const links = [];
  for (const stamps of dwdCycleStamps) {
    for (const [sweep, stamp] of stamps.entries()) {
      const name = `ras07-vol5minng01_sweeph5onem_${quantity}_${String(sweep).padStart(2, "0")}-${stamp}-asb-10103-hd5`;
      links.push(`<a href="${name}">${name.slice(0, 48)}..&gt;</a>`);
    }
  }
  for (const [sweep, stamp] of extra.entries()) {
    if (!stamp) continue;
    const name = `ras07-vol5minng01_sweeph5onem_${quantity}_${String(sweep).padStart(2, "0")}-${stamp}-asb-10103-hd5`;
    links.push(`<a href="${name}">${name.slice(0, 48)}..&gt;</a>`);
  }
  links.push(`<a href="ras07-vol5minng01_sweeph5onem_${quantity}_09-LATEST-asb-10103-hd5">LATEST</a>`);
  return `<html><body><pre><a href="../">../</a>${links.join("\n")}</pre></body></html>`;
}
const dwdZHtml = dwdSweepHtml("th", ["2026061206455700"]);
const dwdVHtml = dwdSweepHtml("vradh", ["2026061206455700"]);
const dwdTruncatedEntries = parseAutoIndexListing(`<a href="ras07-vol5minng01_sweeph5onem_th_09-2026061206440200-asb-10103-hd5">ras07-vol5minng01_sweeph5onem_th_09-20260612..&gt;</a>`);
assert.equal(dwdTruncatedEntries[0].name, "ras07-vol5minng01_sweeph5onem_th_09-2026061206440200-asb-10103-hd5");
const dwdSweeps = {
  sweep_vol_z: parseDwdSweepListing("asb", "sweep_vol_z", "th", dwdZHtml, {
    baseUrl: "https://opendata.dwd.de/weather/radar/sites/sweep_vol_z/asb/unfiltered/",
  }),
  sweep_vol_v: parseDwdSweepListing("asb", "sweep_vol_v", "vradh", dwdVHtml, {
    baseUrl: "https://opendata.dwd.de/weather/radar/sites/sweep_vol_v/asb/hdf5/filter_polarimetric/",
  }),
};
assert.equal(dwdSweeps.sweep_vol_z.length, 21, "DWD parser keeps timestamped sweeps and skips LATEST");
assert.ok(dwdSweeps.sweep_vol_z.some((sweep) => sweep.sweep === 0 && sweep.stamp === "20260612064557"), "partial next-cycle low sweep is parsed");
const dwdPlan = dwdFramePlanFromProductSweeps("asb", dwdSweeps);
assert.equal(dwdPlan.providerId, "dwd");
assert.equal(dwdPlan.merge, true);
assert.equal(dwdPlan.parts.length, 20);
assert.equal(dwdPlan.volumeTime, "2026-06-12T06:44:02Z");
assert.ok(dwdPlan.identity.startsWith("dwd-asb-20260612064402-p20-"));
assert.deepEqual(dwdPlan.sourceItem.products.map((product) => product.sweepCount), [10, 10]);
assert.equal(dwdPlan.sourceItem.products[0].sweeps[0].stamp, "20260612064057");
const dwdFrame = internationalFrameFromPlan(dwdPlan);
assert.equal(dwdFrame.url, undefined);
assert.equal(dwdFrame.urls.length, 20);
assert.equal(dwdFrame.merge, true);
assert.ok(dwdFrame.cacheKey.startsWith("international:dwd:asb:"));
assert.deepEqual(dwdFramePlansFromProductSweeps("asb", dwdSweeps, { count: 2 }).map((plan) => plan.volumeTime), [
  "2026-06-12T06:39:02Z",
  "2026-06-12T06:44:02Z",
]);
const dwdFetch = async (url) => {
  const value = String(url);
  if (value.endsWith("/sweep_vol_z/asb/")) return { ok: true, status: 200, statusText: "OK", text: async () => dwdZStationHtml };
  if (value.endsWith("/sweep_vol_v/asb/")) return { ok: true, status: 200, statusText: "OK", text: async () => dwdVStationHtml };
  if (value.endsWith("/sweep_vol_v/asb/hdf5/")) return { ok: true, status: 200, statusText: "OK", text: async () => dwdVHdf5Html };
  if (value.endsWith("/sweep_vol_z/asb/unfiltered/")) return { ok: true, status: 200, statusText: "OK", text: async () => dwdZHtml };
  if (value.endsWith("/sweep_vol_v/asb/hdf5/filter_polarimetric/")) return { ok: true, status: 200, statusText: "OK", text: async () => dwdVHtml };
  throw new Error(`unexpected DWD URL ${url}`);
};
const latestDwdPlan = await latestInternationalFramePlan("dwd", "asb", { fetch: dwdFetch });
assert.equal(latestDwdPlan.parts.length, 20);
const latestDwdFrame = await latestInternationalFrame("dwd", "asb", { fetch: dwdFetch });
assert.equal(latestDwdFrame.internationalSite.id, "asb");
assert.equal(latestDwdFrame.urls.length, 20);
const recentDwdPlans = await recentInternationalFramePlans("dwd", "asb", 2, { fetch: dwdFetch });
assert.deepEqual(recentDwdPlans.map((plan) => plan.volumeTime), [
  "2026-06-12T06:39:02Z",
  "2026-06-12T06:44:02Z",
]);

const chmiProductsHtml = `<html><body><pre>
<a href="../">../</a>
<a href="vol_phidp/">vol_phidp/</a>
<a href="vol_rhohv/">vol_rhohv/</a>
<a href="vol_u/">vol_u/</a>
<a href="vol_v/">vol_v/</a>
<a href="vol_w/">vol_w/</a>
<a href="vol_z/">vol_z/</a>
<a href="vol_zdr/">vol_zdr/</a>
</pre></body></html>`;
const chmiZNames = [
  "T_PAGZ60_C_OKPR_20260612062411.hdf",
  "T_PAGZ60_C_OKPR_20260612062914.hdf",
  "T_PAGZ60_C_OKPR_20260612063412.hdf",
  "T_PAGZ60_C_OKPR_20260612063911.hdf",
  "T_PAYA60_C_OKPR_20260612060948.hdf",
  "T_PAYA60_C_OKPR_20260612061959.hdf",
  "T_PAYA60_C_OKPR_20260612062948.hdf",
  "T_PAYA60_C_OKPR_20260612063948.hdf",
  "T_PAYB60_C_OKPR_20260612062526.hdf",
  "T_PAYB60_C_OKPR_20260612063025.hdf",
  "T_PAYB60_C_OKPR_20260612063526.hdf",
  "T_PAYB60_C_OKPR_20260612064025.hdf",
];
const chmiVNames = [
  "T_PAHZ60_C_OKPR_20260612062411.hdf",
  "T_PAHZ60_C_OKPR_20260612062914.hdf",
  "T_PAHZ60_C_OKPR_20260612063412.hdf",
  "T_PAHZ60_C_OKPR_20260612063911.hdf",
  "T_PAHA60_C_OKPR_20260612060948.hdf",
  "T_PAHA60_C_OKPR_20260612061959.hdf",
  "T_PAHA60_C_OKPR_20260612062948.hdf",
  "T_PAHA60_C_OKPR_20260612063948.hdf",
  "T_PAHB60_C_OKPR_20260612062526.hdf",
  "T_PAHB60_C_OKPR_20260612063025.hdf",
  "T_PAHB60_C_OKPR_20260612063526.hdf",
  "T_PAHB60_C_OKPR_20260612064025.hdf",
];
function chmiFileHtml(names) {
  return `<html><body><pre><a href="../">../</a>${names.map((name) => `<a href="${name}">${name}</a>`).join("\n")}</pre></body></html>`;
}
const chmiFiles = {
  vol_z: parseChmiFileListing("brd", "vol_z", chmiFileHtml(chmiZNames)),
  vol_v: parseChmiFileListing("brd", "vol_v", chmiFileHtml(chmiVNames)),
};
assert.equal(chmiFiles.vol_z.length, 12);
assert.deepEqual(chmiFiles.vol_z.filter((file) => file.task === "Z").map((file) => file.stamp), [
  "20260612062411",
  "20260612062914",
  "20260612063412",
  "20260612063911",
]);
const chmiPlan = chmiFramePlanFromProductFiles("brd", chmiFiles);
assert.equal(chmiPlan.providerId, "chmi");
assert.equal(chmiPlan.merge, true);
assert.equal(chmiPlan.parts.length, 6);
assert.equal(chmiPlan.volumeTime, "2026-06-12T06:40:25Z");
assert.ok(chmiPlan.identity.startsWith("chmi-brd-20260612064025-p6-"));
assert.deepEqual(chmiPlan.sourceItem.products.map((product) => product.taskCount), [3, 3]);
assert.deepEqual(chmiPlan.sourceItem.products[0].files.map((file) => file.task), ["Z", "B", "A"]);
assert.deepEqual(chmiPlan.sourceItem.products[0].files.map((file) => file.stamp), [
  "20260612063911",
  "20260612064025",
  "20260612063948",
]);
const chmiFrame = internationalFrameFromPlan(chmiPlan);
assert.equal(chmiFrame.url, undefined);
assert.equal(chmiFrame.urls.length, 6);
assert.equal(chmiFrame.merge, true);
assert.ok(chmiFrame.cacheKey.startsWith("international:chmi:brd:"));
assert.deepEqual(chmiFramePlansFromProductFiles("brd", chmiFiles, { count: 2 }).map((plan) => plan.volumeTime), [
  "2026-06-12T06:35:26Z",
  "2026-06-12T06:40:25Z",
]);
const chmiFetch = async (url) => {
  const value = String(url);
  if (value.endsWith("/brd/")) return { ok: true, status: 200, statusText: "OK", text: async () => chmiProductsHtml };
  if (value.endsWith("/brd/vol_z/hdf5/")) return { ok: true, status: 200, statusText: "OK", text: async () => chmiFileHtml(chmiZNames) };
  if (value.endsWith("/brd/vol_v/hdf5/")) return { ok: true, status: 200, statusText: "OK", text: async () => chmiFileHtml(chmiVNames) };
  throw new Error(`unexpected CHMI URL ${url}`);
};
const latestChmiPlan = await latestInternationalFramePlan("chmi", "brd", { fetch: chmiFetch, includeDualPol: false });
assert.equal(latestChmiPlan.parts.length, 6);
const latestChmiFrame = await latestInternationalFrame("chmi", "brd", { fetch: chmiFetch, includeDualPol: false });
assert.equal(latestChmiFrame.internationalSite.id, "brd");
assert.equal(latestChmiFrame.urls.length, 6);
const recentChmiPlans = await recentInternationalFramePlans("chmi", "brd", 2, { fetch: chmiFetch, includeDualPol: false });
assert.deepEqual(recentChmiPlans.map((plan) => plan.volumeTime), [
  "2026-06-12T06:35:26Z",
  "2026-06-12T06:40:25Z",
]);

const jmaPlan = jmaFramePlanFromStamp("ITOK", "20260612064000");
assert.equal(jmaPlan.providerId, "jma");
assert.equal(jmaPlan.identity, "20260612064000_ITOK");
assert.equal(jmaPlan.merge, false);
assert.equal(jmaPlan.format, "jma-grib2-tar");
assert.equal(jmaPlan.parts.length, 1);
assert.equal(jmaPlan.volumeTime, "2026-06-12T06:40:00Z");
assert.equal(jmaPlan.sourceItem.product, "N5");
assert.ok(jmaPlan.parts[0].url.endsWith("/Z__C_RJTD_20260612064000_RDR_JMAGPV_N5_grib2.tar"));
const jmaFrame = internationalFrameFromPlan(jmaPlan);
assert.equal(jmaFrame.provider, "jma");
assert.equal(jmaFrame.format, "jma-grib2-tar");
assert.equal(jmaFrame.url, jmaPlan.parts[0].url);
assert.equal(jmaFrame.site, "ITOK");
assert.equal(jmaFrame.siteFilteredDecode, true);
assert.ok(jmaFrame.cacheKey.startsWith("international:jma:ITOK:"));
const jmaFetch = async (url, init = {}) => {
  assert.equal(init.method, "HEAD");
  const value = String(url);
  if (value.includes("20260612064000") || value.includes("20260612063500")) {
    return { ok: true, status: 200, statusText: "OK", text: async () => "" };
  }
  return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
};
const latestJmaPlan = await latestInternationalFramePlan("jma", "ITOK", { fetch: jmaFetch, now: "2026-06-12T06:43:17Z" });
assert.equal(latestJmaPlan.identity, "20260612064000_ITOK");
const latestJmaFrame = await latestInternationalFrame("jma", "ITOK", { fetch: jmaFetch, now: "2026-06-12T06:43:17Z" });
assert.equal(latestJmaFrame.internationalSite.id, "ITOK");
assert.equal(latestJmaFrame.siteFilteredDecode, true);
const recentJmaPlans = await recentInternationalFramePlans("jma", "ITOK", 2, { fetch: jmaFetch, now: "2026-06-12T06:43:17Z" });
assert.deepEqual(recentJmaPlans.map((plan) => plan.identity), [
  "20260612063500_ITOK",
  "20260612064000_ITOK",
]);
const recentJmaFrames = await recentInternationalFrames("jma", "ITOK", 2, { fetch: jmaFetch, now: "2026-06-12T06:43:17Z" });
assert.deepEqual(recentJmaFrames.map((frame) => frame.format), ["jma-grib2-tar", "jma-grib2-tar"]);
assert.deepEqual(recentJmaFrames.map((frame) => frame.site), ["ITOK", "ITOK"]);

const s3XmlForKeys = (keys) => `<ListBucketResult>
${keys.map((key) => `  <Contents><Key>${key}</Key><Size>123</Size></Contents>`).join("\n")}
  <IsTruncated>false</IsTruncated>
</ListBucketResult>`;
const ordNlhrwKeys = [
  "2026/06/12/NL/nlhrw/PVOL/nlhrw@20260612T1450@0.3_0.8_1.2_2.0_2.8_4.5_6.0_8.0_10.0_12.0_15.0_20.0_25.0_90.0@DBZH_TH_VRADH.h5",
  "2026/06/12/NL/nlhrw/PVOL/nlhrw@20260612T1455@0.3_0.8_1.2_2.0_2.8_4.5_6.0_8.0_10.0_12.0_15.0_20.0_25.0_90.0@DBZH_TH_VRADH.h5",
];
const ordObject = parseOrdObjectKey("nlhrw", ordNlhrwKeys[1]);
assert.equal(ordObject.stamp, "20260612T1455");
assert.equal(ordObject.objectKind, "PVOL");
assert.equal(ordObject.elevationCount, 14);
assert.deepEqual(ordObject.moments, ["DBZH", "TH", "VRADH"]);
const ordNlhrwPlan = ordFramePlanFromKeys("nlhrw", "PVOL", ordNlhrwKeys);
assert.equal(ordNlhrwPlan.providerId, "ord");
assert.equal(ordNlhrwPlan.identity.startsWith("nlhrw_20260612T1455_p1_h"), true);
assert.equal(ordNlhrwPlan.merge, false);
assert.equal(ordNlhrwPlan.format, "odim-h5");
assert.equal(ordNlhrwPlan.parts.length, 1);
assert.equal(ordNlhrwPlan.volumeTime, "2026-06-12T14:55:00Z");
assert.equal(ordNlhrwPlan.sourceItem.objectKind, "PVOL");
assert.equal(ordNlhrwPlan.parts[0].url, "https://s3.waw3-1.cloudferro.com/openradar-24h/2026/06/12/NL/nlhrw/PVOL/nlhrw%4020260612T1455%400.3_0.8_1.2_2.0_2.8_4.5_6.0_8.0_10.0_12.0_15.0_20.0_25.0_90.0%40DBZH_TH_VRADH.h5");
const ordFrame = internationalFrameFromPlan(ordNlhrwPlan);
assert.equal(ordFrame.provider, "ord");
assert.equal(ordFrame.site, "nlhrw");
assert.equal(ordFrame.url, ordNlhrwPlan.parts[0].url);
assert.ok(ordFrame.cacheKey.startsWith("international:ord:nlhrw:"));
const ordNorwayKeys = [
  "2026/06/12/NO/nohur/PVOL/nohur@20260612T1455@0.5_1.0_1.5_2.4_3.4_4.3_6.0_9.0_12.0_15.0@DBZH.h5",
  "2026/06/12/NO/nohur/PVOL/nohur@20260612T1455@0.5_1.0_1.5_2.4_3.4_4.3_6.0_9.0_12.0_15.0@TH.h5",
  "2026/06/12/NO/nohur/PVOL/nohur@20260612T1456@0.5_1.0_1.5_2.4_3.4_4.3_6.0_9.0_12.0_15.0@VRADH.h5",
];
const ordNorwayPlan = ordFramePlanFromKeys("nohur", "PVOL", ordNorwayKeys);
assert.equal(ordNorwayPlan.identity.startsWith("nohur_20260612T1456_p2_h"), true);
assert.equal(ordNorwayPlan.merge, true);
assert.deepEqual(ordNorwayPlan.sourceItem.files.map((file) => file.momentText), ["DBZH", "VRADH"]);
const ordFrtouKeys = [
  "2026/06/12/FR/frtou/SCAN/frtou@20260612T1454@0.81@DBZH_TH_VRADH.h5",
  "2026/06/12/FR/frtou/SCAN/frtou@20260612T1455@0.78@DBZH_TH_VRADH.h5",
  "2026/06/12/FR/frtou/SCAN/frtou@20260612T1456@1.48@DBZH_TH_VRADH.h5",
  "2026/06/12/FR/frtou/SCAN/frtou@20260612T1457@2.5@DBZH_TH_VRADH.h5",
  "2026/06/12/FR/frtou/SCAN/frtou@20260612T1458@3.5@DBZH_TH_VRADH.h5",
  "2026/06/12/FR/frtou/SCAN/frtou@20260612T1459@6.49@DBZH_TH_VRADH.h5",
  "2026/06/12/FR/frtou/SCAN/frtou@20260612T1459@9.43@DBZH_TH_VRADH.h5",
];
const ordFrtouPlan = ordFramePlanFromKeys("frtou", "SCAN", ordFrtouKeys);
assert.equal(ordFrtouPlan.identity.startsWith("frtou_20260612T1459_p6_h"), true);
assert.equal(ordFrtouPlan.merge, true);
assert.deepEqual(ordFrtouPlan.sourceItem.files.map((file) => file.elevationText), ["0.78", "1.48", "2.5", "3.5", "6.49", "9.43"]);
assert.deepEqual(ordFramePlansFromKeys("nlhrw", "PVOL", s3XmlForKeys(ordNlhrwKeys), { count: 2 }).map((plan) => plan.volumeTime), [
  "2026-06-12T14:50:00Z",
  "2026-06-12T14:55:00Z",
]);
const ordFetch = async (url) => {
  const params = new URL(String(url)).searchParams;
  const prefix = params.get("prefix") || "";
  if (prefix.endsWith("NL/nlhrw/PVOL/nlhrw@20260612T14")) {
    return { ok: true, status: 200, statusText: "OK", text: async () => s3XmlForKeys(ordNlhrwKeys) };
  }
  if (prefix.endsWith("NL/nlhrw/PVOL/nlhrw@20260612T13")) {
    return { ok: true, status: 200, statusText: "OK", text: async () => s3XmlForKeys([]) };
  }
  throw new Error(`unexpected ORD URL ${url}`);
};
const latestOrdPlan = await latestInternationalFramePlan("ord", "nlhrw", { fetch: ordFetch, now: "2026-06-12T14:59:00Z" });
assert.equal(latestOrdPlan.identity, ordNlhrwPlan.identity);
const latestOrdFrame = await latestInternationalFrame("ord", "nlhrw", { fetch: ordFetch, now: "2026-06-12T14:59:00Z" });
assert.equal(latestOrdFrame.internationalSite.id, "nlhrw");
const recentOrdPlans = await recentInternationalFramePlans("ord", "nlhrw", 2, { fetch: ordFetch, now: "2026-06-12T14:59:00Z" });
assert.deepEqual(recentOrdPlans.map((plan) => plan.volumeTime), [
  "2026-06-12T14:50:00Z",
  "2026-06-12T14:55:00Z",
]);
const recentOrdFrames = await recentInternationalFrames("ord", "nlhrw", 2, { fetch: ordFetch, now: "2026-06-12T14:59:00Z" });
assert.deepEqual(recentOrdFrames.map((frame) => frame.site), ["nlhrw", "nlhrw"]);

const dmiItems = {
  type: "FeatureCollection",
  features: [
    {
      id: "dkste_202606120640.vol.h5",
      properties: { stationId: "06177" },
      asset: { data: { href: "https://dmi.example/download/dkste_202606120640.vol.h5" } },
    },
    {
      id: "dkste_202606120635.vol.h5",
      properties: { stationId: "06177" },
      asset: { data: { href: "https://dmi.example/download/dkste_202606120635.vol.h5" } },
    },
    {
      id: "dkrom_202606120640.vol.h5",
      properties: { stationId: "60960" },
      asset: { data: { href: "https://dmi.example/download/dkrom_202606120640.vol.h5" } },
    },
  ],
};
const dmiParsed = parseDmiVolumeItems(JSON.stringify(dmiItems));
assert.equal(dmiParsed.length, 3);
assert.equal(dmiParsed[0].volumeTime, "2026-06-12T06:40:00Z");
const dmiPlan = dmiFramePlanFromItems("06177", dmiItems);
assert.equal(dmiPlan.type, "bowecho-international-frame-plan-v1");
assert.equal(dmiPlan.providerId, "dmi");
assert.equal(dmiPlan.identity, "dkste_202606120640.vol.h5");
assert.equal(dmiPlan.merge, false);
assert.equal(dmiPlan.parts[0].url, "https://dmi.example/download/dkste_202606120640.vol.h5");
assert.deepEqual(dmiFramePlansFromItems("06177", dmiItems).map((plan) => plan.identity), [
  "dkste_202606120640.vol.h5",
  "dkste_202606120635.vol.h5",
]);
const dmiFrame = internationalFrameFromPlan(dmiPlan);
assert.equal(dmiFrame.source, "international");
assert.equal(dmiFrame.provider, "dmi");
assert.equal(dmiFrame.url, "https://dmi.example/download/dkste_202606120640.vol.h5");
assert.equal(dmiFrame.internationalSite.id, "06177");
assert.ok(dmiFrame.cacheKey.startsWith("international:dmi:06177:"));

const dmiFetch = async (url) => {
  assert.ok(String(url).includes("stationId=06177"), `unexpected DMI URL ${url}`);
  return { ok: true, status: 200, statusText: "OK", text: async () => JSON.stringify(dmiItems) };
};
const latestDmiPlan = await latestInternationalFramePlan("dmi", "06177", { fetch: dmiFetch });
assert.equal(latestDmiPlan.identity, "dkste_202606120640.vol.h5");
const latestDmiFrame = await latestInternationalFrame("dmi", "06177", { fetch: dmiFetch });
assert.equal(latestDmiFrame.identity, "dkste_202606120640.vol.h5");
const recentDmiPlans = await recentInternationalFramePlans("dmi", "06177", 2, { fetch: dmiFetch });
assert.deepEqual(recentDmiPlans.map((plan) => plan.identity), [
  "dkste_202606120635.vol.h5",
  "dkste_202606120640.vol.h5",
]);
const recentDmiFrames = await recentInternationalFrames("dmi", "06177", 2, { fetch: dmiFetch });
assert.deepEqual(recentDmiFrames.map((frame) => frame.identity), [
  "dkste_202606120635.vol.h5",
  "dkste_202606120640.vol.h5",
]);

const fmiTodayListing = `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult>
  <Name>fmi-opendata-radar-volume-hdf5</Name>
  <Prefix>2026/06/12/fianj/</Prefix>
  <Contents>
    <Key>2026/06/12/fianj/202606120625_fianj_PVOL.h5</Key>
    <LastModified>2026-06-12T06:26:00.000Z</LastModified>
    <Size>21000000</Size>
  </Contents>
  <Contents>
    <Key>2026/06/12/fianj/202606120630_fianj_PVOL.h5</Key>
    <LastModified>2026-06-12T06:31:00.000Z</LastModified>
    <Size>22000000</Size>
  </Contents>
  <Contents>
    <Key>2026/06/12/fianj/202606120635_fianj_PVOL.h5</Key>
    <LastModified>2026-06-12T06:36:00.000Z</LastModified>
    <Size>23000000</Size>
  </Contents>
  <Contents>
    <Key>2026/06/12/fianj/202606120635_fikor_PVOL.h5</Key>
    <LastModified>2026-06-12T06:36:00.000Z</LastModified>
    <Size>23000000</Size>
  </Contents>
</ListBucketResult>`;
const fmiYesterdayListing = `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult>
  <Contents>
    <Key>2026/06/11/fianj/202606112355_fianj_PVOL.h5</Key>
    <LastModified>2026-06-11T23:56:00.000Z</LastModified>
    <Size>20500000</Size>
  </Contents>
</ListBucketResult>`;
const fmiCatalogXml = `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult>
  <CommonPrefixes><Prefix>2026/06/12/fianj/</Prefix></CommonPrefixes>
  <CommonPrefixes><Prefix>2026/06/12/fikor/</Prefix></CommonPrefixes>
  <IsTruncated>false</IsTruncated>
</ListBucketResult>`;
const s3Parsed = parseS3StyleListing(fmiCatalogXml);
assert.deepEqual(s3Parsed.commonPrefixes, ["2026/06/12/fianj/", "2026/06/12/fikor/"]);
assert.equal(s3Parsed.isTruncated, false);
assert.equal(s3StyleListingUrl("https://bucket.example", { prefix: "a/b/", delimiter: "/", maxKeys: 25 }), "https://bucket.example/?list-type=2&prefix=a%2Fb%2F&delimiter=%2F&max-keys=25");

const nexradArchiveXml = `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult>
  <Contents>
    <Key>2026/06/12/KTLX/KTLX20260612_062500_V06</Key>
    <LastModified>2026-06-12T06:25:30.000Z</LastModified>
    <Size>12000000</Size>
  </Contents>
  <Contents>
    <Key>2026/06/12/KTLX/KTLX20260612_063000_V06</Key>
    <LastModified>2026-06-12T06:30:30.000Z</LastModified>
    <Size>12100000</Size>
  </Contents>
  <Contents>
    <Key>2026/06/12/KTLX/KTLX20260612_063500_V06</Key>
    <LastModified>2026-06-12T06:35:30.000Z</LastModified>
    <Size>12200000</Size>
  </Contents>
  <Contents>
    <Key>2026/06/12/KTLX/KTLX20260612_063500_V06_MDM</Key>
    <LastModified>2026-06-12T06:35:31.000Z</LastModified>
    <Size>10</Size>
  </Contents>
  <Contents>
    <Key>2026/06/12/KTLX/KTLX20260612_064000_V06</Key>
    <LastModified>2026-06-12T06:40:30.000Z</LastModified>
    <Size>0</Size>
  </Contents>
</ListBucketResult>`;
assert.equal(nexradArchiveDatePrefix("ktlx", "2026-06-12"), "2026/06/12/KTLX/");
assert.equal(nexradArchiveDatePrefix("KTLX", "20260612"), "2026/06/12/KTLX/");
assert.ok(nexradArchiveListingUrl("KTLX", "2026-06-12").includes("prefix=2026%2F06%2F12%2FKTLX%2F"));
const nexradFrames = parseNexradArchiveListing("KTLX", "2026-06-12", nexradArchiveXml);
assert.deepEqual(nexradFrames.map((frame) => frame.id), [
  "KTLX20260612_062500_V06",
  "KTLX20260612_063000_V06",
  "KTLX20260612_063500_V06",
]);
assert.equal(nexradFrames[0].site, "KTLX");
assert.equal(nexradFrames[0].provider, "nexrad-public");
assert.equal(nexradFrames[0].format, "nexrad-level2");
assert.equal(nexradFrames[0].volumeTime, "2026-06-12T06:25:00Z");
assert.equal(nexradFrames[0].url, "https://unidata-nexrad-level2.s3.amazonaws.com/2026/06/12/KTLX/KTLX20260612_062500_V06");
const archiveWindow = archiveFrameWindow(nexradFrames, {
  site: "KTLX",
  date: "2026-06-12",
  targetTime: "2026-06-12T06:36:00Z",
  frameCount: 2,
});
assert.equal(archiveWindow.type, "bowecho-nexrad-archive-window-v1");
assert.deepEqual(archiveWindow.frames.map((frame) => frame.id), [
  "KTLX20260612_063000_V06",
  "KTLX20260612_063500_V06",
]);
assert.equal(archiveWindow.selectedFrame.id, "KTLX20260612_063500_V06");
assert.equal(archiveWindow.selectedIndex, 1);

const spcCombinedReports = `Time,F_Scale,Location,County,State,Lat,Lon,Comments
2242,EF2,2 S Streator,Livingston,IL,41.09,-88.84,Large tornado. (LOT)
Time,Speed,Location,County,State,Lat,Lon,Comments
1215,UNK,3 W Dallas Center,Dallas,IA,41.69,-94.02,Tree damage. (DMX)
Time,Size,Location,County,State,Lat,Lon,Comments
0105,175,1 N Norman,Cleveland,OK,35.24,-97.44,Large hail. (OUN)`;
assert.equal(spcConvectiveDate("2026-06-13T03:30:00Z"), "2026-06-12");
assert.equal(spcReportTimeUtc("2026-06-12", "0105"), "2026-06-13T01:05:00Z");
assert.ok(spcReportsUrls("2026-06-12")[0].endsWith("/260612_rpts_filtered.csv"));
assert.ok(spcWcmTornadoYearUrl(2011).endsWith("/2011_torn.csv"));
assert.ok(spcActualTornadoesUrl(2025).endsWith("/1950-2025_actual_tornadoes.csv"));
const spcReports = parseSpcReportsCombined("2026-06-12", spcCombinedReports);
assert.deepEqual(spcReports.map((report) => report.kind), ["tornado", "wind", "hail"]);
assert.equal(spcReports[0].timeUtc, "2026-06-12T22:42:00Z");
assert.equal(spcReports[1].magnitudeLabel, null);
assert.equal(spcReports[2].magnitudeLabel, "1.75\"");
assert.equal(spcReportMagnitudeLabel("hail", 250), "2.50\"");
const synthesizedSegments = tornadoSegmentsFromReports(spcReports);
assert.equal(synthesizedSegments.length, 1);
assert.equal(synthesizedSegments[0].isTrack, false);

const wcmTornCsv = `om,yr,mo,dy,date,time,tz,st,stf,stn,mag,inj,fat,loss,closs,slat,slon,elat,elon,len,wid,ns,sn,sg,f1,f2,f3,f4,f5,edat,etime
1,2011,4,27,2011-04-27,14:05:00,3,AL,1,1,4,0,0,0,0,34.50,-87.00,35.00,-86.20,30.0,800,1,1,1,,,,,,2011-04-27,15:05:00`;
const tornadoSegments = parseSpcTornadoSegments("2011-04-27", wcmTornCsv);
assert.equal(tornadoSegments.length, 1);
assert.equal(tornadoSegments[0].timeUtc, "2011-04-27T20:05:00Z");
assert.equal(tornadoSegments[0].endTimeUtc, "2011-04-27T21:05:00Z");
assert.equal(tornadoSegments[0].efLabel, "EF4");
assert.equal(estimatedTornadoTrackEndTime("2011-04-27T20:05:00Z", 30), "2011-04-27T21:05:00Z");
const eventRadarSelection = selectEventRadarSites(
  tornadoSegments[0].begin,
  tornadoSegments[0].end,
  {
    sites: [
      { id: "KAAA", name: "Midpoint", lat: 34.75, lon: -86.80 },
      { id: "KBBB", name: "End", lat: 35.0, lon: -86.2 },
    ],
  },
);
assert.equal(eventRadarSelection.primary.id, "KAAA");
assert.equal(eventRadarSelection.overlay.id, "KBBB");
const eventFrames = [
  { id: "a", site: "KAAA", volumeTime: "2011-04-27T19:55:00Z" },
  { id: "b", site: "KAAA", volumeTime: "2011-04-27T20:00:00Z" },
  { id: "c", site: "KAAA", volumeTime: "2011-04-27T20:05:00Z" },
  { id: "d", site: "KAAA", volumeTime: "2011-04-27T20:10:00Z" },
  { id: "e", site: "KAAA", volumeTime: "2011-04-27T20:15:00Z" },
];
const eventWindow = eventArchiveFrameWindow(eventFrames, {
  startTime: "2011-04-27T20:07:00Z",
  endTime: "2011-04-27T20:13:00Z",
  padFrames: 1,
});
assert.deepEqual(eventWindow.frames.map((frame) => frame.id), ["b", "c", "d", "e"]);
const eventPlan = eventArchivePlanForTrack(tornadoSegments[0], {
  frames: eventFrames,
  sites: [
    { id: "KAAA", name: "Midpoint", lat: 34.75, lon: -86.80 },
    { id: "KBBB", name: "End", lat: 35.0, lon: -86.2 },
  ],
  padFrames: 1,
});
assert.equal(eventPlan.archiveDate, "2011-04-27");
assert.equal(eventPlan.radarSelection.primary.id, "KAAA");
assert.equal(eventPlan.archiveWindow.frames.length, 4);
const spcFetch = async (url) => {
  const value = String(url);
  if (value.endsWith("_rpts_filtered.csv")) return { ok: true, status: 200, statusText: "OK", text: async () => spcCombinedReports };
  if (value.endsWith("2011_torn.csv")) return { ok: true, status: 200, statusText: "OK", text: async () => wcmTornCsv };
  return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
};
const spcEventDay = await fetchSpcEventDay("2011-04-27", { fetch: spcFetch, includeConsolidated: false });
assert.equal(spcEventDay.reports.length, 3);
assert.equal(spcEventDay.segments.length, 1);
assert.equal(spcEventDay.reportsFileMissing, false);

const spcOutlookSample = `{"features":[{"properties":{"LABEL":"SLGT","LABEL2":"Slight Risk","fill":"#FFE066","stroke":"#DDAA00"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-95.0,40.0],[-94.0,40.0],[-94.0,41.0],[-95.0,40.0]]]]}},{"properties":{"LABEL":"MRGL","LABEL2":"Marginal Risk","fill":"bad","stroke":"#00FF00"},"geometry":{"type":"Polygon","coordinates":[[[-100.0,35.0],[-99.0,35.0],[-99.0,36.0]]]}}]}`;
assert.deepEqual(spcOutlookKinds().map((kind) => kind.id), ["cat", "torn", "wind", "hail"]);
assert.equal(parseSpcOutlook("{nope").length, 0);
const outlookFeatures = parseSpcOutlook(spcOutlookSample, { kind: "cat", url: "mock://outlook" });
assert.equal(outlookFeatures.length, 2);
assert.equal(outlookFeatures[0].label, "SLGT");
assert.equal(outlookFeatures[0].rings[0].length, 4);
assert.deepEqual(outlookFeatures[0].fillRgb, [255, 224, 102]);
assert.equal(outlookFeatures[0].fill, "#FFE066");
assert.deepEqual(outlookFeatures[1].fillRgb, [128, 128, 128]);
const outlookCollection = spcOutlookFeatureCollection(outlookFeatures, { idPrefix: "risk" });
assert.equal(outlookCollection.features[0].geometry.type, "Polygon");
assert.equal(outlookCollection.features[0].id, "risk-0");
assert.deepEqual(outlookCollection.features[1].geometry.coordinates[0].at(-1), [-100, 35]);
assert.deepEqual(spcOutlookLiveUrls(1, "cat", { now: "2026-06-13T06:30:00Z" }), [
  "https://www.spc.noaa.gov/products/outlook/archive/2026/day1otlk_20260613_0100_cat.lyr.geojson",
  "https://www.spc.noaa.gov/products/outlook/day1otlk_cat.lyr.geojson",
]);
assert.deepEqual(spcOutlookLiveUrls(1, "cat", { now: "2026-06-13T12:00:00Z" }), [
  "https://www.spc.noaa.gov/products/outlook/day1otlk_cat.lyr.geojson",
]);
assert.ok(spcOutlookArchiveUrls("2026-06-13", 1, "cat")[0].endsWith("/archive/2026/day1otlk_20260613_2000_cat.lyr.geojson"));
assert.ok(spcOutlookUrls({ day: 1, kind: "cat", archiveDate: "2026-06-13" })[4].endsWith("_0100_cat.lyr.geojson"));
const spcOutlookFetchCalls = [];
const spcOutlookFetch = async (url) => {
  const value = String(url);
  spcOutlookFetchCalls.push(value);
  if (value.includes("_0100_cat.")) return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
  if (value.endsWith("/day1otlk_cat.lyr.geojson")) return { ok: true, status: 200, statusText: "OK", text: async () => spcOutlookSample };
  if (value.includes("_2000_wind.")) return { ok: true, status: 200, statusText: "OK", text: async () => spcOutlookSample };
  return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
};
const liveOutlook = await fetchSpcOutlook(1, "cat", { fetch: spcOutlookFetch, now: "2026-06-13T06:30:00Z" });
assert.equal(liveOutlook.missing, false);
assert.equal(liveOutlook.attemptedUrls.length, 2);
assert.equal(liveOutlook.features.length, 2);
assert.equal(liveOutlook.url.endsWith("/day1otlk_cat.lyr.geojson"), true);
const archiveOutlook = await fetchSpcOutlook(1, "wind", { fetch: spcOutlookFetch, archiveDate: "2026-06-13" });
assert.equal(archiveOutlook.url.endsWith("_2000_wind.lyr.geojson"), true);
const outlookBundle = await fetchSpcOutlooks(["cat", "hail"], {
  fetch: async () => ({ ok: true, status: 200, statusText: "OK", text: async () => spcOutlookSample }),
  now: "2026-06-13T12:30:00Z",
});
assert.deepEqual(outlookBundle.outlooks.map((outlook) => outlook.kind), ["cat", "hail"]);
assert.equal(outlookBundle.features.length, 4);

const fmiItems = parseFmiVolumeListing("fianj", fmiTodayListing);
assert.deepEqual(fmiItems.map((item) => item.fileName), [
  "202606120625_fianj_PVOL.h5",
  "202606120630_fianj_PVOL.h5",
  "202606120635_fianj_PVOL.h5",
]);
assert.equal(fmiItems[2].url, "https://fmi-opendata-radar-volume-hdf5.s3.amazonaws.com/2026/06/12/fianj/202606120635_fianj_PVOL.h5");
assert.equal(fmiItems[2].volumeTime, "2026-06-12T06:35:00Z");
const fmiPlan = fmiFramePlanFromListing("fianj", fmiTodayListing);
assert.equal(fmiPlan.providerId, "fmi");
assert.equal(fmiPlan.identity, "202606120635_fianj_PVOL.h5");
assert.equal(fmiPlan.parts[0].url.endsWith("/202606120635_fianj_PVOL.h5"), true);
assert.deepEqual(fmiFramePlansFromListing("fianj", fmiTodayListing, { count: 2 }).map((plan) => plan.identity), [
  "202606120630_fianj_PVOL.h5",
  "202606120635_fianj_PVOL.h5",
]);
const fmiFetch = async (url) => {
  const text = String(url).includes("2026%2F06%2F11%2Ffianj%2F") ? fmiYesterdayListing : fmiTodayListing;
  return { ok: true, status: 200, statusText: "OK", text: async () => text };
};
const latestFmiPlan = await latestInternationalFramePlan("fmi", "fianj", { fetch: fmiFetch, now: "2026-06-12T06:40:00Z" });
assert.equal(latestFmiPlan.identity, "202606120635_fianj_PVOL.h5");
const latestFmiFrame = await latestInternationalFrame("fmi", "fianj", { fetch: fmiFetch, now: "2026-06-12T06:40:00Z" });
assert.equal(latestFmiFrame.internationalSite.id, "fianj");
assert.ok(latestFmiFrame.cacheKey.startsWith("international:fmi:fianj:"));
const recentFmiPlans = await recentInternationalFramePlans("fmi", "fianj", 3, { fetch: fmiFetch, now: "2026-06-12T06:40:00Z" });
assert.deepEqual(recentFmiPlans.map((plan) => plan.identity), [
  "202606120625_fianj_PVOL.h5",
  "202606120630_fianj_PVOL.h5",
  "202606120635_fianj_PVOL.h5",
]);
const recentFmiFrames = await recentInternationalFrames("fmi", "fianj", 2, { fetch: fmiFetch, now: "2026-06-12T06:40:00Z" });
assert.deepEqual(recentFmiFrames.map((frame) => frame.identity), [
  "202606120630_fianj_PVOL.h5",
  "202606120635_fianj_PVOL.h5",
]);

const communityListing = `
123 WILU20260613_000000
latest.json
456 WILU20260613_001000
grlevel2.cfg
README.TXT
WILU20260613_002000
`;
const communityEntries = parseCommunityDirList(communityListing);
assert.deepEqual(communityEntries.map((entry) => entry.fileName), [
  "WILU20260613_000000",
  "WILU20260613_001000",
  "WILU20260613_002000",
]);
assert.equal(communityEntries[0].size, 123);
assert.equal(communityEntries[2].volumeTime, "2026-06-13T00:20:00Z");
assert.equal(newestCommunityDirListEntry(communityListing).fileName, "WILU20260613_002000");
assert.deepEqual(parseGrLevel2CfgSites("Title: demo\nSite: LARE\n"), ["LARE"]);
const plannedFrame = communityFeedFrameFromEntry("WILU", communityEntries[1]);
assert.equal(plannedFrame.provider, "community-gr2a");
assert.equal(plannedFrame.feedId, "WILU");
assert.equal(plannedFrame.url, "https://mesonet-nexrad.agron.iastate.edu/level2/raw/WILU/WILU20260613_001000");
assert.ok(plannedFrame.cacheKey.startsWith("community-gr2a:WILU:"));

const communityFetch = async (url) => {
  const responses = new Map([
    ["https://example.test/WILU/dir.list", communityListing],
    ["https://example.test/root/dir.list", "latest.json\n"],
    ["https://example.test/root/grlevel2.cfg", "Site: LARE\n"],
    ["https://example.test/root/LARE/dir.list", "1 LARE20260613_010000\n2 LARE20260613_011000\n"],
    ["https://example.com/level2/raw/fwlx/dir.list", "1 FWLX20260613_003000\n"],
  ]);
  if (!responses.has(url)) {
    return { ok: false, status: 404, statusText: "Not Found", text: async () => "" };
  }
  return { ok: true, status: 200, statusText: "OK", text: async () => responses.get(url) };
};
const directPlan = await fetchCommunityDirList(
  { id: "WILU", label: "WILU", state: "OK", lat: 35.3, lon: -97.4, pollUrl: "https://example.test/WILU" },
  { fetch: communityFetch },
);
assert.equal(directPlan.entries.length, 3);
assert.equal(directPlan.newest.fileName, "WILU20260613_002000");
const customPollPlan = await fetchCommunityDirList(customPollLinkFeed(customGisLinks[0]), { fetch: communityFetch });
assert.equal(customPollPlan.feed.id, "FWLX");
assert.equal(customPollPlan.newest.fileName, "FWLX20260613_003000");
const discoveredPlan = await fetchCommunityDirList(
  { id: "LARE", label: "Laredo EWR", state: "TX", lat: 27.5, lon: -99.5, pollUrl: "https://example.test/root" },
  { fetch: communityFetch },
);
assert.equal(discoveredPlan.prefix, "LARE/");
assert.equal(discoveredPlan.entries[0].path, "LARE/LARE20260613_010000");
const latestCommunity = await latestCommunityFrame(
  { id: "WILU", label: "WILU", state: "OK", lat: 35.3, lon: -97.4, pollUrl: "https://example.test/WILU" },
  { fetch: communityFetch },
);
assert.equal(latestCommunity.identity, "WILU20260613_002000");
const recentCommunity = await recentCommunityFrames(
  { id: "WILU", label: "WILU", state: "OK", lat: 35.3, lon: -97.4, pollUrl: "https://example.test/WILU" },
  2,
  { fetch: communityFetch },
);
assert.deepEqual(recentCommunity.map((frame) => frame.fileName), ["WILU20260613_001000", "WILU20260613_002000"]);

const families = colorFamilies();
assert.equal(families.length, 13);
assert.equal(colorFamilyForProduct("CREF"), "reflectivity");
assert.equal(colorFamilyForProduct("DSRV"), "velocity");
assert.equal(familyForPaletteProductCode("BV"), "velocity");
assert.equal(familyForPaletteProductCode("AZSHEAR"), "azimuthalShear");
assert.equal(paletteProductCodeForFamily("differentialPhase"), "PHI");

const paletteText = `
; community palette
Product: BV
Units: kt
Step: 10
RF: 82 21 86 245
Color4: -60 0 80 255 255 0 180 255 255
SolidColor: 0 30 30 30
Color: 60 255 50 0
`;
const parsedPalette = parseGrPalette(paletteText, { name: "Velocity Test" });
assert.equal(parsedPalette.type, "bowecho-palette-v1");
assert.equal(parsedPalette.name, "Velocity Test");
assert.equal(parsedPalette.productCode, "BV");
assert.equal(parsedPalette.family, "velocity");
assert.equal(parsedPalette.units, "kt");
assert.equal(parsedPalette.legendStep, 10);
assert.deepEqual(parsedPalette.rangeFolded, [82, 21, 86, 245]);
assert.equal(parsedPalette.stops.length, 3);
assert.deepEqual(parsedPalette.stops[0].color, [0, 80, 255, 255]);
assert.deepEqual(parsedPalette.stops[0].endColor, [0, 180, 255, 255]);
assert.equal(parsedPalette.stops[1].solid, true);
assert.equal(parsedPalette.warnings.length, 0);
const binding = paletteBinding(parsedPalette, "DVEL");
assert.equal(binding.family, "velocity");
assert.equal(binding.productCode, "BV");
assert.ok(binding.products.includes("DVEL"));
const exportedPalette = exportGrPalette(parsedPalette);
assert.ok(exportedPalette.includes("Product: BV"));
assert.ok(exportedPalette.includes("RF: 82 21 86 245"));
assert.ok(exportedPalette.includes("Color: -60 0 80 255 0 180 255"));
assert.equal(parseGrPalette(exportedPalette, { name: "Roundtrip" }).stops.length, 3);
const builtPalette = createPaletteFromStops([
  { value: 0, color: [0, 0, 0, 0], endColor: null, solid: false },
  { value: 50, color: [0, 220, 80, 255], endColor: null, solid: false },
  { value: 75, color: [255, 80, 0, 255], endColor: null, solid: false },
], { name: "Builder REF", family: "reflectivity", units: "dBZ" });
assert.equal(builtPalette.family, "reflectivity");
assert.equal(builtPalette.productCode, "BR");
assert.ok(builtPalette.id.startsWith("reflectivity:"));
assert.ok(palettePreviewCss(builtPalette).startsWith("linear-gradient(90deg"));
const serializedLibrary = serializePaletteLibrary([parsedPalette, builtPalette], { updatedAt: "2026-06-13T00:00:00Z" });
const roundtripLibrary = deserializePaletteLibrary(serializedLibrary);
assert.equal(roundtripLibrary.length, 2);
assert.equal(roundtripLibrary[1].name, "Builder REF");
const memoryStorage = new Map();
const paletteStore = createPaletteStore({
  key: "test-palettes",
  storage: {
    getItem: (key) => memoryStorage.get(key) || null,
    setItem: (key, value) => memoryStorage.set(key, value),
  },
});
const savedPalette = paletteStore.savePalette(builtPalette);
assert.equal(paletteStore.list().length, 1);
assert.equal(paletteStore.get(savedPalette.id).name, "Builder REF");
const importedStoredPalette = paletteStore.importText(paletteText, { name: "Stored Velocity", fileName: "stored.pal" });
assert.equal(importedStoredPalette.sourceName, "stored.pal");
assert.equal(paletteStore.list().length, 2);
assert.ok(paletteStore.exportText(importedStoredPalette.id).includes("Product: BV"));
assert.equal(paletteStore.removePalette(savedPalette.id), true);
assert.equal(paletteStore.clear().length, 0);

assert.equal(RADAR_SITES.length, 204, "site catalog should expose clickable Level II sites");
assert.equal(RADAR_SITES.some((site) => site.id === "AWPA2"), false, "profiler-only sites should be filtered");
assert.equal(RADAR_SITES.some((site) => site.id === "KTLX"), true, "KTLX should be available");

const ktlxGeoJson = radarSitesGeoJson({ query: "KTLX" });
assert.equal(ktlxGeoJson.type, "FeatureCollection");
assert.equal(ktlxGeoJson.features.length, 1);
assert.deepEqual(ktlxGeoJson.features[0].geometry.coordinates, [-97.2777, 35.3331]);

const renderedFrame = {
  frame: {
    id: "KTLX-20260613-000000",
    cacheKey: "archive:KTLX/mock:123",
    source: "archive",
    volumeTime: "2026-06-13T00:00:00Z",
  },
  meta: {
    site: "KTLX",
    volumeTime: "2026-06-13T00:00:00Z",
    selectedCut: 0,
    displayableCuts: [0],
    cuts: [],
  },
  rgba: new Uint8ClampedArray(512 * 512 * 4),
  width: 512,
  height: 512,
  elapsedMs: 3.25,
  cacheHit: true,
  renderOptions: {
    product: "REF",
    cut: 0,
    width: 512,
    height: 512,
    rangeKm: 230,
    smoothing: "native",
    stormDirDeg: 240,
    stormSpeedKt: 35,
  },
  imageData: null,
};

const texture = radarTextureLayer(renderedFrame, { site: "KTLX" });
assert.equal(texture.type, "bowecho-radar-texture-v1");
assert.equal(texture.image.width, 512);
assert.equal(texture.image.height, 512);
assert.equal(texture.image.rgba.byteLength, 512 * 512 * 4, "texture must preserve the full RGBA buffer");
assert.equal(texture.viewport.kmPerPxX, 460 / 512);
assert.equal(texture.viewport.kmPerPxY, 460 / 512);
assert.equal(texture.quad.length, 4);
assert.deepEqual(texture.quad[0].pixel, [0, 0]);
assert.equal(texture.quad[0].eastKm, -230);
assert.equal(texture.quad[0].northKm, 230);
assert.ok(texture.bounds.west < texture.site.lon && texture.bounds.east > texture.site.lon);
assert.ok(texture.bounds.south < texture.site.lat && texture.bounds.north > texture.site.lat);
assert.ok(texture.mercatorBounds.west < texture.mercatorBounds.east);
assert.ok(texture.mercatorBounds.south < texture.mercatorBounds.north);

const mapboxCoords = mapboxRadarCoordinates(texture);
assert.deepEqual(mapboxCoords[0], [texture.corners.nw.lon, texture.corners.nw.lat]);
assert.deepEqual(mapboxCoords[1], [texture.corners.ne.lon, texture.corners.ne.lat]);
assert.deepEqual(mapboxCoords[2], [texture.corners.se.lon, texture.corners.se.lat]);
assert.deepEqual(mapboxCoords[3], [texture.corners.sw.lon, texture.corners.sw.lat]);
const imageSource = mapboxRadarImageSource(texture, { url: "blob:mock-radar" });
assert.equal(imageSource.type, "image");
assert.equal(imageSource.url, "blob:mock-radar");
assert.deepEqual(imageSource.coordinates, mapboxCoords);
assert.throws(() => mapboxRadarImageSource(texture), /requires options\.url/);
const canvasSource = mapboxRadarCanvasSource(texture, "radar-canvas", { animate: true });
assert.equal(canvasSource.type, "canvas");
assert.equal(canvasSource.canvas, "radar-canvas");
assert.equal(canvasSource.animate, true);
const rasterLayer = mapboxRadarRasterLayer(texture, { sourceId: "radar-source", layerId: "radar-layer", opacity: 0.7, emissiveStrength: 1 });
assert.equal(rasterLayer.type, "raster");
assert.equal(rasterLayer.source, "radar-source");
assert.equal(rasterLayer.paint["raster-opacity"], 0.7);
assert.equal(rasterLayer.paint["raster-fade-duration"], 0);
assert.equal(rasterLayer.paint["raster-emissive-strength"], 1);
const layerSpecs = mapboxRadarLayerSpecs(texture, { canvas: "radar-canvas", sourceId: "radar-source" });
assert.equal(layerSpecs.sourceId, "radar-source");
assert.equal(layerSpecs.source.type, "canvas");
assert.equal(layerSpecs.layer.source, "radar-source");
const siteSource = mapboxRadarSiteSource({ query: "KTLX" });
assert.equal(siteSource.type, "geojson");
assert.equal(siteSource.data.features.length, 1);
const siteLayer = mapboxRadarSiteLayer({ sourceId: "radar-sites", radius: 5 });
assert.equal(siteLayer.source, "radar-sites");
assert.equal(siteLayer.paint["circle-radius"], 5);
const deckBitmap = deckRadarBitmapLayerProps(texture, { id: "deck-radar", opacity: 0.5 });
assert.equal(deckBitmap.id, "deck-radar");
assert.equal(deckBitmap.opacity, 0.5);
assert.equal(deckBitmap.image, texture.image.rgba);
assert.deepEqual(deckBitmap.bounds[0], [texture.corners.sw.lon, texture.corners.sw.lat]);
assert.equal(deckBitmap.textureParameters.minFilter, "nearest");
assert.equal(deckBitmap.textureParameters.magFilter, "nearest");
const deckBitmapBbox = deckRadarBitmapLayerProps(texture, { boundsFormat: "bbox" });
assert.deepEqual(deckBitmapBbox.bounds, [texture.bounds.west, texture.bounds.south, texture.bounds.east, texture.bounds.north]);
const deckSites = deckRadarSiteScatterplotLayerProps({ query: "KTLX", radiusMeters: 9000 });
assert.equal(deckSites.data.length, 1);
assert.deepEqual(deckSites.getPosition(deckSites.data[0]), [-97.2777, 35.3331]);
assert.equal(deckSites.getRadius(deckSites.data[0]), 9000);
const gpuUpload = webGpuRadarTextureUpload(texture, { id: "gpu-radar" });
assert.equal(gpuUpload.type, "bowecho-webgpu-texture-upload-v1");
assert.equal(gpuUpload.width, 512);
assert.equal(gpuUpload.height, 512);
assert.equal(gpuUpload.writeTexture.dataLayout.bytesPerRow, 512 * 4);
assert.equal(gpuUpload.writeTexture.data.byteLength, 512 * 512 * 4);
assert.deepEqual(gpuUpload.createTexture.size, [512, 512, 1]);

const redRgba = new Uint8ClampedArray(8 * 8 * 4);
const greenRgba = new Uint8ClampedArray(8 * 8 * 4);
for (let y = 3; y <= 5; y += 1) {
  for (let x = 3; x <= 5; x += 1) {
    redRgba.set([255, 0, 0, 255], (y * 8 + x) * 4);
    greenRgba.set([0, 255, 0, 220], (y * 8 + x) * 4);
  }
}
const redLayer = radarTextureLayer({
  ...renderedFrame,
  rgba: redRgba,
  width: 8,
  height: 8,
  renderOptions: {
    ...renderedFrame.renderOptions,
    width: 8,
    height: 8,
    rangeKm: 4,
  },
}, { site: "KTLX" });
const greenLayer = radarTextureLayer({
  ...renderedFrame,
  frame: { ...renderedFrame.frame, id: "KTLX-green" },
  rgba: greenRgba,
  width: 8,
  height: 8,
  renderOptions: {
    ...renderedFrame.renderOptions,
    width: 8,
    height: 8,
    rangeKm: 4,
  },
}, { site: "KTLX" });
const composite = compositeRadarLayers([redLayer, greenLayer], {
  bounds: redLayer.bounds,
  width: 8,
  height: 8,
  blendMode: "last",
});
assert.equal(composite.type, "bowecho-radar-composite-v1");
assert.equal(composite.image.width, 8);
assert.equal(composite.image.height, 8);
assert.equal(composite.image.rgba.byteLength, 8 * 8 * 4, "composite must preserve the requested full RGBA output");
assert.equal(composite.layers.length, 2);
assert.equal(composite.counts.layers, 2);
assert.ok(composite.counts.paintedPixels > 0, "composite should retain nontransparent radar pixels");
assert.ok(composite.image.rgba.some((value, index) => index % 4 === 1 && value === 255), "later green layer should be sampled");
assert.deepEqual(mapboxRadarCoordinates(composite), [
  [composite.corners.nw.lon, composite.corners.nw.lat],
  [composite.corners.ne.lon, composite.corners.ne.lat],
  [composite.corners.se.lon, composite.corners.se.lat],
  [composite.corners.sw.lon, composite.corners.sw.lat],
]);
assert.equal(webGpuRadarTextureUpload(composite).writeTexture.dataLayout.bytesPerRow, 8 * 4);

const pixelCenter = radarPixelToLonLat("KTLX", { x: 256, y: 256 }, { width: 512, height: 512, rangeKm: 230 });
assert.ok(Math.abs(pixelCenter.lon + 97.2777) < 1e-9);
assert.ok(Math.abs(pixelCenter.lat - 35.3331) < 1e-9);
assert.equal(pixelCenter.eastKm, 0);
assert.equal(pixelCenter.northKm, 0);

const offsetPoint = radarOffsetToLonLat("KTLX", { eastKm: 35, northKm: -20 });
const roundTrip = radarOffsetFromLonLat("KTLX", offsetPoint);
assert.ok(Math.abs(roundTrip.eastKm - 35) < 0.05, `east roundtrip ${roundTrip.eastKm}`);
assert.ok(Math.abs(roundTrip.northKm + 20) < 0.05, `north roundtrip ${roundTrip.northKm}`);

const mercator = lonLatToWebMercator(texture.site.lon, texture.site.lat);
assert.ok(Number.isFinite(mercator.x));
assert.ok(Number.isFinite(mercator.y));
const mercatorRoundtrip = webMercatorToLonLat(mercator.x, mercator.y);
assert.ok(Math.abs(mercatorRoundtrip.lon - texture.site.lon) < 1e-9);
assert.ok(Math.abs(mercatorRoundtrip.lat - texture.site.lat) < 1e-9);
assert.equal(worldPixelSize(0, 512), 512);
const worldPixel = lonLatToWorldPixel(texture.site.lon, texture.site.lat, { zoom: 6, tileSize: 512 });
const worldRoundtrip = worldPixelToLonLat(worldPixel.x, worldPixel.y, { zoom: 6, tileSize: 512 });
assert.ok(Math.abs(worldRoundtrip.lon - texture.site.lon) < 1e-9);
assert.ok(Math.abs(worldRoundtrip.lat - texture.site.lat) < 1e-9);

const mapView = normalizeMapView({ center: [texture.site.lon, texture.site.lat], zoom: 6, width: 1024, height: 768 });
assert.equal(mapView.type, "bowecho-map-view-v1");
assert.equal(mapView.width, 1024);
assert.equal(mapView.height, 768);
assert.ok(mapView.bounds.west < texture.site.lon && mapView.bounds.east > texture.site.lon);
assert.equal(mapView.antimeridian, false);
const fittedMapView = fitMapViewToLayer(texture, { width: 900, height: 600, padding: 24 });
assert.ok(fittedMapView.zoom > 5);
assert.ok(fittedMapView.bounds.west <= texture.bounds.west);
assert.ok(fittedMapView.bounds.east >= texture.bounds.east);
const pannedMapView = panMapView(mapView, { dx: 128, dy: 64 });
assert.ok(pannedMapView.center.lon > mapView.center.lon, "positive dx pans the map center east");
assert.ok(pannedMapView.center.lat < mapView.center.lat, "positive dy pans the map center south");
const zoomedMapView = zoomMapView(mapView, 1, { anchor: [256, 192] });
assert.equal(zoomedMapView.zoom, 7);
assert.equal(zoomedMapView.width, mapView.width);
const tileCover = mapTileCover(mapView, { urlTemplate: "https://tiles.example/{z}/{x}/{y}.png" });
assert.equal(tileCover.type, "bowecho-map-tile-cover-v1");
assert.ok(tileCover.count > 0);
assert.ok(tileCover.tiles.every((tile) => tile.url === `https://tiles.example/${tile.z}/${tile.x}/${tile.y}.png`));
const datelineView = normalizeMapView({ center: [179.9, 0], zoom: 2, width: 1600, height: 600 });
const datelineTiles = mapTileCover(datelineView);
assert.equal(datelineView.antimeridian, true);
assert.equal(datelineTiles.antimeridian, true);
assert.ok(datelineTiles.tiles.some((tile) => tile.rawX !== tile.x), "tile cover should wrap X across the antimeridian");
const quadMesh = radarLayerQuadMesh(texture, fittedMapView);
assert.equal(quadMesh.type, "bowecho-radar-quad-mesh-v1");
assert.equal(quadMesh.vertices.length, 4);
assert.deepEqual(quadMesh.indices, [0, 1, 2, 0, 2, 3]);
assert.deepEqual(quadMesh.vertices.map((vertex) => vertex.uv), [[0, 0], [1, 0], [1, 1], [0, 1]]);
assert.equal(quadMesh.image.rgba.byteLength, 512 * 512 * 4, "quad mesh must reference the full-resolution RGBA buffer");

const fakeMeta = {
  site: "KTLX",
  volumeTime: "2026-06-13T00:00:00Z",
  siteLocation: { lat: 35.3331, lon: -97.2777, elevationM: 370 },
  selectedCut: 0,
  displayableCuts: [0, 1],
  cuts: [
    {
      index: 0,
      elevationDeg: 0.5,
      elevationNumber: 1,
      radials: 720,
      moments: ["REF", "VEL", "SW", "ZDR", "RHO", "PHI"],
      displayable: true,
    },
    {
      index: 1,
      elevationDeg: 0.9,
      elevationNumber: 2,
      radials: 720,
      moments: ["REF", "VEL", "SW"],
      displayable: true,
    },
  ],
};

let lastRenderOptions = null;
let lastSectionOptions = null;
let lastNativeRhiOptions = null;
let fakeCacheLimits = {
  bytes: 32,
  volumes: 24,
  metadata: 128,
  renders: 160,
  sections: 96,
  nativeRhi: 96,
  diagnostics: 96,
  analyses: 128,
  torTracks: 128,
};
const fakeWorker = {
  async sniffBytes(bytes) {
    return {
      format: bytes.byteLength >= 3 && new TextDecoder().decode(bytes.slice(0, 3)) === "CDF" ? "cfradial-1" : "nexrad-level2",
      size: bytes.byteLength,
    };
  },
  async importBytes(bytes, options = {}) {
    return {
      frame: {
        id: options.id || options.fileName || "imported-frame",
        cacheKey: options.cacheKey || `local-bytes:${bytes.byteLength}`,
        source: options.source || "local-bytes",
        provider: options.provider || "browser-import",
        format: "nexrad-level2",
        fileName: options.fileName || null,
        site: "KTLX",
        size: bytes.byteLength,
        volumeTime: "2026-06-13T00:00:00Z",
      },
      summary: {
        type: "bowecho-volume-summary-v1",
        site: "KTLX",
        volumeTime: "2026-06-13T00:00:00Z",
        siteLocation: { lat: 35.3331, lon: -97.2777, elevationM: 370 },
        cutCount: 1,
        moments: ["REF", "VEL"],
        metadata: {
          archiveVersion: "NEXRAD Level II",
        },
      },
      elapsedMs: 1,
      cacheHit: false,
    };
  },
  async importByteParts(parts, options = {}) {
    const size = parts.reduce((sum, part) => sum + part.byteLength, 0);
    return {
      frame: {
        id: options.id || options.fileName || "imported-archive",
        cacheKey: options.cacheKey || `mobile-archive:${size}`,
        source: options.source || "mobile-archive",
        provider: options.provider || "browser-import",
        format: options.format || "mobile-archive-zip",
        fileName: options.fileName || null,
        site: "KTLX",
        size,
        volumeTime: "2026-06-13T00:00:00Z",
        merge: true,
        partCount: parts.length,
        archiveEntries: options.entries || [],
      },
      summary: {
        type: "bowecho-volume-summary-v1",
        site: "KTLX",
        volumeTime: "2026-06-13T00:00:00Z",
        siteLocation: { lat: 35.3331, lon: -97.2777, elevationM: 370 },
        cutCount: 1,
        moments: ["REF", "VEL"],
        metadata: {
          archiveVersion: "mobile archive",
        },
      },
      entries: options.entries || [],
      elapsedMs: 2,
      cacheHit: false,
    };
  },
  async meta() {
    return { meta: fakeMeta };
  },
  async diagnostics(frame) {
    assert.equal(frame.id, "fake-frame");
    return {
      diagnostics: {
        type: "bowecho-volume-diagnostics-v1",
        site: "KTLX",
        volumeTime: "2026-06-13T00:00:00Z",
        siteLocation: { lat: 35.3331, lon: -97.2777, elevationM: 370 },
        scanMode: "Ppi",
        vcp: { pattern: 212 },
        source: {
          path: null,
          archiveVersion: "NEXRAD Level II",
          compression: "bzip2",
          messageCount: 2400,
          decodedRadialCount: 720,
          skippedMessageCount: 0,
        },
        totals: {
          cutCount: 2,
          radialCount: 1096,
          maxRadialsPerCut: 720,
          maxGateCount: 1832,
          geometryGateSlots: (720 * 1832) + (376 * 950),
          momentGateSlots: (2 * 720 * 1832) + (2 * 376 * 950),
          validGateCount: (2 * 720 * 1832) + (2 * 376 * 950),
          missingGateCount: 0,
          rangeFoldedGateCount: 0,
          largestMomentGateSlots: 720 * 1832,
        },
        threeDimensional: {
          coordinateSpace: "radar-local-enu-km",
          source: "decoded-volume-gates",
          preservesGateResolution: true,
          largestMomentGateSlots: 720 * 1832,
          estimatedPositionBytes: 720 * 1832 * 12,
          estimatedValueBytes: 720 * 1832 * 4,
          estimatedColorBytes: 720 * 1832 * 4,
          recommendedVertexStrideBytes: 20,
          notes: ["Use cut/moment gate ranges to allocate buffers without downscaling radar gates."],
        },
        moments: [
          {
            moment: "REF",
            radialCount: 720,
            maxGateCount: 1832,
            gateSlots: 720 * 1832,
            validGateCount: 720 * 1832,
            missingGateCount: 0,
            rangeFoldedGateCount: 0,
            minValue: -32,
            maxValue: 94.5,
          },
          {
            moment: "VEL",
            radialCount: 720,
            maxGateCount: 1832,
            gateSlots: 720 * 1832,
            validGateCount: 720 * 1832,
            missingGateCount: 0,
            rangeFoldedGateCount: 0,
            minValue: -64,
            maxValue: 64,
          },
        ],
        cuts: [
          {
            index: 0,
            elevationDeg: 0.5,
            elevationNumber: 1,
            radialCount: 720,
            geometryGateSlots: 720 * 1832,
            azimuth: { minDeg: 0, maxDeg: 359.5, spanDeg: 359.5 },
            radialElevation: { minDeg: 0.5, maxDeg: 0.5, spanDeg: 0 },
            nyquistVelocityMps: { min: 23, max: 23 },
            gateRanges: [{ firstGateM: 0, gateSpacingM: 250, gateCount: 1832, radialCount: 720 }],
            gateRangeVariantCount: 1,
            moments: [
              {
                moment: "REF",
                radialCount: 720,
                gateRange: { firstGateM: 0, gateSpacingM: 250, gateCount: 1832 },
                gateSlots: 720 * 1832,
                validGateCount: 720 * 1832,
                missingGateCount: 0,
                rangeFoldedGateCount: 0,
                storageBits: 8,
                minValue: -32,
                maxValue: 94.5,
              },
            ],
            isRhiLike: false,
            isPpiLike: true,
            isSectorLike: false,
          },
          {
            index: 1,
            elevationDeg: null,
            elevationNumber: 2,
            radialCount: 376,
            geometryGateSlots: 376 * 950,
            azimuth: { minDeg: 245, maxDeg: 245, spanDeg: 0 },
            radialElevation: { minDeg: 0.5, maxDeg: 18.5, spanDeg: 18 },
            nyquistVelocityMps: { min: 20, max: 20 },
            gateRanges: [{ firstGateM: 0, gateSpacingM: 250, gateCount: 950, radialCount: 376 }],
            gateRangeVariantCount: 1,
            moments: [
              {
                moment: "REF",
                radialCount: 376,
                gateRange: { firstGateM: 0, gateSpacingM: 250, gateCount: 950 },
                gateSlots: 376 * 950,
                validGateCount: 376 * 950,
                missingGateCount: 0,
                rangeFoldedGateCount: 0,
                storageBits: 8,
                minValue: -20,
                maxValue: 72,
              },
              {
                moment: "VEL",
                radialCount: 376,
                gateRange: { firstGateM: 0, gateSpacingM: 250, gateCount: 950 },
                gateSlots: 376 * 950,
                validGateCount: 376 * 950,
                missingGateCount: 0,
                rangeFoldedGateCount: 0,
                storageBits: 16,
                minValue: -58,
                maxValue: 58,
              },
            ],
            isRhiLike: true,
            isPpiLike: false,
            isSectorLike: false,
          },
        ],
      },
      elapsedMs: 3,
      cacheHit: false,
    };
  },
  async render(frame, options) {
    assert.ok(["fake-frame", "imported-a", "mobile.zip"].includes(frame.id) || frame.id.startsWith("KTLX20260612_") || frame.id.startsWith("WILU-") || frame.id.startsWith("smhi-") || frame.id.startsWith("geosphere-") || frame.id.startsWith("shmu-") || frame.id.startsWith("dwd-") || frame.id.startsWith("chmi-") || frame.id.startsWith("jma-") || frame.id.startsWith("ord-") || frame.id.startsWith("dmi-") || frame.id.startsWith("fmi-"), `unexpected render frame ${frame.id}`);
    assert.ok(["REF", "DVEL"].includes(options.product));
    lastRenderOptions = options;
    return {
      meta: {
        ...fakeMeta,
        selectedCut: options.cut,
      },
      rgba: new Uint8Array(options.width * options.height * 4),
      width: options.width,
      height: options.height,
      elapsedMs: 0,
      cacheHit: false,
    };
  },
  async crossSection(frame, options) {
    assert.equal(frame.id, "fake-frame");
    lastSectionOptions = options;
    return {
      meta: {
        type: "bowecho-cross-section-v1",
        site: "KTLX",
        volumeTime: "2026-06-13T00:00:00Z",
        product: options.product,
        units: options.product === "REF" ? "dBZ" : "m/s",
        colorFamily: options.paletteFamily || colorFamilyForProduct(options.product),
        source: "reconstructed-volume",
        width: options.width,
        height: options.height,
        topKm: options.topKm,
        lengthKm: Math.hypot(options.endEastKm - options.startEastKm, options.endNorthKm - options.startNorthKm),
        start: { eastKm: options.startEastKm, northKm: options.startNorthKm },
        end: { eastKm: options.endEastKm, northKm: options.endNorthKm },
        valueRange: { min: 0, max: 60, finite: options.width * options.height },
      },
      rgba: new Uint8Array(options.width * options.height * 4),
      width: options.width,
      height: options.height,
      elapsedMs: 1,
      cacheHit: false,
    };
  },
  async nativeRhi(frame, options) {
    assert.equal(frame.id, "fake-frame");
    lastNativeRhiOptions = options;
    const nativeWidth = 950;
    const nativeHeight = 376;
    const width = options.width || nativeWidth;
    const height = options.height || nativeHeight;
    if (!options.allowDownscale && (width < nativeWidth || height < nativeHeight)) {
      throw new Error("native RHI downscale requires allowDownscale");
    }
    return {
      meta: {
        type: "bowecho-native-rhi-v1",
        site: "KTLX",
        volumeTime: "2026-06-13T00:00:00Z",
        product: options.product,
        units: options.product === "REF" ? "dBZ" : "m/s",
        colorFamily: options.paletteFamily || colorFamilyForProduct(options.product),
        source: "native-rhi-sweep",
        scanMode: "Rhi",
        rhiLike: true,
        cutIndex: options.cut,
        fixedAzimuthDeg: 245,
        width,
        height,
        topKm: options.topKm || 18.5,
        maxRangeKm: options.maxRangeKm || 237.5,
        native: {
          width: nativeWidth,
          height: nativeHeight,
          gateCount: nativeWidth,
          radialCount: nativeHeight,
          preservesGateResolution: width >= nativeWidth && height >= nativeHeight,
          allowDownscale: Boolean(options.allowDownscale),
        },
        coverage: { topKm: options.topKm || 18.5, maxRangeKm: options.maxRangeKm || 237.5 },
        gateRange: { firstGateM: 0, gateSpacingM: 250, gateCount: nativeWidth },
        valueRange: { min: -20, max: 72, finite: nativeWidth * nativeHeight },
      },
      rgba: new Uint8Array(width * height * 4),
      width,
      height,
      elapsedMs: 1,
      cacheHit: false,
    };
  },
  async analysis(frame) {
    assert.equal(frame.id, "fake-frame");
    return {
      analysis: {
        type: "bowecho-analysis-v1",
        site: "KTLX",
        volumeTime: "2026-06-13T00:00:00Z",
        siteLocation: { lat: 35.3331, lon: -97.2777, elevationM: 370 },
        cells: [
          {
            id: "C1",
            eastKm: 25,
            northKm: -10,
            maxDbz: 63,
            areaKm2: 44,
            eqRadiusKm: 3.7,
            mass: 12345,
            hlevelDbz: 48,
          },
        ],
        rotations: [
          {
            id: "R1",
            azimuthDeg: 90,
            rangeKm: 35,
            eastKm: 35,
            northKm: 0,
            vrotMps: 32,
            gateToGateDvMps: 64,
            rank: 7,
            depthTilts: 4,
            depthKm: 5.2,
            baseElevationDeg: 0.5,
            strength: "tvs",
          },
        ],
        rotationTilts: [
          { elevationDeg: 0.5, featureCount: 2, bestRank: 7 },
        ],
        counts: {
          cells: 1,
          rotations: 1,
          rotationTilts: 1,
        },
      },
      elapsedMs: 4,
      cacheHit: false,
    };
  },
  async torTracksFrame(frame, options) {
    assert.equal(frame.id, "fake-frame");
    const width = Math.round((options.halfExtentKm * 2) / options.cellKm);
    const height = width;
    const values = new Float32Array(width * height);
    values.fill(Number.NaN);
    values[Math.floor(values.length / 2)] = 9;
    const rgba = new Uint8Array(width * height * 4);
    rgba.set([255, 230, 70, 205], Math.floor(values.length / 2) * 4);
    return {
      meta: {
        type: "bowecho-tor-tracks-frame-v1",
        site: options.site || "KTLX",
        volumeTime: "2026-06-13T00:00:00Z",
        grid: {
          width,
          height,
          halfExtentKm: options.halfExtentKm,
          cellKm: options.cellKm,
          kmPerPxX: (options.halfExtentKm * 2) / width,
          kmPerPxY: (options.halfExtentKm * 2) / height,
          bounds: {
            westKm: -options.halfExtentKm,
            southKm: -options.halfExtentKm,
            eastKm: options.halfExtentKm,
            northKm: options.halfExtentKm,
          },
        },
        units: "1e-3/s",
        source: "low-level-azimuthal-shear",
        valueRange: { min: 9, max: 9, finite: 1, painted: 1 },
        tds: [
          { id: "T1", eastKm: 35, northKm: 0, cc: 0.61, dbz: 48 },
        ],
        counts: {
          rotations: 1,
          tds: 1,
        },
      },
      rgba,
      values,
      width,
      height,
      elapsedMs: 2,
      cacheHit: false,
    };
  },
  async torTracksLoop(frames, options) {
    const tracks = [];
    for (const [index, frame] of frames.entries()) {
      const rendered = await this.torTracksFrame(frame, options);
      tracks.push({
        ...rendered,
        frame,
        meta: {
          ...rendered.meta,
          type: "bowecho-tor-tracks-loop-frame-v1",
          frameIndex: index,
          frameCount: frames.length,
          accumulatedFrames: index + 1,
          tds: rendered.meta.tds.map((gate) => ({
            ...gate,
            frameIndex: index,
            frameId: frame.id,
            volumeTime: frame.volumeTime || rendered.meta.volumeTime,
          })),
        },
      });
    }
    return {
      tracks,
      elapsedMs: 3,
      cacheHit: false,
    };
  },
  async configureCache(options = {}) {
    fakeCacheLimits = {
      ...fakeCacheLimits,
      ...Object.fromEntries(
        Object.entries(options)
          .filter(([key]) => key in fakeCacheLimits)
          .map(([key, value]) => [key, Math.trunc(Number(value))])
      ),
    };
    return {
      bytes: 1,
      volumes: 1,
      metadata: 1,
      renders: 1,
      sections: 1,
      nativeRhi: 1,
      diagnostics: 1,
      analyses: 1,
      torTracks: 1,
      limits: { ...fakeCacheLimits },
      maxBytes: fakeCacheLimits.bytes,
      maxVolumes: fakeCacheLimits.volumes,
      maxMetadata: fakeCacheLimits.metadata,
      maxRenders: fakeCacheLimits.renders,
      maxSections: fakeCacheLimits.sections,
      maxNativeRhi: fakeCacheLimits.nativeRhi,
      maxDiagnostics: fakeCacheLimits.diagnostics,
      maxAnalyses: fakeCacheLimits.analyses,
      maxTorTracks: fakeCacheLimits.torTracks,
    };
  },
  async warm(frames, options = {}) {
    return {
      frames: frames.map((frame) => ({
        frameId: frame.id,
        cacheKey: frame.cacheKey,
        byteCacheHit: false,
        volumeCacheHit: true,
        metaCacheHit: options.metadata === false ? null : false,
        site: "KTLX",
        volumeTime: frame.volumeTime || "2026-06-13T00:00:00Z",
        elapsedMs: 1,
      })),
      warmed: frames.length,
      failed: 0,
      elapsedMs: frames.length,
      stats: await this.configureCache(),
    };
  },
  async stats() {
    return this.configureCache();
  },
  async clear() {
    return { cleared: true };
  },
};

const toolbox = createRadarToolbox({ workerClient: fakeWorker });
assert.equal(toolbox.products().length, 21);
assert.equal(toolbox.product("DVEL").group, "velocity");
assert.ok(toolbox.frameProviders().some((provider) => provider.id === "browser-import"));
assert.ok(toolbox.supportedByteFormats().some((format) => format.id === "dorade"));
assert.equal(toolbox.colorFamilies().length, 13);
assert.equal(toolbox.colorFamilyForProduct("REF"), "reflectivity");
assert.equal(toolbox.parsePalette(paletteText, { name: "Via Toolbox" }).family, "velocity");
assert.ok(toolbox.exportPalette(parsedPalette).includes("Product: BV"));
assert.equal(toolbox.validatePalette(parsedPalette), true);
assert.equal(toolbox.paletteBinding(parsedPalette, "SRV").family, "velocity");
assert.equal(toolbox.clonePalette(builtPalette).name, "Builder REF");
assert.ok(toolbox.palettePreviewCss(builtPalette).includes("rgba("));
assert.equal(toolbox.deserializePaletteLibrary(toolbox.serializePaletteLibrary([builtPalette])).length, 1);
assert.equal(toolbox.createPaletteStore({ initialPalettes: [builtPalette] }).list().length, 1);
assert.equal(toolbox.sites({ query: "KTLX" })[0].id, "KTLX");
assert.equal(toolbox.sitesGeoJson({ query: "KTLX" }).features.length, 1);
assert.equal(toolbox.radarSourceCatalog({ query: "SMHI" })[0].id, "smhi");
assert.equal(toolbox.internationalRadarSites({ providerId: "dwd" }).length, 17);
assert.equal(toolbox.internationalRadarProvider("smhi").capabilities.browserPlanner, true);
assert.equal(toolbox.internationalRadarSite("smhi", "angelholm").id, "angelholm");
assert.equal(toolbox.smhiQcvolCatalogUrl("angelholm").includes("/area/angelholm/product/qcvol"), true);
assert.equal(toolbox.parseSmhiAreaCatalog(smhiAreas).length, 2);
assert.equal(toolbox.parseSmhiQcvolCatalog("angelholm", smhiQcvol).length, 3);
assert.equal(toolbox.smhiFramePlanFromCatalog("angelholm", smhiQcvol).identity, "radar_angelholm_qcvol_202606120635");
assert.equal((await toolbox.latestInternationalFrame("smhi", "angelholm", { fetch: smhiFetch })).provider, "smhi");
assert.equal(toolbox.internationalRadarProvider("geosphere").capabilities.browserPlanner, true);
assert.equal(toolbox.internationalRadarSite("geosphere", "hochficht").id, "hochficht");
assert.equal(toolbox.geosphereStartAfterKey("2026-06-12T18:35:00Z", 12).endsWith("WXRHOF_202606120635.hdf"), true);
assert.equal(toolbox.geosphereVolumeListingUrl({ now: "2026-06-12T18:35:00Z" }).includes("start-after="), true);
assert.equal(toolbox.parseGeosphereVolumeListing(geosphereListing).length, 3);
assert.equal(toolbox.geosphereFramePlanFromListing(geosphereListing).identity, "WXRHOF_202606120635.hdf");
assert.equal((await toolbox.latestInternationalFrame("geosphere", "hochficht", { fetch: geosphereFetch, now: "2026-06-12T18:35:00Z" })).provider, "geosphere");
assert.equal(toolbox.internationalRadarProvider("shmu").capabilities.browserPlanner, true);
assert.equal(toolbox.internationalRadarSite("shmu", "skjav").id, "skjav");
assert.equal(toolbox.shmuProductCatalogUrl("skjav", "dBZ").endsWith("/skjav/dBZ/"), true);
assert.equal(toolbox.parseShmuDateListing(shmuDatesHtml).length, 2);
assert.equal(toolbox.parseShmuFileListing("skjav", "V", "20260612", shmuVHtml).length, 2);
assert.equal(toolbox.shmuFramePlanFromProductFiles("skjav", shmuFiles).merge, true);
assert.equal((await toolbox.latestInternationalFrame("shmu", "skjav", { fetch: shmuFetch })).provider, "shmu");
assert.equal(toolbox.internationalRadarProvider("dwd").capabilities.browserPlanner, true);
assert.equal(toolbox.internationalRadarSite("dwd", "asb").id, "asb");
assert.equal(toolbox.dwdProductSweepListingUrl("asb", "sweep_vol_z", "unfiltered").endsWith("/sweep_vol_z/asb/unfiltered/"), true);
assert.equal(toolbox.parseDwdSweepListing("asb", "sweep_vol_z", "th", dwdZHtml, { baseUrl: "https://opendata.dwd.de/weather/radar/sites/sweep_vol_z/asb/unfiltered/" }).length, 21);
assert.equal(toolbox.dwdFramePlanFromProductSweeps("asb", dwdSweeps).merge, true);
assert.equal((await toolbox.latestInternationalFrame("dwd", "asb", { fetch: dwdFetch })).provider, "dwd");
assert.equal(toolbox.internationalRadarProvider("chmi").capabilities.browserPlanner, true);
assert.equal(toolbox.internationalRadarSite("chmi", "brd").id, "brd");
assert.equal(toolbox.chmiProductHdf5ListingUrl("brd", "vol_z").endsWith("/brd/vol_z/hdf5/"), true);
assert.equal(toolbox.parseChmiFileListing("brd", "vol_v", chmiFileHtml(chmiVNames)).length, 12);
assert.equal(toolbox.chmiFramePlanFromProductFiles("brd", chmiFiles).merge, true);
assert.equal((await toolbox.latestInternationalFrame("chmi", "brd", { fetch: chmiFetch, includeDualPol: false })).provider, "chmi");
assert.equal(toolbox.internationalRadarProvider("ord").capabilities.browserPlanner, true);
assert.equal(toolbox.internationalRadarSite("ord", "nlhrw").id, "nlhrw");
assert.equal(toolbox.ordBucketBaseUrl(), "https://s3.waw3-1.cloudferro.com/openradar-24h");
assert.equal(toolbox.ordHourListingUrl("nlhrw", "PVOL", "2026-06-12T14:07:30Z").includes("NL%2Fnlhrw%2FPVOL"), true);
assert.equal(toolbox.parseOrdObjectKey("nlhrw", ordNlhrwKeys[1]).stamp, "20260612T1455");
assert.equal(toolbox.ordFramePlanFromKeys("nlhrw", "PVOL", ordNlhrwKeys).identity, ordNlhrwPlan.identity);
assert.equal((await toolbox.latestInternationalFrame("ord", "nlhrw", { fetch: ordFetch, now: "2026-06-12T14:59:00Z" })).provider, "ord");
assert.equal(toolbox.internationalRadarProvider("dmi").capabilities.browserPlanner, true);
assert.equal(toolbox.internationalRadarSite("dmi", "06177").id, "06177");
assert.equal(toolbox.dmiVolumeItemsUrl("06177").includes("stationId=06177"), true);
assert.equal(toolbox.parseDmiVolumeItems(dmiItems).length, 3);
assert.equal(toolbox.dmiFramePlanFromItems("06177", dmiItems).site.label, "Stevns");
assert.equal((await toolbox.latestInternationalFrame("dmi", "06177", { fetch: dmiFetch })).provider, "dmi");
assert.equal(toolbox.internationalRadarProvider("fmi").capabilities.browserPlanner, true);
assert.equal(toolbox.s3StyleListingUrl("https://bucket.example", { prefix: "a/b/" }).includes("prefix=a%2Fb%2F"), true);
assert.equal(toolbox.parseS3StyleListing(fmiTodayListing).keys.length, 4);
assert.equal(toolbox.nexradArchiveDatePrefix("ktlx", "2026-06-12"), "2026/06/12/KTLX/");
assert.equal(toolbox.parseNexradArchiveListing("KTLX", "2026-06-12", nexradArchiveXml).length, 3);
assert.equal(toolbox.archiveFrameWindow(nexradFrames, { index: 1, frameCount: 2 }).selectedFrame.id, "KTLX20260612_063000_V06");
const nexradArchiveFetch = async (url) => {
  assert.ok(String(url).includes("prefix=2026%2F06%2F12%2FKTLX%2F"));
  return { ok: true, status: 200, statusText: "OK", text: async () => nexradArchiveXml };
};
const toolboxArchiveFrames = await toolbox.archiveFramesForDate("KTLX", "2026-06-12", { fetch: nexradArchiveFetch });
assert.deepEqual(toolboxArchiveFrames.map((frame) => frame.id), nexradFrames.map((frame) => frame.id));
const toolboxArchiveWindow = await toolbox.archiveLoopFramesForDate("KTLX", "2026-06-12", {
  fetch: nexradArchiveFetch,
  targetTime: "2026-06-12T06:36:00Z",
  frameCount: 2,
});
assert.deepEqual(toolboxArchiveWindow.frames.map((frame) => frame.id), [
  "KTLX20260612_063000_V06",
  "KTLX20260612_063500_V06",
]);
const loadedArchiveLoop = await toolbox.loadArchiveLoop("KTLX", "2026-06-12", {
  fetch: nexradArchiveFetch,
  targetTime: "2026-06-12T06:36:00Z",
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
});
assert.equal(loadedArchiveLoop.mode, "archive");
assert.equal(loadedArchiveLoop.source, "archive");
assert.equal(loadedArchiveLoop.length, 2);
assert.equal(loadedArchiveLoop.archiveWindow.selectedFrame.id, "KTLX20260612_063500_V06");
assert.equal(toolbox.spcConvectiveDate("2026-06-13T03:30:00Z"), "2026-06-12");
assert.equal(toolbox.parseSpcReportsCombined("2026-06-12", spcCombinedReports).length, 3);
assert.equal(toolbox.parseSpcTornadoSegments("2011-04-27", wcmTornCsv)[0].efLabel, "EF4");
assert.equal(toolbox.eventArchivePlanForTrack(tornadoSegments[0], { frames: eventFrames }).archiveDate, "2011-04-27");
assert.equal((await toolbox.fetchSpcEventDay("2011-04-27", { fetch: spcFetch, includeConsolidated: false })).segments.length, 1);
assert.equal(toolbox.spcOutlookKinds()[0].id, "cat");
assert.equal(toolbox.spcOutlookLiveUrls(1, "cat", { now: "2026-06-13T06:30:00Z" }).length, 2);
assert.equal(toolbox.spcOutlookArchiveUrls("2026-06-13", 1, "cat").length, 5);
assert.equal(toolbox.spcOutlookUrls({ day: 1, kind: "cat", now: "2026-06-13T12:30:00Z" }).length, 1);
assert.equal(toolbox.parseSpcOutlook(spcOutlookSample, { kind: "cat" })[0].stroke, "#DDAA00");
assert.equal(toolbox.spcOutlookFeatureCollection(outlookFeatures).features.length, 2);
assert.equal((await toolbox.fetchSpcOutlook(1, "cat", {
  fetch: async () => ({ ok: true, status: 200, statusText: "OK", text: async () => spcOutlookSample }),
  now: "2026-06-13T12:30:00Z",
})).features.length, 2);
assert.equal((await toolbox.fetchSpcOutlooks(["cat"], {
  fetch: async () => ({ ok: true, status: 200, statusText: "OK", text: async () => spcOutlookSample }),
  now: "2026-06-13T12:30:00Z",
})).outlooks.length, 1);
assert.equal(toolbox.fmiDatePrefix("20260612"), "2026/06/12/");
assert.equal(toolbox.fmiRadarVolumeListingUrl("fianj", { datePrefix: "2026/06/12" }).includes("fianj"), true);
assert.equal(toolbox.parseFmiVolumeListing("fianj", fmiTodayListing).length, 3);
assert.equal(toolbox.fmiFramePlanFromListing("fianj", fmiTodayListing).identity, "202606120635_fianj_PVOL.h5");
assert.equal((await toolbox.latestInternationalFrame("fmi", "fianj", { fetch: fmiFetch, now: "2026-06-12T06:40:00Z" })).provider, "fmi");
assert.equal(toolbox.communityRadarFeeds({ state: "ND" }).length, 3);
assert.equal(toolbox.communityRadarFeed("WILU").id, "WILU");
assert.equal(toolbox.communityRadarMarkers({ query: "Norman" })[0].feedIds.length, 8);
assert.equal(toolbox.normalizeCustomPollUrl("example.com/custom/"), "http://example.com/custom");
assert.equal(toolbox.pollUrlsMatch("https://example.com/FWLX/", "https://EXAMPLE.com/fwlx"), true);
assert.equal(toolbox.pollUrlName("https://example.com/mobile/FWLX/"), "FWLX");
assert.equal(toolbox.parseCustomPollMarkerInputs("", "").hasMarker, false);
assert.equal(toolbox.customPollEntryLatLon(customGisLinks[0]).lat, 35.254);
assert.equal(toolbox.customPollEntryLabel({ siteId: "DOW7", pollUrl: "https://example.com/dow7" }), "DOW7");
assert.equal(toolbox.customPollUrlForGisSite("https://example.com/{site}", "FWLX"), "https://example.com/FWLX");
assert.equal(toolbox.parseCustomRadarGis(customGisText).length, 3);
assert.equal(toolbox.customPollLinksFromGis("fwlx,fwlx,35.254,-87.325,220,1,TN,WLX", "https://example.com/raw")[0].pollUrl, "https://example.com/raw");
assert.equal(toolbox.normalizeCustomPollLink("example.com/raw/fwlx").pollUrl, "http://example.com/raw/fwlx");
assert.equal(toolbox.customPollLinkFeed(customGisLinks[0]).id, "FWLX");
assert.equal(toolbox.customPollLinksAsFeeds(customGisLinks).length, 2);
assert.equal(toolbox.upsertCustomPollLink([], customGisLinks[0]).updated, false);
assert.equal(toolbox.customPollMarkers(customGisLinks).length, 2);
assert.equal(toolbox.customPollLinksGeoJson(customGisLinks).features.length, 2);
assert.equal(toolbox.parseCommunityDirList(communityListing).length, 3);
assert.equal(toolbox.newestCommunityDirListEntry(communityListing).fileName, "WILU20260613_002000");
assert.deepEqual(toolbox.parseGrLevel2CfgSites("Site: WILU\nSite: LARE\n"), ["WILU", "LARE"]);
assert.equal((await toolbox.latestCommunityFrame(
  { id: "WILU", label: "WILU", state: "OK", lat: 35.3, lon: -97.4, pollUrl: "https://example.test/WILU" },
  { fetch: communityFetch },
)).feedId, "WILU");
assert.ok(toolbox.globalRadarSites({ source: "international", country: "Japan" }).length >= 20);
assert.equal(toolbox.globalRadarSitesGeoJson({ source: "community" }).features.length, 12);
assert.equal(toolbox.mapboxGlobalRadarSiteSource({ source: "nexrad", query: "KTLX" }).data.features.length, 1);
assert.equal(toolbox.deckGlobalRadarSiteScatterplotLayerProps({ source: "international", providerId: "chmi" }).data.length, 2);
assert.equal(toolbox.nearestRadarSite([-97.2777, 35.3331], { source: "nexrad", maxDistanceKm: 1 }).id, "KTLX");
assert.equal(toolbox.radarSiteSourceSummary({ source: "international" }).providers.jma, 20);
assert.deepEqual(cutChoicesFromMetadata(fakeMeta).map((cut) => cut.label), ["0.5 deg #1", "0.9 deg #2"]);
assert.equal(cutChoicesFromMetadata(fakeMeta, { selectedCut: 1 })[1].selected, true);
assert.equal(toolbox.cutChoices({ meta: fakeMeta, cut: 1 })[1].selected, true);
const productChoices = productChoicesFromMetadata(fakeMeta, { selectedProduct: "DVEL", selectedCut: 1 });
assert.equal(productChoices.find((product) => product.id === "DVEL").available, true);
assert.deepEqual(productChoices.find((product) => product.id === "DVEL").cutIndexes, [0, 1]);
assert.equal(productChoices.find((product) => product.id === "DVEL").defaultCut, 1);
assert.equal(productChoices.find((product) => product.id === "CC").available, true, "RHO metadata should advertise CC");
assert.deepEqual(productChoices.find((product) => product.id === "CC").cutIndexes, [0]);
assert.equal(productChoices.find((product) => product.id === "KDP").available, false);
assert.equal(productChoices.find((product) => product.id === "CREF").cutIndependent, true);
assert.equal(productChoicesFromMetadata(fakeMeta, { availableOnly: true }).every((product) => product.available), true);
const capabilityHints = capabilityHintsFromMetadata(fakeMeta, { selectedProduct: "DVEL", selectedCut: 1 });
assert.equal(capabilityHints.type, "bowecho-capability-hints-v1");
assert.equal(capabilityHints.availableProducts.includes("DVEL"), true);
assert.equal(capabilityHints.availableProducts.includes("KDP"), false);
assert.equal(capabilityHints.can.velocity, true);
assert.equal(capabilityHints.can.dualPol, true);
assert.equal(capabilityHints.can.torTracks, true);
assert.equal(capabilityHints.recommendedWarmProducts[0], "DVEL");
assert.equal(toolbox.productChoices({ meta: fakeMeta, product: "REF" }).find((product) => product.id === "VEL").available, true);
assert.equal(toolbox.capabilityHints({ meta: fakeMeta, product: "REF" }).can.crossSection, true);
assert.equal(toolbox.mapboxImageSource(texture, { url: "blob:toolbox" }).type, "image");
assert.equal(toolbox.mapboxCanvasSource(texture, "toolbox-canvas").canvas, "toolbox-canvas");
assert.equal(toolbox.deckBitmapLayerProps(texture).textureParameters.magFilter, "nearest");
assert.equal(toolbox.webGpuTextureUpload(texture).writeTexture.dataLayout.rowsPerImage, 512);
assert.ok(Math.abs(toolbox.webMercatorToLonLat(mercator.x, mercator.y).lat - texture.site.lat) < 1e-9);
assert.equal(toolbox.mapView({ center: [texture.site.lon, texture.site.lat], zoom: 6 }).type, "bowecho-map-view-v1");
assert.equal(toolbox.fitMapViewToLayer(texture, { width: 640, height: 480 }).width, 640);
assert.ok(toolbox.panMapView(mapView, [16, 0]).center.lon > mapView.center.lon);
assert.equal(toolbox.zoomMapView(mapView, 0.5).zoom, 6.5);
assert.ok(toolbox.mapTileCover(mapView).count > 0);
assert.equal(toolbox.radarLayerQuadMesh(texture, mapView).vertices.length, 4);
const sniffed = await toolbox.sniffBytes(new Uint8Array([0x41, 0x52, 0x32, 0x56]));
assert.equal(sniffed.format, "nexrad-level2");
assert.equal(sniffed.size, 4);
const sniffedZip = await toolbox.sniffBytes(mobileZip);
assert.equal(sniffedZip.format, "mobile-archive-zip");
assert.equal(sniffedZip.size, mobileZip.byteLength);
assert.equal(toolbox.supportedArchiveFormats()[0].id, "mobile-archive-zip");
assert.equal(toolbox.isZipBytes(mobileZip), true);
assert.equal(toolbox.parseZipDirectory(mobileZip).length, 3);
assert.equal((await toolbox.extractMobileArchiveEntries(mobileZip)).length, 2);
const imported = await toolbox.importBytesFrame(new Uint8Array([1, 2, 3, 4]), {
  id: "imported-a",
  fileName: "mock-level2.ar2v",
});
assert.equal(imported.frame.source, "local-bytes");
assert.equal(imported.frame.provider, "browser-import");
assert.equal(imported.frame.fileName, "mock-level2.ar2v");
assert.equal(imported.summary.type, "bowecho-volume-summary-v1");
assert.equal(imported.summary.cutCount, 1);
const importedArchive = await toolbox.importMobileArchiveFrame(mobileZip, {
  id: "mobile.zip",
  fileName: "mobile.zip",
});
assert.equal(importedArchive.frame.source, "mobile-archive");
assert.equal(importedArchive.frame.format, "mobile-archive-zip");
assert.equal(importedArchive.frame.merge, true);
assert.equal(importedArchive.frame.partCount, 2);
assert.deepEqual(importedArchive.entries.map((entry) => entry.fileName), [
  "20260612_145500.SWP",
  "20260612_145530.SWP",
]);
const importedArchiveViaFile = await toolbox.importFileFrame({
  name: "mobile.zip",
  arrayBuffer: async () => mobileZip.buffer.slice(mobileZip.byteOffset, mobileZip.byteOffset + mobileZip.byteLength),
});
assert.equal(importedArchiveViaFile.frame.source, "mobile-archive");
const customUrlFrame = toolbox.frameFromUrl("https://example.test/radar.odim.h5", {
  format: "odim-h5",
  site: "abcd",
});
assert.equal(customUrlFrame.source, "custom-url");
assert.equal(customUrlFrame.format, "odim-h5");
assert.equal(customUrlFrame.site, "ABCD");

const sdkRendered = await toolbox.renderFrame(
  { id: "fake-frame", cacheKey: "fake-frame", source: "archive" },
  { product: "REF", cut: 0, width: 16, height: 8, rangeKm: 80 },
);
assert.equal(sdkRendered.width, 16);
assert.equal(sdkRendered.height, 8);
assert.equal(sdkRendered.rgba.byteLength, 16 * 8 * 4);
assert.equal(sdkRendered.renderOptions.width, 16);
assert.equal(sdkRendered.renderOptions.height, 8);
assert.equal(sdkRendered.renderOptions.rangeKm, 80);

const paletteRendered = await toolbox.renderFrame(
  { id: "fake-frame", cacheKey: "fake-frame-palette", source: "archive" },
  { product: "REF", cut: 0, width: 8, height: 8, rangeKm: 40, palette: parsedPalette },
);
assert.equal(lastRenderOptions.paletteFamily, "reflectivity");
assert.ok(lastRenderOptions.paletteText.includes("Product: BR"));
assert.ok(lastRenderOptions.paletteKey.startsWith("reflectivity:"));
assert.equal(paletteRendered.renderOptions.paletteFamily, "reflectivity");
assert.equal(paletteRendered.renderOptions.paletteText.includes("Product: BR"), true);
assert.equal(paletteRendered.rgba.byteLength, 8 * 8 * 4);

const volumeDiagnostics = await toolbox.volumeDiagnostics(
  { id: "fake-frame", cacheKey: "fake-frame-diagnostics", source: "archive", volumeTime: "2026-06-13T00:00:00Z" },
);
assert.equal(volumeDiagnostics.type, "bowecho-volume-diagnostics-v1");
assert.equal(volumeDiagnostics.frame.id, "fake-frame");
assert.equal(volumeDiagnostics.cacheHit, false);
assert.equal(volumeDiagnostics.scanMode, "Ppi");
assert.equal(volumeDiagnostics.totals.cutCount, 2);
assert.equal(volumeDiagnostics.totals.largestMomentGateSlots, 720 * 1832);
assert.equal(volumeDiagnostics.threeDimensional.preservesGateResolution, true);
assert.equal(volumeDiagnostics.threeDimensional.recommendedVertexStrideBytes, 20);
assert.equal(volumeDiagnostics.cuts[0].isPpiLike, true);
assert.equal(volumeDiagnostics.cuts[0].moments[0].storageBits, 8);
assert.equal(volumeDiagnostics.cuts[1].isRhiLike, true);
assert.equal(volumeDiagnostics.cuts[1].moments.some((moment) => moment.moment === "REF"), true);

const crossSectionEnd = radarOffsetToLonLat("KTLX", { eastKm: 55, northKm: 20 });
const renderedSection = await toolbox.renderCrossSection(
  { id: "fake-frame", cacheKey: "fake-frame-xsection", source: "archive", volumeTime: "2026-06-13T00:00:00Z" },
  {
    site: "KTLX",
    product: "REF",
    width: 32,
    height: 12,
    topKm: 16,
    start: [-45, -10],
    end: crossSectionEnd,
    palette: parsedPalette,
  },
);
assert.equal(renderedSection.meta.type, "bowecho-cross-section-v1");
assert.equal(renderedSection.width, 32);
assert.equal(renderedSection.height, 12);
assert.equal(renderedSection.rgba.byteLength, 32 * 12 * 4, "cross-section must preserve the full RGBA panel");
assert.equal(lastSectionOptions.product, "REF");
assert.equal(lastSectionOptions.startEastKm, -45);
assert.equal(lastSectionOptions.startNorthKm, -10);
assert.ok(Math.abs(lastSectionOptions.endEastKm - 55) < 0.05);
assert.ok(Math.abs(lastSectionOptions.endNorthKm - 20) < 0.05);
assert.equal(lastSectionOptions.paletteFamily, "reflectivity");
assert.ok(lastSectionOptions.paletteKey.startsWith("reflectivity:"));
assert.equal(renderedSection.renderOptions.topKm, 16);
assert.equal(renderedSection.renderOptions.paletteText.includes("Product: BR"), true);
const sectionPanel = radarCrossSectionPanel(renderedSection, { site: "KTLX" });
assert.equal(sectionPanel.type, "bowecho-cross-section-panel-v1");
assert.equal(sectionPanel.image.width, 32);
assert.equal(sectionPanel.image.height, 12);
assert.equal(sectionPanel.image.rgba.byteLength, 32 * 12 * 4);
assert.equal(sectionPanel.geometry.path.length, 2);
assert.deepEqual(sectionPanel.geometry.coordinates[0], [sectionPanel.geometry.start.lon, sectionPanel.geometry.start.lat]);
assert.ok(sectionPanel.geometry.lengthKm > 90);
assert.equal(toolbox.crossSectionPanel(renderedSection).image.width, 32);
assert.equal(typeof drawNativeRhiToCanvas, "function");

const nativeRhi = await toolbox.renderNativeRhi(
  { id: "fake-frame", cacheKey: "fake-frame-native-rhi", source: "mobile-archive", volumeTime: "2026-06-13T00:00:00Z" },
  {
    product: "REF",
    palette: parsedPalette,
  },
);
assert.equal(nativeRhi.meta.type, "bowecho-native-rhi-v1");
assert.equal(nativeRhi.width, 950);
assert.equal(nativeRhi.height, 376);
assert.equal(nativeRhi.rgba.byteLength, 950 * 376 * 4, "native RHI must preserve full native panel RGBA");
assert.equal(nativeRhi.renderOptions.cut, 1);
assert.equal(nativeRhi.meta.cutIndex, 1);
assert.equal(nativeRhi.meta.native.preservesGateResolution, true);
assert.equal(nativeRhi.meta.native.allowDownscale, false);
assert.equal(lastNativeRhiOptions.width, 0);
assert.equal(lastNativeRhiOptions.height, 0);
assert.equal(lastNativeRhiOptions.cut, 1);
assert.equal(lastNativeRhiOptions.allowDownscale, false);
assert.equal(lastNativeRhiOptions.requireRhi, true);
assert.equal(lastNativeRhiOptions.paletteFamily, "reflectivity");

const loop = {
  site: "KTLX",
  mode: "recent",
  product: "REF",
  cut: 0,
  frames: [sdkRendered.frame],
  renderedFrames: [sdkRendered],
  meta: fakeMeta,
  renderOptions: sdkRendered.renderOptions,
  length: 1,
  frame() {
    return sdkRendered;
  },
};
const loopTextures = toolbox.loopTextureLayers(loop);
assert.equal(loopTextures.length, 1);
assert.equal(loopTextures[0].image.width, 16);
assert.equal(loopTextures[0].image.height, 8);
assert.equal(toolbox.compositeLayers([redLayer], { bounds: redLayer.bounds, width: 8, height: 8 }).counts.layers, 1);
const diagnosticsLoop = await toolbox.volumeDiagnosticsLoop(loop);
assert.equal(diagnosticsLoop.type, "bowecho-volume-diagnostics-loop-v1");
assert.equal(diagnosticsLoop.diagnostics.length, 1);
assert.equal(diagnosticsLoop.diagnostics[0].threeDimensional.preservesGateResolution, true);
assert.equal(diagnosticsLoop.failures.length, 0);
const nativeRhiLoop = await toolbox.renderNativeRhiLoop(loop, { product: "REF" });
assert.equal(nativeRhiLoop.type, "bowecho-native-rhi-loop-v1");
assert.equal(nativeRhiLoop.length, 1);
assert.equal(nativeRhiLoop.panel(0).width, 950);
assert.equal(nativeRhiLoop.frame(0).meta.type, "bowecho-native-rhi-v1");
const configuredCache = await toolbox.configureCache({ volumes: 36, renders: 192, diagnostics: 64, nativeRhi: 80 });
assert.equal(configuredCache.maxVolumes, 36);
assert.equal(configuredCache.limits.renders, 192);
assert.equal(configuredCache.maxDiagnostics, 64);
assert.equal(configuredCache.maxNativeRhi, 80);
const warmedLoop = await toolbox.warmLoop(loop, { product: "DVEL", concurrency: 2 });
assert.equal(warmedLoop.warmed, 1);
assert.equal(warmedLoop.failed, 0);
assert.equal(warmedLoop.frames[0].frameId, "fake-frame");
assert.equal(warmedLoop.frames[0].volumeCacheHit, true);
assert.equal(warmedLoop.stats.maxVolumes, 36);
const warmedFrames = await toolbox.warmFrames([sdkRendered], { product: "REF", metadata: false });
assert.equal(warmedFrames.frames[0].metaCacheHit, null);
const importedLoop = await toolbox.loadImportedLoop([imported], {
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(importedLoop.mode, "imported");
assert.equal(importedLoop.site, "KTLX");
assert.equal(importedLoop.length, 1);
assert.equal(importedLoop.frame(0).frame.id, "imported-a");
assert.equal(importedLoop.frame(0).rgba.byteLength, 16 * 8 * 4);
const archiveLoop = await toolbox.loadImportedLoop([importedArchive], {
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(archiveLoop.mode, "imported");
assert.equal(archiveLoop.frame(0).frame.id, "mobile.zip");
assert.equal(archiveLoop.frame(0).frame.merge, true);
assert.equal(archiveLoop.frame(0).rgba.byteLength, 16 * 8 * 4);
const communityLoop = await toolbox.loadCommunityLoop(
  { id: "WILU", label: "WILU", state: "OK", lat: 35.3, lon: -97.4, pollUrl: "https://example.test/WILU" },
  { fetch: communityFetch, frameCount: 2, product: "REF", width: 16, height: 8, rangeKm: 80 },
);
assert.equal(communityLoop.mode, "community");
assert.equal(communityLoop.source, "community");
assert.equal(communityLoop.communityFeed.id, "WILU");
assert.equal(communityLoop.length, 2);
assert.deepEqual(communityLoop.frames.map((frame) => frame.identity), ["WILU20260613_001000", "WILU20260613_002000"]);
const communityPoll = await toolbox.pollCommunityLive(communityLoop, { fetch: communityFetch });
assert.equal(communityPoll.status, "idle");
const internationalLoop = await toolbox.loadInternationalLoop("dmi", "06177", {
  fetch: dmiFetch,
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(internationalLoop.mode, "international");
assert.equal(internationalLoop.source, "international");
assert.equal(internationalLoop.internationalProviderId, "dmi");
assert.equal(internationalLoop.internationalSite.id, "06177");
assert.equal(internationalLoop.siteDescriptor.lat, 55.3262);
assert.deepEqual(internationalLoop.frames.map((frame) => frame.identity), [
  "dkste_202606120635.vol.h5",
  "dkste_202606120640.vol.h5",
]);
const internationalTextures = toolbox.loopTextureLayers(internationalLoop);
assert.equal(internationalTextures[0].site.id, "06177");
assert.equal(internationalTextures[0].site.lon, 12.4493);
const internationalPoll = await toolbox.pollInternationalLive(internationalLoop, { fetch: dmiFetch });
assert.equal(internationalPoll.status, "idle");
const smhiInternationalLoop = await toolbox.loadInternationalLoop("smhi", "angelholm", {
  fetch: smhiFetch,
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(smhiInternationalLoop.mode, "international");
assert.equal(smhiInternationalLoop.source, "international");
assert.equal(smhiInternationalLoop.internationalProviderId, "smhi");
assert.equal(smhiInternationalLoop.internationalSite.id, "angelholm");
assert.equal(smhiInternationalLoop.siteDescriptor.lat, 56.3675);
assert.deepEqual(smhiInternationalLoop.frames.map((frame) => frame.identity), [
  "radar_angelholm_qcvol_202606120630",
  "radar_angelholm_qcvol_202606120635",
]);
const smhiInternationalTextures = toolbox.loopTextureLayers(smhiInternationalLoop);
assert.equal(smhiInternationalTextures[0].site.id, "angelholm");
assert.equal(smhiInternationalTextures[0].site.lon, 12.8517);
const smhiInternationalPoll = await toolbox.pollInternationalLive(smhiInternationalLoop, { fetch: smhiFetch });
assert.equal(smhiInternationalPoll.status, "idle");
const geosphereInternationalLoop = await toolbox.loadInternationalLoop("geosphere", "hochficht", {
  fetch: geosphereFetch,
  now: "2026-06-12T18:35:00Z",
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(geosphereInternationalLoop.mode, "international");
assert.equal(geosphereInternationalLoop.source, "international");
assert.equal(geosphereInternationalLoop.internationalProviderId, "geosphere");
assert.equal(geosphereInternationalLoop.internationalSite.id, "hochficht");
assert.equal(geosphereInternationalLoop.siteDescriptor.lat, 48.7369);
assert.deepEqual(geosphereInternationalLoop.frames.map((frame) => frame.identity), [
  "WXRHOF_202606120630.hdf",
  "WXRHOF_202606120635.hdf",
]);
const geosphereInternationalTextures = toolbox.loopTextureLayers(geosphereInternationalLoop);
assert.equal(geosphereInternationalTextures[0].site.id, "hochficht");
assert.equal(geosphereInternationalTextures[0].site.lon, 13.9209);
const geosphereInternationalPoll = await toolbox.pollInternationalLive(geosphereInternationalLoop, { fetch: geosphereFetch, now: "2026-06-12T18:35:00Z" });
assert.equal(geosphereInternationalPoll.status, "idle");
const shmuInternationalLoop = await toolbox.loadInternationalLoop("shmu", "skjav", {
  fetch: shmuFetch,
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(shmuInternationalLoop.mode, "international");
assert.equal(shmuInternationalLoop.source, "international");
assert.equal(shmuInternationalLoop.internationalProviderId, "shmu");
assert.equal(shmuInternationalLoop.internationalSite.id, "skjav");
assert.equal(shmuInternationalLoop.siteDescriptor.lat, 48.2556);
assert.deepEqual(shmuInternationalLoop.frames.map((frame) => frame.merge), [true, true]);
assert.deepEqual(shmuInternationalLoop.frames.map((frame) => frame.urls.length), [2, 3]);
const shmuInternationalTextures = toolbox.loopTextureLayers(shmuInternationalLoop);
assert.equal(shmuInternationalTextures[0].site.id, "skjav");
assert.equal(shmuInternationalTextures[0].site.lon, 17.1524);
const shmuInternationalPoll = await toolbox.pollInternationalLive(shmuInternationalLoop, { fetch: shmuFetch });
assert.equal(shmuInternationalPoll.status, "idle");
const dwdInternationalLoop = await toolbox.loadInternationalLoop("dwd", "asb", {
  fetch: dwdFetch,
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(dwdInternationalLoop.mode, "international");
assert.equal(dwdInternationalLoop.source, "international");
assert.equal(dwdInternationalLoop.internationalProviderId, "dwd");
assert.equal(dwdInternationalLoop.internationalSite.id, "asb");
assert.equal(dwdInternationalLoop.siteDescriptor.lat, 53.564);
assert.deepEqual(dwdInternationalLoop.frames.map((frame) => frame.merge), [true, true]);
assert.deepEqual(dwdInternationalLoop.frames.map((frame) => frame.urls.length), [20, 20]);
const dwdInternationalTextures = toolbox.loopTextureLayers(dwdInternationalLoop);
assert.equal(dwdInternationalTextures[0].site.id, "asb");
assert.equal(dwdInternationalTextures[0].site.lon, 6.7482);
const dwdInternationalPoll = await toolbox.pollInternationalLive(dwdInternationalLoop, { fetch: dwdFetch });
assert.equal(dwdInternationalPoll.status, "idle");
const chmiInternationalLoop = await toolbox.loadInternationalLoop("chmi", "brd", {
  fetch: chmiFetch,
  includeDualPol: false,
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(chmiInternationalLoop.mode, "international");
assert.equal(chmiInternationalLoop.source, "international");
assert.equal(chmiInternationalLoop.internationalProviderId, "chmi");
assert.equal(chmiInternationalLoop.internationalSite.id, "brd");
assert.equal(chmiInternationalLoop.siteDescriptor.lat, 49.6583);
assert.deepEqual(chmiInternationalLoop.frames.map((frame) => frame.merge), [true, true]);
assert.deepEqual(chmiInternationalLoop.frames.map((frame) => frame.urls.length), [6, 6]);
const chmiInternationalTextures = toolbox.loopTextureLayers(chmiInternationalLoop);
assert.equal(chmiInternationalTextures[0].site.id, "brd");
assert.equal(chmiInternationalTextures[0].site.lon, 13.8178);
const chmiInternationalPoll = await toolbox.pollInternationalLive(chmiInternationalLoop, { fetch: chmiFetch, includeDualPol: false });
assert.equal(chmiInternationalPoll.status, "idle");
const jmaInternationalLoop = await toolbox.loadInternationalLoop("jma", "ITOK", {
  fetch: jmaFetch,
  now: "2026-06-12T06:43:17Z",
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(jmaInternationalLoop.mode, "international");
assert.equal(jmaInternationalLoop.source, "international");
assert.equal(jmaInternationalLoop.internationalProviderId, "jma");
assert.equal(jmaInternationalLoop.internationalSite.id, "ITOK");
assert.equal(jmaInternationalLoop.siteDescriptor.lat, 26.1533);
assert.deepEqual(jmaInternationalLoop.frames.map((frame) => frame.identity), [
  "20260612063500_ITOK",
  "20260612064000_ITOK",
]);
assert.deepEqual(jmaInternationalLoop.frames.map((frame) => frame.siteFilteredDecode), [true, true]);
const jmaInternationalTextures = toolbox.loopTextureLayers(jmaInternationalLoop);
assert.equal(jmaInternationalTextures[0].site.id, "ITOK");
assert.equal(jmaInternationalTextures[0].site.lon, 127.765);
const jmaInternationalPoll = await toolbox.pollInternationalLive(jmaInternationalLoop, { fetch: jmaFetch, now: "2026-06-12T06:43:17Z" });
assert.equal(jmaInternationalPoll.status, "idle");
const ordInternationalLoop = await toolbox.loadInternationalLoop("ord", "nlhrw", {
  fetch: ordFetch,
  now: "2026-06-12T14:59:00Z",
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(ordInternationalLoop.mode, "international");
assert.equal(ordInternationalLoop.source, "international");
assert.equal(ordInternationalLoop.internationalProviderId, "ord");
assert.equal(ordInternationalLoop.internationalSite.id, "nlhrw");
assert.equal(ordInternationalLoop.siteDescriptor.lat, 51.8369);
assert.deepEqual(ordInternationalLoop.frames.map((frame) => frame.identity), recentOrdPlans.map((plan) => plan.identity));
assert.deepEqual(ordInternationalLoop.frames.map((frame) => frame.merge), [false, false]);
const ordInternationalTextures = toolbox.loopTextureLayers(ordInternationalLoop);
assert.equal(ordInternationalTextures[0].site.id, "nlhrw");
assert.equal(ordInternationalTextures[0].site.lon, 5.1381);
const ordInternationalPoll = await toolbox.pollInternationalLive(ordInternationalLoop, { fetch: ordFetch, now: "2026-06-12T14:59:00Z" });
assert.equal(ordInternationalPoll.status, "idle");
const fmiInternationalLoop = await toolbox.loadInternationalLoop("fmi", "fianj", {
  fetch: fmiFetch,
  now: "2026-06-12T06:40:00Z",
  frameCount: 2,
  product: "REF",
  width: 16,
  height: 8,
  rangeKm: 80,
});
assert.equal(fmiInternationalLoop.mode, "international");
assert.equal(fmiInternationalLoop.source, "international");
assert.equal(fmiInternationalLoop.internationalProviderId, "fmi");
assert.equal(fmiInternationalLoop.internationalSite.id, "fianj");
assert.equal(fmiInternationalLoop.siteDescriptor.lat, 60.9039);
assert.deepEqual(fmiInternationalLoop.frames.map((frame) => frame.identity), [
  "202606120630_fianj_PVOL.h5",
  "202606120635_fianj_PVOL.h5",
]);
const fmiInternationalTextures = toolbox.loopTextureLayers(fmiInternationalLoop);
assert.equal(fmiInternationalTextures[0].site.id, "fianj");
assert.equal(fmiInternationalTextures[0].site.lon, 27.1081);
const fmiInternationalPoll = await toolbox.pollInternationalLive(fmiInternationalLoop, { fetch: fmiFetch, now: "2026-06-12T06:40:00Z" });
assert.equal(fmiInternationalPoll.status, "idle");
const sectionLoop = await toolbox.renderCrossSectionLoop(loop, {
  width: 20,
  height: 10,
  topKm: 12,
  start: { eastKm: -20, northKm: 0 },
  end: { eastKm: 20, northKm: 0 },
});
assert.equal(sectionLoop.type, "bowecho-cross-section-loop-v1");
assert.equal(sectionLoop.length, 1);
assert.equal(sectionLoop.section(0).rgba.byteLength, 20 * 10 * 4);
assert.equal(sectionLoop.panel(0).image.height, 10);
assert.equal(toolbox.loopCrossSectionPanels(sectionLoop).length, 1);

const analysis = await toolbox.analyzeFrame(
  { id: "fake-frame", cacheKey: "fake-frame-analysis", source: "archive", volumeTime: "2026-06-13T00:00:00Z" },
  { site: "KTLX" },
);
assert.equal(analysis.type, "bowecho-analysis-v1");
assert.equal(analysis.cells.length, 1);
assert.equal(analysis.rotations.length, 1);
assert.equal(analysis.elapsedMs, 4);
assert.equal(analysis.cacheHit, false);
const analysisOverlay = radarAnalysisOverlay(analysis, { site: "KTLX" });
assert.equal(analysisOverlay.type, "bowecho-analysis-overlay-v1");
assert.equal(analysisOverlay.geojson.type, "FeatureCollection");
assert.equal(analysisOverlay.geojson.features.length, 2);
assert.equal(analysisOverlay.cells[0].properties.kind, "stormCell");
assert.equal(analysisOverlay.rotations[0].properties.strength, "tvs");
assert.equal(analysisOverlay.rotations[0].properties.rank, 7);
assert.ok(Math.abs(analysisOverlay.cells[0].properties.eastKm - 25) < 1e-9);
assert.ok(Array.isArray(analysisOverlay.rotations[0].geometry.coordinates));
assert.equal(toolbox.analysisOverlay(analysis).counts.features, 2);
const analysisLoop = await toolbox.analyzeLoop(loop);
assert.equal(analysisLoop.type, "bowecho-analysis-loop-v1");
assert.equal(analysisLoop.length, 1);
assert.equal(analysisLoop.analysis(0).rotations.length, 1);
assert.equal(analysisLoop.overlay(0).geojson.features.length, 2);
assert.equal(toolbox.loopAnalysisOverlays(analysisLoop).length, 1);

const torTracks = await toolbox.renderTorTracksFrame(
  { id: "fake-frame", cacheKey: "fake-frame-tracks", source: "archive", volumeTime: "2026-06-13T00:00:00Z" },
  { site: "KTLX", halfExtentKm: 60, cellKm: 1 },
);
assert.equal(torTracks.meta.type, "bowecho-tor-tracks-frame-v1");
assert.equal(torTracks.width, 120);
assert.equal(torTracks.height, 120);
assert.equal(torTracks.values.length, 120 * 120);
assert.equal(torTracks.rgba.byteLength, 120 * 120 * 4, "TOR tracks must preserve the full grid RGBA");
assert.equal(torTracks.renderOptions.cellKm, 1);
assert.equal(torTracks.meta.counts.tds, 1);
const torLayer = radarTorTracksLayer(torTracks, { site: "KTLX" });
assert.equal(torLayer.type, "bowecho-tor-tracks-layer-v1");
assert.equal(torLayer.image.width, 120);
assert.equal(torLayer.image.rgba.byteLength, 120 * 120 * 4);
assert.equal(torLayer.values.length, 120 * 120);
assert.equal(torLayer.grid.halfExtentKm, 60);
assert.equal(torLayer.tds.geojson.features.length, 1);
assert.equal(torLayer.tds.geojson.features[0].properties.kind, "tds");
assert.equal(mapboxRadarCanvasSource(torLayer, "tor-canvas").coordinates.length, 4);
assert.equal(deckRadarBitmapLayerProps(torLayer).image.byteLength, 120 * 120 * 4);
assert.equal(webGpuRadarTextureUpload(torLayer).writeTexture.dataLayout.bytesPerRow, 120 * 4);
assert.equal(toolbox.torTracksLayer(torTracks).counts.tds, 1);
const torLoop = await toolbox.renderTorTracksLoop(loop, { halfExtentKm: 60, cellKm: 1 });
assert.equal(torLoop.type, "bowecho-tor-tracks-loop-v1");
assert.equal(torLoop.length, 1);
assert.equal(torLoop.frame(0).meta.type, "bowecho-tor-tracks-loop-frame-v1");
assert.equal(torLoop.frame(0).meta.accumulatedFrames, 1);
assert.equal(torLoop.layer(0).tds.geojson.features.length, 1);
assert.equal(toolbox.loopTorTracksLayers(torLoop).length, 1);

function testRendered(site, id, time, width = 16, height = 8) {
  return {
    ...sdkRendered,
    frame: {
      id,
      cacheKey: id,
      source: "archive",
      volumeTime: time,
    },
    meta: {
      ...fakeMeta,
      site,
      volumeTime: time,
    },
    rgba: new Uint8ClampedArray(width * height * 4),
    width,
    height,
    renderOptions: {
      ...sdkRendered.renderOptions,
      width,
      height,
      rangeKm: 80,
    },
  };
}

function testLoop(site, renderedFrames) {
  return {
    site,
    mode: "recent",
    product: "REF",
    cut: 0,
    frames: renderedFrames.map((frame) => frame.frame),
    renderedFrames,
    meta: renderedFrames[renderedFrames.length - 1].meta,
    renderOptions: renderedFrames[0].renderOptions,
    get length() {
      return this.renderedFrames.length;
    },
    frame(index = this.renderedFrames.length - 1) {
      return this.renderedFrames[Math.max(0, Math.min(this.renderedFrames.length - 1, index))];
    },
  };
}

const ktlxLoop = testLoop("KTLX", [
  testRendered("KTLX", "ktlx-a", "2026-06-13T00:00:00Z"),
  testRendered("KTLX", "ktlx-b", "2026-06-13T00:05:00Z"),
]);
const ktlxTimeline = loopTimeline(ktlxLoop, { currentIndex: 0, now: Date.parse("2026-06-13T00:08:00Z") });
assert.equal(ktlxTimeline.length, 2);
assert.equal(ktlxTimeline[0].current, true);
assert.equal(ktlxTimeline[1].latest, true);
assert.equal(ktlxTimeline[0].ageSeconds, 480);
assert.equal(toolbox.loopTimeline(ktlxLoop, { currentIndex: 1 })[1].current, true);
const kfwsLoop = testLoop("KFWS", [
  testRendered("KFWS", "kfws-a", "2026-06-13T00:02:00Z"),
  testRendered("KFWS", "kfws-b", "2026-06-13T00:07:00Z"),
]);
const multi = synchronizeRadarLoops([ktlxLoop, kfwsLoop], { maxSkewMs: 5 * 60_000 });
assert.equal(multi.type, "bowecho-synchronized-loops-v1");
assert.deepEqual(multi.sites, ["KTLX", "KFWS"]);
assert.equal(multi.length, 4);
assert.equal(multi.slot(0).complete, true);
assert.equal(multi.frame("KTLX", 0).frame.id, "ktlx-a");
assert.equal(multi.frame("KFWS", 0).frame.id, "kfws-a");
assert.equal(multi.loopForSite("KFWS"), kfwsLoop);
assert.equal(multi.nearestTimeIndex("2026-06-13T00:05:01Z") >= 0, true);
const multiTextures = multi.textureLayers(0);
assert.equal(multiTextures.length, 2);
assert.deepEqual(multiTextures.map((layer) => layer.site.id), ["KTLX", "KFWS"]);
assert.equal(multiTextures[0].image.rgba.byteLength, 16 * 8 * 4);

const strictMulti = synchronizeRadarLoops([ktlxLoop, kfwsLoop], { maxSkewMs: 30_000 });
assert.equal(strictMulti.slot(0).complete, false);
assert.equal(strictMulti.frame("KFWS", 0), null);

const positionalMulti = toolbox.synchronizeLoops([
  testLoop("KTLX", [testRendered("KTLX", "pos-a", null)]),
  testLoop("KFWS", [testRendered("KFWS", "pos-b", null), testRendered("KFWS", "pos-c", null)]),
]);
assert.equal(positionalMulti.length, 2);
assert.equal(positionalMulti.frame("KTLX", 1).frame.id, "pos-a");
assert.equal(positionalMulti.frame("KFWS", 1).frame.id, "pos-c");

const multiToolbox = createRadarToolbox({ workerClient: fakeWorker });
multiToolbox.loadLoop = async (options) => options.site === "KFWS" ? kfwsLoop : ktlxLoop;
multiToolbox.rerenderLoop = async (sourceLoop, options) => ({
  ...sourceLoop,
  product: options.product || sourceLoop.product,
});
multiToolbox.pollLive = async (sourceLoop) => ({
  status: sourceLoop.site === "KTLX" ? "updated" : "idle",
  frame: sourceLoop.frames[0],
  loop: sourceLoop,
});
const loadedMulti = await multiToolbox.loadMultiSiteLoop(["KTLX", "KFWS"], { maxSkewMs: 5 * 60_000, concurrency: 2 });
assert.equal(loadedMulti.length, 4);
assert.deepEqual(loadedMulti.sites, ["KTLX", "KFWS"]);
const slotComposite = compositeSynchronizedRadarLoopSlot(loadedMulti, 0, { width: 64, height: 64 });
assert.equal(slotComposite.type, "bowecho-radar-composite-v1");
assert.equal(slotComposite.layers.length, 2);
assert.equal(slotComposite.image.rgba.byteLength, 64 * 64 * 4);
assert.equal(multiToolbox.compositeLoopSlot(loadedMulti, 0, { width: 32, height: 32 }).image.width, 32);
const rerenderedMulti = await multiToolbox.rerenderMultiSiteLoop(loadedMulti, { product: "DVEL" });
assert.equal(rerenderedMulti.loops[0].product, "DVEL");
const polledMulti = await multiToolbox.pollMultiSiteLive(loadedMulti);
assert.equal(polledMulti.status, "updated");
assert.equal(polledMulti.updates.length, 1);
assert.equal(polledMulti.multiLoop.sites.length, 2);

function sessionTestLoop(options = {}) {
  const product = options.product || "REF";
  const cut = Number.isInteger(Number(options.cut)) ? Number(options.cut) : 0;
  const width = options.width || 16;
  const height = options.height || 8;
  const rangeKm = options.rangeKm || 80;
  const ids = options.ids || ["session-a", "session-b"];
  const times = options.times || ["2026-06-13T00:00:00Z", "2026-06-13T00:05:00Z", "2026-06-13T00:10:00Z"];
  const renderedFrames = ids.map((id, index) => {
    const rendered = testRendered("KTLX", id, times[index], width, height);
    rendered.meta = {
      ...fakeMeta,
      selectedCut: cut,
      volumeTime: times[index],
    };
    rendered.renderOptions = {
      ...rendered.renderOptions,
      product,
      cut,
      width,
      height,
      rangeKm,
    };
    return rendered;
  });
  const loop = testLoop("KTLX", renderedFrames);
  loop.mode = options.mode || "live";
  loop.product = product;
  loop.cut = cut;
  loop.meta = {
    ...fakeMeta,
    selectedCut: cut,
    volumeTime: times[Math.min(times.length - 1, ids.length - 1)],
  };
  loop.renderOptions = {
    ...renderedFrames[0].renderOptions,
    product,
    cut,
    width,
    height,
    rangeKm,
  };
  return loop;
}

let sessionLoadCalls = 0;
let sessionRerenderCalls = 0;
let sessionPollCalls = 0;
let sessionWarmCalls = 0;
const sessionToolbox = createRadarToolbox({ workerClient: fakeWorker });
sessionToolbox.loadLoop = async (options) => {
  sessionLoadCalls += 1;
  return sessionTestLoop(options);
};
sessionToolbox.rerenderLoop = async (sourceLoop, options = {}) => {
  sessionRerenderCalls += 1;
  return sessionTestLoop({
    ...sourceLoop.renderOptions,
    ...options,
    product: options.product || sourceLoop.product,
    cut: options.cut ?? sourceLoop.cut,
    ids: sourceLoop.frames.map((frame) => frame.id),
    times: sourceLoop.frames.map((frame) => frame.volumeTime),
  });
};
sessionToolbox.pollLive = async (sourceLoop, options = {}) => {
  sessionPollCalls += 1;
  const nextLoop = sessionTestLoop({
    ...sourceLoop.renderOptions,
    ...options,
    product: sourceLoop.product,
    cut: sourceLoop.cut,
    ids: ["session-a", "session-b", "session-c"],
    times: ["2026-06-13T00:00:00Z", "2026-06-13T00:05:00Z", "2026-06-13T00:10:00Z"],
  });
  return {
    status: "updated",
    frame: nextLoop.frames[nextLoop.frames.length - 1],
    loop: nextLoop,
  };
};
sessionToolbox.warmLoop = async (sourceLoop, options = {}) => {
  sessionWarmCalls += 1;
  return {
    frames: sourceLoop.frames.map((frame) => ({
      frameId: frame.id,
      cacheKey: frame.cacheKey,
      byteCacheHit: true,
      volumeCacheHit: true,
      metaCacheHit: options.metadata === false ? null : true,
      site: sourceLoop.site,
      volumeTime: frame.volumeTime,
      elapsedMs: 0,
    })),
    warmed: sourceLoop.frames.length,
    failed: 0,
    elapsedMs: 0,
    stats: await fakeWorker.stats(),
  };
};

const session = createRadarSession(sessionToolbox, {
  site: "ktlx",
  mode: "live",
  product: "REF",
  frameCount: 2,
  width: 16,
  height: 8,
  rangeKm: 80,
});
let sessionSnapshots = 0;
const unsubscribeSession = session.subscribe((snapshot) => {
  assert.equal(snapshot.type, "bowecho-radar-session-v1");
  sessionSnapshots += 1;
});
const loadedSession = await session.load();
assert.equal(sessionLoadCalls, 1);
assert.equal(loadedSession.site, "KTLX");
assert.equal(loadedSession.length, 2);
assert.equal(loadedSession.index, 1);
assert.equal(loadedSession.cuts.length, 2);
assert.equal(loadedSession.capabilities.availableProducts.includes("DVEL"), true);
assert.equal(loadedSession.capabilities.products.find((product) => product.id === "CC").cutIndexes[0], 0);
assert.equal(loadedSession.frame.width, 16);
session.setIndex("session-a");
assert.equal(session.snapshot().index, 0);
session.nextFrame();
assert.equal(session.snapshot().index, 1);
session.previousFrame();
assert.equal(session.snapshot().index, 0);
assert.equal(session.setPlaybackSpeed(175).loopSpeedPercent, 175);
const productSession = await session.setProduct("DVEL");
assert.equal(productSession.product, "DVEL");
assert.equal(productSession.length, 2);
assert.equal(sessionLoadCalls, 1, "product switching must not reload the loop");
assert.equal(sessionRerenderCalls, 1);
const tiltSession = await session.setCut(1);
assert.equal(tiltSession.cut, 1);
assert.equal(sessionRerenderCalls, 2);
const warmedSession = await session.warm(["REF", "DVEL"], { concurrency: 2 });
assert.equal(warmedSession.warmed, 4);
assert.equal(sessionWarmCalls, 2);
const sessionLayer = session.textureLayer("latest");
assert.equal(sessionLayer.type, "bowecho-radar-texture-v1");
assert.equal(sessionLayer.image.rgba.byteLength, 16 * 8 * 4);
const polledSession = await session.poll();
assert.equal(polledSession.status, "updated");
assert.equal(sessionPollCalls, 1);
assert.equal(polledSession.snapshot.length, 3);
assert.equal(polledSession.snapshot.index, 2);
assert.equal(session.timeline()[2].latest, true);
assert.ok(sessionSnapshots >= 8);
unsubscribeSession();
session.destroy();
const classSession = sessionToolbox.createSession({ site: "KTLX", product: "REF" });
assert.equal(classSession.snapshot().product, "REF");
classSession.destroy();

const finalStats = await toolbox.stats();
assert.equal(finalStats.bytes, 1);
assert.equal(finalStats.volumes, 1);
assert.equal(finalStats.metadata, 1);
assert.equal(finalStats.renders, 1);
assert.equal(finalStats.maxVolumes, 36);
assert.equal(finalStats.maxRenders, 192);
assert.equal(finalStats.limits.volumes, 36);
assert.deepEqual(await toolbox.clearCache(), { cleared: true });

console.log("sdk-contract ok");
