import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

export type TextAreaProps = JSX.IntrinsicElements['textarea'] & {
  //
};

export const TextArea = React.forwardRef(({ className, rows = 4, ...restProps }: TextAreaProps, ref: any) => {
  return (
    <textarea
      rows={rows}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('textarea'),
        'block w-full',
        'rounded border border-gray-300 shadow-sm focus:border-primary outline-none',
        className
      )}
      ref={ref}
      {...restProps}
    />
  );
});
TextArea.displayName = 'TextArea';
