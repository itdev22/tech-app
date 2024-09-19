import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'prisma/generate';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from '../auth/dto/request-auth.dto';


const prisma = new PrismaClient();

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async checkUser(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    return user;
  }

  async createUser(user: RegisterAuthDto): Promise<User> {

    const password = await bcrypt.hash(user.password, 10);

    const userCreated = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: password,
      },
    });

    return userCreated;
  }
}
