import React from 'react';
import { createContext } from '../../utils';
import { SelectedDropdownItem } from './DropdownItem';

export type DropdownProviderValue<TValue extends string | number> = {
  value?: TValue;
  selectedItem?: SelectedDropdownItem<TValue>;
  onChange?: (value: TValue) => void;
  onSelect?: (item: SelectedDropdownItem<TValue>) => void;
  onClose?: () => void;
  focusedItemValue: string;
  setFocusedItemValue: React.Dispatch<React.SetStateAction<string>>;
  focusedItem: SelectedDropdownItem<TValue> | undefined;
  setFocusedItem: React.Dispatch<React.SetStateAction<SelectedDropdownItem<TValue> | undefined>>;
};

const [DropdownProvider, useDropdownContext] = createContext<DropdownProviderValue<any>>();

export { DropdownProvider, useDropdownContext };
