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
        isEmail: { msg: 'Veuillez entrer un email qui suis les standards' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
export { UserModel };
