import { FormInput } from '@/components/FormInput/FormInput'
import Wrapper from '@/components/Wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginFormData, LoginSchema } from './schemas'
import {
  AuthFooterText,
  AuthForm,
  AuthLink,
  AuthSpace,
  AuthSubmitButton,
  AuthTitle,
} from './styled'

const DEFAULT_VALUES = {
  email: '',
  password: '',
}

export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    console.log('Submitted data:', data)
  }

  const onFinish = () => {
    return handleSubmit(onSubmit)()
  }

  return (
    <Wrapper>
      <AuthForm onFinish={onFinish} layout="vertical" autoComplete="off">
        <AuthTitle level={2}>Вход</AuthTitle>
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
            autoComplete: 'new-password',
          }}
        />
        <AuthSubmitButton
          variant="outlined"
          htmlType="submit"
          disabled={!isValid}
          size="large">
          Войти
        </AuthSubmitButton>

        <AuthSpace direction="horizontal">
          <AuthFooterText>
            Нет аккаунта? <AuthLink to="/sign-up">Зарегистрироваться</AuthLink>
          </AuthFooterText>
        </AuthSpace>
      </AuthForm>
    </Wrapper>
  )
}
