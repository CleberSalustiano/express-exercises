import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransaction1654732521616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any>{
        await queryRunner.createTable(
            new Table ({
                name: "category",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false,   
                    },
                    {
                        name: "category_id",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false
                    },
                    {
                        name: "updated_at",
                        type: "timestamp with time zone",
                        isNullable: false
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("category")
    }

}
