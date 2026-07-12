#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");
const OpenAI = require("openai");
const {
  buildResearchPrompt,
  buildSynthesisPrompt,
  runResearch,
} = require("../src/research");
const { loadConfig } = require("../src/config");

function printUsage() {
  console.error(
    [
      "Usage: npm run research -- \"your research question\"",
      "",
      "Required:",
      "  OPENAI_API_KEY          OpenAI API key",
      "",
      "Optional:",
      "  RESEARCH_MODEL          Model name (default: gpt-5-mini)",
      "  RESEARCH_MAX_ITER       Research rounds, 1-5 (default: 3)",
      "  RESEARCH_MAX_TOKENS     Maximum output tokens per request (default: 2500)",
      "  RESEARCH_OUTPUT_DIR     Report directory (default: reports)",
    ].join("\n"),
  );
}

function createOpenAIResearchClient(config) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  return {
    async researchRound({ topic, round, previousText }) {
      const response = await client.responses.create({
        model: config.model,
        tools: [{ type: "web_search" }],
        input: buildResearchPrompt({ topic, round, previousText }),
        max_output_tokens: config.maxOutputTokens,
      });

      return {
        text: response.output_text,
        usage: response.usage || null,
      };
    },

    async synthesize({ topic, rounds }) {
      const response = await client.responses.create({
        model: config.model,
        input: buildSynthesisPrompt({ topic, rounds }),
        max_output_tokens: config.maxOutputTokens,
      });

      return {
        text: response.output_text,
        usage: response.usage || null,
      };
    },
  };
}

function safeFilename(topic) {
  const normalized = topic
    .normalize("NFKC")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return normalized || "research";
}

function saveReport({ topic, report, config }) {
  fs.mkdirSync(config.outputDir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const outputPath = path.join(
    config.outputDir,
    `${safeFilename(topic)}-${date}.md`,
  );
  fs.writeFileSync(outputPath, report, "utf8");
  return outputPath;
}

async function main() {
  const topic = process.argv.slice(2).join(" ").trim();
  if (!topic) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set.");
    printUsage();
    process.exitCode = 1;
    return;
  }

  const config = loadConfig(process.env);
  const researchClient = createOpenAIResearchClient(config);

  console.error(
    `[research] Starting ${config.maxIterations} round(s) with ${config.model}`,
  );

  const result = await runResearch({
    topic,
    config,
    client: researchClient,
    onRound: ({ round }) => {
      console.error(`[research] Completed round ${round}`);
    },
  });

  const outputPath = saveReport({
    topic,
    report: result.report,
    config,
  });

  console.log(
    JSON.stringify(
      {
        status: "success",
        topic,
        rounds: result.rounds.length,
        usage: result.usage,
        reportPath: outputPath,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(`[research] Failed: ${error.message}`);
  process.exitCode = 1;
});
