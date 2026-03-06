/* eslint-disable no-negated-condition */
import createClient from 'discord-rich-presence';
import NodeCache from 'node-cache';
import {LastFmApi, type Final, type Track, type TrackInformation} from '../apis/lastfm';
import {logError, logInfo, logWarn} from '../utils';

export class LastFmPrincipal {
	id: number | string;
	constructor(id: string) {
		this.id = id;
	}

	async start() {
		const cache = new NodeCache();
		const client = createClient(String(this.id));

		await this.safeMainProcess(client, cache);
		setInterval(() => {
			void this.safeMainProcess(client, cache);
		}, 6000);
	}

	private async safeMainProcess(client: createClient.RP, cache: NodeCache) {
		try {
			await this.mainProcess(client, cache);
		} catch (error) {
			logError('Main process iteration failed. Retrying on next cycle.', error);
		}
	}

	async getListeningSong() {
		logInfo('Fetching currently playing track...');
		// Fetching the lastfm data to be recollected.
		const data = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTracks(process.env.USER!);

		const song = data.recenttracks.track.find(x => x['@attr']?.nowplaying == 'true');

		logInfo(
			song === undefined
				? 'No track is currently playing.'
				: `Now playing: ${song.name} by ${song.artist['#text']}`
		);

		// Get the actual song datos.data.

		return {song, data};
	}

	async getLastSongListened() {
		logInfo('Fetching last listened track...');
		const data = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTracks(process.env.USER!);

		if (data !== undefined) {
			logInfo(`Last listened: ${data.recenttracks.track[0].name} by ${data.recenttracks.track[0].artist['#text']}`);
		}

		// Get the last song
		return {song: data.recenttracks.track[0], data};
	}

	async getCompleteSongInformation() {
		logInfo('Resolving complete song information...');
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

			logInfo(
				info.song === undefined
					? 'No active track found.'
					: `Playing ${info.song.name} by ${info.song.artist['#text']} ${
						track?.track.duration === '0' ? '' : `[${toSongFormat(Number(track?.track.duration))}]`
					}`
			);

			return {track, ...info};
		} catch (error) {
			logWarn('Error while resolving current music. Will retry automatically.');
			logError('Track resolution error details', error);
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
			logInfo('Rich presence updated with now-playing track.');
			return client.updatePresence({
				details: `🎧 Escuchando: ${data.song?.name ?? 'No encontrado'}`,
				state: `👩🏿‍🎨 De: ${data.song?.artist['#text'] ?? 'No encontrado'}`,
				largeImageKey: 'lastfm',
				startTimestamp: Date.now(),
				endTimestamp: end,
			});
		} else {
			const datos = data as {song: Track | undefined; data: Record<'recenttracks', Final>};
			logInfo('Rich presence updated with last listened track.');
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
