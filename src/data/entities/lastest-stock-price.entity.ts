import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('latest_stock_prices')
export class LatestPrices {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  ticker: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'timestamp with time zone', nullable: false })
  timestamp: Date;

  @Column({ type: 'bigint', nullable: true })
  volume: string | null;
}
