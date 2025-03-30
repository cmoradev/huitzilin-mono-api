import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { BranchDto } from 'src/auth';
import { CycleDto } from 'src/school';

@ObjectType('Session')
export class SessionDto {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => GraphQLISODateTime, { nullable: false })
  exp: Date;

  @Field(() => GraphQLISODateTime, { nullable: false })
  iat: Date;

  @Field(() => BranchDto, { nullable: true })
  branch: BranchDto | null;

  @Field(() => CycleDto, { nullable: true })
  cycle: CycleDto | null;
}
