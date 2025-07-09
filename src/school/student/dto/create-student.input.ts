import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { NestedIdInput } from 'src/common/dtos';

@InputType('CreateStudent')
export class CreateStudentInput {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  firstname: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  lastname: string;

  @Field(() => String, { nullable: false })
  dni: string;

  @Field(() => String, { nullable: false })
  dateBirth: string;

  @Field(() => Boolean, { nullable: false })
  active: boolean;

  @IsUUID()
  @Field(() => String, { nullable: true })
  userId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  branchs: NestedIdInput[];
}
