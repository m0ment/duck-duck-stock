import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import getCompanyOverview, { CompanyOverview } from '@api/getCompanyOverview';
import getStockTimeSeries, { StockTimeSeries } from '@api/getStockTimeSeries';
import { ApiError } from '@api/errors';
import { SpinnerIcon } from '@assets/icons';
import StockChart from '@components/StockChart';
import StockSearchbar from '@components/StockSearchbar';
import StockOverview from '@components/StockOverview';

interface StockPageProps {
  symbol: string;
}

const StockPage = ({ symbol }: StockPageProps) => {
  const { data, error, isError, isLoading } = useQuery<
    [CompanyOverview, StockTimeSeries],
    ApiError
  >(
    ['stock-details', symbol],
    () => Promise.all([getCompanyOverview(symbol), getStockTimeSeries(symbol)]),
    { staleTime: Infinity }
  );

  return (
    <div className='flex h-screen w-screen flex-col divide-y divide-gray-200 bg-white'>
      <header className='relative py-4 pl-16'>
        <Link to='/' className='flex w-16 items-center justify-center py-[3px]'>
          <img src='/duck.svg' className='h-10 w-10' />
        </Link>
        <StockSearchbar
          className='absolute top-4 z-10 ml-20 w-[72%] max-w-lg'
          placeholder='Look for another stock'
        />
      </header>
      <main className='flex-grow'>
        {isLoading && (
          <div className='flex h-full items-center justify-center'>
            <div role='status'>
              <SpinnerIcon className='h-16 w-16 animate-spin fill-emerald-500 text-gray-200' />
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        {isError && (
          <div className='mx-auto max-w-screen-lg py-16 px-6 text-center'>
            <h1 className='mb-4 text-7xl font-extrabold tracking-tight text-emerald-500'>
              {error.statusCode}
            </h1>
            <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900'>
              Oh duck!
            </p>
            <p className='mb-4 whitespace-pre-line text-lg font-light text-gray-500'>
              {error.message}
            </p>
          </div>
        )}
        {data && (
          <div className='flex h-full divide-x divide-gray-200'>
            <StockOverview
              symbol={symbol}
              companyOverview={data[0]}
              className='w-96 p-4'
            />
            <div className='flex flex-1 items-center justify-center'>
              <StockChart className='w-[80%]' stockTimeSeries={data[1]} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StockPage;
