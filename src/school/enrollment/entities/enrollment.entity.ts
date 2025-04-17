import { Base } from 'src/common/utils/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EnrollmentState } from '../enums';
import { Classroom, Activity, Cycle, Debit, Student } from 'src/school';
import { Branch } from 'src/auth';

@Entity({ schema: 'school', name: 'enrollments' })
export class Enrollment extends Base {
  @Column({ type: 'varchar', nullable: false, length: 128 })
  details: string;

  @Column({ type: 'enum', nullable: false, enum: EnrollmentState })
  state: EnrollmentState;

  @Column({ type: 'int', nullable: false })
  order: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  isPackage: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  inPackage: boolean;

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
  activityId: string;

  @ManyToOne(() => Activity, (activity) => activity.enrollments)
  @JoinColumn({ name: 'activityId' })
  activity: Activity;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  cycleId: string;

  @ManyToOne(() => Cycle, (student) => student.enrollments)
  @JoinColumn({ name: 'cycleId' })
  cycle: Cycle;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  classroomId: string;

  @ManyToOne(() => Classroom, (student) => student.enrollments)
  @JoinColumn({ name: 'classroomId' })
  classroom: Classroom;

  @Column({ type: 'int', nullable: true })
  parentId: number | null;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.children)
  @JoinColumn({ name: 'parentId' })
  parent: Enrollment;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.parent)
  children: Enrollment[];

  @OneToMany(() => Debit, (debit) => debit.enrollment)
  debts: Debit[];
}
