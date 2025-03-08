import { Policy } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ schema: 'auth', name: 'users' })	
export class User extends Base {
  @Column({ type: 'varchar', nullable: false, length: 16, })
  username : string;

  @Column({ type: 'varchar', nullable: false, length: 64, })
  password : Date;

  @ManyToMany(() => Policy, (policy) => policy.users)
  @JoinTable({ name: 'users_to_policies' })
  policies: Policy[];
}
