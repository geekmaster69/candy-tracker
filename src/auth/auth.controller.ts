import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, DeleteUserDto, LoginUserDto, RecoveryPasswordDto } from './dto';
import { Auth, GetUser } from './decorator';
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

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Post('delete')
  deleteAccount(@Body() deleteUserDto: DeleteUserDto) {
    return this.authService.deleteAccount(deleteUserDto);
  }

  @Post('recovery')
  recoveryPassword(@Body() recoveryPasswordDto: RecoveryPasswordDto ) {
    return this.authService.recoveryPassword(recoveryPasswordDto);
  }

}
