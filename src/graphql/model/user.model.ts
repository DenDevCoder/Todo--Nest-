import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from './task.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => [Task])
  tasks: Task[];
}
