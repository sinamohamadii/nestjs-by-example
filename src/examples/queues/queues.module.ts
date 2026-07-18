import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueuesController } from './queues.controller';
import { EmailProcessor } from './email.processor';

// NOTE: This chapter needs a running Redis server (queues are stored in Redis).
// The easiest way is Docker:  docker run -d -p 6379:6379 redis
@Module({
  imports: [
    // Connect BullMQ to Redis (used by every queue in the app).
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
        // If Redis isn't running, retry quietly every 10s instead of spamming
        // the console. It reconnects automatically once Redis is available.
        retryStrategy: () => 10_000,
      },
    }),
    // Register the "email" queue so it can be injected.
    BullModule.registerQueue({ name: 'email' }),
  ],
  controllers: [QueuesController],
  // The processor is a provider so Nest starts the background worker.
  providers: [EmailProcessor],
})
export class QueuesModule {}
