import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsController } from './events.controller';
import { UsersService } from './users.service';
import { WelcomeEmailListener } from './welcome-email.listener';

@Module({
  imports: [
    // forRoot() sets up the event emitter for the whole application.
    EventEmitterModule.forRoot(),
  ],
  controllers: [EventsController],
  // The listener must be a provider so Nest can discover its @OnEvent handlers.
  providers: [UsersService, WelcomeEmailListener],
})
export class EventsModule {}
