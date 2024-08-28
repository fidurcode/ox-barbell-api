import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any) {
    return await this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() registerUser: UserDto, @Res() response: any) {
    await this.authService.register(registerUser);

    return response
      .status(201)
      .send({ username: registerUser.username, email: registerUser.email });
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
