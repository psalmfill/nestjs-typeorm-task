import * as dotenv from 'dotenv';
import { Room } from '../entities/room.entity';
dotenv.config();
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  dropSchema: false,
  logging: false,
  logger: 'file',
  entities: [Room],
  migrations: ['../migrations/**/*.ts'],
  subscribers: ['../subscriber/**/*.ts'],
  migrationsTableName: 'migration_table',
});
