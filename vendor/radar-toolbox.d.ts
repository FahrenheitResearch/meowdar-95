export const ARCHIVE_URL: string;
export const CHUNKS_URL: string;
export const WORKER_VERSION: string;
export const EARTH_RADIUS_KM: number;
export const WEB_MERCATOR_RADIUS_M: number;
export const MAX_WEB_MERCATOR_LAT: number;
export const DEFAULT_USER_PALETTE_STORAGE_KEY: string;
export const CHMI_RADAR_SITES_ROOT: string;
export const DMI_RADAR_VOLUME_ITEMS_URL: string;
export const DWD_RADAR_SITES_ROOT: string;
export const FMI_RADAR_VOLUME_BUCKET_URL: string;
export const GEOSPHERE_DATAHUB_URL: string;
export const GEOSPHERE_HOCHFICHT_PREFIX: string;
export const JMA_RADAR_BASE_URL: string;
export const ORD_RADAR_BUCKET_URL: string;
export const SHMU_RADAR_VOLUME_ROOT: string;
export const SMHI_RADAR_API_BASE: string;
export const SPC_OUTLOOK_BASE_URL: string;
export const SPC_OUTLOOK_ARCHIVE_BASE_URL: string;
export const SPC_REPORTS_BASE_URL: string;
export const SPC_WCM_DATA_BASE_URL: string;
export const SPC_OUTLOOK_KINDS: SpcOutlookKindDescriptor[];
export const CUSTOM_POLL_NO_MARKER_LAT_E6: number;
export const CUSTOM_POLL_NO_MARKER_LON_E6: number;
export const SUPPORTED_ARCHIVE_FORMATS: SupportedByteFormatDescriptor[];

export type ProductGroup = "base" | "velocity" | "dual-pol" | "derived" | "severe" | "shear";

export interface ProductDescriptor {
  id: string;
  label: string;
  name: string;
  group: ProductGroup;
  units: string;
  colorFamily: ColorTableFamilyId;
}

export interface ProductCapabilityDescriptor {
  product: string;
  source: string;
  aliases: string[];
  scope: "cut" | "volume" | string;
  cutIndependent: boolean;
  usesDealiasedVelocity: boolean;
  stormRelative: boolean;
}

export interface ProductChoice extends ProductDescriptor {
  capability: ProductCapabilityDescriptor | null;
  available: boolean;
  selected: boolean;
  sourceMoment: string;
  sourceAliases: string[];
  scope: "cut" | "volume" | string;
  cutIndependent: boolean;
  usesDealiasedVelocity: boolean;
  stormRelative: boolean;
  cuts: CutChoice[];
  cutIndexes: number[];
  defaultCut: number | null;
  reason: string | null;
}

export interface CapabilityHints {
  type: "bowecho-capability-hints-v1";
  site: string | null;
  volumeTime: string | null;
  selectedProduct: string;
  selectedCut: number | null;
  vcp: ProductMetadata["vcp"] | null;
  cuts: CutChoice[];
  products: ProductChoice[];
  availableProducts: string[];
  unavailableProducts: string[];
  groups: Record<string, string[]>;
  recommendedWarmProducts: string[];
  can: {
    reflectivity: boolean;
    velocity: boolean;
    dealiasedVelocity: boolean;
    stormRelativeVelocity: boolean;
    dualPol: boolean;
    derived: boolean;
    shear: boolean;
    crossSection: boolean;
    analysis: boolean;
    torTracks: boolean;
  };
}

export type ColorTableFamilyId =
  | "reflectivity"
  | "velocity"
  | "spectrumWidth"
  | "correlationCoefficient"
  | "differentialReflectivity"
  | "echoTops"
  | "vil"
  | "vilDensity"
  | "hailSize"
  | "azimuthalShear"
  | "differentialPhase"
  | "specificDifferentialPhase"
  | "generic";

export interface ColorTableFamilyDescriptor {
  id: ColorTableFamilyId;
  label: string;
  productCode: string | null;
  products: string[];
}

export interface PaletteStop {
  value: number;
  color: [number, number, number, number];
  endColor: [number, number, number, number] | null;
  solid: boolean;
}

export interface BrowserPalette {
  type: "bowecho-palette-v1";
  id?: string;
  name: string;
  format: "gr-pal";
  productCode: string | null;
  family: ColorTableFamilyId;
  units: string | null;
  legendStep: number | null;
  rangeFolded: [number, number, number, number];
  sampleMode: "gr-pal" | "stepped" | "interpolated" | string;
  stops: PaletteStop[];
  warnings: Array<{ line: number; message: string }>;
  createdAt?: string | null;
  updatedAt?: string | null;
  sourceName?: string | null;
}

export interface PaletteBinding {
  family: ColorTableFamilyId;
  productCode: string | null;
  products: string[];
  palette: BrowserPalette;
}

export interface PaletteStorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): unknown;
  removeItem?(key: string): unknown;
}

export interface PaletteLibraryDocument {
  type: "bowecho-palette-library-v1";
  version: 1;
  updatedAt: string;
  palettes: Array<{
    id?: string;
    name: string;
    family: ColorTableFamilyId;
    productCode: string | null;
    sourceName?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    palette: BrowserPalette;
  }>;
}

export interface PaletteStore {
  key: string;
  load(): BrowserPalette[];
  list(): BrowserPalette[];
  get(id: string): BrowserPalette | null;
  saveAll(palettes: BrowserPalette[]): BrowserPalette[];
  savePalette(palette: BrowserPalette, options?: { id?: string; name?: string; family?: string; sourceName?: string | null; createdAt?: string; updatedAt?: string }): BrowserPalette;
  importText(text: string, options?: { id?: string; name?: string; fileName?: string; sourceName?: string | null; family?: string; createdAt?: string; updatedAt?: string }): BrowserPalette;
  removePalette(idOrPalette: string | BrowserPalette): boolean;
  clear(): BrowserPalette[];
  exportText(idOrPalette: string | BrowserPalette, options?: { family?: string; productCode?: string | null; units?: string; legendStep?: number; rangeFolded?: [number, number, number, number] }): string;
  subscribe(listener: (palettes: BrowserPalette[]) => void): () => void;
}

export interface RadarSite {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export type RadarCatalogSource = "nexrad" | "international" | "community" | "custom" | string;

export interface GlobalRadarProvider {
  id: string;
  label: string;
  country: string;
  kind: string;
  formats: string[];
  capabilities: {
    staticSites?: boolean;
    catalog?: boolean;
    latestPlan?: boolean;
    recentPlan?: boolean;
    livePolling?: boolean;
    archive?: boolean;
    mergeParts?: boolean | "mixed";
    browserPlanner?: boolean;
    siteFilteredDecode?: boolean;
    dirListPolling?: boolean;
    clientSideReady?: boolean;
    [key: string]: unknown;
  };
}

export interface InternationalRadarSite {
  source: "international";
  providerId: string;
  id: string;
  label: string;
  country: string;
  lat: number;
  lon: number;
  format: SupportedByteFormatId;
  merge: boolean | "mixed";
  siteFilteredDecode: boolean;
}

export interface InternationalPlanPart {
  url: string;
}

export interface InternationalFramePlan {
  type: "bowecho-international-frame-plan-v1";
  providerId: string;
  providerLabel: string;
  site: {
    id: string;
    name: string;
    label: string;
    providerId: string;
    country: string | null;
    lat: number;
    lon: number;
    format: SupportedByteFormatId | null;
    merge: boolean;
    siteFilteredDecode: boolean;
  };
  siteId: string;
  identity: string;
  parts: InternationalPlanPart[];
  merge: boolean;
  format: SupportedByteFormatId;
  volumeTime: string | null;
  sourceItem: ChmiFrameSourceItem | DmiVolumeItem | DwdFrameSourceItem | FmiVolumeItem | GeosphereVolumeItem | JmaFrameSourceItem | OrdFrameSourceItem | ShmuFrameSourceItem | SmhiQcvolItem | Record<string, unknown> | null;
}

export interface SmhiAreaItem {
  id: string;
  key: string;
  label: string;
  index: number;
  site: InternationalFramePlan["site"] | null;
}

export interface SmhiQcvolItem {
  key: string;
  url: string;
  index: number;
  volumeTime: string | null;
  site: InternationalFramePlan["site"];
  formats: Array<Record<string, unknown>>;
}

export interface GeosphereVolumeItem {
  key: string;
  fileName: string;
  siteId: string;
  url: string;
  index: number;
  size: number;
  lastModified: string | null;
  volumeTime: string | null;
  site: InternationalFramePlan["site"];
}

export interface AutoIndexEntry {
  name: string;
  href: string;
  url: string;
  isDir: boolean;
  index: number;
  rawLabel: string;
}

export interface ShmuFileItem {
  name: string;
  product: string;
  date: string;
  stamp: string;
  url: string;
  index: number;
  volumeTime: string | null;
  site: InternationalFramePlan["site"];
}

export interface ShmuFrameSourceItem {
  stamp: string;
  parts: ShmuFileItem[];
}

export interface DwdSweepItem {
  name: string;
  productDir: string;
  quantity: string;
  sweep: number;
  stamp16: string;
  stamp: string;
  timeMs: number;
  url: string;
  index: number;
  volumeTime: string | null;
  site: InternationalFramePlan["site"];
}

export interface DwdFrameSourceProduct {
  productDir: string;
  quantity: string;
  sweepCount: number;
  sweeps: DwdSweepItem[];
}

export interface DwdFrameSourceItem {
  anchor: string;
  products: DwdFrameSourceProduct[];
}

export interface ChmiFileItem {
  name: string;
  productDir: string;
  task: string;
  stamp: string;
  timeMs: number;
  url: string;
  index: number;
  volumeTime: string | null;
  site: InternationalFramePlan["site"];
}

export interface ChmiFrameSourceProduct {
  productDir: string;
  taskCount: number;
  files: ChmiFileItem[];
}

export interface ChmiFrameSourceItem {
  anchor: string;
  products: ChmiFrameSourceProduct[];
}

export interface JmaFrameSourceItem {
  stamp: string;
  product: "N5" | "N6" | string;
  url: string;
  site: InternationalFramePlan["site"];
}

export type OrdObjectKind = "PVOL" | "SCAN";

export interface OrdFileItem {
  key: string;
  fileName: string;
  siteId: string;
  country: string;
  countryCode: string;
  objectKind: OrdObjectKind;
  stamp: string;
  timeMs: number;
  volumeTime: string;
  elevations: number[];
  elevationText: string;
  elevationCount: number;
  firstElevationDeg: number;
  moments: string[];
  momentText: string;
  momentRank: number;
  hasFilteredReflectivity: boolean;
  unfilteredReflectivityOnly: boolean;
}

export interface OrdFrameSourceItem {
  objectKind: OrdObjectKind;
  anchor: string;
  cycleWindowMinutes: number;
  files: OrdFileItem[];
}

export interface S3StyleListingContent {
  key: string;
  size: number;
  lastModified: string | null;
  etag: string | null;
}

export interface S3StyleListing {
  type: "s3-style-listing-v1";
  contents: S3StyleListingContent[];
  keys: string[];
  commonPrefixes: string[];
  prefixes: string[];
  isTruncated: boolean;
  nextContinuationToken: string | null;
}

export interface NexradArchiveDateParts {
  year: number;
  month: number;
  day: number;
  iso: string;
}

export interface NexradArchiveWindow {
  type: "bowecho-nexrad-archive-window-v1";
  site: string | null;
  date: string | null;
  frames: FrameDescriptor[];
  startIndex: number;
  endIndex: number;
  selectedIndex: number;
  selectedFrame: FrameDescriptor | null;
  totalFrames: number;
  targetTime: string | null;
}

export type SpcOutlookKind = "cat" | "torn" | "wind" | "hail";

export interface SpcOutlookKindDescriptor {
  id: SpcOutlookKind;
  label: string;
}

export interface SpcOutlookFeature {
  type: "spc-outlook-feature-v1";
  kind: SpcOutlookKind | null;
  label: string;
  label2: string;
  fill: string;
  stroke: string;
  fillRgb: [number, number, number];
  strokeRgb: [number, number, number];
  rings: Array<Array<[number, number]>>;
  url: string | null;
}

export interface SpcOutlook {
  type: "spc-outlook-v1";
  day: number;
  kind: SpcOutlookKind;
  archiveDate: string | null;
  url: string | null;
  urls: string[];
  attemptedUrls: string[];
  missing: boolean;
  features: SpcOutlookFeature[];
}

export interface SpcOutlooks {
  type: "spc-outlooks-v1";
  day: number;
  archiveDate: string | null;
  outlooks: SpcOutlook[];
  features: SpcOutlookFeature[];
}

export interface SpcOutlookFeatureCollection {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    id?: string;
    properties: {
      kind: SpcOutlookKind | string | null;
      label: string;
      label2: string;
      fill: string;
      stroke: string;
      fillRgb: number[];
      strokeRgb: number[];
      url: string | null;
    };
    geometry:
      | { type: "Polygon"; coordinates: Array<Array<[number, number]>> }
      | { type: "MultiPolygon"; coordinates: Array<Array<Array<[number, number]>>> };
  }>;
}

export interface SpcOutlookUrlOptions extends CommunityFetchOptions {
  day?: number;
  kind?: SpcOutlookKind | string;
  now?: string | Date;
  date?: string | Date | NexradArchiveDateParts;
  archiveDate?: string | Date | NexradArchiveDateParts;
  baseUrl?: string;
  outlookBaseUrl?: string;
  archiveBaseUrl?: string;
  outlookArchiveBaseUrl?: string;
  issues?: Array<string | number>;
}

export type SpcReportKind = "tornado" | "wind" | "hail";

export interface SpcStormReport {
  type: "spc-storm-report-v1";
  kind: SpcReportKind;
  timeHhmm: string;
  timeUtc: string;
  lat: number;
  lon: number;
  magnitude: string;
  magnitudeLabel?: string | null;
  location: string;
  county: string;
  state: string;
  remark: string;
}

export interface SpcTornadoSegment {
  type: "spc-tornado-segment-v1";
  timeUtc: string;
  efLabel: string;
  location: string;
  begin: { lat: number; lon: number };
  end: { lat: number; lon: number } | null;
  endTimeUtc: string | null;
  lengthMi: number;
  widthYd: number;
  isTrack: boolean;
}

export interface SpcEventDay {
  type: "spc-event-day-v1";
  convectiveDate: string;
  reports: SpcStormReport[];
  segments: SpcTornadoSegment[];
  reportsFileMissing: boolean;
  reportUrl: string | null;
  segmentUrls: string[];
}

export interface EventRadarSelection {
  type: "bowecho-event-radar-selection-v1";
  primary: GlobalRadarSite & { distanceKm: number };
  overlay: (GlobalRadarSite & { distanceKm: number }) | null;
  midpoint: { lat: number; lon: number };
  begin: { lat: number; lon: number };
  end: { lat: number; lon: number };
  maxDistanceKm: number;
}

export interface EventArchiveWindow {
  type: "bowecho-spc-event-archive-window-v1";
  site: string | null;
  frames: FrameDescriptor[];
  startIndex: number;
  endIndex: number;
  selectedIndex: number;
  selectedFrame: FrameDescriptor | null;
  totalFrames: number;
  startTime: string | null;
  endTime: string | null;
  padFrames: number;
  cap: number;
}

export interface EventArchivePlan {
  type: "bowecho-spc-event-archive-plan-v1";
  segment: SpcTornadoSegment;
  startTime: string;
  endTime: string;
  archiveDate: string;
  radarSelection: EventRadarSelection | null;
  archiveWindow: EventArchiveWindow | null;
}

export interface DmiVolumeItem {
  id: string;
  stationId: string;
  url: string;
  index: number;
  volumeTime: string | null;
  site: InternationalFramePlan["site"] | null;
  properties: Record<string, unknown>;
}

export interface FmiVolumeItem {
  key: string;
  fileName: string;
  siteId: string;
  url: string;
  index: number;
  size: number;
  lastModified: string | null;
  volumeTime: string | null;
  site: InternationalFramePlan["site"];
}

