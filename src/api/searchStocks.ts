import type { ApiError, ApiLimitError } from './api-errors';

async function searchStockSymbol(query: string) {
  const response = await fetch(symbolSearchURL(query));

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as SymbolSearchResponse;

  if ('Error Message' in data) {
    throw new Error(data['Error Message']);
  }

  if ('Note' in data) {
    throw new Error(data['Note']);
  }

  return data.bestMatches.map(
    (match): StockSearchResult => ({
      symbol: match['1. symbol'],
      company: match['2. name'],
    })
  );
}

function symbolSearchURL(query: string) {
  const searchParams = new URLSearchParams({
    apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
    function: 'SYMBOL_SEARCH',
    keywords: query,
  });

  return `https://www.alphavantage.co/query?${searchParams.toString()}`;
}

export default searchStockSymbol;

/* Types */

export interface StockSearchResult {
  symbol: string;
  company: string;
}

type SymbolSearchResponse =
  | ApiError
  | ApiLimitError
  | StockSearchSuccessResponse;

interface StockSearchSuccessResponse {
  bestMatches: StockSearchMatch[];
}

interface StockSearchMatch {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}
