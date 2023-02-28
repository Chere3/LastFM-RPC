"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastFmPrincipal = void 0;
const discord_rich_presence_1 = __importDefault(require("discord-rich-presence"));
const lastfm_1 = require("../apis/lastfm");
class LastFmPrincipal {
    id;
    constructor(id) {
        this.id = id;
    }
    async start() {
        const data = await new lastfm_1.LastFmApi({
            apiKey: process.env.API_KEY,
            apiSecret: process.env.API_SECRET,
        }).getTracks('chere3');
        const client = (0, discord_rich_presence_1.default)(String(this.id));
        client.on('connected', () => {
            console.log('🐕 | Se ha iniciado sesión en la rich presence');
            client.updatePresence({
                details: data.recenttracks.track[0].name,
                state: data.recenttracks.track[0].artist['#text'],
            });
        });
    }
}
exports.LastFmPrincipal = LastFmPrincipal;
//# sourceMappingURL=start.js.map