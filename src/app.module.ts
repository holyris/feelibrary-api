import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'feelibrary',
      password: 'feelibrary',
      database: 'feelibrary',
      entities: [User],
      synchronize: true,
    }),
    AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,{provide: APP_GUARD, useClass: JwtAuthGuard}],
})
export class AppModule { }