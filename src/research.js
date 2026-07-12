function buildResearchPrompt({ topic, round, previousText }) {
  const priorContext = previousText
    ? [
        "Previous research notes:",
        previousText,
        "",
        "Find material gaps, disagreements, missing primary sources, and newer evidence.",
        "Do not merely repeat the previous notes.",
      ].join("\n")
    : "Start with a broad evidence map, then prioritize primary and authoritative sources.";

  return [
    `Research question: ${topic}`,
    `Round: ${round}`,
    "",
    priorContext,
    "",
    "Requirements:",
    "- Use web search and favor primary or authoritative sources.",
    "- Separate sourced evidence from inference.",
    "- Include source links next to the claims they support.",
    "- Note important uncertainty, disagreement, and missing evidence.",
    "- Return concise Markdown research notes, not a final answer.",
  ].join("\n");
}

function buildSynthesisPrompt({ topic, rounds }) {
  const notes = rounds
    .map(({ round, text }) => `## Research round ${round}\n\n${text}`)
    .join("\n\n");

  return [
    `Create a final research report for: ${topic}`,
    "",
    "Use only the supplied research notes. Do not invent sources or facts.",
    "Deduplicate repeated findings and preserve useful source links.",
    "Clearly distinguish evidence, interpretation, limitations, and open questions.",
    "",
    "Required Markdown structure:",
    "# Title",
    "## Executive summary",
    "## Key findings",
    "## Evidence and analysis",
    "## Limitations and uncertainties",
    "## Sources",
    "",
    notes,
  ].join("\n");
}

function addUsage(total, usage) {
  if (!usage) return total;
  return {
    inputTokens: total.inputTokens + (usage.input_tokens || 0),
    outputTokens: total.outputTokens + (usage.output_tokens || 0),
    totalTokens: total.totalTokens + (usage.total_tokens || 0),
  };
}

async function runResearch({ topic, config, client, onRound = () => {} }) {
  if (!topic || !topic.trim()) {
    throw new Error("A research topic is required.");
  }
  if (!client?.researchRound || !client?.synthesize) {
    throw new Error("A research client with researchRound and synthesize is required.");
  }

  const rounds = [];
  let usage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };
  let previousText = "";

  for (let round = 1; round <= config.maxIterations; round += 1) {
    const result = await client.researchRound({
      topic,
      round,
      previousText,
    });
    if (!result?.text?.trim()) {
      throw new Error(`Research round ${round} returned no text.`);
    }

    rounds.push({ round, text: result.text.trim() });
    previousText = rounds.map((item) => item.text).join("\n\n");
    usage = addUsage(usage, result.usage);
    onRound({ round, result });
  }

  const synthesis = await client.synthesize({ topic, rounds });
  if (!synthesis?.text?.trim()) {
    throw new Error("Final synthesis returned no text.");
  }
  usage = addUsage(usage, synthesis.usage);

  return {
    report: synthesis.text.trim(),
    rounds,
    usage,
  };
}

module.exports = {
  addUsage,
  buildResearchPrompt,
  buildSynthesisPrompt,
  runResearch,
};
