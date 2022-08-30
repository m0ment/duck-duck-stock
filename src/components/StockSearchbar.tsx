import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Searchbar from './core/Searchbar';

interface StockSearchbarProps {
  className?: string;
}

const StockSearchbar = ({ className }: StockSearchbarProps) => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  return (
    <form className={className} method='GET' action='/'>
      <Searchbar
        name='q'
        value={query}
        onChange={setQuery}
        results={[]}
        renderItem={(item) => item}
      />
    </form>
  );
};

export default StockSearchbar;
