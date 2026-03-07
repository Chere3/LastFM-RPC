# Contributing to LastFM-RPC

Thanks for your interest in improving LastFM-RPC 🎵

## Development setup

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
4. Fill `API_KEY`, `API_SECRET`, `USER`, and `CLIENT_ID`.

## Quality checks

Before opening a PR, run:

```bash
yarn lint
yarn typecheck
yarn build
```

## Branch and commit conventions

- Branches: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`, `refactor/<topic>`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`...)

## Pull request checklist

- [ ] Scope is focused and clear
- [ ] README/docs updated when behavior changes
- [ ] Quality checks pass locally
- [ ] No secrets committed (`.env` must stay local)

## Issues and roadmap

Please check [`ROADMAP.md`](./ROADMAP.md) before proposing large features.
