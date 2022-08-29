import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div>
      <button onClick={() => setSearchParams({ symbol: 'IBM' })}>
        Click me
      </button>
    </div>
  );
};

export default HomePage;
