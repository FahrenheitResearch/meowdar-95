const PRODUCT_MOMENTS = {
  REF: ["DREF", "REF", "DBZ", "DZ", "ZH", "Z"],
  DVEL: ["DVEL", "VEL", "VELH", "VR", "VE", "BV", "V"],
  CC: ["CC", "RHOHV", "RHO", "RHV", "CCOR"],
};

function finite(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizedMomentName(value) {
  const source = typeof value === "object" && value
    ? value.moment ?? value.code ?? value.product ?? value.name ?? value.field ?? value.quantity ?? ""
    : value;
  return String(source || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function momentMatchesProduct(name, product) {
  const normalized = normalizedMomentName(name);
  if (!normalized) return false;
  if (PRODUCT_MOMENTS[product]?.includes(normalized)) return true;
  if (product === "REF") return /^(D?REF|DBZ|DZ|ZH?|Z)\d*$/.test(normalized);
  if (product === "DVEL") return /^(D?VEL|VELH?|VR|VE|BV|V)\d*$/.test(normalized);
  if (product === "CC") return /^(CC|CCOR|RHO(HV)?|RHV)\d*$/.test(normalized);
  return false;
}

function momentRank(name, product) {
  const normalized = normalizedMomentName(name);
  const order = PRODUCT_MOMENTS[product] || [];
  const exact = order.indexOf(normalized);
  if (exact >= 0) return order.length - exact + 10;
  return momentMatchesProduct(normalized, product) ? 5 : 0;
}

function sessionCutIndex(cut, position) {
  return finite(cut?.index ?? cut?.cutIndex) ?? position;
}

function sessionCutAngle(cut) {
  return finite(cut?.elevationDeg ?? cut?.elevation ?? cut?.angle);
}

function sessionElevationNumber(cut) {
  return finite(cut?.elevationNumber ?? cut?.elevationIndex ?? cut?.metadata?.elevationNumber);
}

function diagnosticsCuts(diagnostics) {
  const cuts = diagnostics?.cuts ?? diagnostics?.volume?.cuts ?? diagnostics?.diagnostics?.cuts;
  return Array.isArray(cuts) ? cuts : [];
}

function diagnosticForCut(cut, position, diagnostics) {
  const list = diagnosticsCuts(diagnostics);
  if (!list.length) return null;
  const index = sessionCutIndex(cut, position);
  const angle = sessionCutAngle(cut);
  const elevationNumber = sessionElevationNumber(cut);
  return list.find((candidate, candidatePosition) => {
    const candidateIndex = finite(candidate?.index ?? candidate?.cutIndex) ?? candidatePosition;
    return candidateIndex === index;
  }) || list.find((candidate) => {
    const candidateNumber = finite(candidate?.elevationNumber ?? candidate?.elevationIndex);
    return elevationNumber != null && candidateNumber != null && candidateNumber === elevationNumber;
  }) || list.find((candidate) => {
    const candidateAngle = finite(candidate?.elevationDeg ?? candidate?.elevation ?? candidate?.angle);
    return angle != null && candidateAngle != null && Math.abs(candidateAngle - angle) < 0.08;
  }) || null;
}

function objectMomentEntries(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") {
    return Object.entries(value).map(([name, entry]) => typeof entry === "object" && entry
      ? { moment: name, ...entry }
      : { moment: name });
  }
  return [value];
}

function diagnosticMoments(cut) {
  return objectMomentEntries(cut?.moments ?? cut?.availableMoments ?? cut?.products ?? cut?.fields);
}

function sessionMomentNames(cut) {
  const candidates = [
    cut?.moments,
    cut?.availableMoments,
    cut?.products,
    cut?.fields,
    cut?.metadata?.moments,
    cut?.sourceMoment,
    cut?.sourceMoments,
  ];
  const names = [];
  for (const candidate of candidates) {
    for (const entry of objectMomentEntries(candidate)) {
      const name = normalizedMomentName(entry);
      if (name && !names.includes(name)) names.push(name);
    }
  }
  return names;
}

function bestMoment(diagnostic, cut, product) {
  const diagnosticEntries = diagnosticMoments(diagnostic);
  const diagnosticNames = new Set(diagnosticEntries.map(normalizedMomentName).filter(Boolean));
  const sessionEntries = diagnosticEntries.length ? [] : sessionMomentNames(cut)
    .filter((name) => !diagnosticNames.has(name))
    .map((name) => ({ moment: name }));
  const candidates = [...diagnosticEntries, ...sessionEntries]
    .filter((entry) => momentMatchesProduct(entry, product));

  // A preferred source-moment label is only a tie-breaker. Real Level II
  // volumes can expose duplicate velocity moments at one elevation; choosing
  // the most exact name before checking geometry/gates can select a blank or
  // half-published field even when another product-compatible moment is good.
  // Prefer usable data and native radial coverage first, then the canonical
  // product name. This mirrors the operator expectation behind “good tilt”.
  return candidates.sort((a, b) => momentSelectionScore(b, product) - momentSelectionScore(a, product))[0] || null;
}

function validGateCountFromMoment(moment) {
  return finite(
    moment?.validGateCount ?? moment?.validGates ?? moment?.finiteGateCount ??
    moment?.nonMissingGateCount ?? moment?.sampleCount ?? moment?.gateStats?.valid,
  );
}

function gateCountFromMoment(moment) {
  return finite(moment?.gateRange?.gateCount ?? moment?.gateCount ?? moment?.gates ?? moment?.gateStats?.total);
}

function radialCountFromMoment(moment) {
  return finite(moment?.radialCount ?? moment?.radials ?? moment?.rayCount);
}

function momentSelectionScore(moment, product) {
  const validity = dataValidity(moment, null);
  const radials = Math.max(0, radialCountFromMoment(moment) ?? 0);
  const validGates = Math.max(0, validGateCountFromMoment(moment) ?? 0);
  const gates = Math.max(0, gateCountFromMoment(moment) ?? 0);
  const validityScore = validity === false ? -1_000_000_000 : validity === true ? 100_000_000 : 0;
  return validityScore
    + Math.min(2_000, radials) * 1_000_000
    + Math.log10(validGates + 1) * 10_000
    + Math.log10(gates + 1) * 1_000
    + momentRank(moment, product) * 100;
}

function radialCountFromCut(cut) {
  const candidates = [
    cut?.radials,
    cut?.radialCount,
    cut?.rayCount,
    cut?.azimuthCount,
    cut?.metadata?.radials,
    cut?.metadata?.radialCount,
    cut?.geometry?.radials,
  ];
  for (const candidate of candidates) {
    if (Array.isArray(candidate) || ArrayBuffer.isView(candidate)) return candidate.length;
    const numeric = finite(candidate);
    if (numeric != null && numeric > 0) return numeric;
  }
  return null;
}

function expectedRadials({ angle, radialCount, diagnostic, cut }) {
  const explicit = finite(
    diagnostic?.expectedRadials ?? diagnostic?.expectedRadialCount ??
    cut?.expectedRadials ?? cut?.expectedRadialCount ?? cut?.metadata?.expectedRadials ?? cut?.geometry?.expectedRadials,
  );
  if (explicit != null && explicit > 0) return explicit;
  if (radialCount == null || radialCount <= 0) return null;

  // The two native PPI geometries commonly encountered here are legacy 1°
  // (360 rays) and super-resolution 0.5° (720 rays). Values between those
  // bands are treated as unfinished 720-ray sweeps, not as complete 360s.
  // Meowdar operational low tilts are intentionally held to the native
  // super-resolution 0.5° geometry. A 360-ray low cut is not substituted for
  // the finished 720-ray cut unless the decoder explicitly reports a different
  // expected geometry above.
  if (angle != null && angle <= 2.5 + 0.001) return 720;
  if (radialCount >= 540) return 720;
  if (radialCount >= 345 && radialCount <= 390) return 360;
  if (radialCount > 390) return 720;
  return 360;
}

function dataValidity(moment, diagnostic) {
  const explicit = diagnostic?.dataValid ?? diagnostic?.validData ?? moment?.dataValid;
  if (explicit === true || explicit === false) return explicit;
  if (!moment) return null;
  const radialCount = radialCountFromMoment(moment);
  const gateCount = gateCountFromMoment(moment);
  const validGateCount = validGateCountFromMoment(moment);
  const minValue = finite(moment?.minValue ?? moment?.min);
  const maxValue = finite(moment?.maxValue ?? moment?.max);
  if (radialCount != null && radialCount <= 0) return false;
  if (gateCount != null && gateCount <= 0) return false;
  if (validGateCount != null && validGateCount <= 0) return false;
  if (minValue != null && maxValue != null && minValue > maxValue) return false;
  if (radialCount != null || gateCount != null || validGateCount != null) return true;
  return null;
}

function geometryFlags(diagnostic, cut) {
  const scanMode = String(diagnostic?.scanMode ?? cut?.scanMode ?? cut?.metadata?.scanMode ?? "").toLowerCase();
  const isSectorLike = diagnostic?.isSectorLike === true || cut?.isSectorLike === true || /sector/.test(scanMode);
  const isPpiLike = diagnostic?.isPpiLike !== false && cut?.isPpiLike !== false && !/(rhi|vertical)/.test(scanMode);
  return { isSectorLike, isPpiLike };
}

function explicitCompleteness(diagnostic, cut) {
  // Decoder geometry diagnostics are cut-specific and authoritative. Session
  // `cut.complete` flags can mirror whole-volume state, so a false value there
  // must not hide a geometrically finished low sweep while upper tilts arrive.
  const authoritative = [
    diagnostic?.complete,
    diagnostic?.geometryComplete,
    cut?.geometry?.complete,
  ];
  if (authoritative.some((value) => value === false)) return false;
  if (authoritative.some((value) => value === true)) return true;
  const advisory = [cut?.complete, cut?.metadata?.complete];
  if (advisory.some((value) => value === true)) return true;
  return null;
}

function qualityReason({ hasProduct, momentNames, displayable, explicitlyIncomplete, isPpiLike, isSectorLike, dataValid, geometryComplete, radials, expected }) {
  if (!displayable) return "not displayable";
  if (!hasProduct) return momentNames.length ? "product missing" : "moment unknown";
  if (explicitlyIncomplete) return "flagged incomplete";
  if (!isPpiLike || isSectorLike) return "partial azimuth coverage";
  if (dataValid === false) return "no usable gates";
  if (geometryComplete !== true) return expected != null ? `${radials ?? 0}/${expected} radials` : "geometry unknown";
  return "good";
}

export function normalizeCuts(cuts, { diagnostics = null, product = "REF" } = {}) {
  if (!Array.isArray(cuts)) return [];
  return cuts.map((cut, position) => {
    const diagnostic = diagnosticForCut(cut, position, diagnostics);
    const sessionNames = sessionMomentNames(cut);
    const diagnosticNames = diagnosticMoments(diagnostic).map(normalizedMomentName).filter(Boolean);
    const authoritativeMomentNames = diagnosticNames.length ? diagnosticNames : sessionNames;
    const momentNames = [...new Set([...diagnosticNames, ...sessionNames])];
    const moment = bestMoment(diagnostic, cut, product);
    const preferredMoment = normalizedMomentName(moment) || authoritativeMomentNames
      .filter((name) => momentMatchesProduct(name, product))
      .sort((a, b) => momentRank(b, product) - momentRank(a, product))[0] || "";
    const hasExplicitMomentMetadata = authoritativeMomentNames.length > 0;
    const hasProduct = hasExplicitMomentMetadata
      ? authoritativeMomentNames.some((name) => momentMatchesProduct(name, product))
      : true;
    const productRank = preferredMoment ? momentRank(preferredMoment, product) : (hasProduct ? 1 : 0);
    const angle = finite(diagnostic?.elevationDeg ?? diagnostic?.elevation ?? diagnostic?.angle) ?? sessionCutAngle(cut);
    const radials = radialCountFromMoment(moment) ?? radialCountFromCut(cut);
    const expected = expectedRadials({ angle, radialCount: radials, diagnostic, cut });
    const ratio = radials != null && expected != null && expected > 0 ? radials / expected : null;
    const displayable = cut?.displayable !== false && diagnostic?.displayable !== false;
    const explicitComplete = explicitCompleteness(diagnostic, cut);
    const explicitlyIncomplete = explicitComplete === false;
    const { isSectorLike, isPpiLike } = geometryFlags(diagnostic, cut);
    const dataValid = dataValidity(moment, diagnostic);
    const geometryComplete = explicitlyIncomplete
      ? false
      : (radials != null && expected != null ? radials >= expected : explicitComplete);

    const goodAuto = displayable && hasProduct && !explicitlyIncomplete && isPpiLike && !isSectorLike
      && dataValid !== false && geometryComplete === true;
    const goodStrict = goodAuto && expected === 720 && radials >= 720
      && hasExplicitMomentMetadata && productRank >= 5;
    const rawUsable = displayable && hasProduct;
    const validGateCount = validGateCountFromMoment(moment);
    const score =
      (goodStrict ? 1_000_000 : 0) +
      (goodAuto ? 500_000 : 0) +
      (geometryComplete ? 100_000 : 0) +
      (expected === 720 && radials >= 720 ? 50_000 : 0) +
      (dataValid === true ? 20_000 : 0) +
      Math.min(30_000, Math.log10(Math.max(1, validGateCount || 1)) * 5_000) +
      productRank * 1_000 +
      Math.min(2_000, Math.max(0, radials || 0)) -
      (isSectorLike ? 500_000 : 0) -
      (dataValid === false ? 500_000 : 0);

    const values = {
      hasProduct,
      momentNames,
      displayable,
      explicitlyIncomplete,
      isPpiLike,
      isSectorLike,
      dataValid,
      geometryComplete,
      radials,
      expected,
    };

    return {
      raw: cut,
      diagnostic,
      moment,
      preferredMoment,
      index: sessionCutIndex(cut, position),
      elevationNumber: sessionElevationNumber(cut),
      angle,
      position,
      radials,
      expected,
      ratio,
      momentNames,
      hasExplicitMomentMetadata,
      hasProduct,
      productRank,
      displayable,
      explicitlyIncomplete,
      geometryComplete,
      diagnosticReady: Boolean(diagnostic),
      dataValid,
      validGateCount,
      isPpiLike,
      isSectorLike,
      goodAuto,
      goodStrict,
      rawUsable,
      score,
      reason: !diagnostic && goodAuto ? "complete · metadata" : qualityReason(values),
    };
  }).sort((a, b) => {
    const aa = a.angle ?? a.position;
    const bb = b.angle ?? b.position;
    return aa - bb || b.score - a.score || a.index - b.index;
  });
}

export function cutAccepted(cut, quality = "auto") {
  if (!cut) return false;
  if (quality === "all") return cut.rawUsable !== false;
  return quality === "strict" ? cut.goodStrict : cut.goodAuto;
}

export function availableCuts(cuts, {
  diagnostics = null,
  product = "REF",
  quality = "auto",
  maxTilt = Infinity,
} = {}) {
  const normalized = normalizeCuts(cuts, { diagnostics, product });
  const accepted = normalized.filter((cut) => cutAccepted(cut, quality));
  const withinTilt = accepted.filter((cut) => !(Number.isFinite(maxTilt) && cut.angle != null && cut.angle > maxTilt + 0.001));

  // Raw mode intentionally exposes duplicate same-angle source cuts so an
  // operator can inspect them. Auto/Strict collapse duplicates to the strongest
  // product-matched, complete candidate.
  if (quality === "all") return withinTilt;

  const deduped = [];
  for (const cut of withinTilt) {
    const duplicateIndex = deduped.findIndex((candidate) => candidate.angle != null && cut.angle != null && Math.abs(candidate.angle - cut.angle) < 0.12);
    if (duplicateIndex < 0) deduped.push(cut);
    else if (cut.score > deduped[duplicateIndex].score) deduped[duplicateIndex] = cut;
  }
  return deduped.sort((a, b) => (a.angle ?? a.position) - (b.angle ?? b.position) || b.score - a.score);
}
