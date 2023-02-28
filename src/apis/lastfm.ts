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
	'@attr'?: {nowplaying: 'true' | 'false'};
	album: {'#text': string; mbid: Mbid};
	artist: {'#text': string; mbid: Mbid};
	date?: {uts: string; '#text': string};
	image: Array<{
		'#text': `https://lastfm.freetls.fastly.net/i/u/${string}/${string}`;
		size: ImageSize;
	}>;
	mbid: Mbid;
	name: string;
	streamable: string;
	url: `https://www.last.fm/music/${string}/_/${string}`;
};

export type Final = {
	track: Track[];
	'@attr': Attributes;
};

export type TrackInformation = {
	album: AlbumInformation;
	artist: ArtistInformation;
	duration: string;
	listeners: string;
	mbid: Mbid;
	name: string;
	playcount: string;
	streamable: {'#text': string; fulltrack: string};
	toptags: {tag: TagInformation[]};
	url: `https://www.last.fm/music/${string}/_/${string}`;
	wiki: {content: string; published: string; summary: string};
};

export type AlbumInformation = {
	'@attr': {position: string};
	artist: string;
	image: Array<{
		'#text': `https://lastfm.freetls.fastly.net/i/u/${string}/${string}`;
		size: ImageSize;
	}>;
	mbid: Mbid;
	title: string;
	url: `https://www.last.fm/music/${string}/${string}`;
};

export type ArtistInformation = {
	mbid: Mbid;
	name: string;
	url: `https://www.last.fm/music/${string}`;
};

export type TagInformation = {
	name: string;
	url: `https://www.last.fm/tag/${string}`;
};

export class LastFmApi {
	configuration;
	constructor(configuration: {apiKey: string; apiSecret: string}) {
		this.configuration = configuration;
	}

	async getTracks(user: string, limit = 10) {
		const info = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${this.configuration.apiKey}&format=json&limit=${limit}`,
		);

		const data = (await info.json()) as Record<'recenttracks', Final>;
		if (JSON.stringify(data).includes('error')) {
			throw Error('Ha ocurrido un eror tratando de obtener el usuario');
		}
		return data;
	}

	async getTrackInfo(artist: string, song: string) {
		const info = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${this.configuration.apiKey}&track=${song}&artist=${artist}&format=json`,
		);

		const data = (await info.json()) as Record<'track', TrackInformation>;
		if (JSON.stringify(data).includes('error')) {
			throw Error('Ha ocurrido un error tratando de obtener la canción');
		}

		return data;
	}
}
