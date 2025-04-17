import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1744896617121 implements MigrationInterface {
  name = 'Migration1744896617121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "auth"."actions_effect_enum" AS ENUM('allow', 'deny')`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "effect" "auth"."actions_effect_enum" NOT NULL, "action" character varying(32) NOT NULL, "route" character varying(32) NOT NULL, "policyId" uuid NOT NULL, CONSTRAINT "PK_7bfb822f56be449c0b8adbf83cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd0976f6bbaaf7876f52f04b84" ON "auth"."actions" ("policyId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(32) NOT NULL, "order" integer NOT NULL, "quantity" integer NOT NULL, "isPackage" boolean NOT NULL DEFAULT false, "branchId" uuid NOT NULL, CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_709ab1de70290c85111c52f6d7" ON "school"."activities" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."classroom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(32) NOT NULL, "color" character varying(10) NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_05ecd27a3b8b99c0f17166c4f1" ON "school"."classroom" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."cycles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(16) NOT NULL, "start" date NOT NULL, "end" date NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_52e5eeb9c7c6e4ad1aed657967a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ef2680c05f936aae101a20c3b" ON "school"."cycles" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."debts_frequency_enum" AS ENUM('single', 'monthly', 'weekly', 'daily', 'hourly')`,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."debts_state_enum" AS ENUM('debt', 'paid', 'partially_paid', 'condoned', 'canceled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."debts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "value" numeric(10,2) NOT NULL, "quantity" numeric(10,2) NOT NULL, "frequency" "school"."debts_frequency_enum" NOT NULL, "state" "school"."debts_state_enum" NOT NULL, "dueDate" date NOT NULL, "paymentDate" TIMESTAMP, "enrollmentId" uuid NOT NULL, CONSTRAINT "PK_4bd9f54aab9e59628a3a2657fa1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab224a821e8fd0742959c39178" ON "school"."debts" ("enrollmentId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."enrollments_state_enum" AS ENUM('active', 'inactive', 'paused')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "details" character varying(128) NOT NULL, "state" "school"."enrollments_state_enum" NOT NULL, "order" integer NOT NULL, "branchId" uuid NOT NULL, "studentId" uuid NOT NULL, "activityId" uuid NOT NULL, "cycleId" uuid NOT NULL, "classroomId" uuid NOT NULL, "parentId" integer, CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43fe7599377eb8895eec5791f1" ON "school"."enrollments" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf3ba3dfa95e2df7388eb4589f" ON "school"."enrollments" ("studentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f532fabe7b0a922ebdbe3691a9" ON "school"."enrollments" ("activityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3070e8e34cbfffaf09724f9aa" ON "school"."enrollments" ("cycleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a766f2b4118abeedc8636ef567" ON "school"."enrollments" ("classroomId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."fees_frequency_enum" AS ENUM('single', 'monthly', 'weekly', 'daily', 'hourly')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."fees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "price" numeric(10,2) NOT NULL, "frequency" "school"."fees_frequency_enum" NOT NULL, "activityId" uuid NOT NULL, CONSTRAINT "PK_97f3a1b1b8ee5674fd4da93f461" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de30725636bac5c1f3e8b3cb38" ON "school"."fees" ("activityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."levels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "abbreviation" character varying(8) NOT NULL, "name" character varying(32) NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_05f8dd8f715793c64d49e3f1901" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0cc788b604eeddb13848af667b" ON "school"."levels" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "code" character varying(8) NOT NULL, "picture" character varying(128) NOT NULL, "firstname" character varying(32) NOT NULL, "lastname" character varying(32) NOT NULL, "fullname" character varying(64) NOT NULL, "dni" character varying(64) NOT NULL, "dateBirth" date NOT NULL, "userId" uuid, CONSTRAINT "UQ_75fc8d4dc627f6a1abee8fdb53b" UNIQUE ("code"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e0208b4f964e609959aff431bf" ON "school"."students" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "picture" character varying(128) NOT NULL, "firstname" character varying(32) NOT NULL, "lastname" character varying(32) NOT NULL, "fullname" character varying(64) NOT NULL, "userId" uuid, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d8041cbc103a5142fa2f2afad" ON "school"."teachers" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."branchs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "picture" character varying(128) NOT NULL, "name" character varying(16) NOT NULL, CONSTRAINT "PK_c2a14f542feef68e3968ce1766c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."policies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(32) NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_603e09f183df0108d8695c57e28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5e234b497d27d66e987c2ee0b9" ON "auth"."policies" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "username" character varying(16) NOT NULL, "password" character varying(96) NOT NULL, "email" character varying(64) NOT NULL, "branchId" uuid, "cycleId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_246426dfd001466a1d5e47322f" ON "auth"."users" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1dffb4570c1142bdd669095d28" ON "auth"."users" ("cycleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."tutors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "picture" character varying(128) NOT NULL, "firstname" character varying(32) NOT NULL, "lastname" character varying(32) NOT NULL, "fullname" character varying(64) NOT NULL, "userId" uuid, CONSTRAINT "PK_bab3e19eb9a7a36a6a95377963b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a193a9b3f925bf0767eaa83c18" ON "school"."tutors" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."branchs_to_students" ("studentsId" uuid NOT NULL, "branchsId" uuid NOT NULL, CONSTRAINT "PK_6b0efbe6abdf1d260374ce97ced" PRIMARY KEY ("studentsId", "branchsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f61ea7c168c3b86ce98fed66cb" ON "school"."branchs_to_students" ("studentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97df4b14a91fd906e38852be9a" ON "school"."branchs_to_students" ("branchsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."levels_to_students" ("studentsId" uuid NOT NULL, "levelsId" uuid NOT NULL, CONSTRAINT "PK_40caad100250c335d7e20142f78" PRIMARY KEY ("studentsId", "levelsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ecd4dfdd58893b5810d22d9701" ON "school"."levels_to_students" ("studentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de6da5b7a2989cef130012c6df" ON "school"."levels_to_students" ("levelsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."branchs_to_teachers" ("teachersId" uuid NOT NULL, "branchsId" uuid NOT NULL, CONSTRAINT "PK_8f4993ab4f3ad47b97bcbf190f7" PRIMARY KEY ("teachersId", "branchsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51b225c52e4b9f0164d98e3d46" ON "school"."branchs_to_teachers" ("teachersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe3e8d96f08af05a164174366a" ON "school"."branchs_to_teachers" ("branchsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."users_to_policies" ("usersId" uuid NOT NULL, "policiesId" uuid NOT NULL, CONSTRAINT "PK_c53c0d1dda05e15af3a44c1e635" PRIMARY KEY ("usersId", "policiesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95261aae112877a8ee869ac3f4" ON "auth"."users_to_policies" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e2b18073a06ba0789178558524" ON "auth"."users_to_policies" ("policiesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."tutors_to_students" ("tutorsId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_6042b49370f6bbac02d70abe76e" PRIMARY KEY ("tutorsId", "studentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99c0bd83fb5c40abc7abd1a69d" ON "school"."tutors_to_students" ("tutorsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_12275fa6fe1c99a4c2e19a771e" ON "school"."tutors_to_students" ("studentsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."branchs_to_tutors" ("tutorsId" uuid NOT NULL, "branchsId" uuid NOT NULL, CONSTRAINT "PK_5e757a72612b0dd91743106f68b" PRIMARY KEY ("tutorsId", "branchsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af602a01a8bdcc5f529b3f865d" ON "school"."branchs_to_tutors" ("tutorsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e7b17353d18dc81cf31151490a" ON "school"."branchs_to_tutors" ("branchsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" ADD CONSTRAINT "FK_fd0976f6bbaaf7876f52f04b841" FOREIGN KEY ("policyId") REFERENCES "auth"."policies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."activities" ADD CONSTRAINT "FK_709ab1de70290c85111c52f6d75" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."classroom" ADD CONSTRAINT "FK_05ecd27a3b8b99c0f17166c4f16" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."cycles" ADD CONSTRAINT "FK_4ef2680c05f936aae101a20c3be" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD CONSTRAINT "FK_ab224a821e8fd0742959c391780" FOREIGN KEY ("enrollmentId") REFERENCES "school"."enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_43fe7599377eb8895eec5791f12" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd" FOREIGN KEY ("studentId") REFERENCES "school"."students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_f532fabe7b0a922ebdbe3691a93" FOREIGN KEY ("activityId") REFERENCES "school"."activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_c3070e8e34cbfffaf09724f9aa0" FOREIGN KEY ("cycleId") REFERENCES "school"."cycles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_a766f2b4118abeedc8636ef567b" FOREIGN KEY ("classroomId") REFERENCES "school"."classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ADD CONSTRAINT "FK_de30725636bac5c1f3e8b3cb38e" FOREIGN KEY ("activityId") REFERENCES "school"."activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels" ADD CONSTRAINT "FK_0cc788b604eeddb13848af667bf" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."students" ADD CONSTRAINT "FK_e0208b4f964e609959aff431bf9" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."teachers" ADD CONSTRAINT "FK_4d8041cbc103a5142fa2f2afad4" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."policies" ADD CONSTRAINT "FK_5e234b497d27d66e987c2ee0b98" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_246426dfd001466a1d5e47322f4" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_1dffb4570c1142bdd669095d283" FOREIGN KEY ("cycleId") REFERENCES "school"."cycles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."tutors" ADD CONSTRAINT "FK_a193a9b3f925bf0767eaa83c18b" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" ADD CONSTRAINT "FK_f61ea7c168c3b86ce98fed66cba" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" ADD CONSTRAINT "FK_97df4b14a91fd906e38852be9ac" FOREIGN KEY ("branchsId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels_to_students" ADD CONSTRAINT "FK_ecd4dfdd58893b5810d22d9701a" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels_to_students" ADD CONSTRAINT "FK_de6da5b7a2989cef130012c6dfc" FOREIGN KEY ("levelsId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" ADD CONSTRAINT "FK_51b225c52e4b9f0164d98e3d46d" FOREIGN KEY ("teachersId") REFERENCES "school"."teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" ADD CONSTRAINT "FK_fe3e8d96f08af05a164174366a1" FOREIGN KEY ("branchsId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users_to_policies" ADD CONSTRAINT "FK_95261aae112877a8ee869ac3f4f" FOREIGN KEY ("usersId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users_to_policies" ADD CONSTRAINT "FK_e2b18073a06ba0789178558524a" FOREIGN KEY ("policiesId") REFERENCES "auth"."policies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."tutors_to_students" ADD CONSTRAINT "FK_99c0bd83fb5c40abc7abd1a69d2" FOREIGN KEY ("tutorsId") REFERENCES "school"."tutors"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."tutors_to_students" ADD CONSTRAINT "FK_12275fa6fe1c99a4c2e19a771e1" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_tutors" ADD CONSTRAINT "FK_af602a01a8bdcc5f529b3f865d1" FOREIGN KEY ("tutorsId") REFERENCES "school"."tutors"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_tutors" ADD CONSTRAINT "FK_e7b17353d18dc81cf31151490a2" FOREIGN KEY ("branchsId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_tutors" DROP CONSTRAINT "FK_e7b17353d18dc81cf31151490a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_tutors" DROP CONSTRAINT "FK_af602a01a8bdcc5f529b3f865d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."tutors_to_students" DROP CONSTRAINT "FK_12275fa6fe1c99a4c2e19a771e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."tutors_to_students" DROP CONSTRAINT "FK_99c0bd83fb5c40abc7abd1a69d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users_to_policies" DROP CONSTRAINT "FK_e2b18073a06ba0789178558524a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users_to_policies" DROP CONSTRAINT "FK_95261aae112877a8ee869ac3f4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" DROP CONSTRAINT "FK_fe3e8d96f08af05a164174366a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" DROP CONSTRAINT "FK_51b225c52e4b9f0164d98e3d46d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels_to_students" DROP CONSTRAINT "FK_de6da5b7a2989cef130012c6dfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels_to_students" DROP CONSTRAINT "FK_ecd4dfdd58893b5810d22d9701a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" DROP CONSTRAINT "FK_97df4b14a91fd906e38852be9ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" DROP CONSTRAINT "FK_f61ea7c168c3b86ce98fed66cba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."tutors" DROP CONSTRAINT "FK_a193a9b3f925bf0767eaa83c18b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_1dffb4570c1142bdd669095d283"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_246426dfd001466a1d5e47322f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."policies" DROP CONSTRAINT "FK_5e234b497d27d66e987c2ee0b98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."teachers" DROP CONSTRAINT "FK_4d8041cbc103a5142fa2f2afad4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."students" DROP CONSTRAINT "FK_e0208b4f964e609959aff431bf9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels" DROP CONSTRAINT "FK_0cc788b604eeddb13848af667bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" DROP CONSTRAINT "FK_de30725636bac5c1f3e8b3cb38e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_a766f2b4118abeedc8636ef567b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_c3070e8e34cbfffaf09724f9aa0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_f532fabe7b0a922ebdbe3691a93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_43fe7599377eb8895eec5791f12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP CONSTRAINT "FK_ab224a821e8fd0742959c391780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."cycles" DROP CONSTRAINT "FK_4ef2680c05f936aae101a20c3be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."classroom" DROP CONSTRAINT "FK_05ecd27a3b8b99c0f17166c4f16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."activities" DROP CONSTRAINT "FK_709ab1de70290c85111c52f6d75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."actions" DROP CONSTRAINT "FK_fd0976f6bbaaf7876f52f04b841"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_e7b17353d18dc81cf31151490a"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_af602a01a8bdcc5f529b3f865d"`,
    );
    await queryRunner.query(`DROP TABLE "school"."branchs_to_tutors"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_12275fa6fe1c99a4c2e19a771e"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_99c0bd83fb5c40abc7abd1a69d"`,
    );
    await queryRunner.query(`DROP TABLE "school"."tutors_to_students"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_e2b18073a06ba0789178558524"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_95261aae112877a8ee869ac3f4"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."users_to_policies"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_fe3e8d96f08af05a164174366a"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_51b225c52e4b9f0164d98e3d46"`,
    );
    await queryRunner.query(`DROP TABLE "school"."branchs_to_teachers"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_de6da5b7a2989cef130012c6df"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_ecd4dfdd58893b5810d22d9701"`,
    );
    await queryRunner.query(`DROP TABLE "school"."levels_to_students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_97df4b14a91fd906e38852be9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_f61ea7c168c3b86ce98fed66cb"`,
    );
    await queryRunner.query(`DROP TABLE "school"."branchs_to_students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_a193a9b3f925bf0767eaa83c18"`,
    );
    await queryRunner.query(`DROP TABLE "school"."tutors"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_1dffb4570c1142bdd669095d28"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_246426dfd001466a1d5e47322f"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."users"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_5e234b497d27d66e987c2ee0b9"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."policies"`);
    await queryRunner.query(`DROP TABLE "auth"."branchs"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_4d8041cbc103a5142fa2f2afad"`,
    );
    await queryRunner.query(`DROP TABLE "school"."teachers"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_e0208b4f964e609959aff431bf"`,
    );
    await queryRunner.query(`DROP TABLE "school"."students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_0cc788b604eeddb13848af667b"`,
    );
    await queryRunner.query(`DROP TABLE "school"."levels"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_de30725636bac5c1f3e8b3cb38"`,
    );
    await queryRunner.query(`DROP TABLE "school"."fees"`);
    await queryRunner.query(`DROP TYPE "school"."fees_frequency_enum"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_a766f2b4118abeedc8636ef567"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_c3070e8e34cbfffaf09724f9aa"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_f532fabe7b0a922ebdbe3691a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_bf3ba3dfa95e2df7388eb4589f"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_43fe7599377eb8895eec5791f1"`,
    );
    await queryRunner.query(`DROP TABLE "school"."enrollments"`);
    await queryRunner.query(`DROP TYPE "school"."enrollments_state_enum"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_ab224a821e8fd0742959c39178"`,
    );
    await queryRunner.query(`DROP TABLE "school"."debts"`);
    await queryRunner.query(`DROP TYPE "school"."debts_state_enum"`);
    await queryRunner.query(`DROP TYPE "school"."debts_frequency_enum"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_4ef2680c05f936aae101a20c3b"`,
    );
    await queryRunner.query(`DROP TABLE "school"."cycles"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_05ecd27a3b8b99c0f17166c4f1"`,
    );
    await queryRunner.query(`DROP TABLE "school"."classroom"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_709ab1de70290c85111c52f6d7"`,
    );
    await queryRunner.query(`DROP TABLE "school"."activities"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_fd0976f6bbaaf7876f52f04b84"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."actions"`);
    await queryRunner.query(`DROP TYPE "auth"."actions_effect_enum"`);
  }
}
