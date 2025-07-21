import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateClipAccount')
export class CreateClipAccountInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => String, { nullable: false })
  webhook: string;

  @Field(() => String, { nullable: false })
  default: string;

  @Field(() => String, { nullable: false })
  success: string;

  @Field(() => String, { nullable: false })
  error: string;
}
