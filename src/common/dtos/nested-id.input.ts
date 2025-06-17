import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('NestedId')
export class NestedIdInput {
  @IsUUID()
  @Field(() => ID, { nullable: false })
  id: string;
}
