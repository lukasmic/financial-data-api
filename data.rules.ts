export const dataRules = [
  {
    conditions: {
      all: [
        { fact: 'table', operator: 'equal', value: 'company_profiles' },
        {
          fact: 'column',
          operator: 'in',
          value: ['companyname', 'sector', 'industry', 'country'],
        },
      ],
    },
    event: {
      type: 'query_table',
      params: {
        tableClass: 'CompanyProfile',
      },
    },
  },
  {
    conditions: {
      all: [
        { fact: 'table', operator: 'equal', value: 'latest_stock_prices' },
        {
          fact: 'column',
          operator: 'in',
          value: ['price', 'timestamp', 'volume', 'ticker'],
        },
      ],
    },
    event: {
      type: 'query_table',
      params: {
        tableClass: 'LatestStockPrice',
      },
    },
  },
  {
    conditions: {
      all: [
        {
          fact: 'table',
          operator: 'equal',
          value: 'latest_annual_fundamentals',
        },
      ],
    },
    event: {
      type: 'query_table',
      params: {
        tableClass: 'LatestAnnualFundamental',
      },
    },
  },
];
