import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1745002955780 implements MigrationInterface {
  name = 'Migration1745002955780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD "levelId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6f7f2c7a6778c2e86e41db3ce0" ON "school"."enrollments" ("levelId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_6f7f2c7a6778c2e86e41db3ce0d" FOREIGN KEY ("levelId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_de6da5b7a2989cef130012c6df"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_ecd4dfdd58893b5810d22d9701"`,
    );
    await queryRunner.query(`DROP TABLE "school"."levels_to_students"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_6f7f2c7a6778c2e86e41db3ce0d"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_6f7f2c7a6778c2e86e41db3ce0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP COLUMN "levelId"`,
    );
  }
}
