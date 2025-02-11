const BookModel = (sequelize, DataTypes) => {
  return sequelize.define(
    't_book',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Ce nom est déjà pris.',
        },
        validate: {
          is: {
            args: /^[A-Za-z\s]*$/,
            msg: 'Seules les lettres et les espaces sont autorisées',
          },
          notEmpty: {
            msg: 'Le nom ne peut pas être vide.',
          },
          notNull: {
            msg: 'Le nom est un propriété obligatoire',
          },
        },
      },
      passage: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            args: true,
            msg: "L'URL fournie n'est pas valide.",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'La déscription doit être fournie',
          },
        },
      },
      editionYear: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "L'année doit être un entier valide.",
          },
          min: {
            args: 1900,
            msg: "L'année doit être supérieure ou égale à 1900.",
          },
          max: {
            args: new Date().getFullYear(),
            msg: "L'année ne peut pas être dans le futur.",
          },
          notNull: {
            msg: 'La date doit être fournie',
          },
        },
      },
      coverImage: {
        type: DataTypes.BLOB,
      },
      pages: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: 'Le nombre de pages doit être un entier valide.',
          },
          min: {
            args: [1],
            msg: 'Le nombre de pages doit être au moins 1.',
          },
          notNull: {
            msg: 'Le nombre de pages est une propriété obligatoire.',
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
    }
  );
};
export { BookModel };
