import { Base } from 'src/common/utils/base.entity';
import { Student } from 'src/school/student/entities/student.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ schema: 'school', name: 'documents' })
export class Document extends Base {
  @Column({ type: 'varchar', nullable: false, length: 64 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  key: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  url: string;

  @ManyToMany(() => Student, (student) => student.documents)
  students: Student[];
}
