interface StockPageProps {
  symbol: string;
}

const StockPage = ({ symbol }: StockPageProps) => {
  return <div>{`Symbol is ${symbol}`}</div>;
};

export default StockPage;
