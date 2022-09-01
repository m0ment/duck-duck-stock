import { isAfter, isBefore } from 'date-fns';

export const isInRange = (date: Date, start: Date, end: Date) =>
  !(isBefore(date, start) || isAfter(date, end));
