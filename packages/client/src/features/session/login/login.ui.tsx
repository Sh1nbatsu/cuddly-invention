import { FormInput } from '@/shared/ui/form-input/form-input.ui'
import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LoginSchema } from '@/entities/session/session.contract'
import {
  AuthForm,
  AuthFooterText,
  AuthLink,
  AuthSpace,
  AuthSubmitButton,
  AuthTitle,
  LabelStyle,
} from '@/entities/session/session.styled'
import { LoginFormData } from '@/entities/session/session.types'
import { login } from '@/entities/user/model/user.thunk'
import { YandexLoginButton } from '@/shared/ui/auth/yandex-login-button.ui'
import { useAppDispatch } from '@/providers/store/store.hooks'

const DEFAULT_VALUES = { login: '', password: '' }

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
    await dispatch(login(data))
    navigate('/')
  }

  const onFinish = async () => {
    await handleSubmit(onSubmit)()
  }

  return (
    <PageWrapper>
      <AuthForm onFinish={onFinish} layout="vertical" autoComplete="off">
        <AuthTitle level={2}>Вход</AuthTitle>

        <FormInput
          control={control}
          name="login"
          label={<LabelStyle>Логин</LabelStyle>}
          inputProps={{ placeholder: 'Введите логин' }}
        />

        <FormInput
          control={control}
          name="password"
          label={<LabelStyle>Пароль</LabelStyle>}
          inputProps={{
            type: 'password',
            autoComplete: 'new-password',
            placeholder: 'Введите пароль',
          }}
        />

        <AuthSubmitButton htmlType="submit" disabled={!isValid} size="large">
          Войти
        </AuthSubmitButton>

        <YandexLoginButton />

        <AuthSpace direction="horizontal">
          <AuthFooterText>
            Нет аккаунта? <AuthLink to="/sign-up">Зарегистрироваться</AuthLink>
          </AuthFooterText>
        </AuthSpace>
      </AuthForm>
    </PageWrapper>
  )
}
