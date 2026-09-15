import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import routerUser from './routes/userRoutes.js'
import routerTicket from './routes/ticketRoutes.js'
import routerCategory from './routes/categoryRoutes.js'
import routerStatus from './routes/statusRoutes.js'
import routerAuth from './routes/authRoutes.js'
import routerComment from './routes/commentRoutes.js'

import { errorHandler } from './middlewares/errorHandler.js'
import 'dotenv/config'

import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js'
import cors from 'cors'
import { Socket } from 'dgram'
import { initSocket } from './services/socket.js'

const app = express()

const server = createServer(app)

initSocket(server)

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/users',routerUser)
app.use('/tickets',routerTicket)
app.use('/categories',routerCategory)
app.use('/status',routerStatus)
app.use(routerComment)
app.use(errorHandler)
app.use('/auth',routerAuth)

server.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000')
})
