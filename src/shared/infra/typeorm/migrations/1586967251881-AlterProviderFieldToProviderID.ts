import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderID1586967251881
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true, // caso o provider delete seu perfil, esse campo ficará nulo
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'], // coluna que vai ser chave estrangeira
        referencedColumnNames: ['id'], // na tabela original, a coluna se chama id
        referencedTableName: 'users', // tabela referenciada
        onDelete: 'SET NULL', // o cascade deletaria todos os appointments com o id desse usuario
        onUpdate: 'CASCADE',
      }),
    );
  }

  /** Desfaz oq foi feito acima */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
