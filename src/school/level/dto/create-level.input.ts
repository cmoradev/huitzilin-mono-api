import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateLevel')
export class CreateLevelInput {
  @MaxLength(8)
  @Field(() => String, { nullable: false })
  abbreviation: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
