const db = require('../models/userModels');

const userController = {};

// creates new user in database
userController.createUser = async (req, res, next) => {
  const { username, password, email } = req.body;
  // check if username/password passed in
  if (!username || !password) {
    return next({
      log: 'Error in userController.createUser: username or password not provided',
      status: 403,
      message: { err: 'username and pw not provided' },
    });
  }
  try {
    // create entry for POSTGRES database
    const user = db.User.build({
      username,
      password,
      email,
    });
    // save entry to POSTGRES database
    await user.save();
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
    const user = await db.User.findAll({
      where: {
        username,
      },
    });
    if (user[0].password === password) {
      res.locals.user = user[0].username;
      return next();
    }
    // error if user/password not in db
    return res.status(403).send('Incorrect username or password');
  } catch (error) {
    return next(error);
  }
};

module.exports = userController;
