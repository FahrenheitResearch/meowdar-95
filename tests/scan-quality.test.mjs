import assert from "node:assert/strict";
import { availableCuts, cutAccepted, normalizeCuts } from "../scan-quality.js";

function cut(index, angle, radials, moments = ["REF", "DVEL", "CC"], extra = {}) {
  return { index, elevationDeg: angle, radials, moments, displayable: true, ...extra };
}

function moment(name, radials, { validGateCount = 50_000, gateCount = 1_200, minValue = -30, maxValue = 70 } = {}) {
  return { moment: name, radialCount: radials, validGateCount, gateRange: { gateCount }, minValue, maxValue };
}

function diagnostic(index, angle, moments, extra = {}) {
  return { index, elevationDeg: angle, isPpiLike: true, isSectorLike: false, moments, ...extra };
}

{
  const cuts = [cut(0, 0.5, 400, ["DVEL"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("DVEL", 400)])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(assessed.expected, 720);
  assert.equal(assessed.goodAuto, false);
  assert.match(assessed.reason, /400\/720/);
}

{
  const cuts = [cut(0, 0.5, 720, ["DVEL"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("DVEL", 720)])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(assessed.goodAuto, true);
  assert.equal(assessed.goodStrict, true);
}

{
  const cuts = [
    cut(0, 0.5, 360, ["DVEL"]),
    cut(1, 0.5, 720, ["DVEL"]),
  ];
  const diagnostics = { cuts: [
    diagnostic(0, 0.5, [moment("DVEL", 360)]),
    diagnostic(1, 0.5, [moment("DVEL", 720)]),
  ] };
  const selected = availableCuts(cuts, { diagnostics, product: "DVEL", quality: "auto" });
  assert.deepEqual(selected.map((item) => item.index), [1]);
}


{
  const cuts = [cut(0, 0.5, 720, ["REF", "DVEL"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [
    moment("REF", 720),
    moment("DVEL", 540),
  ])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(assessed.radials, 540, "velocity QC must use velocity geometry, not reflectivity geometry");
  assert.equal(assessed.goodAuto, false);
}


{
  const cuts = [cut(0, 0.5, 720, ["DVEL", "VEL"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [
    moment("DVEL", 720, { validGateCount: 0 }),
    moment("VEL", 720, { validGateCount: 65_000 }),
  ])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(assessed.preferredMoment, "VEL", "a usable compatible velocity moment should beat a blank exact-name moment");
  assert.equal(assessed.goodAuto, true);
}

{
  const cuts = [
    cut(0, 0.5, 720, ["DVEL"]),
    cut(1, 0.5, 720, ["DVEL"]),
  ];
  const diagnostics = { cuts: [
    diagnostic(0, 0.5, [moment("DVEL", 720, { validGateCount: 500 })]),
    diagnostic(1, 0.5, [moment("DVEL", 720, { validGateCount: 80_000 })]),
  ] };
  const selected = availableCuts(cuts, { diagnostics, product: "DVEL", quality: "auto" });
  assert.deepEqual(selected.map((item) => item.index), [1], "duplicate velocity cuts should prefer the stronger usable field");
}

{
  const cuts = [cut(0, 0.5, 720, ["DVEL"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("DVEL", 720, { validGateCount: 0 })])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(assessed.goodAuto, false);
  assert.equal(assessed.reason, "no usable gates");
}


{
  const cuts = [cut(0, 0.5, 720, ["REF", "DVEL"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("REF", 720)])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(assessed.goodAuto, false, "cut diagnostics should override stale session product labels");
  assert.equal(assessed.reason, "product missing");
}

{
  const cuts = [cut(0, 0.5, 720, ["REF"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("REF", 720)])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(assessed.goodAuto, false);
  assert.equal(assessed.reason, "product missing");
}

{
  const cuts = [cut(0, 0.5, 720, ["REF"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("REF", 720)], { isSectorLike: true })] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "REF" })[0];
  assert.equal(assessed.goodAuto, false);
  assert.equal(assessed.reason, "partial azimuth coverage");
}

{
  const cuts = [cut(0, 1.5, 360, ["REF"])];
  const diagnostics = { cuts: [diagnostic(0, 1.5, [moment("REF", 360)])] };
  assert.equal(normalizeCuts(cuts, { diagnostics, product: "REF" })[0].goodAuto, false);
}

{
  const cuts = [cut(0, 4.0, 360, ["REF"])];
  const diagnostics = { cuts: [diagnostic(0, 4.0, [moment("REF", 360)])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "REF" })[0];
  assert.equal(assessed.expected, 360);
  assert.equal(assessed.goodAuto, true);
  assert.equal(assessed.goodStrict, false);
}

{
  const cuts = [cut(0, 0.5, 719, ["REF"])];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("REF", 719)])] };
  assert.equal(normalizeCuts(cuts, { diagnostics, product: "REF" })[0].goodAuto, false);
}

{
  const cuts = [cut(0, 0.5, 720, ["REF"], { complete: false })];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("REF", 720)])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "REF" })[0];
  assert.equal(assessed.goodAuto, true, "full cut should not be held behind a volume-level incomplete flag");
}

{
  const cuts = [cut(0, 0.5, 300, ["DVEL"], { complete: false })];
  const diagnostics = { cuts: [diagnostic(0, 0.5, [moment("DVEL", 300)])] };
  const assessed = normalizeCuts(cuts, { diagnostics, product: "DVEL" })[0];
  assert.equal(cutAccepted(assessed, "auto"), false);
  assert.equal(cutAccepted(assessed, "all"), true, "raw mode should expose a partial matching-product cut");
}

{
  const cuts = [cut(0, 0.5, 720, ["DVEL"])];
  const assessed = normalizeCuts(cuts, { diagnostics: null, product: "DVEL" })[0];
  assert.equal(assessed.goodAuto, true, "explicit full session metadata is a conservative fallback if diagnostics fail");
  assert.equal(assessed.reason, "complete · metadata");
}

console.log("scan-quality: 16 checks passed");
