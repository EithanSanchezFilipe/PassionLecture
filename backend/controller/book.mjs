import { Book, Category, Comment } from '../db/sequelize.mjs';
import { ValidationError, where } from 'sequelize';
import { Op } from 'sequelize';

export async function Create(req, res) {
  const {
    name,
    author,
    price,
    summary,
    editionYear,
    pages,
    category_fk,
    author_fk,
    editor_fk,
  } = req.body;
  const userId = req.user.id;
  Book.create({
    name,
    author,
    price,
    summary,
    editionYear,
    pages,
    user_fk: userId,
    category_fk,
    author_fk,
    editor_fk,
  })
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((e) => {
      //si c'est une erreur de validation renvoie le messgae personnalisé
      console.error(e);
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message });
      }
    });
}
export function Reach(req, res) {
  const id = req.params.id;
  if (id) {
    Book.findByPk(id)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            message: "Le livre n'existe pas",
          });
        }
        res.status(200).json(book);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Erreur lors de la recherche du livre',
          error,
        });
      });
  } else {
    res.status(400).json({
      message: 'ID du livre non fourni',
    });
  }
}
export async function All(req, res) {
  if (req.query.name) {
    if (req.query.name.length < 2) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }
    let limit = 3;
    if (req.query.limit) {
      limit = req.query.limit;
    }
    return Book.findAll({
      //select * from product where name like %...%
      where: { name: { [Op.like]: `%${req.query.name}%` } },
      order: [['name', 'ASC']],
      limit: limit,
    }).then((book) => {
      const message = `Il y a ${book.length} livres qui correspondent au terme de la recherche`;
      res.status(200).json({ message, book });
    });
  }
  //findAll trouve toutes les données d'une table
  Book.findAll()
    //prends la valeur trouver et la renvoie en format json avec un message de succès
    .then((book) => {
      // Définir un message de succès pour l'utilisateur de l'API REST
      const message = 'Les livres ont bien été récupérée.';
      res.status(201).json({ message, book });
    })
    //si le serveur n'arrive pas a récuperer les données il renvoie une erreur 500
    .catch((e) => {
      // Définir un message d'erreur pour l'utilisateur de l'API REST
      const message =
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
}
export async function Delete(req, res) {
  Book.findByPk(req.params.id).then((deletedbook) => {
    if (!deletedbook) {
      const message =
        "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    if (deletedbook.user_fk !== req.user.id) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à effacer ce livre",
      });
    }
    return Book.destroy({
      where: { id: deletedbook.id },
    }).then((_) => {
      const message = `Le produit ${deletedbook.name} a bien été supprimé !`;
      res.status(201).json({ message, deletedbook });
    });
  });
}
export async function Rating(req, res) {
  const id = req.params.id;
  const { note, message } = req.body;
  console.log(req.params);
  const userId = req.user.id;
  Comment.create({
    user_fk: userId,
    book_fk: id,
    note: note,
    message: message,
  })
    .then((comment) => {
      return res.status(200).json({
        message: `le livre dont l'id vaut ${id} a bien été commenté`,
        data: comment,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de l'ajout de note du livre",
        error,
      });
    });
}
export async function DeleteComment(req, res) {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (!comment) {
        const message =
          "Le commentaire demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      comment.destroy().then((deletecomment) => {
        const message = `Le commentaire a bien été supprimé !`;
        return res.status(201).json({ message, deletecomment });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: 'Erreur lors de la suppression du commentaire',
        error,
      });
    });
}
export function Update(req, res) {
  const id = req.params.id;
  const data = { ...req.body };
  Book.findByPk(id)
    .then((book) => {
      if (!book) {
        res
          .status(400)
          .json({ message: `Le Livre avec l'id ${id} n'existe pas` });
      }
      if (book.user_fk !== req.user.id) {
        return res.status(403).json({
          message: "Vous n'êtes pas autorisé à modifier ce livre",
        });
      }
      book.update(data).then((bookupdate) => {
        return res.status(200).json({
          message: 'Le livre a bien été mis à jour',
          data: bookupdate,
        });
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({
        message:
          "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.",
      });
    });
}
export function GetComments(req, res) {
  const { id } = req.params;
  Comment.findAll({ where: { book_fk: id } })
    .then((comments) => {
      if (comments.length == 0) {
        return res
          .status(404)
          .json({ message: "Ce livre n'a pas de commentaires" });
      }
      return res.status(200).json({
        message: 'La liste des commentaires à bien été récupérer',
        comments,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message:
          "Les commentaires n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.",
        error,
      });
    });
}
