import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Policy } from '..';
import { CreatePolicyInput } from './dto/create-policy.input';
import { PolicyDto } from './dto/policy.dto';
import { UpdatePolicyInput } from './dto/update-policy.input';
import { PolicyResolver } from './policy.resolver';
import { PolicyService } from './policy.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Policy])],
      services: [PolicyService],
      resolvers: [
        {
          DTOClass: PolicyDto,
          CreateDTOClass: CreatePolicyInput,
          UpdateDTOClass: UpdatePolicyInput,
          ServiceClass: PolicyService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [PolicyResolver],
})
export class PolicyModule {}
