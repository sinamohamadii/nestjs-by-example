import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

// A Processor is a background worker for one queue.
// It picks jobs off the "email" queue and runs process() for each one.
@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger('EmailProcessor');

  // This runs in the background, separately from the HTTP request that added the job.
  async process(job: Job<{ email: string }>) {
    this.logger.log(`Processing job #${job.id} — sending email to ${job.data.email}`);

    // Pretend sending the email takes a couple of seconds.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.logger.log(`Job #${job.id} done — email sent to ${job.data.email}`);
    return { sent: true };
  }
}
