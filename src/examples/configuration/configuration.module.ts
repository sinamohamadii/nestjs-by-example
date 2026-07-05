import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import { validationSchema } from './config/validation.schema';
import { ConfigController } from './configuration.controller';

@Module({
  imports: [
    NotificationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['src/examples/configuration/env/.env.development'],
      load: [appConfig, mailConfig],
      validationSchema,
    }),
  ],
  exports: [ConfigModule],
  controllers: [ConfigController],
})
export class ConfigurationModule {}
