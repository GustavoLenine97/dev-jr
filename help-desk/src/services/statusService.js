import sql from '../database.js'

export async function list() {
    return await sql`
        SELECT * FROM status`
}

export async function create(data) {
    if (!data.title) {
        const error = new Error('Preencha todos os campos eles são obrigatórios')
        error.status = 400
        throw error
    }
    
    return await sql`
        INSERT INTO status (title)
        VALUES (${data.title})
        RETURNING *
    `
}

export async function update(id, data) {
    const status = await sql`
        UPDATE status
        SET
            title = ${data.title}
        WHERE id = ${id}
        RETURNING *
    `

    if (status.length === 0) {
        const error = new Error('Status não encontrado')
        error.status = 404
        throw error
    }

    return status
}

export async function remove(id) {
    const status = await sql`
        DELETE FROM status
        WHERE id = ${id}
        RETURNING *
    `

    if (status.length === 0) {
        const error = new Error('Status não encontrado')
        error.status = 404
        throw error
    }

    return status
}
