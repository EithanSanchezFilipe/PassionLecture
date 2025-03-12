import { Author, Book } from '../db/sequelize.mjs';
import { ValidationError } from 'sequelize';
import { Op } from 'sequelize';

// Ajouter une catégorie
export async function Create(req, res) {
  const { firstname, lastname } = req.body;
  Author.create({
    firstname,
    lastname,
  })
    .then((author) => {
      res.status(201).json(author);
    })
    .catch((e) => {
      //si c'est une erreur de validation renvoie le messgae personnalisé
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message });
      }
    });
}
export async function Delete(req, res) {
  Author.findByPk(req.params.id).then((deletedauthor) => {
    if (!deletedauthor) {
      const message =
        "L'auteur inscrit n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    return Author.destroy({
      where: { id: deletedauthor.id },
    }).then((_) => {
      const message = `L'auteur ${deletedauthor.firstname} a bien été supprimé !`;
      res.status(201).json({ message, deletedauthor });
    });
  });
}
// Mettre à jour un auteur
export async function Update(req, res) {
  const id = req.params.id;
  const { firstname, lastname } = req.body;
  if (id) {
    Author.findOne({ where: { id: id } })
      .then((author) => {
        if (!author) {
          return res.status(404).json({
            message: "L'auteur n'existe pas",
          });
        }
        author.firstname = firstname;
        author.lastname = lastname;
        author.save();
        res.status(200).json(author);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Erreur lors de la mise à jour de l'auteur",
          error,
        });
      });
  } else {
    res.status(400).json({
      message: "ID de l'auteur non fourni",
    });
  }
}
// Trouver un livre par son auteur
export async function FindByAuthor(req, res) {
  const { id } = req.params;
  Author.findByPk(id, {
    include: [Book],
  })
    .then((author) => {
      if (!author) {
        return res.status(404).json({
          message: "Aucun auteur n'a été trouvé",
        });
      }
      res.status(200).json(author);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Erreur lors de la recherche des auteurs',
        error,
      });
    });
}
