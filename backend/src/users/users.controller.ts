import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './guards/ get-user.decorator';   
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() credentials:LoginDto){
    return this.usersService.login(credentials)
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@GetUser() user){
    return user;
  }
} 
