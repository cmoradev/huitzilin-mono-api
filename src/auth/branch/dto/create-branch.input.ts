import { InputType, Field } from '@nestjs/graphql';

@InputType('CreateBranch')
export class CreateBranchInput {
  @Field(() => String, { nullable: false })
  picture: string;

  @Field(() => String, { nullable: false })
  name: string;
}
