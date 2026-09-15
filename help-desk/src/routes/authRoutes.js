import { Router } from 'express'
import * as authController from '../controllers/authController.js'

const routerAuth = Router('/auth')

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login
 *     description: Autentica o usuário e retorna um access token e um refresh token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Email ou senha inválidos
 */
routerAuth.post('/login', authController.login)
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renova o access token
 *     description: Gera um novo access token utilizando um refresh token válido.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIs...
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *       401:
 *         description: Refresh token inválido ou expirado
 */
routerAuth.post('/refresh',authController.refresh)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Realiza logout
 *     description: Invalida o refresh token do usuário.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIs...
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Refresh token inválido
 */
routerAuth.post('/logout', authController.logout)

export default routerAuth