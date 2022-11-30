const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.post(
  '/entocode',
  apiController.basicTestRunner,
  apiController.englishToCode,
  (req, res, next) => {
    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .json(res.locals.text);
  }
);

router.post(
  '/codetoen',
  apiController.basicTestRunner,
  apiController.codeToEnglish,
  (req, res, next) => {
    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .json(res.locals.text);
  }
);

router.post(
  '/entosql',
  apiController.basicTestRunner,
  apiController.englishToSql,
  (req, res, next) => {
    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .json(res.locals.text);
  }
);

module.exports = router;
