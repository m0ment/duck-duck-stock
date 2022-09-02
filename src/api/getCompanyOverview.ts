import { LimitErrorMessage, WithApiErrors } from './api-errors';

async function getCompanyOverview(symbol: string): Promise<CompanyOverview> {
  const response = await fetch(companyOverviewURL(symbol));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data =
    (await response.json()) as WithApiErrors<CompanyOverviewResponse>;

  if ('Error Message' in data) {
    throw new Error(data['Error Message']);
  }

  if ('Note' in data) {
    throw new Error(LimitErrorMessage);
  }

  return {
    name: data?.Name,
    description: data?.Description,
    sector: data?.Sector,
    industry: data?.Industry,
  };
}

function companyOverviewURL(symbol: string) {
  const searchParams = new URLSearchParams({
    apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
    function: 'OVERVIEW',
    symbol,
  });

  return `https://www.alphavantage.co/query?${searchParams.toString()}`;
}

export default getCompanyOverview;

/* Types */

export interface CompanyOverview {
  name?: string;
  description?: string;
  sector?: string;
  industry?: string;
}

/* Response */

interface CompanyOverviewResponse {
  Symbol?: string;
  AssetType?: string;
  Name?: string;
  Description?: string;
  CIK?: string;
  Exchange?: string;
  Currency?: string;
  Country?: string;
  Sector?: string;
  Industry?: string;
  Address?: string;
  FiscalYearEnd?: string;
  LatestQuarter?: string;
  MarketCapitalization?: string;
  EBITDA?: string;
  PERatio?: string;
  PEGRatio?: string;
  BookValue?: string;
  DividendPerShare?: string;
  DividendYield?: string;
  EPS?: string;
  RevenuePerShareTTM?: string;
  ProfitMargin?: string;
  OperatingMarginTTM?: string;
  ReturnOnAssetsTTM?: string;
  ReturnOnEquityTTM?: string;
  RevenueTTM?: string;
  GrossProfitTTM?: string;
  DilutedEPSTTM?: string;
  QuarterlyEarningsGrowthYOY?: string;
  QuarterlyRevenueGrowthYOY?: string;
  AnalystTargetPrice?: string;
  TrailingPE?: string;
  ForwardPE?: string;
  PriceToSalesRatioTTM?: string;
  PriceToBookRatio?: string;
  EVToRevenue?: string;
  EVToEBITDA?: string;
  Beta?: string;
  '52WeekHigh'?: string;
  '52WeekLow'?: string;
  '50DayMovingAverage'?: string;
  '200DayMovingAverage'?: string;
  SharesOutstanding?: string;
  DividendDate?: string;
  ExDividendDate?: string;
}
