import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

@InputType('CreateCourse')
export class CreateCourseInput {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
