import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import useFetch from '@hooks/useFetch';
import { SpinnerIcon } from '@assets/icons';
import StockSearchbar from '@components/StockSearchbar';
import type { TimeSeriesDailyResponse } from 'types/TimeSeriesDailyResponse';

interface StockPageProps {
  query: string;
}

const StockPage = ({ query }: StockPageProps) => {
  const { data, error } = useFetch<TimeSeriesDailyResponse>(
    timeSeriesDailyURL(query)
  );

  if (error) {
    return (
      <PageLayout>
        <div className='mx-auto max-w-screen-xl py-16 px-6'>
          <div className='mx-auto max-w-screen-sm text-center'>
            <h1 className='mb-4 text-7xl font-extrabold tracking-tight text-emerald-500'>
              500
            </h1>
            <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900'>
              Something didn&apos;t work quite well.
            </p>
            <p className='mb-4 text-lg font-light text-gray-500'>
              Maybe next time you will be more lucky.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!data) {
    return (
      <PageLayout>
        <div className='flex h-full items-center justify-center'>
          <div role='status'>
            <SpinnerIcon className='h-16 w-16 animate-spin fill-emerald-500 text-gray-200' />
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </PageLayout>
    );
  }

  if ('Error Message' in data) {
    return (
      <PageLayout>
        <p>Invalid Symbol... Please try again</p>
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
    <div className='flex h-screen w-screen flex-col divide-y divide-gray-300 bg-white'>
      <header className='flex shrink-0 items-center py-4 pl-16'>
        <Link to='/' className='flex h-full w-16 items-center justify-center'>
          <img src='/duck.svg' className='h-10 w-10' />
        </Link>
        <StockSearchbar className='ml-4 w-[72%] max-w-lg' />
      </header>
      <main className='flex-grow'>{children}</main>
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
