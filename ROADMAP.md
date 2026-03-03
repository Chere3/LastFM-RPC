# 🗺️ LastFM-RPC Roadmap

> Development plan for the Last.fm Discord Rich Presence application

---

## 🎯 Vision

Create the definitive Last.fm Discord Rich Presence experience — seamless, reliable, and feature-rich — allowing music lovers to share what they're listening to across any platform, any device.

---

## 🏃 Quick Wins (1-2 weeks)

### Documentation
- [x] Add English version of README
- [x] Create `.env.example` with configuration options
- [x] Add troubleshooting guide
- [x] Document all configuration options

### Code Quality
- [ ] Strict TypeScript mode compliance
- [ ] Add error handling for API failures
- [ ] Implement reconnection logic for Discord RPC
- [ ] Add structured logging

### User Experience
- [ ] System tray icon with status indicator
- [ ] Graceful startup/shutdown messages
- [ ] Better error messages for users

---

## 🔧 Medium-Term Improvements (1-2 months)

### Feature Enhancements
- [ ] **Album Art Display** — Show album artwork in presence
- [ ] **Scrobble Count** — Display total plays for current track
- [ ] **Loved Tracks** — Heart indicator for loved songs
- [ ] **Listen Along** — Link to listen on streaming platforms

### Platform Support
- [ ] macOS native support
- [ ] Linux systemd service integration
- [ ] Windows installer/uninstaller
- [ ] Auto-start on system boot option

### Configuration
- [ ] GUI configuration panel
- [ ] Multiple Last.fm account support
- [ ] Custom presence text templates
- [ ] Privacy mode (hide after X minutes)

### Integration
- [ ] Support Spotify link generation
- [ ] Apple Music link generation
- [ ] YouTube Music link generation
- [ ] MusicBrainz metadata enrichment

---

## 🚀 Big Bets (3-6 months)

### Advanced Features
- [ ] **Now Playing History** — Track listening sessions
- [ ] **Statistics Dashboard** — View listening stats
- [ ] **Friend Activity** — See what friends are playing
- [ ] **Discord Bot Companion** — Share music in servers

### Technical Excellence
- [ ] Electron app wrapper for full GUI
- [ ] Automatic updates mechanism
- [ ] Cross-platform binary releases
- [ ] Docker container for server setups

### API & Extensibility
- [ ] Plugin system for custom integrations
- [ ] REST API for external control
- [ ] Webhook notifications
- [ ] Multi-user daemon mode

---

## 🏗️ Strategic Rewrites

### Phase 1: Core Stability
- Implement proper state machine for connection handling
- Add comprehensive error recovery
- Create test suite with mocked APIs
- Performance optimization for low CPU usage

### Phase 2: Modernization
- Consider Rust port for lower resource usage
- Native OS integration (notifications, media keys)
- Cross-platform UI framework (Tauri/Electron)

### Phase 3: Ecosystem
- Mobile companion app consideration
- Browser extension for web scrobbling
- Smart speaker integration

---

## 📊 Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Memory Usage | Unknown | <50MB |
| CPU Usage | Unknown | <1% idle |
| API Reliability | Unknown | 99.9% |
| Platform Support | 1 | 3 (Win/Mac/Linux) |
| User Rating | N/A | 4.5/5 |

---

## 🤝 Contributing

Contributions are welcome! Areas where help is especially appreciated:

- 🐛 Bug reports and fixes
- 📖 Documentation improvements
- 🌍 Translations (README, UI)
- ✨ Feature implementations from this roadmap

---

*Share your music taste with the world* 🎵

*Last updated: March 2026*
