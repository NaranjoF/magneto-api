import { Module } from '@nestjs/common';
import { MutantModule } from './modules/mutants/mutant.module';
@Module({
  imports: [MutantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
