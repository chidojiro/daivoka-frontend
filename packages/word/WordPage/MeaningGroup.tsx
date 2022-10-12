import { Button } from '@/common/components';
import { Dropdown, DropdownItem } from '@/common/components/Dropdown';
import { EllipsisVIcon } from '@/common/icons';
import { useDisclosure } from 'hsk-headless';
import { MeaningTypeLabel } from '../constants';
import { MeaningGroup as TMeaningGroup } from '../types';

export type MeaningGroupProps = {
  group: TMeaningGroup;
};

export const MeaningGroup = ({ group }: MeaningGroupProps) => {
  const dropdownDisclosure = useDisclosure();

  return (
    <div className='mb-4'>
      <div className='flex items-center gap-2'>
        <h3 className='text-base text-blue-500 italic'>{MeaningTypeLabel[group.type]}</h3>
        <Dropdown
          open={dropdownDisclosure.isOpen}
          onClose={dropdownDisclosure.close}
          placement='right-start'
          trigger={
            <Button variant='ghost' colorScheme='gray' pill square onClick={dropdownDisclosure.toggle}>
              <EllipsisVIcon />
            </Button>
          }>
          <DropdownItem value='edit'>Edit</DropdownItem>
          <DropdownItem value='delete'>Delete</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};
