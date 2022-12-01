// save request
const db = require('../models/userModels');
const { request } = require('../server');

const requestController = {};

requestController.saveRequest = async (req, res, next) => {
  const { username } = req.body;
  const { translation, query, schemaString } = res.locals;
  // get translation from res.locals
  // if user is not logged in, skip this step
  if (!username) return next();
  // if code or translation not provided, return error
  if (!translation) {
    return next({
      log: 'Error in requestController.saveRequest: code or translation not provided',
      message: { err: 'required body not provided' },
    });
  }
  // query db to find correct user
  try {
    const user = await db.User.findAll({
      where: {
        username,
      },
    });
    // create new request model and add code and translation to it
    console.log('saving to db...');
    db.Request.create({
      translation,
      query,
      schema: schemaString,
      user_id: user[0].id,
    });

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
  // console.log('received request for ', username);
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
    // console.log(`Requests from database: ${requests}`);
    requests.forEach((el) => {
      requestsArray.push({
        query: el.query,
        translation: el.translation,
        schema: el.schema,
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
