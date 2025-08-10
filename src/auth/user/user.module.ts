import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Branch, User, UserDto } from 'src/auth';
import { ConfigKey } from 'src/common/config';
import { Cycle } from 'src/school';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([User, Branch, Cycle]),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>(ConfigKey.SECRET_KEY),
            signOptions: { expiresIn: '1h' },
          }),
        }),
      ],
      services: [UserService],
      resolvers: [
        {
          DTOClass: UserDto,
          ServiceClass: UserService,
          UpdateDTOClass: UpdateUserInput,
          pagingStrategy: PagingStrategies.OFFSET,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { many: { disabled: true }, one: { disabled: true } },
          update: { many: { disabled: true }, one: { disabled: false } },
          delete: { many: { disabled: true }, one: { disabled: false } },
        },
      ],
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
