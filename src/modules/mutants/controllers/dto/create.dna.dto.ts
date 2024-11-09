import { IsArray, IsString, ArrayNotEmpty, Matches } from 'class-validator';
import {
  dnaTypeError,
  emptyDnaError,
  nitrogenousBaseInvalidError,
  nitrogenousBaseTypeError,
} from './constants/error-messages.constants';
export class CreateDnaDTO {
  @IsArray({ message: dnaTypeError })
  @ArrayNotEmpty({ message: emptyDnaError })
  @IsString({ each: true, message: nitrogenousBaseTypeError })
  @Matches(/^[ATCG]+$/, {
    each: true,
    message: nitrogenousBaseInvalidError,
  })
  dna: string[];
}
