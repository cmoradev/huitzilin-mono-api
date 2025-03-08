import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateClassroom')
export class CreateClassroomInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @MaxLength(10)
  @Field(() => String, { nullable: false })
  color: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
