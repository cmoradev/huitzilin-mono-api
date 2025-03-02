import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loader, validationSchema } from './common/config';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PolicyModule } from './policy/policy.module';
import { ActionModule } from './action/action.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loader],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: { 'graphql-ws': true },
    }),
    DatabaseModule,
    UserModule,
    PolicyModule,
    ActionModule,
    BranchModule,
  ],
})
export class AppModule {}
