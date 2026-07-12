---
name: deep-research
description: Run a bounded, evidence-oriented research workflow when a user asks for a multi-source investigation, comparison, or research report.
---

# Deep Research

Use this skill for research questions that benefit from multiple sources and an explicit evidence trail.

## Workflow

1. Restate the research question and scope.
2. Prefer primary and authoritative sources.
3. Separate sourced evidence from inference.
4. Look for disagreement, missing evidence, and date-sensitive claims.
5. Stop when the configured research-round limit is reached.
6. Produce a structured report with limitations and source links.

## Guardrails

- Do not invent citations, publication details, quotations, or URLs.
- Do not claim semantic convergence unless it was actually measured.
- Keep API usage bounded by the configured round and output limits.
- Do not include private or confidential data in research prompts.
- Require human review before high-stakes use.

## CLI reference

Install dependencies and set `OPENAI_API_KEY`, then run:

```bash
npm run research -- "your research question"
```

See `README.md` for configuration and `ROADMAP.md` for planned capabilities.
