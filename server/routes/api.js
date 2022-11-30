const express = require("express");
const apiController = require("../controllers/apiController");
const requestController = require("../controllers/requestController");

const router = express.Router();

router.post(
  "/codetoen",
  apiController.basicTestRunner,
  apiController.codeToEnglish,
  requestController.saveRequest,
  (req, res) => {
    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json(res.locals.query);
  }
);

router.post(
  "/entocode",
  apiController.basicTestRunner,
  apiController.englishToCode,
  (req, res) => {
    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json(res.locals.text);
  }
);

router.post(
  "/entosql",
  apiController.basicTestRunner,
  apiController.englishToSql,
  (req, res) => {
    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json(res.locals.text);
  }
);

module.exports = router;
