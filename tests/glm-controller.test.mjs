import assert from "node:assert/strict";

Object.defineProperty(globalThis, "navigator", { value: { hardwareConcurrency: 4 }, configurable: true });
Object.defineProperty(globalThis, "document", { value: {
  hidden: false,
  getElementById: () => null,
  addEventListener: () => {},
}, configurable: true });
Object.defineProperty(globalThis, "location", { value: { protocol: "https:", href: "https://radar.example/meowdar/" }, configurable: true });

const { GlmController } = await import("../glm-controller.js");

const controller = new GlmController({ config: { windowMinutes: 5, maxFiles: 30, maxPoints: 12000 } });
assert.equal(controller.effectiveWindowMinutes(), 5);
assert.equal(controller.effectiveFileLimit(), 17);
assert.equal(controller.effectiveMaxPoints(), 8000);
assert.equal(controller.granuleCacheLimit(), 24);
controller.setProfile("low");
assert.equal(controller.windowMinutes, 1);
assert.equal(controller.effectiveWindowMinutes(), 1);
assert.equal(controller.effectiveFileLimit(), 4);
assert.equal(controller.effectiveMaxPoints(), 2000);
assert.equal(controller.granuleCacheLimit(), 12);
controller.setProfile("full");
assert.equal(controller.windowMinutes, 5, "full profile should restore the operator's GLM window");

const target = new Date("2026-06-23T22:00:00Z");
const order = [];
const commits = [];
const keys = ["oldest.nc", "older.nc", "middle.nc", "recent.nc", "newest.nc"];
const progressive = new GlmController({
  config: { windowMinutes: 5, maxFiles: 30, maxPoints: 12000 },
  targetTime: () => target,
  onStatus: (status) => commits.push({ type: "status", text: status.text }),
});
progressive.profile = "low";
progressive.enabled = true;
progressive.live = false;
progressive.followLatest = false;
progressive.target = target;
progressive.keysForWindow = async () => keys;
progressive.decode = async (key) => {
  order.push(key);
  return [{ lat: 36, lon: -120, time: target.getTime(), energy: 1, area: 1 }];
};
progressive.updateMap = (data) => commits.push({ type: "map", count: data.features.length });
progressive.renderPreview = () => {};
globalThis.fetch = async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });

await progressive.refresh();
assert.deepEqual(order, ["newest.nc", "recent.nc", "middle.nc", "older.nc"]);
const mapCommits = commits.filter((entry) => entry.type === "map");
assert.equal(mapCommits[0].count, 1, "newest granule should paint before backfill");
assert.equal(mapCommits.at(-1).count, 4, "low profile should retain four granules");
assert.match(commits.at(-1).text, /4 flashes/);


const fallbackOrder = [];
const fallbackCommits = [];
const fallback = new GlmController({
  config: { windowMinutes: 5, maxFiles: 30, maxPoints: 12000 },
  targetTime: () => target,
  onStatus: (status) => fallbackCommits.push({ type: "status", text: status.text }),
});
fallback.setProfile("low");
fallback.enabled = true;
fallback.live = false;
fallback.followLatest = false;
fallback.target = target;
fallback.keysForWindow = async () => keys;
fallback.decode = async (key) => {
  fallbackOrder.push(key);
  if (key === "newest.nc") throw new Error("half-published NetCDF");
  return [{ lat: 36, lon: -120, time: target.getTime(), energy: 1, area: 1 }];
};
fallback.updateMap = (data) => fallbackCommits.push({ type: "map", count: data.features.length });
fallback.renderPreview = () => {};

const originalWarn = console.warn;
try {
  console.warn = () => {};
  await fallback.refresh();
} finally {
  console.warn = originalWarn;
}
assert.deepEqual(fallbackOrder, ["newest.nc", "recent.nc", "middle.nc", "older.nc"]);
assert.equal(fallbackCommits.filter((entry) => entry.type === "map")[0].count, 1, "a bad newest granule should fall back without blanking the layer");
assert.match(fallbackCommits.at(-1).text, /1 skipped/);

console.log("GLM controller tests passed");
