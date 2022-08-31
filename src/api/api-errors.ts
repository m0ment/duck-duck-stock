export type WithApiErrors<T> = ApiError | ApiLimitError | T;

interface ApiError {
  'Error Message': string;
}

interface ApiLimitError {
  Note: string;
}
