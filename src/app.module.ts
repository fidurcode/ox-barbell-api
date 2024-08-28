import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from 'orm-config';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(config)],
})
export class AppModule {}
