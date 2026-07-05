import { Injectable } from '@nestjs/common';
import { INotification } from '../interfaces/notification.interface';

/**
 * SmsService - Another concrete implementation of INotification
 *
 * This service demonstrates:
 * - Multiple implementations of the same interface
 * - Being used interchangeably with other providers
 */
@Injectable()
export class SmsService implements INotification {
  async send(recipient: string, message: string): Promise<void> {
    // Simulate sending an SMS
    console.log(`📱 SMS sent to ${recipient}`);
    console.log(`   Message: ${message}`);
    return Promise.resolve();
  }
}
