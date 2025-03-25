import { Policy, User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import {
  Classroom,
  Course,
  Cycle,
  Enrollment,
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

  @OneToMany(() => Classroom, (classroom) => classroom.branch)
  classrooms: Classroom[];

  @OneToMany(() => Course, (course) => course.branch)
  courses: Course[];

  @OneToMany(() => Cycle, (cycle) => cycle.branch)
  cycles: Cycle[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.branch)
  enrollments: Enrollment[];

  @ManyToMany(() => Student, (student) => student.branchs)
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.branchs)
  teachers: Teacher[];

  @ManyToMany(() => Tutor, (tutor) => tutor.branchs)
  tutors: Student[];
}
