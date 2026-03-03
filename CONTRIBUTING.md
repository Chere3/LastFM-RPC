# Contributing to LastFM-RPC

Thank you for your interest in improving LastFM-RPC! This guide will help you contribute effectively.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh)
- Yarn package manager
- [Last.fm API Key](https://www.last.fm/api/account/create)
- [Discord Application](https://discord.com/developers/applications)

### Local Development Setup

1. **Fork and clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/LastFM-RPC.git
   cd LastFM-RPC
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Run in development mode**
   ```bash
   yarn dev
   ```

## 📁 Project Structure

```
LastFM-RPC/
├── src/
│   ├── index.ts          # Entry point
│   ├── apis/
│   │   └── lastfm.ts     # Last.fm API client & types
│   └── rpc/
│       └── start.ts      # Discord RPC logic
├── .env.example          # Environment template
├── package.json
└── tsconfig.json
```

## 🔧 Development Guidelines

### Code Style

This project uses:
- **ESLint** for linting
- **Prettier** for formatting
- **Commitlint** for commit messages
- **Husky** for git hooks

Run linting:
```bash
yarn lint
```

Format code:
```bash
yarn format
```

### TypeScript

- Use strict type checking
- Avoid `any` types — prefer `unknown` or proper typing
- Add JSDoc comments for public functions

## 📝 Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`

**Examples:**
```
feat(rpc): add album art display
fix(api): handle rate limiting errors
docs(readme): add troubleshooting section
```

## 🧪 Testing Your Changes

1. **Start the application**
   ```bash
   yarn dev
   ```

2. **Verify Discord presence** appears correctly

3. **Test edge cases:**
   - No track playing
   - Track changes mid-listening
   - API rate limiting
   - Network disconnection

## 📤 Pull Request Process

1. Create a feature branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/your-feature
   ```

2. Make changes with clear commits

3. Ensure code passes linting:
   ```bash
   yarn lint
   ```

4. Push and open a Pull Request against `dev`

5. Fill out the PR template completely

## 🎯 Areas for Contribution

Check the [ROADMAP.md](./ROADMAP.md) for planned features:

- **Quick Wins:** Error handling, logging, reconnection logic
- **Features:** Album art, scrobble count, loved tracks indicator
- **Platform:** macOS support, Linux systemd integration

## 🌍 Translations

README translations are welcome! Create `README.{lang}.md` files.

---

Thank you for contributing! 🎵
