import sql from '../src/database.js'

export async function up() {
    await sql`
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `
}

export async function down() {
    await sql`
        DROP TABLE IF EXISTS categories;
    `
}