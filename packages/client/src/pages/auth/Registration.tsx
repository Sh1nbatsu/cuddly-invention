import { FormInput } from '@/components/FormInput/FormInput'
import {
  AuthFooterText,
  AuthLink,
  AuthSpace,
} from '@/components/FormInput/styled'
import Wrapper from '@/components/Wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterFormData, RegisterSchema } from './schemas'
import { AuthForm, AuthSubmitButton, AuthTitle } from './styled'

const DEFAULT_VALUES = {
  nickname: '',
  email: '',
  password: '',
}

export const Registration = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = (data: RegisterFormData) => {
    console.log('Submitted data:', data)
  }

  const onFinish = () => {
    return handleSubmit(onSubmit)()
  }

  return (
    <Wrapper>
      <AuthForm onFinish={onFinish} layout="vertical" autoComplete="off">
        <AuthTitle level={2}>Регистрация</AuthTitle>
        <FormInput control={control} name="nickname" label="Никнейм" />
        <FormInput
          control={control}
          name="email"
          label="Почта"
          inputProps={{
            type: 'email',
          }}
        />
        <FormInput
          control={control}
          name="password"
          label="Пароль"
          inputProps={{
            type: 'password',
            autoComplete: 'new-password', // Или 'off' если нужно полное отключение
          }}
        />
        <AuthSubmitButton
          variant="outlined"
          htmlType="submit"
          disabled={!isValid}
          size="large">
          Зарегистрироваться
        </AuthSubmitButton>

        <AuthSpace direction="horizontal">
          <AuthFooterText>
            Уже есть аккаунт? <AuthLink to="/sign-in">Войти</AuthLink>
          </AuthFooterText>
        </AuthSpace>
      </AuthForm>
    </Wrapper>
  )
}
