import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateUserIdFKToFeelingTable1608993498608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("feeling", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("feeling");
        let foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("feeling", foreignKey);
    }

}
