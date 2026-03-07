const requiredEnv = ['API_KEY', 'API_SECRET', 'USER', 'CLIENT_ID'] as const;

type RequiredKey = (typeof requiredEnv)[number];

export type AppConfig = {
  apiKey: string;
  apiSecret: string;
  user: string;
  clientId: string;
  pollIntervalMs: number;
};

function getEnv(name: RequiredKey): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function loadConfig(): AppConfig {
  const pollIntervalMs = Number(process.env.POLL_INTERVAL_MS ?? '6000');
  if (Number.isNaN(pollIntervalMs) || pollIntervalMs < 3000) {
    throw new Error('POLL_INTERVAL_MS must be a number >= 3000');
  }

  return {
    apiKey: getEnv('API_KEY'),
    apiSecret: getEnv('API_SECRET'),
    user: getEnv('USER'),
    clientId: getEnv('CLIENT_ID'),
    pollIntervalMs,
  };
}
