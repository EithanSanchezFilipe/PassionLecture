// Importer les modules nécessaires
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import { User, Comment, Book, Category } from '../db/sequelize.mjs';
import { privateKey } from '../../server.mjs';

export function Login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Les champs nom d'utilisateur et mot de passe sont obligatoires",
    });
  }

  // Trouver l'utilisateur dans la base de données
  User.findOne({ where: { username: username } }).then((user) => {
    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer le mot de passe avec celui stocké dans la base de données
    return bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Comparer le mot de passe avec celui stocké dans la base de données
        return bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
          }

          // Créer un token JWT
          const token = jwt.sign(
            { id: user.id, username: user.username },
            privateKey,
            { expiresIn: '1h', algorithm: 'RS256' }
          );
          res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({ message: 'Utilisateur connecté', token: token });
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      });
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
          res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json({
            message: `L'utilisateur ${user.username} a bien été créé`,
            token: token,
          });
        })
        .catch((e) => {
          //si c'est une erreur de validation renvoie le messgae personnalisé
          if (e instanceof ValidationError) {
            return res.status(400).json({ message: e.message });
          }
        });
    })
    .catch((e) => {
      res.status(500).json({
        message:
          "L'utilisateur n'a pas pu être créé. Merci de réesayer plus tard",
      });
    });
}
export function Profile(req, res) {
  const id = req.user.id;
  User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [
      Comment,
      {
        model: Book,
        include: {
          model: Category,
          attributes: ['name'],
        },
        attributes: ['id', 'name'],
      },
    ],
  })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ message: "L'utilisateur indiqué n'existe pas" });
      }
      res
        .status(200)
        .json({ message: "L'utilisateur a bien été récupéré", user: user });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({
        message:
          "L'utilisateur n'a pas pu être récupéré. Veuillez réessayer plus tard",
        e,
      });
    });
}
export function Delete(req, res) {
  const id = req.user.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message:
            "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre token.",
        });
      }
      user.destroy().then((_) => {
        res.status(200).json({
          message: `L'utilisateur ${user.username} a bien été supprimé !`,
        });
      });
    })
    .catch((e) => {
      // Définir un message d'erreur pour l'utilisateur de l'API REST
      console.error(e);
      res.status(500).json({
        message:
          "L'utilisateur n'a pas pu être supprimé. Merci de réessayer dans quelques instants.",
      });
    });
}
export function Update(req, res) {
  const id = req.params.id;
  const data = { ...req.body };
  User.findByPk(id, {
    attributes: { exclude: ['password'] },
  })
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: `L'utilisateur dont l'id vaut ${id} n'existe pas` });
      }
      user
        .update(data)
        .then((updatedUser) => {
          return res.status(200).json({
            message: "L'utilisateur a bien été mis à jour",
            data: updatedUser,
          });
        })
        .catch((e) => {
          if (e instanceof ValidationError) {
            return res.status(400).json({ message: e.message });
          }
        });
    })
    .catch((e) => {
      res.status(500).json({
        message:
          "L'utilisateur n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.",
      });
    });
}

export function Logout(req, res) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 0,
    });
    return res
      .status(200)
      .json({ message: 'Vous vous êtes déconnecté avec succès' });
  } catch (e) {
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}
