import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1731159189744 implements MigrationInterface {
  name = 'InitDb1731159189744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`dna\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dna_sequence\` json NOT NULL, \`is_mutant\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`dna\``);
  }
}
