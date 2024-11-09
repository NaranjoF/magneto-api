import { Module } from '@nestjs/common';
import { MutantController } from './controllers/mutant.controller';
import { MutantService } from './aplication/service/mutant.service';
import { DnaRepository } from './infrastructure/persistence/dna.mysql.repository';
import { DNA_REPOSITORY } from './aplication/repository/dna.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DnaEntity } from './infrastructure/persistence/entities/dna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DnaEntity])],
  controllers: [MutantController],
  providers: [
    MutantService,
    {
      useClass: DnaRepository,
      provide: DNA_REPOSITORY,
    },
  ],
})
export class MutantModule {}
