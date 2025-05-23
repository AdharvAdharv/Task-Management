import { Body, Controller, Post , Res, HttpCode} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './guards/ get-user.decorator';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  
  @Post('login')
  @HttpCode(200) // Optional: sets response status to 200
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.usersService.login(loginDto);
    
    // Set cookie
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours

    });

    return { message: 'Login is successful',
      token: accessToken,
     };
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@GetUser() user){
    return user;
  }

  @Post('logout')
@HttpCode(200)
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('jwt');
  return { message: 'Logout successful' };
}
} 
