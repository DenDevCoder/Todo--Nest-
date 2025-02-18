import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class createUserDto {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}
