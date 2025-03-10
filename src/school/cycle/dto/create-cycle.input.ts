import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateCycle')
export class CreateCycleInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Date, { nullable: false })
  start: Date;

  @Field(() => Date, { nullable: false })
  end: Date;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
