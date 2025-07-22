import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1753111024025 implements MigrationInterface {
  name = 'Migration1753111024025';

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
      `CREATE TABLE "school"."cycles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(16) NOT NULL, "start" date NOT NULL, "end" date NOT NULL, CONSTRAINT "PK_52e5eeb9c7c6e4ad1aed657967a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "miscellaneous"."discounts_type_enum" AS ENUM('percentage', 'fixed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "miscellaneous"."discounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "value" numeric(10,2) NOT NULL, "type" "miscellaneous"."discounts_type_enum" NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f9ff564fe6488a270521d8af8" ON "miscellaneous"."discounts" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "miscellaneous"."clip-links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "amount" numeric(10,2) NOT NULL, "link" character varying NOT NULL, "qr" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "requestId" character varying NOT NULL, "incomeId" uuid NOT NULL, CONSTRAINT "PK_8af1345a5d6d9a1a9275622ddf0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa11a314f929e8647ec4ef74a9" ON "miscellaneous"."clip-links" ("incomeId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "miscellaneous"."clip-accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "token" character varying NOT NULL, "webhook" character varying NOT NULL, "default" character varying NOT NULL, "success" character varying NOT NULL, "error" character varying NOT NULL, CONSTRAINT "PK_6db65bc87d10261089bcf37b596" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."debts_state_enum" AS ENUM('debt', 'paid', 'partially_paid', 'condoned', 'canceled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."debts_frequency_enum" AS ENUM('single', 'monthly', 'weekly', 'daily', 'hourly')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."debts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "unitPrice" numeric(10,2) NOT NULL, "quantity" numeric(10,2) NOT NULL, "amount" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "taxes" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "withTax" boolean NOT NULL DEFAULT true, "state" "school"."debts_state_enum" NOT NULL, "frequency" "school"."debts_frequency_enum" NOT NULL, "dueDate" date NOT NULL, "paymentDate" TIMESTAMP, "branchId" uuid NOT NULL, "studentId" uuid NOT NULL, "enrollmentId" uuid NOT NULL, CONSTRAINT "PK_4bd9f54aab9e59628a3a2657fa1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84129d6d0ad1153485411ed657" ON "school"."debts" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_223bda1f37d0d8fa1148d47996" ON "school"."debts" ("studentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab224a821e8fd0742959c39178" ON "school"."debts" ("enrollmentId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."disciplines" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying NOT NULL, "minHours" smallint NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_9b25ea6da0741577a73c9e90aad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9448a77540c07a17a5971ce0ec" ON "school"."disciplines" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "code" character varying(8) NOT NULL, "picture" character varying(128) NOT NULL, "firstname" character varying(32) NOT NULL, "lastname" character varying(32) NOT NULL, "fullname" character varying(64) NOT NULL, "dni" character varying(64) NOT NULL, "dateBirth" date NOT NULL, "active" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "UQ_75fc8d4dc627f6a1abee8fdb53b" UNIQUE ("code"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e0208b4f964e609959aff431bf" ON "school"."students" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "key" character varying(64) NOT NULL, "url" character varying(128) NOT NULL, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."enrollments_state_enum" AS ENUM('active', 'inactive', 'paused')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."enrollments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "details" character varying(128) NOT NULL, "state" "school"."enrollments_state_enum" NOT NULL, "order" smallint NOT NULL, "start" date NOT NULL, "end" date NOT NULL, "hours" smallint NOT NULL, "diciplines" smallint NOT NULL, "branchId" uuid NOT NULL, "studentId" uuid NOT NULL, "packageId" uuid NOT NULL, "cycleId" uuid NOT NULL, "levelId" uuid NOT NULL, "periodId" uuid NOT NULL, CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_43fe7599377eb8895eec5791f1" ON "school"."enrollments" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf3ba3dfa95e2df7388eb4589f" ON "school"."enrollments" ("studentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0a050f5a5318aa2d9dd5f749a2" ON "school"."enrollments" ("packageId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3070e8e34cbfffaf09724f9aa" ON "school"."enrollments" ("cycleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6f7f2c7a6778c2e86e41db3ce0" ON "school"."enrollments" ("levelId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd46b3a61755b66c23972ed9f1" ON "school"."enrollments" ("periodId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."fees_frequency_enum" AS ENUM('single', 'monthly', 'weekly', 'daily', 'hourly')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."fees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(64) NOT NULL, "amount" numeric(10,2) NOT NULL, "taxes" numeric(10,2) NOT NULL, "price" numeric(10,2) NOT NULL, "withTax" boolean NOT NULL DEFAULT true, "autoLoad" boolean NOT NULL DEFAULT true, "frequency" "school"."fees_frequency_enum" NOT NULL, "packageId" uuid NOT NULL, CONSTRAINT "PK_97f3a1b1b8ee5674fd4da93f461" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a17ba014eb5d602dda94985b4" ON "school"."fees" ("packageId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."levels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "abbreviation" character varying(8) NOT NULL, "name" character varying(32) NOT NULL, "branchId" uuid NOT NULL, "order" smallint NOT NULL DEFAULT '0', CONSTRAINT "PK_05f8dd8f715793c64d49e3f1901" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0cc788b604eeddb13848af667b" ON "school"."levels" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "school"."packages_kind_enum" AS ENUM('hours', 'quantity', 'unlimited')`,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."packages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(32) NOT NULL, "order" smallint NOT NULL, "quantity" smallint NOT NULL, "kind" "school"."packages_kind_enum" NOT NULL, "withTax" boolean NOT NULL DEFAULT true, "branchId" uuid NOT NULL, CONSTRAINT "PK_020801f620e21f943ead9311c98" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0db58e42121e067adf422522f8" ON "school"."packages" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."periods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(32) NOT NULL, "order" smallint NOT NULL, "days" character varying(16) NOT NULL, "start" date NOT NULL, "end" date NOT NULL, "firstHour" TIME NOT NULL, "lastHour" TIME NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_86c6afb6c818d97dc321898627c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_75a3901d1518a40cff1ce772bc" ON "school"."periods" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "day" smallint NOT NULL, "start" TIME NOT NULL, "end" TIME NOT NULL, "branchId" uuid NOT NULL, "periodId" uuid NOT NULL, "disciplineId" uuid NOT NULL, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_92233c841da29d74c4ed39e1d9" ON "school"."schedules" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_14eed2fb47b784d716e98967df" ON "school"."schedules" ("periodId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eebb78c6429057c4fb46c9921e" ON "school"."schedules" ("disciplineId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "picture" character varying(128) NOT NULL, "firstname" character varying(32) NOT NULL, "lastname" character varying(32) NOT NULL, "fullname" character varying(64) NOT NULL, "userId" uuid, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d8041cbc103a5142fa2f2afad" ON "school"."teachers" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."incomes_state_enum" AS ENUM('paid', 'pending', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."incomes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "folio" smallint NOT NULL, "date" TIMESTAMP NOT NULL, "state" "finance"."incomes_state_enum" NOT NULL, "amount" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "taxes" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "pendingPayment" numeric(10,2) NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_d737b3d0314c1f0da5461a55e5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_140037077096ef87d161e902c3" ON "finance"."incomes" ("branchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."concepts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "unitPrice" numeric(10,2) NOT NULL, "quantity" numeric(10,2) NOT NULL, "amount" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "taxes" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "pendingPayment" numeric(10,2) NOT NULL, "withTax" boolean NOT NULL DEFAULT true, "incomeId" uuid NOT NULL, CONSTRAINT "PK_0026cb8bc253eab30b171606891" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8e7761d502cf207918f11aecad" ON "finance"."concepts" ("incomeId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."payments_state_enum" AS ENUM('paid', 'pending', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "finance"."payments_method_enum" AS ENUM('card', 'transfer', 'cash', 'clip')`,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "folio" smallint NOT NULL, "state" "finance"."payments_state_enum" NOT NULL, "method" "finance"."payments_method_enum" NOT NULL, "date" TIMESTAMP NOT NULL, "amount" numeric(10,2) NOT NULL, "transaction" character varying NOT NULL, "bank" character varying NOT NULL, "incomeId" uuid NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f99d0b492f45102cfe795d5b99" ON "finance"."payments" ("incomeId") `,
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
      `CREATE TABLE "miscellaneous"."clip-accounts_to_branchs" ("clipAccountsId" uuid NOT NULL, "branchsId" uuid NOT NULL, CONSTRAINT "PK_51d0e2703dffcab7a3bc394ea5e" PRIMARY KEY ("clipAccountsId", "branchsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_86273be1d29488b74ddf5920d5" ON "miscellaneous"."clip-accounts_to_branchs" ("clipAccountsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f9baf39a872fe3a1aab9e1dada" ON "miscellaneous"."clip-accounts_to_branchs" ("branchsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."debts_to_discounts" ("debtsId" uuid NOT NULL, "discountsId" uuid NOT NULL, CONSTRAINT "PK_e0716f34b152cc1c65d0d2d77d5" PRIMARY KEY ("debtsId", "discountsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7877189f40bebe6dd3fe78165d" ON "school"."debts_to_discounts" ("debtsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_64d3fb5f76a39fbeace5342714" ON "school"."debts_to_discounts" ("discountsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "school"."packages_to_disciplines" ("disciplinesId" uuid NOT NULL, "packagesId" uuid NOT NULL, CONSTRAINT "PK_2911ceeb2d72b9f77560625c519" PRIMARY KEY ("disciplinesId", "packagesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_77a7b1a322ca3bdb00ed23a8a8" ON "school"."packages_to_disciplines" ("disciplinesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_def0e772779ef8de1053c2d775" ON "school"."packages_to_disciplines" ("packagesId") `,
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
      `CREATE TABLE "school"."documents_to_students" ("studentsId" uuid NOT NULL, "documentsId" uuid NOT NULL, CONSTRAINT "PK_828394bc71ae454cd10a2be3a9a" PRIMARY KEY ("studentsId", "documentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1e53e3e1335deb055c6aa185e" ON "school"."documents_to_students" ("studentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca3d4548fb5f5b1fc7c074d8e8" ON "school"."documents_to_students" ("documentsId") `,
    );
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
      `CREATE TABLE "school"."schedules_to_levels" ("schedulesId" uuid NOT NULL, "levelsId" uuid NOT NULL, CONSTRAINT "PK_34fd3b5535f295ceeaf6cbe4365" PRIMARY KEY ("schedulesId", "levelsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b081e237151838434c8f21aa71" ON "school"."schedules_to_levels" ("schedulesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a95318d2ebb75e8eb2aaeef25" ON "school"."schedules_to_levels" ("levelsId") `,
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
      `CREATE TABLE "finance"."incomes_to_students" ("incomesId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_b628a0b0d23da9e45cd5fa628db" PRIMARY KEY ("incomesId", "studentsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_88ce10b03a57005e33adea6ea4" ON "finance"."incomes_to_students" ("incomesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e70ad31e5402ab176108fe48d" ON "finance"."incomes_to_students" ("studentsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."concepts_to_discounts" ("conceptsId" uuid NOT NULL, "discountsId" uuid NOT NULL, CONSTRAINT "PK_c629b1825f0dd90f4c56f95cf20" PRIMARY KEY ("conceptsId", "discountsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_705ed470a42ff5b3692bebb684" ON "finance"."concepts_to_discounts" ("conceptsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dded8693b16d9fd34a4aef9cc4" ON "finance"."concepts_to_discounts" ("discountsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "finance"."concepts_to_debits" ("conceptsId" uuid NOT NULL, "debtsId" uuid NOT NULL, CONSTRAINT "PK_012e5bd968ef7538fd977ad19e1" PRIMARY KEY ("conceptsId", "debtsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_599ed420873e8c56a9428134e7" ON "finance"."concepts_to_debits" ("conceptsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d1bc152f3c08c0d7a8d60b7888" ON "finance"."concepts_to_debits" ("debtsId") `,
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
      `ALTER TABLE "miscellaneous"."discounts" ADD CONSTRAINT "FK_4f9ff564fe6488a270521d8af81" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" ADD CONSTRAINT "FK_fa11a314f929e8647ec4ef74a93" FOREIGN KEY ("incomeId") REFERENCES "finance"."incomes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD CONSTRAINT "FK_84129d6d0ad1153485411ed6578" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD CONSTRAINT "FK_223bda1f37d0d8fa1148d479960" FOREIGN KEY ("studentId") REFERENCES "school"."students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" ADD CONSTRAINT "FK_ab224a821e8fd0742959c391780" FOREIGN KEY ("enrollmentId") REFERENCES "school"."enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."disciplines" ADD CONSTRAINT "FK_9448a77540c07a17a5971ce0ecd" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."students" ADD CONSTRAINT "FK_e0208b4f964e609959aff431bf9" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_43fe7599377eb8895eec5791f12" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd" FOREIGN KEY ("studentId") REFERENCES "school"."students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_0a050f5a5318aa2d9dd5f749a25" FOREIGN KEY ("packageId") REFERENCES "school"."packages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_c3070e8e34cbfffaf09724f9aa0" FOREIGN KEY ("cycleId") REFERENCES "school"."cycles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_6f7f2c7a6778c2e86e41db3ce0d" FOREIGN KEY ("levelId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" ADD CONSTRAINT "FK_bd46b3a61755b66c23972ed9f1b" FOREIGN KEY ("periodId") REFERENCES "school"."periods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" ADD CONSTRAINT "FK_8a17ba014eb5d602dda94985b44" FOREIGN KEY ("packageId") REFERENCES "school"."packages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels" ADD CONSTRAINT "FK_0cc788b604eeddb13848af667bf" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."packages" ADD CONSTRAINT "FK_0db58e42121e067adf422522f83" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."periods" ADD CONSTRAINT "FK_75a3901d1518a40cff1ce772bc8" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" ADD CONSTRAINT "FK_92233c841da29d74c4ed39e1d90" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" ADD CONSTRAINT "FK_14eed2fb47b784d716e98967df8" FOREIGN KEY ("periodId") REFERENCES "school"."periods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" ADD CONSTRAINT "FK_eebb78c6429057c4fb46c9921e5" FOREIGN KEY ("disciplineId") REFERENCES "school"."disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."teachers" ADD CONSTRAINT "FK_4d8041cbc103a5142fa2f2afad4" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" ADD CONSTRAINT "FK_140037077096ef87d161e902c3d" FOREIGN KEY ("branchId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" ADD CONSTRAINT "FK_8e7761d502cf207918f11aecad4" FOREIGN KEY ("incomeId") REFERENCES "finance"."incomes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."payments" ADD CONSTRAINT "FK_f99d0b492f45102cfe795d5b990" FOREIGN KEY ("incomeId") REFERENCES "finance"."incomes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" ADD CONSTRAINT "FK_86273be1d29488b74ddf5920d55" FOREIGN KEY ("clipAccountsId") REFERENCES "miscellaneous"."clip-accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" ADD CONSTRAINT "FK_f9baf39a872fe3a1aab9e1dada8" FOREIGN KEY ("branchsId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts_to_discounts" ADD CONSTRAINT "FK_7877189f40bebe6dd3fe78165d2" FOREIGN KEY ("debtsId") REFERENCES "school"."debts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts_to_discounts" ADD CONSTRAINT "FK_64d3fb5f76a39fbeace5342714c" FOREIGN KEY ("discountsId") REFERENCES "miscellaneous"."discounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."packages_to_disciplines" ADD CONSTRAINT "FK_77a7b1a322ca3bdb00ed23a8a85" FOREIGN KEY ("disciplinesId") REFERENCES "school"."disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."packages_to_disciplines" ADD CONSTRAINT "FK_def0e772779ef8de1053c2d775f" FOREIGN KEY ("packagesId") REFERENCES "school"."packages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" ADD CONSTRAINT "FK_f61ea7c168c3b86ce98fed66cba" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" ADD CONSTRAINT "FK_97df4b14a91fd906e38852be9ac" FOREIGN KEY ("branchsId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" ADD CONSTRAINT "FK_b1e53e3e1335deb055c6aa185ed" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" ADD CONSTRAINT "FK_ca3d4548fb5f5b1fc7c074d8e8b" FOREIGN KEY ("documentsId") REFERENCES "school"."documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" ADD CONSTRAINT "FK_a11eb8f64ccf45a3fd62af8d21e" FOREIGN KEY ("enrollmentsId") REFERENCES "school"."enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" ADD CONSTRAINT "FK_26232a4887810d5359089361f58" FOREIGN KEY ("schedulesId") REFERENCES "school"."schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" ADD CONSTRAINT "FK_b081e237151838434c8f21aa710" FOREIGN KEY ("schedulesId") REFERENCES "school"."schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" ADD CONSTRAINT "FK_9a95318d2ebb75e8eb2aaeef254" FOREIGN KEY ("levelsId") REFERENCES "school"."levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" ADD CONSTRAINT "FK_51b225c52e4b9f0164d98e3d46d" FOREIGN KEY ("teachersId") REFERENCES "school"."teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" ADD CONSTRAINT "FK_fe3e8d96f08af05a164174366a1" FOREIGN KEY ("branchsId") REFERENCES "auth"."branchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes_to_students" ADD CONSTRAINT "FK_88ce10b03a57005e33adea6ea45" FOREIGN KEY ("incomesId") REFERENCES "finance"."incomes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes_to_students" ADD CONSTRAINT "FK_1e70ad31e5402ab176108fe48df" FOREIGN KEY ("studentsId") REFERENCES "school"."students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts_to_discounts" ADD CONSTRAINT "FK_705ed470a42ff5b3692bebb684e" FOREIGN KEY ("conceptsId") REFERENCES "finance"."concepts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts_to_discounts" ADD CONSTRAINT "FK_dded8693b16d9fd34a4aef9cc4c" FOREIGN KEY ("discountsId") REFERENCES "miscellaneous"."discounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts_to_debits" ADD CONSTRAINT "FK_599ed420873e8c56a9428134e7e" FOREIGN KEY ("conceptsId") REFERENCES "finance"."concepts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts_to_debits" ADD CONSTRAINT "FK_d1bc152f3c08c0d7a8d60b78889" FOREIGN KEY ("debtsId") REFERENCES "school"."debts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "finance"."concepts_to_debits" DROP CONSTRAINT "FK_d1bc152f3c08c0d7a8d60b78889"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts_to_debits" DROP CONSTRAINT "FK_599ed420873e8c56a9428134e7e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts_to_discounts" DROP CONSTRAINT "FK_dded8693b16d9fd34a4aef9cc4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts_to_discounts" DROP CONSTRAINT "FK_705ed470a42ff5b3692bebb684e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes_to_students" DROP CONSTRAINT "FK_1e70ad31e5402ab176108fe48df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes_to_students" DROP CONSTRAINT "FK_88ce10b03a57005e33adea6ea45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" DROP CONSTRAINT "FK_fe3e8d96f08af05a164174366a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_teachers" DROP CONSTRAINT "FK_51b225c52e4b9f0164d98e3d46d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" DROP CONSTRAINT "FK_9a95318d2ebb75e8eb2aaeef254"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules_to_levels" DROP CONSTRAINT "FK_b081e237151838434c8f21aa710"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" DROP CONSTRAINT "FK_26232a4887810d5359089361f58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments_to_schedules" DROP CONSTRAINT "FK_a11eb8f64ccf45a3fd62af8d21e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" DROP CONSTRAINT "FK_ca3d4548fb5f5b1fc7c074d8e8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."documents_to_students" DROP CONSTRAINT "FK_b1e53e3e1335deb055c6aa185ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" DROP CONSTRAINT "FK_97df4b14a91fd906e38852be9ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."branchs_to_students" DROP CONSTRAINT "FK_f61ea7c168c3b86ce98fed66cba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."packages_to_disciplines" DROP CONSTRAINT "FK_def0e772779ef8de1053c2d775f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."packages_to_disciplines" DROP CONSTRAINT "FK_77a7b1a322ca3bdb00ed23a8a85"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts_to_discounts" DROP CONSTRAINT "FK_64d3fb5f76a39fbeace5342714c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts_to_discounts" DROP CONSTRAINT "FK_7877189f40bebe6dd3fe78165d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" DROP CONSTRAINT "FK_f9baf39a872fe3a1aab9e1dada8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-accounts_to_branchs" DROP CONSTRAINT "FK_86273be1d29488b74ddf5920d55"`,
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
      `ALTER TABLE "finance"."payments" DROP CONSTRAINT "FK_f99d0b492f45102cfe795d5b990"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."concepts" DROP CONSTRAINT "FK_8e7761d502cf207918f11aecad4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "finance"."incomes" DROP CONSTRAINT "FK_140037077096ef87d161e902c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."teachers" DROP CONSTRAINT "FK_4d8041cbc103a5142fa2f2afad4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" DROP CONSTRAINT "FK_eebb78c6429057c4fb46c9921e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" DROP CONSTRAINT "FK_14eed2fb47b784d716e98967df8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."schedules" DROP CONSTRAINT "FK_92233c841da29d74c4ed39e1d90"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."periods" DROP CONSTRAINT "FK_75a3901d1518a40cff1ce772bc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."packages" DROP CONSTRAINT "FK_0db58e42121e067adf422522f83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."levels" DROP CONSTRAINT "FK_0cc788b604eeddb13848af667bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."fees" DROP CONSTRAINT "FK_8a17ba014eb5d602dda94985b44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_bd46b3a61755b66c23972ed9f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_6f7f2c7a6778c2e86e41db3ce0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_c3070e8e34cbfffaf09724f9aa0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_0a050f5a5318aa2d9dd5f749a25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_bf3ba3dfa95e2df7388eb4589fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."enrollments" DROP CONSTRAINT "FK_43fe7599377eb8895eec5791f12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."students" DROP CONSTRAINT "FK_e0208b4f964e609959aff431bf9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."disciplines" DROP CONSTRAINT "FK_9448a77540c07a17a5971ce0ecd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP CONSTRAINT "FK_ab224a821e8fd0742959c391780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP CONSTRAINT "FK_223bda1f37d0d8fa1148d479960"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school"."debts" DROP CONSTRAINT "FK_84129d6d0ad1153485411ed6578"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."clip-links" DROP CONSTRAINT "FK_fa11a314f929e8647ec4ef74a93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "miscellaneous"."discounts" DROP CONSTRAINT "FK_4f9ff564fe6488a270521d8af81"`,
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
      `DROP INDEX "finance"."IDX_d1bc152f3c08c0d7a8d60b7888"`,
    );
    await queryRunner.query(
      `DROP INDEX "finance"."IDX_599ed420873e8c56a9428134e7"`,
    );
    await queryRunner.query(`DROP TABLE "finance"."concepts_to_debits"`);
    await queryRunner.query(
      `DROP INDEX "finance"."IDX_dded8693b16d9fd34a4aef9cc4"`,
    );
    await queryRunner.query(
      `DROP INDEX "finance"."IDX_705ed470a42ff5b3692bebb684"`,
    );
    await queryRunner.query(`DROP TABLE "finance"."concepts_to_discounts"`);
    await queryRunner.query(
      `DROP INDEX "finance"."IDX_1e70ad31e5402ab176108fe48d"`,
    );
    await queryRunner.query(
      `DROP INDEX "finance"."IDX_88ce10b03a57005e33adea6ea4"`,
    );
    await queryRunner.query(`DROP TABLE "finance"."incomes_to_students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_fe3e8d96f08af05a164174366a"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_51b225c52e4b9f0164d98e3d46"`,
    );
    await queryRunner.query(`DROP TABLE "school"."branchs_to_teachers"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_9a95318d2ebb75e8eb2aaeef25"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_b081e237151838434c8f21aa71"`,
    );
    await queryRunner.query(`DROP TABLE "school"."schedules_to_levels"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_26232a4887810d5359089361f5"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_a11eb8f64ccf45a3fd62af8d21"`,
    );
    await queryRunner.query(`DROP TABLE "school"."enrollments_to_schedules"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_ca3d4548fb5f5b1fc7c074d8e8"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_b1e53e3e1335deb055c6aa185e"`,
    );
    await queryRunner.query(`DROP TABLE "school"."documents_to_students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_97df4b14a91fd906e38852be9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_f61ea7c168c3b86ce98fed66cb"`,
    );
    await queryRunner.query(`DROP TABLE "school"."branchs_to_students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_def0e772779ef8de1053c2d775"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_77a7b1a322ca3bdb00ed23a8a8"`,
    );
    await queryRunner.query(`DROP TABLE "school"."packages_to_disciplines"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_64d3fb5f76a39fbeace5342714"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_7877189f40bebe6dd3fe78165d"`,
    );
    await queryRunner.query(`DROP TABLE "school"."debts_to_discounts"`);
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_f9baf39a872fe3a1aab9e1dada"`,
    );
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_86273be1d29488b74ddf5920d5"`,
    );
    await queryRunner.query(
      `DROP TABLE "miscellaneous"."clip-accounts_to_branchs"`,
    );
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
      `DROP INDEX "finance"."IDX_f99d0b492f45102cfe795d5b99"`,
    );
    await queryRunner.query(`DROP TABLE "finance"."payments"`);
    await queryRunner.query(`DROP TYPE "finance"."payments_method_enum"`);
    await queryRunner.query(`DROP TYPE "finance"."payments_state_enum"`);
    await queryRunner.query(
      `DROP INDEX "finance"."IDX_8e7761d502cf207918f11aecad"`,
    );
    await queryRunner.query(`DROP TABLE "finance"."concepts"`);
    await queryRunner.query(
      `DROP INDEX "finance"."IDX_140037077096ef87d161e902c3"`,
    );
    await queryRunner.query(`DROP TABLE "finance"."incomes"`);
    await queryRunner.query(`DROP TYPE "finance"."incomes_state_enum"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_4d8041cbc103a5142fa2f2afad"`,
    );
    await queryRunner.query(`DROP TABLE "school"."teachers"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_eebb78c6429057c4fb46c9921e"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_14eed2fb47b784d716e98967df"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_92233c841da29d74c4ed39e1d9"`,
    );
    await queryRunner.query(`DROP TABLE "school"."schedules"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_75a3901d1518a40cff1ce772bc"`,
    );
    await queryRunner.query(`DROP TABLE "school"."periods"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_0db58e42121e067adf422522f8"`,
    );
    await queryRunner.query(`DROP TABLE "school"."packages"`);
    await queryRunner.query(`DROP TYPE "school"."packages_kind_enum"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_0cc788b604eeddb13848af667b"`,
    );
    await queryRunner.query(`DROP TABLE "school"."levels"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_8a17ba014eb5d602dda94985b4"`,
    );
    await queryRunner.query(`DROP TABLE "school"."fees"`);
    await queryRunner.query(`DROP TYPE "school"."fees_frequency_enum"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_bd46b3a61755b66c23972ed9f1"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_6f7f2c7a6778c2e86e41db3ce0"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_c3070e8e34cbfffaf09724f9aa"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_0a050f5a5318aa2d9dd5f749a2"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_bf3ba3dfa95e2df7388eb4589f"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_43fe7599377eb8895eec5791f1"`,
    );
    await queryRunner.query(`DROP TABLE "school"."enrollments"`);
    await queryRunner.query(`DROP TYPE "school"."enrollments_state_enum"`);
    await queryRunner.query(`DROP TABLE "school"."documents"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_e0208b4f964e609959aff431bf"`,
    );
    await queryRunner.query(`DROP TABLE "school"."students"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_9448a77540c07a17a5971ce0ec"`,
    );
    await queryRunner.query(`DROP TABLE "school"."disciplines"`);
    await queryRunner.query(
      `DROP INDEX "school"."IDX_ab224a821e8fd0742959c39178"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_223bda1f37d0d8fa1148d47996"`,
    );
    await queryRunner.query(
      `DROP INDEX "school"."IDX_84129d6d0ad1153485411ed657"`,
    );
    await queryRunner.query(`DROP TABLE "school"."debts"`);
    await queryRunner.query(`DROP TYPE "school"."debts_frequency_enum"`);
    await queryRunner.query(`DROP TYPE "school"."debts_state_enum"`);
    await queryRunner.query(`DROP TABLE "miscellaneous"."clip-accounts"`);
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_fa11a314f929e8647ec4ef74a9"`,
    );
    await queryRunner.query(`DROP TABLE "miscellaneous"."clip-links"`);
    await queryRunner.query(
      `DROP INDEX "miscellaneous"."IDX_4f9ff564fe6488a270521d8af8"`,
    );
    await queryRunner.query(`DROP TABLE "miscellaneous"."discounts"`);
    await queryRunner.query(`DROP TYPE "miscellaneous"."discounts_type_enum"`);
    await queryRunner.query(`DROP TABLE "school"."cycles"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_fd0976f6bbaaf7876f52f04b84"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."actions"`);
    await queryRunner.query(`DROP TYPE "auth"."actions_effect_enum"`);
  }
}
