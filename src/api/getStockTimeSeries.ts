import { parseISO } from 'date-fns';
import { entries, first, last, sortBy } from 'lodash';

import { LimitErrorMessage, WithApiErrors } from './api-errors';

async function getStockTimeSeries(symbol: string): Promise<StockTimeSeries> {
  const response = await fetch(timeSeriesDailyURL(symbol));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as WithApiErrors<TimeSeriesResponse>;

  if ('Error Message' in data) {
    throw new Error(data['Error Message']);
  }

  if ('Note' in data) {
    throw new Error(LimitErrorMessage);
  }

  const stockDataPoints = sortBy(
    entries(data['Time Series (Daily)']).map(
      ([day, data]): StockDataPoint => ({
        day: parseISO(day),
        open: Number(data['1. open']),
        hight: Number(data['2. high']),
        low: Number(data['3. low']),
        close: Number(data['4. close']),
      })
    ),
    (dataPoint) => dataPoint.day
  );

  return {
    meta: {
      startDate: first(stockDataPoints)?.day ?? new Date(),
      endDate: last(stockDataPoints)?.day ?? new Date(),
    },
    data: stockDataPoints,
  };
}

function timeSeriesDailyURL(symbol: string) {
  const searchParams = new URLSearchParams({
    apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
    function: 'TIME_SERIES_DAILY',
    outputsize: 'compact',
    symbol,
  });

  return `https://www.alphavantage.co/query?${searchParams.toString()}`;
}

export default getStockTimeSeries;

/* Types */

export interface StockTimeSeries {
  meta: TimeSeriesMetaData;
  data: StockDataPoint[];
}

export interface TimeSeriesMetaData {
  startDate: Date;
  endDate: Date;
}

export interface StockDataPoint {
  day: Date;
  open: number;
  hight: number;
  low: number;
  close: number;
}

/* Response */

interface TimeSeriesResponse {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
  };
  'Time Series (Daily)': {
    [day: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
}
