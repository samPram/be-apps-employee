import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqNumberEmployee1727360556878 implements MigrationInterface {
    name = 'UniqNumberEmployee1727360556878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_daf1a55cfed9107f87ad01d19e2" UNIQUE ("number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_daf1a55cfed9107f87ad01d19e2"`);
    }

}
