import { ForumComment } from '@/shared/types/Forum'

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

export const transformComment = (c: ForumComment): ForumComment => {
  console.log('transformComment input:', c)
  return {
    id: c.id,
    author: { login: c.author?.login || 'Неизвестный' },
    content: c.content,
    date: c.createdAt || c.date,
    children: c.children?.map(transformComment) || [],
    createdAt: c.createdAt || '-',
  }
}
