import { ChevronDownIcon } from '@/common/icons';
import { Option, Override } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import { useControllableState, useDisclosure, useOnEventOutside } from 'hsk-headless';
import React from 'react';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { DropdownItem } from '../Dropdown/DropdownItem';

export type SelectProps = Override<
  JSX.IntrinsicElements['div'],
  {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
  }
>;

export const Select = ({ className, options, value: valueProp, onChange, ...restProps }: SelectProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = useControllableState({ value: valueProp, onChange, defaultValue: '' });

  const selectedOption = options.find(option => option.value === value) ?? options[0];

  const disclosure = useDisclosure();

  useOnEventOutside('click', ref, disclosure.close);

  return (
    <div ref={ref} className={clsx(StringUtils.withProjectClassNamePrefix('select'), className)} {...restProps}>
      <Dropdown
        open={disclosure.isOpen}
        trigger={
          <Button
            variant='plain'
            className={clsx(
              'relative block',
              'shadow-sm',
              'text-left sm:text-sm',
              'rounded-md border focus:outline-none focus:ring-1 border-gray-300 focus:border-primary focus:ring-primary',
              'bg-white',
              'w-full h-9 py-2 pl-3 pr-10'
            )}
            onClick={disclosure.toggle}
            aria-haspopup='listbox'
            aria-expanded='true'
            aria-labelledby='listbox-label'>
            <span className='block truncate'>{selectedOption?.label}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400'>
              <ChevronDownIcon />
            </span>
          </Button>
        }>
        {options.map(({ label, value }) => (
          <DropdownItem key={value} value={value}>
            {label}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};
