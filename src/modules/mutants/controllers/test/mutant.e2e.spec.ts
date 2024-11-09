import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import * as request from 'supertest';
import { mutantDnaSuccessMessage } from '../../aplication/service/constants/success-messages.constants';
import { dnaHumanError } from '../../aplication/service/constants/error-messages.constants';

describe('Mutant [/mutant]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  describe('POST create DNA [POST /mutant]', () => {
    it('should return DNA is mutant', async () => {
      return request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(mutantDnaSuccessMessage);
        });
    });

    it('should return DNA is not mutant', async () => {
      return request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['TTGCGA', 'AACAGC', 'CCATAT', 'AATCCG', 'CCCTTA', 'CCAATG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(dnaHumanError);
        });
    });
  });

  describe('GET DNA stats [GET /mutant/stats]', () => {
    it('should return DNA stats with a ratio of 0.6', async () => {
      request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(mutantDnaSuccessMessage);
        });

      request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['ATGCGA', 'CAGTAC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TTTTAG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(mutantDnaSuccessMessage);
        });

      request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['CTGCGA', 'CAGTAC', 'TTATGT', 'AGAAGG', 'CTCCTA', 'TATTAG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(dnaHumanError);
        });

      request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['TTGCGA', 'AACAGC', 'CCATAT', 'AATCCG', 'CCCTTA', 'CCAATG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(dnaHumanError);
        });

      request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['ATGCGA', 'AAGTAC', 'TTGTGT', 'AGAAGG', 'CTCCTA', 'TATTAG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(dnaHumanError);
        });

      request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: ['ATGCGG', 'AAGCAC', 'TAGTGT', 'AGTAGG', 'CTCCTA', 'TGTTAG'],
        })
        .then(({ body }) => {
          expect(body.message).toBe(dnaHumanError);
        });

      return request(app.getHttpServer())
        .get('/mutant/stats')
        .then(({ body }) => {
          expect(body.count_mutant_dna).toBe(3);
          expect(body.count_human_dna).toBe(5);
          expect(body.ratio).toBe(0.6);
        });
    });
  });
});
