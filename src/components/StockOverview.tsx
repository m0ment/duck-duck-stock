import { CompanyOverview } from '@api/getCompanyOverview';

interface StockOverviewProps {
  companyOverview: CompanyOverview;
  className?: string;
}

const StockOverview = ({ companyOverview, className }: StockOverviewProps) => {
  return (
    <div className={className}>
      <section className='mb-4 flex flex-col'>
        <h1 className='mb-4 text-4xl font-extrabold tracking-wide text-emerald-500'>
          {companyOverview.symbol}
        </h1>
        <span className='text-lg font-semibold text-gray-900'>
          {companyOverview.name}
        </span>
        <span className='text-xs text-gray-400'>
          {`${companyOverview.sector} • ${companyOverview.industry}`}
        </span>
      </section>

      <section className='flex flex-col'>
        <h1 className='mb-1 font-medium text-gray-900'>Description</h1>
        <p className='text-sm text-gray-800'>{companyOverview.description}</p>
      </section>
    </div>
  );
};

export default StockOverview;
