import cx from 'classix';

interface CheckboxProps {
  checked?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ checked, className, onChange }: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  return (
    <input
      type='checkbox'
      checked={checked}
      onChange={handleChange}
      className={cx(
        'h-4 w-4 rounded border border-gray-300 text-emerald-500 focus:ring-0 focus:ring-offset-0',
        className
      )}
    />
  );
};

export default Checkbox;
