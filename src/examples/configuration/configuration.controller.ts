import { Controller, Get } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';

@Controller()
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('config')
  getConfig() {
    const app = this.configService.get<ConfigType<typeof appConfig>>('app');
    const mail = this.configService.get<ConfigType<typeof mailConfig>>('mail');

    return {
      appName: app?.appName,
      sender: mail?.sender,
      retryCount: mail?.retryCount,
      nodeEnv: app?.nodeEnv,
    };
  }
}
