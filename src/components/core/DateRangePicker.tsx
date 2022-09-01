import cx from 'classix';

import DatePicker from './DatePicker';

interface DateRangePickerProps {
  fromDate: Date;
  toDate: Date;
  startDate?: Date;
  endDate?: Date;
  className?: string;
  onFromDateChange?: (fromDate: Date) => void;
  onToDateChange?: (toDate: Date) => void;
}

const DateRangePicker = ({
  fromDate,
  toDate,
  startDate,
  endDate,
  className,
  onFromDateChange,
  onToDateChange,
}: DateRangePickerProps) => {
  return (
    <div className={cx('inline-flex gap-x-4', className)}>
      {/* From Date*/}
      <div className='inline-flex items-center gap-x-2'>
        <span className='text-sm font-medium text-neutral-500'>From:</span>
        <DatePicker
          value={fromDate}
          fromDate={startDate}
          toDate={toDate}
          onChange={onFromDateChange}
        />
      </div>
      {/* To Date */}
      <div className='inline-flex items-center gap-x-2'>
        <span className='text-sm font-medium text-neutral-500'>To:</span>
        <DatePicker
          value={toDate}
          fromDate={fromDate}
          toDate={endDate}
          onChange={onToDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
