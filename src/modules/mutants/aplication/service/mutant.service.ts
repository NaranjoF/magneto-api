import { Injectable } from '@nestjs/common';

@Injectable()
export class MutantService {
  private readonly requiredSequences = 2;

  private countRepeatedSequences(sequence: string): number {
    const regex = /(A{4}|T{4}|C{4}|G{4})/g;
    return (sequence.match(regex) || []).length;
  }

  private countHorizontalSequences(dna: string[]): number {
    return dna.reduce(
      (count, row) => count + this.countRepeatedSequences(row),
      0,
    );
  }

  private countVerticalSequences(dna: string[]): number {
    const columnCount = dna[0].length;

    return Array.from({ length: columnCount })
      .map((_, col) => dna.map((row) => row[col]).join(''))
      .reduce(
        (count, column) => count + this.countRepeatedSequences(column),
        0,
      );
  }

  private countDiagonalSequences(dna: string[]): number {
    const size = dna.length;

    const primaryDiagonals = [
      ...Array.from({ length: size * 2 - 1 }, (_, d) =>
        dna
          .map((row, r) => {
            return r + d - size + 1 >= 0 && r + d - size + 1 < size
              ? row[r + d - size + 1]
              : '';
          })
          .join(''),
      ),
    ];

    const secondaryDiagonals = [
      ...Array.from({ length: size * 2 - 1 }, (_, d) =>
        dna
          .map((row, r) => {
            return r - d + size - 1 >= 0 && r - d + size - 1 < size
              ? row[size - 1 - (r - d + size - 1)]
              : '';
          })
          .join(''),
      ),
    ];

    return [...primaryDiagonals, ...secondaryDiagonals].reduce(
      (count, diag) => count + this.countRepeatedSequences(diag),
      0,
    );
  }

  isMutant(dna: string[]): boolean {
    const totalSequences = [
      this.countHorizontalSequences(dna),
      this.countVerticalSequences(dna),
      this.countDiagonalSequences(dna),
    ].reduce((acc, count) => acc + count, 0);

    return totalSequences >= this.requiredSequences;
  }
}
