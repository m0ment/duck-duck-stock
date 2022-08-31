import { parseISO } from 'date-fns';
import { entries, sortBy } from 'lodash';

import { ApiError, ApiLimitError } from './api-errors';

async function getStockTimeSeries(symbol: string) {
  const response = await fetch(timeSeriesDailyURL(symbol));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as TimeSeriesDailyResponse;

  if ('Error Message' in data) {
    throw new Error(data['Error Message']);
  }

  if ('Note' in data) {
    throw new Error(data['Note']);
  }

  const stockTimeSeries = entries(data['Time Series (Daily)']).map(
    ([day, data]): StockDataPoint => ({
      day: parseISO(day),
      open: Number(data['1. open']),
      hight: Number(data['2. high']),
      low: Number(data['3. low']),
      close: Number(data['4. close']),
    })
  );

  return sortBy(stockTimeSeries, (dataPoint) => dataPoint.day);
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

export interface StockDataPoint {
  day: Date;
  open: number;
  hight: number;
  low: number;
  close: number;
}

type TimeSeriesDailyResponse =
  | ApiError
  | ApiLimitError
  | TimeSeriesDailySuccessResponse;

interface TimeSeriesDailySuccessResponse {
  'Meta Data': MetaData;
  'Time Series (Daily)': TimeSeriesDaily;
}

interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}

interface TimeSeriesDaily {
  [day: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}