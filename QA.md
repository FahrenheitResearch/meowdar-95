# Meowdar verification notes

## Automated checks

The scan-quality suite covers:

- completed and partial 720-radial low cuts;
- legacy complete 360-radial higher cuts;
- product/moment matching for REF, DVEL, and CC;
- duplicate velocity cuts and blank/constant velocity rejection;
- usable-gate ranking;
- sector/non-PPI rejection;
- completed low cuts inside an otherwise unfinished volume; and
- the explicit Raw cuts operator override.

The GLM controller suite covers:

- GOES object timestamps;
- newest-granule-first display;
- malformed newest-file fallback;
- point limits;
- Low Data resource caps; and
- restoration of the operator's Full-mode lightning window.

Run locally:

```bash
node tests/scan-quality.test.mjs
node tests/glm-controller.test.mjs
node --check app.js
node --check scan-quality.js
node --check palette-manager.js
node --check glm-controller.js
node --check lightning-worker.js
./scripts/build-demo.sh
```

## Browser-preview checks

The self-contained `demo.html` should be exercised at desktop and mobile sizes.
Verify that:

- Full starts at 1840 × 1840 and 12 frames;
- 96 Full frames show approximately 1.2 GiB raw pixel ceiling and a warning;
- Low Data switches to 512 × 512 without changing the selected archive/QC
  workflow;
- playback speed and last-frame dwell controls update;
- Live and Archive tabs show the correct fields, with archive time labeled UTC;
- Low-sweep loop/follow is on by default;
- Operational, Strict 720, and Raw cuts are selectable;
- palette import, stop editing, product filters, RF handling, and export work
  without a page reload;
- DVEL shows the velocity deadband control instead of the reflectivity floor;
- GLM is off initially and synthetic preview flashes appear when enabled;
- the station selector and map pills change the selected radar;
- the Windows 95 layout has no horizontal overflow; and
- OpenStreetMap attribution is visible in the production map configuration.


## Completed build verification — 2026-06-24

- Both Node unit suites passed.
- Every production JavaScript module passed `node --check`.
- The self-contained demo rebuilt successfully and contains no module-only
  `import.meta` syntax.
- Headless Chromium exercised desktop and 430 px mobile layouts with no page or
  console errors.
- Full remained 1840 × 1840 at 96 frames and displayed the 1.2 GiB warning.
- Low Data changed the backing canvas to 512 × 512 and showed a 96 MiB ceiling.
- Archive UTC fields, DVEL palette controls, GLM preview, station controls, and
  responsive overflow checks passed.
- Fresh desktop, palette-editor, and mobile screenshots are included.

This verifies the static interface and controller behavior. It does not replace
the live-provider staging smoke test below.

## Production staging smoke test

The preview uses deterministic synthetic radar and lightning. Before publishing
`index.html`, run the vendor installer and serve the directory over HTTP, then
verify:

1. One live REF, DVEL, and CC volume from at least two radar sites.
2. One archive request near the selected UTC time.
3. A loop in which volume cut layouts differ, confirming per-frame low-cut
   selection.
4. An incoming live low sweep, confirming the previous completed frame remains
   visible until the new 720-radial cut finishes.
5. Duplicate velocity cuts, confirming blank or constant candidates do not win
   Operational ranking.
6. Full 1840 × 1840 rendering at 1, 12, and 24 frames.
7. A 72/96-frame progressive load on the intended workstation class.
8. Low Data 512 × 512 operation on a four-core laptop.
9. One real GOES-18 GLM LCFA granule and an archive-synchronized GLM window.
10. CSP, CORS, `application/wasm`, Web Worker, MapLibre CDN, tile host, radar
    provider, and NOAA GOES S3 access from the actual deployment origin.
11. OpenStreetMap attribution and compliance with the selected tile provider's
    usage policy.

Do not enable GLM by default or advertise 96-frame Full as a low-memory mode
until the target browsers have passed that staging test.
