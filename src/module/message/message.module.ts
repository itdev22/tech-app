import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService, UserService, SocketService, SocketGateway],
})
export class MessageModule { }
