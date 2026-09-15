import * as statusService from '../services/statusService.js'

export async function createStatus(req, res, next) {
    try {
        const status = await statusService.create(req.body)

        return res.status(201).json(status)
    } catch (error) {
        next(error)
    }
}

export async function listStatus(req, res, next) {
    try {
        const status = await statusService.list()

        return res.json(status)
    } catch (error) {
        next(error)
    }
}

export async function updateStatus(req, res, next) {
    try {
        const status = await statusService.update(req.params.id, req.body)

        return res.json(status)
    } catch (error) {
        next(error)
    }
}

export async function deleteStatus(req, res, next) {
    try {
        await statusService.remove(req.params.id)

        return res.status(200).json({
            message: 'Status removido com sucesso!'
        })
    } catch (error) {
        next(error)
    }
}