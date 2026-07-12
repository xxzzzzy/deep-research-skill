const path = require("node:path");

function integerInRange(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function loadConfig(env = process.env) {
  return {
    model: env.RESEARCH_MODEL || "gpt-5-mini",
    maxIterations: integerInRange(env.RESEARCH_MAX_ITER, 3, 1, 5),
    maxOutputTokens: integerInRange(
      env.RESEARCH_MAX_TOKENS,
      2500,
      500,
      10000,
    ),
    outputDir: path.resolve(env.RESEARCH_OUTPUT_DIR || "reports"),
  };
}

module.exports = { integerInRange, loadConfig };
