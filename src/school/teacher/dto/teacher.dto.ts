import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableUnPagedRelation,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { BranchDto } from 'src/auth';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Teacher')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@FilterableUnPagedRelation('branchs', () => BranchDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
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
