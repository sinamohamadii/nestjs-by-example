import { Injectable } from '@nestjs/common';
import { IConfig } from '../interfaces/notification.interface';

/**
 * ConfigService - Configuration provider
 *
 * This service demonstrates:
 * - Providing configuration values
 * - Being injected into other services
 * - useFactory pattern
 */
@Injectable()
export class ConfigService implements IConfig {
  appName = 'NestJS DI Example';
  appVersion = '1.0.0';
}
