import { TopicSchema } from '@/entities/topic/topic.contract'
import {
  StyledForumPageContainer,
  StyledForumTitle,
} from '@/entities/topic/topic.styled'
import { TopicSchemaData } from '@/entities/topic/topic.types'
import { TopicList } from '@/features/topic/topic-list/topic-list.ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const ForumWidget = () => {
  const methods = useForm<TopicSchemaData>({
    mode: 'onSubmit',
    resolver: zodResolver(TopicSchema),
  })
  return (
    <StyledForumPageContainer>
      <StyledForumTitle level={2}>Форум</StyledForumTitle>
      <TopicList />
      {/* <ForumCard /> */}
    </StyledForumPageContainer>
  )
}
