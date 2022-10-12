import { CheckIcon } from '@/common/icons';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { Button } from '../Button';

export type SelectOptionProps = {
  value: string;
  label: React.ReactNode;
  selected?: boolean;
  onClick: (value: string) => void;
};

export const SelectOption = ({ value, label, selected, onClick }: SelectOptionProps) => {
  return (
    <Button
      variant='plain'
      className={clsx(
        StringUtils.withProjectClassNamePrefix('select-option'),
        'text-gray-900 relative select-none py-1 px-2 w-full hover:bg-gray-100',
        'flex items-center justify-between'
      )}
      onClick={() => onClick(value)}>
      <span className='font-normal block truncate'>{label}</span>
      {!!selected && <CheckIcon className='text-gray-400' />}
    </Button>
  );
};
