import { ObjectType, Field } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Classroom')
export class ClassroomDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  color: string;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
