import { sequelize } from 'api/db/db'
import Topic from 'api/db/models/Topic.model'
import User from 'api/db/models/User.model'
import { TopicSchemaData } from 'api/schemas/topic.schema'
import { RequestWithValidateData } from 'api/types/request'
import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'

type CommentTree = Omit<CommentRaw, 'children'> & { children: CommentTree[] }
interface CommentRaw {
  id: number
  content: string
  topicId: number
  parentCommentId: number | null
  createdAt: string
  depth: number
  children?: CommentTree[]
}

const buildTree = (
  list: CommentRaw[],
  parentId: number | null = null
): CommentTree[] => {
  return list
    ?.filter(c => c.parentCommentId === parentId)
    .map(c => ({
      ...c,
      children: buildTree(list, c.id),
    }))
}

export const getAllTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll({
      include: {
        model: User,
        attributes: ['id', 'login'],
      },
    })

    const topicsWithComments = await Promise.all(
      topics.map(async topic => {
        const comments = await sequelize.query<CommentRaw>(
          `
          WITH RECURSIVE comment_tree AS (
            SELECT 
              c.id, 
              c.content, 
              c."topicId", 
              c."parentCommentId", 
              c."createdAt",
              u.id AS "authorId",
              u.login AS "authorLogin",
              1 AS depth
            FROM comments c
            JOIN users u ON c."authorId" = u.id
            WHERE c."topicId" = :topicId AND c."parentCommentId" IS NULL

            UNION ALL

            SELECT 
              c.id, 
              c.content, 
              c."topicId", 
              c."parentCommentId", 
              c."createdAt",
              u.id AS "authorId",
              u.login AS "authorLogin",
              ct.depth + 1
            FROM comments c
            JOIN comment_tree ct ON c."parentCommentId" = ct.id
            JOIN users u ON c."authorId" = u.id
          )
          SELECT * FROM comment_tree
          ORDER BY depth, "createdAt"
          `,
          {
            replacements: { topicId: topic.id },
            type: QueryTypes.SELECT,
          }
        )

        const commentTree = buildTree(comments)

        return {
          ...topic.get({ plain: true }),
          comments: commentTree,
        }
      })
    )

    res.status(200).json(topicsWithComments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createTopic = async (
  req: RequestWithValidateData<TopicSchemaData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = (req as any).user
    console.log(currentUser, 'currentUser')
    const { description, title } = req.body
    const createdTopic = await Topic.create({
      description,
      title,
      userId: currentUser.id,
    })
    res.json(createdTopic)
  } catch (error) {
    next(error)
  }
}
