import { Router } from 'express'
import { createUser, deleteUser, listUser, updateUser } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { authorize } from '../middlewares/authorizeMiddleware.js'

const routerUser = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna a lista de usuários cadastrados. Apenas administradores podem acessar.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Apenas administradores podem acessar
 */
routerUser.get('/', authMiddleware, authorize("admin"), listUser)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um usuário
 *     description: Cria um novo usuário. Apenas administradores podem criar usuários.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - client
 *                 example: client
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Apenas administradores podem criar usuários
 */
routerUser.post('/', authMiddleware, authorize("admin"), createUser)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário. Apenas administradores podem realizar esta operação.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: novaSenha123
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - client
 *                 example: client
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Apenas administradores podem atualizar usuários
 *       404:
 *         description: Usuário não encontrado
 */
routerUser.put('/:id', authMiddleware, authorize("admin"), updateUser)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     description: Remove um usuário do sistema. Apenas administradores podem realizar esta operação.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Apenas administradores podem excluir usuários
 *       404:
 *         description: Usuário não encontrado
 */
routerUser.delete('/:id', authMiddleware, authorize("admin"),deleteUser)

export default routerUser

