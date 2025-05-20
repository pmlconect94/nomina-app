const express = require("express");
const router = express.Router();

const {
  empleadosHome,
  guardarEmpleado
} = require("../controllers/empleados.controller");

router.get("/", empleadosHome);
router.post("/", guardarEmpleado);

// ⚠️ Estas rutas aún no están conectadas a funciones reales, así que usa funciones anónimas TEMPORALES
router.get("/nuevo", (req, res) => res.send("Formulario de alta (próximamente)"));
router.get("/editar", (req, res) => res.send("Editar empleado (próximamente)"));
router.get("/descargar", (req, res) => res.send("Descargar base (próximamente)"));

module.exports = router;
