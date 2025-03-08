import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { validationSchema } from '../config';

const dotenv = dotenvConfig({ path: '.env' });

if (!!dotenv.error) {
  throw Error('No .env file found');
}

const {value: envs, error} = validationSchema.validate(dotenv.parsed);

if (error) {
  throw Error(`Config validation error: ${error.message}`);
}

const entitiesDir = join(
  __dirname,
  '..',
  '..',
  '**',
  '**',
  'entities',
  '*.entity{.ts,.js}',
);

const migrationsDir = join(__dirname, 'migrations', '*{.ts,.js}');

const options: DataSourceOptions = {
  type: 'postgres',
  host: `${envs.DB_HOST}`,
  port: parseInt(`${envs.DB_PORT}`),
  username: `${envs.DB_USER}`,
  password: `${envs.DB_PASS}`,
  database: `${envs.DB_NAME}`,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  migrationsTableName: 'migrations',
  synchronize: false,
};

export const dataSource = new DataSource(options);