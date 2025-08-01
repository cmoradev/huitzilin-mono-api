import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentMethod, PaymentState } from '../enum';
import { Income } from 'src/finance';

@Entity({ schema: 'finance', name: 'payments' })
export class Payment extends Base {
  @Column({ type: 'smallint', nullable: false })
  folio: number;

  @Column({ type: 'enum', nullable: false, enum: PaymentState })
  state: PaymentState;

  @Column({ type: 'enum', nullable: false, enum: PaymentMethod })
  method: PaymentMethod;

  @Column({ type: 'timestamp without time zone', nullable: false })
  date: Date;

  @Column({ type: 'decimal', nullable: false, precision: 14, scale: 6 })
  amount: number;

  @Column({ type: 'varchar', nullable: false })
  transaction: string;

  @Column({ type: 'varchar', nullable: false })
  bank: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  incomeId: string;

  @ManyToOne(() => Income, (income) => income.payments)
  @JoinColumn({ name: 'incomeId' })
  income: Income;
}
