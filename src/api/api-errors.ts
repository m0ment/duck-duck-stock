export const LimitErrorMessage =
  "Unfortunately Alpha Vantage API's call frequency lets us do 5 calls per minute and 500 calls per day 😔.\nPlease play with a 🦆 for 1 minute and then come back.";

export type WithApiErrors<T> = ApiError | ApiLimitError | T;

interface ApiError {
  'Error Message': string;
}

interface ApiLimitError {
  Note: string;
}
