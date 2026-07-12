const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildResearchPrompt,
  buildSynthesisPrompt,
  runResearch,
} = require("../src/research");

test("later research prompts request gap-filling", () => {
  const prompt = buildResearchPrompt({
    topic: "Example topic",
    round: 2,
    previousText: "Existing notes",
  });

  assert.match(prompt, /Example topic/);
  assert.match(prompt, /Existing notes/);
  assert.match(prompt, /Do not merely repeat/);
});

test("synthesis prompt requires evidence and limitations", () => {
  const prompt = buildSynthesisPrompt({
    topic: "Example topic",
    rounds: [{ round: 1, text: "A sourced finding." }],
  });

  assert.match(prompt, /Do not invent sources or facts/);
  assert.match(prompt, /Limitations and uncertainties/);
});

test("runResearch respects the configured round limit and aggregates usage", async () => {
  const calls = [];
  const client = {
    async researchRound({ round, previousText }) {
      calls.push({ type: "round", round, previousText });
      return {
        text: `Finding ${round}`,
        usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
      };
    },
    async synthesize({ rounds }) {
      calls.push({ type: "synthesis", rounds });
      return {
        text: "# Final report",
        usage: { input_tokens: 20, output_tokens: 10, total_tokens: 30 },
      };
    },
  };

  const result = await runResearch({
    topic: "Test topic",
    config: { maxIterations: 2 },
    client,
  });

  assert.equal(result.rounds.length, 2);
  assert.equal(calls.filter((call) => call.type === "round").length, 2);
  assert.match(calls[1].previousText, /Finding 1/);
  assert.deepEqual(result.usage, {
    inputTokens: 40,
    outputTokens: 20,
    totalTokens: 60,
  });
});
