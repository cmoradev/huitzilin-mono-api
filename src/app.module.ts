import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { loader, validationSchema } from './common/config';
import { DatabaseModule } from './common/database/database.module';
import { SchoolModule } from './school/school.module';
import { DiscountsModule } from './miscellaneous/discounts/discounts.module';

console.log(); // Log the NODE_ENV value

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loader],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV === 'development',
    }),
    DatabaseModule,
    AuthModule,
    SchoolModule,
    DiscountsModule,
  ],
})
export class AppModule {}
