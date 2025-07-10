import { Base } from 'src/common/utils/base.entity';
import { Discount } from 'src/miscellaneous';
import { Enrollment, Student } from 'src/school';
import { Frequency } from 'src/school/fee/enums';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { DebitState } from '../enums';
import { Concept } from 'src/finance';
import { Branch } from 'src/auth';

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

  @Column({ type: 'boolean', nullable: false, default: false })
  withPayment: boolean;

  @Column({ type: 'enum', nullable: false, enum: DebitState })
  state: DebitState;

  @Column({ type: 'enum', nullable: false, enum: Frequency })
  frequency: Frequency;

  @Column({ type: 'date', nullable: false })
  dueDate: string;

  @Column({ type: 'timestamp', nullable: true })
  paymentDate: Date | null;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.debts)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  studentId: string;

  @ManyToOne(() => Student, (student) => student.debts)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  enrollmentId: string;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.debts)
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: Enrollment;

  @ManyToMany(() => Discount, (discount) => discount.debts, { cascade: true })
  @JoinTable({ name: 'debts_to_discounts' })
  discounts: Discount[];

  @ManyToMany(() => Concept, (concept) => concept.debits)
  concepts: Concept[];
}
