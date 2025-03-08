import { Branch, Policy } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ schema: 'auth', name: 'users' })
export class User extends Base {
  @Column({ type: 'varchar', nullable: false, length: 16 })
  username: string;

  @Column({ type: 'varchar', nullable: false, length: 96 })
  password: Date;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.users)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @ManyToMany(() => Policy, (policy) => policy.users)
  @JoinTable({ name: 'users_to_policies' })
  policies: Policy[];
}
