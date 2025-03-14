import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType('Paging')
export class PagingInput {
  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  limit?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  offset?: number;
}
