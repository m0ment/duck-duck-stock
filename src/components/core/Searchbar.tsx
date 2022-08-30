import { ReactNode, useRef } from 'react';
import cx from 'classix';

import { SearchIcon, XMarkIcon } from '@assets/icons';

interface SearchbarProps<T> {
  value: string;
  results: T[];
  name?: string;
  placeholder?: string;
  className?: string;
  renderItem: (item: T) => ReactNode;
  onItemSelect?: (item: T, index: number) => void;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

const Searchbar = <T,>({
  value,
  results,
  name,
  placeholder,
  className,
  renderItem,
  onItemSelect,
  onChange,
  onSubmit,
}: SearchbarProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isEmpty = !value;

  const handleChange = (value: string) => {
    onChange && onChange(value);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(value);
  };

  const handleClear = () => {
    // Keep the focus on input
    inputRef.current?.focus();

    handleChange('');
  };

  const handleItemSelect = (item: T, index: number) => {
    onItemSelect && onItemSelect(item, index);
  };

  return (
    <div
      className={cx(
        'group divide-y divide-gray-300 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md hover:shadow-lg focus:shadow-lg',
        className
      )}
    >
      <div className='flex h-11 items-center justify-center'>
        <input
          ref={inputRef}
          type='text'
          name={name}
          placeholder={placeholder}
          className='h-full flex-1 border-0 bg-transparent p-0 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0'
          value={value}
          onChange={(event) => handleChange(event.target.value)}
        />
        <div className='inline-flex h-full shrink-0'>
          <button
            disabled={isEmpty}
            onClick={handleClear}
            className='inline-flex w-8 items-center justify-center text-black/50 transition-colors duration-200 hover:text-black disabled:text-transparent'
          >
            <XMarkIcon className='h-5 w-5' />
          </button>
          <button
            type='submit'
            disabled={isEmpty}
            onClick={handleSubmit}
            className='inline-flex w-12 items-center justify-center bg-emerald-500 text-white transition-colors duration-200 hover:bg-emerald-600 disabled:bg-transparent disabled:text-black/50'
          >
            <SearchIcon className='h-6 w-6' />
          </button>
        </div>
      </div>

      {!isEmpty && results.length > 0 && (
        <ul className='hidden max-h-52 overflow-y-auto py-2 group-focus-within:block'>
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemSelect(item, index)}
              className='px-4 py-1 text-gray-800 hover:bg-gray-100 hover:font-semibold'
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
