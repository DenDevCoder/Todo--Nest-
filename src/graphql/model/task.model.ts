import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  text: string;

  @Field()
  status: string;

  @Field(() => User)
  user: User;
}
