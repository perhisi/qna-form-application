import { CreateUserDto } from '../users/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto.email, loginDto.password);
  }

  // @Post('/login')
  // loginUser(@Body() data: { email: string; password: string }) {
  //   return this.authService.userLogin(data.email, data.password);
  // }
}
