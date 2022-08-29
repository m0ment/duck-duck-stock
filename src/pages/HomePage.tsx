import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div>
      <button onClick={() => setSearchParams({ symbol: '1234' })}>
        Click me
      </button>
    </div>
  );
};

export default HomePage;
