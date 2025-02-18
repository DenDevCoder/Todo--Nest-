import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [TaskController],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
