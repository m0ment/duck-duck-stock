import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import cx from 'classix';

import useDebounce from '@hooks/useDebounce';
import searchStockSymbols, { StockSearchResult } from '@api/searchStocks';
import { SearchIcon } from '@assets/icons';
import Autocomplete from './core/Autocomplete';

interface StockSearchbarProps {
  placeholder?: string;
  initialFocus?: boolean;
  className?: string;
}

const StockSearchbar = ({
  placeholder,
  initialFocus,
  className,
}: StockSearchbarProps) => {
  const [, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 275);

  const { data: searchResults, isFetching } = useQuery(
    ['stock-search', debouncedQuery],
    () => searchStockSymbols(debouncedQuery),
    { initialData: [], enabled: Boolean(debouncedQuery) }
  );

  const handleOptionSelect = (option: StockSearchResult) => {
    setQuery('');

    setSearchParams({ symbol: option.symbol });
  };

  return (
    <Autocomplete
      className={className}
      icon={SearchIcon}
      placeholder={placeholder}
      initialFocus={initialFocus}
      loading={isFetching}
      displayValue={(stock) => stock?.symbol ?? ''}
      onChange={handleOptionSelect}
      inputValue={query}
      onInputChange={setQuery}
      options={searchResults}
      renderOption={(item, { active }) => (
        <div className='flex flex-col'>
          <span
            className={cx(
              'font-semibold',
              active ? 'text-white' : 'text-gray-800'
            )}
          >
            {item.symbol}
          </span>
          <span
            className={cx(
              'text-sm',
              active ? 'text-emerald-100' : 'text-gray-400'
            )}
          >
            {item.company}
          </span>
        </div>
      )}
    />
  );
};

export default StockSearchbar;
