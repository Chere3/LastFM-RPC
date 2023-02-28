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
		// All info modules.
		const cache = new NodeCache();
		const client = createClient(String(this.id));

		setInterval(() => {
			this.mainProcess(client, cache);
		}, 6000);
	}

	async getListeningSong() {
		console.log(`🎶 | Obteniendo canción escuchandose...`);
		// Fetching the lastfm data to be recollected.
		const data = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTracks(process.env.USER!);

		const song = data.recenttracks.track.find(x => x['@attr']?.nowplaying == 'true');

		console.log(
			song === undefined
				? '🎶 | No hay ninguna canción escuchandose en este momento...'
				: `🎧| Canción escuchandose - ${song.name} de ${song.artist['#text']}`,
		);

		// Get the actual song datos.data.

		return {song, data};
	}

	async getLastSongListened() {
		console.log(`🎶| Buscando ultima canción escuchada...`);
		const data = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTracks(process.env.USER!);

		console.log(
			data === undefined
				? ''
				: `🎧| Ultima canción escuchada - ${data.recenttracks.track[0].name} de ${data.recenttracks.track[0].artist['#text']}`,
		);

		// Get the last song
		return {song: data.recenttracks.track[0], data};
	}

	async getCompleteSongInformation() {
		console.log('🎶| Buscando canción reproduciendose...');
		try {
			const info = await this.getListeningSong();
			let track;
			if (info.song !== undefined)
				track = await new LastFmApi({
					apiKey: process.env.API_KEY!,
					apiSecret: process.env.API_SECRET!,
				}).getTrackInfo(
					info.song?.artist?.['#text'] ?? 'dont_found',
					info.song?.name ?? 'dont_found',
				);

			console.log(
				info.song === undefined
					? '⚠️| No se ha encontrado música reproduciendose.'
					: `🎶| Reproduciendo ahora ${info.song.name} de ${info.song.artist['#text']} ${
							track?.track.duration === '0'
								? ''
								: `[${toSongFormat(Number(track?.track.duration))}]`
					  }`,
			);

			return {track, ...info};
		} catch (e) {
			console.log('🌋| Error encontrado tratando de encontrar la música, intentando de nuevo..');
		}
	}

	async setPresence(
		client: createClient.RP,
		data:
			| {song: Track | undefined; data: Record<'recenttracks', Final>}
			| {
					song: Track | undefined;
					data: Record<'recenttracks', Final>;
					track: Record<'track', TrackInformation>;
			  },
		context: 'actual' | 'past' = 'actual',
	) {
		if (context == 'actual') {
			const datos = data as {
				song: Track | undefined;
				data: Record<'recenttracks', Final>;
				track?: Record<'track', TrackInformation>;
			};
			const end =
				datos.track?.track?.duration === '0'
					? undefined
					: Date.now() + Number(datos.track?.track.duration);
			console.log(`🍰 | Se ha modificado la rich presence a la canción actualmente escuchada.`);
			return client.updatePresence({
				details: `🎧 Escuchando: ${data.song?.name ?? 'No encontrado'}`,
				state: `👩🏿‍🎨 De: ${data.song?.artist['#text'] ?? 'No encontrado'}`,
				largeImageKey: 'lastfm',
				startTimestamp: Date.now(),
				endTimestamp: end,
			});
		} else {
			const datos = data as {song: Track | undefined; data: Record<'recenttracks', Final>};
			console.log(`🍰 | Se ha modificado la rich presence a la ultima canción.`);
			return client.updatePresence({
				details: `🎧 Última canción escuchada: ${datos.song?.name}`,
				state: `🍰 De: ${data.song?.artist['#text']}`,
				largeImageKey: 'lastfm',
				startTimestamp: Number(datos.song?.date?.uts),
			});
		}
	}

	async mainProcess(client: createClient.RP, cache: NodeCache) {
		let song, datos, type;
		if (!cache.get(`actual_song`)) {
			const data = await this.getCompleteSongInformation();
			if (!data?.song) {
				const data = await this.getLastSongListened();
				if (!data.song) throw Error(`No se ha encontrado ninguna canción escuchada en tu perfil`);
				await this.setPresence(client, data, 'past');
				song = data.song;
				datos = data.data;
				type = 'pasada';
				cache.set(`actual_song`, song);
				return {song, datos, type};
			}

			await this.setPresence(client, data!);
			song = data?.song;
			datos = data?.data;
			type = 'actual';
			cache.set(`actual_song`, song);
			return {song, datos, type};
		} else {
			const cond =
				(await (await this.getListeningSong()).song) ??
				(await (
					await this.getLastSongListened()
				).song);
			if (JSON.stringify(cond) === JSON.stringify(cache.get(`actual_song`))) return;
			const data = await this.getCompleteSongInformation();
			if (!data?.song) {
				const data = await this.getLastSongListened();
				if (!data.song) throw Error(`No se ha encontrado ninguna canción escuchada en tu perfil`);
				await this.setPresence(client, data, 'past');
				song = data.song;
				datos = data.data;
				type = 'pasada';
				cache.set(`actual_song`, song);
				return {song, datos, type};
			}

			await this.setPresence(client, data!);
			song = data?.song;
			datos = data?.data;
			type = 'actual';
			cache.set(`actual_song`, song);
			return {song, datos, type};
		}
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
