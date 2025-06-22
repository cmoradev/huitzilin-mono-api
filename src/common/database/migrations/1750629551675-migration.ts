import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750629551675 implements MigrationInterface {
  name = 'Migration1750629551675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD "start" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD "end" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD "periodId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd46b3a61755b66c23972ed9f1" ON "school"."enrollments" ("periodId") `,
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
      `DROP INDEX "school"."IDX_bd46b3a61755b66c23972ed9f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP COLUMN "periodId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP COLUMN "end"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP COLUMN "start"`,
    );
  }
}
