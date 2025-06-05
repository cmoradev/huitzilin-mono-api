import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741746498438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS miscellaneous;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS public;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS school;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS auth;`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS school;`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS public;`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS miscellaneous;`);
  }
}
