import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreateEnrollmentInput } from './dto/create-enrollment.input';
import { EnrollmentDto } from './dto/enrollment.dto';
import { UpdateEnrollmentInput } from './dto/update-enrollment.input';
import { EnrollmentResolver } from './enrollment.resolver';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Enrollment])],
      services: [EnrollmentService],
      resolvers: [
        {
          DTOClass: EnrollmentDto,
          CreateDTOClass: CreateEnrollmentInput,
          UpdateDTOClass: UpdateEnrollmentInput,
          ServiceClass: EnrollmentService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: true }, one: { disabled: false } },
          update: { many: { disabled: true }, one: { disabled: false } },
          delete: { many: { disabled: true }, one: { disabled: false } },
        },
      ],
    }),
  ],
  providers: [EnrollmentResolver],
})
export class EnrollmentModule {}
