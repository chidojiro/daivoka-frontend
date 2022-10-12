import React from 'react';
import { useInfiniteLoader, UseInfiniteLoaderProps } from 'hsk-headless';
import { ClassName } from '@/common/types';
import clsx from 'clsx';
import { StringUtils } from '@/common/utils';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import { CoffeeIcon, FlagIcon } from '@/common/icons';

export type InfiniteLoaderRenderProps = {
  isExhausted: boolean;
  isLoading: boolean;
  loadMore: () => void;
  anchorRef: React.RefObject<HTMLElement>;
};

export type InfiniteLoaderProps<T = unknown> = ClassName &
  Omit<UseInfiniteLoaderProps<T>, 'anchor' | 'onLoad' | 'until'> & {
    itemsPerLoad?: number;
    onLoad: (params: any) => Promise<T>;
    until?: UseInfiniteLoaderProps<T>['until'];
    children?: (props: InfiniteLoaderRenderProps) => React.ReactNode;
    empty?: boolean;
  };

export const InfiniteLoader = <T,>({
  className,
  itemsPerLoad = 5,
  onLoad,
  until: untilProp,
  mode = 'ON_SIGHT',
  children,
  empty,
  ...restProps
}: InfiniteLoaderProps<T>) => {
  const ref = React.useRef<any>(null);

  const until = untilProp ?? ((data: T) => (data as any).length < itemsPerLoad);

  const handleLoad = (page: number) =>
    onLoad({
      page,
      limit: itemsPerLoad,
    });

  const { isExhausted, loadMore, isLoading } = useInfiniteLoader({
    ...restProps,
    mode,
    onLoad: handleLoad,
    until,
    anchor: ref,
  });

  if (children) return <>{children({ isExhausted, loadMore, anchorRef: ref, isLoading })}</>;

  if (mode === 'ON_DEMAND') {
    if (isExhausted) return null;

    return (
      <Button
        variant='plain'
        className={clsx(
          StringUtils.withProjectClassNamePrefix('infinite-loader', 'infinite-loader--on-demand'),
          'inline-block text-xs p-2'
        )}
        onClick={loadMore}>
        Load More
      </Button>
    );
  }

  const renderContent = () => {
    if (isExhausted) {
      if (empty)
        return (
          <div className='mt-32 flex flex-col items-center'>
            <CoffeeIcon className='text-9xl' />
            <h2>There are no items yet!</h2>
          </div>
        );

      return (
        <p className={clsx('text-base text-center inline-block', className)}>
          <span className='flex items-center gap-2'>
            That&apos;s all! <FlagIcon className='text-primary' />
          </span>
        </p>
      );
    }

    return <Spinner />;
  };

  return (
    <div
      ref={ref}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('infinite-loader', 'infinite-loader--on-sight'),
        'flex items-center justify-center mt-10'
      )}>
      {renderContent()}
    </div>
  );
};
