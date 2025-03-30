import { Branch, Policy } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Cycle, Student, Teacher, Tutor } from 'src/school';
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

@Entity({ schema: 'auth', name: 'users' })
export class User extends Base {
  @Column({ type: 'varchar', nullable: false, length: 16 })
  username: string;

  @Column({ type: 'varchar', nullable: false, length: 96 })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  email: string;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.users)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  cycleId: string;

  @ManyToOne(() => Cycle, (branch) => branch.users)
  @JoinColumn({ name: 'cycleId' })
  cycle: Cycle;

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teachers: Teacher[];

  @OneToMany(() => Tutor, (tutor) => tutor.user)
  tutors: Tutor[];

  @ManyToMany(() => Policy, (policy) => policy.users)
  @JoinTable({ name: 'users_to_policies' })
  policies: Policy[];
}
