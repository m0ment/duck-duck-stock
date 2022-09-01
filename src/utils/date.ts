import {
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
} from 'date-fns';

export const isEqual = (dateLeft: Date, dateRight: Date) =>
  isSameYear(dateLeft, dateRight) &&
  isSameMonth(dateLeft, dateRight) &&
  isSameDay(dateLeft, dateRight);

export const isInRange = (date: Date, start: Date, end: Date) =>
  !(isBefore(date, start) || isAfter(date, end));
