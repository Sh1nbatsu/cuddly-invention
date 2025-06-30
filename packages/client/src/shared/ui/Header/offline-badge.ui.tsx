import { useOnline } from '@/shared/hooks/useOnline'
import { Popover } from 'antd'
import { StyledBadge, StyledBadgeIcon } from './header.styled'

export const OfflineBadge = () => {
  const { isOnline } = useOnline()

  if (isOnline) return null

  return (
    <Popover
      content="Вы сейчас в offline-режиме. Некоторые функции могут быть недоступны."
      title="Офлайн режим"
      placement="bottomRight">
      <StyledBadge count={<StyledBadgeIcon />} />
    </Popover>
  )
}
