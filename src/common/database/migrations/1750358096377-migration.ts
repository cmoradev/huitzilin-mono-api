import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750358096377 implements MigrationInterface {
  name = 'Migration1750358096377';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."periods" ADD "days" character varying(16) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."periods" DROP COLUMN "days"`,
    );
  }
}
