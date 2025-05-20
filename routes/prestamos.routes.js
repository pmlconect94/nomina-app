const express = require("express");
const router = express.Router();
const { prestamosHome } = require("../controllers/prestamos.controller");

router.get("/", prestamosHome);

module.exports = router;
