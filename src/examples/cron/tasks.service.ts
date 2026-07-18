import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TasksService');

  // A simple counter we increase on every run, so the work is observable.
  private heartbeats = 0;

  // @Interval runs on a fixed millisecond interval — here every 5 seconds.
  // Good for simple "every N seconds/minutes" jobs.
  @Interval(5000)
  handleHeartbeat() {
    this.heartbeats++;
    this.logger.log(`Heartbeat #${this.heartbeats}`);
  }

  // @Cron runs on a cron schedule — here every 10 seconds.
  // Use this for calendar-based schedules like "every day at midnight".
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCleanup() {
    this.logger.log('Running the every-10-seconds cleanup job');
  }

  getHeartbeatCount() {
    return this.heartbeats;
  }
}
