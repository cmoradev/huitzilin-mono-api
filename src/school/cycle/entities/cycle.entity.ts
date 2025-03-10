import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index } from 'typeorm';

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
}
