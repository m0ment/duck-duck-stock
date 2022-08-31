export type StockSearchResponse =
  | StockSearchSuccessResponse
  | StockSearchErrorResponse;

export interface StockSearchErrorResponse {
  Note: string;
}

export interface StockSearchSuccessResponse {
  bestMatches: StockSearchMatch[];
}

export interface StockSearchMatch {
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
