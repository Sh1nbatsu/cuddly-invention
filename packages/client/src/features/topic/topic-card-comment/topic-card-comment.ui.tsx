import { ForumComment } from '@/shared/types/Forum'
import { Avatar } from 'antd'
import {
  CommentAuthor,
  CommentContainer,
  CommentContent,
  CommentDate,
  CommentHeader,
  RepliesContainer,
} from '../topic-card/topic-card.styled'
import { formatDate } from '../topic-card/topic-card.utils'
import { useState } from 'react'
import { TopicCardCommentEmoji } from './topic-card-comment-emoji.ui'

interface ForumCommentItemProps {
  comment: ForumComment
}

export const TopicCardComment: React.FC<ForumCommentItemProps> = ({
  comment,
}) => {
  return (
    <CommentContainer>
      <CommentHeader>
        <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
          {comment.author.login?.[0].toUpperCase()}
        </Avatar>
        <CommentAuthor>{comment.author.login}</CommentAuthor>
        <CommentDate>{formatDate(comment.date)}</CommentDate>
      </CommentHeader>
      <CommentContent>{comment.content}</CommentContent>
      <TopicCardCommentEmoji commentId={comment.id} />
      {comment.children && comment.children.length > 0 && (
        <RepliesContainer>
          {comment.children.map(child => (
            <TopicCardComment key={child.id} comment={child} />
          ))}
        </RepliesContainer>
      )}
    </CommentContainer>
  )
}
