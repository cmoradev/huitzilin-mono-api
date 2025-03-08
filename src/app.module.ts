import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loader, validationSchema } from './common/config';
import { DatabaseModule } from './common/database/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
})
export class AppModule {}
