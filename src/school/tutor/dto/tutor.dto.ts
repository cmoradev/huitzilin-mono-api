import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Tutor')
export class TutorDto extends BaseDto {
  @Field(() => String, { nullable: false })
  picture: string;

  @Field(() => String, { nullable: false })
  firstname: string;

  @Field(() => String, { nullable: false })
  lastname: string;

  @FilterableField(() => String, { nullable: false })
  fullname: string;

  @Field(() => String, { nullable: false })
  userId: string;
}
