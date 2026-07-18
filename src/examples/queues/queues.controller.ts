import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { IsEmail } from 'class-validator';

class SendEmailDto {
  @IsEmail()
  email!: string;
}

// All routes here live under /queues
@Controller('queues')
export class QueuesController {
  // Inject the "email" queue so we can add jobs to it.
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  // Instead of sending the email during the request (slow), we add a job and
  // return immediately. A background worker sends it a moment later.
  // Try: POST /queues/email  { "email": "jane@example.com" }
  @Post('email')
  async sendEmail(@Body(new ValidationPipe()) dto: SendEmailDto) {
    const job = await this.emailQueue.add('send', { email: dto.email });
    return { message: 'Email queued.', jobId: job.id };
  }
}
