import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async profile(@Param('id') id: string): Promise<User> {
    return this.userService.get(parseInt(id));
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async editProfile(
    @Param('id') id: string,
    @Body() updateUser: User,
  ): Promise<User> {
    return this.userService.edit(parseInt(id), updateUser);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(parseInt(id));
  }

  @UseGuards(JwtGuard)
  @Get()
  async all(): Promise<User[]> {
    return this.userService.getAll();
  }
}
