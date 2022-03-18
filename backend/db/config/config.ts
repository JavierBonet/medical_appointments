export interface Env {
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_LOGGING: boolean;
}

function getEnvProperties(): Env {
  const envProperties = {
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT),
    // Cast it to boolean value
    DB_LOGGING: !!process.env.DB_LOGGING,
  };

  return envProperties;
}

export { getEnvProperties };
