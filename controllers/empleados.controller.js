const path = require("path");
const fs = require("fs");

const empleadosPath = path.join(__dirname, "../data/empleados.json");

// ✅ MOSTRAR LA TABLA DE EMPLEADOS
const empleadosHome = (req, res) => {
  const empleados = fs.existsSync(empleadosPath)
    ? JSON.parse(fs.readFileSync(empleadosPath))
    : [];

  let tabla = empleados.map(emp => `
    <tr>
      <td>${emp.id}</td>
      <td>${emp.nombre}</td>
      <td>${emp.puesto}</td>
      <td>${emp.area}</td>
      <td>${emp.sueldoDiario.toFixed(2)}</td>
      <td>${emp.periodicidad}</td>
      <td>${emp.activo ? "✅" : "❌"}</td>
    </tr>
  `).join("");

  const htmlPath = path.join(__dirname, "../views/empleados.html");
  let contenidoHTML = fs.readFileSync(htmlPath, "utf-8");
  contenidoHTML = contenidoHTML.replace("{{EMPLEADOS}}", tabla);

  res.send(contenidoHTML);
};

// ✅ GUARDAR NUEVO EMPLEADO (solo para que no truene)
const guardarEmpleado = (req, res) => {
  res.send("Guardar empleado aún no está implementado.");
};

// ✅ EXPORTAR FUNCIONES
module.exports = {
  empleadosHome,
  guardarEmpleado
};
