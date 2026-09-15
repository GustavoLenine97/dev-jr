import sql from '../src/database.js'

export async function up() {
    await sql`
        CREATE TABLE IF NOT EXISTS tickets (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT,
            user_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP DEFAULT NOW()
        );
    `
}

export async function down() {
    await sql`
        DROP TABLE IF EXISTS tickets;
    `
}