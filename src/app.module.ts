import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { loader, validationSchema } from './common/config';
import { DatabaseModule } from './common/database/database.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SchoolModule } from './school/school.module';
import { IncomeModule } from './finance/income/income.module';
import { ConceptModule } from './finance/concept/concept.module';
import { PaymentModule } from './finance/payment/payment.module';

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
    MiscellaneousModule,
    IncomeModule,
    ConceptModule,
    PaymentModule,
  ],
})
export class AppModule {}
