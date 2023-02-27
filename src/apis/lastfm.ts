export type Mbid = `${string}-${string}-${string}-${string}-${string}`;
export type ImageSize = 'small' | 'medium' | 'large' | 'extralarge';
export type Attributes = {
	page: string;
	perPage: string;
	total: string;
	totalPages: string;
	user: string;
};

export type Track = {
	'@attr'?: {nowplaying: boolean};
	album: {'#text': string; mbid: Mbid};
	artist: {'#text': string; mbid: Mbid};
	image: Array<{
		'#text': `https://lastfm.freetls.fastly.net/i/u/${string}/${string}`;
		size: ImageSize;
	}>;
	mbid: Mbid;
	name: string;
	stremeable: string;
	url: `https://www.last.fm/music/${string}/_/${string}`;
};

export type Final = {
	track: Track[];
	'@attr': Attributes;
};

export class LastFmApi {
	configuration;
	constructor(configuration: {apiKey: string; apiSecret: string}) {
		this.configuration = configuration;
	}

	async getTracks(user: string, limit = 10) {
		const info = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${process
				.env.API_KEY!}&format=json&limit=${limit}`,
		);

		const data = (await info.json()) as Record<'recenttracks', Final>;
		if (JSON.stringify(data).includes('error')) {
			throw Error('Ha ocurrido un eror tratando de obtener el usuario');
		}

		return data;
	}
}
