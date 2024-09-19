import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  private clients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
    console.log(`Client connected: ${clientId}`);
    socket.on('message', (data) => {
      console.log(`Message from client: ${socket.eventNames()}`);
      socket.emit('message', 'Hello from server');
      socket.emit('message', this.connectedClients.values());
    });
  }

  emitEvent(clientId: string, message: string): void {
    const socket = this.connectedClients.get(clientId);
    console.log(`Emitting message to client: ${clientId}, socket: ${this.connectedClients}`);
    socket.emit('message', message);
  }

  public getActiveClients(): string[] {
    return Array.from(this.connectedClients.keys()); // Return active client IDs
  }

  // Add more methods for handling events, messages, etc.
}
