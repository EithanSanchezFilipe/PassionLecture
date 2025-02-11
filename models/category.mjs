const CategoryModel = (sequelize, DataTypes) => {
  return sequelize.define('t_category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le nom de la catégorie est une propriété obligatoire',
        },
      },
    },
  });
};
export { CategoryModel };
