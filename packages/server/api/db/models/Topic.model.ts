import { Optional } from 'sequelize'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import Comment, { CommentAttributes } from './Comment.model'

export interface TopicAttributes {
  id?: number
  title: string
  description: string
  comments?: CommentAttributes[]
}

interface TopicCreationAttributes extends Optional<TopicAttributes, 'id'> {}

@Table({
  tableName: 'topics',
  timestamps: true,
})
class Topic
  extends Model<TopicAttributes, TopicCreationAttributes>
  implements TopicAttributes
{
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string

  @HasMany(() => Comment)
  declare comments: Comment[]
}

export default Topic
