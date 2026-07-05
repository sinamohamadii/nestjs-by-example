import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import mailConfig from '../config/mail.config';
import appConfig from '../config/app.config';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('config')
  getConfig() {
    const app = this.configService.get<ConfigType<typeof appConfig>>('app');
    const mail = this.configService.get<ConfigType<typeof mailConfig>>('mail');

    return {
      appName: app?.appName,
      sender: mail?.sender,
      retryCount: mail?.retryCount,
    };
  }

  @Post()
  send(@Body() body: CreateNotificationDto) {
    const mail = this.configService.get<ConfigType<typeof mailConfig>>('mail');
    const from = mail?.sender ?? 'noreply@example.com';
    return this.notificationsService.send({ from, ...body });
  }
}
