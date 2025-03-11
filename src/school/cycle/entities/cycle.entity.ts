import { Base } from 'src/common/utils/base.entity';
import { Enrollment } from 'src/school';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity({ schema: 'school', name: 'cycles' })
export class Cycle extends Base {
  @Column({ type: 'varchar', nullable: false, length: 16 })
  name: string;

  @Column({ type: 'date', nullable: false })
  start: Date;

  @Column({ type: 'date', nullable: false })
  end: Date;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.cycle)
  enrollments: Enrollment[];
}
