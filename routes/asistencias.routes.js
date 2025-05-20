const express = require("express");
const router = express.Router();
const { asistenciasHome } = require("../controllers/asistencias.controller");

router.get("/", asistenciasHome);

module.exports = router;
