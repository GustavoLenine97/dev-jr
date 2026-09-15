import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sql from '../database.js'
import crypto from 'crypto'

export async function login(data) {
    const user = await sql`
        SELECT * FROM users
        WHERE email = ${data.email}
    `

    if (user.length === 0) {
        const error = new Error('Email inválido')
        error.status = 401
        throw error
    }

    const passwordMatch = await bcrypt.compare(
        data.password,
        user[0].password
    )

    if (!passwordMatch) {
        const error = new Error('Senha incorreta')
        error.status = 401
        throw error
    }

    const accessToken = jwt.sign(
        {
            id: user[0].id,
            email: user[0].email,
            role: user[0].role,
            name: user[0].name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "60m"
        }
    )

    const refreshToken = jwt.sign(
        {
            id: user[0].id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d",
            jwtid: crypto.randomUUID()
        }
    )

    await sql`
        INSERT INTO refresh_tokens (
            token,
            user_id,
            expires_at
        )
        VALUES (
            ${refreshToken},
            ${user[0].id},
            NOW() + INTERVAL '7 days'
        )
    `

    return {
        accessToken,
        refreshToken
    }
}

export async function refresh(refreshToken) {
    if(!refreshToken){
        const error = new Error("Refresh token não informado")
        error.status = 401
        throw error
    }

    let payload

    try {
        payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        )
    } catch {
        const error = new Error("Refresh token inválido")
        error.status = 401
        throw error
    }

    const storedToken = await sql`
        SELECT * FROM refresh_tokens
        WHERE token = ${refreshToken}
    `

    if (storedToken.length === 0) {
        const error = new Error("Refresh token revogado")
        error.status = 401
        throw error
    }

    const user = await sql`
        SELECT * FROM users
        WHERE id = ${payload.id}
    `

    if(user.length === 0){
        const error = new Error("Usuário não encontrado")
        error.status = 404
        throw error
    }

    const newRefreshToken = jwt.sign(
        {
            id: user[0].id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d",
            jwtid: crypto.randomUUID()
        }
    )

    await sql`
        INSERT INTO refresh_tokens (
            token,
            user_id,
            expires_at
        )
        VALUES (
            ${newRefreshToken},
            ${user[0].id},
            NOW() + INTERVAL '7 days'
        )
    `

    const accessToken = jwt.sign(
        {
            id: user[0].id,
            email: user[0].email,
            role: user[0].role,
            name: user[0].name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )

    return {
        accessToken,
        refreshToken: newRefreshToken
    }
}

export async function logout(refreshToken) {
    if (!refreshToken) {
        const error = new Error("Refresh token não informado")
        error.status = 401
        throw error
    }

    try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch {
        const error = new Error("Refresh token inválido")
        error.status = 401
        throw error
    }

    const deletedToken = await sql`
        DELETE FROM refresh_tokens
        WHERE token = ${refreshToken}
        RETURNING *
    `

    if(deletedToken.length === 0){
        const error = new Error("Refresh token revogado")
        error.status = 401
        throw error
    }

    return {
        message: "Logout realizado com sucesso"
    }
}