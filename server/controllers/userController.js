const db = require('../models/userModels');

const userController = {};

// creates new user in database
userController.createUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  // check if username/password passed in on the request body
  if (!username || !password) {
    return next({
      log: 'Error in userController.createUser: username or password not provided',
      status: 403,
      message: { err: 'username and pw not provided' },
    });
  }
  try {
    // create entry for POSTGRES database
    const user = db.User.create({
      username,
      password,
      email,
    });
    // save entry to POSTGRES database
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.createUser: error creating user',
      message: { err: error },
    });
  }
};

// verify if user exists in db to log in
userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  // check if username/password is valid
  if (!username || !password) {
    return next({
      log: 'Error in userController.login: username and password not provided',
      status: 403,
      message: { err: 'username and pw not provided' },
    });
  }

  try {
    // find user in db
    const user = await db.User.findOne({
      where: {
        username,
      },
    });
    console.log('this is the user: ', user);
    //use the valid password method on the user to identify if user's hashed password
    //if the same as the one stored in the DB
    //method is defined in the user model
    if (await user.validPassword(password, user.dataValues.password)) {
      console.log('entering valid password');
      res.locals.user = user.username;
      return next();
    }
    //if username or password not found
    return res.status(403).send('Incorrect username or password');
  } catch (error) {
    return next(error);
  }
};

module.exports = userController;
