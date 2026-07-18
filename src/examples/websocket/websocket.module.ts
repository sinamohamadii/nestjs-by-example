import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  // A gateway is a provider — Nest discovers and starts it.
  providers: [ChatGateway],
})
export class WebsocketModule {}
