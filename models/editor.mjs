const EditorModel = (sequelize, DataTypes) => {
  return sequelize.define('t_editor', {
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
          msg: "Le nom de l'editeur est une propriété obligatoire",
        },
      },
    },
  });
};
export { EditorModel };
