import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import Searchbar from './core/Searchbar';
import type { StockSearchResponse } from 'types/StockSearchResponse';

interface StockResult {
  symbol: string;
  company: string;
}

interface StockSearchbarProps {
  className?: string;
}

const StockSearchbar = ({ className }: StockSearchbarProps) => {
  const [searchParams] = useSearchParams();

  const formRef = useRef<HTMLFormElement>(null);

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const debouncedQuery = useDebounce(query, 275);

  const { data } = useFetch<StockSearchResponse>(
    debouncedQuery ? stockSearchURL(debouncedQuery) : undefined
  );

  const results = useMemo(() => {
    if (!data || 'Note' in data) {
      return [];
    }

    return data.bestMatches.map(
      (match): StockResult => ({
        symbol: match['1. symbol'],
        company: match['2. name'],
      })
    );
  }, [data]);

  const handleItemSelect = (item: StockResult) => {
    setQuery(item.symbol);

    setTimeout(() => formRef.current?.submit(), 50);
  };

  return (
    <form ref={formRef} className={className} method='GET' action='/'>
      <Searchbar
        name='q'
        value={query}
        results={results}
        onItemSelect={handleItemSelect}
        onChange={setQuery}
        renderItem={(item) => (
          <div className='flex justify-between'>
            <span>{item.symbol}</span>
            <span className='text-gray-500'>{item.company}</span>
          </div>
        )}
      />
    </form>
  );
};

const stockSearchURL = (query: string) => {
  const searchParams = new URLSearchParams({
    apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
    function: 'SYMBOL_SEARCH',
    keywords: query,
  });

  return `https://www.alphavantage.co/query?${searchParams.toString()}`;
};

export default StockSearchbar;
