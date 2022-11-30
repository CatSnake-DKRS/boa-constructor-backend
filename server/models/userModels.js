const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize(process.env.URI);

const User = sequelize.define(
  'User',
  {
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
  },
  {
    //adding hooks to hash password upon save and to check for password matching
    hooks: {
      //before file is created the password will be saved to DB as hashed password
      beforeCreate: async (user) => {
        if (user.password) {
          //ten round of hashing
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      //before file is updated the password will be saved to DB as hashed password
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    //method that will be attached to each instance to check if user entered, plain-text password
    //matches the hashed version stored in DB
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);
// adds validpassword function to the prototype of User instance
//this allows us to use the method on individual instances
//of user (for example, those returned by findOne method)
User.prototype.validPassword = async (password, hashedPassInDB) => {
  return await bcrypt.compareSync(password, hashedPassInDB);
};

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

module.exports = {
  User,
  Request,
  sequelize,
};
