import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { entityClassMap } from '../entities/entity.map';

@Injectable()
export class DynamicRepositoryService {
  constructor(private readonly dataSource: DataSource) {}

  getRepositoryForClass(tableClass: string): Repository<any> {
    const entityClass = entityClassMap[tableClass] as { new (): any };

    if (!entityClass) {
      throw new InternalServerErrorException(
        `Entity class not found for: ${tableClass}`,
      );
    }

    const repository = this.dataSource.getRepository(entityClass);

    if (!repository) {
      throw new InternalServerErrorException(
        `Repository not found for class: ${tableClass}`,
      );
    }

    return repository;
  }
}
