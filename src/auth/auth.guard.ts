import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    const {
      data: { user },
      error,
    } = await this.supabase.getAuthClient().getUser(token);

    if (error || !user) {
      return false;
    }

    request.user = {
      id: user.id,
      email: user.email,
    };
    return true;
  }
}
