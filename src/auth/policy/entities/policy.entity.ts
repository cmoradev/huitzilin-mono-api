import { Action, Branch, User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'auth', name: 'policies' })
export class Policy extends Base {
  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.policies)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => Action, (action) => action.policy, { cascade: ['insert'] })
  actions: Action[];

  @ManyToMany(() => User, (user) => user.policies)
  users: User[];
}
