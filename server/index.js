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
  const correo = req.body.edad;
  const contrasena = req.body.pais;

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

app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});



  


app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
