import sql from '../database.js'
import * as historyService from './historyService.js'
import { getIO } from './socket.js'

export async function list(user) {
    if (user.role === 'admin') {
        return await sql`
            SELECT 
                t.id,
                t.title,
                t.description,
                t.priority,
                t.category_id,
                c.title AS category,
                s.title AS status,
                u.name AS user
            FROM tickets t
            JOIN status s ON t.status_id = s.id
            JOIN users u ON t.user_id = u.id
            JOIN categories c ON t.category_id = c.id
        `
    }

    return await sql`
        SELECT 
            t.id,
            t.title,
            t.description,
            t.priority,
            c.title AS category,
            s.title as status,
            u.name as user
        FROM tickets t
        JOIN status s ON t.status_id = s.id
        JOIN users u ON t.user_id = u.id
        JOIN categories c ON t.category_id = c.id
        WHERE t.user_id = ${user.id}
    `
}

export async function getById(id, user) {
    const tickets = await sql`
        SELECT 
            t.id,
            t.title,
            t.description,
            s.title AS status,
            t.priority,
            t.category_id,
            c.title AS category,
            u.name AS user,
            t.user_id
        FROM tickets t
        JOIN status s ON t.status_id = s.id
        JOIN users u ON t.user_id = u.id
        JOIN categories c ON t.category_id = c.id
        WHERE t.id = ${id}
    `

    if (tickets.length === 0) {
        const error = new Error('Ticket não encontrado')
        error.status = 404
        throw error
    }

    const ticket = tickets[0]

    if (user.role !== 'admin' && ticket.user_id !== user.id) {
        const error = new Error('Você não tem permissão para acessar este ticket')
        error.status = 403
        throw error
    }

    return ticket
}

export async function create(data, user) {
    if ('status_id' in data) {
        const error = new Error(
            'Não é permitido enviar status_id ao criar um ticket'
        )
        error.status = 400
        throw error
    }


    const { title, description, priority, categoryId } = await validateTicketData(data)

    const ticket = await sql`
        INSERT INTO tickets (title, description, status_id, user_id, priority, category_id)
        VALUES (${title}, ${description}, 1, ${user.id},${priority}, ${categoryId})
        RETURNING id, title, description, status_id, user_id, priority, category_id
    `
    const result = await sql`
        SELECT 
            t.id,
            t.title,
            t.description,
            t.priority,
            c.title as category,
            s.title AS status,
            u.name AS user
        FROM tickets t
        JOIN status s ON t.status_id = s.id
        JOIN users u ON t.user_id = u.id
        JOIN categories c on t.category_id = c.id
        WHERE t.id = ${ticket[0].id}
    `

    const newTicket = result[0]

    getIO().emit('ticket:created', newTicket)

    return newTicket
}

export async function update(id, data, user) {
    const ticket = await sql`
        SELECT *
        FROM tickets
        WHERE id = ${id}
    `

    if (ticket.length === 0) {
        const error = new Error('Ticket não encontrado')
        error.status = 404
        throw error
    }

    if (user.role !== 'admin') {
        const error = new Error('Apenas administradores podem alterar tickets')
        error.status = 403
        throw error
    }

    if ('status_id' in data) {
        const error = new Error(
            'Use a rota /tickets/:id/status para alterar o status'
        )
        error.status = 400
        throw error
    }

    const { title, description, priority, categoryId } = await validateTicketData(data)

    const oldPriority = ticket[0].priority

    const oldCategoryId = ticket[0].category_id

    const updatedTicket = await sql`
        UPDATE tickets
        SET
            title = ${title},
            description = ${description},
            priority = ${priority},
            category_id = ${categoryId}
        WHERE id = ${id}
        RETURNING id, title, description, status_id, user_id, priority, category_id
    `
    if (oldPriority !== priority) {
        await historyService.create(
            id,
            user.id,
            'PRIORITY CHANGED',
            oldPriority,
            priority
        )
    }

    const oldCategory = await sql`
        SELECT title
        FROM categories
        WHERE id = ${oldCategoryId}
    `

    const newCategory = await sql`
        SELECT title
        FROM categories
        WHERE id = ${categoryId}
    `

    if (oldCategoryId !== categoryId) {
        await historyService.create(
            id,
            user.id,
            'CATEGORY_CHANGED',
            oldCategory[0].title,
            newCategory[0].title
        )
    }

    const result = await sql`
        SELECT
            t.id,
            t.title,
            t.description,
            t.priority,
            t.category_id,
            s.title AS status,
            u.name AS user,
            c.title AS category
        FROM tickets t
        JOIN status s ON t.status_id = s.id
        JOIN users u ON t.user_id = u.id
        JOIN categories c on t.category_id = c.id
        WHERE t.id = ${id}
    `

    const updatedTickets = result[0]

    getIO().emit('ticket:updated', updatedTickets)

    return updatedTickets
}

