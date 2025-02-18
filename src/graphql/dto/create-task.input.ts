import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createTaskDto {
  @Field()
  text: string;
}
