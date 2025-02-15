import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsString, IsInt, IsEnum, isString } from 'class-validator';

export class createTaskDto {
  @ApiProperty({ example: 'buy milk', description: 'task text' })
  @IsString()
  text: string;
}

export class UpdateStatusDto {
  @ApiProperty({ example: 'COMPLETED', description: 'task status' })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    example: '903db3d1-a151-4e90-9d00-4fb65e231a8b',
    description: 'task id',
  })
  @IsString()
  task_id: string;
}
