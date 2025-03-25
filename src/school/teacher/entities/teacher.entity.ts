import { Branch, User } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'school', name: 'teachers' })
export class Teacher extends Base {
  @Column({ type: 'varchar', nullable: false, length: 128 })
  picture: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  firstname: string;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  lastname: string;

  @Column({ type: 'varchar', nullable: false, length: 64 })
  fullname: string;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  userId: string;

  @ManyToOne(() => User, (user) => user.teachers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Branch, (branch) => branch.teachers)
  @JoinTable({ name: 'branchs_to_teachers' })
  branchs: Branch[];
}
