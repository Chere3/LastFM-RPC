import createClient from 'discord-rich-presence';
import {LastFmApi} from '../apis/lastfm';

export class LastFmPrincipal {
	id: number | string;
	constructor(id: string) {
		this.id = id;
	}

	async start() {
		const data = await new LastFmApi({
			apiKey: process.env.API_KEY!,
			apiSecret: process.env.API_SECRET!,
		}).getTracks('chere3');

		const client = createClient(String(this.id));

		client.on('connected', () => {
			console.log('🐕 | Se ha iniciado sesión en la rich presence');
			client.updatePresence({
				details: data.recenttracks.track[0].name,
				state: data.recenttracks.track[0].artist['#text'],
			});
		});
	}
}
