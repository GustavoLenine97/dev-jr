import sql from '../database.js'

export async function create(
    ticketId,
    userId,
    action,
    oldValue = null,
    newValue = null
) {
    const result = await sql`
        INSERT INTO ticket_history (
            ticket_id,
            user_id,
            action,
            old_value,
            new_value
        )
        VALUES (
            ${ticketId},
            ${userId},
            ${action},
            ${oldValue},
            ${newValue}
        )
        RETURNING
            id,
            ticket_id,
            user_id,
            action,
            old_value,
            new_value,
            created_at
    `

    return result[0]
}