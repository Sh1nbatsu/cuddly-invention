import { memo, useCallback } from 'react'
import styled from 'styled-components'
import { CustomButton } from '@/shared/ui/custom-button/custom-button.ui'

const CLIENT_ID = import.meta.env.VITE_YANDEX_CLIENT_ID as string
const ORIGIN = window.location.origin

const StyledButton = styled(CustomButton)`
  margin-top: 16px;
`

export const YandexLoginButton = memo(() => {
  const handleClick = useCallback(() => {
    const params = new URLSearchParams({
      response_type: 'token',
      client_id: CLIENT_ID,
      redirect_uri: ORIGIN,
      scope: 'login:email login:info',
      state: crypto.randomUUID(),
    })
    window.location.href = `https://oauth.yandex.ru/authorize?${params.toString()}`
  }, [])

  return (
    <StyledButton variant="retro" onClick={handleClick}>
      Войти через Яндекс
    </StyledButton>
  )
})
