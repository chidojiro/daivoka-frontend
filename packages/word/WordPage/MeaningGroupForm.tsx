import { Button, Form } from '@/common/components';
import { Option } from '@/common/types';
import { useMountEffect } from 'hsk-headless';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateMeaningGroupPayload, MeaningGroup, MeaningType, Word } from '../types';

export type MeaningGroupFormProps = {
  word: Word;
  meaningGroupId?: string;
  onSubmit: (data: CreateMeaningGroupPayload) => void;
  onCancel: () => void;
};

export const MeaningGroupForm = ({ word, meaningGroupId, onSubmit, onCancel }: MeaningGroupFormProps) => {
  const methods = useForm<CreateMeaningGroupPayload>();
  const {
    reset,
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;

  const type = watch('type');

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

  const addedTypes = React.useMemo(
    () => word?.meaningGroups.filter(({ _id }) => _id !== meaningGroupId).map(({ type }) => type),
    [meaningGroupId, word?.meaningGroups]
  );

  const filteredOptions = React.useMemo(
    () => options.filter(({ value }) => !addedTypes?.includes(value)),
    [addedTypes, options]
  );

  useMountEffect(() => {
    if (meaningGroupId) {
      reset(word.meaningGroups.find(({ _id }) => _id === meaningGroupId));
    } else {
      reset({ type: filteredOptions[0].value, ipas: [{ text: '', accent: 'US' }] });
    }
  });

  React.useEffect(() => {
    if (type && !filteredOptions.find(({ value }) => value === type)) {
      setValue('type', filteredOptions[0].value);
    }
  }, [filteredOptions, setValue, type]);

  return (
    <Form methods={methods} onSubmit={onSubmit} className='flex items-center'>
      <div className='flex flex-col gap-1 mr-4'>
        <Form.Select name='type' className='w-40' options={filteredOptions} />
        <Form.Input name='ipas[0].text' size='sm' className='w-40' placeholder='IPA' rules={{ required: true }} />
      </div>
      <Button className='mr-1' type='submit' loading={isSubmitting}>
        Confirm
      </Button>
      <Button variant='outline' onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};
