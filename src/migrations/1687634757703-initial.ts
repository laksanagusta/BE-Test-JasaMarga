import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1687634757703 implements MigrationInterface {
    name = 'Initial1687634757703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ruas_coordinates" ("id" SERIAL NOT NULL, "coordinates" character varying NOT NULL, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "ruasId" integer, CONSTRAINT "PK_e7a0844f6f463bbfba77b8ce18d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ruas" ("id" SERIAL NOT NULL, "ruas" character varying NOT NULL, "km_awal" character varying NOT NULL, "km_akhir" character varying NOT NULL, "status" boolean NOT NULL, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3a7c0a2cbaf7326a29076e0548e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "last_login" TIMESTAMP(3) WITH TIME ZONE, "token_jwt" character varying, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ruas_coordinates" ADD CONSTRAINT "FK_9649fc07ea7fc3f8a7f091049c4" FOREIGN KEY ("ruasId") REFERENCES "ruas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ruas_coordinates" DROP CONSTRAINT "FK_9649fc07ea7fc3f8a7f091049c4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "ruas"`);
        await queryRunner.query(`DROP TABLE "ruas_coordinates"`);
    }

}
