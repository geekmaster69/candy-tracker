import 'dotenv/config';

import * as joi from 'joi';

const envsSchema = joi.object({

  DB_URL: joi.string().required(),
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  CLOUD_NAME: joi.string().required(),
  CLOUD_API_KEY: joi.string().required(),
  CLOUD_API_SECRET: joi.string().required(),
  MAILER_SERVICE: joi.string().required(),
  MAILER_EMAIL: joi.string().required(),
  MAILER_SECRET_KEY: joi.string().required(),
  WEB_PAGE: joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  dbUrl: envVars.DB_URL,
  port: envVars.PORT,
  cloudName: envVars.CLOUD_NAME,
  cloudApiKey: envVars.CLOUD_API_KEY,
  cloudApiSecret: envVars.CLOUD_API_SECRET,
  jwtSecret: envVars.JWT_SECRET,
  mailerService: envVars.MAILER_SERVICE,
  mailerEmail: envVars.MAILER_EMAIL,
  mailerSecretKey: envVars.MAILER_SECRET_KEY,
  webPage: envVars.WEB_PAGE,
};
