import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Student } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'school', name: 'levels' })
export class Level extends Base {
  @Column({ type: 'varchar', nullable: false, length: 8 })
  abbreviation: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.levels)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Student, (student) => student.level)
  students: Student[];
}
