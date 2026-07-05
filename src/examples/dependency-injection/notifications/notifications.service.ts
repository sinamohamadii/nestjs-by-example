import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../providers/config.provider';
import { LoggerService } from '../providers/logger.provider';
import { SmsService } from '../providers/sms.provider';
import { EmailService } from '../providers/email.provider';
import { CounterService } from '../providers/counter.provider';
import {
  EMAIL_PROVIDER,
  SMS_PROVIDER,
  LOGGER_PROVIDER,
  CONFIG_PROVIDER,
} from '../providers/tokens';

@Injectable()
export class NotificationsService {
  private emailProvider: EmailService;
  private smsProvider: SmsService;
  private logger: LoggerService;
  private config: ConfigService;
  private emailPrefix?: string;

  constructor(
    // Email provider injected using custom token (useClass pattern)
    @Inject(EMAIL_PROVIDER)
    emailProvider: EmailService,

    // SMS provider injected using custom token (useClass pattern)
    @Inject(SMS_PROVIDER)
    smsProvider: SmsService,

    // Logger injected using custom token (useValue pattern)
    @Inject(LOGGER_PROVIDER)
    logger: LoggerService,

    // Configuration injected using custom token (useFactory pattern)
    @Inject(CONFIG_PROVIDER)
    config: ConfigService,

    private readonly counter: CounterService,
  ) {
    this.emailProvider = emailProvider;
    this.smsProvider = smsProvider;
    this.logger = logger;
    this.config = config;

    this.logger.log(
      `NotificationsService initialized with app: ${this.config.appName}`,
    );
  }

  /**
   * Send email notification
   * Demonstrates dependency usage
   */
  async sendEmail(email: string, message: string): Promise<void> {
    this.logger.log(
      `[${this.counter.getInstanceId()}] Sending email to ${email}`,
    );
    const messageWithPrefix = this.emailPrefix
      ? `[${this.emailPrefix}] ${message}`
      : message;
    await this.emailProvider.send(email, messageWithPrefix);
    this.logger.log(`Email sent successfully`);
  }

  /**
   * Send SMS notification
   * Demonstrates dependency usage
   */
  async sendSms(phone: string, message: string): Promise<void> {
    this.logger.log(
      `[${this.counter.getInstanceId()}] Sending SMS to ${phone}`,
    );
    await this.smsProvider.send(phone, message);
    this.logger.log(`SMS sent successfully`);
  }

  /**
   * Send both email and SMS
   * Demonstrates using multiple providers
   */
  async sendBoth(email: string, phone: string, message: string): Promise<void> {
    this.logger.log(
      `[${this.counter.getInstanceId()}] Sending notification via multiple channels`,
    );
    await Promise.all([
      this.emailProvider.send(email, message),
      this.smsProvider.send(phone, message),
    ]);
    this.logger.log(`Multi-channel notification sent`);
  }
}
