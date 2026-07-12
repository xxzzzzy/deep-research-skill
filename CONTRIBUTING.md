# Contributing

Contributions are welcome, especially focused improvements to evaluation, citation checking, stopping behavior, and cost controls.

## Development setup

```bash
npm install
npm test
npm run check
```

Unit tests must remain runnable without an API key. Live API evaluations should be opt-in and must not run automatically in pull requests.

## Pull requests

- Keep changes focused.
- Add or update tests for behavior changes.
- Document new environment variables.
- Do not commit API keys, private prompts, generated private reports, or billing information.
- Clearly label experimental quality metrics and avoid claims that are not supported by published evidence.

## Reporting issues

Include:

- the command or research configuration;
- expected and actual behavior;
- Node.js version;
- a minimal non-sensitive example;
- whether the problem occurs without a live API call.

For security concerns, follow [SECURITY.md](SECURITY.md).
