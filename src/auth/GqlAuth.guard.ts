import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class GqlAuthGuard {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token not founded');
    }

    const {
      data: { user },
      error,
    } = await this.supabase.getAuthClient().getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('bad token');
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    return true;
  }
}
