import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBookTable1608672800014 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "book",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: "isbn",
          type: "varchar",
          isUnique: true,
          isNullable: false
        },
        {
          name: "title",
          type: "varchar",
          isNullable: false
        },        
        {
          name: "created_at",
          type: "timestamp",
          default: 'now()'
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: 'now()'
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("book");
  }

}
