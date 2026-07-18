import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

// All routes here live under /cron
@Controller('cron')
export class CronController {
  constructor(private readonly tasksService: TasksService) {}

  // The scheduled tasks run on their own in the background.
  // This route just lets you observe how many heartbeats have happened.
  // Try: GET /cron/status  (call it again after a few seconds and watch it grow)
  @Get('status')
  status() {
    return { heartbeats: this.tasksService.getHeartbeatCount() };
  }
}
