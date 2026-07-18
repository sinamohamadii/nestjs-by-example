import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from './user-registered.event';

@Injectable()
export class UsersService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  register(email: string) {
    // The core job: "create" the user.
    const user = { id: Date.now(), email };

    // Announce that it happened. This service does NOT know or care
    // who is listening — that keeps registration decoupled from side effects.
    this.eventEmitter.emit('user.registered', new UserRegisteredEvent(user.id, user.email));

    return { message: 'User registered.', user };
  }
}
