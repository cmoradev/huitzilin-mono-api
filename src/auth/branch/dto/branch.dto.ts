import { Field, ObjectType } from '@nestjs/graphql';
import { IsUrl, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';

@ObjectType('Branch')
export class BranchDto extends BaseDto {
  @IsUrl()
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(16)
  @Field(() => String, { nullable: false })
  name: string;

  // policies: Policy[];
  // users: User[];
}
