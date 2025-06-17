import { Module } from '@nestjs/common';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CreatePackageInput } from './dto/create-package.input';
import { PackageDto } from './dto/package.dto';
import { UpdatePackageInput } from './dto/update-package.input';
import { Package } from './entities/package.entity';
import { PackageResolver } from './package.resolver';
import { PackageService } from './package.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Package])],
      services: [PackageService],
      resolvers: [
        {
          DTOClass: PackageDto,
          CreateDTOClass: CreatePackageInput,
          UpdateDTOClass: UpdatePackageInput,
          ServiceClass: PackageService,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: true }, one: { disabled: false } },
          update: { many: { disabled: false }, one: { disabled: false } },
          delete: { many: { disabled: true }, one: { disabled: false } },
        },
      ],
    }),
  ],
  providers: [PackageResolver],
})
export class PackageModule {}
