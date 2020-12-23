import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFeelingTypeIdFKToFeelingTable1608725967088 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("feeling", new TableForeignKey({
            columnNames: ["feeling_type_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "feeling_type",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("feeling");
        let foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("feeling_type_id") !== -1);
        await queryRunner.dropForeignKey("feeling", foreignKey);
    }

}
