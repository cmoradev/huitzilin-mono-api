import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateClipAccount')
export class CreateClipAccountInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  token: string;
}
