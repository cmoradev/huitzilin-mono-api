import { ObjectType, Field } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';

@ObjectType('Classroom')
export class ClassroomDto extends BaseDto {
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
