import { Book, Category, Comment, User, Author } from "../db/sequelize.mjs";
import { ValidationError, where } from "sequelize";
import { Op } from "sequelize";

export async function Create(req, res) {
  try {
    const { name, passage, summary, editionYear, pages, category_fk } =
      req.body;
    const userId = req.user?.id;

    // Vérifier si l'utilisateur a déjà un auteur associé
    let author = await Author.findOne({
      where: { user_fk: userId },
    });

    // Si pas d'auteur, en créer un nouveau
    if (!author) {
      const user = await User.findByPk(userId);
      author = await Author.create({
        firstname: user.username,
        lastname: user.username,
        user_fk: userId,
      });
    }

    const bookData = {
      name,
      passage,
      summary,
      editionYear: parseInt(editionYear),
      pages: parseInt(pages),
      category_fk: parseInt(category_fk),
      user_fk: userId,
      author_fk: author.id, // Utiliser l'ID de l'auteur
    };

    if (req.files?.coverImage) {
      bookData.coverImage = req.files.coverImage.data;
    }

    const book = await Book.create(bookData);
    res.status(201).json(book);
  } catch (e) {
    console.error(e);
    if (e instanceof ValidationError) {
      return res.status(400).json({ message: e.message });
    }
    res.status(500).json({
      message: "Erreur lors de la création du livre",
      error: e.message,
    });
  }
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
export function All(req, res) {
  if (req.query.name) {
    if (req.query.name.length < 1) {
      const message = `Le terme de la recherche doit contenir au moins 2 caractères`;
      return res.status(400).json({ message });
    }
    let limit = req.query.limit || 3;

    return Book.findAll({
      where: { name: { [Op.like]: `%${req.query.name}%` } },
      order: [["name", "ASC"]],
      limit: limit,
    })
      .then((book) => {
        const message = `Il y a ${book.length} livres qui correspondent au terme de la recherche`;
        res.status(200).json({ message, book });
      })
      .catch((e) => {
        res.status(500).json({
          message: "Erreur lors de la recherche",
          error: e,
        });
      });
  }

  Book.findAll()
    .then((books) => {
      const booksWithBase64 = books.map((book) => {
        const obj = book.toJSON();
        if (obj.coverImage) {
          obj.coverImage = obj.coverImage.toString("base64");
        }
        return obj;
      });
      res.status(200).json({
        message: "Les livres ont bien été récupérés.",
        book: booksWithBase64,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Erreur lors de la récupération des livres",
        error: e,
      });
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
  const { note, commentaire } = req.body;
  console.log(req.params);
  const userId = req.user.id;
  User.findByPk(userId)
    .then((user) => {
      Comment.create({
        user_fk: userId,
        book_fk: id,
        note: note,
        message: commentaire,
        username: user.username,
      }).then((comment) => {
        return res.status(200).json({
          message: `le livre dont l'id vaut ${id} a bien été commenté`,
          data: comment,
        });
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
        message: "Erreur lors de la suppression du commentaire",
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
export function GetComments(req, res) {
  const { id } = req.params;
  Comment.findAll({ where: { book_fk: id } })
    .then((comments) => {
      if (comments.length == 0) {
        return res
          .status(204)
          .json({ message: "Ce livre n'a pas de commentaires" });
      }
      return res.status(200).json({
        message: "La liste des commentaires à bien été récupérer",
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
export async function Cover(req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book || !book.coverImage) {
      return res.status(404).send("Image not found");
    }

    // Détermine dynamiquement le type MIME si possible
    res.setHeader("Content-Type", "image/jpeg");
    res.send(book.coverImage);
  } catch (error) {
    console.error("Erreur lors de la récupération de la couverture :", error);
    res.status(500).send("Erreur serveur");
  }
}

export function Latest(req, res) {
  //findAll trouve toutes les données d'une table
  Book.findAll({
    order: [["created", "DESC"]],
    limit: 5,
    include: [{ model: Comment }],
  })
    //prends la valeur trouver et la renvoie en format json avec un message de succès
    .then((books) => {
      // Définir un message de succès pour l'utilisateur de l'API REST
      const message = "Les livres ont bien été récupérée.";
      const data = books.map((book) => {
        const notes = book.t_comments.map((comment) => comment.note);
        const avg =
          notes.length > 0
            ? notes.reduce((acc, val) => acc + val, 0) / notes.length
            : 1;
        return {
          ...book.toJSON(),
          avg,
        };
      });
      res.status(201).json({ message, books: data });
    })
    //si le serveur n'arrive pas a récuperer les données il renvoie une erreur 500
    .catch((e) => {
      // Définir un message d'erreur pour l'utilisateur de l'API REST
      const message =
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: e });
    });
}
