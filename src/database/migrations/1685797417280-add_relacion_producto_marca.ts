import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacionProductoMarca1685797417280
  implements MigrationInterface
{
  name = 'addRelacionProductoMarca1685797417280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" ADD "brand_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brand_id"`);
  }
}
