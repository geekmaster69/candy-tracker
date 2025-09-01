import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }


  @Post('login')
  loginUser(@Body() loginUser: LoginUserDto) {
    return this.authService.loginUser(loginUser);
  }

  //   @Get('check-status')
  // @Auth()
  // checkAuthStatus(@GetUser() user: User) {
  //   return this.authService.checkAuthStatus(user);
  // }

}
