import { sequelize } from 'api/db/db'
import Topic from 'api/db/models/Topic.model'
import { TopicSchemaData } from 'api/schemas/topic.schema'
import { RequestWithValidateData } from 'api/types/request'
import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'

export const getAllTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll()
    res.status(200).json(topics)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getTopicWithComments = async (req: Request, res: Response) => {
  try {
    const topicId = parseInt(req.params.id)

    const [comments] = await sequelize.query(
      `
        WITH RECURSIVE comment_tree AS (
          SELECT 
            id, 
            content, 
            "topicId", 
            "parentCommentId", 
            "createdAt",
            1 AS depth
          FROM comments
          WHERE "topicId" = :topicId AND "parentCommentId" IS NULL
          
          UNION ALL
          
          SELECT 
            c.id, 
            c.content, 
            c."topicId", 
            c."parentCommentId", 
            c."createdAt",
            ct.depth + 1
          FROM comments c
          JOIN comment_tree ct ON c."parentCommentId" = ct.id
        )
        SELECT * FROM comment_tree
        ORDER BY depth, "createdAt"
      `,
      {
        replacements: { topicId },
        type: QueryTypes.SELECT,
      }
    )

    res.status(200).json(comments)
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
    const { description, title } = req.body
    const createdTopic = await Topic.create({
      description,
      title,
      author: currentUser,
    })
    res.json(createdTopic)
  } catch (error) {
    next(error)
  }
}
