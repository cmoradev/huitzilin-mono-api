import { ExcelDocument } from './excel.document';
import { generateFolio, getMethodName, groupIncomeByBranch } from './helpers';
import { IncomeData } from './types';
import { format } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { TableColumnProperties } from 'exceljs';
import { calculateAllFromTotal, TaxEnum } from 'src/common/lib/calculations';

export const incomesExcel = (
  data: IncomeData[],
  start: string,
  end: string,
) => {
  const excel = new ExcelDocument();

  const groups = groupIncomeByBranch(data);

  groups.forEach((items, branch) => {
    const worksheet = excel.addWorksheet(`Ingresos - ${branch}`);

    worksheet.columns = [
      { key: 'A', width: 10 },
      { key: 'B', width: 26 },
      { key: 'C', width: 10 },
      { key: 'D', width: 10 },
      { key: 'E', width: 20 },
      { key: 'F', width: 20 },
      { key: 'G', width: 20 },
      { key: 'H', width: 20 },
      { key: 'I', width: 20 },
    ];

    let lastRow = 2;

    worksheet.mergeCells(`B${lastRow}:I${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = `Ingresos - ${branch}`;
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: false, size: 18 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:I${lastRow}`);
    const subtitle = worksheet.getCell(`B${lastRow}`);
    const formattedStart = format(
      new TZDate(start, 'America/Cancun'),
      'dd/MM/yyyy',
    );
    const formattedEnd = format(
      new TZDate(end, 'America/Cancun'),
      'dd/MM/yyyy',
    );
    subtitle.value = `Este reporte cubre el periodo del ${formattedStart} al ${formattedEnd}`;
    subtitle.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    subtitle.font = { bold: true, size: 14 };
    lastRow += 2;

    const dataColumns: TableColumnProperties[] = [
      { name: 'Estudiante', filterButton: true },
      { name: 'Folio Venta', filterButton: true },
      { name: 'Folio Pago', filterButton: true },
      { name: 'Fecha Pago', filterButton: true },
      { name: 'Método de Pago', filterButton: true },
      { name: 'Base', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Comisiòn', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Impuesto', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Total', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = items.map((row) => {
      // const { total, taxes, amount } = calculateBaseAndTaxFromTotal(
      //   parseFloat(row.paymentAmount),
      //   row.withTax ? TaxEnum.Sixteen : 0,
      // );

      const { base, comissions, taxes, total } = calculateAllFromTotal(
        parseFloat(row.paymentAmount),
        row.withTax ? TaxEnum.Sixteen : 0,
      );

      return [
        row.students.map((student) => student.fullname).join(', '),
        `V${generateFolio(row.incomeFolio)}`,
        `P${generateFolio(row.paymentFolio)}`,
        row.paymentDate,
        getMethodName(row.paymentMethod),
        base,
        comissions,
        taxes,
        Number(total.toFixed(2)),
      ];
    });

    worksheet.addTable({
      displayName: 'Datos',
      name: 'Datos',
      ref: `B${lastRow}`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: excel.styleTable,
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: dataColumns,
      rows: dataRows,
    });
  });

  return excel.xlsx;
};