export interface InternationalFetchOptions extends CommunityFetchOptions {
  providerId?: string;
  provider?: string;
  siteId?: string;
  internationalSiteId?: string;
  limit?: number;
  offset?: number;
  datetime?: string;
  date?: string | Date;
  dates?: Array<string | Date> | string | Date;
  datePrefix?: string;
  datePrefixes?: string[] | string;
  now?: string | Date;
  lookbackMinutes?: number;
  maxKeys?: number;
  maxKeysPerPage?: number;
  maxPages?: number;
  delimiter?: string;
  startAfter?: string;
  continuationToken?: string;
  lookbackHours?: number | number[];
  lookbacks?: number | number[];
  jmaProduct?: "N5" | "N6" | string;
  objectKind?: OrdObjectKind | string;
  kind?: OrdObjectKind | string;
  sourceProduct?: string;
  product?: string;
  products?: string[] | string;
  stamps?: string[] | string;
  keys?: string[] | Partial<S3StyleListing> | string;
  listing?: string | Partial<S3StyleListing>;
  keysByKind?: Partial<Record<OrdObjectKind | string, string[] | Partial<S3StyleListing> | string>>;
  listingsByKind?: Partial<Record<OrdObjectKind | string, string | Partial<S3StyleListing>>>;
  hourLookbackSlots?: number;
  listingForHour?: (context: { siteId: string; objectKind: OrdObjectKind; hourMs: number; url: string; prefix: string }) => string | Partial<S3StyleListing> | Promise<string | Partial<S3StyleListing>>;
  probe?: boolean;
  exists?: (url: string) => boolean | Promise<boolean>;
  headFetchOptions?: RequestInit;
  allowGetProbe?: boolean;
  filesByProduct?: Record<string, ShmuFileItem[] | ChmiFileItem[]> | Map<string, ShmuFileItem[] | ChmiFileItem[]>;
  sweepsByProduct?: Record<string, DwdSweepItem[]> | Map<string, DwdSweepItem[]>;
  includeDualPol?: boolean;
  variant?: string;
  urlForKey?: (key: string) => string;
  urlForName?: (name: string, context?: Record<string, unknown>) => string;
}

export interface CommunityRadarFeed {
  id: string;
  label: string;
  state: string;
  lat: number;
  lon: number;
  pollUrl: string;
  cluster: string | null;
}

export interface CommunityRadarMarker {
  label: string;
  lat: number;
  lon: number;
  feedIds: string[];
}

export interface CommunityDirListEntry {
  name: string;
  path: string;
  fileName: string;
  size: number | null;
  line: number;
  raw: string;
  volumeTime: string | null;
  listingUrl?: string | null;
  directoryUrl?: string | null;
}

export interface CommunityDirListPlan {
  type: "bowecho-community-dir-list-v1";
  feed: CommunityRadarFeed;
  baseUrl: string;
  directoryUrl: string;
  listingUrl: string;
  prefix: string;
  text: string;
  entries: CommunityDirListEntry[];
  newest: CommunityDirListEntry | null;
  cfgUrl: string | null;
  cfgSites: string[];
}

export interface CustomPollLinkEntry {
  label: string;
  siteId: string;
  site_id: string;
  latE6: number;
  lonE6: number;
  lat_e6: number;
  lon_e6: number;
  pollUrl: string;
  poll_url: string;
  lat?: number;
  lon?: number;
}

export interface CustomPollMarker {
  type: "bowecho-custom-poll-marker-v1";
  id: string;
  label: string;
  siteId: string;
  lat: number;
  lon: number;
  pollUrl: string;
  entry: CustomPollLinkEntry;
}

export interface CustomGisSite {
  siteId: string;
  site_id: string;
  label: string;
  lat: number;
  lon: number;
  latitude: number;
  longitude: number;
  state: string;
}

export interface CustomPollMarkerParseResult {
  latE6: number;
  lonE6: number;
  lat_e6: number;
  lon_e6: number;
  hasMarker: boolean;
  lat?: number;
  lon?: number;
}

export interface CustomPollUpsertResult {
  type: "bowecho-custom-poll-upsert-v1";
  updated: boolean;
  index: number;
  entry: CustomPollLinkEntry;
  links: CustomPollLinkEntry[];
}

export type CustomPollLinkInput = string | Partial<CustomPollLinkEntry> | {
  id?: string;
  site?: string;
  siteId?: string;
  site_id?: string;
  label?: string;
  name?: string;
  lat?: number | string;
  latitude?: number | string;
  lon?: number | string;
  lng?: number | string;
  longitude?: number | string;
  latE6?: number;
  lonE6?: number;
  lat_e6?: number;
  lon_e6?: number;
  pollUrl?: string;
  poll_url?: string;
  url?: string;
  state?: string;
  region?: string;
  cluster?: string | null;
};

export interface CommunityFetchOptions {
  fetch?: (input: string, init?: RequestInit) => Promise<Response>;
  fetchOptions?: RequestInit;
  cache?: RequestCache;
  timeoutMs?: number;
  baseUrl?: string;
  pollUrl?: string;
  prefix?: string;
  frameCount?: number;
  count?: number;
  site?: string;
  id?: string;
  path?: string;
  url?: string;
  identity?: string;
  cacheKey?: string;
  source?: string;
  provider?: string;
  format?: SupportedByteFormatId | null;
  size?: number;
  volumeTime?: string | null;
  directoryUrl?: string | null;
  listingUrl?: string | null;
}

export interface GlobalRadarSite {
  source: RadarCatalogSource;
  providerId: string;
  id: string;
  label: string;
  name?: string;
  country: string;
  state?: string | null;
  lat: number;
  lon: number;
  formats: SupportedByteFormatId[];
  capabilities: Record<string, unknown>;
  feedIds?: string[];
  feeds?: CommunityRadarFeed[];
  customPollLink?: CustomPollLinkEntry;
}

export interface GlobalRadarSiteFeature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    source: RadarCatalogSource;
    providerId: string;
    id: string;
    label: string;
    name: string;
    country: string;
    state: string | null;
    formats: SupportedByteFormatId[];
    capabilities: Record<string, unknown>;
    feedIds?: string[];
    feeds?: CommunityRadarFeed[];
    customPollLink?: CustomPollLinkEntry;
  };
}

export interface GlobalRadarSiteFeatureCollection {
  type: "FeatureCollection";
  features: GlobalRadarSiteFeature[];
}

export interface RadarSiteCatalogOptions extends SiteSearchOptions {
  source?: RadarCatalogSource | RadarCatalogSource[] | string;
  sources?: RadarCatalogSource[] | string;
  providerId?: string | string[];
  providerIds?: string[] | string;
  providers?: string[] | string;
  country?: string | string[];
  countries?: string[] | string;
  format?: string | string[];
  formats?: string[] | string;
  state?: string | string[];
  states?: string[] | string;
  feedId?: string | string[];
  feedIds?: string[] | string;
  customPollLink?: CustomPollLinkInput;
  customPollLinks?: CustomPollLinkInput[];
  customLinks?: CustomPollLinkInput[];
  customPollEntries?: CustomPollLinkInput[];
  customCountry?: string;
  maxDistanceKm?: number;
}

export interface RadarSiteSourceSummary {
  type: "bowecho-radar-source-summary-v1";
  total: number;
  sources: Record<string, number>;
  providers: Record<string, number>;
  countries: Record<string, number>;
}

export type SupportedByteFormatId =
  | "nexrad-level2"
  | "odim-h5"
  | "cfradial-1"
  | "dorade"
  | "jma-grib2-tar"
  | "mobile-archive-zip"
  | string;

export interface SupportedByteFormatDescriptor {
  id: SupportedByteFormatId;
  label: string;
  kind: "volume" | "sweep" | string;
}

export interface FrameProviderDescriptor {
  id: string;
  label: string;
  modes: string[];
  formats: SupportedByteFormatId[];
  clientSide: boolean;
}

export interface SiteSearchOptions {
  query?: string;
  includeProfilers?: boolean;
}

export interface RadarSiteFeature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id: string;
    name: string;
    profilerOnly: boolean;
  };
}

export interface RadarSiteFeatureCollection {
  type: "FeatureCollection";
  features: RadarSiteFeature[];
}

export interface FrameDescriptor {
  id?: string;
  key?: string;
  cacheKey?: string;
  source?: "live" | "archive" | string;
  provider?: string;
  format?: SupportedByteFormatId | null;
  fileName?: string | null;
  site?: string;
  complete?: boolean;
  size?: number;
  lastModified?: string | null;
  url?: string;
  urls?: string[];
  bytes?: Uint8Array | ArrayBuffer;
  volumeTime?: string | null;
  siteLocation?: {
    lat?: number | null;
    lon?: number | null;
  };
  feedId?: string;
  feed?: CommunityRadarFeed;
  pollUrl?: string;
  directoryUrl?: string | null;
  listingUrl?: string | null;
  merge?: boolean;
  internationalProviderId?: string;
  internationalSiteId?: string;
  internationalSite?: InternationalFramePlan["site"];
  siteFilteredDecode?: boolean;
  identity?: string;
  plan?: InternationalFramePlan | Record<string, unknown>;
  partCount?: number;
  archiveEntries?: ZipEntryDescriptor[];
}

export interface ZipEntryDescriptor {
  type?: "bowecho-zip-entry-v1";
  name: string;
  fileName: string;
  directory?: boolean;
  compressionMethod: number;
  encrypted?: boolean;
  compressedSize: number;
  uncompressedSize: number;
  crc32?: number;
  localHeaderOffset?: number;
  lastModified?: string | null;
}

export interface ExtractedZipEntry extends ZipEntryDescriptor {
  bytes: Uint8Array;
}

export interface ImportedArchiveFrameResult extends ImportedFrameResult {
  entries: ZipEntryDescriptor[];
}

export interface CutMetadata {
  index: number;
  elevationDeg: number;
  elevationNumber?: number | null;
  radials: number;
  moments: string[];
  displayable: boolean;
}

export interface ProductMetadata {
  site: string;
  volumeTime: string;
  siteLocation?: {
    lat?: number | null;
    lon?: number | null;
    elevationM?: number | null;
  };
  selectedCut?: number;
  displayableCuts: number[];
  cuts: CutMetadata[];
  vcp?: {
    pattern?: number | string | null;
  } | null;
}

export type RadarScanMode = "Ppi" | "Rhi" | "VerticalPointing" | "Other" | string;

export interface VolumeDiagnosticsGateRange {
  firstGateM: number;
  gateSpacingM: number;
  gateCount: number;
  radialCount: number;
}

export interface VolumeDiagnosticsMoment {
  moment: string;
  radialCount: number;
  gateRange: {
    firstGateM: number;
    gateSpacingM: number;
    gateCount: number;
  };
  gateSlots: number;
  validGateCount: number;
  missingGateCount: number;
  rangeFoldedGateCount: number;
  storageBits: 8 | 16 | 32 | number;
  minValue: number | null;
  maxValue: number | null;
}

export interface VolumeDiagnosticsCut {
  index: number;
  elevationDeg: number;
  elevationNumber?: number | null;
  radialCount: number;
  geometryGateSlots: number;
  azimuth: {
    minDeg: number | null;
    maxDeg: number | null;
    spanDeg: number | null;
  };
  radialElevation: {
    minDeg: number | null;
    maxDeg: number | null;
    spanDeg: number | null;
  };
  nyquistVelocityMps: {
    min: number | null;
    max: number | null;
  };
  gateRanges: VolumeDiagnosticsGateRange[];
  gateRangeVariantCount: number;
  moments: VolumeDiagnosticsMoment[];
  isRhiLike: boolean;
  isPpiLike: boolean;
  isSectorLike: boolean;
}

export interface VolumeDiagnosticsMomentTotal {
  moment: string;
  radialCount: number;
  maxGateCount: number;
  gateSlots: number;
  validGateCount: number;
  missingGateCount: number;
  rangeFoldedGateCount: number;
  minValue: number | null;
  maxValue: number | null;
}

export interface VolumeDiagnosticsTotals {
  cutCount: number;
  radialCount: number;
  maxRadialsPerCut: number;
  maxGateCount: number;
  geometryGateSlots: number;
  momentGateSlots: number;
  validGateCount: number;
  missingGateCount: number;
  rangeFoldedGateCount: number;
  largestMomentGateSlots: number;
}

export interface VolumeDiagnostics3dSpec {
  coordinateSpace: "radar-local-enu-km" | string;
  source: "decoded-volume-gates" | string;
  preservesGateResolution: boolean;
  largestMomentGateSlots: number;
  estimatedPositionBytes: number;
  estimatedValueBytes: number;
  estimatedColorBytes: number;
  recommendedVertexStrideBytes: number;
  notes: string[];
}

export interface VolumeDiagnostics {
  type: "bowecho-volume-diagnostics-v1";
  site: string;
  volumeTime: string;
  siteLocation?: {
    lat?: number | null;
    lon?: number | null;
    elevationM?: number | null;
  };
  scanMode?: RadarScanMode | null;
  vcp?: {
    pattern?: number | string | null;
  } | null;
  source: {
    path?: string | null;
    archiveVersion?: string | null;
    compression?: string | null;
    messageCount: number;
    decodedRadialCount: number;
    skippedMessageCount: number;
  };
  totals: VolumeDiagnosticsTotals;
  threeDimensional: VolumeDiagnostics3dSpec;
  moments: VolumeDiagnosticsMomentTotal[];
  cuts: VolumeDiagnosticsCut[];
  frame?: FrameDescriptor;
  elapsedMs?: number;
  cacheHit?: boolean;
}

export interface VolumeDiagnosticsLoop {
  type: "bowecho-volume-diagnostics-loop-v1";
  site: string;
  mode: string;
  sourceLoop: RadarLoop;
  frames: FrameDescriptor[];
  diagnostics: VolumeDiagnostics[];
  failures: Array<{ frame: FrameDescriptor; error: string }>;
  elapsedMs: number;
  cacheHit: boolean;
}

export interface RenderOptions {
  site?: string | RadarSite;
  mode?: "live" | "recent" | string;
  product?: string;
  cut?: number;
  frameCount?: number;
  width?: number;
  height?: number;
  pixelSize?: number;
  rangeKm?: number;
  smoothing?: "native" | "soften" | "interpolated" | string;
  stormDirDeg?: number;
  stormSpeedKt?: number;
  daysBack?: number;
  palette?: BrowserPalette;
  paletteText?: string;
  paletteName?: string;
  paletteFamily?: ColorTableFamilyId | string;
  paletteKey?: string;
  onProgress?: (event: ProgressEvent) => void;
}

export type CrossSectionPointInput =
  | RadarOffset
  | LonLat
  | [number, number]
  | { east?: number; north?: number; x?: number; y?: number };

export interface CrossSectionOptions extends RenderOptions {
  start?: CrossSectionPointInput;
  end?: CrossSectionPointInput;
  startPoint?: CrossSectionPointInput;
  endPoint?: CrossSectionPointInput;
  from?: CrossSectionPointInput;
  to?: CrossSectionPointInput;
  topKm?: number;
  heightKm?: number;
}

export interface NativeRhiOptions extends RenderOptions {
  topKm?: number;
  heightKm?: number;
  maxRangeKm?: number;
  allowDownscale?: boolean;
  requireRhi?: boolean;
}

export interface NativePpiOptions extends RenderOptions {}

export interface TorTracksOptions extends RenderOptions {
  halfExtentKm?: number;
  cellKm?: number;
  gridKm?: number;
}

export interface MultiSiteLoopOptions extends RenderOptions {
  sites?: string[];
  concurrency?: number;
  maxSkewMs?: number;
}

export interface ProgressEvent {
  stage: "list" | "render" | string;
  site?: string;
  mode?: string;
  product?: string;
  cut?: number;
  frames?: number;
}

export interface RenderedFrame {
  frame: FrameDescriptor;
  meta: ProductMetadata;
  rgba: Uint8ClampedArray;
  width: number;
  height: number;
  elapsedMs: number;
  cacheHit: boolean;
  renderOptions: Required<Pick<RenderOptions, "product" | "cut" | "width" | "height" | "rangeKm" | "smoothing" | "stormDirDeg" | "stormSpeedKt">> & Partial<Pick<RenderOptions, "paletteText" | "paletteName" | "paletteFamily" | "paletteKey">>;
  imageData: ImageData | null;
}

export interface CrossSectionMetadata {
  type: "bowecho-cross-section-v1";
  site: string;
  volumeTime: string;
  product: string;
  units: string;
  colorFamily: ColorTableFamilyId;
  source: "reconstructed-volume" | string;
  width: number;
  height: number;
  topKm: number;
  lengthKm: number;
  start: RadarOffset;
  end: RadarOffset;
  valueRange: {
    min: number | null;
    max: number | null;
    finite: number;
  };
}

