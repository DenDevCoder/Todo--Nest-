import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}

export class signInDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
