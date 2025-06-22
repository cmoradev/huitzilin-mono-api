import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750624712571 implements MigrationInterface {
  name = 'Migration1750624712571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "school"."enrollments_to_schedules" ("enrollmentsId" uuid NOT NULL, "schedulesId" uuid NOT NULL, CONSTRAINT "PK_c10bde2cd4ff7114ee50dfe3c68" PRIMARY KEY ("enrollmentsId", "schedulesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a11eb8f64ccf45a3fd62af8d21" ON "school"."enrollments_to_schedules" ("enrollmentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26232a4887810d5359089361f5" ON "school"."enrollments_to_schedules" ("schedulesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" ADD CONSTRAINT "FK_a11eb8f64ccf45a3fd62af8d21e" FOREIGN KEY ("enrollmentsId") REFERENCES "school"."enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" ADD CONSTRAINT "FK_26232a4887810d5359089361f58" FOREIGN KEY ("schedulesId") REFERENCES "school"."schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" DROP CONSTRAINT "FK_26232a4887810d5359089361f58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" DROP CONSTRAINT "FK_a11eb8f64ccf45a3fd62af8d21e"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_26232a4887810d5359089361f5"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_a11eb8f64ccf45a3fd62af8d21"`,
    );
    await queryRunner.query(`DROP TABLE "school"."enrollments_to_schedules"`);
  }
}
