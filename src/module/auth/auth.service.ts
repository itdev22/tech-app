import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto/request-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient, User } from 'prisma/generate';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUserPassword(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = await this.token(user);

      const result = { user, ...token };
      return result;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async token(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: "secret", expiresIn: '60d' }),
    };
  }

  async authRegister(body: RegisterAuthDto): Promise<User> {
    console.log(body);
    const password = await bcrypt.hash(body.password, 10);

    const checkUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (checkUser) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.usersService.createUser(body)

    return user;
  }
  async authLogin(body: LoginAuthDto): Promise<User> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    console.log(body.email);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

}