export interface RenderedCrossSection {
  frame: FrameDescriptor;
  meta: CrossSectionMetadata;
  rgba: Uint8ClampedArray;
  width: number;
  height: number;
  elapsedMs: number;
  cacheHit: boolean;
  renderOptions: {
    site: string;
    product: string;
    width: number;
    height: number;
    topKm: number;
    start: RadarOffset;
    end: RadarOffset;
    paletteText?: string;
    paletteName?: string;
    paletteFamily?: ColorTableFamilyId | string;
    paletteKey?: string;
  };
  imageData: ImageData | null;
}

export interface NativeRhiMetadata {
  type: "bowecho-native-rhi-v1";
  site: string;
  volumeTime: string;
  product: string;
  units: string;
  colorFamily: ColorTableFamilyId | string;
  source: "native-rhi-sweep" | string;
  scanMode: string;
  rhiLike: boolean;
  cutIndex: number;
  fixedAzimuthDeg: number | null;
  width: number;
  height: number;
  topKm: number;
  maxRangeKm: number;
  native: {
    width: number;
    height: number;
    gateCount: number;
    radialCount: number;
    preservesGateResolution: boolean;
    allowDownscale: boolean;
  };
  coverage: {
    topKm: number;
    maxRangeKm: number;
  };
  gateRange: {
    firstGateM: number;
    gateSpacingM: number;
    gateCount: number;
  };
  valueRange: {
    min: number | null;
    max: number | null;
    finite: number;
  };
}

export interface RenderedNativeRhi {
  frame: FrameDescriptor;
  meta: NativeRhiMetadata;
  rgba: Uint8ClampedArray;
  width: number;
  height: number;
  elapsedMs: number;
  cacheHit: boolean;
  renderOptions: {
    product: string;
    cut: number;
    width: number;
    height: number;
    topKm: number;
    maxRangeKm: number;
    allowDownscale: boolean;
    requireRhi: boolean;
    paletteText?: string;
    paletteName?: string;
    paletteFamily?: ColorTableFamilyId | string;
    paletteKey?: string;
  };
  imageData: ImageData | null;
}

export interface NativePpiMetadata {
  type: "bowecho-native-ppi-v1";
  site: string;
  volumeTime: string;
  product: string;
  units: string;
  colorFamily: ColorTableFamilyId | string;
  source: "native-ppi-gates" | string;
  scanMode: string;
  ppiLike: boolean;
  cutIndex: number;
  elevationDeg: number;
  elevationNumber: number | null;
  width: number;
  height: number;
  rangeKm: number;
  native: {
    width: number;
    height: number;
    gateCount: number;
    radialCount: number;
    preservesGateResolution: boolean;
  };
  gateRange: {
    firstGateM: number;
    gateSpacingM: number;
    gateCount: number;
  };
  azimuth: {
    firstDeg: number | null;
    stepDeg: number | null;
    spanDeg: number | null;
  };
  radialElevation: {
    minDeg: number | null;
    maxDeg: number | null;
    spanDeg: number | null;
  };
  valueRange: {
    min: number | null;
    max: number | null;
    finite: number;
    painted: number;
  };
}

export interface RenderedNativePpi {
  frame: FrameDescriptor;
  meta: NativePpiMetadata;
  rgba: Uint8ClampedArray;
  azimuths: Float32Array;
  width: number;
  height: number;
  rangeKm: number;
  elapsedMs: number;
  cacheHit: boolean;
  renderOptions: {
    product: string;
    cut: number;
    width: number;
    height: number;
    rangeKm: number;
    paletteText?: string;
    paletteName?: string;
    paletteFamily?: ColorTableFamilyId | string;
    paletteKey?: string;
  };
  imageData: ImageData | null;
}

export interface TorTracksValueRange {
  min: number | null;
  max: number | null;
  finite: number;
  painted: number;
}

export interface TdsGate {
  id: string;
  eastKm: number;
  northKm: number;
  cc: number;
  dbz: number;
  frameIndex?: number | null;
  frameId?: string | null;
  volumeTime?: string | null;
}

export interface TorTracksMetadata {
  type: "bowecho-tor-tracks-frame-v1" | "bowecho-tor-tracks-loop-frame-v1";
  site: string;
  volumeTime: string;
  grid: {
    width: number;
    height: number;
    halfExtentKm: number;
    cellKm: number;
    kmPerPxX: number;
    kmPerPxY: number;
    bounds?: {
      westKm: number;
      southKm: number;
      eastKm: number;
      northKm: number;
    };
  };
  units: "1e-3/s" | string;
  source: "low-level-azimuthal-shear" | string;
  valueRange: TorTracksValueRange;
  tds: TdsGate[];
  counts: {
    rotations?: number;
    tds: number;
    [key: string]: number | undefined;
  };
  frameIndex?: number;
  frameCount?: number;
  accumulatedFrames?: number;
}

export interface RenderedTorTracks {
  frame: FrameDescriptor;
  meta: TorTracksMetadata;
  rgba: Uint8ClampedArray;
  values: Float32Array;
  width: number;
  height: number;
  elapsedMs: number;
  cacheHit: boolean;
  renderOptions: {
    site: string;
    halfExtentKm: number;
    cellKm: number;
  };
  imageData: ImageData | null;
}

export interface RadarLoop {
  readonly length: number;
  site: string;
  mode: string;
  product: string;
  cut: number;
  frames: FrameDescriptor[];
  renderedFrames: RenderedFrame[];
  meta: ProductMetadata;
  renderOptions: RenderedFrame["renderOptions"];
  source?: string;
  archiveWindow?: NexradArchiveWindow;
  siteDescriptor?: RadarSite;
  frame(index?: number): RenderedFrame;
}

export interface CrossSectionLoop {
  type: "bowecho-cross-section-loop-v1";
  readonly length: number;
  site: string;
  mode: string;
  product: string;
  sourceLoop: RadarLoop;
  frames: FrameDescriptor[];
  sections: RenderedCrossSection[];
  renderOptions: RenderedCrossSection["renderOptions"];
  section(index?: number): RenderedCrossSection;
  panel(index?: number, options?: CrossSectionOptions): RadarCrossSectionPanel;
}

export interface NativeRhiLoop {
  type: "bowecho-native-rhi-loop-v1";
  readonly length: number;
  site: string;
  mode: string;
  product: string;
  sourceLoop: RadarLoop;
  frames: FrameDescriptor[];
  panels: RenderedNativeRhi[];
  renderOptions: RenderedNativeRhi["renderOptions"];
  panel(index?: number): RenderedNativeRhi;
  frame(index?: number): RenderedNativeRhi;
  draw(canvas: HTMLCanvasElement, index?: number): HTMLCanvasElement;
}

export type RotationStrength = "weak" | "moderate" | "mesocyclone" | "tvs" | string;

export interface StormCellAnalysis {
  id: string;
  eastKm: number;
  northKm: number;
  maxDbz: number;
  areaKm2: number;
  eqRadiusKm: number;
  mass: number;
  hlevelDbz: number;
}

export interface RotationAnalysis {
  id: string;
  azimuthDeg: number;
  rangeKm: number;
  eastKm: number;
  northKm: number;
  vrotMps: number;
  gateToGateDvMps: number;
  rank: number;
  depthTilts: number;
  depthKm: number;
  baseElevationDeg: number;
  strength: RotationStrength;
}

export interface RotationTiltSummary {
  elevationDeg: number;
  featureCount: number;
  bestRank: number;
}

export interface RadarAnalysis {
  type: "bowecho-analysis-v1";
  frame: FrameDescriptor;
  site: string;
  volumeTime: string;
  siteLocation?: {
    lat?: number | null;
    lon?: number | null;
    elevationM?: number | null;
  };
  cells: StormCellAnalysis[];
  rotations: RotationAnalysis[];
  rotationTilts: RotationTiltSummary[];
  counts: {
    cells: number;
    rotations: number;
    rotationTilts: number;
  };
  elapsedMs: number;
  cacheHit: boolean;
}

export interface AnalysisLoop {
  type: "bowecho-analysis-loop-v1";
  readonly length: number;
  site: string;
  mode: string;
  sourceLoop: RadarLoop;
  frames: FrameDescriptor[];
  analyses: RadarAnalysis[];
  analysisOptions: {
    site: string;
  };
  analysis(index?: number): RadarAnalysis;
  overlay(index?: number, options?: RenderOptions): RadarAnalysisOverlay;
}

export interface TorTracksLoop {
  type: "bowecho-tor-tracks-loop-v1";
  readonly length: number;
  site: string;
  mode: string;
  sourceLoop: RadarLoop;
  frames: FrameDescriptor[];
  tracks: RenderedTorTracks[];
  renderOptions: RenderedTorTracks["renderOptions"];
  elapsedMs: number;
  cacheHit: boolean;
  frame(index?: number): RenderedTorTracks;
  layer(index?: number, options?: TorTracksOptions): RadarTorTracksLayer;
}

export interface SynchronizedFrameEntry {
  site: string;
  loop: RadarLoop;
  frame: RenderedFrame | null;
  frameIndex: number;
  time: string | null;
  millis: number;
  skewMs: number;
  missing: boolean;
}

export interface SynchronizedSlot {
  time: string | null;
  millis: number;
  frames: SynchronizedFrameEntry[];
  bySite: Record<string, SynchronizedFrameEntry>;
  complete: boolean;
}

export interface SynchronizedRadarLoop {
  type: "bowecho-synchronized-loops-v1";
  readonly length: number;
  sites: string[];
  product: string;
  mode: string;
  loops: RadarLoop[];
  frameTimes: Array<string | null>;
  slots: SynchronizedSlot[];
  maxSkewMs: number;
  failures: Array<{ site: string; error: string }>;
  syncOptions: {
    maxSkewMs: number;
    product: string;
    mode: string;
  };
  slot(index?: number): SynchronizedSlot;
  frames(index?: number): SynchronizedFrameEntry[];
  frame(siteId: string, index?: number): RenderedFrame | null;
  loopForSite(siteId: string): RadarLoop | null;
  textureLayers(index?: number, textureOptions?: RenderOptions): RadarTextureLayer[];
  nearestTimeIndex(time: string | number | Date): number;
}

export interface RealtimeVolumeChunk {
  key: string;
  size: number;
  site: string;
  volumeId: number;
  date: string;
  time: string;
  chunkId: number;
  type: string;
}

export interface RealtimeVolumeDescriptor {
  site: string;
  volumeId: number;
  chunks: RealtimeVolumeChunk[];
  complete: boolean;
  totalSize: number;
  dateTime: string;
  volumeTime: string;
}

export interface ImportedFrameResult {
  frame: FrameDescriptor;
  summary: {
    type: "bowecho-volume-summary-v1";
    site: string;
    volumeTime: string;
    siteLocation?: {
      lat?: number | null;
      lon?: number | null;
      elevationM?: number | null;
    };
    cutCount: number;
    moments: string[];
    vcp?: { pattern?: number | string | null } | null;
    metadata?: Record<string, unknown>;
  };
  elapsedMs: number;
  cacheHit: boolean;
}

export interface PollLiveResult {
  status: "idle" | "updated";
  frame: FrameDescriptor;
  loop: RadarLoop;
}

export interface PollMultiSiteLiveResult {
  status: "idle" | "updated";
  updates: Array<{ site: string; frame: FrameDescriptor }>;
  failures: Array<{ site: string; error: string }>;
  multiLoop: SynchronizedRadarLoop;
}

export interface WorkerCacheStats {
  bytes: number;
  volumes: number;
  metadata: number;
  renders: number;
  sections: number;
  nativePpi: number;
  nativeRhi: number;
  diagnostics: number;
  analyses: number;
  torTracks: number;
  limits: WorkerCacheLimits;
  maxBytes: number;
  maxVolumes: number;
  maxMetadata: number;
  maxRenders: number;
  maxSections: number;
  maxNativePpi: number;
  maxNativeRhi: number;
  maxDiagnostics: number;
  maxAnalyses: number;
  maxTorTracks: number;
}

export interface WorkerCacheLimits {
  bytes?: number;
  volumes?: number;
  metadata?: number;
  renders?: number;
  sections?: number;
  nativePpi?: number;
  nativeRhi?: number;
  diagnostics?: number;
  analyses?: number;
  torTracks?: number;
}

export interface WarmFrameResult {
  frameId?: string;
  cacheKey?: string;
  byteCacheHit?: boolean;
  volumeCacheHit?: boolean;
  metaCacheHit?: boolean | null;
  site?: string | null;
  volumeTime?: string | null;
  elapsedMs: number;
  error?: string;
}

export interface WarmFramesResult {
  frames: WarmFrameResult[];
  warmed: number;
  failed: number;
  elapsedMs: number;
  stats: WorkerCacheStats;
}

