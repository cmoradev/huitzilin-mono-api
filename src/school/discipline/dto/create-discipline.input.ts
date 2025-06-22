import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { NestedIdInput } from 'src/common/dtos';

@InputType('CreateDiscipline')
export class CreateDisciplineInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Int, { nullable: false })
  minHours: number;

  @Field(() => ID, { nullable: false })
  branchId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  packages?: NestedIdInput[];
}
