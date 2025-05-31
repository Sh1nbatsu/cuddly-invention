import { useForumLogic } from '@/entities/forum/forum.hooks'
import {
  StyledForumPageContainer,
  StyledForumTitle,
} from '@/entities/forum/forum.styled'
import { ForumCard } from '@/features/forum/forum-card/forum-card.ui'
import { ForumList } from '@/features/forum/forum-list/forum-list.ui'

export const ForumWidget = () => {
  const { data } = useForumLogic()

  return (
    <StyledForumPageContainer>
      <StyledForumTitle level={2}>Форум</StyledForumTitle>
      <ForumList dataSource={data} />
      <ForumCard />
    </StyledForumPageContainer>
  )
}
