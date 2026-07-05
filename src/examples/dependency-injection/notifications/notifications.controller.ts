import { Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendEmailDto, SendSmsDto, SendBothDto } from './dto';
import { Body, HttpCode } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email')
  @HttpCode(200)
  async sendEmail(@Body() dto: SendEmailDto): Promise<{ success: boolean }> {
    await this.notificationsService.sendEmail(dto.email, dto.message);
    return { success: true };
  }

  @Post('sms')
  @HttpCode(200)
  async sendSms(@Body() dto: SendSmsDto): Promise<{ success: boolean }> {
    await this.notificationsService.sendSms(dto.phone, dto.message);
    return { success: true };
  }

  @Post('both')
  @HttpCode(200)
  async sendBoth(@Body() dto: SendBothDto): Promise<{ success: boolean }> {
    await this.notificationsService.sendBoth(dto.email, dto.phone, dto.message);
    return { success: true };
  }
}
