import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronController } from './cron.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    // forRoot() starts the scheduler that runs your @Cron and @Interval methods.
    ScheduleModule.forRoot(),
  ],
  controllers: [CronController],
  providers: [TasksService],
})
export class CronModule {}
