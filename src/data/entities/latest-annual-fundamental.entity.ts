import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('latest_annual_fundamentals')
export class LatestAnnualFundamental {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  ticker: string;

  @Column({ type: 'int', nullable: false })
  latestYear: number;

  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  revenue: number | null;

  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  netIncome: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  eps: number | null;
}
