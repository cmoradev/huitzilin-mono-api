import { User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Enrollment } from 'src/school';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ schema: 'school', name: 'cycles' })
export class Cycle extends Base {
  @Column({ type: 'varchar', nullable: false, length: 16 })
  name: string;

  @Column({ type: 'date', nullable: false })
  start: string;

  @Column({ type: 'date', nullable: false })
  end: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.cycle)
  enrollments: Enrollment[];

  @OneToMany(() => User, (user) => user.cycle)
  users: User[];
}
