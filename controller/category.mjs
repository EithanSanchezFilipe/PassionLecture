import { Category, Book } from "../db/sequelize.mjs";
import { ValidationError } from "sequelize";
import { Op } from "sequelize";

// Ajouter une catégorie
export async function Create(req, res) {
  const { name } = req.body;
  const category = await Category.create({
    name,
  })
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((e) => {
      //si c'est une erreur de validation renvoie le messgae personnalisé
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message });
      }
    });
}
export async function Delete(req, res) {
  Category.findByPk(req.params.id).then((deletedcategory) => {
    if (!deletedbook) {
      const message =
        "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    return Book.destroy({
      where: { id: deletedcategory.id },
    }).then((_) => {
      const message = `Le produit ${deletedcategory.name} a bien été supprimé !`;
      res.status(201).json({ message, deletedcategory });
    });
  });
}
// Trouver un livre par sa catégorie
export async function FindByCategory(req, res) {
  const { name } = req.query;
  if (name) {
    const category = await Category.findOne({
      where: { name },
      include: [Book],
    })
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "La catégorie n'existe pas",
          });
        }
        res.status(200).json(category);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Erreur lors de la recherche de la catégorie",
          error,
        });
      });
  } else {
    res.status(400).json({
      message: "Nom de la catégorie non fourni",
    });
  }
}
