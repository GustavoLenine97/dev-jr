import * as authService from '../services/authService.js'

export async function login(req, res, next) {
    try {
        const token = await authService.login(req.body)

        return res.status(200).json(token)
    } catch (err) {
        next(err)
    }
}

export async function refresh(req, res, next) {
    try {
        const token = await authService.refresh(req.body.refreshToken)

        return res.status(200).json(token)
    } catch (err) {
        next(err)
    }
}

export async function logout(req, res, next) {
    try {
        console.log(req.body)
        
        const result = await authService.logout(
            req.body.refreshToken
        )

        return res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}