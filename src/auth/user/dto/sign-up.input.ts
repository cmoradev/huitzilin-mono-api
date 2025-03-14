import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('SignUpInput')
export class SignUpInput {
  @MaxLength(16)
  @Field(() => String, { nullable: false })
  username: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  password: string;

  @IsUUID()
  @Field(() => String, { nullable: true })
  branchId: string;
}
