import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { loader, validationSchema } from './common/config';
import { DatabaseModule } from './common/database/database.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loader],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: { 'graphql-ws': true },
      playground: true,
      // debug: true,
    }),
    DatabaseModule,
    AuthModule,
    SchoolModule,
  ],
})
export class AppModule {}
