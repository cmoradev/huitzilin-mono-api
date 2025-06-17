import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';
import { PackageKind } from '../enums';

@ObjectType('Package')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class PackageDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;

  @FilterableField(() => Number, { nullable: false })
  order: number;

  @Field(() => PackageKind, { nullable: false })
  kind: PackageKind;

  @FilterableField(() => Boolean, { nullable: false })
  isPackage: boolean;

  @Field(() => Boolean, { nullable: false })
  withTax: boolean;

  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