export async function remove(id, user) {
    const ticket = await sql`
        SELECT *
        FROM tickets
        WHERE id = ${id}
    `

    if (ticket.length === 0) {
        const error = new Error('Ticket não encontrado')
        error.status = 404
        throw error
    }

    if (user.role !== 'admin' && ticket[0].user_id !== user.id) {
        const error = new Error('Você não tem permissão para excluir este ticket')
        error.status = 403
        throw error
    }

    await sql`
        DELETE FROM tickets
        WHERE id = ${id}
    `
    getIO().emit('ticket:deleted', {
        id: Number(id)
    })
    
    return true
}

async function validateTicketData(data) {
    const title = typeof data.title === 'string'
        ? data.title.trim()
        : ''

    const description = typeof data.description === 'string'
        ? data.description.trim()
        : ''

    const priority = typeof data.priority === 'string'
        ? data.priority.trim().toLowerCase()
        : 'medium'

    const allowedPriorities = ['low', 'medium', 'high', 'critical']

    if (!title) {
        const error = new Error('O título é obrigatório')
        error.status = 400
        throw error
    }

    if (title.length < 3) {
        const error = new Error('O título deve ter pelo menos 3 caracteres')
        error.status = 400
        throw error
    }

    if (title.length > 100) {
        const error = new Error('O título deve ter no máximo 100 caracteres')
        error.status = 400
        throw error
    }

    if (!description) {
        const error = new Error('A descrição é obrigatória')
        error.status = 400
        throw error
    }

    if (description.length < 5) {
        const error = new Error('A descrição deve ter pelo menos 5 caracteres')
        error.status = 400
        throw error
    }

    if (description.length >= 1000) {
        const error = new Error('A descrição deve ter no máximo 1000 caracteres')
        error.status = 400
        throw error
    }

    if (!allowedPriorities.includes(priority)) {
        const error = new Error(
            'Prioridade inválida. Use: low, medium, high ou critical'
        )
        error.status = 400
        throw error
    }

    const categoryId = Number(data.category_id)

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
        const error = new Error(
            'category_id deve ser um número inteiro válido'
        )
        error.status = 400
        throw error
    }

    const category = await sql`
        SELECT id
        FROM categories
        WHERE id = ${categoryId}
    `

    if (category.length === 0) {
        const error = new Error('Categoria inválida')
        error.status = 400
        throw error
    }

    return {
        title,
        description,
        priority,
        categoryId
    }
}

export async function updateStatus(id, statusId, user) {
    if (user.role !== 'admin') {
        const error = new Error(
            'Apenas administradores podem alterar o status'
        )
        error.status = 403
        throw error
    }

    const ticket = await sql`
        SELECT
            t.id,
            t.status_id,
            s.title AS status
        FROM tickets t
        JOIN status s ON t.status_id = s.id
        WHERE t.id = ${id}
    `

    if (ticket.length === 0) {
        const error = new Error('Ticket não encontrado')
        error.status = 404
        throw error
    }

    const parsedStatusId = Number(statusId)

    if (!Number.isInteger(parsedStatusId) || parsedStatusId <= 0) {
        const error = new Error(
            'status_id deve ser um número inteiro válido'
        )
        error.status = 400
        throw error
    }

    const status = await sql`
        SELECT id, title
        FROM status
        WHERE id = ${parsedStatusId}
    `

    if (status.length === 0) {
        const error = new Error('Status inválido')
        error.status = 400
        throw error
    }

    const oldStatus = ticket[0].status
    const newStatus = status[0].title

    if (ticket[0].status_id !== parsedStatusId) {
        await sql`
            UPDATE tickets
            SET status_id = ${parsedStatusId}
            WHERE id = ${id}
        `

        await historyService.create(
            id,
            user.id,
            'STATUS_CHANGED',
            oldStatus,
            newStatus
        )
    }

    const result = await sql`
        SELECT
            t.id,
            t.title,
            t.description,
            t.priority,
            c.title AS category,
            s.title AS status,
            u.name AS user
        FROM tickets t
        JOIN status s ON t.status_id = s.id
        JOIN users u ON t.user_id = u.id
        JOIN categories c ON t.category_id = c.id
        WHERE t.id = ${id}
    `
    const updatedTicket = result[0]

    getIO().emit('ticket:statusUpdated', updatedTicket)

    return updatedTicket
}