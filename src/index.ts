import {config} from 'dotenv';
import {LastFmPrincipal} from './rpc/start';
const {emitWarning} = process;

config();

process.emitWarning = (warning, ...args) => {
	if (args[0] === 'ExperimentalWarning') {
		return;
	}
	if (args[0] && typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning') {
		return;
	}
	return emitWarning(warning, ...(args as any));
};

new LastFmPrincipal(process.env.CLIENT_ID!).start().catch(() => ({}));
