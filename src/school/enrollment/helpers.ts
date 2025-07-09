import {
  addMonths,
  endOfMonth,
  format,
  isBefore,
  setDate,
  startOfMonth,
} from 'date-fns';
import { Debit } from '../debit/entities/debit.entity';
import { DebitState } from '../debit/enums';
import { Fee } from '../fee/entities/fee.entity';
import { Frequency } from '../fee/enums';
import { Enrollment } from './entities/enrollment.entity';

export const generateDebits = (
  fee: Fee,
  enrollment: Enrollment,
): Partial<Debit>[] => {
  const defaultDueDate = `${format(
    addMonths(new Date(), 1),
    'yyyy-MM',
  )}-05T12:00:00`;

  const debits: Partial<Debit>[] = [];

  switch (fee.frequency) {
    case Frequency.MONTHLY:
      if (!!enrollment.start && !!enrollment.end) {
        const startPeriod = startOfMonth(`${enrollment.start}T12:00:00`);
        const endPeriod = endOfMonth(`${enrollment.end}T12:00:00`);

        let currentDate = startPeriod;

        while (isBefore(currentDate, endPeriod)) {
          currentDate = setDate(currentDate, 5);

          const description = `${fee.name} - ${format(currentDate, 'MMMM')}`;

          debits.push({
            description,
            unitPrice: fee.amount,
            discount: 0,
            dueDate: format(currentDate, 'yyyy-MM-dd') + 'T12:00:00',
            quantity: 1,
            state: DebitState.DEBT,
            withTax: fee.withTax,
            frequency: Frequency.SINGLE,
            paymentDate: null,
            studentId: enrollment.studentId,
            discounts: [],
          });

          currentDate = addMonths(currentDate, 1);
        }
      }

      return debits;
    default:
      return [
        {
          description: fee.name,
          unitPrice: fee.amount,
          discount: 0,
          dueDate: defaultDueDate,
          quantity: 1,
          state: DebitState.DEBT,
          withTax: fee.withTax,
          frequency: Frequency.SINGLE,
          paymentDate: null,
          studentId: enrollment.studentId,
          discounts: [],
        },
      ];
  }
};
