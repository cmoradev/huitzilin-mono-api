import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Branch')
export class BranchDto extends BaseDto {
  @Field(() => String, { nullable: false })
  picture: string;

  @FilterableField(() => String, { nullable: false })
  name: string;
}
