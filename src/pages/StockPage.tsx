import useFetch from '@hooks/useFetch';
import type { TimeSeriesDailyResponse } from 'types/TimeSeriesDailyResponse';

interface StockPageProps {
  symbol: string;
}

const StockPage = ({ symbol }: StockPageProps) => {
  const { isLoading, data, error } = useFetch<TimeSeriesDailyResponse>(
    timeSeriesDailyURL(symbol)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Ups... Something went wrong</p>;
  }

  if ('Error Message' in data) {
    return <p>Invalid Symbol... Please try again</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data['Time Series (Daily)'], null, 2)}</pre>
    </div>
  );
};

const timeSeriesDailyURL = (symbol: string) => {
  const searchParams = new URLSearchParams({
    apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
    function: 'TIME_SERIES_DAILY',
    outputsize: 'full',
    symbol,
  });

  return `https://www.alphavantage.co/query?${searchParams.toString()}`;
};

export default StockPage;
