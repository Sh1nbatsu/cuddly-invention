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

  static async getCommentTree(topicId: number): Promise<CommentAttributes[]> {
    const comments = await this.findAll({
      where: { topic: { id: topicId } },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: Comment,
          as: 'replies',
          required: false,
        },
      ],
    })

    const buildTree = (parentId: number | null): CommentAttributes[] => {
      return comments
        .filter(comment => comment.parentCommentId === parentId)
        .map(comment => ({
          ...comment.toJSON(),
          replies: buildTree(comment.id),
        }))
    }

    return buildTree(null)
  }
}

export default Comment
