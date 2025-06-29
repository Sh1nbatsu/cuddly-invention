import { FormInput } from '@/shared/ui/form-input/form-input.ui'
import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoginSchema } from '@/entities/session/session.contract'
import {
  AuthFooterText,
  AuthForm,
  AuthLink,
  AuthSpace,
  AuthSubmitButton,
  AuthTitle,
} from '@/entities/session/session.styled'
import { LoginFormData } from '@/entities/session/session.types'
import { login } from '@/entities/user/model/user.thunk'
import { useAppDispatch } from '@/providers/store/store.hooks'

const DEFAULT_VALUES = {
  login: '',
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

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data))
      navigate('/')
    } catch (error) {
      console.error('Произошла ошибка:', error)
    }
  }

  const onFinish = async () => {
    await handleSubmit(onSubmit)()
  }

  return (
    <PageWrapper>
      <AuthForm onFinish={onFinish} layout="vertical" autoComplete="off">
        <AuthTitle level={2}>Вход</AuthTitle>
        <FormInput control={control} name="login" label="Логин" />
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
    </PageWrapper>
  )
}
