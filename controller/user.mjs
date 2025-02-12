// Importer les modules nécessaires
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
<<<<<<< Updated upstream
import jwt from 'jsonwebtoken'; 
import sequelize from '../db/sequelize.mjs';
import {User} from '../db/sequelize.mjs';

export function Login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: " Les champs nom d'utilisateur et mot de passe sont obligatoires" });
=======
import jwt from 'jsonwebtoken';
import { ValidationError, Op } from 'sequelize';
import { User } from '../db/sequelize.mjs';
import { privateKey } from '../server.mjs';

export function Login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message:
        " Les champs nom d'utilisateur et mot de passe sont obligatoires",
    });
  }

  // Trouver l'utilisateur dans la base de données
  User.findOne({ where: { username: username } })
    .then((user) => {
      // Vérifier si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
>>>>>>> Stashed changes
      }
    // Lire la clé privée à partir du fichier
    const privkey = fs.readFileSync(path.resolve('privkey.key'), 'utf8');
  
    // Trouver l'utilisateur dans la base de données
 User.findOne({ where: { username: username } }).then((user) => {
        // Vérifier si l'utilisateur existe
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
<<<<<<< Updated upstream
  
        // Comparer le mot de passe avec celui stocké dans la base de données
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(400).json({ message: "Mot de passe incorrect" });
            }
  
            // Créer un token JWT
            const accessToken = jwt.sign(
              { id: user.id, username: user.username },
              privkey,
              { expiresIn: '1h', algorithm: 'RS256' }
            );
  
            return res.status(200).json({ message: "Utilisateur connecté", token: accessToken });
          });
      })
      .catch(error => {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
=======

        // Créer un token JWT
        const accessToken = jwt.sign(
          { id: user.id, username: user.username },
          privateKey,
          { expiresIn: '1h', algorithm: 'RS256' }
        );

        return res
          .status(200)
          .json({ message: 'Utilisateur connecté', token: accessToken });
>>>>>>> Stashed changes
      });
}
export async function Register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message:
        "Les champs nom d'utilisateur, email et mot de passe sont obligatoires",
    });
  }
  bcrypt
    .hash(password, 15)
    .then((hashedPassword) => {
      User.create({
        username: username,
        email: email,
        password: hashedPassword,
<<<<<<< Updated upstream
      }).then((user) => {
        const privateKey = fs.readFileSync(path.resolve('privkey.key'), 'utf8');
        const token = jwt.sign(
          { username: user.username, id: user.id },
          privateKey,
          {
            expiresIn: '1h',
            algorithm: 'RS256',
=======
      })
        .then((user) => {
          const token = jwt.sign(
            { username: user.username, id: user.id },
            privateKey,
            {
              expiresIn: '1h',
              algorithm: 'RS256',
            }
          );
          res.status(200).json({
            message: `L'utilisateur ${user.username} a bien été créé`,
            token: token,
          });
        })
        .catch((e) => {
          //si c'est une erreur de validation renvoie le messgae personnalisé
          if (e instanceof ValidationError) {
            return res.status(400).json({ message: e.message });
>>>>>>> Stashed changes
          }
        );
        res.status(200).json({
          message: `L'utilisateur ${user.username} a bien été créé`,
          token: token,
        });
      });
    })
    .catch((e) => {
      res.status(500).json({
        message:
          "L'utilisateur n'a pas pu être créé. Merci de réesayer plus tard",
      });
    });
}