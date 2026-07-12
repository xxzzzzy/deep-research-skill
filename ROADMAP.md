# Roadmap

This roadmap describes intended work, not completed capabilities.

## 0.1 - Reproducible foundation

- [x] Repair the Node.js reference implementation.
- [x] Add bounded research rounds and per-request output limits.
- [x] Report API token usage.
- [x] Add offline unit tests for orchestration and configuration.
- [x] Publish English and Chinese documentation.
- [x] Publish the first tagged release.

## 0.2 - Evaluation

- [ ] Define 20 public research questions across technology, science, and product analysis.
- [ ] Add an evaluation rubric for source authority, citation support, coverage, uncertainty, and repetition.
- [ ] Save machine-readable run metadata without storing API keys or private prompts.
- [ ] Publish baseline results and known failure cases.

## 0.3 - Reliability

- [ ] Add source-domain extraction and duplicate-source detection.
- [ ] Add a citation verification pass.
- [ ] Add source-quality heuristics that favor primary and authoritative material.
- [ ] Add semantic similarity checks to estimate convergence between rounds.
- [ ] Test failure behavior for unavailable search, rate limits, and empty responses.

## 0.4 - Cost controls

- [ ] Add a total token budget across the full run.
- [ ] Add optional estimated-cost reporting based on user-supplied pricing configuration.
- [ ] Stop early when new evidence falls below a documented threshold.
- [ ] Compare research quality across different round and token limits.

## API credit usage plan

If API credits are granted, they will be used for the public evaluation and reliability milestones above. The intended outputs are:

1. reproducible evaluation prompts and rubrics;
2. benchmark run metadata and non-sensitive results;
3. documented failure cases;
4. improved stopping, citation, and source-quality checks;
5. token-efficiency comparisons.

Credits will not be used to operate a private production service or resold API access.
