import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { signInDto, SignUpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'user registration' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'user was registrated' })
  @ApiResponse({ status: 400, description: 'uncorrect data' })
  @UsePipes(new ValidationPipe())
  async signUp(@Body() body: SignUpDto) {
    const { email, name, password } = body;
    const userExist = await this.userService.checkUserExist(email);
    if (userExist) {
      return { message: 'user with this email exist' };
    }
    const { data, error } = await this.supabase
      .getAuthClient()
      .signUp({ email, password });

    if (error) {
      throw new Error(error.message);
    }
    let user: User | null;
    try {
      user = await this.userService.create(
        data.user?.id!,
        email,
        name,
        password,
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
    return { supabaseUser: data.user, localUser: user };
  }

  @Post('signin')
  @ApiOperation({ summary: 'user login' })
  @ApiBody({ type: signInDto })
  @ApiResponse({ status: 200, description: 'successful login' })
  @ApiResponse({ status: 401, description: 'bad input data' })
  @UsePipes(new ValidationPipe())
  async signIn(@Body() body: signInDto) {
    const { email, password } = body;
    const { data, error } = await this.supabase
      .getAuthClient()
      .signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  @ApiOperation({ summary: 'user logout' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'successful logout' })
  @ApiResponse({ status: 500, description: 'server error' })
  @Post('signout')
  async signOut() {
    const { error } = await this.supabase.getAuthClient().signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  @ApiOperation({ summary: 'get user info' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'success' })
  @ApiResponse({ status: 500, description: 'server error' })
  @Get('user')
  async getUser(@Req() req: Request) {
    const {
      data: { user },
      error,
    } = await this.supabase
      .getAuthClient()
      .getUser(req.headers['authorization'].split(' ')[1] || '');
    if (error) {
      throw new Error(error.message);
    }
    return user;
  }
}
