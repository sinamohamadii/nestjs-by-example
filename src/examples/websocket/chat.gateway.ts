import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

// A Gateway is the WebSocket equivalent of a Controller.
// cors is enabled so a browser page from any origin can connect for this demo.
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  private readonly logger = new Logger('ChatGateway');

  // The underlying socket.io server — used here to broadcast to everyone.
  @WebSocketServer()
  server!: Server;

  // Runs whenever a new client connects.
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  // Runs when a client emits a "message" event.
  // @MessageBody() gives us the data the client sent.
  @SubscribeMessage('message')
  handleMessage(@MessageBody() text: string) {
    this.logger.log(`Received: ${text}`);

    // Broadcast the message to every connected client under the "message" event.
    this.server.emit('message', text);
  }
}
