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
    },
  });
};
export { CategoryModel };
