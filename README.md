# Financial data REST API

Demo REST API using `NestJS` to infer financial data table and column set from a rules engine using `json-rules-engine` and queried using `TypeORM`.

Swagger added for API documentation. By default it will be reachable in http://localhost:3000/api.

## Extra setup

The app uses PostgreSQL database with default parameters defined in `.env` file.
Some example tables to query using this application were AI-generated using the following `psql` scripts:

```psql
CREATE TABLE company_profiles (
    ticker VARCHAR(10) PRIMARY KEY, -- Company stock ticker symbol (e.g., 'AAPL', 'GOOGL')
    companyName VARCHAR(255) NOT NULL, -- Full legal company name
    sector VARCHAR(100),            -- Industry sector (can be NULL)
    industry VARCHAR(100),          -- Specific industry (can be NULL)
    country VARCHAR(50)             -- Country of headquarters (can be NULL)
);

CREATE TABLE latest_stock_prices (
    ticker VARCHAR(10) PRIMARY KEY, -- Company stock ticker symbol (Primary Key)
    price NUMERIC(10, 2) NOT NULL,  -- Latest closing or last traded price
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL, -- Timestamp of the latest price
    volume BIGINT                     -- Latest trading volume (can be NULL)
);

CREATE TABLE latest_annual_fundamentals (
    ticker VARCHAR(10) PRIMARY KEY, -- Company stock ticker symbol (Primary Key)
    latestYear INT NOT NULL,        -- The fiscal year of the latest annual report stored
    revenue NUMERIC(18, 2),         -- Total revenue for the latest year (can be NULL)
    netIncome NUMERIC(18, 2),       -- Net income for the latest year (can be NULL)
    eps NUMERIC(10, 2)              -- Earnings per share for the latest year (can be NULL)
);

INSERT INTO company_profiles (ticker, companyName, sector, industry, country) VALUES
('AAPL', 'Apple Inc.', 'Technology', 'Consumer Electronics', 'United States'),
('GOOGL', 'Alphabet Inc.', 'Technology', 'Internet Content & Services', 'United States'),
('MSFT', 'Microsoft Corporation', 'Technology', 'Software - Infrastructure', 'United States'),
('AMZN', 'Amazon.com, Inc.', 'Consumer Discretionary', 'Internet Retail', 'United States'),
('TSLA', 'Tesla, Inc.', 'Consumer Discretionary', 'Auto Manufacturers', 'United States');

INSERT INTO latest_annual_fundamentals (ticker, latestYear, revenue, netIncome, eps) VALUES
('AAPL', 2024, 387536000000.00, 101936000000.00, 6.21),
('GOOGL', 2024, 311046000000.00, 86980000000.00, 5.95),
('MSFT', 2024, 240110000000.00, 74307000000.00, 9.98),
('AMZN', 2024, 574785000000.00, 37000000000.00, 3.50), -- Note: AMZN's net income can fluctuate
('TSLA', 2024, 105000000000.00, 15000000000.00, 4.50); -- Hypothetical data

INSERT INTO latest_stock_prices (ticker, price, timestamp, volume) VALUES
('AAPL', 175.85, '2025-05-17 16:00:00+00', 75123456),
('GOOGL', 159.40, '2025-05-17 16:00:00+00', 45678901),
('MSFT', 426.10, '2025-05-17 16:00:00+00', 55789123),
('AMZN', 185.50, '2025-05-17 16:00:00+00', 68901234),
('TSLA', 178.90, '2025-05-17 16:00:00+00', 120345678);
```
