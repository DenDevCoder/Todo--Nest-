import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SupabaseModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
