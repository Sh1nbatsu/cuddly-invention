import { createTopic, getTopics } from '@/entities/topic/topic.api'
import { TopicSchema } from '@/entities/topic/topic.contract'
import {
  StyledForumPageContainer,
  StyledForumTitle,
} from '@/entities/topic/topic.styled'
import { TopicSchemaData } from '@/entities/topic/topic.types'
import { TopicForm } from '@/features/topic/topic-form/topic-form.ui'
import { TopicList } from '@/features/topic/topic-list/topic-list.ui'
import { Topic } from '@/shared/types/Topic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const ForumWidget = () => {
  const methods = useForm<TopicSchemaData>({
    mode: 'onSubmit',
    resolver: zodResolver(TopicSchema),
  })

  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTopics = useCallback(async () => {
    try {
      const data = await getTopics()
      setTopics(data)
    } catch (error) {
      console.error('Ошибка при получении тем:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTopics()
  }, [fetchTopics])

  const onSubmit = async (data: TopicSchemaData) => {
    await createTopic(data)
    await fetchTopics()
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <StyledForumPageContainer>
        <StyledForumTitle level={2}>Форум</StyledForumTitle>
        <TopicForm onSubmit={onSubmit} />
        <TopicList topics={topics} isLoading={isLoading} />
        {/* <ForumCard /> */}
      </StyledForumPageContainer>
    </FormProvider>
  )
}
