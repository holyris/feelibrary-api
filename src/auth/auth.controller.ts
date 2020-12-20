import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { create } from 'domain';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Body() loginUserDto:LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto);
  }
}
