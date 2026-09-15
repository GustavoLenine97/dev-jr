import sql from '../database.js'

export async function list() {
    return await sql`
        SELECT * FROM categories`
}

export async function create(data) {
    if (!data.title ) {
        const error = new Error('Preencha todos os campos eles são obrigatórios')
        error.status = 404
        throw error
    }
    
    
    return await sql`
        INSERT INTO categories (title)
        VALUES (${data.title})
        RETURNING *
    `
}

export async function update(id, data) {
    const category = await sql`
        UPDATE categories
        SET
            title = ${data.title}
        WHERE id = ${id}
        RETURNING *
    `

    if (category.length === 0) {
        const error = new Error('Categoria não encontrado')
        error.status = 404
        throw error
    }

    return category
}

export async function remove(id, data) {
    const category = await sql`
        DELETE FROM categories
        WHERE id = ${id}
        RETURNING *
    `

    if (category.length === 0) {
        const error = new Error('Categoria não encontrado')
        error.status = 404
        throw error
    }

    return category
}


