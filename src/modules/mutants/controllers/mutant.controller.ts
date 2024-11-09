import { Body, Controller, Post } from '@nestjs/common';
import { MutantService } from '../aplication/service/mutant.service';
import { CreateDnaDTO } from './dto/create.dna.dto';

@Controller('mutant')
export class MutantController {
  constructor(private readonly mutantService: MutantService) {}

  @Post()
  async createDna(@Body() dto: CreateDnaDTO): Promise<{
    message: string;
  }> {
    const createMutantResult = await this.mutantService.isMutant(dto.dna);

    return { message: createMutantResult };
  }
}
