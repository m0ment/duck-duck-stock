import { useSearchParams } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';

const App = () => {
  const [searchParams] = useSearchParams();

  const symbol = searchParams.get('symbol');
  if (symbol) {
    return <StockPage symbol={symbol} />;
  }

  return <HomePage />;
};

export default App;
