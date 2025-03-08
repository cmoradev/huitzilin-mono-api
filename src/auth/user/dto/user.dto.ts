import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/utils/base.dto';

@ObjectType('User')
export class UserDto extends BaseDto {
  @MaxLength(16)
  @Field(() => String, { nullable: false })
  username: string;

//   policies: PolicyDto[];
}
