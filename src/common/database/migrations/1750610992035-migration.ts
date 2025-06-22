import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750610992035 implements MigrationInterface {
  name = 'Migration1750610992035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "school"."schedules_to_levels" ("schedulesId" uuid NOT NULL, "levelsId" uuid NOT NULL, CONSTRAINT "PK_34fd3b5535f295ceeaf6cbe4365" PRIMARY KEY ("schedulesId", "levelsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b081e237151838434c8f21aa71" ON "school"."schedules_to_levels" ("schedulesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a95318d2ebb75e8eb2aaeef25" ON "school"."schedules_to_levels" ("levelsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" ADD CONSTRAINT "FK_b081e237151838434c8f21aa710" FOREIGN KEY ("schedulesId") REFERENCES "school"."schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" ADD CONSTRAINT "FK_9a95318d2ebb75e8eb2aaeef254" FOREIGN KEY ("levelsId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" DROP CONSTRAINT "FK_9a95318d2ebb75e8eb2aaeef254"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" DROP CONSTRAINT "FK_b081e237151838434c8f21aa710"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_9a95318d2ebb75e8eb2aaeef25"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_b081e237151838434c8f21aa71"`,
    );
    await queryRunner.query(`DROP TABLE "school"."schedules_to_levels"`);
  }
}
