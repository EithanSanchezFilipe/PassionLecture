import { Book, Category, Comment } from "../db/sequelize.mjs";
import { ValidationError } from "sequelize";
import { Op } from "sequelize";

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
      return res.status(500).json({
        message:
          "Une erreur interne est survenue. Veuillez réessayer plus tard.",
      });
    });
}
export async function Reach(req, res) {
  const id = req.params.id;
  if (id) {
    const book = await Book.findOne({ where: { id: id } })
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
          message: "Erreur lors de la recherche du livre",
          error,
        });
      });
  } else {
    res.status(400).json({
      message: "ID du livre non fourni",
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
      order: [["name", "ASC"]],
      limit: limit,
    }).then((book) => {
      const message = `Il y a ${book.length} produits qui correspondent au terme de la recherche`;
      res.status(200).json({ message, book });
    });
  }
  //findAll trouve toutes les données d'une table
  Book.findAll()
    //prends la valeur trouver et la renvoie en format json avec un message de succès
    .then((book) => {
      // Définir un message de succès pour l'utilisateur de l'API REST
      const message = "La liste des produits a bien été récupérée.";
      res.status(201).json({ message, book });
    })
    //si le serveur n'arrive pas a récuperer les données il renvoie une erreur 500
    .catch((e) => {
      // Définir un message d'erreur pour l'utilisateur de l'API REST
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
}

export async function Delete(req, res) {
  if (book.user_fk.id !== req.user.id) {
    return res.status(403).json({
      message: "Vous n'êtes pas autorisé à modifier ce livre",
    });
  }
  Book.findByPk(req.params.id).then((deletedbook) => {
    if (!deletedbook) {
      const message =
        "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
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
  console.log(req.body);
  const userId = req.user.id;
  Comment.create({
    user_fk: userId,
    book_id: id,
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
  Comment.findByPk(req.params.id).then((deletecomment) => {
    if (!deletecomment) {
      const message =
        "Le commentaire demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    return Comment.destroy({
      where: { id: deletecomment.id },
    }).then((_) => {
      const message = `Le commentaire ${deletecomment.name} a bien été supprimé !`;
      res.status(201).json({ message, deletecomment });
    });
  });
}
export function Update(req, res) {
  const id = req.params.id;
  const data = { ...req.body };
  if (book.user_fk.id !== req.user.id) {
    return res.status(403).json({
      message: "Vous n'êtes pas autorisé à modifier ce livre",
    });
  }
  Book.findByPk(id)
    .then((book) => {
      if (!book) {
        res
          .status(400)
          .json({ message: `Le Livre avec l'id ${id} n'existe pas` });
      }
      book.update(data).then((bookupdate) => {
        return res.status(200).json({
          message: "Le livre a bien été mis à jour",
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
