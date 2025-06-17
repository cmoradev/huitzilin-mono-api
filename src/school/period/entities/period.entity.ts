import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ schema: 'school', name: 'periods' })
export class Period extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'date', nullable: false })
  start: string;

  @Column({ type: 'date', nullable: false })
  end: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.periods)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;
}
