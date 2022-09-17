import { Button, Form, Modal } from '@/common/components';
import { OpenClose } from '@/common/types';
import { AssertUtils } from '@/common/utils';
import { ApiErrorMessage } from '@/errors/constants';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { WordApis } from './apis';

export type CreateWordModalProps = OpenClose;

type CreateWordFormValue = {
  text: string;
  anotherWord: boolean;
};

export const CreateWordModal = ({ onClose, ...restProps }: CreateWordModalProps) => {
  const wordTextInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const methods = useForm<CreateWordFormValue>();
  const {
    reset,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = methods;

  const handleClose = () => {
    onClose?.();
    reset();
  };

  const handleValidSubmit = async (data: CreateWordFormValue) => {
    try {
      const newWord = await WordApis.create({ text: data.text });
      if (data.anotherWord) {
        setValue('text', '', { shouldDirty: false });
        wordTextInputRef.current?.focus();
        return;
      }

      handleClose();
      router.push(`/words/${newWord.slug}`);
    } catch (e: any) {
      if (e.message === ApiErrorMessage.ALREADY_EXIST) {
        toast.error('Word already exists!');
        return;
      }
    }
  };

  return (
    <Modal {...restProps} onClose={handleClose}>
      <Form methods={methods} onSubmit={handleValidSubmit}>
        <Modal.Title>Create a word</Modal.Title>
        <Modal.Content>
          <Form.Input
            ref={wordTextInputRef}
            name='text'
            placeholder='Enter word'
            rules={{ required: true }}
            autoFocus
          />
        </Modal.Content>
        <Modal.Actions left={<Form.Checkbox label='Create another word' name='anotherWord' />}>
          <Button variant='ghost' colorScheme='gray' onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit' variant='solid' loading={isSubmitting && AssertUtils.isEmpty(errors)}>
            Create
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  );
};
