import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Tutor')
export class TutorDto extends BaseDto {
  @MaxLength(128)
  @Field(() => String, { nullable: false })
  picture: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  firstname: string;

  @MaxLength(32)
  @Field(() => String, { nullable: false })
  lastname: string;

  @MaxLength(64)
  @Field(() => String, { nullable: false })
  fullname: string;

  @IsUUID()
  @Field(() => String, { nullable: false })
  userId: string;
}
