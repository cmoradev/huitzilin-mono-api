import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength, Min } from 'class-validator';

@InputType('CreateLevel')
export class CreateLevelInput {
  @MaxLength(8)
  @Field(() => String, { nullable: false })
  abbreviation: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Min(0)
  @Field(() => Number, { nullable: false })
  order: number;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
