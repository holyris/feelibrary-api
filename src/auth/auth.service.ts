import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username, password): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isPasswordMatching = await argon2.verify(user.password, password);
      if (isPasswordMatching) {
        return user;
      }
    }
  }

  async login(user) {
    const payload = { id: user.id, username: user.username}
    return {
      access_token: this.jwtService.sign(payload, {expiresIn: process.env.JWT_EXPIRE}),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
