import { ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Course')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class CourseDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
