import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableUnPagedRelation,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { StudentDto } from 'src/school/student/dto/student.dto';

@ObjectType('Document')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@FilterableUnPagedRelation('students', () => StudentDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
export class DocumentDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @FilterableField(() => String, { nullable: false })
  key: string;

  @Field(() => String, { nullable: false })
  url: string;
}
