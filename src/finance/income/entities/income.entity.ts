import { Base } from 'src/common/utils/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IncomeState } from '../enum';
import { Branch } from 'src/auth';
import { Concept } from 'src/finance';
import { Student } from 'src/school';
import { Payment } from 'src/finance';

@Entity({ schema: 'finance', name: 'incomes' })
export class Income extends Base {
  @Column({ type: 'smallint', nullable: false })
  folio: number;

  @Column({ type: 'timestamp without time zone', nullable: false })
  date: Date;

  @Column({ type: 'enum', nullable: false, enum: IncomeState })
  state: IncomeState;

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

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  pendingPayment: number;

  @Column({ type: 'varchar', nullable: true })
  clipLink: string | null;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.incomes)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Concept, (concept) => concept.income)
  concepts: Concept[];

  @OneToMany(() => Payment, (payment) => payment.income)
  payments: Payment[];

  @ManyToMany(() => Student, (student) => student.incomes, { cascade: true })
  @JoinTable({ name: 'incomes_to_students' })
  students: Student[];
}
