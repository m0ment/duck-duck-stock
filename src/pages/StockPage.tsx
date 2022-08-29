import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import useFetch from '@hooks/useFetch';
import type { TimeSeriesDailyResponse } from 'types/TimeSeriesDailyResponse';

interface StockPageProps {
  symbol: string;
}

const StockPage = ({ symbol }: StockPageProps) => {
  const { data, error } = useFetch<TimeSeriesDailyResponse>(
    timeSeriesDailyURL(symbol)
  );

  if (error) {
    return (
      <PageLayout>
        <p>Ups... Something went wrong</p>
      </PageLayout>
    );
  }

  if (!data) {
    return (
      <PageLayout>
        <p>Loading...</p>
      </PageLayout>
    );
  }

  if ('Error Message' in data) {
    return (
      <PageLayout>
        <p>Invalid Symbol... Please try again</p>;
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <pre>{JSON.stringify(data['Time Series (Daily)'], null, 2)}</pre>
    </PageLayout>
  );
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className='flex items-center border border-b-gray-300 bg-white px-4 pt-4 pb-3'>
        <Link className='flex h-full w-16 items-center justify-center' to='/'>
          <img src='/duck.svg' className='h-10 w-10' />
        </Link>
        <div className='ml-4 h-11 w-[70%] max-w-lg rounded-xl border border-gray-200 bg-white shadow-sm focus-within:shadow-md hover:shadow-md'>
          <input
            className='h-full w-full border-0 bg-transparent p-0 pr-2 pl-4 text-gray-800 placeholder:text-gray-400 focus:ring-0'
            type='text'
            placeholder='Search...'
          />
        </div>
      </header>
      <main>{children}</main>
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
