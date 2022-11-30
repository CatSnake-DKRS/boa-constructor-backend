// save request
const db = require('../models/userModels');
const { request } = require('../server');

const requestController = {};

requestController.saveRequest = async (req, res, next) => {
  const { username, text: code } = req.body;
  // get translation from res.locals
  // if user is not logged in, skip this step
  if (!username) return next();
  // if code or translation not provided, return error
  if (!code || !translation) {
    return next({
      log: 'Error in requestController.saeRequest: code or translation not provided',
      message: { err: 'required body not provided' },
    });
  }
  // if need to pull from res
  // const {  translation } = res.locals;
  // query db to find correct user
  try {
    const user = await db.User.findAll({
      where: {
        username,
      },
    });
    // create new request model and add code and translation to it
    const newReq = db.Request.build({
      code,
      translation,
      user_id: user[0].id,
    });
    // add connection between user and request with association -> user.hasMany(request)
    await newReq.save();
    // await db.sequelize.sync();
    return next();
  } catch (error) {
    return next({
      log: 'Error in requestController.saveRequest',
      status: 400,
      message: { err: error },
    });
  }
};

// get all requests of a user
requestController.getRequests = async (req, res, next) => {
  const { username } = req.body;
  console.log('received request for ', username);
  // if user not logged in, do nothing
  if (!username) return next();
  // query db to find correct user
  try {
    const user = await db.User.findAll({
      where: {
        username,
      },
    });
    const requests = await db.Request.findAll({
      where: {
        user_id: user[0].id,
      },
    });

    // consider accessing the original keys names on front end to save processing time here
    const requestsArray = [];
    requests.forEach((el) => {
      requestsArray.push({
        code: el.code,
        translation: el.translation,
      });
    });
    res.locals.requests = requestsArray;
    return next();
  } catch (error) {
    return next({
      log: 'Error in requestController.getRequests',
      status: 400,
      message: { err: error },
    });
  }
  // query db to find all requests in request table associated with user
  // add json object to res.locals with all request -> array of key/value pairs
};

// delete request of a user
requestController.deleteRequest = async (req, res, next) => {
  const { username, code, translation } = req.body;
  // query db to find request with code and/or translation provided
  // delete that request
};

module.exports = requestController;
