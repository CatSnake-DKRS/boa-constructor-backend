const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.post(
  '/',
  apiController.basicTestRunner,
  apiController.getTranslation,
  // add middleware to save query to db if user is logged in (requestController.saveRequest)
  // could add middleware to get requests/update the history here
  (req, res) => {
    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .json(res.locals.text);
  }
);

module.exports = router;
