import { Router } from 'express';
import {
  Create,
  Update,
  Delete,
  DeleteComment,
  Reach,
  Rating,
  All,
  GetComments,
} from '../controller/book.mjs';
import { auth } from '../middleware/auth.mjs';
const router = Router();

// POST
/**
 * @swagger
 * /book/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Créer un nouveau livre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - summary
 *               - editionYear
 *               - pages
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: integer
 *               summary:
 *                 type: string
 *               editionYear:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               category_fk:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book créer avec succès
 *       401:
 *         description: Pas autorisé
 *       400:
 *         description: erreur de validation
 *       500:
 *         description: erreur serveur
 */
router.post('/add', auth, Create);
/**
 * @swagger
 * /book/{id}/rating:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Ajouter une note à un livre
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note ajoutée avec succès
 *       401:
 *         description: Pas autorisé
 *       400:
 *        description: erreur de validation
 *       500:
 *        description: erreur serveur
 */

router.post('/:id/comments', auth, Rating);

router.get('/:id/comments', auth, GetComments);
// GET
/**
 * @swagger
 * /book/search:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Rechercher un/des livre(s)
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Rechercher un livre par son nom
 *     responses:
 *       200:
 *         description: Liste des livres
 *       401:
 *         description: Pas autorisé
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: erreur serveur
 */
router.get('/', All);
/**
 * @swagger
 * /book/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Rechercher un livre par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: avoir le détail d'un livre
 *       404:
 *         description: Livre non trouvé
 *       401:
 *         description: Pas autorisé
 *       500:
 *         description: erreur serveur
 */

router.get('/:id', auth, Reach);
// DELETE
/**
 * @swagger
 * /book/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Supprimé un livre
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livre supprimé avec succès
 *       404:
 *         description: Livre non trouvé
 *       401:
 *         description: Pas autorisé
 *       500:
 *         description: erreur serveur
 */

router.delete('/:id', auth, Delete);
/**
 * @swagger
 * /book/delete/comment/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Supprimé le commentaire d'un livre
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire pas trouvé
 *       401:
 *         description: Pas autorisé
 *       500:
 *         description: erreur serveur
 */
router.delete('/comments/:id', auth, DeleteComment);
// PUT
/**
 * @swagger
 * /book/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Mettre un jour un livre existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: integer
 *               summary:
 *                 type: string
 *               editionYear:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               category_fk:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Livre mis à jour avec succès
 *       404:
 *         description: Livre non trouvé
 *       401:
 *         description: Pas autorisé
 *       500:
 *         description: erreur serveur
 */

router.put('/:id', auth, Update);

export default router;
