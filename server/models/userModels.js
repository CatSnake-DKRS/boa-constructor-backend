const { Sequelize, DataTypes } = require('sequelize');

const URI = 'postgres://krnfkulr:fHbXypUFMADoaqlSg5av5Q6920AkDpXi@peanut.db.elephantsql.com/krnfkulr';

const sequelize = new Sequelize(URI);

// const sequelize = new Sequelize('localdev', 'localdev', 'localdev', {
//   host: 'localhost',
//   port: process.env.DB_PORT,
//   dialect: 'postgres',
// });

const User = sequelize.define('User', {
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

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  translation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Request, {
  foreignKey: 'user_id',
});
Request.belongsTo(User);

sequelize.sync();

async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  auth,
  User,
  Request,
  sequelize,
};
