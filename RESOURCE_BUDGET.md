# Meowdar browser resource budget

These are engineering estimates rather than guarantees. NEXRAD Level II volume
size, decode cost, and GLM object size vary with station, scan strategy,
meteorological return, compression, archive provider, browser, and GPU.

## Radar pixel ceilings

One RGBA frame uses `width × height × 4` bytes before browser/GPU copies.
Meowdar never silently downsamples Full mode as loop length increases.

| Frames | Full 3072 × 3072 | Low Data 512 × 512 |
|---:|---:|---:|
| 1 | 36 MiB | 1 MiB |
| 6 | 216 MiB | 6 MiB |
| 12 (default) | 432 MiB | 12 MiB |
| 24 | 864 MiB | 24 MiB |
| 36 | 1.27 GiB | 36 MiB |
| 48 | 1.69 GiB | 48 MiB |
| 72 | 2.53 GiB | 72 MiB |
| 96 | 3.38 GiB | 96 MiB |

Those figures are raw pixel ceilings only. A browser may also retain decoded
radar arrays, downloaded compressed buffers, JavaScript metadata, adaptive
low-sweep renders, map textures, compositing surfaces, and GPU-side copies.
Actual peak process memory can therefore be materially higher.

## Scheduling guardrails

Meowdar keeps professional options available without making the worst case the
default:

1. The newest live or nearest archive frame loads first.
2. Older loop frames fill progressively in the background.
3. Four-core devices use one radar background job.
4. Full loops over 24 frames use one background job even on larger machines.
5. Low Data loops over 48 frames also use one background job.
6. The adaptive per-frame low-sweep render cache is deliberately bounded.
7. Large Full loops trigger a visible memory warning instead of hidden quality
   reduction.
8. GLM is off by default and runs in a separate worker only when enabled.

A 3-frame Full loop is the recommended initial workstation setting. On a
four-core laptop, use 6–12 Full frames for routine work or Low Data when a long
history is more important than native pixels. The 72/96-frame Full options are
best treated as deliberate workstation modes.

## NEXRAD transfer behavior

An archive Level II object generally contains a complete radar volume. Unless
an upstream provider exposes an indexed or range-addressable representation,
the browser cannot fetch only the records below 2.5° from that monolithic
object. Low Data therefore reduces:

- render dimensions;
- displayed elevation range;
- loop concurrency;
- retained frame/cache pressure; and
- downstream browser work.

It does not guarantee a proportionally smaller downloaded Level II object after
one has been selected. Live providers may have different packaging behavior.

## Completed-low-sweep cost

Meowdar evaluates each loop frame independently. It can render the best
completed low cut from each decoded volume rather than using one fixed cut
index for every frame. This adds bounded per-frame diagnostics and rerendering,
but avoids displaying partial 400/720 sweeps, blank duplicate velocity cuts, or
an unrelated elevation merely because volume layouts differ.

The adaptive frame cache is smaller in Full mode than Low Data mode, and tighter
on devices reporting four hardware threads or fewer.

## GLM lightning

NOAA GLM Level 2 LCFA files represent 20-second periods and contain flashes,
groups, events, quality data, energy, area, and time/location fields. Meowdar
keeps only compact quality-controlled flash records needed for display.

| State/action | Browser work |
|---|---|
| Disabled | No GLM requests, worker, decoder CPU, or point layer |
| First enable | h5wasm ESM/WASM load plus selected granules |
| Low Data | One-minute window, reduced file/point/cache limits |
| Full, 5 minutes | Roughly 15 intervals plus listing boundaries |
| Full, 10 minutes | Up to the configured 30-file cap |
| Live update | Normally one new 20-second interval; cached data is reused |

GLM transfer size varies with lightning activity and compression. The worker decodes one granule at a time, while hour-prefix listings use at
most two lightweight concurrent requests. Meowdar renders the newest usable
interval first, aborts stale requests, and stores only bounded flash results. The overlay is total lightning and should not be interpreted as
precise ground-strike detection.

## Basemap

MapLibre is loaded once from its configured CDN and the browser requests only
the OpenStreetMap raster tiles required by the visible viewport and zoom. The
application does not bulk-prefetch map tiles. The standard OpenStreetMap tile
service is best effort and subject to its usage policy; sustained public traffic
should use a suitable OSM-derived provider or self-hosted tiles.

## Static-host cost boundary

The Meowdar host serves static HTML, CSS, JavaScript, workers, WASM, and preview
assets. Radar, GLM, MapLibre, and basemap bytes travel between the visitor and
the configured upstream services. There is no required Meowdar database,
server-side radar decoder, image renderer, archive mirror, or tile proxy.
