import { Dialect, Sequelize } from 'sequelize';
import { getEnvProperties } from '../config/config';

interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  use_env_variables?: boolean;
}

const env = process.env.NODE_ENV || 'development';
const config: Config = require(__dirname + '/../config/config.json')[env];

console.log(config);

let sequelize: Sequelize;
if (config.use_env_variables) {
  const envProperties = getEnvProperties();
  sequelize = new Sequelize(
    envProperties.DB_NAME,
    envProperties.DB_USERNAME,
    envProperties.DB_PASSWORD,
    {
      host: envProperties.DB_HOST,
      port: envProperties.DB_PORT,
      dialect: 'mysql',
      logging: envProperties.DB_LOGGING,
    }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export { sequelize, Sequelize };
