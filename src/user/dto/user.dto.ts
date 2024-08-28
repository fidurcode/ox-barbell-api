import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const passwordRegEx =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,10}$/;

export class UserDto {
  @ApiProperty({
    description: 'FirstName of user',
    type: String,
  })
  @IsString()
  @MinLength(2, { message: 'Firstname must have at least 2 characters.' })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: 'LastName of user',
    type: String,
  })
  @IsString()
  @MinLength(2, { message: 'Lastname must have at least 2 characters.' })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'UserName of user',
    type: String,
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  username: string;

  @ApiProperty({
    description: 'Email of user',
    type: String,
  })
  @IsNotEmpty({ message: 'Email field cannot be empty.' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @ApiProperty({
    description: 'Gender of user',
    type: String,
  })
  @IsString()
  @IsEnum(['f', 'm'])
  gender: string;

  @ApiProperty({
    description: 'Role of user',
    type: String,
  })
  @IsString()
  @IsEnum(['t', 's'])
  role: string;

  @ApiProperty({
    description: 'Password of user',
    type: String,
  })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 4 and maximum 10 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
}
