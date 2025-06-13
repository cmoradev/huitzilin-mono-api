import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateActivity')
export class CreateActivityInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Number, { nullable: false })
  order: number;

  @Field(() => Number, { nullable: false })
  quantity: number;

  @Field(() => Boolean, { nullable: false })
  isPackage: boolean;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
