import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from 'prisma/generate';
import { UpdateProfileDto } from './dto/request-profile.dto';
import { RegisterAuthDto } from '../auth/dto/request-auth.dto';


@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(AuthGuard)
  @Get('getProfile')
  getProfile(@Request() req): Promise<User> {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Post('createProfile')
  createProfile(@Body() body: RegisterAuthDto): Promise<User> {
    return this.profileService.createProfile(body);
  }

  @UseGuards(AuthGuard)
  @Put('updateProfile')
  updateProfile(@Body() body: UpdateProfileDto, @Request() req): Promise<User> {
    return this.profileService.updateProfile(body, req.user);
  }
}
