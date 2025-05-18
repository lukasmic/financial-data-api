import { Controller, Get, Param, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { RetrieveDatumDto } from './dto/retrieve-datum.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':table')
  findOne(
    @Param('tableName') tableName: string,
    @Query('dataPointName') dataPoint: string,
    @Query('tickerName') ticker: string,
  ) {
    const retrieveModel: RetrieveDatumDto = {
      companyTickerName: ticker,
      dataPoint: dataPoint,
      tableName: tableName,
    };

    return this.dataService.findData(retrieveModel);
  }
}
