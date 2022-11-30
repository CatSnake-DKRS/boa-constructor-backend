const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.URI);

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Request = sequelize.define("Request", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  translation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schema: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Request, {
  foreignKey: "user_id",
});
Request.belongsTo(User);

sequelize.sync();

async function auth() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  auth,
  User,
  Request,
  sequelize,
};
