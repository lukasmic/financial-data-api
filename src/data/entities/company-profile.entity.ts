import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('company_profiles')
export class CompanyProfile {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  ticker: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  companyname: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sector: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  industry: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string | null;
}
