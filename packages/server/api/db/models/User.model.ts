import { Optional } from 'sequelize'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import Comment from './Comment.model'
import Topic from './Topic.model'
export interface UserAttributes {
  id?: number
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  score: number
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: true,
})
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'First name cannot be empty',
      },
      len: {
        args: [2, 50],
        msg: 'First name must be between 2 and 50 characters',
      },
    },
  })
  declare first_name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Second name cannot be empty',
      },
      len: {
        args: [2, 50],
        msg: 'Second name must be between 2 and 50 characters',
      },
    },
  })
  declare second_name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Login cannot be empty',
      },
      len: {
        args: [3, 30],
        msg: 'Login must be between 3 and 30 characters',
      },
    },
  })
  declare login: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
      notEmpty: {
        msg: 'Email cannot be empty',
      },
    },
  })
  declare email: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty',
      },
      len: {
        args: [6, 100],
        msg: 'Password must be between 6 and 100 characters',
      },
    },
  })
  declare password: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Phone cannot be empty',
      },
    },
  })
  declare phone: string

  @Column({
    type: DataType.NOW,
    allowNull: true,
  })
  declare score: number

  @HasMany(() => Topic)
  declare topics: Topic[]

  @HasMany(() => Comment)
  declare comments: Comment[]
}

export default User
