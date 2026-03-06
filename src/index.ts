import {config} from 'dotenv';
import {LastFmPrincipal} from './rpc/start';
import {logError, logInfo, requireEnv} from './utils';

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

try {
	const clientId = requireEnv('CLIENT_ID');
	requireEnv('API_KEY');
	requireEnv('API_SECRET');
	requireEnv('USER');
	logInfo('Environment validation passed. Starting LastFM RPC...');
	new LastFmPrincipal(clientId).start().catch(error => {
		logError('Fatal error while starting LastFM RPC', error);
		process.exitCode = 1;
	});
} catch (error) {
	logError('Configuration error during startup', error);
	process.exitCode = 1;
}
