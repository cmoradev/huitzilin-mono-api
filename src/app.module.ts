import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loader, validationSchema } from './common/config';
import { DatabaseModule } from './common/database/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { CycleModule } from './school/cycle/cycle.module';
import { CourseModule } from './school/course/course.module';

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
    }),
    DatabaseModule,
    AuthModule,
    CycleModule,
    CourseModule,
  ],
})
export class AppModule {}
