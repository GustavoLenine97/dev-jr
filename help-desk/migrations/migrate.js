import { up as createUsers } from './001_create_users.js'
import { up as createTickets } from './002_create_tickets.js'
import { up as createCategory } from './003_create_category.js'
import { up as createStatus } from './004_create_status.js'
import { up as createRefreshTokens } from './005_create_refresh_tokens.js'

await createUsers()
await createTickets()
await createCategory()
await createStatus()
await createRefreshTokens()

console.log('Banco criado com sucesso!')
process.exit()