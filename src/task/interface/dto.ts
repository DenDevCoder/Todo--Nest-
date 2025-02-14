import { TaskStatus } from '@prisma/client';
import { IsString, IsInt, IsEnum } from 'class-validator';
export class createTaskDto {
  @IsString()
  text: string;

  @IsInt()
  userId: number;
}

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsInt()
  task_id: number;
}
