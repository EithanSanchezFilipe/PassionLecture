import { Router } from 'express';
import { Create, Delete, Update } from '../controller/editor.mjs';
import { auth } from '../middleware/auth.mjs';
const router = Router();

// POST
/**
 * @swagger
 * /editor/add:
 *   post:
 *     tags: [Editor]
 *     security:
 *       - cookieAuth: []
 *     summary: Crée un auteur.
 *     description: Crée un editeur grâce à son nom et prénom.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "nom de la maison d'edition à créer."
 *                 example: Gaston
 *     responses:
 *       201:
 *         description: editeur créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "L'ID de l'editeur créé."
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: "Le nom de la maison d'edition créé."
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

router.post('/', auth, Create);
// DELETE
/**
 * @swagger
 * /editeur/delete/{id}:
 *   delete:
 *     tags: [Editor]
 *     security:
 *       - bearerAuth: []
 *     summary: "Supprime un editeur par son ID."
 *     description: "Supprime un editeur de la base de données en utilisant son identifiant unique."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "L'ID de l'editeur à supprimer."
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: "editeur supprimé avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Message de confirmation."
 *                   example: "L'editeur Gaston a bien été supprimé !"
 *                 deletedediteur:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Gaston"
 *       404:
 *         description: "L'editeur avec l'ID donné n'existe pas."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'editeur inscrit n'existe pas. Merci de réessayer avec un autre identifiant."
 */

router.delete('/:id', auth, Delete);
// PUT
/**
 * @swagger
 * /editeur/update/{id}:
 *   put:
 *     tags: [Editor]
 *     security:
 *       - bearerAuth: []
 *     summary: "Met à jour les informations d'un editeur."
 *     description: "Met à jour le prénom et le nom d'un editeur en utilisant son ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "L'ID de l'editeur à mettre à jour."
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Le nom de la maison d'edition a été mettre à jour."
 *                 example: "Gaston"
 *     responses:
 *       200:
 *         description: "editeur mis à jour avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Gaston"
 *       404:
 *         description: "L'editeur avec l'ID donné n'existe pas."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'editeur n'existe pas"
 *       400:
 *         description: "ID de l'editeur non fourni."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID de l'editeur non fourni"
 *       500:
 *         description: Erreur serveur lors de la mise à jour.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la mise à jour de l'editeur"
 */
router.put('/:id', auth, Update);
export default router;
