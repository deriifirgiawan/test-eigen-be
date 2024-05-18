import 'dotenv/config';
import { env } from 'process';

export abstract class AppConfig {
  static DB_NAME = env.DB_NAME;
  static DB_USERNAME = env.DB_USERNAME;
  static DB_PASSWORD = env.DB_PASSWORD;
  static DB_PORT = env.DB_PORT;
  static DB_HOST = env.DB_HOST;
}
