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
 *     security:
 *       - cookieAuth: []
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
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur.
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
 *         description: Mauvaise demande (nom d'utilisateur ou mot de passe incorrect).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nom d'utilisateur ou mot de passe incorrect"
 *       404:
 *         description: Utilisateur innexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur innexistant"
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
 *     security:
 *       - cookieAuth: []
 *     summary: Enregistre un utilisateur.
 *     description: Permet à un utilisateur de s'nregistrer avec son nom d'utilisateur et son mot de passe. Si les informations sont correctes, un token JWT est renvoyé dans le corps de la réponse ainsi que dans un cookie sécurisé.
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
 *         description: Mauvaise demande (nom d'utilisateur ou mot de passe incorrect).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nom d'utilisateur ou mot de passe incorrect"
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
router.post('/register', Register);
router.post('/logout', auth, Logout);
// GET
router.get('/profile', auth, Profile);
// DELETE
router.delete('/delete/', auth, Delete);
router.put('/profile/:id', auth, Update);

export default router;
