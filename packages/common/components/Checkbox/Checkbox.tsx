import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import { useDisclosure } from 'hsk-headless';
import React from 'react';
import { CheckIcon, MinusIcon } from '../../icons';

export type CheckboxProps = JSX.IntrinsicElements['input'] & {
  label?: React.ReactNode;
  partial?: boolean;
};

export const Checkbox = React.forwardRef(
  ({ className, label, onChange, partial, checked, ...restProps }: CheckboxProps, ref: any) => {
    const checkedDisclosure = useDisclosure();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      onChange?.(e);
      checkedDisclosure.set(e.target.checked);
    };

    const isChecked = checked ?? checkedDisclosure.isOpen;

    const renderInnerIcon = () => {
      if (isChecked) {
        return <CheckIcon className='w-3 h-3 text-primary' />;
      }

      if (partial) {
        return <MinusIcon />;
      }
    };

    return (
      <label
        className={clsx(
          StringUtils.withProjectClassNamePrefix('checkbox'),
          'flex items-center gap-3 cursor-pointer',
          className
        )}>
        <div className='w-4 h-4 flex-shrink-0 rounded-sm border border-solid border-gray-500 text-gray-500 flex items-center justify-center'>
          {renderInnerIcon()}
        </div>
        {!!label && <span className='text-sm'>{label}</span>}
        <input
          type='checkbox'
          {...restProps}
          ref={ref}
          className='minimized'
          onChange={handleChange}
          checked={isChecked}
        />
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
