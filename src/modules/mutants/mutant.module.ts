import { Module } from '@nestjs/common';
import { MutantController } from './controllers/mutant.controller';
import { MutantService } from './aplication/service/mutant.service';

@Module({
  controllers: [MutantController],
  providers: [MutantService],
})
export class MutantModule {}
