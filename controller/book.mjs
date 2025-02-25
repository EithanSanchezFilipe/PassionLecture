import { User, Book, Comment } from '../db/sequelize.mjs';
import { Op } from 'sequelize';
export async function AddBook(req, res) {
  const { name, author, price, summary, editionYear, pages } = req.body;
  const book = await Book.create({
    name,
    author,
    price,
    summary,
    editionYear,
    pages,
  })
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur lors de l'ajout du livre",
        error,
      });
    });
}
export async function ReachBook(req, res) {
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
export async function AllBooks(req, res) {
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
      const message = `Il y a ${book.length} produits qui correspondent au terme de la recherche`;
      res.status(200).json({ message, book });
    });
  }
  //findAll trouve toutes les données d'une table
  Book.findAll()
    //prends la valeur trouver et la renvoie en format json avec un message de succès
    .then((book) => {
      // Définir un message de succès pour l'utilisateur de l'API REST
      const message = 'La liste des produits a bien été récupérée.';
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

export async function DeleteBook(req, res) {
  const id = req.params;
  Book.findOne({ where: { id } }).then((book) => {
    book
      .destroy()
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Erreur lors de la suppression du livre',
          error,
        });
      });
  });
}
export async function RatingBook(req, res) {
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

// export async function CommentBook(req, res){
//     const {id} =req.params;
//     const {comment} = req.body;
//     const book = await Book.findByPK({id}).then((book) => {
//         book.comment = comment;
//         book.save().then(() => {
//             res.status(200).json(book);
//         }).catch((error) => {
//             res.status(500).json({
//                 message: "Erreur lors de l'ajout de commentaire du livre",
//                 error,
//             });
//         });
//     });
// }
