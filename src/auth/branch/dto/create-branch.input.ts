import { InputType, Field } from '@nestjs/graphql';
import { IsUrl, MaxLength } from 'class-validator';

@InputType('CreateBranch')
export class CreateBranchInput {
  @IsUrl()
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(16)
  @Field(() => String, { nullable: false })
  name: string;
}
