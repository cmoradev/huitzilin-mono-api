import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('SetOrderActivity')
export class SetOrderActivityInput {
  @IsUUID()
  @Field(() => String, { nullable: false })
  activityId: string;

  @Field(() => Number, { nullable: false })
  order: number;
}
