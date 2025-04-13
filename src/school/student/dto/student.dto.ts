import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import {
  FilterableField,
  FilterableUnPagedRelation,
  Relation,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { BranchDto } from 'src/auth/branch/dto';
import { BaseDto } from 'src/common/dtos/base.dto';
import { LevelDto } from 'src/school/level/dto/level.dto';

@ObjectType('Student')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
@FilterableUnPagedRelation('branchs', () => BranchDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
@Relation('level', () => LevelDto, { nullable: false })
export class StudentDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  code: string;

  @Field(() => String, { nullable: false })
  picture: string;

  @Field(() => String, { nullable: false })
  firstname: string;

  @Field(() => String, { nullable: false })
  lastname: string;

  @FilterableField(() => String, { nullable: false })
  fullname: string;

  @FilterableField(() => String, { nullable: false })
  dni: string;

  @Field(() => String, { nullable: false })
  dateBirth: string;

  @FilterableField(() => String, { nullable: false })
  levelId: string;

  @Field(() => String, { nullable: true })
  userId: string;
}
