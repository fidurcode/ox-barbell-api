import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UserDto } from '../user/dto/user.dto';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user: User = await this.userService.findByUserName(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user.username,
      },
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });

    return {
      email: user.email,
      username: user.username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async register(user: UserDto): Promise<any> {
    const existingUser = await this.userService.findByUserName(user.username);
    if (existingUser !== null) {
      throw new NotFoundException('User already exists');
    }

    return await this.userService.create(user);
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user.username,
      },
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });

    return {
      accessToken: accessToken,
    };
  }
}
