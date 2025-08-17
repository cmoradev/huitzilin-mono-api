import { Workbook } from 'exceljs';
import { getRandomTableStyle } from './helpers';

export class ExcelDocument {
  private readonly workbook: Workbook;
  public styleTable:
    | 'TableStyleLight9'
    | 'TableStyleLight10'
    | 'TableStyleLight11'
    | 'TableStyleLight12'
    | 'TableStyleLight13'
    | 'TableStyleLight14';

  constructor() {
    this.workbook = new Workbook();

    this.styleTable = getRandomTableStyle();

    this.config();
  }

  public get xlsx() {
    return this.workbook.xlsx;
  }

  public get book(): Workbook {
    return this.workbook;
  }

  public addWorksheet(name: string, color: string = '4F81BD') {
    const workbook = this.workbook.addWorksheet(name, {
      properties: { tabColor: { argb: color } },
    });

    return workbook;
  }

  public async getBase64(filename: string) {
    const buffer = await this.workbook.xlsx.writeBuffer({
      filename: `${filename}.xlsx`,
    });

    return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
      buffer,
    ).toString('base64')}`;
  }

  private config(): void {
    this.workbook.creator = 'Munyaal';
    this.workbook.created = new Date();

    this.workbook.views = [
      {
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: 0,
        visibility: 'visible',
      },
    ];
  }
}
