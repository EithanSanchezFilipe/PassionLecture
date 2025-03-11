import { Router } from 'express';
import { Search } from '../controller/search.mjs';
const router = Router();

//GET
/**
 * @swagger
 * /search/:
 *   post:
 *     tags: [Search]
 *     security:
 *       - cookieAuth: []
 *     summary: Utiliser la barre de recherche.
 *     description: Trouver qch depuis la barre de recherche.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Trouver qch depuis la barre de recherche."
 *     responses:
 *       201:
 *         description: Recherche réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: "Trouver qch depuis la barre de recherche."
 *                   example: Gaston
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nom manquant"
 */
router.get('/', Search);
export default router;
