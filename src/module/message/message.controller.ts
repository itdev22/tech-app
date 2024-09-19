import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { RequestMessageDto } from './dto/request-message.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ChatRoom, Message } from 'prisma/generate';

@Controller()
export class MessageController {
  constructor(private readonly MessageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Get('viewMessages')
  viewMessages(@Request() req): Promise<ChatRoom[]> {
    return this.MessageService.viewMessages(req.user);
  }

  @UseGuards(AuthGuard)
  @Get('viewMessages/:id')
  viewDetailMessages(@Param() param:string): Promise<Message[]> {
    return this.MessageService.viewDetailMessages(param['id']);
  }

  @UseGuards(AuthGuard)
  @Post('sendMessage')
  sendMessage(@Body() body: RequestMessageDto, @Request() req): Promise<string> {
    return this.MessageService.sendMessage(req.user, body);
  }
}
