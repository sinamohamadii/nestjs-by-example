import { Injectable } from '@nestjs/common';

// CounterService
@Injectable()
export class CounterService {
  private count = 0;
  private instanceId = Math.random().toString(36).substring(7);

  increment(): number {
    return ++this.count;
  }

  getCount(): number {
    return this.count;
  }

  getInstanceId(): string {
    return this.instanceId;
  }
}
