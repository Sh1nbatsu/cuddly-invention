import {
  LeftBlock,
  Profile,
  RightBlock,
  Avatar,
} from '@/shared/ui/user-profile/user-profile.styled'

import dinoAvatar from '/dino-sticker.jpg'

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
    </Profile>
  )
}
