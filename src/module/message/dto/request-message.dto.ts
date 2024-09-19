import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestMessageDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  sendto: string;

  chatroom: string;
}

export class RequestDetailMessageDto {
  @IsNotEmpty()
  chatroomId: string;
}
