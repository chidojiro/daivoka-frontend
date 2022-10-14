import { Button } from '@/common/components';
import { PlusIcon } from '@/common/icons';
import { useDisclosure } from 'hsk-headless';
import { useRouter } from 'next/router';
import { WordApis } from '../apis';
import { useWord } from '../useWord';
import { MeaningGroupForm } from './MeaningGroupForm';

export type AddMeaningGroupSectionProps = {
  onCreateSuccess: () => void;
};

export const AddMeaningGroupSection = ({ onCreateSuccess }: AddMeaningGroupSectionProps) => {
  const { query } = useRouter();

  const { word } = useWord({ slug: query.wordSlug as string });

  const addGroupDisclosure = useDisclosure();

  if (!word) return null;

  if (!addGroupDisclosure.isOpen) {
    return (
      <Button onClick={addGroupDisclosure.open} variant='ghost' iconLeft={<PlusIcon />} className='px-1'>
        Add a group
      </Button>
    );
  }

  return (
    <MeaningGroupForm
      word={word}
      onSubmit={async data => {
        await WordApis.createMeaningGroup(word?._id as string, data);
        onCreateSuccess();
        addGroupDisclosure.close();
      }}
      onCancel={addGroupDisclosure.close}
    />
  );
};
