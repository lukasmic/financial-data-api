import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyProfile } from './entities/company-profile.entity';
import { Repository } from 'typeorm';
import { RetrieveDatumDto } from './dto/retrieve-datum.dto';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(CompanyProfile)
    private readonly companyProfileRepository: Repository<CompanyProfile>,
  ) {}

  findData(retrieveModel: RetrieveDatumDto): Promise<CompanyProfile> {
    return this.companyProfileRepository.findOne({
      where: { ticker: retrieveModel.companyTickerName },
    });
  }
}
