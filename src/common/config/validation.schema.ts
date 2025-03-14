import * as joi from 'joi';

export const validationSchema = joi
  .object({
    SECRET_KEY: joi.string().required(),
    // Database
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_NAME: joi.string().required(),
  })
  .unknown(true);
