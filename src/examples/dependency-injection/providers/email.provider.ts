import { Injectable } from '@nestjs/common';
import { INotification } from '../interfaces/notification.interface';

/**
 * EmailService - Concrete implementation of INotification
 *
 * This service demonstrates:
 * - Implementing an interface
 * - Being injected as a dependency
 * - Singleton pattern
 */
@Injectable()
export class EmailService implements INotification {
  async send(recipient: string, message: string): Promise<void> {
    // Simulate sending an email
    console.log(`📧 Email sent to ${recipient}`);
    console.log(`   Message: ${message}`);
    return Promise.resolve();
  }
}
