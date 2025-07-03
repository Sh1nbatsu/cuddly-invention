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
import User from './User.model'

export interface CommentAttributes {
  id?: number
  content: string
  parentCommentId: number | null
  authorId: number
  topicId: number
}

export interface CommentCreationAttributes
  extends Optional<CommentAttributes, 'id'> {}

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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare authorId: number

  @BelongsTo(() => User)
  declare author: User

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare parentCommentId: number | null

  @BelongsTo(() => Comment, 'parentCommentId')
  declare parentComment: Comment

  @HasMany(() => Comment, 'parentCommentId')
  declare replies: Comment[]
}

export default Comment
