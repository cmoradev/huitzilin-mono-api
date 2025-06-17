import { Policy, User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Discount } from 'src/miscellaneous';
import {
  Cycle,
  Discipline,
  Enrollment,
  Level,
  Package,
  Student,
  Teacher,
  Tutor,
} from 'src/school';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ schema: 'auth', name: 'branchs' })
export class Branch extends Base {
  @Column({ type: 'varchar', nullable: false, length: 128 })
  picture: string;

  @Column({ type: 'varchar', nullable: false, length: 16 })
  name: string;

  @OneToMany(() => Policy, (action) => action.branch)
  policies: Policy[];

  @OneToMany(() => User, (action) => action.branch)
  users: User[];

  @OneToMany(() => Package, (pack) => pack.branch)
  packages: Package[];

  @OneToMany(() => Cycle, (cycle) => cycle.branch)
  cycles: Cycle[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.branch)
  enrollments: Enrollment[];

  @OneToMany(() => Level, (level) => level.branch)
  levels: Level[];

  @OneToMany(() => Discount, (discount) => discount.branch)
  discounts: Discount[];

  @OneToMany(() => Discipline, (discipline) => discipline.branch)
  disciplines: Discipline[];

  @ManyToMany(() => Student, (student) => student.branchs)
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.branchs)
  teachers: Teacher[];

  @ManyToMany(() => Tutor, (tutor) => tutor.branchs)
  tutors: Student[];
}
