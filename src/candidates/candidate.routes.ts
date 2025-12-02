import { Router } from "express";
import { create, deleteById, getAll, getById } from "./candidate.controller";
import validateToken from "../middlewares/validateToken";

const candidateRouter = Router();

/**
 * @swagger
 * /api/v1/candidates:
 *  get:
 *    summary: Obtener todos los candidatos
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Candidates
 *    responses:
 *      200:
 *        description: Candidatos obtenidos exitosamente
 *      401:
 *        description: No autenticado
 *      403:
 *        description: No autorizado
 *      500:
 *        description: Error interno del servidor
 * 
 * 
 */
candidateRouter.get("/", validateToken, getAll);

/**
 * @swagger
 * api/v1/candidates/{id}:
 *   get:
 *     summary: Obtener un candidato por su ID
 *     tags:
 *       - Candidates
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del candidato
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idCard:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 party:
 *                   type: string
 *                   nullable: true
 *                 votes:
 *                   type: integer
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: No existe un candidato con el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 */
candidateRouter.get("/:id", validateToken, getById);

/**
 * @swagger
 * /api/v1/candidates:
 *   post:
 *     summary: Crear un nuevo candidato
 *     description: Crea un nuevo candidato en el sistema. Requiere autenticación mediante JWT.
 *     tags:
 *       - Candidates
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCard
 *               - name
 *               - party
 *             properties:
 *               idCard:
 *                 type: integer
 *                 example: 123456789
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               party:
 *                 type: string
 *                 example: Partido Verde
 *     responses:
 *       201:
 *         description: Candidato creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
candidateRouter.post("/", validateToken, create);

/**
 * @swagger
 * /api/v1/candidates/{id}:
 *   delete:
 *     summary: Eliminar un candidato
 *     description: Elimina un candidato existente por ID. Requiere autenticación JWT.
 *     tags:
 *       - Candidates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del candidato a eliminar
 *     responses:
 *       200:
 *         description: Candidato eliminado exitosamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Candidato no encontrado
 *       500:
 *         description: Error interno del servidor
 */
candidateRouter.delete("/:id", validateToken, deleteById);

export default candidateRouter;