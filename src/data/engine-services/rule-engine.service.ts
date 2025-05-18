import { Injectable } from '@nestjs/common';
import { dataRules } from 'data.rules';
import { Engine, Event } from 'json-rules-engine';

export interface TableQueryResult {
  tableClass: string;
  events: Event[];
}

@Injectable()
export class RuleEngineService {
  private engine: Engine;

  constructor() {
    this.initializeEngine();
  }

  private initializeEngine(): void {
    this.engine = new Engine();
    dataRules.forEach((rule) => this.engine.addRule(rule));
  }

  async determineTableClass(
    table: string,
    column: string,
  ): Promise<TableQueryResult> {
    const { events } = await this.engine.run({
      table: table,
      column: column,
    });

    const tableQueryEvent = events.find(
      (event: Event) => event.type === 'query_table',
    );

    return {
      tableClass: tableQueryEvent?.params?.tableClass as string,
      events,
    };
  }
}
