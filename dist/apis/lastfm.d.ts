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
    '@attr'?: {
        nowplaying: boolean;
    };
    album: {
        '#text': string;
        mbid: Mbid;
    };
    artist: {
        '#text': string;
        mbid: Mbid;
    };
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
export declare class LastFmApi {
    configuration: {
        apiKey: string;
        apiSecret: string;
    };
    constructor(configuration: {
        apiKey: string;
        apiSecret: string;
    });
    getTracks(user: string, limit?: number): Promise<Record<"recenttracks", Final>>;
}
