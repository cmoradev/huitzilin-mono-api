import { Policy, User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import {
  Classroom,
  Activity,
  Cycle,
  Enrollment,
  Student,
  Teacher,
  Tutor,
} from 'src/school';
import { Level } from 'src/school/level/entities/level.entity';
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

  @OneToMany(() => Classroom, (classroom) => classroom.branch)
  classrooms: Classroom[];

  @OneToMany(() => Activity, (activity) => activity.branch)
  activities: Activity[];

  @OneToMany(() => Cycle, (cycle) => cycle.branch)
  cycles: Cycle[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.branch)
  enrollments: Enrollment[];

  @OneToMany(() => Level, (level) => level.branch)
  levels: Level[];

  @ManyToMany(() => Student, (student) => student.branchs)
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.branchs)
  teachers: Teacher[];

  @ManyToMany(() => Tutor, (tutor) => tutor.branchs)
  tutors: Student[];
}
