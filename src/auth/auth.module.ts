import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './strategies/local-strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt-strategy';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '3600' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
