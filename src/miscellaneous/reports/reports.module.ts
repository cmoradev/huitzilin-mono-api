import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concept, Income, Payment } from 'src/finance';
import { Debit, Enrollment, Schedule } from 'src/school';
import { DebitsService } from './debits.service';
import { IncomesByDisciplinesService } from './incomes-by-disciplines.service';
import { IncomesService } from './incomes.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      Income,
      Debit,
      Concept,
      Schedule,
      Enrollment,
    ]),
  ],
  controllers: [ReportsController],
  providers: [IncomesService, DebitsService, IncomesByDisciplinesService],
})
export class ReportsModule {}
