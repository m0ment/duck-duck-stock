import { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { entries, sortBy } from 'lodash';
import { parseISO } from 'date-fns';

import useElementSize from '@hooks/useElementSize';
import useFetch from '@hooks/useFetch';
import { SpinnerIcon } from '@assets/icons';
import StockChart, { StockDataPoint } from '@components/StockChart';
import StockSearchbar from '@components/StockSearchbar';
import type {
  TimeSeriesDaily,
  TimeSeriesDailyResponse,
} from 'types/TimeSeriesDailyResponse';

interface StockPageProps {
  query: string;
}

const StockPage = ({ query }: StockPageProps) => {
  const { data, error } = useFetch<TimeSeriesDailyResponse>(
    timeSeriesDailyURL(query)
  );

  const [chartContainerRef, chartContainerSize] = useElementSize();

  const stockData = useMemo(() => {
    if (!data || 'Error Message' in data) {
      return [];
    }

    return mapTimeSeriesDailyToStockSeries(data['Time Series (Daily)']);
  }, [data]);

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
      <div className='flex h-full divide-x divide-gray-200'>
        <div className='w-96 pl-16 pt-4'>TODO</div>
        <div className='flex-1  p-4'>
          <div
            ref={chartContainerRef}
            className='flex h-full items-center justify-center'
          >
            <StockChart
              data={stockData}
              width={chartContainerSize.width * 0.8}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex h-screen w-screen flex-col divide-y divide-gray-200 bg-white'>
      <header className='relative py-4 pl-16'>
        <Link to='/' className='flex w-16 items-center justify-center py-[3px]'>
          <img src='/duck.svg' className='h-10 w-10' />
        </Link>
        <StockSearchbar className='absolute top-4 ml-20 w-[72%] max-w-lg' />
      </header>
      <main className='flex-grow'>{children}</main>
    </div>
  );
};

const timeSeriesDailyURL = (symbol: string) => {
  const searchParams = new URLSearchParams({
    apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
    function: 'TIME_SERIES_DAILY',
    outputsize: 'compact',
    symbol,
  });

  return `https://www.alphavantage.co/query?${searchParams.toString()}`;
};

export const mapTimeSeriesDailyToStockSeries = (
  timeSeriesDaily: TimeSeriesDaily
): StockDataPoint[] =>
  sortBy(
    entries(timeSeriesDaily).map(([day, data]) => ({
      day: parseISO(day),
      open: Number(data['1. open']),
      hight: Number(data['2. high']),
      low: Number(data['3. low']),
      close: Number(data['4. close']),
    })),
    (point) => point.day
  );

export default StockPage;
