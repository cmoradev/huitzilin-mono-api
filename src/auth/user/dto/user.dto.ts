import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('User')
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
