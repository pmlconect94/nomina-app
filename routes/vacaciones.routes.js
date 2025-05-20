const express = require("express");
const router = express.Router();
const { vacacionesHome } = require("../controllers/vacaciones.controller");

router.get("/", vacacionesHome);

module.exports = router;
