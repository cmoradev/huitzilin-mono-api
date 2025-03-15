import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Student')
export class StudentDto extends BaseDto {
  @Field(() => String, { nullable: false })
  code: string;

  @Field(() => String, { nullable: false })
  picture: string;

  @Field(() => String, { nullable: false })
  firstname: string;

  @Field(() => String, { nullable: false })
  lastname: string;

  @Field(() => String, { nullable: false })
  fullname: string;

  @Field(() => String, { nullable: false })
  userId: string;
}
