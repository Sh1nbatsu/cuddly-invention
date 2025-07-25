import { RegisterSchema } from '@/entities/session/session.contract'
import {
  AuthFooterText,
  AuthForm,
  AuthLink,
  AuthSpace,
  AuthSubmitButton,
  AuthTitle,
  LabelStyle,
} from '@/entities/session/session.styled'
import { RegisterFormData } from '@/entities/session/session.types'
import { register } from '@/entities/user/model/user.thunk'
import { useAppDispatch } from '@/providers/store/store.hooks'
import { FormInput } from '@/shared/ui/form-input/form-input.ui'
import { PageWrapper } from '@/shared/ui/page-wrapper/page-wrapper.ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { YandexLoginButton } from '@/shared/ui/auth/yandex-login-button.ui'

const DEFAULT_VALUES = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  phone: '',
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

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(register(data))
      navigate('/')
    } catch (error) {
      console.error('error', error)
    }
  }

  const onFinish = () => handleSubmit(onSubmit)()

  return (
    <PageWrapper>
      <AuthForm layout="vertical" autoComplete="off" onFinish={onFinish}>
        <AuthTitle level={2}>Регистрация</AuthTitle>

        <FormInput
          control={control}
          name="first_name"
          label={<LabelStyle>Имя</LabelStyle>}
          inputProps={{ placeholder: 'Введите имя' }}
        />
        <FormInput
          control={control}
          name="second_name"
          label={<LabelStyle>Фамилия</LabelStyle>}
          inputProps={{ placeholder: 'Введите фамилию' }}
        />
        <FormInput
          control={control}
          name="login"
          label={<LabelStyle>Логин</LabelStyle>}
          inputProps={{ placeholder: 'Придумайте логин' }}
        />
        <FormInput
          control={control}
          name="email"
          label={<LabelStyle>Почта</LabelStyle>}
          inputProps={{ type: 'email', placeholder: 'example@mail.com' }}
        />
        <FormInput
          control={control}
          name="password"
          label={<LabelStyle>Пароль</LabelStyle>}
          inputProps={{
            type: 'password',
            autoComplete: 'new-password',
            placeholder: 'Придумайте пароль',
          }}
        />
        <FormInput
          control={control}
          name="phone"
          label={<LabelStyle>Телефон</LabelStyle>}
          inputProps={{ type: 'tel', placeholder: '+7 (___) ___‑__‑__' }}
        />

        <AuthSubmitButton
          variant="outlined"
          htmlType="submit"
          disabled={!isValid}
          size="large">
          Зарегистрироваться
        </AuthSubmitButton>

        <YandexLoginButton />

        <AuthSpace direction="horizontal">
          <AuthFooterText>
            Уже есть аккаунт? <AuthLink to="/sign-in">Войти</AuthLink>
          </AuthFooterText>
        </AuthSpace>
      </AuthForm>
    </PageWrapper>
  )
}
