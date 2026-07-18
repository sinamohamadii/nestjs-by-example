import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from './user-registered.event';

@Injectable()
export class WelcomeEmailListener {
  private readonly logger = new Logger('WelcomeEmailListener');

  // This method runs whenever a "user.registered" event is emitted.
  // In a real app it would send an email; here it just logs.
  @OnEvent('user.registered')
  handleUserRegistered(event: UserRegisteredEvent) {
    this.logger.log(`Sending welcome email to ${event.email} (user #${event.userId})`);
  }
}
