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
    if (req.files?.summary){
      const filepath = "uploads/extraits/" + req.files.filename;
      bookData.summary = filepath;
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
    Book.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Author,
        },
      ],
    })
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
      include: [{ model: Author }],
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

  Book.findAll({
    include: [{ model: Author }],
  })
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
  console.log("Deleting book with ID:", req.params.id);
  console.log("User ID:", req.user.id);
  console.log("User Admin Status:", req.user.admin);

  try {
    const deletedbook = await Book.findByPk(req.params.id);

    if (!deletedbook) {
      const message =
        "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }

    console.log("Found book:", deletedbook.id, deletedbook.name);
    console.log("Book owner ID:", deletedbook.user_fk);

    // Check if user is the owner or an admin
    // Handle case where user_fk might be null
    const isOwner = deletedbook.user_fk === req.user.id;
    const isAdmin = req.user.admin === true;

    console.log("Is owner:", isOwner);
    console.log("Is admin:", isAdmin);

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à supprimer ce livre",
      });
    }

    // Use await to ensure deletion completes
    await Book.destroy({
      where: { id: deletedbook.id },
    });

    const message = `Le livre "${deletedbook.name}" a bien été supprimé !`;
    return res.status(200).json({ message, deletedbook });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du livre.",
      error: error.message,
    });
  }
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

  console.log("Updating book with ID:", id);
  console.log("Received data:", data);
  console.log("Files:", req.files);
  console.log("User ID:", req.user.id);
  console.log("User Admin Status:", req.user.admin);

  // Type conversion
  if (data.editionYear) {
    data.editionYear = parseInt(data.editionYear);
  }

  if (data.pages) {
    data.pages = parseInt(data.pages);
  }

  if (data.category_fk) {
    data.category_fk = parseInt(data.category_fk);
  }

  // Handle file upload if present
  if (req.files && req.files.coverImage) {
    data.coverImage = req.files.coverImage.data;
    console.log("Image received with size:", req.files.coverImage.size);
  }

  Book.findByPk(id)
    .then((book) => {
      if (!book) {
        return res
          .status(404)
          .json({ message: `Le Livre avec l'id ${id} n'existe pas` });
      }

      console.log("Found book:", book.id, book.name);
      console.log("Book owner ID:", book.user_fk);

      // Check if user is the owner or an admin
      const isOwner = book.user_fk === req.user.id;
      const isAdmin = req.user.admin === true;

      console.log("Is owner:", isOwner);
      console.log("Is admin:", isAdmin);

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          message: "Vous n'êtes pas autorisé à modifier ce livre",
        });
      }

      // Update the book with the new data
      return book
        .update(data)
        .then((bookupdate) => {
          console.log("Book updated successfully");
          return res.status(200).json({
            message: "Le livre a bien été mis à jour",
            data: bookupdate,
          });
        })
        .catch((error) => {
          console.error("Error during update:", error);
          throw error;
        });
    })
    .catch((e) => {
      console.error("Book update error:", e);
      res.status(500).json({
        message:
          "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.",
        error: e.message,
        details: e.errors
          ? e.errors.map((err) => err.message).join(", ")
          : undefined,
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
    include: [{ model: Comment }, { model: Author }],
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
