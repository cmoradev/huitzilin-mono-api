import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('SetOrder')
export class SetOrderInput {
  @IsUUID()
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => Number, { nullable: false })
  order: number;
}
