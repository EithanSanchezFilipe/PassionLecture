const CommentModel = (sequelize, DataTypes) => {
  return sequelize.define('t_comment', {
    note: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'La note doit être un entier valide.',
        },
        min: {
          args: 1,
          msg: 'La note minimale est 1',
        },
        max: {
          args: 5,
          msg: 'La note maximale est 5',
        },
        notNull: {
          msg: 'La note est une propriété obligatoire',
        },
      },
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le message est une propriété obligatoire',
        },
      },
    },
  });
};
export { CommentModel };
