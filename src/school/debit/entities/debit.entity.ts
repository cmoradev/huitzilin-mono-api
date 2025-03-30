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
  value: number;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'enum', nullable: false, enum: Frequency })
  frequency: Frequency;

  @Column({ type: 'enum', nullable: false, enum: DebitState })
  state: DebitState;

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
