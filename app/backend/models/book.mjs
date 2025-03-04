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
            args: /^[\p{L}\p{P}\s\d]*$/u,
            msg: 'Seules les lettres, les accents, les espaces, les virgules et les points sont autorisés',
          },
          notEmpty: {
            msg: 'Le nom ne peut pas être vide.',
          },
          notNull: {
            msg: 'Le nom est une propriété obligatoire',
          },
        },
      },
      passage: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[\p{L}\p{P}\s\d]*$/u,
            msg: 'Seules les lettres, les accents, les espaces, les virgules et les points sont autorisés',
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      editionYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: "L'année doit être un entier valide.",
          },
          max: {
            args: new Date().getFullYear(),
            msg: "L'année ne peut pas être dans le futur.",
          },
          notNull: {
            msg: "L'année d'edition est une propriété obligatoire",
          },
        },
      },
      coverImage: {
        type: DataTypes.BLOB,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
            msg: 'Le nombre de pages est une propriété obligatoire',
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
