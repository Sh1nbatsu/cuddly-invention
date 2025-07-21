import { message } from 'antd'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getTopics } from './topic.api'
import { Topics } from './topic.types'

interface TopicContextType {
  topics: Topics
  refetchTopics: () => Promise<void>
  isLoading: boolean
}

export const TopicContext = createContext<TopicContextType | undefined>(
  undefined
)

export const TopicProvider = ({ children }: { children: ReactNode }) => {
  const [topics, setTopics] = useState<Topics>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTopics = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getTopics()
      setTopics(data)
    } catch (error) {
      message.error('Не удалось загрузить темы')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTopics()
  }, [fetchTopics])

  return (
    <TopicContext.Provider
      value={{ topics, refetchTopics: fetchTopics, isLoading }}>
      {children}
    </TopicContext.Provider>
  )
}

export const useTopics = () => {
  const context = useContext(TopicContext)

  if (!context) {
    throw new Error('useTopics должен использоваться внутри <TopicProvider>')
  }

  return context
}
