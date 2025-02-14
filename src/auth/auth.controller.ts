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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
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

  @Post('signout')
  async signOut() {
    const { error } = await this.supabase.getAuthClient().signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

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
