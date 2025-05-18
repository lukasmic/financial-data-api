import { ApiProperty } from '@nestjs/swagger';

export class RetrieveDatumDto {
  @ApiProperty()
  companyTickerName: string;

  @ApiProperty()
  dataPoint: string;

  @ApiProperty()
  tableName: string;
}
