import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { DayPicker } from 'react-day-picker';
import { format, startOfMonth } from 'date-fns';
import cx from 'classix';

import { CalendarIcon } from '@assets/icons';

interface DatePickerProps {
  value: Date;
  fromDate?: Date;
  toDate?: Date;
  className?: string;
  onChange?: (value: Date) => void;
}

const DatePicker = ({
  value,
  fromDate,
  toDate,
  className,
  onChange,
}: DatePickerProps) => {
  const handleSelect = (day?: Date) => {
    if (!day) {
      return;
    }

    onChange && onChange(day);
  };

  return (
    <Popover className='relative'>
      <Popover.Button
        className={cx(
          'inline-flex h-10 items-center gap-x-1 rounded-xl border border-gray-300 bg-white px-2 focus:outline-none',
          className
        )}
      >
        <CalendarIcon className='h-5 w-5 shrink-0 text-gray-400' />
        <span className='w-28 font-medium text-gray-900'>
          {format(value, 'd MMM yyyy')}
        </span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-in duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition ease-out duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Popover.Panel className='absolute left-0 z-10 mt-1.5 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-md'>
          {({ close }) => (
            <DayPicker
              mode='single'
              required
              defaultMonth={startOfMonth(value)}
              fromDate={fromDate}
              toDate={toDate}
              selected={value}
              onSelect={(day?: Date) => {
                handleSelect(day);
                close();
              }}
            />
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DatePicker;
