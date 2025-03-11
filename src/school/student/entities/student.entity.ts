import { Base } from 'src/common/utils/base.entity';
import { Enrollment } from 'src/school';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity({ schema: 'school', name: 'students' })
export class Student extends Base {
  @Column({ type: 'varchar', nullable: false, length: 128 })
  picture: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  firstname: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  lastname: string;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  fullname: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  userId: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
