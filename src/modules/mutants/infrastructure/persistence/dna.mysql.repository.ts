import { Injectable } from '@nestjs/common';
import {
  IDnaRepository,
  IQueryOptions,
} from '../../aplication/repository/dna.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DnaEntity } from './entities/dna.entity';
import { Repository } from 'typeorm';
import { Dna } from '../../domain/dna.domain';

@Injectable()
export class DnaRepository implements IDnaRepository {
  constructor(
    @InjectRepository(DnaEntity)
    private readonly dnaRepository: Repository<DnaEntity>,
  ) {}

  async getAll(query?: IQueryOptions): Promise<Dna[]> {
    const { is_mutant } = query;

    const whereConditions: { is_mutant?: boolean } = {};

    if (is_mutant !== undefined) {
      whereConditions.is_mutant = is_mutant;
    }

    return await this.dnaRepository.find({
      where: whereConditions,
    });
  }

  async save(dna: Dna): Promise<Dna> {
    return await this.dnaRepository.save(dna);
  }
}
