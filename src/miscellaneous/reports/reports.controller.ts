import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DebitsService } from './debits.service';
import { IncomeParams } from './dto';
import { IncomesByDisciplinesService } from './incomes-by-disciplines.service';
import { IncomesService } from './incomes.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly incomesService: IncomesService,
    private readonly debitsService: DebitsService,
    private readonly incomesByDisciplinesService: IncomesByDisciplinesService,
  ) {}

  @Get('incomes')
  public async incomes(@Query() params: IncomeParams) {
    return this.incomesService.incomes(params);
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
    const { document } = await this.incomesService.incomesDownload(params);

    await document.write(res);

    res.end();
  }

  @Get('incomes-by-disciplines')
  public async incomesByDiscipline(@Query() params: IncomeParams) {
    return this.incomesByDisciplinesService.incomesByDisciplines(params);
  }

  @Get('incomes-by-disciplines-download')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header(
    'Content-Disposition',
    'attachment; filename="ingresos-por-disciplinas.xlsx"',
  )
  public async incomesByDisciplineDownload(
    @Query() params: IncomeParams,
    @Res() res: Response,
  ) {
    const { document } =
      await this.incomesByDisciplinesService.incomesDownload(params);

    await document.write(res);

    res.end();
  }

  @Get('debits')
  public async debits(@Query() params: IncomeParams) {
    return this.debitsService.debits(params);
  }
}
