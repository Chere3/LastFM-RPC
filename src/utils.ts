export function logInfo(message: string) {
  console.log(`ℹ️  ${message}`);
}

export function logWarn(message: string) {
  console.warn(`⚠️  ${message}`);
}

export function logError(message: string, error?: unknown) {
  console.error(`❌ ${message}`);
  if (error) console.error(error);
}

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
