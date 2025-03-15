import { Base } from 'src/common/utils/base.entity';
import { Enrollment, Tutor } from 'src/school';
import { Column, Entity, Index, ManyToMany, OneToMany } from 'typeorm';

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

  @Column({ type: 'uuid', nullable: true })
  @Index()
  userId: string;

  @ManyToMany(() => Tutor, (tutor) => tutor.students)
  tutors: Tutor[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
