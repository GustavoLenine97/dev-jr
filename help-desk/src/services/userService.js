import sql from '../database.js'
import bcrypt from 'bcrypt'

export async function list() {
    return await sql`
        SELECT * FROM users`
}

export async function create(data) {
    if (!data.name || !data.email || !data.password) {
        const error = new Error('Preencha todos os campos eles são obrigatórios')
        error.status = 400
        throw error
    }

    const userExists = await sql`
        SELECT id
        FROM users
        WHERE email = ${data.email}
    `

    if (userExists.length > 0) {
        const error = new Error('E-mail já cadastrado')
        error.status = 409
        throw error
    }

    const hash = await bcrypt.hash(data.password, 10)

    return await sql`
        INSERT INTO users (name, age,email, password)
        VALUES (${data.name},${data.age},${data.email},${hash})
        RETURNING id, name, age, email
    `
}

export async function update(id, data) {
    const user = await sql`
        UPDATE users
        SET
            name = ${data.name},
            age = ${data.age},
            email = ${data.email}
        WHERE id = ${id}
        RETURNING *
    `

    if (user.length === 0) {
        const error = new Error('Usuário não encontrado')
        error.status = 404
        throw error
    }

    return user
}

export async function remove(id) {
    const user = await sql`
        DELETE FROM users
        WHERE id = ${id}
        RETURNING *
    `

    if (user.length === 0) {
        const error = new Error('Usuário não encontrado')
        error.status = 404
        throw error
    }

    return user
}


