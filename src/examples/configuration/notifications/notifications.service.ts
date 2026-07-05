import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  send(payload: { from: string; to: string; message: string }) {
    return {
      status: 'ok',
      from: payload.from,
      to: payload.to,
      message: payload.message,
    };
  }
}
