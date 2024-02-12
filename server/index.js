const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_loging",
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const contrasena = req.body.contrasena;

  db.query(
    "INSERT INTO empleados(nombre, correo, contrasena) VALUES(?,?,?)",
    [nombre, correo, contrasena],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    } 
  });
});

app.post("/login", (req, res) => {
  const correo = req.body.correo;
  const contrasena = req.body.contrasena;

  db.query(
    "SELECT * FROM empleados WHERE correo = ? AND contrasena = ?",
    [correo, contrasena],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Hubo un error al intentar iniciar sesión" });
      } else {
        if (result.length > 0) {
          res.json({ success: true });
          console.log(`Inicio de sesion exitoso para ${correo}`);
        } else {
          res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
      }
    }
  );
});


app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
