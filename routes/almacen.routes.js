const express = require("express");
const router = express.Router();
const { almacenHome } = require("../controllers/almacen.controller");

router.get("/", almacenHome);

module.exports = router;
