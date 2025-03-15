import { Base } from 'src/common/utils/base.entity';
import { Student } from 'src/school/student/entities/student.entity';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity({ schema: 'school', name: 'tutors' })
export class Tutor extends Base {
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

  @ManyToMany(() => Student, (student) => student.tutors)
  @JoinTable({ name: 'tutors_to_students' })
  students: Student[];
}
