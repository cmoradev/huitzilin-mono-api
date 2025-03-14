import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { BaseDto } from 'src/common/dtos/base.dto';

@ObjectType('Cycle')
export class CycleDto extends BaseDto {
  @MaxLength(32)
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Date, { nullable: false })
  start: Date;

  @Field(() => Date, { nullable: false })
  end: Date;

  @IsUUID()
  @Field(() => String, { nullable: false })
  branchId: string;
}
