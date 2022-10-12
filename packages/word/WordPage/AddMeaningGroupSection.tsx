import { Button, Form } from '@/common/components';
import { PlusIcon } from '@/common/icons';
import { Option } from '@/common/types';
import { useDisclosure } from 'hsk-headless';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { WordApis } from '../apis';
import { CreateMeaningGroupPayload, MeaningType } from '../types';
import { useWord } from '../useWord';

export type AddMeaningGroupSectionProps = {
  onCreateSuccess: () => void;
};

export const AddMeaningGroupSection = ({ onCreateSuccess }: AddMeaningGroupSectionProps) => {
  const { query } = useRouter();

  const { word } = useWord({ slug: query.wordSlug as string });

  const options: Option<MeaningType>[] = React.useMemo(
    () => [
      { label: 'Verb', value: 'VERB' },
      { label: 'Noun', value: 'NOUN' },
      { label: 'Adjective', value: 'ADJECTIVE' },
      { label: 'Adverb', value: 'ADVERB' },
      { label: 'Preposition', value: 'PREPOSITION' },
      { label: 'Phrasal Verb', value: 'PHRASAL_VERB' },
    ],
    []
  );

  const addedTypes = React.useMemo(() => word?.meaningGroups.map(({ type }) => type), [word?.meaningGroups]);

  const filteredOptions = React.useMemo(
    () => options.filter(({ value }) => !addedTypes?.includes(value)),
    [addedTypes, options]
  );

  const addGroupDisclosure = useDisclosure();

  const methods = useForm<CreateMeaningGroupPayload>();
  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    reset({ type: filteredOptions[0].value, ipas: [{ text: '', accent: 'US' }] });
  }, [addGroupDisclosure.isOpen, filteredOptions, reset]);

  if (!addGroupDisclosure.isOpen) {
    return (
      <Button onClick={addGroupDisclosure.open} variant='ghost' iconLeft={<PlusIcon />} className='px-0'>
        Add a group
      </Button>
    );
  }

  return (
    <Form
      methods={methods}
      onSubmit={async data => {
        await WordApis.createMeaningGroup(word?._id as string, data);
        onCreateSuccess();
        addGroupDisclosure.close();
      }}
      className='flex items-center'>
      <div className='flex flex-col gap-1 mr-4'>
        <Form.Select name='type' className='w-40' options={filteredOptions} />
        <Form.Input name='ipas[0].text' size='sm' className='w-40' placeholder='IPA' rules={{ required: true }} />
      </div>
      <Button className='mr-1' type='submit' loading={isSubmitting}>
        Confirm
      </Button>
      <Button variant='outline' onClick={addGroupDisclosure.close}>
        Cancel
      </Button>
    </Form>
  );
};
