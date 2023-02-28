/* eslint-disable no-negated-condition */
import createClient from 'discord-rich-presence';
import NodeCache from 'node-cache';
import {LastFmApi, type Final, type Track, type TrackInformation} from '../apis/lastfm';

export class LastFmPrincipal {
	id: number | string;
	constructor(id: string) {
		this.id = id;
	}

	async start() {
		// Start node-cache
		const cache = new NodeCache();
		const datos = await this.getCompleteSongInformation();
		if (!datos.song) {
			const client = createClient(String(this.id));
			return client.on('connected', async () => {
				const data = await this.getLastSongListened();
				client.updatePresence({
					details: `🎧 Ultima canción escuchada: ${data.song.name}`,
					state: `👩🏿‍🎨 De: ${datos.song?.artist['#text'] ?? 'No encontrado'}`,
					startTimestamp: Date.now(),
				});
			});
		}

		cache.set('actual_song', datos.song);
		const client = createClient(String(this.id));
		client.on('connected', async () => {
			await this.setPresence(client, datos);
		});

		setInterval(async () => {
			const data = await new LastFmApi({
				apiKey: process.env.API_KEY!,
				apiSecret: process.env.API_SECRET!,
			}).getTracks(process.env.USER!);

			const song = datos.data.recenttracks.track.find(x => x['@attr']?.nowplaying === 'true');
			if (!song) {
				client.updatePresence({
					details: `🎧 Ultima canción escuchada: ${datos.data.recenttracks.track[0].name}`,
					state: `👩🏿‍🎨 De: ${datos.data.recenttracks.track[0].artist['#text']}`,
					startTimestamp: Date.now(),
				});
				return;
			}

			// eslint-disable-next-line curly
			if (JSON.stringify(song) === JSON.stringify(cache.get('actual_song'))) return;
			cache.set('actual_song', song);
			const track = await new LastFmApi({
				apiKey: process.env.API_KEY!,
				apiSecret: process.env.API_SECRET!,
			}).getTrackInfo(song.artist['#text'], song.name);
			client.updatePresence({
				details: `🎧 Escuchando: ${song.name}`,
				state: `👩🏿‍🎨 De: ${song.artist['#text']}`,
				largeImageKey: 'lastfm',
				startTimestamp: Date.now(),
				endTimestamp: Date.now() + Number(track.track.duration),
			});
			console.log(
				`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | 🎵 Música reproduciendose encontrada, aplicando la canción ${
					song?.name
				} - ${song?.artist['#text']} a la rich presence ${
					track?.track?.duration !== '0'
						? `con una duración de ${toSongFormat(Number(track.track.duration))}`
						: ''
				}`,
			);
		}, 5000);
	}

	async getListeningSong() {
		// Fetching the lastfm data to be recollected.
		const data = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTracks(process.env.USER!);

		// Get the actual song datos.data.
		return {song: data.recenttracks.track.find(x => x['@attr']?.nowplaying === 'true'), data};
	}

	async getLastSongListened() {
		const data = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTracks(process.env.USER!);

		// Get the last song
		return {song: data.recenttracks.track[0], data};
	}

	async getCompleteSongInformation() {
		console.log('🎶 | Buscando canción reproduciendose...');
		const info = await this.getListeningSong();
		const track = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTrackInfo(info.song?.artist?.['#text'] ?? 'dont_found', info.song?.name ?? 'dont_found');

		console.log(
			info.song === undefined
				? '⚠️ | No se ha encontrado música reproduciendose.'
				: `🎶 | Reproduciendo ahora ${info.song.name} de ${info.song.artist['#text']}`,
		);

		return {track, ...info};
	}

	// prettier-ignore
	async setPresence(client: createClient.RP, data: {song: Track | undefined; data: Record<'recenttracks', Final>} | {song: Track | undefined; data: Record<'recenttracks', Final>; track: Record<'track', TrackInformation>}) {
		const datos = data as {song: Track | undefined; data: Record<'recenttracks', Final>; track?: Record<'track', TrackInformation>};
		const end = datos.track?.track?.duration === undefined ? undefined : Date.now() + Number(datos.track.track.duration);
		client.updatePresence({
			details: `🎧 Escuchando: ${data.song?.name ?? 'No encontrado'}`,
			state: `👩🏿‍🎨 De: ${data.song?.artist['#text'] ?? 'No encontrado'}`,
			largeImageKey: 'lastfm',
			startTimestamp: Date.now(),
			endTimestamp: end,
		});
	}
}

function toSongFormat(milisegundos: number) {
	const segundos = Math.floor(milisegundos / 1000); // Divide los milisegundos por 1000 para obtener los segundos
	const minutos = Math.floor(segundos / 60); // Divide los segundos por 60 para obtener los minutos
	const segundosRestantes = segundos % 60;
	const formatoMinutosSegundos = `${minutos.toString().padStart(2, '0')}:${segundosRestantes
		.toString()
		.padStart(2, '0')}`;
	return formatoMinutosSegundos;
}
