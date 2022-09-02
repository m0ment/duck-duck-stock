import { FC, SVGProps, useEffect, useRef } from 'react';
import { Combobox } from '@headlessui/react';
import cx from 'classix';

import { SpinnerIcon } from '@assets/icons';

interface AutocompleteProps<T> {
  value?: T;
  inputValue?: string;
  options: T[];
  name?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  placeholder?: string;
  initialFocus?: boolean;
  loading?: boolean;
  className?: string;
  displayValue: (value: T | null) => string;
  renderOption: (option: T, state: { active: boolean }) => JSX.Element;
  onChange?: (value: T) => void;
  onInputChange?: (value: string) => void;
}

const Autocomplete = <T,>({
  value,
  inputValue,
  options,
  name,
  icon: Icon,
  placeholder,
  initialFocus,
  loading,
  className,
  displayValue,
  renderOption,
  onChange,
  onInputChange,
}: AutocompleteProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: T) => {
    inputRef.current?.blur();

    onChange && onChange(value);
  };

  const handleInputChange = (value: string) => {
    onInputChange && onInputChange(value);
  };

  useEffect(() => {
    if (initialFocus) {
      inputRef.current?.focus();
    }
  }, [initialFocus]);

  return (
    <Combobox value={value} onChange={handleChange} name={name}>
      <div
        className={cx(
          'divide-y divide-gray-300 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md focus-within:shadow-lg hover:shadow-lg',
          className
        )}
      >
        <div className='relative'>
          <Combobox.Input
            className='h-11 w-full border-0 bg-transparent p-0 pl-10 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0'
            ref={inputRef}
            type='text'
            placeholder={placeholder}
            autoComplete='off'
            onChange={(event) => handleInputChange(event.target.value)}
            displayValue={displayValue}
          />
          {(Icon || loading) && (
            <div className='pointer-events-none absolute inset-y-0 left-2 flex items-center'>
              {loading ? (
                <SpinnerIcon className='h-6 w-6 animate-spin fill-emerald-500 text-gray-200' />
              ) : (
                Icon && <Icon className='h-6 w-6 text-emerald-500' />
              )}
            </div>
          )}
        </div>

        {options.length > 0 && !loading && (
          <Combobox.Options static className='max-h-96 overflow-y-auto py-2'>
            {options.map((option, index) => (
              <Combobox.Option
                className={({ active }) =>
                  cx('cursor-pointer px-4 py-2', active && 'bg-emerald-500')
                }
                key={index}
                value={option}
              >
                {({ active }) => renderOption(option, { active })}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}

        {inputValue && options.length === 0 && !loading && (
          <p className='p-4 text-sm text-gray-500'>No results found.</p>
        )}
      </div>
    </Combobox>
  );
};

export default Autocomplete;
