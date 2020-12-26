import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateMovieIdFKToFeelingTable1608993585157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("feeling", new TableForeignKey({
            columnNames: ["movie_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "movie",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("feeling");
        let foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("movie_id") !== -1);
        await queryRunner.dropForeignKey("feeling", foreignKey);
    }

}
