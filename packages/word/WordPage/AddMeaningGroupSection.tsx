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
  //
};

export const AddMeaningGroupSection = ({}: AddMeaningGroupSectionProps) => {
  const { query } = useRouter();

  const { word } = useWord({ slug: query.wordSlug as string });

  const addGroupDisclosure = useDisclosure();

  const methods = useForm<CreateMeaningGroupPayload>({
    defaultValues: { type: 'VERB', ipas: [{ text: '', accent: 'US' }] },
  });
  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    reset();
  }, [addGroupDisclosure.isOpen, reset]);

  if (!addGroupDisclosure.isOpen) {
    return (
      <Button onClick={addGroupDisclosure.open} variant='ghost' iconLeft={<PlusIcon />}>
        Add a group
      </Button>
    );
  }

  const options: Option<MeaningType>[] = [
    { label: 'Verb', value: 'VERB' },
    { label: 'Noun', value: 'NOUN' },
    { label: 'Adjective', value: 'ADJECTIVE' },
    { label: 'Adverb', value: 'ADVERB' },
    { label: 'Preposition', value: 'PREPOSITION' },
    { label: 'Phrasal Verb', value: 'PHRASAL_VERB' },
  ];

  return (
    <Form
      methods={methods}
      onSubmit={async data => {
        await WordApis.createMeaningGroup(word?._id as string, data);
        addGroupDisclosure.close();
      }}
      className='flex items-center'>
      <div className='flex flex-col gap-1 mr-4'>
        <Form.Select name='type' className='w-40' options={options} />
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
