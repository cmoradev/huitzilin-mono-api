import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';

@ObjectType('Student')
export class StudentDto extends BaseDto {
  @MaxLength(8)
  @Field(() => String, { nullable: false })
  code: string;

  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  firstname: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  lastname: string;

  @MaxLength(64)
  @Field(() => String, { nullable: false })
  fullname: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  userId: string;
}
