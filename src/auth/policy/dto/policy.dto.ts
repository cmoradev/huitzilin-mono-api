import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Policy')
export class PolicyDto extends BaseDto {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;
  
  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;

  // branch: BranchDto;
  // actions: ActionDto[];
  // users: UserDto[];
}
