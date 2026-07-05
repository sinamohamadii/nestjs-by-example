import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { EmailService } from '../providers/email.provider';
import { SmsService } from '../providers/sms.provider';
import { LoggerService } from '../providers/logger.provider';
import { ConfigService } from '../providers/config.provider';

import {
  EMAIL_PROVIDER,
  SMS_PROVIDER,
  LOGGER_PROVIDER,
  CONFIG_PROVIDER,
  AUDIT_LOGGER,
} from '../providers/tokens';
import { CounterService } from '../providers/counter.provider';

/**
 * NotificationsModule - Demonstrates module-level dependency injection configuration
 *
 * This module shows all major DI patterns:
 * 1. useClass pattern - Register a service class as a provider
 * 2. useValue pattern - Register a string value as a provider
 * 3. useFactory pattern - Register a factory function as a provider
 * 4. useExisting pattern - Create aliases for existing providers
 * There are more ways to provide dependencies in NestJS, later on in advanced examples, we will explore: provider scopes, circular dependencies, and lifecycle hooks.

 *
 * Key DI Concepts:
 * - Every provider in NestJS is a Singleton by default
 * - Dependencies must be registered in a module before use
 * - Providers can be injected using custom injection tokens
 * - Exported providers can be imported into other modules
 */

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,

    // useClass pattern: Register concrete implementation using a token
    {
      provide: EMAIL_PROVIDER,
      useClass: EmailService,
    },

    // useClass pattern: Register concrete implementation using a token
    {
      provide: SMS_PROVIDER,
      useClass: SmsService,
    },

    // useValue pattern: Register a concrete service instance
    {
      provide: LOGGER_PROVIDER,
      useValue: new LoggerService(),
    },

    // useFactory pattern: Register a factory function
    {
      provide: CONFIG_PROVIDER,
      useFactory: () => new ConfigService(),
    },

    // useValue pattern: Register a simple string value
    {
      provide: 'CUSTOM_EMAIL_PREFIX',
      useValue: 'NOTIFICATION',
    },

    // Pattern 4: useExisting - Create an alias (multiple tokens point to same instance)
    {
      provide: AUDIT_LOGGER,
      useExisting: LOGGER_PROVIDER,
    },

    // Singleton pattern: Normal register without custom token (for direct class injection)
    EmailService,
    SmsService,
    LoggerService,
    ConfigService,
    CounterService,
  ],
  exports: [
    NotificationsService,
    EmailService,
    SmsService,
    LoggerService,
    ConfigService,
    CounterService,
  ],
})
export class NotificationsModule {}
