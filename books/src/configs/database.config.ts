import { AppConfig } from './app.config';
import { DataSourceOptions } from 'typeorm';

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = AppConfig;
export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['./dist/entities/**/*.entity.js'],
  migrations: ['./src/database/migrations'],
  synchronize: true,
};
