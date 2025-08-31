import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1756653398254 implements MigrationInterface {
  name = 'Migration1756653398254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD "delinquency" numeric(14,6) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP COLUMN "delinquency"`,
    );
  }
}
