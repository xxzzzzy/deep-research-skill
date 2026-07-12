const test = require("node:test");
const assert = require("node:assert/strict");
const { integerInRange, loadConfig } = require("../src/config");

test("integerInRange applies fallback and limits", () => {
  assert.equal(integerInRange(undefined, 3, 1, 5), 3);
  assert.equal(integerInRange("0", 3, 1, 5), 1);
  assert.equal(integerInRange("8", 3, 1, 5), 5);
  assert.equal(integerInRange("4", 3, 1, 5), 4);
});

test("loadConfig reads bounded environment values", () => {
  const config = loadConfig({
    RESEARCH_MODEL: "test-model",
    RESEARCH_MAX_ITER: "99",
    RESEARCH_MAX_TOKENS: "1200",
    RESEARCH_OUTPUT_DIR: "tmp-reports",
  });

  assert.equal(config.model, "test-model");
  assert.equal(config.maxIterations, 5);
  assert.equal(config.maxOutputTokens, 1200);
  assert.match(config.outputDir, /tmp-reports$/);
});
