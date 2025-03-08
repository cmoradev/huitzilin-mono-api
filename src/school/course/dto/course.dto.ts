import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';

@ObjectType('Course')
export class CourseDto extends BaseDto {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
