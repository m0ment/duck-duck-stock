export const LimitErrorMessage =
  "Unfortunately Alpha Vantage API's call frequency is 5 calls per minute and 500 calls per day 😢.\nPlease play with a 🦆 for one minute or one day and then come back 😁.";

export const SymbolNotFoundMessage =
  "Our trusty 🦆 couldn't find the symbol you were looking for 🤔.\nNext time give us a valid symbol please 😁.";

export type WithApiErrors<T> = InvalidCallError | ApiLimitError | T;

interface InvalidCallError {
  'Error Message': string;
}

interface ApiLimitError {
  Note: string;
}

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
  }
}
