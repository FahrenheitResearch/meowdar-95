/* @ts-self-types="./bowecho_client_wasm.d.ts" */

export class ClientCrossSectionRender {
    static __wrap(ptr) {
        const obj = Object.create(ClientCrossSectionRender.prototype);
        obj.__wbg_ptr = ptr;
        ClientCrossSectionRenderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClientCrossSectionRenderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_clientcrosssectionrender_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    height() {
        const ret = wasm.clientcrosssectionrender_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    length_km() {
        const ret = wasm.clientcrosssectionrender_length_km(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    meta_json() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.clientcrosssectionrender_meta_json(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Uint8Array}
     */
    rgba() {
        const ret = wasm.clientcrosssectionrender_rgba(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    top_km() {
        const ret = wasm.clientcrosssectionrender_top_km(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    width() {
        const ret = wasm.clientcrosssectionrender_width(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) ClientCrossSectionRender.prototype[Symbol.dispose] = ClientCrossSectionRender.prototype.free;

export class ClientNativePpiRender {
    static __wrap(ptr) {
        const obj = Object.create(ClientNativePpiRender.prototype);
        obj.__wbg_ptr = ptr;
        ClientNativePpiRenderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClientNativePpiRenderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_clientnativeppirender_free(ptr, 0);
    }
    /**
     * @returns {Float32Array}
     */
    azimuths() {
        const ret = wasm.clientnativeppirender_azimuths(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    height() {
        const ret = wasm.clientnativeppirender_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    meta_json() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.clientnativeppirender_meta_json(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {number}
     */
    range_km() {
        const ret = wasm.clientnativeppirender_range_km(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    rgba() {
        const ret = wasm.clientnativeppirender_rgba(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    width() {
        const ret = wasm.clientnativeppirender_width(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) ClientNativePpiRender.prototype[Symbol.dispose] = ClientNativePpiRender.prototype.free;

export class ClientTorTracksFrame {
    static __wrap(ptr) {
        const obj = Object.create(ClientTorTracksFrame.prototype);
        obj.__wbg_ptr = ptr;
        ClientTorTracksFrameFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClientTorTracksFrameFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_clienttortracksframe_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    cell_km() {
        const ret = wasm.clienttortracksframe_cell_km(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    half_extent_km() {
        const ret = wasm.clienttortracksframe_half_extent_km(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    height() {
        const ret = wasm.clienttortracksframe_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {string}
     */
    meta_json() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.clienttortracksframe_meta_json(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Uint8Array}
     */
    rgba() {
        const ret = wasm.clienttortracksframe_rgba(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Float32Array}
     */
    values() {
        const ret = wasm.clienttortracksframe_values(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    width() {
        const ret = wasm.clienttortracksframe_width(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) ClientTorTracksFrame.prototype[Symbol.dispose] = ClientTorTracksFrame.prototype.free;

export class ClientVolume {
    static __wrap(ptr) {
        const obj = Object.create(ClientVolume.prototype);
        obj.__wbg_ptr = ptr;
        ClientVolumeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClientVolumeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_clientvolume_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    analysis_json() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.clientvolume_analysis_json(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {number}
     */
    cut_count() {
        const ret = wasm.clientvolume_cut_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {string} product_code
     * @returns {string}
     */
    cuts_json(product_code) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(product_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.clientvolume_cuts_json(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} product_code
     * @param {number} start_east_km
     * @param {number} start_north_km
     * @param {number} end_east_km
     * @param {number} end_north_km
     * @param {number} width
     * @param {number} height
     * @param {number} top_km
     * @param {string} palette_name
     * @param {string} palette_family
     * @param {string} palette_text
     * @returns {ClientCrossSectionRender}
     */
    render_cross_section(product_code, start_east_km, start_north_km, end_east_km, end_north_km, width, height, top_km, palette_name, palette_family, palette_text) {
        const ptr0 = passStringToWasm0(product_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(palette_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(palette_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(palette_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.clientvolume_render_cross_section(this.__wbg_ptr, ptr0, len0, start_east_km, start_north_km, end_east_km, end_north_km, width, height, top_km, ptr1, len1, ptr2, len2, ptr3, len3);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ClientCrossSectionRender.__wrap(ret[0]);
    }
    /**
     * @param {string} product_code
     * @param {number} cut_index
     * @param {string} palette_name
     * @param {string} palette_family
     * @param {string} palette_text
     * @returns {ClientNativePpiRender}
     */
    render_native_ppi(product_code, cut_index, palette_name, palette_family, palette_text) {
        const ptr0 = passStringToWasm0(product_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(palette_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(palette_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(palette_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.clientvolume_render_native_ppi(this.__wbg_ptr, ptr0, len0, cut_index, ptr1, len1, ptr2, len2, ptr3, len3);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ClientNativePpiRender.__wrap(ret[0]);
    }
    /**
     * @param {string} product_code
     * @param {number} cut_index
     * @param {number} width
     * @param {number} height
     * @param {number} top_km
     * @param {number} max_range_km
     * @param {boolean} allow_downscale
     * @param {boolean} require_rhi
     * @param {string} palette_name
     * @param {string} palette_family
     * @param {string} palette_text
     * @returns {ClientCrossSectionRender}
     */
    render_native_rhi(product_code, cut_index, width, height, top_km, max_range_km, allow_downscale, require_rhi, palette_name, palette_family, palette_text) {
        const ptr0 = passStringToWasm0(product_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(palette_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(palette_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(palette_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.clientvolume_render_native_rhi(this.__wbg_ptr, ptr0, len0, cut_index, width, height, top_km, max_range_km, allow_downscale, require_rhi, ptr1, len1, ptr2, len2, ptr3, len3);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ClientCrossSectionRender.__wrap(ret[0]);
    }
    /**
     * @param {string} product_code
     * @param {number} cut_index
     * @param {number} width
     * @param {number} height
     * @param {number} range_km
     * @param {string} smoothing_key
     * @param {number} storm_dir_deg
     * @param {number} storm_speed_kt
     * @returns {Uint8Array}
     */
    render_rgba(product_code, cut_index, width, height, range_km, smoothing_key, storm_dir_deg, storm_speed_kt) {
        const ptr0 = passStringToWasm0(product_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(smoothing_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.clientvolume_render_rgba(this.__wbg_ptr, ptr0, len0, cut_index, width, height, range_km, ptr1, len1, storm_dir_deg, storm_speed_kt);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * @param {string} product_code
     * @param {number} cut_index
     * @param {number} width
     * @param {number} height
     * @param {number} range_km
     * @param {string} smoothing_key
     * @param {number} storm_dir_deg
     * @param {number} storm_speed_kt
     * @param {string} palette_name
     * @param {string} palette_family
     * @param {string} palette_text
     * @returns {Uint8Array}
     */
    render_rgba_with_palette(product_code, cut_index, width, height, range_km, smoothing_key, storm_dir_deg, storm_speed_kt, palette_name, palette_family, palette_text) {
        const ptr0 = passStringToWasm0(product_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(smoothing_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(palette_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(palette_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ptr4 = passStringToWasm0(palette_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        const ret = wasm.clientvolume_render_rgba_with_palette(this.__wbg_ptr, ptr0, len0, cut_index, width, height, range_km, ptr1, len1, storm_dir_deg, storm_speed_kt, ptr2, len2, ptr3, len3, ptr4, len4);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v6 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v6;
    }
    /**
     * @param {number} half_extent_km
     * @param {number} cell_km
     * @returns {ClientTorTracksFrame}
     */
    render_tor_tracks_frame(half_extent_km, cell_km) {
        const ret = wasm.clientvolume_render_tor_tracks_frame(this.__wbg_ptr, half_extent_km, cell_km);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ClientTorTracksFrame.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    site_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.clientvolume_site_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    summary_json() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.clientvolume_summary_json(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    volume_diagnostics_json() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.clientvolume_volume_diagnostics_json(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    volume_time() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.clientvolume_volume_time(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) ClientVolume.prototype[Symbol.dispose] = ClientVolume.prototype.free;

/**
 * @param {Uint8Array} bytes
 * @param {string} site_id
 * @returns {ClientVolume}
 */
export function decode_jma_tar_station(bytes, site_id) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(site_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.decode_jma_tar_station(ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ClientVolume.__wrap(ret[0]);
}

/**
 * @param {Uint8Array} bytes
 * @returns {ClientVolume}
 */
export function decode_level2(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.decode_level2(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ClientVolume.__wrap(ret[0]);
}

/**
 * @param {Uint8Array} bytes
 * @returns {ClientVolume}
 */
export function decode_supported_volume(bytes) {
    const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.decode_supported_volume(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ClientVolume.__wrap(ret[0]);
}

/**
 * @param {Array<any>} parts
 * @returns {ClientVolume}
 */
export function decode_supported_volume_parts(parts) {
    const ret = wasm.decode_supported_volume_parts(parts);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ClientVolume.__wrap(ret[0]);
}

/**
 * @returns {string}
 */
export function product_codes_json() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.product_codes_json();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

export function start() {
    wasm.start();
}

/**
 * @param {Uint8Array} bytes
 * @returns {string}
 */
export function supported_volume_format(bytes) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.supported_volume_format(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_ea4887a5f8f9a9db: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_get_unchecked_54a4374c38e08460: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_length_589238bdcf171f0e: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_c6054974c0a6cdb9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_81880fb5002cb255: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_prototypesetcall_d721637c7ca66eb8: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./bowecho_client_wasm_bg.js": import0,
    };
}

const ClientCrossSectionRenderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_clientcrosssectionrender_free(ptr, 1));
const ClientNativePpiRenderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_clientnativeppirender_free(ptr, 1));
const ClientTorTracksFrameFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_clienttortracksframe_free(ptr, 1));
const ClientVolumeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_clientvolume_free(ptr, 1));

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('bowecho_client_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
