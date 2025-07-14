import { useState, useEffect } from 'react'

interface Props {
  commentId: number
}

const availableEmojis = ['👍', '❤️', '😂', '😮', '😢']

export const TopicCardCommentEmoji = ({ commentId }: Props) => {
  const [reactions, setReactions] = useState<Record<string, number>>({})

  useEffect(() => {
    // TODO: Загрузить реакции с сервера
    setReactions({
      '👍': 1,
      '❤️': 2,
      '😂': 0,
      '😮': 0,
      '😢': 0,
    })
  }, [commentId])

  const handleReact = async (emoji: string) => {
    try {
      // TODO: sendReaction(commentId, emoji)

      setReactions(prev => ({
        ...prev,
        [emoji]: (prev[emoji] || 0) + 1,
      }))
    } catch (error) {
      console.error('Ошибка при отправке реакции', error)
    }
  }

  return (
    <div style={{ marginTop: 8 }}>
      {availableEmojis.map(emoji => (
        <button
          key={emoji}
          onClick={() => handleReact(emoji)}
          style={{
            marginRight: 8,
            fontSize: 18,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}>
          {emoji} {reactions[emoji] > 0 ? reactions[emoji] : ''}
        </button>
      ))}
    </div>
  )
}
