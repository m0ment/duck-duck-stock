import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useDebounce from '@hooks/useDebounce';
import searchStockSymbols from '@api/searchStocks';
import Searchbar from './core/Searchbar';

interface StockResult {
  symbol: string;
  company: string;
}

interface StockSearchbarProps {
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

const StockSearchbar = ({
  placeholder,
  autoFocus,
  className,
}: StockSearchbarProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 275);

  const { data: searchResults } = useQuery(
    ['stock-search', debouncedQuery],
    () => searchStockSymbols(debouncedQuery),
    { initialData: [], enabled: Boolean(debouncedQuery) }
  );

  const handleItemSelect = (item: StockResult) => {
    setQuery(item.symbol);

    setTimeout(() => formRef.current?.submit(), 50);
  };

  return (
    <form ref={formRef} className={className} method='GET' action='/'>
      <Searchbar
        name='symbol'
        value={query}
        results={searchResults}
        placeholder={placeholder}
        autoFocus={autoFocus}
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

export default StockSearchbar;
