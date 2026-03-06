# Contributing to LastFM-RPC

Thanks for contributing to LastFM-RPC.

## Branching model

- Base branch: `dev`
- Use conventional branch names:
  - `feat/<topic>`
  - `fix/<topic>`
  - `chore/<topic>`
  - `refactor/<topic>`

## Local setup

```bash
yarn install
cp .env.example .env
```

## Quality gates

Before opening a PR, run:

```bash
yarn check
```

`yarn check` runs typecheck + build.

## Pull request checklist

- [ ] Scope is clear and limited
- [ ] Validation commands pass locally
- [ ] README/ROADMAP updated when behavior changes
- [ ] Risk/rollback notes included for runtime changes
