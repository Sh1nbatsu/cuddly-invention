import {
  LeftBlock,
  Profile,
  RightBlock,
  Avatar,
} from '@/shared/ui/user-profile/user-profile.styled'

import { ThemeToggleButton } from '@/shared/ui/theme-toggle-button/theme-toggle-button'

import dinoAvatar from '/pwa-192x192.png'

export const UserProfileWidget = () => {
  return (
    <Profile>
      <LeftBlock>
        <Avatar src={dinoAvatar} alt="Avatar" />
        <p>
          Место в топе: <span>13</span>
        </p>
      </LeftBlock>
      <RightBlock>
        <h2>
          dino14 <sup>#000001</sup>
        </h2>
        <p>В сети</p>
        <p>Арр-р!</p>
      </RightBlock>
      <ThemeToggleButton />
    </Profile>
  )
}
