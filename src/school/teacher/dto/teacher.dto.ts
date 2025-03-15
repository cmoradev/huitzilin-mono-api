import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Teacher')
export class TeacherDto extends BaseDto {
  @Field(() => String, { nullable: false })
  picture: string;

  @Field(() => String, { nullable: false })
  firstname: string;

  @Field(() => String, { nullable: false })
  lastname: string;

  @FilterableField(() => String, { nullable: false })
  fullname: string;

  @Field(() => String, { nullable: true })
  userId: string;
}
