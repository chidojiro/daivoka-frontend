import { MainLayout } from '@/layout/MainLayout';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useWord } from '../useWord';
import { AddMeaningGroupSection } from './AddMeaningGroupSection';
import { MeaningGroup } from './MeaningGroup';

export type WordPageProps = {
  //
};

export const WordPage = ({}: WordPageProps) => {
  const { query } = useRouter();

  const methods = useForm();
  const { reset } = methods;

  const { word, mutateWord } = useWord({ slug: query.wordSlug as string });

  React.useEffect(() => {
    reset(word);
  }, [reset, word]);

  if (!word) return null;

  const { text, meaningGroups } = word;

  return (
    <MainLayout>
      <h1 className='text-center'>{text}</h1>
      <div className='mt-10'></div>
      {meaningGroups.map(group => (
        <MeaningGroup
          key={group._id}
          word={word}
          group={group}
          onDeleteSuccess={mutateWord}
          onUpdateSuccess={mutateWord}
        />
      ))}
      <AddMeaningGroupSection onCreateSuccess={() => mutateWord(word)} />
    </MainLayout>
  );
};
