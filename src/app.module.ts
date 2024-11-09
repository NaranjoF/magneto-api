import { Module } from '@nestjs/common';
import { MutantModule } from './modules/mutants/mutant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './configuration/orm.configuration';
import { DataSource } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
        extra: {
          timezone: 'UTC',
        },
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    MutantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
