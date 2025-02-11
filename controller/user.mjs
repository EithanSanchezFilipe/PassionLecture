// Importer les modules nécessaires
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import sequelize from '../db/sequelize.mjs';
import {User} from '../db/sequelize.mjs';

export function Login(req, res) {
    const { username, password } = req.body;
  
    // Lire la clé privée à partir du fichier
    const privkeyPromise = fs.promises.readFile(path.resolve('privkey.key'), 'utf8');
  
    // Trouver l'utilisateur dans la base de données
    const userPromise = User.findOne({ where: { username: username } });
  
    // Utiliser Promise.all pour attendre les deux promesses en même temps
    Promise.all([privkeyPromise, userPromise])
      .then(([privkey, user]) => {
        // Vérifier si l'utilisateur existe
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
  
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
      });
  }
  

async function Register(req, res) {

}