import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { NestedIdInput } from 'src/common/dtos';

@InputType('CreateSchedule')
export class CreateScheduleInput {
  @Field(() => Int, { nullable: false })
  day: number;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;

  @Field(() => ID, { nullable: false })
  branchId: string;

  @Field(() => ID, { nullable: false })
  periodId: string;

  @Field(() => ID, { nullable: false })
  disciplineId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  levels?: NestedIdInput[];
}
