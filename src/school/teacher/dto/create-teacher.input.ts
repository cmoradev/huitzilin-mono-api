import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { NestedIdInput } from 'src/common/dtos';

@InputType('CreateTeacher')
export class CreateTeacherInput {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  firstname: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  lastname: string;

  @IsUUID()
  @Field(() => String, { nullable: true })
  userId: string;

  @Field(() => [NestedIdInput], { nullable: true })
  branchs: NestedIdInput[];
}
