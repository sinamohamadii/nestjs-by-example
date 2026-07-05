import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  APP_NAME: Joi.string().default('NestJS by Example'),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  MAIL_SENDER: Joi.string().email().required(),

  MAIL_RETRY_COUNT: Joi.number().integer().min(0).default(3),
});
