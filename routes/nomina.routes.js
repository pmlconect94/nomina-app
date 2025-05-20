const express = require("express");
const router = express.Router();
const { nominaHome } = require("../controllers/nomina.controller");

router.get("/", nominaHome);

module.exports = router;
