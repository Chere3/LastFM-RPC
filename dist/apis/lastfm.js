"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastFmApi = void 0;
class LastFmApi {
    configuration;
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getTracks(user, limit = 10) {
        const info = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${process
            .env.API_KEY}&format=json&limit=${limit}`);
        const data = (await info.json());
        if (JSON.stringify(data).includes('error')) {
            throw Error('Ha ocurrido un eror tratando de obtener el usuario');
        }
        return data;
    }
}
exports.LastFmApi = LastFmApi;
//# sourceMappingURL=lastfm.js.map