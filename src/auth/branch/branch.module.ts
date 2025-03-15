import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { BranchResolver } from './branch.resolver';
import { Branch } from './entities/branch.entity';
import { BranchService } from './branch.service';
import { BranchDto } from './dto/branch.dto';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Branch])],
      services: [BranchService],
      resolvers: [
        {
          DTOClass: BranchDto,
          CreateDTOClass: CreateBranchInput,
          // UpdateDTOClass: UpdateBranchInput,
          ServiceClass: BranchService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [BranchResolver],
})
export class BranchModule {}
