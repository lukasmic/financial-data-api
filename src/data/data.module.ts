import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfile } from './entities/company-profile.entity';
import { LatestAnnualFundamental } from './entities/latest-annual-fundamental.entity';
import { LatestStockPrice } from './entities/lastest-stock-price.entity';
import { DataQueryService } from './queries/data-query.service';
import { DynamicRepositoryService } from './repository/dynamic-repository.service';
import { RuleEngineService } from './engine-services/rule-engine.service';

@Module({
  controllers: [DataController],
  providers: [
    DataService,
    RuleEngineService,
    DynamicRepositoryService,
    DataQueryService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      CompanyProfile,
      LatestStockPrice,
      LatestAnnualFundamental,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DataModule {}
