import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIndexTableproducto1685888321964 implements MigrationInterface {
  name = 'addIndexTableproducto1685888321964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_b669250df9e58a2cf85fdfa9cc" ON "products" ("precio_unitario", "stock") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b669250df9e58a2cf85fdfa9cc"`,
    );
  }
}
