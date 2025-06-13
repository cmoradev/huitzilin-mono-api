import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1749746993452 implements MigrationInterface {
  name = 'Migration1749746993452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_a766f2b4118abeedc8636ef567b"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_a766f2b4118abeedc8636ef567"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."activities" DROP COLUMN "inPackage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP COLUMN "inPackage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP COLUMN "classroomId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD "classroomId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD "inPackage" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."activities" ADD "inPackage" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a766f2b4118abeedc8636ef567" ON "school"."enrollments" ("classroomId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_a766f2b4118abeedc8636ef567b" FOREIGN KEY ("classroomId") REFERENCES "school"."classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
