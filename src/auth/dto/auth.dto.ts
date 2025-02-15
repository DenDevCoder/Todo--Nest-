import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'securepassword123',
    description: 'User password',
  })
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Username' })
  @IsString()
  name: string;
}

export class signInDto {
  @ApiProperty({
    example: 'securepassword123',
    description: 'User password',
  })
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email',
  })
  @IsEmail()
  email: string;
}
