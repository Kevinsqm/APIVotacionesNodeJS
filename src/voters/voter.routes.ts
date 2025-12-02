import { Router } from "express";
import { create, deleteById, getAll, getById } from "./voter.controller";
import validateToken from "../middlewares/validateToken";

const voterRouter = Router();

/**
 * @swagger
 * /api/v1/voters:
 *   get:
 *     summary: Obtener todos los votantes
 *     description: Retorna la lista de todos los votantes registrados en el sistema. Requiere autenticación JWT.
 *     tags:
 *       - Voters
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de votantes obtenida exitosamente
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
 *                   idCard:
 *                     type: integer
 *                     example: 1032456789
 *                   name:
 *                     type: string
 *                     example: Juan Pérez
 *                   email:
 *                     type: string
 *                     example: juanperez@example.com
 *                   hasVoted:
 *                     type: boolean
 *                     example: false
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
voterRouter.get("/", validateToken, getAll);

/**
 * @swagger
 * /api/v1/voters/{id}:
 *   get:
 *     summary: Obtener un votante por ID
 *     description: Retorna la información de un votante específico según su ID. Requiere autenticación JWT.
 *     tags:
 *       - Voters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del votante a consultar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Votante encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 idCard:
 *                   type: integer
 *                   example: 1032456789
 *                 name:
 *                   type: string
 *                   example: Juan Pérez
 *                 email:
 *                   type: string
 *                   example: juanperez@example.com
 *                 hasVoted:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: No existe un votante con el ID proporcionado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
voterRouter.get("/:id", validateToken, getById);

/**
 * @swagger
 * /api/v1/voters:
 *   post:
 *     summary: Crear un nuevo votante
 *     description: Crea un nuevo votante en el sistema. Requiere autenticación JWT.
 *     tags:
 *       - Voters
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
 *               - email
 *             properties:
 *               idCard:
 *                 type: integer
 *                 description: Número de identificación único
 *                 example: 1032456789
 *               name:
 *                 type: string
 *                 description: Nombre completo del votante
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del votante
 *                 example: juanperez@example.com
 *     responses:
 *       201:
 *         description: Votante creado exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
voterRouter.post("/", validateToken, create);

/**
 * @swagger
 * /api/v1/voters/{id}:
 *   delete:
 *     summary: Eliminar un votante por ID
 *     description: Elimina un votante del sistema por su ID. Requiere autenticación JWT.
 *     tags:
 *       - Voters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del votante a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Votante eliminado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: No existe un votante con el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 */
voterRouter.delete("/:id", validateToken, deleteById);

export default voterRouter;