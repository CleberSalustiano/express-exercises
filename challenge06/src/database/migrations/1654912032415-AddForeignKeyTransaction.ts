import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddForeignKeyTransaction1654912032415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'transaction',
            new TableColumn({
              name: 'category_id',
              type: 'varchar',
              isNullable: true,
            }),
          );

        await queryRunner.createForeignKey(
            'transaction',
            new TableForeignKey ({
                name: 'transactionCategory',
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'category',
                onDelete: 'SET NULL',
                onUpdate: 'RESTRICT'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("category_id", "transaction")
    }

}
