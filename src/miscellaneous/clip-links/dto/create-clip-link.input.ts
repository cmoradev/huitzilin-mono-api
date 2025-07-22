import { InputType, Field, GraphQLISODateTime, Float } from '@nestjs/graphql';

@InputType('CreateClipLink')
export class CreateClipLinkInput {
  @Field(() => Float, { nullable: false })
  amount: number;

  @Field(() => String, { nullable: false })
  link: string;

  @Field(() => String, { nullable: false })
  qr: string;

  @Field(() => GraphQLISODateTime, { nullable: false })
  expiresAt: Date;

  @Field(() => String, { nullable: false })
  requestId: string;

  @Field(() => String, { nullable: false })
  incomeId: string;

  @Field(() => String, { nullable: false })
  accountId: string;
}
