declare namespace NodeJS {
  export interface ProcessEnv {
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_LOGGING:
      | boolean
      | ((sql: string, timing?: number | undefined) => void)
      | undefined;
  }
}
