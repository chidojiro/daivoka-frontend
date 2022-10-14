import { Button, Form } from '@/common/components';
import { PlusIcon } from '@/common/icons';
import { useDisclosure } from 'hsk-headless';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateMeaningGroupPayload } from '../types';

export type AddMeaningSectionProps = {
  //
};

export const AddMeaningSection = ({}: AddMeaningSectionProps) => {
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
      <Button onClick={addGroupDisclosure.open} variant='ghost' iconLeft={<PlusIcon />} className='px-1'>
        Add a meaning
      </Button>
    );
  }

  return (
    <Form methods={methods}>
      <Form.Select name='subtype' className='w-40' options={[]} />
      <Form.TextArea name='text' className='mt-1' rows={2} />
      <Form.TextArea name='examples' className='mt-1' rows={2} />
    </Form>
  );
};
