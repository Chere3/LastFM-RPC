import {config} from 'dotenv';
import {loadConfig} from './config';
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

async function bootstrap() {
	const appConfig = loadConfig();
	await new LastFmPrincipal(appConfig).start();
}

bootstrap().catch(error => {
	console.error('❌ Unable to start LastFM-RPC:', error);
	process.exit(1);
});
