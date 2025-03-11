import { User, Book, Category, Editor, Author } from '../db/sequelize.mjs';
import { Op } from 'sequelize';
export function Search(req, res) {
  const { query, searchType } = req.query;
  let model;
  let name = 'name';
  switch (searchType) {
    case 'user':
      model = User;
      name = 'username';
      break;
    case 'book':
      model = Book;
      break;
    case 'category':
      model = Category;
      break;
    case 'editor':
      model = Editor;
      break;
    case 'author':
      model = Author;
      name = 'firstname';
      break;
    default:
      return res
        .status(400)
        .json({ message: 'Type de recherche non pris en charge' });
  }
  model
    .findAll({
      where: {
        [name]: {
          [Op.like]: `%${query}%`,
        },
      },
    })
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).json({ message: 'Aucun résultat trouvé' });
      }
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Erreur lors de la recherche',
        error,
      });
    });
}
