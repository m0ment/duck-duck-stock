import { useSearchParams } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import StockPage from '@pages/StockPage';

const App = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');
  if (query) {
    return <StockPage query={query} />;
  }

  return <HomePage />;
};

export default App;
