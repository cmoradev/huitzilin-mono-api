import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Classroom')
@QueryOptions({ defaultSort: [{ field: 'id', direction: SortDirection.DESC }] })
export class ClassroomDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  color: string;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
