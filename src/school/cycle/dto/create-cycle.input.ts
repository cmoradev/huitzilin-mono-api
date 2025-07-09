import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType('CreateCycle')
export class CreateCycleInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;
}
