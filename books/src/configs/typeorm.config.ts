import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  addTransactionalDataSource,
  deleteDataSourceByName,
} from 'typeorm-transactional';
import { databaseConfig } from './database.config';

export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return typeOrmConfig;
  },
  dataSourceFactory: async (options) => {
    if (!options) {
      throw new Error('Invalid options passed');
    }
    deleteDataSourceByName('default');
    return addTransactionalDataSource(new DataSource(options));
  },
};
