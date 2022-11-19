const { createTest } = require("./testController");
const router = require("express").Router();


router.post("/",createTest);

module.exports = router