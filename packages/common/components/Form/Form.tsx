import { StringUtils } from '../../utils';
import clsx from 'clsx';
import { useDisclosure } from 'hsk-headless';
import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Input, InputProps } from '../Input';
import { ErrorMessage, ErrorMessageProps } from './ErrorMessage';
import { Field, FieldProps } from './Field';
import { Checkbox, CheckboxProps } from '../Checkbox';

export type FormProps<T = any> = Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  methods: UseFormReturn<T>;
};

type FormFieldProps<TComponentProps, TValue> = Omit<FieldProps<TComponentProps, TValue>, 'component'>;

const FormForceRerendererContext = React.createContext(() => null);

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  methods,
  ...props
}: FormProps<TFieldValues>) => {
  const disclosure = useDisclosure();

  const value = disclosure.toggle;

  return (
    <FormForceRerendererContext.Provider value={value as any}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)} {...props}>
          {children}
        </form>
      </FormProvider>
    </FormForceRerendererContext.Provider>
  );
};

export const useFormForceRerenderer = () => React.useContext(FormForceRerendererContext);

const FormInput = React.forwardRef(({ className, ...restProps }: FormFieldProps<InputProps, string>, ref) => (
  <Field
    {...restProps}
    className={clsx(StringUtils.withProjectClassNamePrefix('form-input'), className)}
    component={Input}
    ref={ref}
  />
));
FormInput.displayName = 'FormInput';

const FormCheckbox = React.forwardRef(({ className, ...restProps }: FormFieldProps<CheckboxProps, string>, ref) => (
  <Field
    {...restProps}
    className={clsx(StringUtils.withProjectClassNamePrefix('form-checkbox'), className)}
    component={Checkbox}
    changeAs={e => {
      if (restProps.changeAs) {
        return restProps.changeAs(e);
      }

      if (e.target.value && e.target.value !== 'true') {
        return e.target.checked ? e.target.value : undefined;
      }

      return e.target.checked;
    }}
    ref={ref}
  />
));
FormCheckbox.displayName = 'FormCheckbox';

const FormErrorMessage = ({ name, className, ...restProps }: ErrorMessageProps & JSX.IntrinsicElements['p']) => (
  <p
    className={clsx(
      StringUtils.withProjectClassNamePrefix('form-error-message'),
      'text-danger text-xs mt-1',
      className
    )}
    {...restProps}>
    <ErrorMessage name={name} />
  </p>
);
FormInput.displayName = 'FormInput';

Form.ErrorMessage = FormErrorMessage;
Form.Input = FormInput;
Form.Checkbox = FormCheckbox;
