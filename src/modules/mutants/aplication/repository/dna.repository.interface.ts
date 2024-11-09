import { Dna } from '../../domain/dna.domain';
export const DNA_REPOSITORY = 'DNA_REPOSITORY';

export interface IQueryOptions {
  is_mutant: boolean;
}

export interface IDnaRepository {
  getAll(query: IQueryOptions): Promise<Dna[]>;

  save(dna: Dna): Promise<Dna>;
}
