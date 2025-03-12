import { Router } from 'express';
import { Create, FindByCategory, Delete } from '../controller/category.mjs';
import { auth } from '../middleware/auth.mjs';

const router = Router();

// POST
/**
 * @swagger
 * /category:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Créer une nouvelle catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       401:
 *         description: Pas autorisé
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur serveur
 */
router.post('/', auth, Create);

// GET
/**
 * @swagger
 * /category/{id}/books:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Trouver des livres par catégorie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des livres par catégorie
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/books', FindByCategory);

// DELETE
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Supprimer une catégorie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       401:
 *         description: Pas autorisé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', auth, Delete);

export default router;
