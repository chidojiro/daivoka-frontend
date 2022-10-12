import clsx from 'clsx';
import { Popper, PopperProps } from 'hsk-headless';
import React from 'react';
import { Children, ClassName, Override } from '../../types';
import { SelectedDropdownItem } from './DropdownItem';
import { DropdownProvider, DropdownProviderValue } from './DropdownProvider';
import { StringUtils } from '@/common/utils';

export type DropdownProps<TValue extends number | string> = Override<
  PopperProps,
  Children &
    ClassName & {
      value?: TValue;
      onChange?: (value: TValue) => void;
      onSelect?: (item: SelectedDropdownItem<TValue> | undefined) => void;
    }
>;

const getValueAttribute = (element?: Element) => element?.getAttribute('data-value') ?? '';

export const Dropdown = <TValue extends number | string>({
  children,
  className,
  value,
  placement = 'bottom-start',
  onSelect,
  onChange,
  open,
  onClose,
  ...restProps
}: DropdownProps<TValue>) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [focusedItemValue, setFocusedItemValue] = React.useState('');

  const [focusedItem, setFocusedItem] = React.useState<SelectedDropdownItem<TValue>>();

  const [selectedItem, setSelectedItem] = React.useState<SelectedDropdownItem<TValue>>();

  const handleSelect = React.useCallback(
    (item?: SelectedDropdownItem<TValue>) => {
      setSelectedItem(item);
      onSelect?.(item);
    },
    [onSelect]
  );

  React.useEffect(() => {
    if (!open && selectedItem?.value === value) {
      handleSelect(selectedItem);
    }
  }, [open, handleSelect, selectedItem, value]);

  React.useEffect(() => {
    if (!value) {
      setSelectedItem(undefined);
    }
  }, [value]);

  React.useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    setFocusedItemValue(getValueAttribute(document.getElementsByClassName('__dropdown-item')?.[0]));
  }, [open]);

  React.useEffect(() => {
    const navigateWithKeyboard = (e: KeyboardEvent) => {
      if (!open) {
        return;
      }

      switch (e.code) {
        case 'ArrowUp': {
          const previousSibling = ref.current?.querySelector(`[data-value='${focusedItemValue}']`)
            ?.previousElementSibling as HTMLButtonElement;

          if (!previousSibling) return;

          setFocusedItemValue(getValueAttribute(previousSibling));
          previousSibling.scrollIntoView({ block: 'nearest' });

          return;
        }
        case 'ArrowDown': {
          const nextSibling = ref.current?.querySelector(`[data-value='${focusedItemValue}']`)
            ?.nextElementSibling as HTMLButtonElement;

          if (!nextSibling) return;

          setFocusedItemValue(getValueAttribute(nextSibling));
          nextSibling.scrollIntoView({ block: 'nearest' });

          return;
        }
        case 'Tab':
        case 'Enter':
          e.preventDefault();
          e.stopPropagation();

          if (focusedItem?.value) {
            onChange?.(focusedItem.value);
          }
          onClose?.();
          return;
        default:
          return;
      }
    };

    document.addEventListener('keydown', navigateWithKeyboard);

    return () => document.removeEventListener('keydown', navigateWithKeyboard);
  }, [focusedItemValue, focusedItem?.value, onChange, onClose, open, focusedItem]);

  const providerValue = React.useMemo<DropdownProviderValue<TValue>>(
    () => ({
      value,
      onSelect: handleSelect,
      onChange,
      selectedItem,
      onClose,
      focusedItemValue,
      setFocusedItem,
      setFocusedItemValue,
      focusedItem,
    }),
    [value, handleSelect, onChange, selectedItem, onClose, focusedItemValue, focusedItem]
  );

  return (
    <Popper placement={placement} open={open} onClose={onClose} {...restProps}>
      {({ triggerElement }) => (
        <DropdownProvider value={providerValue}>
          <div
            ref={ref}
            className={clsx(
              StringUtils.withProjectClassNamePrefix('dropdown'),
              'rounded',
              'border border-gray-300 shadow overflow-auto',
              'bg-white',
              'max-h-[218px]',
              className
            )}
            style={{ minWidth: triggerElement?.clientWidth }}>
            {children}
          </div>
        </DropdownProvider>
      )}
    </Popper>
  );
};
