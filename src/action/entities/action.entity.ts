import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ActionEffectEnum } from '../enums';
import { Policy } from 'src/policy/entities/policy.entity';
import { Branch } from 'src/branch/entities/branch.entity';

@Entity({ schema: 'auth', name: 'actions' })
export class Action extends Base {
  @Column({ type: 'enum', nullable: false, enum: ActionEffectEnum })
  effect: ActionEffectEnum;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  action: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  route: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  policyId: string;

  @ManyToOne(() => Policy, (policy) => policy.actions)
  @JoinColumn({ name: 'policyId' })
  policy: Policy;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.actions)
  @JoinColumn({ name: 'policyId' })
  branch: Branch;
}
