# Contributing

Thanks for improving LastFM-RPC.

## Local setup

1. Install dependencies

```bash
yarn install
```

2. Copy env file and fill your values

```bash
cp .env.example .env
```

Required environment variables:
- `CLIENT_ID` (Discord application client id)
- `API_KEY` (Last.fm API key)
- `API_SECRET` (Last.fm API secret)
- `USER` (Last.fm username)

## Quality checks

Run before opening a PR:

```bash
yarn quality
```

## Pull request checklist

- [ ] Branch created from `dev`
- [ ] `yarn quality` passes locally
- [ ] Docs updated (`README.md` / `ROADMAP.md`) when behavior changes
- [ ] PR description includes verification steps
