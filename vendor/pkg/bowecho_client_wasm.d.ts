/* tslint:disable */
/* eslint-disable */

export class ClientCrossSectionRender {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    height(): number;
    length_km(): number;
    meta_json(): string;
    rgba(): Uint8Array;
    top_km(): number;
    width(): number;
}

export class ClientNativePpiRender {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    azimuths(): Float32Array;
    height(): number;
    meta_json(): string;
    range_km(): number;
    rgba(): Uint8Array;
    width(): number;
}

export class ClientTorTracksFrame {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cell_km(): number;
    half_extent_km(): number;
    height(): number;
    meta_json(): string;
    rgba(): Uint8Array;
    values(): Float32Array;
    width(): number;
}

export class ClientVolume {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    analysis_json(): string;
    cut_count(): number;
    cuts_json(product_code: string): string;
    render_cross_section(product_code: string, start_east_km: number, start_north_km: number, end_east_km: number, end_north_km: number, width: number, height: number, top_km: number, palette_name: string, palette_family: string, palette_text: string): ClientCrossSectionRender;
    render_native_ppi(product_code: string, cut_index: number, palette_name: string, palette_family: string, palette_text: string): ClientNativePpiRender;
    render_native_rhi(product_code: string, cut_index: number, width: number, height: number, top_km: number, max_range_km: number, allow_downscale: boolean, require_rhi: boolean, palette_name: string, palette_family: string, palette_text: string): ClientCrossSectionRender;
    render_rgba(product_code: string, cut_index: number, width: number, height: number, range_km: number, smoothing_key: string, storm_dir_deg: number, storm_speed_kt: number): Uint8Array;
    render_rgba_with_palette(product_code: string, cut_index: number, width: number, height: number, range_km: number, smoothing_key: string, storm_dir_deg: number, storm_speed_kt: number, palette_name: string, palette_family: string, palette_text: string): Uint8Array;
    render_tor_tracks_frame(half_extent_km: number, cell_km: number): ClientTorTracksFrame;
    site_id(): string;
    summary_json(): string;
    volume_diagnostics_json(): string;
    volume_time(): string;
}

export function decode_jma_tar_station(bytes: Uint8Array, site_id: string): ClientVolume;

export function decode_level2(bytes: Uint8Array): ClientVolume;

export function decode_supported_volume(bytes: Uint8Array): ClientVolume;

export function decode_supported_volume_parts(parts: Array<any>): ClientVolume;

export function product_codes_json(): string;

export function start(): void;

export function supported_volume_format(bytes: Uint8Array): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_clientcrosssectionrender_free: (a: number, b: number) => void;
    readonly __wbg_clientnativeppirender_free: (a: number, b: number) => void;
    readonly __wbg_clienttortracksframe_free: (a: number, b: number) => void;
    readonly __wbg_clientvolume_free: (a: number, b: number) => void;
    readonly clientcrosssectionrender_height: (a: number) => number;
    readonly clientcrosssectionrender_length_km: (a: number) => number;
    readonly clientcrosssectionrender_meta_json: (a: number) => [number, number];
    readonly clientcrosssectionrender_rgba: (a: number) => [number, number];
    readonly clientcrosssectionrender_top_km: (a: number) => number;
    readonly clientcrosssectionrender_width: (a: number) => number;
    readonly clientnativeppirender_azimuths: (a: number) => [number, number];
    readonly clientnativeppirender_height: (a: number) => number;
    readonly clientnativeppirender_meta_json: (a: number) => [number, number];
    readonly clientnativeppirender_range_km: (a: number) => number;
    readonly clientnativeppirender_rgba: (a: number) => [number, number];
    readonly clientnativeppirender_width: (a: number) => number;
    readonly clienttortracksframe_cell_km: (a: number) => number;
    readonly clienttortracksframe_meta_json: (a: number) => [number, number];
    readonly clienttortracksframe_rgba: (a: number) => [number, number];
    readonly clienttortracksframe_values: (a: number) => [number, number];
    readonly clientvolume_analysis_json: (a: number) => [number, number, number, number];
    readonly clientvolume_cut_count: (a: number) => number;
    readonly clientvolume_cuts_json: (a: number, b: number, c: number) => [number, number, number, number];
    readonly clientvolume_render_cross_section: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => [number, number, number];
    readonly clientvolume_render_native_ppi: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => [number, number, number];
    readonly clientvolume_render_native_rhi: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => [number, number, number];
    readonly clientvolume_render_rgba: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => [number, number, number, number];
    readonly clientvolume_render_rgba_with_palette: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number) => [number, number, number, number];
    readonly clientvolume_render_tor_tracks_frame: (a: number, b: number, c: number) => [number, number, number];
    readonly clientvolume_site_id: (a: number) => [number, number];
    readonly clientvolume_summary_json: (a: number) => [number, number, number, number];
    readonly clientvolume_volume_diagnostics_json: (a: number) => [number, number, number, number];
    readonly clientvolume_volume_time: (a: number) => [number, number];
    readonly decode_jma_tar_station: (a: number, b: number, c: number, d: number) => [number, number, number];
    readonly decode_level2: (a: number, b: number) => [number, number, number];
    readonly decode_supported_volume: (a: number, b: number) => [number, number, number];
    readonly decode_supported_volume_parts: (a: any) => [number, number, number];
    readonly product_codes_json: () => [number, number];
    readonly supported_volume_format: (a: number, b: number) => [number, number];
    readonly start: () => void;
    readonly clienttortracksframe_half_extent_km: (a: number) => number;
    readonly clienttortracksframe_height: (a: number) => number;
    readonly clienttortracksframe_width: (a: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
