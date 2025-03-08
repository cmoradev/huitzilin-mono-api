import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ schema: 'school', name: 'classroom' })
export class Classroom extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  color: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;
}
