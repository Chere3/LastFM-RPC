# Security Policy

## 🔒 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| dev     | ✅ Active development |

## 🛡️ Reporting a Vulnerability

If you discover a security vulnerability:

1. **Do NOT open a public issue**
2. Contact the repository owner privately
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Resolution:** Based on severity

## 🔐 Security Best Practices

### API Key Security

⚠️ **Never commit API keys or secrets**

- Use `.env` files for local development
- Add `.env` to `.gitignore` (already configured)
- Rotate keys if accidentally exposed

### Environment Variables

Required secrets (keep private):
- `API_KEY` — Last.fm API key
- `API_SECRET` — Last.fm API secret
- `CLIENT_ID` — Discord application ID

### Data Handling

LastFM-RPC:
- Only reads public Last.fm scrobble data
- Does not store listening history
- Does not transmit data except to Discord RPC

### Discord Application

- Use a dedicated Discord application
- Don't share your Client ID publicly if using custom branding
- Review Discord's [Rich Presence Best Practices](https://discord.com/developers/docs/rich-presence/best-practices)

## ⚠️ Known Considerations

- [ ] Implement rate limiting for API calls
- [ ] Add timeout handling for network requests
- [ ] Sanitize display strings for Discord RPC

---

*Last updated: March 2026*
