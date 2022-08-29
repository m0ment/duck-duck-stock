export type TimeSeriesDailyResponse =
  | TimeSeriesDailySuccessResponse
  | TimeSeriesDailyErrorResponse;

export interface TimeSeriesDailyErrorResponse {
  'Error Message': string;
}

export interface TimeSeriesDailySuccessResponse {
  'Meta Data': MetaData;
  'Time Series (Daily)': TimeSeriesDaily;
}

export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}

export interface TimeSeriesDaily {
  [day: string]: DailyData;
}

export interface DailyData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}
