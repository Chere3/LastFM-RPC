import {config} from 'dotenv';
import {LastFmPrincipal} from './rpc/start';
const {emitWarning} = process;

config();

const requiredEnv = ['API_KEY', 'API_SECRET', 'USER', 'CLIENT_ID'] as const;
const missing = requiredEnv.filter(key => !process.env[key]);
if (missing.length > 0) {
	throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

process.emitWarning = (warning, ...args) => {
	if (args[0] === 'ExperimentalWarning') {
		return;
	}
	if (args[0] && typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning') {
		return;
	}
	return emitWarning(warning, ...(args as any));
};

new LastFmPrincipal(process.env.CLIENT_ID!).start().catch(error => {
	console.error('Failed to start LastFM-RPC:', error);
	process.exitCode = 1;
});
