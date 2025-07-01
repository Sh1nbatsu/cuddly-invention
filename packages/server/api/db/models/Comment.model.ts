import { Optional } from 'sequelize'
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import Topic from './Topic.model'

export interface CommentAttributes {
  id?: number
  content: string
  topic: Topic
  parentComment: Comment
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

@Table({ tableName: 'comments' })
class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string

  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare topicId: number

  @BelongsTo(() => Topic)
  declare topic: Topic

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare parentCommentId: number | null

  @BelongsTo(() => Comment, 'parentCommentId')
  declare parentComment: Comment

  @HasMany(() => Comment, 'parentCommentId')
  declare replies: Comment[]
}

export default Comment
