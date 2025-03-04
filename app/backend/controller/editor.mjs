import { Editor } from '../db/sequelize.mjs';
import { ValidationError } from 'sequelize';
import { Op } from 'sequelize';

// Ajouter une catégorie
export async function Create(req, res) {
  const { name } = req.body;
  Editor.create({
    name,
  })
    .then((editor) => {
      res.status(201).json(editor);
    })
    .catch((e) => {
      //si c'est une erreur de validation renvoie le messgae personnalisé
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message });
      }
    });
}
export async function Delete(req, res) {
  Editor.findByPk(req.params.id).then((deletededitor) => {
    if (!deletededitor) {
      const message =
        "L'auteur inscrit n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    return Editor.destroy({
      where: { id: deletededitor.id },
    }).then((_) => {
      const message = `L'auteur ${deletededitor.name} a bien été supprimé !`;
      res.status(201).json({ message, deletededitor });
    });
  });
}
// Mettre à jour un auteur
export async function Update(req, res) {
  const id = req.params.id;
  const { name } = req.body;
  if (id) {
    Editor.findByPk(id)
      .then((editor) => {
        if (!editor) {
          return res.status(404).json({
            message: "L'auteur n'existe pas",
          });
        }
        editor.name = name;
        editor.save();
        res.status(200).json(editor);
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
