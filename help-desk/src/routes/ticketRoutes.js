import { Router } from 'express'
import { createTicket, deleteTicket, getById, listTicket, updateTicket, updateStatus } from '../controllers/ticketController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { authorize } from '../middlewares/authorizeMiddleware.js'

const routerTicket = Router()

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Lista os tickets
 *     description: Admins visualizam todos os tickets. Clientes visualizam apenas seus próprios tickets.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário sem permissão
 */
routerTicket.get('/', authMiddleware, authorize("admin","client"), listTicket)
/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Busca um ticket pelo ID
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     responses:
 *       200:
 *         description: Ticket encontrado
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário sem permissão
 *       404:
 *         description: Ticket não encontrado
 */
routerTicket.get('/:id', authMiddleware, authorize("admin","client"), getById)
/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Cria um novo ticket
 *     description: O ticket é criado automaticamente com status Aberto.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTicket'
 *     responses:
 *       201:
 *         description: Ticket criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 */
routerTicket.post('/', authMiddleware, authorize("admin","client"),createTicket)
/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     summary: Atualiza título e descrição de um ticket
 *     description: Apenas administradores podem editar tickets.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTicket'
 *     responses:
 *       200:
 *         description: Ticket atualizado
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Apenas administradores
 *       404:
 *         description: Ticket não encontrado
 */
routerTicket.put('/:id', authMiddleware, authorize("admin"),updateTicket)
/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Remove um ticket
 *     description: Apenas administradores podem excluir tickets.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     responses:
 *       200:
 *         description: Ticket removido com sucesso
 *       403:
 *         description: Apenas administradores
 *       404:
 *         description: Ticket não encontrado
 */
routerTicket.delete('/:id', authMiddleware, authorize("admin"),deleteTicket)
/**
 * @swagger
 * /tickets/{id}/status:
 *   patch:
 *     summary: Altera o status de um ticket
 *     description: Apenas administradores podem alterar o status.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 18
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatus'
 *     responses:
 *       200:
 *         description: Status atualizado
 *       400:
 *         description: Status inválido
 *       403:
 *         description: Apenas administradores
 *       404:
 *         description: Ticket não encontrado
 */
routerTicket.patch('/:id/status', authMiddleware, authorize('admin'),updateStatus)

export default routerTicket