import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AuthModule,
  ],

  providers: [AppService],
})
export class AppModule {}
