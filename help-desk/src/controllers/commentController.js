import * as commentService from '../services/commentService.js'

export async function listComments(req, res, next) {
    try {
        const { id } = req.params

        const comments = await commentService.list(
            id,
            req.user
        )

        return res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export async function createComment(req, res, next) {
    try {
        const { id } = req.params
        const { content } = req.body

        const comment = await commentService.create(
            id,
            content,
            req.user
        )

        return res.status(201).json(comment)
    } catch (error) {
        next(error)
    }
}

export async function deleteComment(req, res, next) {
    try {
        const { id } = req.params

        await commentService.remove(
            id,
            req.user
        )

        return res.status(204).send()
    } catch (error) {
        next(error)
    }
}