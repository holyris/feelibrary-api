import { Controller, Post, UseGuards, Body, UseInterceptors, ClassSerializerInterceptor, Request, ConflictException } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto);
  }
}
