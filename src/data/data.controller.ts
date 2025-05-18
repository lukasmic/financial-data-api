import { Controller, Get, Param, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { RetrieveDatumDto } from './dto/retrieve-datum.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':table')
  async findOne(
    @Param('table') table: string,
    @Query('dataPointName') dataPoint: string,
    @Query('tickerName') ticker: string,
  ): Promise<any> {
    const retrieveModel: RetrieveDatumDto = {
      companyTickerName: ticker,
      dataPoint: dataPoint,
      table: table,
    };

    return this.dataService.findData(retrieveModel);
  }
}
