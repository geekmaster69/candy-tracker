import 'dotenv/config';

import * as joi from 'joi';

const envsSchema = joi.object({

  DB_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  CLOUD_NAME: joi.string().required(),
  CLOUD_API_KEY: joi.string().required(),
  CLOUD_API_SECRET: joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  dbUrl: envVars.DB_URL,
  cloudName: envVars.CLOUD_NAME,
  cloudApiKey: envVars.CLOUD_API_KEY,
  cloudApiSecret: envVars.CLOUD_API_SECRET,
  jwtSecret: envVars.JWT_SECRET
};
