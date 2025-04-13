import { Branch, User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Enrollment, Level, Tutor } from 'src/school';
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

@Entity({ schema: 'school', name: 'students' })
export class Student extends Base {
  @Column({ type: 'varchar', nullable: false, length: 8, unique: true })
  code: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  picture: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  firstname: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  lastname: string;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  fullname: string;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  dni: string;

  @Column({ type: 'date', nullable: false })
  dateBirth: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  levelId: string;

  @ManyToOne(() => Level, (level) => level.students)
  @JoinColumn({ name: 'levelId' })
  level: Level;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  userId: string;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Branch, (branch) => branch.students)
  @JoinTable({ name: 'branchs_to_students' })
  branchs: Branch[];

  @ManyToMany(() => Tutor, (tutor) => tutor.students)
  tutors: Tutor[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
