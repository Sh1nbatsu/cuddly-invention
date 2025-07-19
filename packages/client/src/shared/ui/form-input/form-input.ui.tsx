import { FormItemProps, Input } from 'antd'
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import { StyledFormItem } from './form-input.styled'
import { ReactNode } from 'react'

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: ReactNode
  rules?: RegisterOptions<TFieldValues>
  formItemProps?: Omit<FormItemProps, 'label' | 'help' | 'validateStatus'>
  inputProps?: React.ComponentProps<typeof Input>
}

export const FormInput = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  rules,
  formItemProps,
  inputProps,
}: FormInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <StyledFormItem
          label={label}
          style={{ width: '100%' }}
          validateStatus={fieldState.error ? 'error' : ''}
          help={fieldState.error?.message}
          {...formItemProps}>
          <Input {...field} {...inputProps} />
        </StyledFormItem>
      )}
    />
  )
}
