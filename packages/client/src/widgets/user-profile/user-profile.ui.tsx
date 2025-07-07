import { useCurrentUser } from '@/shared/hooks/useCurrentUser'
import { EditOutlined, StarOutlined } from '@ant-design/icons'
import { message } from 'antd'
import {
  Avatar,
  Bio,
  EditButton,
  LeftBlock,
  Profile,
  RightBlock,
  StatItem,
  Stats,
  UserId,
  UserName,
} from './user-profile.styled'
import dinoAvatar from '/dino-sticker.jpg'

export const UserProfileWidget = () => {
  const user = useCurrentUser()

  return (
    <Profile>
      <LeftBlock>
        <Avatar src={user?.avatar || dinoAvatar} alt="User avatar" />

        <Stats>
          <StatItem>
            <StarOutlined style={{ color: '#faad14' }} />
            <span>Очки: {user?.score || 0}</span>
          </StatItem>
        </Stats>
      </LeftBlock>

      <RightBlock>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <div>
            <UserName>
              {user?.login || 'dino14'}
              <UserId>
                #{user?.id?.toString().padStart(6, '0') || '000001'}
              </UserId>
            </UserName>
          </div>
          <EditButton
            icon={<EditOutlined />}
            size="small"
            onClick={() => message.info('Данный функционал в разработке!')}
          />
        </div>

        <Bio>Арр-р! Люблю играть и побеждать!</Bio>
      </RightBlock>
    </Profile>
  )
}
