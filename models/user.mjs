const UserModel = (sequelize, DataTypes) => {
  return sequelize.define('t_user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Ce nom d'utlisateur est déjà pris." },
      validate: {
        notNull: {
          msg: "Le nom d'utilisateur est une propriété obligatoire",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Cet email est déjà pris.' },
      validate: {
        notNull: {
          msg: "L'email est une propriété obligatoire",
        },
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
export { UserModel };
