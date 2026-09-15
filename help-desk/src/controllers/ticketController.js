import * as ticketService from '../services/ticketService.js'

export async function createTicket(req, res, next) {
    try {
        const ticket = await ticketService.create(req.body, req.user)

        return res.status(201).json(ticket)
    } catch (error) {
        next(error)
    }
}

export async function listTicket(req, res, next) {
    try {
        const tickets = await ticketService.list(req.user)

        return res.json(tickets)
    } catch (error) {
        next(error)
    }
}

export async function getById(req, res, next) {
    try {
        const ticket = await ticketService.getById(req.params.id, req.user)

        res.status(200).json(ticket)
    } catch (error) {
        next(error)
    }
}

export async function updateTicket(req, res, next) {
    try {
        const ticket = await ticketService.update(req.params.id, req.body, req.user)

        return res.json(ticket)
    } catch (error) {
        next(error)
    }
}

export async function deleteTicket(req, res, next) {
    try {
        await ticketService.remove(req.params.id, req.user)

        return res.status(200).json({
            message: 'Ticket removido com sucesso!'
        })
    } catch (error) {
        next(error)
    }
}

export async function updateStatus(req, res, next) {
    try {
        const ticket = await ticketService.updateStatus(
            req.params.id,
            req.body.status_id,
            req.user
        )

        return res.json(ticket)
    } catch (error) {
        next(error)
    }
}