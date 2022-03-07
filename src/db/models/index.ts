import { Dialect, Sequelize } from 'sequelize/types';

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

let sequelize: Sequelize;
if (config.use_env_variables) {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: process.env.DB_LOGGING,
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
