import {config} from 'dotenv';
import {LastFmPrincipal} from './rpc/start';

config();

new LastFmPrincipal(process.env.CLIENT_ID!).start().catch(() => ({}));
