const editorModel = (sequelize, DataTypes) => {
  return sequelize.define('t_editor', {
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
export { editorModel };
