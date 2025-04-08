import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new this.userModel({ username, email, password: hashedPassword });
    return user.save();
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password incorrect');
    }

    return this.generateUserTokens(user.id);
  }

  async generateUserTokens(userId: string) {
    const acessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    return {
      acessToken,
    };
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }
}
