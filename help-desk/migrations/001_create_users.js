import sql from '../src/database.js'

export async function up() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `
}

export async function down() {
    await sql`
        DROP TABLE IF EXISTS users;
    `
}