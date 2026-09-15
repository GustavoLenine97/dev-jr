import sql from '../database.js'
import { getIO } from './socket.js'

export async function list(ticketId, user) {
    const parsedTicketId = Number(ticketId)

    if (!Number.isInteger(parsedTicketId) || parsedTicketId <= 0) {
        const error = new Error('ticket_id deve ser um número inteiro válido')
        error.status = 400
        throw error
    }

    const ticket = await sql`
        SELECT id, user_id
        FROM tickets
        WHERE id = ${parsedTicketId}
    `

    if (ticket.length === 0) {
        const error = new Error('Ticket não encontrado')
        error.status = 404
        throw error
    }

    if (user.role !== 'admin' && ticket[0].user_id !== user.id) {
        const error = new Error(
            'Você não tem permissão para acessar os comentários deste ticket'
        )
        error.status = 403
        throw error
    }

    return await sql`
        SELECT
            c.id,
            c.ticket_id,
            c.content,
            c.created_at,
            u.id AS user_id,
            u.name AS user
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.ticket_id = ${parsedTicketId}
        ORDER BY c.created_at ASC
    `
}

export async function create(ticketId, content, user) {
    const parsedTicketId = Number(ticketId)

    if (!Number.isInteger(parsedTicketId) || parsedTicketId <= 0) {
        const error = new Error('ticket_id deve ser um número inteiro válido')
        error.status = 400
        throw error
    }

    const comment = typeof content === 'string'
        ? content.trim()
        : ''

    if (!comment) {
        const error = new Error('O comentário é obrigatório')
        error.status = 400
        throw error
    }

    if (comment.length < 2) {
        const error = new Error(
            'O comentário deve ter pelo menos 2 caracteres'
        )
        error.status = 400
        throw error
    }

    if (comment.length > 1000) {
        const error = new Error(
            'O comentário deve ter no máximo 1000 caracteres'
        )
        error.status = 400
        throw error
    }

    const ticket = await sql`
        SELECT id, user_id
        FROM tickets
        WHERE id = ${parsedTicketId}
    `

    if (ticket.length === 0) {
        const error = new Error('Ticket não encontrado')
        error.status = 404
        throw error
    }

    if (user.role !== 'admin' && ticket[0].user_id !== user.id) {
        const error = new Error(
            'Você não tem permissão para comentar neste ticket'
        )
        error.status = 403
        throw error
    }

    const result = await sql`
        INSERT INTO comments (
            ticket_id,
            user_id,
            content
        )
        VALUES (
            ${parsedTicketId},
            ${user.id},
            ${comment}
        )
        RETURNING id, ticket_id, user_id, content, created_at
    `

    const createdComment = await sql`
        SELECT 
            c.id,
            c.ticket_id,
            c.content,
            c.created_at,
            u.name AS user
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.id = ${result[0].id}
    `
    const newComment = createdComment[0]

    getIO().emit('comment:created', newComment)

    return newComment

}

export async function remove(commentId, user) {
    const parsedCommentId = Number(commentId)

    if (!Number.isInteger(parsedCommentId) || parsedCommentId <= 0) {
        const error = new Error('comment_id deve ser um número inteiro válido')
        error.status = 400
        throw error
    }

    const comments = await sql`
        SELECT id, user_id
        FROM comments
        WHERE id = ${parsedCommentId}
    `

    if (comments.length === 0) {
        const error = new Error('Comentário não encontrado')
        error.status = 404
        throw error
    }

    const comment = comments[0]

    if (user.role !== 'admin' && comment.user_id !== user.id) {
        const error = new Error(
            'Você não tem permissão para excluir este comentário'
        )
        error.status = 403
        throw error
    }

    await sql`
        DELETE FROM comments
        WHERE id = ${parsedCommentId}
    `

    return true
}