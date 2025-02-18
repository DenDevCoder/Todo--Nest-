import { Field, InputType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@InputType()
export class UpdateStatusDto {
  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field()
  task_id: string;
}
