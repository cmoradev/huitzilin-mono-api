import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema, loader } from './common/config';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loader],
      validationSchema,
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
