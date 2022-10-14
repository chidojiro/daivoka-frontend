import { useFetcher } from '@/common/hooks';
import { get } from 'lodash-es';
import React from 'react';
import { WordApis } from './apis';

type UseWordProps = { id?: string } | { slug?: string };

export const useWord = (props: UseWordProps) => {
  const { data, isInitializing, isLagging, isValidating, mutate } = useFetcher(
    (get(props, 'id') || get(props, 'slug')) && ['useWord', props],
    () => {
      if ('slug' in props) {
        return WordApis.getBySlug(props.slug!);
      }

      return WordApis.get((props as any).id);
    }
  );

  return React.useMemo(
    () => ({
      word: data,
      isInitializingWord: isInitializing,
      isLaggingWord: isLagging,
      isValidatingWord: isValidating,
      mutateWord: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate]
  );
};
