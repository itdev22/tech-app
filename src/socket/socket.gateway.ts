import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: { sender: string; message: string }): void {
  //   this.server.emit('message', payload); // Broadcast message to all clients
  // }

  emitEvent(event: string, message: any): void {
    this.server.emit(event, message);
  }

  // Implement other Socket.IO event handlers and message handlers
}