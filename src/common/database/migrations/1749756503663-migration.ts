import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1749756503663 implements MigrationInterface {
  name = 'Migration1749756503663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."documents" ADD "key" character varying(64) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."documents" DROP COLUMN "key"`,
    );
  }
}
