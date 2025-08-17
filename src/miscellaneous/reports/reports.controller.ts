import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { IncomeParams } from './dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('incomes')
  public async incomes(@Query() params: IncomeParams) {
    return this.reportsService.incomes(params);
  }

  @Get('incomes-download')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename="ingresos.xlsx"')
  public async incomesDownload(
    @Query() params: IncomeParams,
    @Res() res: Response,
  ) {
    const { document } = await this.reportsService.incomesDownload(params);

    await document.write(res);

    res.end();
  }
}