export interface WorkerClient {
  sniffBytes(bytes: Uint8Array | ArrayBuffer): Promise<{ format: SupportedByteFormatId; size: number }>;
  importBytes(bytes: Uint8Array | ArrayBuffer, options?: {
    id?: string;
    fileName?: string;
    source?: string;
    cacheKey?: string;
    provider?: string;
  }): Promise<ImportedFrameResult>;
  importByteParts(parts: Array<Uint8Array | ArrayBuffer>, options?: {
    id?: string;
    fileName?: string;
    source?: string;
    cacheKey?: string;
    provider?: string;
    format?: SupportedByteFormatId;
    entries?: ZipEntryDescriptor[];
  }): Promise<ImportedArchiveFrameResult>;
  meta(frame: FrameDescriptor, product: string): Promise<{ meta: ProductMetadata }>;
  diagnostics(frame: FrameDescriptor, options?: Record<string, unknown>): Promise<{
    diagnostics: Omit<VolumeDiagnostics, "frame" | "elapsedMs" | "cacheHit">;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  render(frame: FrameDescriptor, options: RenderOptions & { product: string; width: number; height: number }): Promise<{
    meta: ProductMetadata;
    rgba: Uint8Array | Uint8ClampedArray | ArrayBuffer;
    width: number;
    height: number;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  crossSection(frame: FrameDescriptor, options: CrossSectionOptions & {
    product: string;
    startEastKm: number;
    startNorthKm: number;
    endEastKm: number;
    endNorthKm: number;
    width: number;
    height: number;
    topKm: number;
  }): Promise<{
    meta: CrossSectionMetadata;
    rgba: Uint8Array | Uint8ClampedArray | ArrayBuffer;
    width: number;
    height: number;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  nativePpi(frame: FrameDescriptor, options: NativePpiOptions & {
    product: string;
    cut: number;
  }): Promise<{
    meta: NativePpiMetadata;
    rgba: Uint8Array | Uint8ClampedArray | ArrayBuffer;
    azimuths: Float32Array | ArrayBuffer;
    width: number;
    height: number;
    rangeKm: number;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  nativeRhi(frame: FrameDescriptor, options: NativeRhiOptions & {
    product: string;
    cut: number;
    width: number;
    height: number;
    topKm: number;
    maxRangeKm: number;
    allowDownscale: boolean;
    requireRhi: boolean;
  }): Promise<{
    meta: NativeRhiMetadata;
    rgba: Uint8Array | Uint8ClampedArray | ArrayBuffer;
    width: number;
    height: number;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  analysis(frame: FrameDescriptor, options?: { site?: string }): Promise<{
    analysis: Omit<RadarAnalysis, "frame" | "elapsedMs" | "cacheHit">;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  torTracksFrame(frame: FrameDescriptor, options: {
    site?: string;
    halfExtentKm: number;
    cellKm: number;
  }): Promise<{
    meta: TorTracksMetadata;
    rgba: Uint8Array | Uint8ClampedArray | ArrayBuffer;
    values: Float32Array | ArrayBuffer;
    width: number;
    height: number;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  torTracksLoop(frames: FrameDescriptor[], options: {
    site?: string;
    halfExtentKm: number;
    cellKm: number;
  }): Promise<{
    tracks: Array<{
      frame: FrameDescriptor;
      meta: TorTracksMetadata;
      rgba: Uint8Array | Uint8ClampedArray | ArrayBuffer;
      values: Float32Array | ArrayBuffer;
      width: number;
      height: number;
      elapsedMs: number;
      cacheHit?: boolean;
    }>;
    elapsedMs: number;
    cacheHit?: boolean;
  }>;
  configureCache(options?: WorkerCacheLimits): Promise<WorkerCacheStats>;
  warm(frames: FrameDescriptor[], options?: {
    product?: string;
    metadata?: boolean;
    concurrency?: number;
  }): Promise<WarmFramesResult>;
  stats(): Promise<WorkerCacheStats>;
  clear(): Promise<{ cleared: boolean }>;
}

export interface ToolboxOptions {
  archiveUrl?: string;
  chunksUrl?: string;
  workerUrl?: string | URL;
  workerClient?: WorkerClient;
}

export interface RadarOffset {
  eastKm: number;
  northKm: number;
}

export interface LonLat {
  lon: number;
  lat: number;
}

export interface WebMercatorPoint {
  x: number;
  y: number;
}

export interface WorldPixelPoint {
  x: number;
  y: number;
  zoom: number;
  tileSize: number;
  worldSize: number;
}

export interface GeoBounds {
  west: number;
  south: number;
  east: number;
  north: number;
}

export type MapCenterInput =
  | [number, number]
  | {
    lon?: number;
    lng?: number;
    longitude?: number;
    lat?: number;
    latitude?: number;
  };

export type MapPaddingInput =
  | number
  | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    x?: number;
    y?: number;
    horizontal?: number;
    vertical?: number;
  };

export interface MapViewOptions {
  center?: MapCenterInput;
  lngLat?: MapCenterInput;
  lonLat?: MapCenterInput;
  centerLon?: number;
  centerLat?: number;
  lon?: number;
  lat?: number;
  longitude?: number;
  latitude?: number;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  width?: number;
  height?: number;
  clientWidth?: number;
  clientHeight?: number;
  tileSize?: number;
}

export interface MapFitOptions extends MapViewOptions {
  padding?: MapPaddingInput;
}

export interface BowEchoMapView {
  type: "bowecho-map-view-v1";
  center: LonLat & {
    mercator: WebMercatorPoint;
    world: WorldPixelPoint;
  };
  zoom: number;
  width: number;
  height: number;
  tileSize: number;
  worldSize: number;
  minZoom: number;
  maxZoom: number;
  bounds: GeoBounds;
  unwrappedBounds: GeoBounds;
  mercatorBounds: GeoBounds;
  antimeridian: boolean;
}

export interface MapTileDescriptor {
  z: number;
  x: number;
  y: number;
  rawX: number;
  key: string;
  url: string | null;
  bounds: GeoBounds & {
    antimeridian: boolean;
    unwrappedWest: number;
    unwrappedEast: number;
  };
}

export interface MapTileCover {
  type: "bowecho-map-tile-cover-v1";
  z: number;
  zoom: number;
  tileSize: number;
  worldSize: number;
  view: BowEchoMapView;
  bounds: GeoBounds;
  antimeridian: boolean;
  tiles: MapTileDescriptor[];
  count: number;
  clipped: boolean;
}

export interface RadarQuadMeshVertex extends LonLat {
  corner: "nw" | "ne" | "se" | "sw" | string;
  mercator: WebMercatorPoint;
  sourcePixel: [number, number];
  world: [number, number];
  screen: [number, number];
  clip: [number, number];
  uv: [number, number];
}

export interface RadarLayerQuadMesh {
  type: "bowecho-radar-quad-mesh-v1";
  id: string;
  layerId: string;
  view: BowEchoMapView;
  vertices: RadarQuadMeshVertex[];
  indices: [number, number, number, number, number, number];
  triangles: [[number, number, number], [number, number, number]];
  opacity: number;
  image: RadarTextureLayer["image"];
  bounds: GeoBounds;
  mercatorBounds: GeoBounds;
}

export interface RadarTextureCorner extends RadarOffset, LonLat {
  pixel: [number, number];
  mercator: WebMercatorPoint;
}

export interface RadarTextureLayer {
  type: "bowecho-radar-texture-v1";
  id: string;
  site: RadarSite;
  product: string;
  cut: number;
  source: string;
  frame: FrameDescriptor;
  image: {
    rgba: Uint8ClampedArray;
    imageData: ImageData | null;
    width: number;
    height: number;
    premultipliedAlpha: false;
    colorSpace: "srgb";
  };
  viewport: {
    width: number;
    height: number;
    radarX: number;
    radarY: number;
    rangeKm: number;
    kmPerPxX: number;
    kmPerPxY: number;
    northUp: true;
  };
  center: LonLat & { mercator: WebMercatorPoint };
  corners: {
    nw: RadarTextureCorner;
    ne: RadarTextureCorner;
    se: RadarTextureCorner;
    sw: RadarTextureCorner;
  };
  quad: [RadarTextureCorner, RadarTextureCorner, RadarTextureCorner, RadarTextureCorner];
  bounds: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
  mercatorBounds: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
  opacity: number;
  cacheHit: boolean;
  elapsedMs: number;
}

export interface CrossSectionPoint extends RadarOffset, LonLat {
  mercator: WebMercatorPoint;
}

export interface RadarCrossSectionPanel {
  type: "bowecho-cross-section-panel-v1";
  id: string;
  site: RadarSite;
  product: string;
  source: string;
  frame: FrameDescriptor;
  image: {
    rgba: Uint8ClampedArray;
    imageData: ImageData | null;
    width: number;
    height: number;
    premultipliedAlpha: false;
    colorSpace: "srgb";
  };
  geometry: {
    start: CrossSectionPoint;
    end: CrossSectionPoint;
    lengthKm: number;
    topKm: number;
    path: [CrossSectionPoint, CrossSectionPoint];
    coordinates: [[number, number], [number, number]];
    mercatorPath: [WebMercatorPoint, WebMercatorPoint];
  };
  axes: {
    x: { label: string; units: "km"; min: number; max: number };
    y: { label: string; units: "km"; min: number; max: number };
  };
  units: string;
  colorFamily: ColorTableFamilyId | string;
  valueRange: CrossSectionMetadata["valueRange"] | null;
  opacity: number;
  cacheHit: boolean;
  elapsedMs: number;
}

export interface RadarAnalysisFeature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    kind: "stormCell" | "rotation" | string;
    id: string | null;
    site: string;
    volumeTime: string | null;
    frameId: string | null;
    eastKm: number;
    northKm: number;
    mercator: WebMercatorPoint;
    [key: string]: unknown;
  };
}

export interface RadarAnalysisOverlay {
  type: "bowecho-analysis-overlay-v1";
  id: string;
  site: RadarSite;
  frame: FrameDescriptor;
  volumeTime: string | null;
  cells: RadarAnalysisFeature[];
  rotations: RadarAnalysisFeature[];
  rotationTilts: RotationTiltSummary[];
  counts: {
    cells: number;
    rotations: number;
    features: number;
    rotationTilts: number;
  };
  geojson: {
    type: "FeatureCollection";
    features: RadarAnalysisFeature[];
  };
  cacheHit: boolean;
  elapsedMs: number;
}

export interface RadarTorTracksFeature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    kind: "tds";
    id: string;
    site: string;
    volumeTime: string | null;
    frameId: string | null;
    frameIndex: number | null;
    eastKm: number;
    northKm: number;
    cc: number | null;
    dbz: number | null;
    mercator: WebMercatorPoint;
  };
}

export interface RadarTorTracksLayer {
  type: "bowecho-tor-tracks-layer-v1";
  id: string;
  site: RadarSite;
  source: string;
  frame: FrameDescriptor;
  volumeTime: string | null;
  image: {
    rgba: Uint8ClampedArray;
    imageData: ImageData | null;
    width: number;
    height: number;
    premultipliedAlpha: false;
    colorSpace: "srgb";
  };
  values: Float32Array;
  grid: TorTracksMetadata["grid"];
  center: LonLat & { mercator: WebMercatorPoint };
  corners: {
    nw: RadarTextureCorner;
    ne: RadarTextureCorner;
    se: RadarTextureCorner;
    sw: RadarTextureCorner;
  };
  quad: [RadarTextureCorner, RadarTextureCorner, RadarTextureCorner, RadarTextureCorner];
  bounds: RadarTextureLayer["bounds"];
  mercatorBounds: RadarTextureLayer["mercatorBounds"];
  valueRange: TorTracksValueRange | null;
  tds: {
    gates: TdsGate[];
    geojson: {
      type: "FeatureCollection";
      features: RadarTorTracksFeature[];
    };
  };
  counts: {
    tds: number;
    rotations?: number;
    [key: string]: number | undefined;
  };
  opacity: number;
  cacheHit: boolean;
  elapsedMs: number;
}

export type RadarCompositeBlendMode = "source-over" | "max-rgb" | "first" | "last" | string;

export interface RadarCompositeLayer {
  type: "bowecho-radar-composite-v1";
  id: string;
  site: RadarSite;
  product: string;
  cut: number | null;
  source: "composite";
  frame: {
    id: string | null;
    source: "composite";
    volumeTime: string | null;
  };
  image: {
    rgba: Uint8ClampedArray;
    imageData: ImageData | null;
    width: number;
    height: number;
    premultipliedAlpha: false;
    colorSpace: "srgb";
  };
  viewport: RadarTextureLayer["viewport"];
  center: LonLat & { mercator: WebMercatorPoint };
  corners: RadarTextureLayer["corners"];
  quad: RadarTextureLayer["quad"];
  bounds: RadarTextureLayer["bounds"];
  mercatorBounds: RadarTextureLayer["mercatorBounds"];
  layers: Array<{
    id: string;
    site: RadarSite;
    product: string;
    cut: number;
    source: string;
    frame: FrameDescriptor;
    width: number;
    height: number;
    opacity: number;
    sampledPixels: number;
    bounds: RadarTextureLayer["bounds"];
  }>;
  blendMode: RadarCompositeBlendMode;
  opacity: number;
  cacheHit: boolean;
  elapsedMs: number;
  counts: {
    layers: number;
    paintedPixels: number;
    transparentPixels: number;
    sampledPixels: number;
  };
}

export interface RadarCompositeOptions {
  id?: string;
  frameId?: string;
  volumeTime?: string | null;
  product?: string;
  cut?: number | null;
  bounds?: [number, number, number, number] | RadarTextureLayer["bounds"];
  width?: number;
  height?: number;
  pixelSize?: number;
  kmPerPixel?: number;
  maxWidth?: number;
  maxHeight?: number;
  allowDownscale?: boolean;
  blendMode?: RadarCompositeBlendMode;
  opacity?: number;
  alphaThreshold?: number;
  centerLon?: number;
  centerLat?: number;
  siteId?: string;
  siteName?: string;
}

export type RadarMapLayer = RadarTextureLayer | RadarTorTracksLayer | RadarCompositeLayer;

export interface MapboxRadarImageSource {
  type: "image";
  url: string;
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
}

export interface MapboxRadarCanvasSource {
  type: "canvas";
  canvas: string | HTMLCanvasElement;
  animate: boolean;
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
}

export interface MapboxRadarRasterLayer {
  id: string;
  type: "raster";
  source: string;
  paint: {
    "raster-opacity": number;
    "raster-fade-duration": number;
    "raster-emissive-strength"?: number;
  };
}

export interface MapboxRadarLayerSpecs {
  sourceId: string;
  source: MapboxRadarImageSource | MapboxRadarCanvasSource;
  layer: MapboxRadarRasterLayer;
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
}

export interface MapboxRadarSiteSource {
  type: "geojson";
  data: RadarSiteFeatureCollection;
}

export interface MapboxRadarSiteLayer {
  id: string;
  type: "circle";
  source: string;
  paint: Record<string, string | number>;
}

export interface DeckRadarBitmapLayerProps {
  id: string;
  image: ImageData | Uint8ClampedArray | unknown;
  bounds: [number, number, number, number] | [[number, number], [number, number], [number, number], [number, number]];
  opacity: number;
  pickable: boolean;
  textureParameters: Record<string, unknown>;
  parameters: Record<string, unknown>;
}

export interface DeckRadarSiteScatterplotLayerProps {
  id: string;
  data: RadarSiteFeature[];
  getPosition: (feature: RadarSiteFeature) => [number, number];
  getRadius: (feature: RadarSiteFeature) => number;
  getFillColor: (feature: RadarSiteFeature) => number[];
  getLineColor: (feature: RadarSiteFeature) => number[];
  lineWidthMinPixels: number;
  radiusMinPixels: number;
  radiusMaxPixels: number;
  pickable: boolean;
}

export interface WebGpuRadarTextureUpload {
  type: "bowecho-webgpu-texture-upload-v1";
  id: string;
  width: number;
  height: number;
  format: string;
  rgba: Uint8ClampedArray;
  createTexture: {
    size: [number, number, number];
    format: string;
    usageLabels: string[];
  };
  writeTexture: {
    data: Uint8ClampedArray;
    dataLayout: {
      offset: number;
      bytesPerRow: number;
      rowsPerImage: number;
    };
    size: [number, number, number];
  };
  georeference: {
    site: RadarSite;
    quad: RadarTextureLayer["quad"];
    bounds: RadarTextureLayer["bounds"];
    mercatorBounds: RadarTextureLayer["mercatorBounds"];
  };
}

export interface CutChoice {
  index: number;
  value: number;
  label: string;
  elevationDeg: number | null;
  elevationNumber: number | null;
  radials: number | null;
  moments: string[];
  products: string[];
  displayable: boolean;
  selected: boolean;
}

export interface LoopTimelineEntry {
  index: number;
  id: string | null;
  cacheKey: string | null;
  source: string | null;
  volumeTime: string | null;
  millis: number;
  ageSeconds: number | null;
  product: string | null;
  cut: number | null;
  width: number;
  height: number;
  cacheHit: boolean;
  elapsedMs: number;
  current: boolean;
  latest: boolean;
}

export interface RadarSessionFrameSummary {
  index: number;
  id: string | null;
  cacheKey: string | null;
  source: string | null;
  volumeTime: string | null;
  product: string | null;
  cut: number | null;
  width: number;
  height: number;
  cacheHit: boolean;
  elapsedMs: number;
}

export type RadarSessionStatus = "idle" | "loading" | "ready" | "rerendering" | "warming" | "polling" | "error" | string;

export interface RadarSessionSnapshot {
  type: "bowecho-radar-session-v1";
  status: RadarSessionStatus;
  error: string | null;
  site: string;
  mode: string;
  product: string;
  productDescriptor: ProductDescriptor | null;
  cut: number | null;
  frameCount: number;
  width: number;
  height: number;
  rangeKm: number;
  smoothing: string;
  stormDirDeg: number;
  stormSpeedKt: number;
  loopSpeedPercent: number;
  pollIntervalMs: number;
  followLatest: boolean;
  playing: boolean;
  livePolling: boolean;
  loaded: boolean;
  index: number;
  latestIndex: number;
  length: number;
  frame: RadarSessionFrameSummary | null;
  timeline: LoopTimelineEntry[];
  cuts: CutChoice[];
  capabilities: CapabilityHints;
  lastPoll: {
    status: string;
    time: string;
    frameId: string | null;
    volumeTime: string | null;
  } | null;
}

export interface RadarSessionWarmResult {
  type: "bowecho-radar-session-warm-v1";
  products: Array<{ product: string; result: WarmFramesResult }>;
  warmed: number;
  failed: number;
  stats: WorkerCacheStats | null;
}

export interface RadarSessionPollResult {
  status: "idle" | "updated";
  frame: FrameDescriptor;
  snapshot: RadarSessionSnapshot;
}

export interface RadarSessionOptions extends RenderOptions {
  loopSpeedPercent?: number;
  pollIntervalMs?: number;
  followLatest?: boolean;
  index?: number | "latest";
  warmProducts?: string | string[];
  warmOptions?: { product?: string; metadata?: boolean; concurrency?: number };
  toolboxOptions?: ToolboxOptions;
}

export const PRODUCT_CATALOG: ProductDescriptor[];
export const PRODUCT_CAPABILITY_CATALOG: Record<string, Omit<ProductCapabilityDescriptor, "product">>;
export const COLOR_TABLE_FAMILIES: ColorTableFamilyDescriptor[];
export const PROFILER_SITE_IDS: Set<string>;
export const RADAR_SITES: RadarSite[];
export const GLOBAL_RADAR_PROVIDERS: GlobalRadarProvider[];
export const INTERNATIONAL_RADAR_SITES: InternationalRadarSite[];
export const COMMUNITY_RADAR_FEEDS: CommunityRadarFeed[];
export const COMMUNITY_RADAR_MARKERS: CommunityRadarMarker[];
export const SUPPORTED_BYTE_FORMATS: SupportedByteFormatDescriptor[];
export const FRAME_PROVIDER_CATALOG: FrameProviderDescriptor[];

export function createRadarToolbox(options?: ToolboxOptions): BowEchoRadarToolbox;
export function createRadarSession(toolbox: BowEchoRadarToolbox, options?: RadarSessionOptions): RadarSession;
export function createRadarSession(options?: RadarSessionOptions): RadarSession;
export function frameProviders(): FrameProviderDescriptor[];
export function supportedByteFormats(): SupportedByteFormatDescriptor[];
export function supportedArchiveFormats(): SupportedByteFormatDescriptor[];
export function isZipBytes(bytes: Uint8Array | ArrayBuffer): boolean;
export function parseZipDirectory(bytes: Uint8Array | ArrayBuffer, options?: { includeDirectories?: boolean; encoding?: string }): ZipEntryDescriptor[];
export function extractZipEntries(bytes: Uint8Array | ArrayBuffer, options?: { includeDirectories?: boolean; encoding?: string; maxEntries?: number; filter?: (entry: ZipEntryDescriptor) => boolean; pattern?: string }): Promise<ExtractedZipEntry[]>;
export function extractMobileArchiveEntries(bytes: Uint8Array | ArrayBuffer, options?: { encoding?: string; maxEntries?: number; filter?: (entry: ZipEntryDescriptor) => boolean; pattern?: string }): Promise<ExtractedZipEntry[]>;
export function colorFamilies(): ColorTableFamilyDescriptor[];
export function colorFamilyForProduct(productCode: string): ColorTableFamilyId;
export function productDescriptor(productCode: string): ProductDescriptor | null;
export function productCapability(productCode: string): ProductCapabilityDescriptor | null;
export function productChoicesFromMetadata(meta: ProductMetadata, options?: { product?: string; selectedProduct?: string; cut?: number; selectedCut?: number; availableOnly?: boolean; displayableOnly?: boolean }): ProductChoice[];
export function capabilityHintsFromMetadata(meta: ProductMetadata, options?: { site?: string; product?: string; selectedProduct?: string; cut?: number; selectedCut?: number; displayableOnly?: boolean; warmProducts?: string | string[]; recommendedWarmProducts?: string | string[] }): CapabilityHints;
export function familyForPaletteProductCode(productCode: string): ColorTableFamilyId;
export function paletteProductCodeForFamily(familyId: string): string | null;
export function parseGrPalette(text: string, options?: { name?: string; fileName?: string; family?: string }): BrowserPalette;
export function exportGrPalette(palette: BrowserPalette, options?: { family?: string; productCode?: string | null; units?: string; legendStep?: number; rangeFolded?: [number, number, number, number] }): string;
export function validatePalette(palette: BrowserPalette): true;
export function paletteBinding(palette: BrowserPalette, productOrFamily?: string): PaletteBinding;
export function createPaletteFromStops(stops: PaletteStop[], options?: Partial<BrowserPalette>): BrowserPalette;
export function clonePalette(palette: BrowserPalette, options?: Partial<BrowserPalette>): BrowserPalette;
export function palettePreviewCss(palette: BrowserPalette, options?: { min?: number; max?: number }): string;
export function serializePaletteLibrary(palettes: BrowserPalette[], options?: { pretty?: boolean; updatedAt?: string }): string;
export function deserializePaletteLibrary(text: string | PaletteLibraryDocument | BrowserPalette[], options?: { strict?: boolean }): BrowserPalette[];
export function createPaletteStore(options?: { key?: string; storage?: PaletteStorageAdapter; initialText?: string; initialPalettes?: BrowserPalette[]; pretty?: boolean }): PaletteStore;
export function synchronizeRadarLoops(loops: RadarLoop[], options?: MultiSiteLoopOptions): SynchronizedRadarLoop;
export function radarSitesGeoJson(options?: SiteSearchOptions): RadarSiteFeatureCollection;
export function radarSourceCatalog(options?: { query?: string; providerId?: string | string[]; providerIds?: string[] | string; providers?: string[] | string; kind?: string | string[]; kinds?: string[] | string }): GlobalRadarProvider[];
export function internationalRadarSites(options?: RadarSiteCatalogOptions): InternationalRadarSite[];
export function internationalRadarProvider(providerId: string): GlobalRadarProvider | null;
export function internationalRadarSite(providerId: string, siteId: string): InternationalFramePlan["site"] | null;
export function internationalRadarSite(siteIdOrDescriptor: string | InternationalRadarSite | InternationalFramePlan["site"]): InternationalFramePlan["site"] | null;
export function smhiAreaCatalogUrl(options?: InternationalFetchOptions): string;
export function smhiQcvolCatalogUrl(siteId: string, options?: InternationalFetchOptions): string;
export function smhiDatedQcvolUrl(siteId: string, key: string, options?: InternationalFetchOptions): string | null;
export function parseSmhiAreaCatalog(textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): SmhiAreaItem[];
export function parseSmhiQcvolCatalog(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): SmhiQcvolItem[];
export function smhiFramePlansFromCatalog(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function smhiFramePlanFromCatalog(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan;
export function s3StyleListingUrl(baseUrl: string, options?: InternationalFetchOptions): string;
export function parseS3StyleListing(textOrListing: string | Partial<S3StyleListing> | { contents?: Array<Partial<S3StyleListingContent>>; keys?: string[]; prefixes?: string[]; commonPrefixes?: string[]; isTruncated?: boolean; nextContinuationToken?: string | null }): S3StyleListing;
export function nexradArchiveDatePrefix(siteId: string, dateOrString?: string | Date | NexradArchiveDateParts): string;
export function nexradArchiveListingUrl(siteId: string, dateOrString?: string | Date | NexradArchiveDateParts, options?: InternationalFetchOptions): string;
export function parseNexradArchiveListing(siteId: string, dateOrString: string | Date | NexradArchiveDateParts, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): FrameDescriptor[];
export function archiveFrameWindow(frames: FrameDescriptor[], options?: { site?: string; date?: string | Date | NexradArchiveDateParts; frameCount?: number; count?: number; selectedIndex?: number; index?: number; targetTime?: string | Date; time?: string | Date }): NexradArchiveWindow;
export function spcConvectiveDate(when?: string | Date): string;
export function spcReportTimeUtc(convectiveDate: string | Date | NexradArchiveDateParts, hhmm: string | number): string | null;
export function spcReportsUrls(convectiveDate: string | Date | NexradArchiveDateParts, options?: CommunityFetchOptions & { reportsBaseUrl?: string }): string[];
export function spcWcmTornadoYearUrl(year: number, options?: { baseUrl?: string; wcmBaseUrl?: string }): string;
export function spcActualTornadoesUrl(endYear: number, options?: { baseUrl?: string; wcmBaseUrl?: string }): string;
export function spcOutlookKinds(): SpcOutlookKindDescriptor[];
export function spcOutlookLiveUrls(day?: number, kind?: SpcOutlookKind | string, options?: SpcOutlookUrlOptions): string[];
export function spcOutlookArchiveUrls(dateOrString: string | Date | NexradArchiveDateParts, day?: number, kind?: SpcOutlookKind | string, options?: SpcOutlookUrlOptions): string[];
export function spcOutlookUrls(day?: number | SpcOutlookUrlOptions, kind?: SpcOutlookKind | string | SpcOutlookUrlOptions, options?: SpcOutlookUrlOptions): string[];
export function parseSpcOutlook(textOrJson: string | Record<string, unknown>, options?: { kind?: SpcOutlookKind | string; url?: string }): SpcOutlookFeature[];
export function spcOutlookFeatureCollection(outlookOrFeatures: SpcOutlook | SpcOutlookFeature[], options?: { kind?: SpcOutlookKind | string; url?: string; idPrefix?: string }): SpcOutlookFeatureCollection;
export function fetchSpcOutlook(day?: number | SpcOutlookUrlOptions, kind?: SpcOutlookKind | string | SpcOutlookUrlOptions, options?: SpcOutlookUrlOptions): Promise<SpcOutlook>;
export function fetchSpcOutlooks(kinds?: Array<SpcOutlookKind | string> | (SpcOutlookUrlOptions & { kinds?: Array<SpcOutlookKind | string>; outlookKinds?: Array<SpcOutlookKind | string> }), options?: SpcOutlookUrlOptions): Promise<SpcOutlooks>;
export function parseSpcReports(kind: SpcReportKind | string, convectiveDate: string | Date | NexradArchiveDateParts, text: string): SpcStormReport[];
export function parseSpcReportsCombined(convectiveDate: string | Date | NexradArchiveDateParts, text: string): SpcStormReport[];
export function spcReportMagnitudeLabel(reportOrKind: SpcStormReport | SpcReportKind | string, magnitude?: string | number): string | null;
export function parseSpcTornadoSegments(convectiveDate: string | Date | NexradArchiveDateParts, text: string): SpcTornadoSegment[];
export function tornadoSegmentsFromReports(reports: SpcStormReport[]): SpcTornadoSegment[];
export function estimatedTornadoTrackEndTime(beginTime: string | Date, lengthMi?: number, options?: { translationMph?: number; maxDurationMinutes?: number }): string;
export function selectEventRadarSites(begin: { lat: number; lon?: number; lng?: number; longitude?: number } | [number, number], end?: { lat: number; lon?: number; lng?: number; longitude?: number } | [number, number], options?: RadarSiteCatalogOptions & { sites?: Array<Partial<GlobalRadarSite> & { id: string; lat: number; lon: number }>; maxDistanceKm?: number; includeTdwr?: boolean }): EventRadarSelection | null;
export function eventArchiveFrameWindow(frames: FrameDescriptor[], options?: { site?: string; startTime?: string | Date; start?: string | Date; endTime?: string | Date; end?: string | Date; targetTime?: string | Date; time?: string | Date; padFrames?: number; pad?: number; cap?: number; maxFrames?: number; frameCount?: number }): EventArchiveWindow;
export function eventArchivePlanForTrack(segmentOrReport: SpcTornadoSegment | SpcStormReport, options?: { frames?: FrameDescriptor[]; sites?: Array<Partial<GlobalRadarSite> & { id: string; lat: number; lon: number }>; site?: string; maxDistanceKm?: number; includeTdwr?: boolean; padFrames?: number; cap?: number; maxFrames?: number; frameCount?: number; translationMph?: number; maxDurationMinutes?: number }): EventArchivePlan;
export function fetchSpcEventDay(convectiveDate: string | Date | NexradArchiveDateParts, options?: CommunityFetchOptions & { reportsBaseUrl?: string; wcmBaseUrl?: string; includeConsolidated?: boolean; currentYear?: number; now?: string | Date }): Promise<SpcEventDay>;
export function geosphereStartAfterKey(dateOrNow?: string | Date, lookbackHours?: number): string;
export function geosphereVolumeListingUrl(options?: InternationalFetchOptions): string;
export function parseGeosphereVolumeListing(textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): GeosphereVolumeItem[];
export function geosphereFramePlansFromListing(textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function geosphereFramePlanFromListing(textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan;
export function parseAutoIndexListing(textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions & { includeParent?: boolean; includeAbsolute?: boolean; includeNested?: boolean }): AutoIndexEntry[];
export function shmuVolumeRootUrl(options?: InternationalFetchOptions): string;
export function shmuSiteCatalogUrl(siteId: string, options?: InternationalFetchOptions): string;
export function shmuProductCatalogUrl(siteId: string, product: string, options?: InternationalFetchOptions): string;
export function shmuProductDateListingUrl(siteId: string, product: string, date: string, options?: InternationalFetchOptions): string;
export function parseShmuDateListing(textOrEntries: string | Partial<AutoIndexEntry>[]): string[];
export function parseShmuFileListing(siteId: string, product: string, date: string, textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions): ShmuFileItem[];
export function shmuFramePlansFromProductFiles(siteId: string, filesByProduct: Record<string, ShmuFileItem[]> | Map<string, ShmuFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function shmuFramePlanFromProductFiles(siteId: string, filesByProduct: Record<string, ShmuFileItem[]> | Map<string, ShmuFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan;
export function dwdSitesRootUrl(options?: InternationalFetchOptions): string;
export function dwdProductCatalogUrl(productDir: string, options?: InternationalFetchOptions): string;
export function dwdProductStationCatalogUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
export function dwdProductHdf5CatalogUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
export function dwdProductSweepListingUrl(siteId: string, productDir: string, variant?: string, options?: InternationalFetchOptions): string;
export function parseDwdSweepListing(siteId: string, productDir: string, quantity: string, textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions): DwdSweepItem[];
export function dwdFramePlansFromProductSweeps(siteId: string, sweepsByProduct: Record<string, DwdSweepItem[]> | Map<string, DwdSweepItem[]>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function dwdFramePlanFromProductSweeps(siteId: string, sweepsByProduct: Record<string, DwdSweepItem[]> | Map<string, DwdSweepItem[]>, options?: InternationalFetchOptions): InternationalFramePlan;
export function chmiSitesRootUrl(options?: InternationalFetchOptions): string;
export function chmiSiteCatalogUrl(siteId: string, options?: InternationalFetchOptions): string;
export function chmiProductCatalogUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
export function chmiProductHdf5ListingUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
export function parseChmiFileListing(siteId: string, productDir: string, textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions): ChmiFileItem[];
export function chmiFramePlansFromProductFiles(siteId: string, filesByProduct: Record<string, ChmiFileItem[]> | Map<string, ChmiFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function chmiFramePlanFromProductFiles(siteId: string, filesByProduct: Record<string, ChmiFileItem[]> | Map<string, ChmiFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan;
export function jmaRadarBaseUrl(options?: InternationalFetchOptions): string;
export function jmaTarUrl(product?: "N5" | "N6" | string, stampOrDate?: string | Date, options?: InternationalFetchOptions): string;
export function jmaCandidateStamps(nowOrOptions?: string | Date | InternationalFetchOptions, options?: InternationalFetchOptions): string[];
export function jmaFramePlanFromStamp(siteId: string, stampOrDate: string | Date, options?: InternationalFetchOptions): InternationalFramePlan;
export function ordBucketBaseUrl(options?: InternationalFetchOptions): string;
export function ordObjectKinds(siteId: string, options?: InternationalFetchOptions): OrdObjectKind[];
export function ordHourPrefix(siteId: string, objectKind?: OrdObjectKind | string, hourOrDate?: string | Date): string;
export function ordHourListingUrl(siteId: string, objectKind?: OrdObjectKind | string, hourOrDate?: string | Date, options?: InternationalFetchOptions): string;
export function parseOrdObjectKey(siteId: string, key: string | Partial<OrdFileItem>): OrdFileItem | null;
export function ordFramePlansFromKeys(siteId: string, objectKind: OrdObjectKind | string, keysOrListing: string[] | string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function ordFramePlanFromKeys(siteId: string, objectKind: OrdObjectKind | string, keysOrListing: string[] | string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan;
export function dmiVolumeItemsUrl(siteId?: string, options?: InternationalFetchOptions): string;
export function parseDmiVolumeItems(textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): DmiVolumeItem[];
export function dmiFramePlansFromItems(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function dmiFramePlanFromItems(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan;
export function fmiDatePrefix(dateOrPrefix?: string | Date): string;
export function fmiCatalogListingUrl(options?: InternationalFetchOptions): string;
export function fmiRadarVolumeListingUrl(siteId: string, options?: InternationalFetchOptions): string;
export function parseFmiVolumeListing(siteId: string, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): FmiVolumeItem[];
export function fmiFramePlansFromListing(siteId: string, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan[];
export function fmiFramePlanFromListing(siteId: string, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan;
export function latestInternationalFramePlan(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<InternationalFramePlan>;
export function recentInternationalFramePlans(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, count?: number, options?: InternationalFetchOptions): Promise<InternationalFramePlan[]>;
export function recentInternationalFramePlans(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<InternationalFramePlan[]>;
export function internationalFrameFromPlan(plan: InternationalFramePlan, options?: InternationalFetchOptions): FrameDescriptor;
export function latestInternationalFrame(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<FrameDescriptor>;
export function recentInternationalFrames(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, count?: number, options?: InternationalFetchOptions): Promise<FrameDescriptor[]>;
export function recentInternationalFrames(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<FrameDescriptor[]>;
export function communityRadarFeeds(options?: RadarSiteCatalogOptions): CommunityRadarFeed[];
export function communityRadarFeed(feedOrId: string | CommunityRadarFeed | { id?: string; feedId?: string; pollUrl?: string; poll_url?: string; url?: string; label?: string; name?: string; site?: string; lat?: number; latitude?: number; lon?: number; lng?: number; longitude?: number; state?: string; region?: string; cluster?: string | null }): CommunityRadarFeed | null;
export function communityRadarMarkers(options?: RadarSiteCatalogOptions): CommunityRadarMarker[];
export function normalizeCustomPollUrl(input: string): string;
export function pollUrlsMatch(left: string, right: string): boolean;
export function pollUrlName(url: string): string;
export function parseCustomPollMarkerInputs(latInput?: string | number | null, lonInput?: string | number | null): CustomPollMarkerParseResult;
export function customPollEntryLatLon(entry: CustomPollLinkInput): { lat: number; lon: number } | null;
export function customPollEntryLabel(entry: CustomPollLinkInput): string;
export function customPollUrlForGisSite(basePollUrl: string, siteId: string, options?: { totalSites?: number; count?: number; placeholders?: string[] }): string;
export function parseCustomRadarGis(text: string): CustomGisSite[];
export function customPollLinksFromGis(text: string, basePollUrl: string, options?: { totalSites?: number; count?: number; placeholders?: string[] }): CustomPollLinkEntry[];
export function normalizeCustomPollLink(entry: CustomPollLinkInput, options?: { pollUrl?: string; baseUrl?: string; siteId?: string; label?: string; allowEmptyUrl?: boolean }): CustomPollLinkEntry;
export function customPollLinkFeed(entry: CustomPollLinkInput, options?: { id?: string; state?: string; cluster?: string | null }): CommunityRadarFeed & { customPollLink: CustomPollLinkEntry };
export function customPollLinksAsFeeds(entries?: CustomPollLinkInput[], options?: { id?: string; state?: string; cluster?: string | null }): Array<CommunityRadarFeed & { customPollLink: CustomPollLinkEntry }>;
export function upsertCustomPollLink(entries: CustomPollLinkInput[], entry: CustomPollLinkInput, options?: { pollUrl?: string; baseUrl?: string; siteId?: string; label?: string }): CustomPollUpsertResult;
export function customPollMarkers(entries?: CustomPollLinkInput[], options?: { query?: string }): CustomPollMarker[];
export function customPollLinksGeoJson(entries?: CustomPollLinkInput[], options?: { query?: string }): {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    id: string;
    geometry: { type: "Point"; coordinates: [number, number] };
    properties: Record<string, unknown>;
  }>;
};
export function parseCommunityDirList(text: string, options?: { prefix?: string }): CommunityDirListEntry[];
export function newestCommunityDirListEntry(textOrEntries: string | CommunityDirListEntry[], options?: { prefix?: string }): CommunityDirListEntry | null;
export function parseGrLevel2CfgSites(text: string): string[];
export function fetchCommunityDirList(feedOrId: string | CommunityRadarFeed, options?: CommunityFetchOptions): Promise<CommunityDirListPlan>;
export function communityFeedFrameFromEntry(feedOrId: string | CommunityRadarFeed, entryOrName: string | Partial<CommunityDirListEntry> | FrameDescriptor, options?: CommunityFetchOptions): FrameDescriptor;
export function latestCommunityFrame(feedOrId: string | CommunityRadarFeed, options?: CommunityFetchOptions): Promise<FrameDescriptor>;
export function recentCommunityFrames(feedOrId: string | CommunityRadarFeed, count?: number, options?: CommunityFetchOptions): Promise<FrameDescriptor[]>;
export function recentCommunityFrames(feedOrId: string | CommunityRadarFeed, options?: CommunityFetchOptions): Promise<FrameDescriptor[]>;
export function globalRadarSites(options?: RadarSiteCatalogOptions): GlobalRadarSite[];
export function globalRadarSitesGeoJson(options?: RadarSiteCatalogOptions): GlobalRadarSiteFeatureCollection;
export function mapboxGlobalRadarSiteSource(options?: RadarSiteCatalogOptions): { type: "geojson"; data: GlobalRadarSiteFeatureCollection };
export function deckGlobalRadarSiteScatterplotLayerProps(options?: RadarSiteCatalogOptions & { id?: string; radiusMeters?: number; fillColor?: number[]; lineColor?: number[]; lineWidthMinPixels?: number; radiusMinPixels?: number; radiusMaxPixels?: number; pickable?: boolean; getPosition?: (feature: GlobalRadarSiteFeature) => [number, number]; getRadius?: (feature: GlobalRadarSiteFeature) => number; getFillColor?: (feature: GlobalRadarSiteFeature) => number[]; getLineColor?: (feature: GlobalRadarSiteFeature) => number[] }): DeckRadarSiteScatterplotLayerProps & { data: GlobalRadarSiteFeature[] };
export function nearestRadarSite(lonLat: LonLat | [number, number] | { lng?: number; longitude?: number; latitude?: number }, options?: RadarSiteCatalogOptions): (GlobalRadarSite & { distanceKm: number }) | null;
export function radarSiteSourceSummary(options?: RadarSiteCatalogOptions): RadarSiteSourceSummary;
export function radarTextureLayer(renderedFrame: RenderedFrame, options?: RenderOptions): RadarTextureLayer;
export function radarCrossSectionPanel(renderedSection: RenderedCrossSection, options?: CrossSectionOptions): RadarCrossSectionPanel;
export function radarAnalysisOverlay(analysis: RadarAnalysis, options?: RenderOptions): RadarAnalysisOverlay;
export function radarTorTracksLayer(renderedTracks: RenderedTorTracks, options?: TorTracksOptions): RadarTorTracksLayer;
export function compositeRadarLayers(radarLayers: Array<RadarMapLayer | RenderedFrame>, options?: RadarCompositeOptions): RadarCompositeLayer;
export function compositeSynchronizedRadarLoopSlot(multiLoop: SynchronizedRadarLoop, index?: number, options?: RadarCompositeOptions & RenderOptions): RadarCompositeLayer;
export function mapboxRadarCoordinates(radarLayer: RadarMapLayer | RenderedFrame): [[number, number], [number, number], [number, number], [number, number]];
export function mapboxRadarImageSource(radarLayer: RadarMapLayer | RenderedFrame, options: { url: string; imageUrl?: string }): MapboxRadarImageSource;
export function mapboxRadarCanvasSource(radarLayer: RadarMapLayer | RenderedFrame, canvas: string | HTMLCanvasElement, options?: { animate?: boolean }): MapboxRadarCanvasSource;
export function mapboxRadarRasterLayer(radarLayer: RadarMapLayer | RenderedFrame, options?: { id?: string; layerId?: string; source?: string; sourceId?: string; opacity?: number; fadeDuration?: number; emissiveStrength?: number }): MapboxRadarRasterLayer;
export function mapboxRadarLayerSpecs(radarLayer: RadarMapLayer | RenderedFrame, options: { url?: string; imageUrl?: string; canvas?: string | HTMLCanvasElement; sourceId?: string; layerId?: string; opacity?: number; fadeDuration?: number; emissiveStrength?: number; animate?: boolean }): MapboxRadarLayerSpecs;
export function mapboxRadarSiteSource(options?: SiteSearchOptions): MapboxRadarSiteSource;
export function mapboxRadarSiteLayer(options?: { id?: string; layerId?: string; source?: string; sourceId?: string; radius?: number; color?: string; strokeColor?: string; strokeWidth?: number; opacity?: number }): MapboxRadarSiteLayer;
export function deckRadarBitmapLayerProps(radarLayer: RadarMapLayer | RenderedFrame, options?: { id?: string; image?: unknown; boundsFormat?: "corners" | "bbox"; opacity?: number; pickable?: boolean; textureParameters?: Record<string, unknown>; parameters?: Record<string, unknown> }): DeckRadarBitmapLayerProps;
export function deckRadarSiteScatterplotLayerProps(options?: SiteSearchOptions & { id?: string; radiusMeters?: number; fillColor?: number[]; lineColor?: number[]; lineWidthMinPixels?: number; radiusMinPixels?: number; radiusMaxPixels?: number; pickable?: boolean; getPosition?: (feature: RadarSiteFeature) => [number, number]; getRadius?: (feature: RadarSiteFeature) => number; getFillColor?: (feature: RadarSiteFeature) => number[]; getLineColor?: (feature: RadarSiteFeature) => number[] }): DeckRadarSiteScatterplotLayerProps;
export function webGpuRadarTextureUpload(radarLayer: RadarMapLayer | RenderedFrame, options?: { id?: string; format?: string; usageLabels?: string[] }): WebGpuRadarTextureUpload;
export function radarPixelToLonLat(siteOrId: string | RadarSite, pixel: { x: number; y: number } | [number, number], options?: RenderOptions): LonLat & RadarOffset;
export function radarOffsetToLonLat(siteOrId: string | RadarSite, offset: RadarOffset): LonLat;
export function radarOffsetFromLonLat(siteOrId: string | RadarSite, lonLat: LonLat): RadarOffset & { distanceKm: number; bearingDeg: number };
export function lonLatToWebMercator(lon: number, lat: number): WebMercatorPoint;
export function webMercatorToLonLat(x: number, y: number): LonLat;
export function worldPixelSize(zoom: number, tileSize?: number): number;
export function lonLatToWorldPixel(lon: number, lat: number, options?: { zoom?: number; tileSize?: number }): WorldPixelPoint;
export function worldPixelToLonLat(x: number, y: number, options?: { zoom?: number; tileSize?: number; wrapX?: boolean }): LonLat;
export function normalizeMapView(options?: MapViewOptions | BowEchoMapView): BowEchoMapView;
export function fitMapViewToBounds(bounds: [number, number, number, number] | GeoBounds, options?: MapFitOptions): BowEchoMapView;
export function fitMapViewToLayer(radarLayer: RadarMapLayer | RenderedFrame, options?: MapFitOptions): BowEchoMapView;
export function panMapView(view: MapViewOptions | BowEchoMapView, delta?: { dx?: number; dy?: number; x?: number; y?: number } | [number, number], options?: { drag?: boolean }): BowEchoMapView;
export function zoomMapView(view: MapViewOptions | BowEchoMapView, zoomDelta?: number, options?: { zoom?: number; mode?: "absolute" | "delta"; absolute?: boolean; anchor?: [number, number] | { x?: number; y?: number; anchorX?: number; anchorY?: number }; x?: number; y?: number; anchorX?: number; anchorY?: number }): BowEchoMapView;
export function mapTileCover(view: MapViewOptions | BowEchoMapView, options?: { z?: number; tileZoom?: number; tileSize?: number; urlTemplate?: string; maxTiles?: number }): MapTileCover;
export function radarLayerQuadMesh(radarLayer: RadarMapLayer | RenderedFrame, mapView?: MapViewOptions | BowEchoMapView, options?: MapFitOptions & { opacity?: number }): RadarLayerQuadMesh;
export function cutChoicesFromMetadata(meta: ProductMetadata, options?: { selectedCut?: number; displayableOnly?: boolean }): CutChoice[];
export function loopTimeline(loop: RadarLoop, options?: { index?: number | "latest"; currentIndex?: number | "latest"; now?: number }): LoopTimelineEntry[];
export function drawFrameToCanvas(canvas: HTMLCanvasElement, renderedFrame: RenderedFrame): void;
export function drawCrossSectionToCanvas(canvas: HTMLCanvasElement, renderedSection: RenderedCrossSection): void;
export function drawNativeRhiToCanvas(canvas: HTMLCanvasElement, renderedNativeRhi: RenderedNativeRhi): void;
export function drawTorTracksToCanvas(canvas: HTMLCanvasElement, renderedTracks: RenderedTorTracks): void;
export function drawCompositeToCanvas(canvas: HTMLCanvasElement, compositeLayer: RadarCompositeLayer): void;
export function drawRadarLayerToCanvas(canvas: HTMLCanvasElement, radarLayer: RadarMapLayer | RenderedFrame): void;

export class BowEchoRadarToolbox {
  constructor(options?: ToolboxOptions);
  readonly archiveUrl: string;
  readonly chunksUrl: string;
  readonly workerUrl: string | URL;
  readonly worker: WorkerClient;

  products(): ProductDescriptor[];
  product(productCode: string): ProductDescriptor | null;
  productCapability(productCode: string): ProductCapabilityDescriptor | null;
  productChoices(metaOrLoop: ProductMetadata | RadarLoop, options?: { product?: string; selectedProduct?: string; cut?: number; selectedCut?: number; availableOnly?: boolean; displayableOnly?: boolean }): ProductChoice[];
  capabilityHints(metaOrLoop: ProductMetadata | RadarLoop, options?: { site?: string; product?: string; selectedProduct?: string; cut?: number; selectedCut?: number; displayableOnly?: boolean; warmProducts?: string | string[]; recommendedWarmProducts?: string | string[] }): CapabilityHints;
  frameProviders(): FrameProviderDescriptor[];
  supportedByteFormats(): SupportedByteFormatDescriptor[];
  supportedArchiveFormats(): SupportedByteFormatDescriptor[];
  isZipBytes(bytes: Uint8Array | ArrayBuffer): boolean;
  parseZipDirectory(bytes: Uint8Array | ArrayBuffer, options?: { includeDirectories?: boolean; encoding?: string }): ZipEntryDescriptor[];
  extractZipEntries(bytes: Uint8Array | ArrayBuffer, options?: { includeDirectories?: boolean; encoding?: string; maxEntries?: number; filter?: (entry: ZipEntryDescriptor) => boolean; pattern?: string }): Promise<ExtractedZipEntry[]>;
  extractMobileArchiveEntries(bytes: Uint8Array | ArrayBuffer, options?: { encoding?: string; maxEntries?: number; filter?: (entry: ZipEntryDescriptor) => boolean; pattern?: string }): Promise<ExtractedZipEntry[]>;
  colorFamilies(): ColorTableFamilyDescriptor[];
  colorFamilyForProduct(product: string): ColorTableFamilyId;
  parsePalette(text: string, options?: { name?: string; fileName?: string; family?: string }): BrowserPalette;
  exportPalette(palette: BrowserPalette, options?: { family?: string; productCode?: string | null; units?: string; legendStep?: number; rangeFolded?: [number, number, number, number] }): string;
  validatePalette(palette: BrowserPalette): true;
  paletteBinding(palette: BrowserPalette, productOrFamily?: string): PaletteBinding;
  createPaletteFromStops(stops: PaletteStop[], options?: Partial<BrowserPalette>): BrowserPalette;
  clonePalette(palette: BrowserPalette, options?: Partial<BrowserPalette>): BrowserPalette;
  palettePreviewCss(palette: BrowserPalette, options?: { min?: number; max?: number }): string;
  createPaletteStore(options?: { key?: string; storage?: PaletteStorageAdapter; initialText?: string; initialPalettes?: BrowserPalette[]; pretty?: boolean }): PaletteStore;
  serializePaletteLibrary(palettes: BrowserPalette[], options?: { pretty?: boolean; updatedAt?: string }): string;
  deserializePaletteLibrary(text: string | PaletteLibraryDocument | BrowserPalette[], options?: { strict?: boolean }): BrowserPalette[];
  sites(options?: SiteSearchOptions): RadarSite[];
  site(siteId: string): RadarSite | null;
  sitesGeoJson(options?: SiteSearchOptions): RadarSiteFeatureCollection;
  radarSourceCatalog(options?: { query?: string; providerId?: string | string[]; providerIds?: string[] | string; providers?: string[] | string; kind?: string | string[]; kinds?: string[] | string }): GlobalRadarProvider[];
  internationalRadarSites(options?: RadarSiteCatalogOptions): InternationalRadarSite[];
  internationalRadarProvider(providerId: string): GlobalRadarProvider | null;
  internationalRadarSite(providerId: string, siteId: string): InternationalFramePlan["site"] | null;
  internationalRadarSite(siteIdOrDescriptor: string | InternationalRadarSite | InternationalFramePlan["site"]): InternationalFramePlan["site"] | null;
  smhiAreaCatalogUrl(options?: InternationalFetchOptions): string;
  smhiQcvolCatalogUrl(siteId: string, options?: InternationalFetchOptions): string;
  smhiDatedQcvolUrl(siteId: string, key: string, options?: InternationalFetchOptions): string | null;
  parseSmhiAreaCatalog(textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): SmhiAreaItem[];
  parseSmhiQcvolCatalog(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): SmhiQcvolItem[];
  smhiFramePlansFromCatalog(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan[];
  smhiFramePlanFromCatalog(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan;
  geosphereStartAfterKey(dateOrNow?: string | Date, lookbackHours?: number): string;
  geosphereVolumeListingUrl(options?: InternationalFetchOptions): string;
  parseGeosphereVolumeListing(textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): GeosphereVolumeItem[];
  geosphereFramePlansFromListing(textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan[];
  geosphereFramePlanFromListing(textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan;
  parseAutoIndexListing(textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions & { includeParent?: boolean; includeAbsolute?: boolean; includeNested?: boolean }): AutoIndexEntry[];
  shmuVolumeRootUrl(options?: InternationalFetchOptions): string;
  shmuSiteCatalogUrl(siteId: string, options?: InternationalFetchOptions): string;
  shmuProductCatalogUrl(siteId: string, product: string, options?: InternationalFetchOptions): string;
  shmuProductDateListingUrl(siteId: string, product: string, date: string, options?: InternationalFetchOptions): string;
  parseShmuDateListing(textOrEntries: string | Partial<AutoIndexEntry>[]): string[];
  parseShmuFileListing(siteId: string, product: string, date: string, textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions): ShmuFileItem[];
  shmuFramePlansFromProductFiles(siteId: string, filesByProduct: Record<string, ShmuFileItem[]> | Map<string, ShmuFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan[];
  shmuFramePlanFromProductFiles(siteId: string, filesByProduct: Record<string, ShmuFileItem[]> | Map<string, ShmuFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan;
  dwdSitesRootUrl(options?: InternationalFetchOptions): string;
  dwdProductCatalogUrl(productDir: string, options?: InternationalFetchOptions): string;
  dwdProductStationCatalogUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
  dwdProductHdf5CatalogUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
  dwdProductSweepListingUrl(siteId: string, productDir: string, variant?: string, options?: InternationalFetchOptions): string;
  parseDwdSweepListing(siteId: string, productDir: string, quantity: string, textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions): DwdSweepItem[];
  dwdFramePlansFromProductSweeps(siteId: string, sweepsByProduct: Record<string, DwdSweepItem[]> | Map<string, DwdSweepItem[]>, options?: InternationalFetchOptions): InternationalFramePlan[];
  dwdFramePlanFromProductSweeps(siteId: string, sweepsByProduct: Record<string, DwdSweepItem[]> | Map<string, DwdSweepItem[]>, options?: InternationalFetchOptions): InternationalFramePlan;
  chmiSitesRootUrl(options?: InternationalFetchOptions): string;
  chmiSiteCatalogUrl(siteId: string, options?: InternationalFetchOptions): string;
  chmiProductCatalogUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
  chmiProductHdf5ListingUrl(siteId: string, productDir: string, options?: InternationalFetchOptions): string;
  parseChmiFileListing(siteId: string, productDir: string, textOrEntries: string | Partial<AutoIndexEntry>[], options?: InternationalFetchOptions): ChmiFileItem[];
  chmiFramePlansFromProductFiles(siteId: string, filesByProduct: Record<string, ChmiFileItem[]> | Map<string, ChmiFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan[];
  chmiFramePlanFromProductFiles(siteId: string, filesByProduct: Record<string, ChmiFileItem[]> | Map<string, ChmiFileItem[]>, options?: InternationalFetchOptions): InternationalFramePlan;
  jmaRadarBaseUrl(options?: InternationalFetchOptions): string;
  jmaTarUrl(product?: "N5" | "N6" | string, stampOrDate?: string | Date, options?: InternationalFetchOptions): string;
  jmaCandidateStamps(nowOrOptions?: string | Date | InternationalFetchOptions, options?: InternationalFetchOptions): string[];
  jmaFramePlanFromStamp(siteId: string, stampOrDate: string | Date, options?: InternationalFetchOptions): InternationalFramePlan;
  ordBucketBaseUrl(options?: InternationalFetchOptions): string;
  ordObjectKinds(siteId: string, options?: InternationalFetchOptions): OrdObjectKind[];
  ordHourPrefix(siteId: string, objectKind?: OrdObjectKind | string, hourOrDate?: string | Date): string;
  ordHourListingUrl(siteId: string, objectKind?: OrdObjectKind | string, hourOrDate?: string | Date, options?: InternationalFetchOptions): string;
  parseOrdObjectKey(siteId: string, key: string | Partial<OrdFileItem>): OrdFileItem | null;
  ordFramePlansFromKeys(siteId: string, objectKind: OrdObjectKind | string, keysOrListing: string[] | string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan[];
  ordFramePlanFromKeys(siteId: string, objectKind: OrdObjectKind | string, keysOrListing: string[] | string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan;
  dmiVolumeItemsUrl(siteId?: string, options?: InternationalFetchOptions): string;
  parseDmiVolumeItems(textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): DmiVolumeItem[];
  dmiFramePlansFromItems(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan[];
  dmiFramePlanFromItems(siteId: string, textOrJson: string | Record<string, unknown>, options?: InternationalFetchOptions): InternationalFramePlan;
  s3StyleListingUrl(baseUrl: string, options?: InternationalFetchOptions): string;
  parseS3StyleListing(textOrListing: string | Partial<S3StyleListing>): S3StyleListing;
  nexradArchiveDatePrefix(siteId: string, dateOrString?: string | Date | NexradArchiveDateParts): string;
  nexradArchiveListingUrl(siteId: string, dateOrString?: string | Date | NexradArchiveDateParts, options?: InternationalFetchOptions): string;
  parseNexradArchiveListing(siteId: string, dateOrString: string | Date | NexradArchiveDateParts, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): FrameDescriptor[];
  archiveFrameWindow(frames: FrameDescriptor[], options?: { site?: string; date?: string | Date | NexradArchiveDateParts; frameCount?: number; count?: number; selectedIndex?: number; index?: number; targetTime?: string | Date; time?: string | Date }): NexradArchiveWindow;
  spcConvectiveDate(when?: string | Date): string;
  spcReportTimeUtc(convectiveDate: string | Date | NexradArchiveDateParts, hhmm: string | number): string | null;
  spcReportsUrls(convectiveDate: string | Date | NexradArchiveDateParts, options?: CommunityFetchOptions & { reportsBaseUrl?: string }): string[];
  spcWcmTornadoYearUrl(year: number, options?: { baseUrl?: string; wcmBaseUrl?: string }): string;
  spcActualTornadoesUrl(endYear: number, options?: { baseUrl?: string; wcmBaseUrl?: string }): string;
  spcOutlookKinds(): SpcOutlookKindDescriptor[];
  spcOutlookLiveUrls(day?: number, kind?: SpcOutlookKind | string, options?: SpcOutlookUrlOptions): string[];
  spcOutlookArchiveUrls(dateOrString: string | Date | NexradArchiveDateParts, day?: number, kind?: SpcOutlookKind | string, options?: SpcOutlookUrlOptions): string[];
  spcOutlookUrls(day?: number | SpcOutlookUrlOptions, kind?: SpcOutlookKind | string | SpcOutlookUrlOptions, options?: SpcOutlookUrlOptions): string[];
  parseSpcOutlook(textOrJson: string | Record<string, unknown>, options?: { kind?: SpcOutlookKind | string; url?: string }): SpcOutlookFeature[];
  spcOutlookFeatureCollection(outlookOrFeatures: SpcOutlook | SpcOutlookFeature[], options?: { kind?: SpcOutlookKind | string; url?: string; idPrefix?: string }): SpcOutlookFeatureCollection;
  fetchSpcOutlook(day?: number | SpcOutlookUrlOptions, kind?: SpcOutlookKind | string | SpcOutlookUrlOptions, options?: SpcOutlookUrlOptions): Promise<SpcOutlook>;
  fetchSpcOutlooks(kinds?: Array<SpcOutlookKind | string> | (SpcOutlookUrlOptions & { kinds?: Array<SpcOutlookKind | string>; outlookKinds?: Array<SpcOutlookKind | string> }), options?: SpcOutlookUrlOptions): Promise<SpcOutlooks>;
  parseSpcReports(kind: SpcReportKind | string, convectiveDate: string | Date | NexradArchiveDateParts, text: string): SpcStormReport[];
  parseSpcReportsCombined(convectiveDate: string | Date | NexradArchiveDateParts, text: string): SpcStormReport[];
  spcReportMagnitudeLabel(reportOrKind: SpcStormReport | SpcReportKind | string, magnitude?: string | number): string | null;
  parseSpcTornadoSegments(convectiveDate: string | Date | NexradArchiveDateParts, text: string): SpcTornadoSegment[];
  tornadoSegmentsFromReports(reports: SpcStormReport[]): SpcTornadoSegment[];
  estimatedTornadoTrackEndTime(beginTime: string | Date, lengthMi?: number, options?: { translationMph?: number; maxDurationMinutes?: number }): string;
  selectEventRadarSites(begin: { lat: number; lon?: number; lng?: number; longitude?: number } | [number, number], end?: { lat: number; lon?: number; lng?: number; longitude?: number } | [number, number], options?: RadarSiteCatalogOptions & { sites?: Array<Partial<GlobalRadarSite> & { id: string; lat: number; lon: number }>; maxDistanceKm?: number; includeTdwr?: boolean }): EventRadarSelection | null;
  eventArchiveFrameWindow(frames: FrameDescriptor[], options?: { site?: string; startTime?: string | Date; start?: string | Date; endTime?: string | Date; end?: string | Date; targetTime?: string | Date; time?: string | Date; padFrames?: number; pad?: number; cap?: number; maxFrames?: number; frameCount?: number }): EventArchiveWindow;
  eventArchivePlanForTrack(segmentOrReport: SpcTornadoSegment | SpcStormReport, options?: { frames?: FrameDescriptor[]; sites?: Array<Partial<GlobalRadarSite> & { id: string; lat: number; lon: number }>; site?: string; maxDistanceKm?: number; includeTdwr?: boolean; padFrames?: number; cap?: number; maxFrames?: number; frameCount?: number; translationMph?: number; maxDurationMinutes?: number }): EventArchivePlan;
  fetchSpcEventDay(convectiveDate: string | Date | NexradArchiveDateParts, options?: CommunityFetchOptions & { reportsBaseUrl?: string; wcmBaseUrl?: string; includeConsolidated?: boolean; currentYear?: number; now?: string | Date }): Promise<SpcEventDay>;
  fmiDatePrefix(dateOrPrefix?: string | Date): string;
  fmiCatalogListingUrl(options?: InternationalFetchOptions): string;
  fmiRadarVolumeListingUrl(siteId: string, options?: InternationalFetchOptions): string;
  parseFmiVolumeListing(siteId: string, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): FmiVolumeItem[];
  fmiFramePlansFromListing(siteId: string, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan[];
  fmiFramePlanFromListing(siteId: string, textOrListing: string | Partial<S3StyleListing>, options?: InternationalFetchOptions): InternationalFramePlan;
  latestInternationalFramePlan(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<InternationalFramePlan>;
  recentInternationalFramePlans(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, count?: number, options?: InternationalFetchOptions): Promise<InternationalFramePlan[]>;
  recentInternationalFramePlans(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<InternationalFramePlan[]>;
  internationalFrameFromPlan(plan: InternationalFramePlan, options?: InternationalFetchOptions): FrameDescriptor;
  latestInternationalFrame(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<FrameDescriptor>;
  recentInternationalFrames(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, count?: number, options?: InternationalFetchOptions): Promise<FrameDescriptor[]>;
  recentInternationalFrames(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: InternationalFetchOptions): Promise<FrameDescriptor[]>;
  communityRadarFeeds(options?: RadarSiteCatalogOptions): CommunityRadarFeed[];
  communityRadarFeed(feedOrId: string | CommunityRadarFeed): CommunityRadarFeed | null;
  communityRadarMarkers(options?: RadarSiteCatalogOptions): CommunityRadarMarker[];
  normalizeCustomPollUrl(input: string): string;
  pollUrlsMatch(left: string, right: string): boolean;
  pollUrlName(url: string): string;
  parseCustomPollMarkerInputs(latInput?: string | number | null, lonInput?: string | number | null): CustomPollMarkerParseResult;
  customPollEntryLatLon(entry: CustomPollLinkInput): { lat: number; lon: number } | null;
  customPollEntryLabel(entry: CustomPollLinkInput): string;
  customPollUrlForGisSite(basePollUrl: string, siteId: string, options?: { totalSites?: number; count?: number; placeholders?: string[] }): string;
  parseCustomRadarGis(text: string): CustomGisSite[];
  customPollLinksFromGis(text: string, basePollUrl: string, options?: { totalSites?: number; count?: number; placeholders?: string[] }): CustomPollLinkEntry[];
  normalizeCustomPollLink(entry: CustomPollLinkInput, options?: { pollUrl?: string; baseUrl?: string; siteId?: string; label?: string; allowEmptyUrl?: boolean }): CustomPollLinkEntry;
  customPollLinkFeed(entry: CustomPollLinkInput, options?: { id?: string; state?: string; cluster?: string | null }): CommunityRadarFeed & { customPollLink: CustomPollLinkEntry };
  customPollLinksAsFeeds(entries?: CustomPollLinkInput[], options?: { id?: string; state?: string; cluster?: string | null }): Array<CommunityRadarFeed & { customPollLink: CustomPollLinkEntry }>;
  upsertCustomPollLink(entries: CustomPollLinkInput[], entry: CustomPollLinkInput, options?: { pollUrl?: string; baseUrl?: string; siteId?: string; label?: string }): CustomPollUpsertResult;
  customPollMarkers(entries?: CustomPollLinkInput[], options?: { query?: string }): CustomPollMarker[];
  customPollLinksGeoJson(entries?: CustomPollLinkInput[], options?: { query?: string }): {
    type: "FeatureCollection";
    features: Array<{
      type: "Feature";
      id: string;
      geometry: { type: "Point"; coordinates: [number, number] };
      properties: Record<string, unknown>;
    }>;
  };
  parseCommunityDirList(text: string, options?: { prefix?: string }): CommunityDirListEntry[];
  newestCommunityDirListEntry(textOrEntries: string | CommunityDirListEntry[], options?: { prefix?: string }): CommunityDirListEntry | null;
  parseGrLevel2CfgSites(text: string): string[];
  fetchCommunityDirList(feedOrId: string | CommunityRadarFeed, options?: CommunityFetchOptions): Promise<CommunityDirListPlan>;
  communityFeedFrameFromEntry(feedOrId: string | CommunityRadarFeed, entryOrName: string | Partial<CommunityDirListEntry> | FrameDescriptor, options?: CommunityFetchOptions): FrameDescriptor;
  latestCommunityFrame(feedOrId: string | CommunityRadarFeed, options?: CommunityFetchOptions): Promise<FrameDescriptor>;
  recentCommunityFrames(feedOrId: string | CommunityRadarFeed, count?: number, options?: CommunityFetchOptions): Promise<FrameDescriptor[]>;
  recentCommunityFrames(feedOrId: string | CommunityRadarFeed, options?: CommunityFetchOptions): Promise<FrameDescriptor[]>;
  globalRadarSites(options?: RadarSiteCatalogOptions): GlobalRadarSite[];
  globalRadarSitesGeoJson(options?: RadarSiteCatalogOptions): GlobalRadarSiteFeatureCollection;
  mapboxGlobalRadarSiteSource(options?: RadarSiteCatalogOptions): { type: "geojson"; data: GlobalRadarSiteFeatureCollection };
  deckGlobalRadarSiteScatterplotLayerProps(options?: RadarSiteCatalogOptions & { id?: string; radiusMeters?: number; fillColor?: number[]; lineColor?: number[]; lineWidthMinPixels?: number; radiusMinPixels?: number; radiusMaxPixels?: number; pickable?: boolean; getPosition?: (feature: GlobalRadarSiteFeature) => [number, number]; getRadius?: (feature: GlobalRadarSiteFeature) => number; getFillColor?: (feature: GlobalRadarSiteFeature) => number[]; getLineColor?: (feature: GlobalRadarSiteFeature) => number[] }): DeckRadarSiteScatterplotLayerProps & { data: GlobalRadarSiteFeature[] };
  nearestRadarSite(lonLat: LonLat | [number, number] | { lng?: number; longitude?: number; latitude?: number }, options?: RadarSiteCatalogOptions): (GlobalRadarSite & { distanceKm: number }) | null;
  radarSiteSourceSummary(options?: RadarSiteCatalogOptions): RadarSiteSourceSummary;
  createSession(options?: RadarSessionOptions): RadarSession;
  cutChoices(metaOrLoop: ProductMetadata | RadarLoop, options?: { selectedCut?: number; displayableOnly?: boolean }): CutChoice[];
  loopTimeline(loop: RadarLoop, options?: { index?: number | "latest"; currentIndex?: number | "latest"; now?: number }): LoopTimelineEntry[];
  textureLayer(renderedFrame: RenderedFrame, options?: RenderOptions): RadarTextureLayer;
  loopTextureLayers(loop: RadarLoop, options?: RenderOptions): RadarTextureLayer[];
  compositeLayers(radarLayers: Array<RadarMapLayer | RenderedFrame>, options?: RadarCompositeOptions): RadarCompositeLayer;
  compositeLoopSlot(multiLoop: SynchronizedRadarLoop, index?: number, options?: RadarCompositeOptions & RenderOptions): RadarCompositeLayer;
  crossSectionPanel(renderedSection: RenderedCrossSection, options?: CrossSectionOptions): RadarCrossSectionPanel;
  loopCrossSectionPanels(crossSectionLoop: CrossSectionLoop, options?: CrossSectionOptions): RadarCrossSectionPanel[];
  analysisOverlay(analysis: RadarAnalysis, options?: RenderOptions): RadarAnalysisOverlay;
  loopAnalysisOverlays(analysisLoop: AnalysisLoop, options?: RenderOptions): RadarAnalysisOverlay[];
  torTracksLayer(renderedTracks: RenderedTorTracks, options?: TorTracksOptions): RadarTorTracksLayer;
  loopTorTracksLayers(torTracksLoop: TorTracksLoop, options?: TorTracksOptions): RadarTorTracksLayer[];
  mapboxCoordinates(radarLayer: RadarMapLayer | RenderedFrame): [[number, number], [number, number], [number, number], [number, number]];
  mapboxImageSource(radarLayer: RadarMapLayer | RenderedFrame, options: { url: string; imageUrl?: string }): MapboxRadarImageSource;
  mapboxCanvasSource(radarLayer: RadarMapLayer | RenderedFrame, canvas: string | HTMLCanvasElement, options?: { animate?: boolean }): MapboxRadarCanvasSource;
  mapboxRasterLayer(radarLayer: RadarMapLayer | RenderedFrame, options?: { id?: string; layerId?: string; source?: string; sourceId?: string; opacity?: number; fadeDuration?: number; emissiveStrength?: number }): MapboxRadarRasterLayer;
  mapboxLayerSpecs(radarLayer: RadarMapLayer | RenderedFrame, options: { url?: string; imageUrl?: string; canvas?: string | HTMLCanvasElement; sourceId?: string; layerId?: string; opacity?: number; fadeDuration?: number; emissiveStrength?: number; animate?: boolean }): MapboxRadarLayerSpecs;
  mapboxSiteSource(options?: SiteSearchOptions): MapboxRadarSiteSource;
  mapboxSiteLayer(options?: { id?: string; layerId?: string; source?: string; sourceId?: string; radius?: number; color?: string; strokeColor?: string; strokeWidth?: number; opacity?: number }): MapboxRadarSiteLayer;
  deckBitmapLayerProps(radarLayer: RadarMapLayer | RenderedFrame, options?: { id?: string; image?: unknown; boundsFormat?: "corners" | "bbox"; opacity?: number; pickable?: boolean; textureParameters?: Record<string, unknown>; parameters?: Record<string, unknown> }): DeckRadarBitmapLayerProps;
  deckSiteScatterplotLayerProps(options?: SiteSearchOptions & { id?: string; radiusMeters?: number; fillColor?: number[]; lineColor?: number[]; lineWidthMinPixels?: number; radiusMinPixels?: number; radiusMaxPixels?: number; pickable?: boolean; getPosition?: (feature: RadarSiteFeature) => [number, number]; getRadius?: (feature: RadarSiteFeature) => number; getFillColor?: (feature: RadarSiteFeature) => number[]; getLineColor?: (feature: RadarSiteFeature) => number[] }): DeckRadarSiteScatterplotLayerProps;
  webGpuTextureUpload(radarLayer: RadarMapLayer | RenderedFrame, options?: { id?: string; format?: string; usageLabels?: string[] }): WebGpuRadarTextureUpload;
  webMercatorToLonLat(x: number, y: number): LonLat;
  lonLatToWorldPixel(lon: number, lat: number, options?: { zoom?: number; tileSize?: number }): WorldPixelPoint;
  worldPixelToLonLat(x: number, y: number, options?: { zoom?: number; tileSize?: number; wrapX?: boolean }): LonLat;
  mapView(options?: MapViewOptions | BowEchoMapView): BowEchoMapView;
  fitMapViewToBounds(bounds: [number, number, number, number] | GeoBounds, options?: MapFitOptions): BowEchoMapView;
  fitMapViewToLayer(radarLayer: RadarMapLayer | RenderedFrame, options?: MapFitOptions): BowEchoMapView;
  panMapView(view: MapViewOptions | BowEchoMapView, delta?: { dx?: number; dy?: number; x?: number; y?: number } | [number, number], options?: { drag?: boolean }): BowEchoMapView;
  zoomMapView(view: MapViewOptions | BowEchoMapView, zoomDelta?: number, options?: { zoom?: number; mode?: "absolute" | "delta"; absolute?: boolean; anchor?: [number, number] | { x?: number; y?: number; anchorX?: number; anchorY?: number }; x?: number; y?: number; anchorX?: number; anchorY?: number }): BowEchoMapView;
  mapTileCover(view: MapViewOptions | BowEchoMapView, options?: { z?: number; tileZoom?: number; tileSize?: number; urlTemplate?: string; maxTiles?: number }): MapTileCover;
  radarLayerQuadMesh(radarLayer: RadarMapLayer | RenderedFrame, mapView?: MapViewOptions | BowEchoMapView, options?: MapFitOptions & { opacity?: number }): RadarLayerQuadMesh;
  synchronizeLoops(loops: RadarLoop[], options?: MultiSiteLoopOptions): SynchronizedRadarLoop;

  loadLoop(options?: RenderOptions): Promise<RadarLoop>;
  loadMultiSiteLoop(sitesOrOptions: string[] | MultiSiteLoopOptions, options?: MultiSiteLoopOptions): Promise<SynchronizedRadarLoop>;
  rerenderLoop(loop: RadarLoop, options?: RenderOptions): Promise<RadarLoop>;
  rerenderMultiSiteLoop(multiLoop: SynchronizedRadarLoop, options?: MultiSiteLoopOptions): Promise<SynchronizedRadarLoop>;
  pollLive(loop: RadarLoop, options?: RenderOptions): Promise<PollLiveResult>;
  pollMultiSiteLive(multiLoop: SynchronizedRadarLoop, options?: MultiSiteLoopOptions): Promise<PollMultiSiteLiveResult>;
  sniffBytes(bytes: Uint8Array | ArrayBuffer): Promise<{ format: SupportedByteFormatId; size: number }>;
  importBytesFrame(bytes: Uint8Array | ArrayBuffer, options?: { id?: string; fileName?: string; name?: string; source?: string; cacheKey?: string; provider?: string }): Promise<ImportedFrameResult>;
  importFileFrame(file: File | Blob, options?: { id?: string; fileName?: string; name?: string; source?: string; cacheKey?: string; provider?: string; archive?: boolean }): Promise<ImportedFrameResult | ImportedArchiveFrameResult>;
  importMobileArchiveFrame(fileOrBytes: File | Blob | Uint8Array | ArrayBuffer, options?: { id?: string; fileName?: string; name?: string; source?: string; cacheKey?: string; provider?: string; maxEntries?: number; maxParts?: number; filter?: (entry: ZipEntryDescriptor) => boolean; pattern?: string }): Promise<ImportedArchiveFrameResult>;
  importFiles(files: Iterable<File | Blob> | ArrayLike<File | Blob>, options?: { id?: string; source?: string; provider?: string; archive?: boolean }): Promise<Array<ImportedFrameResult | ImportedArchiveFrameResult>>;
  frameFromUrl(url: string, options?: { id?: string; cacheKey?: string; source?: string; provider?: string; format?: SupportedByteFormatId | null; size?: number; volumeTime?: string | null; site?: string }): FrameDescriptor;
  loadImportedLoop(importedFrames: Array<ImportedFrameResult | FrameDescriptor>, options?: RenderOptions & { mode?: string }): Promise<RadarLoop>;
  loadInternationalLoop(providerId: "chmi" | "dmi" | "dwd" | "fmi" | "geosphere" | "jma" | "ord" | "shmu" | "smhi" | string, siteId: string, options?: RenderOptions & InternationalFetchOptions & { mode?: string }): Promise<RadarLoop & { internationalProviderId?: string; internationalSite?: InternationalFramePlan["site"]; siteDescriptor?: RadarSite; source?: "international" | string }>;
  pollInternationalLive(loop: RadarLoop & { internationalProviderId?: string; internationalSite?: InternationalFramePlan["site"]; siteDescriptor?: RadarSite }, options?: RenderOptions & InternationalFetchOptions): Promise<PollLiveResult>;
  loadCommunityLoop(feedOrId: string | CommunityRadarFeed, options?: RenderOptions & CommunityFetchOptions & { mode?: string }): Promise<RadarLoop & { communityFeed?: CommunityRadarFeed; source?: "community" | string }>;
  pollCommunityLive(loop: RadarLoop & { communityFeed?: CommunityRadarFeed }, options?: RenderOptions & CommunityFetchOptions & { feed?: CommunityRadarFeed; feedId?: string }): Promise<PollLiveResult>;
  archiveFramesForDate(siteId: string, dateOrString?: string | Date | NexradArchiveDateParts, options?: InternationalFetchOptions & { listing?: string | Partial<S3StyleListing> }): Promise<FrameDescriptor[]>;
  archiveLoopFramesForDate(siteId: string, dateOrString?: string | Date | NexradArchiveDateParts, options?: InternationalFetchOptions & { frameCount?: number; selectedIndex?: number; index?: number; targetTime?: string | Date; time?: string | Date; listing?: string | Partial<S3StyleListing> }): Promise<NexradArchiveWindow>;
  loadArchiveLoop(siteId: string, dateOrString?: string | Date | NexradArchiveDateParts, options?: RenderOptions & InternationalFetchOptions & { mode?: string; frameCount?: number; selectedIndex?: number; index?: number; targetTime?: string | Date; time?: string | Date; listing?: string | Partial<S3StyleListing> }): Promise<RadarLoop & { archiveWindow?: NexradArchiveWindow; source?: "archive" | string }>;
  livePlusArchiveFrames(siteId: string, count?: number, options?: RenderOptions): Promise<FrameDescriptor[]>;
  recentArchiveFrames(siteId: string, count?: number, options?: RenderOptions): Promise<FrameDescriptor[]>;
  latestRealtimeFrame(siteId: string): Promise<FrameDescriptor>;
  realtimeVolume(siteId: string, volumeId: number): Promise<RealtimeVolumeDescriptor>;
  frameMetadata(frame: FrameDescriptor, product?: string): Promise<ProductMetadata>;
  volumeDiagnostics(frame: FrameDescriptor, options?: { site?: string; concurrency?: number }): Promise<VolumeDiagnostics>;
  volumeDiagnosticsLoop(loop: RadarLoop, options?: { concurrency?: number }): Promise<VolumeDiagnosticsLoop>;
  renderFrames(frames: FrameDescriptor[], options?: RenderOptions): Promise<RenderedFrame[]>;
  renderFrame(frame: FrameDescriptor, options?: RenderOptions): Promise<RenderedFrame>;
  renderCrossSection(frame: FrameDescriptor, options?: CrossSectionOptions): Promise<RenderedCrossSection>;
  renderCrossSections(frames: FrameDescriptor[], options?: CrossSectionOptions): Promise<RenderedCrossSection[]>;
  renderCrossSectionLoop(loop: RadarLoop, options?: CrossSectionOptions): Promise<CrossSectionLoop>;
  renderNativePpi(frame: FrameDescriptor, options?: NativePpiOptions): Promise<RenderedNativePpi>;
  renderNativeRhi(frame: FrameDescriptor, options?: NativeRhiOptions): Promise<RenderedNativeRhi>;
  renderNativeRhiFrames(frames: FrameDescriptor[], options?: NativeRhiOptions): Promise<RenderedNativeRhi[]>;
  renderNativeRhiLoop(loop: RadarLoop, options?: NativeRhiOptions): Promise<NativeRhiLoop>;
  renderTorTracksFrame(frame: FrameDescriptor, options?: TorTracksOptions): Promise<RenderedTorTracks>;
  renderTorTracksFrames(frames: FrameDescriptor[], options?: TorTracksOptions): Promise<RenderedTorTracks[]>;
  renderTorTracksLoop(loop: RadarLoop, options?: TorTracksOptions): Promise<TorTracksLoop>;
  analyzeFrame(frame: FrameDescriptor, options?: RenderOptions): Promise<RadarAnalysis>;
  analyzeFrames(frames: FrameDescriptor[], options?: RenderOptions): Promise<RadarAnalysis[]>;
  analyzeLoop(loop: RadarLoop, options?: RenderOptions): Promise<AnalysisLoop>;
  configureCache(options?: WorkerCacheLimits): Promise<WorkerCacheStats>;
  warmFrames(frames: Array<FrameDescriptor | RenderedFrame>, options?: { product?: string; metadata?: boolean; concurrency?: number }): Promise<WarmFramesResult>;
  warmLoop(loop: RadarLoop, options?: { product?: string; metadata?: boolean; concurrency?: number }): Promise<WarmFramesResult>;
  stats(): Promise<WorkerCacheStats>;
  clearCache(): Promise<{ cleared: boolean }>;
}

export class RadarSession {
  constructor(toolbox: BowEchoRadarToolbox, options?: RadarSessionOptions);
  readonly toolbox: BowEchoRadarToolbox;
  readonly listeners: Set<(snapshot: RadarSessionSnapshot) => void>;
  loop: RadarLoop | null;
  index: number;
  status: RadarSessionStatus;
  error: string | null;
  site: string;
  mode: string;
  product: string;
  cut?: number;
  frameCount: number;
  width: number;
  height: number;
  rangeKm: number;
  smoothing: string;
  stormDirDeg: number;
  stormSpeedKt: number;
  loopSpeedPercent: number;
  pollIntervalMs: number;
  followLatest: boolean;
  playing: boolean;
  livePolling: boolean;
  lastPoll: RadarSessionSnapshot["lastPoll"];

  subscribe(listener: (snapshot: RadarSessionSnapshot) => void): () => void;
  snapshot(): RadarSessionSnapshot;
  load(options?: RadarSessionOptions): Promise<RadarSessionSnapshot>;
  setSite(site: string, options?: RadarSessionOptions): Promise<RadarSessionSnapshot>;
  setProduct(product: string, options?: RadarSessionOptions): Promise<RadarSessionSnapshot>;
  setCut(cut: number, options?: RadarSessionOptions): Promise<RadarSessionSnapshot>;
  setRenderOptions(options?: RadarSessionOptions): Promise<RadarSessionSnapshot>;
  rerender(options?: RadarSessionOptions): Promise<RadarSessionSnapshot>;
  warm(products?: string | string[], options?: { product?: string; metadata?: boolean; concurrency?: number }): Promise<RadarSessionWarmResult>;
  poll(options?: RadarSessionOptions): Promise<RadarSessionPollResult>;
  startPolling(options?: RadarSessionOptions & { immediate?: boolean }): () => void;
  stopPolling(): void;
  play(options?: RadarSessionOptions & { frameIntervalMs?: number }): () => void;
  stop(): void;
  togglePlayback(options?: RadarSessionOptions & { frameIntervalMs?: number }): void | (() => void);
  setPlaybackSpeed(loopSpeedPercent: number): RadarSessionSnapshot;
  setIndex(index?: number | "latest" | string): RadarSessionSnapshot;
  nextFrame(options?: { wrap?: boolean }): RadarSessionSnapshot;
  previousFrame(options?: { wrap?: boolean }): RadarSessionSnapshot;
  latestFrame(): RadarSessionSnapshot;
  currentFrame(index?: number | "latest" | string): RenderedFrame | null;
  cutChoices(options?: { selectedCut?: number; displayableOnly?: boolean }): CutChoice[];
  timeline(options?: { index?: number | "latest"; currentIndex?: number | "latest"; now?: number }): LoopTimelineEntry[];
  textureLayer(index?: number | "latest" | string, options?: RenderOptions): RadarTextureLayer;
  drawToCanvas(canvas: HTMLCanvasElement, index?: number | "latest" | string): RenderedFrame;
  destroy(): void;
}
