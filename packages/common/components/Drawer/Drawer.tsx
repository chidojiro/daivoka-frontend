import { TimesIcon } from '@/common/icons';
import { OpenClose } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import {
  Drawer as HeadlessDrawer,
  DrawerProps as HeadlessDrawerProps,
  useDelayableState,
  useOnEventOutside,
} from 'hsk-headless';
import React from 'react';
import { Button } from '../Button';

export type DrawerProps = Omit<HeadlessDrawerProps, 'placement'> &
  OpenClose & {
    closeOnClickOutside?: boolean;
    overlay?: boolean;
    showCloseButton?: boolean;
  };

export const DRAWER_DEFAULT_DELAYED_CLOSE = 100;

export const Header = ({ className, ...restProps }: JSX.IntrinsicElements['h2']) => (
  <h2
    className={clsx(StringUtils.withProjectClassNamePrefix('drawer-header'), 'text-center uppercase mb-10', className)}
    {...restProps}
  />
);

const ForwardedRefDrawer = (
  { children, open: openProp, onClose, closeOnClickOutside, overlay, showCloseButton = true }: DrawerProps,
  ref: any
) => {
  const [delayableOpen, setDelayableOpen] = useDelayableState({
    delayBy: DRAWER_DEFAULT_DELAYED_CLOSE,
    defaultState: openProp,
  });

  React.useEffect(() => {
    setDelayableOpen({ state: !!openProp, shouldDelay: !openProp });
  }, [openProp, setDelayableOpen]);

  const internalRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

  useOnEventOutside('click', closeOnClickOutside && internalRef, onClose);

  if (!delayableOpen) return null;

  return (
    <HeadlessDrawer placement='right' ref={internalRef}>
      {overlay && <div className='fixed w-screen h-screen top-0 left-0'></div>}
      <div
        style={{ animationFillMode: 'forwards' }}
        className={clsx(
          'relative',
          'h-full w-[500px] p-8 bg-white shadow-lg',
          openProp ? 'animate-drawer-enter' : 'animate-drawer-leave'
        )}>
        {showCloseButton && (
          <Button variant='plain' onClick={onClose} className='w-4 h-4 absolute right-4 top-18 z-50'>
            <TimesIcon />
          </Button>
        )}
        {children}
      </div>
    </HeadlessDrawer>
  );
};

export const Drawer: typeof ForwardedRefDrawer & {
  Header: typeof Header;
} = React.forwardRef<any, DrawerProps>(ForwardedRefDrawer) as any;

Drawer.Header = Header;
