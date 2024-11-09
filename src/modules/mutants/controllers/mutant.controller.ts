import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { MutantService } from '../aplication/service/mutant.service';
import { CreateMutantDto } from './dto/create.mutant.dto';
import { dnaHumanError } from './constants/error-messages.constants';
import { dnaMutantSuccessMessage } from './constants/success-messages.constants';

@Controller('mutant')
export class MutantController {
  constructor(private readonly mutantService: MutantService) {}

  @Post()
  createMutant(@Body() dto: CreateMutantDto) {
    const createMutantResult = this.mutantService.isMutant(dto.dna);

    if (!createMutantResult) {
      throw new ForbiddenException(dnaHumanError);
    }

    return { message: dnaMutantSuccessMessage };
  }
}
