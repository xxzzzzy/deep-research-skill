# Deep Research Skill

A small, open-source research loop for AI agents. It uses the OpenAI Responses API with web search to gather evidence across multiple bounded rounds, identify gaps, and produce a cited Markdown report.

[中文说明](README.zh-CN.md) | [Roadmap](ROADMAP.md) | [Contributing](CONTRIBUTING.md)

## Why this project exists

One-shot research prompts often stop too early, repeat weak sources, or hide uncertainty. This project explores a reproducible loop:

1. Search broadly and prioritize primary or authoritative sources.
2. Feed prior notes into the next round.
3. Ask specifically for gaps, disagreements, and missing evidence.
4. Stop at a configured round limit.
5. Synthesize the collected notes into a structured report.

The current version is an early-stage Node.js reference implementation. It is intentionally small and explicit so that its prompts, limits, and evaluation methods can be inspected and improved.

## Current capabilities

- OpenAI Responses API integration
- Built-in web search for research rounds
- Configurable model, round limit, output-token limit, and report directory
- Cumulative token-usage reporting
- Markdown report generation
- Dependency-injected research core for offline automated tests

## Important limitations

- The project is experimental and does not guarantee factual accuracy.
- Source links and claims still require human review.
- The current stopping rule is a fixed round limit, not semantic convergence detection.
- Token limits are applied per API request; a total monetary budget is not yet enforced.
- The test suite validates orchestration and safeguards, not the factual quality of live model output.

These limitations are tracked in the public [roadmap](ROADMAP.md).

## Requirements

- Node.js 20 or newer
- An OpenAI API key with access to the Responses API

## Installation

```bash
git clone https://github.com/xxzzzzy/deep-research-skill.git
cd deep-research-skill
npm install
```

Set your API key in the shell. Never commit it to the repository.

macOS or Linux:

```bash
export OPENAI_API_KEY="your-api-key"
```

PowerShell:

```powershell
$env:OPENAI_API_KEY = "your-api-key"
```

## Usage

```bash
npm run research -- "Compare PostgreSQL and MySQL for a small SaaS product"
```

The generated Markdown report is written to `reports/` by default. The command also prints the number of research rounds and the API-reported token usage.

### Configuration

| Environment variable | Default | Purpose |
| --- | --- | --- |
| `RESEARCH_MODEL` | `gpt-5-mini` | Model used for research and synthesis |
| `RESEARCH_MAX_ITER` | `3` | Research rounds, bounded to 1-5 |
| `RESEARCH_MAX_TOKENS` | `2500` | Maximum output tokens per API request |
| `RESEARCH_OUTPUT_DIR` | `reports` | Directory for generated reports |

Example:

```bash
RESEARCH_MAX_ITER=2 RESEARCH_MAX_TOKENS=1500 npm run research -- "Research question"
```

## Testing

The automated tests do not call the OpenAI API and do not require an API key.

```bash
npm test
npm run check
```

## Evaluation plan

The project will publish reproducible evaluation cases covering:

- source authority and diversity;
- citation support for important claims;
- factual disagreements and uncertainty;
- repeated information across rounds;
- report completeness;
- token use and stopping behavior.

The initial engineering plan is documented in [ROADMAP.md](ROADMAP.md). Evaluation data and results will be added under `evals/` as the methodology stabilizes.

## Downstream case study

The broader structured-research approach is also being explored in [lian-ai](https://github.com/xxzzzzy/lian-ai), an open-source experiment based on the analysis of 333 public video transcripts. It is a separate project and is not evidence that the current research loop is already production-ready.

## Responsible use

- Review generated claims and sources before relying on a report.
- Do not include private, confidential, or personal data in research prompts.
- Use strict round and output limits to control API consumption.
- Do not use the tool to generate deceptive citations or impersonate authoritative research.

## License

MIT
