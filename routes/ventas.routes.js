const express = require("express");
const router = express.Router();
const { ventasHome } = require("../controllers/ventas.controller");

router.get("/", ventasHome);

module.exports = router;
