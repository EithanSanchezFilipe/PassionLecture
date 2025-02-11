import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../db/sequelize.mjs';
import path from 'path';
import fs from 'fs';

async function Login(req, res) {}

async function Register(req, res) {
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
      }).then((user) => {
        const privateKey = fs.readFileSync(path.resolve('privkey.key'), 'utf8');
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
      });
    })
    .catch((e) => {
      res.status(500).json({
        message:
          "L'utilisateur n'a pas pu être créé. Merci de réesayer plus tard",
      });
    });
}
export { Register };
