import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';

@InputType('CreateClipLink')
export class CreateClipLinkInput {
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
}
