import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'prisma/generate';
import { LoginAuthDto, RegisterAuthDto } from './dto/request-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginAuthDto): Promise<User> {
    return await this.authService.validateUserPassword(body.email, body.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: RegisterAuthDto): Promise<User> {
    return await this.authService.authRegister(body);
  }
}
