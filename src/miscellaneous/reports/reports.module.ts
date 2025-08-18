import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/finance';
import { ReportsController } from './reports.controller';
import { IncomesService } from './incomes.service';
import { DebitsService } from './debits.service';
import { Debit } from 'src/school';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Debit])],
  controllers: [ReportsController],
  providers: [IncomesService, DebitsService],
})
export class ReportsModule {}
