import { Router } from 'express';
import { auth } from '../middleware/auth.mjs';
import {
  Register,
  Login,
  Profile,
  Delete,
  Update,
  Logout,
} from '../controller/user.mjs';
const router = Router();
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [User]
 *     summary: Connecte un utilisateur.
 *     description: Permet à un utilisateur de se connecter avec son nom d'utilisateur et son mot de passe. Si les informations sont correctes, un token JWT est renvoyé dans le corps de la réponse ainsi que dans un cookie sécurisé.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Le nom d'utilisateur de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie. Un token JWT est renvoyé dans un cookie sécurisé et dans le corps de la réponse.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Utilisateur connecté'
 *                 token:
 *                   type: string
 *                   description: Le token JWT généré pour l'utilisateur connecté.
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       set-cookie:
 *         description: Le cookie sécurisé contenant le token JWT est envoyé avec la réponse.
 *         schema:
 *           type: string
 *           example: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=86400'
 *       400:
 *         description: Mauvaise demande (champs incomplets).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Les champs nom d'utilisateur et mot de passe sont obligatoires"
 *       404:
 *         description: Utilisateur innexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur interne du serveur lors de la tentative de connexion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne du serveur'
 */
router.post('/login', Login);
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags: [User]
 *     summary: Enregistre un utilisateur.
 *     description: Permet à un utilisateur de s'enregistrer avec son nom d'utilisateur, son mot de passe et son email. Si l'utilisateur est créé, un token JWT est renvoyé dans le corps de la réponse ainsi que dans un cookie sécurisé.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Le nom d'utilisateur de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur.
 *     responses:
 *       200:
 *         description: Enregistrement réussie. Un token JWT est renvoyé dans un cookie sécurisé et dans le corps de la réponse.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Utilisateur créé'
 *                 token:
 *                   type: string
 *                   description: Le token JWT généré pour l'utilisateur créé.
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       set-cookie:
 *         description: Le cookie sécurisé contenant le token JWT est envoyé avec la réponse.
 *         schema:
 *           type: string
 *           example: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=86400'
 *       400:
 *         description: Mauvaise demande (nom d'utilisateur ou email déjà existant).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ce nom d'utlisateur est déjà pris."
 *       500:
 *         description: Erreur interne du serveur lors de la tentative de connexion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur n'a pas pu être créé. Merci de réesayer plus tard"
 */
router.post('/register', Register);
/**
 * @swagger
 * /user/logout:
 *   post:
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     summary: Déconnecte un utilisateur.
 *     description: Permet à un utilisateur de se déconnecter
 *     responses:
 *       200:
 *         description: Déconnexion reussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Vous vous êtes déconnecté avec succès'
 *       clear-cookie:
 *         description: Le cookie sécurisé contenant le token JWT est effacer du navigateur.
 *         schema:
 *           type: string
 *           example: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=86400'
 *       400:
 *         description: Mauvaise demande (utilisateur non authenitfier).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vous n'avez pas fourni de jeton d'authentification."
 *       500:
 *         description: Erreur interne du serveur lors de la tentative de connexion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Erreur interne du serveur'
 */
router.post('/logout', auth, Logout);
/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     summary: Renvoie les information d'un utilisateur.
 *     description: Permet a un utilisateur de récupérer son profil
 *     responses:
 *       200:
 *         description: Déconnexion reussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur a bien été récupéré"
 *                 user:
 *                   type: string
 *                   description: les informations récupérées.
 *                   example: '{
 *	                            "id": 1,
 *	                            "username": "ryan",
 *	                            "email": "ryan.depina@gmail.com",
 *	                            	"admin": false,
 *	                            	"createdAt": "2025-02-26T09:16:31.000Z",
 *	                            	"updatedAt": "2025-02-26T09:16:31.000Z",
 *	                            	"t_comments": []
 *	                            }'
 *       400:
 *         description: Mauvaise demande (utilisateur innexistant).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur indiqué n'existe pas."
 *       500:
 *         description: Erreur interne du serveur lors de la tentative de connexion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur n'a pas pu être récupéré. Veuillez réessayer plus tard"
 */
router.get('/profile', auth, Profile);
/**
 * @swagger
 * /user/delete:
 *   delete:
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     summary: supprime un utilisateur de la base de données.
 *     description: Permet à un utilisateur de supprimer son compte
 *     responses:
 *       200:
 *         description: Suppression reussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur ryan a bien été supprimé !"
 *       400:
 *         description: Mauvaise demande (utilisateur innexistant).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre token."
 *       500:
 *         description: Erreur interne du serveur lors de la tentative de connexion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur n'a pas pu être supprimé. Merci de réessayer dans quelques instants."
 */
router.delete('/', auth, Delete);
/**
 * @swagger
 * /user/profile/:id:
 *   put:
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     summary: modifie un utilisateur de la base de données.
 *     description: Permet à un utilisateur de modifier son compte
 *     responses:
 *       200:
 *         description: Modification reussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur a bien été mis à jour"
 *       400:
 *         description: Mauvaise demande (utilisateur innexistant).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur dont l'id vaut 4 n'existe pas"
 *       500:
 *         description: Erreur interne du serveur lors de la tentative de connexion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur n'a pas pu être mis à jour. Merci de réessayer dans quelques instants."
 */
router.put('/profile/:id', auth, Update);

export default router;
