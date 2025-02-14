import { TaskStatus } from '@prisma/client';
import { IsString, IsInt, IsEnum, isString } from 'class-validator';
export class createTaskDto {
  @IsString()
  text: string;
}

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  task_id: string;
}
