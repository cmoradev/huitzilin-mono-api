import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';

@ObjectType('Policy')
export class PolicyDto extends BaseDto {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  //   actions: ActionDto[];
  //   users: UserDto[];
}
