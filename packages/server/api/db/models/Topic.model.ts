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
import Comment, { CommentAttributes } from './Comment.model'
import User from './User.model'

export interface TopicAttributes {
  id?: number
  title: string
  description: string
  author: User
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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number

  @BelongsTo(() => User)
  declare author: User

  @HasMany(() => Comment)
  declare comments: Comment[]
}

export default Topic
