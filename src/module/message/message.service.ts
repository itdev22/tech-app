import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, ChatRoom, User, Message } from 'prisma/generate';
import { RequestDetailMessageDto, RequestMessageDto } from './dto/request-message.dto';
import { UserService } from '../user/user.service';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';


const prisma = new PrismaClient();
@Injectable()
export class MessageService {
  constructor(
    private usersService: UserService,
    private readonly socketService: SocketService,
    private readonly socketGateway: SocketGateway
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async viewMessages(user: User): Promise<ChatRoom[]> {
    return await prisma.chatRoom.findMany({
      where: {
        memberIds: {
          has: user.id
        },
      },
    });
  }

  async viewDetailMessages(chatroomId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: {
        chatRoomId: chatroomId
      }
    });
  }

  async sendMessage(user: User, body: RequestMessageDto): Promise<string> {
    try {
      let room: ChatRoom = null;
      await this.usersService.findById(body.sendto);
      if (!body.chatroom) {
        room = await prisma.chatRoom.findFirst({
          where: {
            memberIds: {
              hasEvery: [user.id, body.sendto]
            },
          }
        });

        if (!room) {
          console.log(room);
          room = await prisma.chatRoom.create({
            data: {
              name: `${user.username}`,
              memberIds: [user.id, body.sendto]
            }
          });
        }
      } else {
        room = await prisma.chatRoom.findFirst({
          where: {
            id: body.chatroom
          }
        })
      }

      const message = await prisma.message.create({
        data: {
          content: body.content,
          senderId: user.id,
          chatRoomId: room.id
        }
      })
      this.socketGateway.emitEvent(room.name, message);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return 'Send Message Success!';

  }
}
