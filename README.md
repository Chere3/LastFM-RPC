<div align="center">

<img src="https://i.imgur.com/TIKtCug.png" alt="LastFM-RPC Logo" width="200">

# LastFM Discord Rich Presence

**Display your currently playing music on Discord — from any platform, any device.**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Last.fm](https://img.shields.io/badge/Last.fm-D51007?style=for-the-badge&logo=last.fm&logoColor=white)](https://www.last.fm/)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/)

[English](#english) • [Español](#español)

</div>

---

## English

### About

LastFM-RPC is a Discord Rich Presence client that syncs with your Last.fm account. Share what you're listening to with friends — whether you're using Spotify, Apple Music, YouTube Music, or any other scrobbling-compatible player.

### Features

- 🎵 **Now Playing** — Shows current track with remaining time
- 📻 **Last Played** — Falls back to last scrobbled track when idle
- ⚡ **Real-time Updates** — Polls every 6 seconds for changes
- 🎨 **Clean Display** — Artist and track info in Discord presence

### Screenshots

| Now Playing | Last Played |
|-------------|-------------|
| ![Now Playing](https://i.imgur.com/5XHEamZ.png) | ![Last Played](https://i.imgur.com/ZbgvBtV.png) |

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh)
- [Last.fm Account](https://www.last.fm/join)
- [Last.fm API Key](https://www.last.fm/api/account/create)
- [Discord Application](https://discord.com/developers/applications)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chere3/LastFM-RPC.git
   cd LastFM-RPC
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or: npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your credentials:
   ```env
   API_KEY=your-lastfm-api-key
   API_SECRET=your-lastfm-api-secret
   USER=your-lastfm-username
   CLIENT_ID=your-discord-application-id
   ```

4. **Run the application**
   ```bash
   yarn start
   # or: npm start
   ```

### Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `API_KEY` | ✅ | Your Last.fm API key |
| `API_SECRET` | ✅ | Your Last.fm API secret |
| `USER` | ✅ | Your Last.fm username |
| `CLIENT_ID` | ✅ | Discord application ID |

### Troubleshooting

<details>
<summary><strong>Discord presence not showing</strong></summary>

1. Ensure Discord desktop app is running (not web version)
2. Check Activity Status is enabled in Discord settings
3. Verify `CLIENT_ID` matches your Discord application
</details>

<details>
<summary><strong>"No song found" error</strong></summary>

1. Verify your Last.fm username is correct
2. Ensure you have scrobbled at least one track
3. Check your API credentials are valid
</details>

<details>
<summary><strong>Rate limiting issues</strong></summary>

The app polls every 6 seconds. If you experience rate limiting, increase the interval in `src/rpc/start.ts`.
</details>

---

## Español

### Acerca de

LastFM-RPC es un cliente de Discord Rich Presence que se sincroniza con tu cuenta de Last.fm. Comparte lo que estás escuchando con tus amigos — ya sea que uses Spotify, Apple Music, YouTube Music, o cualquier otro reproductor compatible con scrobbling.

### Características

- 🎵 **Reproduciendo Ahora** — Muestra la canción actual con tiempo restante
- 📻 **Última Reproducida** — Muestra la última canción cuando no hay música activa
- ⚡ **Actualizaciones en Tiempo Real** — Consulta cada 6 segundos
- 🎨 **Visualización Limpia** — Información del artista y canción en Discord

### Capturas de Pantalla

| Reproduciendo Ahora | Última Reproducida |
|---------------------|-------------------|
| ![Reproduciendo](https://i.imgur.com/5XHEamZ.png) | ![Última](https://i.imgur.com/ZbgvBtV.png) |

### Requisitos

- [Node.js](https://nodejs.org/) 18+ o [Bun](https://bun.sh)
- [Cuenta de Last.fm](https://www.last.fm/join)
- [API Key de Last.fm](https://www.last.fm/api/account/create)
- [Aplicación de Discord](https://discord.com/developers/applications)

### Inicio Rápido

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Chere3/LastFM-RPC.git
   cd LastFM-RPC
   ```

2. **Instalar dependencias**
   ```bash
   yarn install
   # o: npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita `.env` con tus credenciales:
   ```env
   API_KEY=tu-api-key-de-lastfm
   API_SECRET=tu-api-secret-de-lastfm
   USER=tu-usuario-de-lastfm
   CLIENT_ID=tu-id-de-aplicacion-discord
   ```

4. **Ejecutar la aplicación**
   ```bash
   yarn start
   # o: npm start
   ```

### Solución de Problemas

<details>
<summary><strong>La presencia no aparece en Discord</strong></summary>

1. Asegúrate de usar la app de escritorio de Discord (no la versión web)
2. Verifica que el Estado de Actividad esté habilitado en configuración
3. Confirma que `CLIENT_ID` coincida con tu aplicación de Discord
</details>

<details>
<summary><strong>Error "No se encontró canción"</strong></summary>

1. Verifica que tu nombre de usuario de Last.fm sea correcto
2. Asegúrate de haber hecho scrobble de al menos una canción
3. Revisa que tus credenciales de API sean válidas
</details>

---

## Contributing

See [ROADMAP.md](./ROADMAP.md) for planned features and improvements.

## License

MIT © [Chere3](https://github.com/Chere3)

---

<div align="center">
  <sub>Made with 🎵 for music lovers</sub>
</div>
