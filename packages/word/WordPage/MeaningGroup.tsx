import { Button, Divider } from '@/common/components';
import { Dropdown, DropdownItem } from '@/common/components/Dropdown';
import { useHandler } from '@/common/hooks';
import { EllipsisVIcon } from '@/common/icons';
import { useDisclosure } from 'hsk-headless';
import { WordApis } from '../apis';
import { MeaningTypeLabel } from '../constants';
import { MeaningGroup as TMeaningGroup, Word } from '../types';
import { MeaningGroupForm } from './MeaningGroupForm';

export type MeaningGroupProps = {
  word: Word;
  group: TMeaningGroup;
  onUpdateSuccess: (word: Word) => void;
  onDeleteSuccess: (word: Word) => void;
};

export const MeaningGroup = ({
  word,
  group: { _id, wordId, type, ipas },
  onDeleteSuccess,
  onUpdateSuccess,
}: MeaningGroupProps) => {
  const dropdownDisclosure = useDisclosure();

  const { handle: deleteMeaningGroup } = useHandler(() => WordApis.deleteMeaningGroup(wordId, _id), {
    onSuccess: onDeleteSuccess,
  });

  const isEditDisclosure = useDisclosure();

  if (isEditDisclosure.isOpen)
    return (
      <MeaningGroupForm
        word={word}
        meaningGroupId={_id}
        onSubmit={async data => {
          const updatedWord = await WordApis.updateMeaningGroup(word?._id as string, _id, data);
          onUpdateSuccess(updatedWord);
          isEditDisclosure.close();
        }}
        onCancel={isEditDisclosure.close}
      />
    );

  return (
    <div className='mb-4'>
      <div className='flex items-center gap-2'>
        <h3 className='text-base text-blue-500 italic'>{MeaningTypeLabel[type]}</h3>
        <Dropdown
          open={dropdownDisclosure.isOpen}
          onClose={dropdownDisclosure.close}
          placement='right-start'
          trigger={
            <Button variant='ghost' colorScheme='gray' pill square onClick={dropdownDisclosure.toggle}>
              <EllipsisVIcon />
            </Button>
          }>
          <DropdownItem value='edit' onClick={isEditDisclosure.open}>
            Edit
          </DropdownItem>
          <DropdownItem value='delete' onClick={deleteMeaningGroup}>
            Delete
          </DropdownItem>
        </Dropdown>
      </div>
      <div className='flex items-center gap-4'>
        {ipas.map(({ accent, text }) => (
          <div className='flex items-center gap-2 text-xs font-semibold text-yellow-500' key={accent}>
            <span>{accent}</span>
            <span>/{text}/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
