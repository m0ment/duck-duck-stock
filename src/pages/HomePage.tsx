import StockSearchbar from '@components/StockSearchbar';

const HomePage = () => {
  return (
    <main className='relative h-screen w-screen bg-neutral-50'>
      {/* Container */}
      <div className='absolute inset-x-0 top-[20%] flex flex-col items-center'>
        {/* Duck */}
        <div className='relative'>
          <img src='/duck.svg' className='h-32 w-32' />
          <div className='absolute left-[64px] -top-[12px] h-2 w-2 rounded-full bg-emerald-500/50' />
          <div className='absolute left-[72px] -top-[32px] h-4 w-4 rounded-full bg-emerald-500/75' />
          <div className='absolute left-[88px] -top-[64px] w-max rounded-xl bg-emerald-500 py-1 px-3 font-semibold text-white'>
            Quack quack
          </div>
        </div>
        <h1 className='mt-4 text-4xl font-bold tracking-tight'>
          <span className='text-gray-800'>DuckDuck</span>
          <span className='text-emerald-500'>Stock</span>
        </h1>
        <StockSearchbar autoFocus className='mt-4 w-[72%] max-w-lg' />
      </div>
    </main>
  );
};

export default HomePage;
