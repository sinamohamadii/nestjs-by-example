import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  appName: process.env.APP_NAME || 'NestJS by Example',
  nodeEnv: process.env.NODE_ENV || 'development',
}));
