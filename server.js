const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

// Middleware para procesar formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos (si los usas después)
app.use(express.static("public"));

// Cargar usuarios desde archivo JSON
const usuarios = require("./data/usuarios.json");

// ===========================
// RUTAS DE MÓDULOS
// ===========================
const empleadosRoutes = require("./routes/empleados.routes");
const nominaRoutes = require("./routes/nomina.routes");
const prestamosRoutes = require("./routes/prestamos.routes");
const asistenciasRoutes = require("./routes/asistencias.routes");
const vacacionesRoutes = require("./routes/vacaciones.routes");
const ventasRoutes = require("./routes/ventas.routes");
const almacenRoutes = require("./routes/almacen.routes");

// ===========================
// CONECTAR RUTAS
// ===========================
app.use("/empleados", empleadosRoutes);
app.use("/nomina", nominaRoutes);
app.use("/prestamos", prestamosRoutes);
app.use("/asistencias", asistenciasRoutes);
app.use("/vacaciones", vacacionesRoutes);
app.use("/ventas", ventasRoutes);
app.use("/almacen", almacenRoutes);

// ===========================
// LOGIN
// ===========================
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/login", (req, res) => {
  const { usuario, contrasena } = req.body;

  const usuarioEncontrado = usuarios.find(
    u => u.usuario === usuario && u.contrasena === contrasena
  );

  if (!usuarioEncontrado) {
    return res.status(401).send("Credenciales incorrectas");
  }

  res.redirect(`/inicio?usuario=${encodeURIComponent(usuarioEncontrado.usuario)}`);
});

// ===========================
// MENÚ PRINCIPAL POR USUARIO
// ===========================
app.get("/inicio", (req, res) => {
  const usuario = req.query.usuario;
  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

  if (!usuarioEncontrado) {
    return res.status(404).send("Usuario no encontrado");
  }

  res.send(`
    <h1>Bienvenido, ${usuarioEncontrado.nombre}</h1>
    <p>Rol: ${usuarioEncontrado.rol}</p>
    <h3>Módulos disponibles:</h3>
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      ${usuarioEncontrado.permisos.map(p => `
        <form action="/${p}" method="GET">
          <button type="submit">${p.replace("_", " ").toUpperCase()}</button>
        </form>
      `).join("")}
    </div>
    <br>
    <a href="/login">Cerrar sesión</a>
  `);
});

// ===========================
// RUTA RAÍZ
// ===========================
app.get("/", (req, res) => {
  res.redirect("/login");
});

// ===========================
// INICIAR SERVIDOR
// ===========================
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
