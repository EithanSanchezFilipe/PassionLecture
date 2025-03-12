import { Router } from 'express';
import { FindByAuthor, Create, Delete, Update } from '../controller/author.mjs';
import { auth } from '../middleware/auth.mjs';
const router = Router();

// POST
/**
 * @swagger
 * /author/add:
 *   post:
 *     tags: [Author]
 *     security:
 *       - cookieAuth: []
 *     summary: Crée un auteur.
 *     description: Crée un auteur grâce à son nom et prénom.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: "Le prénom de l'auteur à créer."
 *                 example: Gaston
 *               lastname:
 *                 type: string
 *                 description: "Le nom de l'auteur à créer."
 *                 example: Leroux
 *     responses:
 *       201:
 *         description: Auteur créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "L'ID de l'auteur créé."
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   description: "Le prénom de l'auteur créé."
 *                   example: Gaston
 *                 lastname:
 *                   type: string
 *                   description: "Le nom de l'auteur créé."
 *                   example: Leroux
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nom ou prénom manquant"
 */
router.post('/', auth, Create);
// DELETE
/**
 * @swagger
 * /author/delete/{id}:
 *   delete:
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     summary: "Supprime un auteur par son ID."
 *     description: "Supprime un auteur de la base de données en utilisant son identifiant unique."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "L'ID de l'auteur à supprimer."
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: "Auteur supprimé avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Message de confirmation."
 *                   example: "L'auteur Gaston a bien été supprimé !"
 *                 deletedauthor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstname:
 *                       type: string
 *                       example: "Gaston"
 *                     lastname:
 *                       type: string
 *                       example: "Leroux"
 *       404:
 *         description: "L'auteur avec l'ID donné n'existe pas."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'auteur inscrit n'existe pas. Merci de réessayer avec un autre identifiant."
 */

router.delete('/:id', auth, Delete);
// PUT
/**
 * @swagger
 * /author/update/{id}:
 *   put:
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     summary: "Met à jour les informations d'un auteur."
 *     description: "Met à jour le prénom et le nom d'un auteur en utilisant son ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "L'ID de l'auteur à mettre à jour."
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
 *               firstname:
 *                 type: string
 *                 description: "Le prénom de l'auteur à mettre à jour."
 *                 example: "Gaston"
 *               lastname:
 *                 type: string
 *                 description: "Le nom de l'auteur à mettre à jour."
 *                 example: "Leroux"
 *     responses:
 *       200:
 *         description: "Auteur mis à jour avec succès."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstname:
 *                   type: string
 *                   example: "Gaston"
 *                 lastname:
 *                   type: string
 *                   example: "Leroux"
 *       404:
 *         description: "L'auteur avec l'ID donné n'existe pas."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'auteur n'existe pas"
 *       400:
 *         description: "ID de l'auteur non fourni."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID de l'auteur non fourni"
 *       500:
 *         description: Erreur serveur lors de la mise à jour.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la mise à jour de l'auteur"
 */
router.put('/:id', auth, Update);
// GET
/**
 * @swagger
 * /author/book/:
 *   get:
 *     tags: [Author]
 *     summary: "Trouver un livre par son auteur."
 *     description: "Permet de trouver un livre en utilisant le prénom de l'auteur."
 *     parameters:
 *       - in: query
 *         name: firstname
 *         required: true
 *         description: "Le prénom de l'auteur du livre à rechercher."
 *         schema:
 *           type: string
 *           example: "Gaston"
 *     responses:
 *       200:
 *         description: "Livre(s) trouvé(s) avec succès."
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
 *                   title:
 *                     type: string
 *                     example: "Le Mystère de la Chambre Jaune"
 *                   author_firstname:
 *                     type: string
 *                     example: "Gaston"
 *                   author_lastname:
 *                     type: string
 *                     example: "Leroux"
 *       404:
 *         description: "Aucun livre trouvé pour l'auteur spécifié."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucun livre trouvé pour l'auteur Gaston."
 *       400:
 *         description: "Prénom de l'auteur manquant."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le prénom de l'auteur est requis."
 */
router.get('/:id/books', FindByAuthor);
export default router;
