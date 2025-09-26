import Decimal from 'decimal.js';
import { DebitData, Grouped, HoursByDiscipline, IncomeData } from './types'; // Ajusta la ruta si es necesario
import { PaymentMethod } from 'src/finance/payment/enum';
import { Schedule } from 'src/school';
import { differenceInMinutes, parse } from 'date-fns';

/**
 * Agrupa los conceptos por estado.
 */
export function summaryDebits(data: DebitData[]): Grouped[] {
  const debitTotal = data.reduce(
    (previous, current) => previous.plus(current.debitTotal),
    new Decimal(0),
  );

  const pendingPayment = data.reduce(
    (previous, current) => previous.plus(current.conceptPendingPayment ?? 0),
    new Decimal(0),
  );

  const received = data.reduce(
    (previous, current) => previous.plus(current.conceptReceived ?? 0),
    new Decimal(0),
  );

  return [
    {
      id: 'total',
      name: 'Total',
      count: debitTotal.toString(),
    },
    {
      id: 'received',
      name: 'Recibido',
      count: received.toString(),
    },
    {
      id: 'pendingPayment',
      name: 'Pendiente de pago',
      count: pendingPayment.toString(),
    },
  ];
}

/**
 * Agrupa los ingresos por método de pago.
 */
export function groupIncomeByPaymentMethod(data: IncomeData[]): Grouped[] {
  const result: Record<string, Grouped> = {};

  data.forEach((item) => {
    const method = String(item.paymentMethod);
    const income = new Decimal(item.paymentAmount);

    if (!result[method]) {
      result[method] = { id: method, name: method, count: '0' };
    }

    const lastCount = new Decimal(result[method].count ?? '0');
    result[method].count = lastCount.plus(income).toString();
  });

  return Object.values(result).map((item) => ({
    ...item,
    count: new Decimal(item.count).toFixed(2),
  }));
}

/**
 * Agrupa los ingresos por método de pago.
 */
export function groupIncomeByBranch(data: IncomeData[]) {
  const result = new Map<string, IncomeData[]>();

  data.forEach((item) => {
    const branchName = String(item.branchName);

    if (!result.has(branchName)) {
      result.set(branchName, []);
    }

    result.get(branchName)?.push(item);
  });

  return result;
}

/**
 * Suma todos los paymentAmount usando decimal.js.
 */
export function totalIncome(data: IncomeData[]): string {
  return data
    .reduce(
      (acc, item) => acc.plus(new Decimal(item.paymentAmount)),
      new Decimal(0),
    )
    .toFixed(2);
}

export const getMethodName = (value: PaymentMethod): string => {
  switch (value) {
    case PaymentMethod.CARD:
      return 'Tarjeta';
    case PaymentMethod.TRANSFER:
      return 'Transferencia';
    case PaymentMethod.CASH:
      return 'Efectivo';
    case PaymentMethod.CLIP:
      return 'Clip';
    default:
      return value;
  }
};

/**
 * Genera un folio a partir de un número.
 */
export const generateFolio = (value: number): string => {
  return value.toString().padStart(6, '0');
};

/**
 * Devuelve un estilo de tabla aleatorio entre TableStyleLight9 y TableStyleLight14.
 */
export function getRandomTableStyle():
  | 'TableStyleLight9'
  | 'TableStyleLight10'
  | 'TableStyleLight11'
  | 'TableStyleLight12'
  | 'TableStyleLight13'
  | 'TableStyleLight14' {
  const styles = [
    'TableStyleLight9',
    'TableStyleLight10',
    'TableStyleLight11',
    'TableStyleLight12',
    'TableStyleLight13',
    'TableStyleLight14',
  ] as const;

  const index = Math.floor(Math.random() * styles.length);

  return styles[index];
}

export function calculateMonthlyHours(schedules: Schedule[]) {
  let totalMinutes = 0;

  const disciplineMap = new Map<string, HoursByDiscipline>();

  for (const schedule of schedules) {
    // Parse start and end times
    const startDate = parse(schedule.start, 'HH:mm:ss', new Date());
    const endDate = parse(schedule.end, 'HH:mm:ss', new Date());
    const minutes = differenceInMinutes(endDate, startDate);
    // Asume que cada horario es semanal, multiplica por 4 para obtener horas mensuales
    const monthlyMinutes = minutes * 4;
    totalMinutes += monthlyMinutes;

    // Agrupa por disciplina
    if (!disciplineMap.has(schedule.discipline.id)) {
      disciplineMap.set(schedule.discipline.id, {
        disciplineId: schedule.discipline.id,
        disciplineName: schedule.discipline.name,
        totalHours: 0,
      });
    }
    disciplineMap.get(schedule.discipline.id)!.totalHours +=
      monthlyMinutes / 60;
  }

  return {
    totalHours: totalMinutes / 60,
    hoursByDiscipline: Array.from(disciplineMap.values()),
  };
}
