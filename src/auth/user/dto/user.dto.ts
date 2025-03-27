import { Field, ObjectType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('User')
@QueryOptions({
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
})
export class UserDto extends BaseDto {
  @MaxLength(16)
  @Field(() => String, { nullable: false })
  username: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;

  // branch: Branch;
  // policies: PolicyDto[];
}
