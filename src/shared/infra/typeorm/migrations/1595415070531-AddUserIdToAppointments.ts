import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1595415070531
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true, // caso o usuario delete seu perfil, esse campo ficará nulo
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['user_id'], // coluna que vai ser chave estrangeira
        referencedColumnNames: ['id'], // na tabela original, a coluna se chama id
        referencedTableName: 'users', // tabela referenciada
        onDelete: 'SET NULL', // o cascade deletaria todos os appointments com o id desse usuario
        onUpdate: 'CASCADE',
      }),
    );
  }

  /** Desfaz oq foi feito acima */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');
    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
