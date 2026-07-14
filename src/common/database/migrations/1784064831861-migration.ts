import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1784064831861 implements MigrationInterface {
  name = 'Migration1784064831861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_bd46b3a61755b66c23972ed9f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ALTER COLUMN "periodId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_bd46b3a61755b66c23972ed9f1b" FOREIGN KEY ("periodId") REFERENCES "school"."periods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_bd46b3a61755b66c23972ed9f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ALTER COLUMN "periodId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_bd46b3a61755b66c23972ed9f1b" FOREIGN KEY ("periodId") REFERENCES "school"."periods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
