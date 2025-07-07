import { memo } from 'react'
import styled from 'styled-components'
import { AuthSubmitButton } from '@/entities/session/session.styled'

const CLIENT_ID = import.meta.env.VITE_YANDEX_CLIENT_ID as string
const ORIGIN = window.location.origin

const StyledAuthButton = styled(AuthSubmitButton)`
  margin-top: 16px;
  margin-bottom: 16px;
`

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
    <StyledAuthButton
      variant="outlined"
      htmlType="button"
      size="large"
      onClick={handleClick}>
      Войти через Яндекс
    </StyledAuthButton>
  )
})
