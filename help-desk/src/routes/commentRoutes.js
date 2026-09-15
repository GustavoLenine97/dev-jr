import { Router } from 'express'
import { createComment, listComments, deleteComment } from '../controllers/commentController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const routerComment = Router()

routerComment.post('/tickets/:id/comments', authMiddleware, createComment)
routerComment.get('/tickets/:id/comments', authMiddleware, listComments)
routerComment.delete('/comments/:id', authMiddleware, deleteComment)

export default routerComment