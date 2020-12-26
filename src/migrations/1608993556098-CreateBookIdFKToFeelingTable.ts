import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateBookIdFKToFeelingTable1608993556098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("feeling", new TableForeignKey({
            columnNames: ["book_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "book",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("feeling");
        let foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("book_id") !== -1);
        await queryRunner.dropForeignKey("feeling", foreignKey);
    }

}
