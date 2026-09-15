import * as userService from '../services/userService.js'

export async function createUser(req, res, next) {
    try {
        const user = await userService.create(req.body)

        return res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export async function listUser(req, res, next) {
    try {
        const users = await userService.list()

        return res.json(users)
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req, res, next) {
    try {
        const user = await userService.update(req.params.id, req.body)

        return res.json(user)
    } catch (error) {
        next(error)
    }
}

export async function deleteUser(req, res, next) {
    try {
        await userService.remove(req.params.id)

        return res.status(200).json({
            message: 'Usuário removido com sucesso!'
        })
    } catch (error) {
        next(error)
    }
}