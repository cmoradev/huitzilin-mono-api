import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { IncomeParams } from './dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('incomes')
  public async incomes(@Query() params: IncomeParams) {
    return this.reportsService.incomes(params);
  }
}
