import { CompanyProfile } from './company-profile.entity';
import { LatestStockPrice } from './lastest-stock-price.entity';
import { LatestAnnualFundamental } from './latest-annual-fundamental.entity';

export const entityClassMap: Record<string, any> = {
  CompanyProfile,
  LatestStockPrice,
  LatestAnnualFundamental,
};
