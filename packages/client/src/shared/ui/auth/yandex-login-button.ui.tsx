import { memo } from 'react'
import { AuthSubmitButton } from '@/entities/session/session.styled'

const CLIENT_ID = import.meta.env.VITE_YANDEX_CLIENT_ID as string
const ORIGIN = window.location.origin

export const YandexLoginButton = memo(() => {
  function handleClick(): void {
    const params = new URLSearchParams({
      response_type: 'token',
      client_id: CLIENT_ID,
      redirect_uri: ORIGIN,
      scope: 'login:email login:info',
      state: crypto.randomUUID(),
    })
    window.location.href = `https://oauth.yandex.ru/authorize?${params.toString()}`
  }

  return (
    <AuthSubmitButton
      variant="outlined"
      htmlType="button"
      size="large"
      onClick={handleClick}>
      Войти через Яндекс
    </AuthSubmitButton>
  )
})
