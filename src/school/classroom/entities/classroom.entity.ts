import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Enrollment } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'school', name: 'classroom' })
export class Classroom extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  color: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.classrooms)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom)
  enrollments: Enrollment[];
}
