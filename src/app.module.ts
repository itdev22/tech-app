import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './module/message/message.module';
import { ProfileModule } from './module/profile/profile.module';
import { UserModule } from './module/user/user.module';
import { SocketService } from './socket/socket.service';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    AppModule,
    AuthModule,
    ProfileModule,
    MessageModule,
    UserModule,
    RouterModule.register([
      {
        path: '/api',
        module: AppModule,
        children: [
          {
            path: '/',
            module: AuthModule,
          },
          {
            path: '/',
            module: ProfileModule,
          },
          {
            path: '/',
            module: MessageModule,
          },
        ],
      },
    ]
  ),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}
