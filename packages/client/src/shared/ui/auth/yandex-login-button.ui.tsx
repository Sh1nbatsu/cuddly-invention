import { AuthSubmitButton } from '@/entities/session/session.styled'
import { useClient } from '@/shared/hooks/useClient'

const CLIENT_ID = import.meta.env.VITE_YANDEX_CLIENT_ID as string

export const YandexLoginButton = () => {
  if (typeof window === 'undefined') return
  useClient()
  function handleClick(): void {
    const params = new URLSearchParams({
      response_type: 'token',
      client_id: CLIENT_ID,
      redirect_uri: window.location.origin,
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
}
