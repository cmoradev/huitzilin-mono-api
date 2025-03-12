import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741746498438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA auth;`);
    await queryRunner.query(`CREATE SCHEMA school;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA school;`);
    await queryRunner.query(`DROP SCHEMA auth;`);
  }
}
