import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

export type LabelProps = JSX.IntrinsicElements['label'] & {
  //
};

export const Label = ({ className, ...restProps }: LabelProps) => {
  return (
    <label
      {...restProps}
      className={clsx(StringUtils.withProjectClassNamePrefix('label'), 'block text-sm font-semibold')}
    />
  );
};
