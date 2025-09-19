import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1758294482425 implements MigrationInterface {
  name = 'Migration1758294482425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" ADD "teacherId" uuid`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d53e9c0b8f2c83ecaf15c9c4e6" ON "school"."schedules" ("teacherId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" ADD CONSTRAINT "FK_d53e9c0b8f2c83ecaf15c9c4e60" FOREIGN KEY ("teacherId") REFERENCES "school"."teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" DROP CONSTRAINT "FK_d53e9c0b8f2c83ecaf15c9c4e60"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_d53e9c0b8f2c83ecaf15c9c4e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" DROP COLUMN "teacherId"`,
    );
  }
}
