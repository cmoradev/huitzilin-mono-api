import { Policy } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ schema: 'auth', name: 'actions' })
export class Action extends Base {
  @Column({ type: 'varchar', nullable: false })
  resources: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  route: string;

  @Column({ type: 'varchar', nullable: false, array: true })
  actions: string[];

  @Column({ type: 'uuid', nullable: false })
  @Index()
  policyId: string;

  @ManyToOne(() => Policy, (policy) => policy.actions)
  @JoinColumn({ name: 'policyId' })
  policy: Policy;
}
