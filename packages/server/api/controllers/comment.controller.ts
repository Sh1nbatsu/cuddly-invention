import Comment, { CommentCreationAttributes } from 'api/db/models/Comment.model'
import { RequestWithValidateData } from 'api/types/request'
import { NextFunction, Response } from 'express'

interface CreateCommentParams {
  topicId: string
}

export const createComment = async (
  req: RequestWithValidateData<CommentCreationAttributes>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { content, parentCommentId = null } = req.body
    // @ts-ignore TODO:
    const authorId = (req.user as any).id
    const topicId = parseInt((req.params as CreateCommentParams).topicId, 10)

    const comment = await Comment.create({
      content,
      topicId,
      authorId,
      parentCommentId,
    })

    res.status(201).json(comment)
  } catch (error) {
    next(error)
  }
}
