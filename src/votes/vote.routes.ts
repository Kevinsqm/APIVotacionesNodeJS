import { Router } from "express";
import { getAll, create, getStatistics } from "./vote.controller";
import validateToken from "../middlewares/validateToken";

const voteRouter = Router();

/**
 * @swagger
 * /api/v1/votes:
 *   get:
 *     summary: Obtener todos los votos
 *     description: Retorna la lista completa de votos, incluyendo información del votante y del candidato asociado. Requiere autenticación JWT.
 *     tags:
 *       - Votes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de votos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   voter:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Luis"
 *                   candidate:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 7
 *                       name:
 *                         type: string
 *                         example: "Diego"
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
voteRouter.get("/", validateToken, getAll);

/**
 * @swagger
 * /api/v1/votes/statistics:
 *   get:
 *     summary: Obtener estadísticas de votaciones
 *     description: Retorna estadísticas generales del sistema de votación, incluyendo número total de votantes y estadísticas por candidato. Requiere autenticación JWT.
 *     tags:
 *       - Votes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalVoters:
 *                   type: integer
 *                   example: 2
 *                 candidatesStatistics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       candidateId:
 *                         type: integer
 *                         example: 7
 *                       name:
 *                         type: string
 *                         example: "Diego"
 *                       votes:
 *                         type: integer
 *                         example: 2
 *                       percentage:
 *                         type: number
 *                         format: float
 *                         example: 100
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
voteRouter.get("/statistics", validateToken, getStatistics);

/**
 * @swagger
 * /api/v1/votes:
 *   post:
 *     summary: Registrar un nuevo voto
 *     description: Registra un voto asignando un votante y un candidato. Un votante solo puede votar una vez. Requiere autenticación JWT.
 *     tags:
 *       - Votes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - candidateId
 *               - voterId
 *             properties:
 *               candidateId:
 *                 type: integer
 *                 example: 7
 *               voterId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Voto registrado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: Candidato o votante no encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

voteRouter.post("/", validateToken, create);

export default voteRouter;