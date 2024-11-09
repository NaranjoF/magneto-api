import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dna')
export class DnaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  dna_sequence: string[];

  @Column()
  is_mutant: boolean;
}
