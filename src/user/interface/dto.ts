import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class createUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
