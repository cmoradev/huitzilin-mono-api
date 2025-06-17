import { Branch } from 'src/auth';
import { Base } from 'src/common/utils/base.entity';
import { Level, Package } from 'src/school';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ schema: 'school', name: 'disciplines' })
export class Discipline extends Base {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'smallint', nullable: false })
  minHours: number;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.disciplines)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @ManyToMany(() => Package, (pack) => pack.disciplines, { cascade: true })
  @JoinTable({ name: 'packages_to_levels' })
  packages: Package[];

  @ManyToMany(() => Level, (level) => level.disciplines, { cascade: true })
  @JoinTable({ name: 'disciplines_to_levels' })
  levels: Level[];
}
