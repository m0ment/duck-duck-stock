import { Link } from 'react-router-dom';

const NoMatchPage = () => {
  return (
    <div className='h-screen w-screen bg-neutral-50'>
      <div className='mx-auto max-w-screen-xl py-16 px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl font-extrabold tracking-tight text-emerald-500'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900'>
            Whoops! That page doesn&apos;t exist.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500'>
            You&apos;ll find lots to explore on the home page.
          </p>
          <Link
            to='/'
            replace
            className='mt-4 inline-flex rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300'
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoMatchPage;
