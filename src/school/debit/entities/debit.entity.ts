import { Base } from 'src/common/utils/base.entity';
import { Enrollment } from 'src/school';
import { Frequency } from 'src/school/fee/enums';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DebitState } from '../enums';

@Entity({ schema: 'school', name: 'debts' })
export class Debit extends Base {
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  discount: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  taxes: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  withTax: boolean;

  @Column({ type: 'enum', nullable: false, enum: DebitState })
  state: DebitState;

  @Column({ type: 'enum', nullable: false, enum: Frequency })
  frequency: Frequency;

  @Column({ type: 'date', nullable: false })
  dueDate: string;

  @Column({ type: 'timestamp', nullable: true })
  paymentDate: Date;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  enrollmentId: string;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.debts)
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: Enrollment;
}
