import clsx from 'clsx';
import React from 'react';
import { StringUtils } from '../../utils';
import { Button } from '../Button';
import { useDropdownContext } from './DropdownProvider';

export type SelectedDropdownItem<TValue extends number | string> = {
  value: TValue;
  label?: string;
};

export type DropdownItemProps<TValue extends number | string> = JSX.IntrinsicElements['button'] & {
  value: TValue;
  label?: string;
};

export const DropdownItem = <TValue extends number | string>({
  className,
  value: valueProp,
  label,
  onClick,
  onMouseMove,
  ...restProps
}: DropdownItemProps<TValue>) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  const {
    value,
    onSelect,
    onChange,
    selectedItem,
    onClose,
    focusedItemValue,
    focusedItem,
    setFocusedItem,
    setFocusedItemValue,
  } = useDropdownContext();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    onClick?.(e);
    onChange?.(valueProp);
    onClose?.();
  };

  React.useEffect(() => {
    if (value === valueProp && (!selectedItem || selectedItem.value !== value)) {
      onSelect?.({ label, value: valueProp });
    }
  }, [value, valueProp, onSelect, selectedItem, label]);

  React.useEffect(() => {
    if (focusedItemValue === valueProp && (!focusedItem?.value || focusedItem.value !== valueProp)) {
      setFocusedItem?.({ label, value: valueProp });
    }
  }, [focusedItemValue, focusedItem?.value, setFocusedItem, valueProp, value, label]);

  return (
    <Button
      variant='plain'
      ref={ref as any}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('dropdown-item'),
        'block cursor-pointer',
        'w-full py-2 px-4',
        'text-left text-sm',
        { 'bg-gray-100': focusedItemValue === valueProp },
        className
      )}
      onClick={handleClick}
      onMouseMove={e => {
        onMouseMove?.(e);
        setFocusedItemValue(valueProp.toString());
      }}
      data-value={valueProp}
      {...restProps}></Button>
  );
};
