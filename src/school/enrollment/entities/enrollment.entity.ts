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
import { EnrollmentState } from '../enums';
import {
  Cycle,
  Debit,
  Student,
  Level,
  Package,
  Schedule,
  Period,
} from 'src/school';
import { Branch } from 'src/auth';

@Entity({ schema: 'school', name: 'enrollments' })
export class Enrollment extends Base {
  @Column({ type: 'varchar', nullable: false, length: 128 })
  details: string;

  @Column({ type: 'enum', nullable: false, enum: EnrollmentState })
  state: EnrollmentState;

  @Column({ type: 'smallint', nullable: false })
  order: number;

  @Column({ type: 'date', nullable: false })
  start: string;

  @Column({ type: 'date', nullable: false })
  end: string;

  @Column({ type: 'smallint', nullable: false })
  hours: number;

  @Column({ type: 'smallint', nullable: false })
  diciplines: number;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.enrollments)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  studentId: string;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  packageId: string;

  @ManyToOne(() => Package, (pack) => pack.enrollments)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  cycleId: string;

  @ManyToOne(() => Cycle, (student) => student.enrollments)
  @JoinColumn({ name: 'cycleId' })
  cycle: Cycle;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  levelId: string;

  @ManyToOne(() => Level, (level) => level.enrollments)
  @JoinColumn({ name: 'levelId' })
  level: Level;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  periodId: string;

  @ManyToOne(() => Period, (period) => period.enrollments)
  @JoinColumn({ name: 'periodId' })
  period: Period;

  @OneToMany(() => Debit, (debit) => debit.enrollment, {
    cascade: ['insert'],
  })
  debts: Debit[];

  @ManyToMany(() => Schedule, (schedule) => schedule.enrollments, {
    cascade: true,
  })
  @JoinTable({ name: 'enrollments_to_schedules' })
  schedules: Schedule[];
}
