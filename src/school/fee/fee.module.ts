import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateFeeInput } from './dto/create-fee.input';
import { FeeDto } from './dto/fee.dto';
import { UpdateFeeInput } from './dto/update-fee.input';
import { Fee } from './entities/fee.entity';
import { FeeResolver } from './fee.resolver';
import { FeeService } from './fee.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Fee])],
      services: [FeeService],
      resolvers: [
        {
          DTOClass: FeeDto,
          CreateDTOClass: CreateFeeInput,
          UpdateDTOClass: UpdateFeeInput,
          ServiceClass: FeeService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
        },
      ],
    }),
  ],
  providers: [FeeResolver],
})
export class FeeModule {}
