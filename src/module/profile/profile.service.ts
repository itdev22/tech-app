import { Injectable } from '@nestjs/common';
import { PrismaClient,User } from 'prisma/generate';
import { UpdateProfileDto } from './dto/request-profile.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from '../auth/dto/request-auth.dto';


const prisma = new PrismaClient();

@Injectable()
export class ProfileService {
  constructor(
    private usersService: UserService,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }
  async createProfile(user: RegisterAuthDto): Promise<User> {
    await this.usersService.checkUser(user.email);
    const userCreated = await this.usersService.createUser(user);

    return userCreated;
  }
  async getProfile(user: User): Promise<User> {
    const result = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });


    return result;
  }
  async updateProfile(body: UpdateProfileDto,user: User): Promise<User> {
    if(body.email != user.email){
      await this.usersService.checkUser(body.email);
    }

    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...body,
        password: await bcrypt.hash(body.password, 10),
      },
    });
    return result;
  }
}
