import { Base } from 'src/common/utils/base.entity';
import { Fee } from 'src/school';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity({ schema: 'school', name: 'courses' })
export class Course extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @OneToMany(() => Fee, (action) => action.course, { cascade: ['insert'] })
  fees: Fee[];
}
