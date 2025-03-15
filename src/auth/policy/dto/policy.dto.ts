import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Policy')
export class PolicyDto extends BaseDto {
  @FilterableField(() => String, { nullable: false })
  name: string;
  
  @FilterableField(() => String, { nullable: false })
  branchId: string;
}
