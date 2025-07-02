import { ForumComment, ParentComment } from '@/shared/types/Forum'

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

export const transformComment = (c: ParentComment): ForumComment => {
  return {
    id: c.id,
    author: { login: c.authorLogin || 'Неизвестный' },
    content: c.content,
    date: c.createdAt,
    children: c.children?.map(transformComment) || [],
    createdAt: c.createdAt || '-',
  }
}
