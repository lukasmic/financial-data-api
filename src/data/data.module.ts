import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfile } from './entities/company-profile.entity';

@Module({
  controllers: [DataController],
  providers: [DataService],
  imports: [TypeOrmModule.forFeature([CompanyProfile])],
  exports: [TypeOrmModule],
})
export class DataModule {}
