import clsx from 'clsx';
import React from 'react';

export type DividerProps = JSX.IntrinsicElements['div'] & {
  //
};

export const Divider = ({ className, ...restProps }: DividerProps) => {
  return <div className={clsx('border-b border-gray-200', className)} {...restProps}></div>;
};
