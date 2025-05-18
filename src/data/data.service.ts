import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RetrieveDatumDto } from './dto/retrieve-datum.dto';
import { RuleEngineService } from './engine-services/rule-engine.service';
import { DynamicRepositoryService } from './repository/dynamic-repository.service';
import { DataQueryService } from './queries/data-query.service';

@Injectable()
export class DataService {
  constructor(
    private readonly ruleEngineService: RuleEngineService,
    private readonly repositoryService: DynamicRepositoryService,
    private readonly queryService: DataQueryService,
  ) {}

  async findData(retrieveModel: RetrieveDatumDto): Promise<any> {
    const { tableClass, events } =
      await this.ruleEngineService.determineTableClass(
        retrieveModel.table,
        retrieveModel.dataPoint,
      );

    if (events.length !== 1) {
      throw new BadRequestException(
        `An internal error occurred during table selection. Expected 1 event, but got ${events.length}.`,
      );
    }

    if (!tableClass) {
      throw new NotFoundException(
        `Invalid table/column combination: table='${retrieveModel.table}', column='${retrieveModel.dataPoint}'.`,
      );
    }

    const repository = this.repositoryService.getRepositoryForClass(tableClass);

    return this.queryService.executeQuery(repository, retrieveModel);
  }
}
