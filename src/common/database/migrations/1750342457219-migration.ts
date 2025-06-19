import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750342457219 implements MigrationInterface {
  name = 'Migration1750342457219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."periods" ADD "firstHour" TIME NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."periods" ADD "lastHour" TIME NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."periods" DROP COLUMN "lastHour"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."periods" DROP COLUMN "firstHour"`,
    );
  }
}
