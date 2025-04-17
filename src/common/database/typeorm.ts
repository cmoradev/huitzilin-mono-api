import { config as dotenvConfig } from 'dotenv';
import * as joi from 'joi';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const validationSchema = joi
  .object({
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_NAME: joi.string().required(),
  })
  .unknown(true);

const dotenv = dotenvConfig({ path: '.env' });

if (dotenv?.error) {
  throw Error('No .env file found');
}

const { value: envs, error } = validationSchema.validate(dotenv.parsed);

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
  ssl: false,
  synchronize: false,
};

export const dataSource = new DataSource(options);
