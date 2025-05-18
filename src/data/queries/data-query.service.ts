import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { RetrieveDatumDto } from '../dto/retrieve-datum.dto';

@Injectable()
export class DataQueryService {
  async executeQuery(
    repository: Repository<any>,
    retrieveModel: RetrieveDatumDto,
  ): Promise<any> {
    try {
      const queryBuilder = repository.createQueryBuilder(retrieveModel.table);

      queryBuilder.select(
        `${retrieveModel.table}.${retrieveModel.dataPoint}`,
        'dataPointValue',
      );

      queryBuilder.where(`${retrieveModel.table}.ticker = :ticker`, {
        ticker: retrieveModel.companyTickerName,
      });

      const result: ObjectLiteral | undefined = await queryBuilder.getRawOne();

      if (!result) {
        throw new NotFoundException(
          `Data not found for ticker '${retrieveModel.companyTickerName}' in table '${retrieveModel.table}'.`,
        );
      }

      return result.dataPointValue;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `An error occurred while fetching data: ${error}`,
      );
    }
  }
}
