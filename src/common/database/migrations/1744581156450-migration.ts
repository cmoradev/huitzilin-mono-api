import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744581156450 implements MigrationInterface {
    name = 'Migration1744581156450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."students" DROP CONSTRAINT "FK_4627550896111589a4da245dadf"`);
        await queryRunner.query(`DROP INDEX "school"."IDX_4627550896111589a4da245dad"`);
        await queryRunner.query(`CREATE TABLE "school"."levels_to_students" ("studentsId" uuid NOT NULL, "levelsId" uuid NOT NULL, CONSTRAINT "PK_40caad100250c335d7e20142f78" PRIMARY KEY ("studentsId", "levelsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ecd4dfdd58893b5810d22d9701" ON "school"."levels_to_students" ("studentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_de6da5b7a2989cef130012c6df" ON "school"."levels_to_students" ("levelsId") `);
        await queryRunner.query(`ALTER TABLE "school"."students" DROP COLUMN "levelId"`);
        await queryRunner.query(`ALTER TABLE "school"."levels_to_students" ADD CONSTRAINT "FK_ecd4dfdd58893b5810d22d9701a" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "school"."levels_to_students" ADD CONSTRAINT "FK_de6da5b7a2989cef130012c6dfc" FOREIGN KEY ("levelsId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school"."levels_to_students" DROP CONSTRAINT "FK_de6da5b7a2989cef130012c6dfc"`);
        await queryRunner.query(`ALTER TABLE "school"."levels_to_students" DROP CONSTRAINT "FK_ecd4dfdd58893b5810d22d9701a"`);
        await queryRunner.query(`ALTER TABLE "school"."students" ADD "levelId" uuid NOT NULL`);
        await queryRunner.query(`DROP INDEX "school"."IDX_de6da5b7a2989cef130012c6df"`);
        await queryRunner.query(`DROP INDEX "school"."IDX_ecd4dfdd58893b5810d22d9701"`);
        await queryRunner.query(`DROP TABLE "school"."levels_to_students"`);
        await queryRunner.query(`CREATE INDEX "IDX_4627550896111589a4da245dad" ON "school"."students" ("levelId") `);
        await queryRunner.query(`ALTER TABLE "school"."students" ADD CONSTRAINT "FK_4627550896111589a4da245dadf" FOREIGN KEY ("levelId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
