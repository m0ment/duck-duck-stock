import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import useElementSize from '@hooks/useElementSize';
import getCompanyOverview from '@api/getCompanyOverview';
import getStockTimeSeries from '@api/getStockTimeSeries';
import { SpinnerIcon } from '@assets/icons';
import StockChart from '@components/StockChart';
import StockSearchbar from '@components/StockSearchbar';
import StockOverview from '@components/StockOverview';

interface StockPageProps {
  query: string;
}

const StockPage = ({ query }: StockPageProps) => {
  const [chartContainerRef, chartContainerSize] = useElementSize();

  const { data, isError, isLoading } = useQuery(['stock-details', query], () =>
    Promise.all([getCompanyOverview(query), getStockTimeSeries(query)])
  );

  if (isLoading) {
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

  if (isError) {
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

  const [companyOverview, stockTimeSeries] = data;

  return (
    <PageLayout>
      <div className='flex h-full divide-x divide-gray-200'>
        <StockOverview companyOverview={companyOverview} className='w-96 p-4' />
        <div className='flex-1 p-4'>
          <div
            ref={chartContainerRef}
            className='flex h-full items-center justify-center'
          >
            <StockChart
              data={stockTimeSeries}
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

export default StockPage;
