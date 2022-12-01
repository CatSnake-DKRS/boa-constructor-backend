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
      .json(res.locals);
  }
);

router.post(
  "/entocode",
  apiController.basicTestRunner,
  apiController.englishToCode,
  requestController.saveRequest,
  (req, res) => {
    console.log(res.locals);
    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json(res.locals);
  }
);

router.post(
  "/entosql",
  apiController.basicTestRunner,
  apiController.englishToSql,
  requestController.saveRequest,
  (req, res) => {
    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json(res.locals);
  }
);

module.exports = router;
