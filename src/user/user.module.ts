import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [PrismaModule, SupabaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
