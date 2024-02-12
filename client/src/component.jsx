import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

export default function Component() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState();
  const [contrasena, setContrasena] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const [empleados, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
    }).then(() => {
      getEmpleados();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html:
          "<i>El empleado <strong>" +
          nombre +
          "</strong> fue registrado con exito!!!",
        icon: "succes",
        timer: 3000,
      });
    });
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
    console.log(empleados);
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <h1 className="card-header">InvitME</h1>
        <h2>Crear Cuenta</h2>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => setNombre(event.target.value)}
              className="form-control"
              value={nombre}
              placeholder="Ingrese un Nombre"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Correo Electronico:
            </span>
            <input
              type="email"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              className="form-control"
              placeholder="Ingrese un Correo"
              aria-label="Edad"
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Contraseña:
            </span>
            <input
              onChange={(event) => setContrasena(event.target.value)}
              type="password"
              value={contrasena}
              className="form-control"
              placeholder="Ingrese una Contraseña"
              aria-label="País"
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Confirmar Contraseña:
            </span>
            <input
              onChange={(event) => setConfirmarContraseña(event.target.value)}
              type="password"
              value={confirmarContraseña}
              className="form-control"
              placeholder="Confirme su Contraseña"
              aria-label="Confirmar Contraseña"
              aria-describedby="basic-addon2"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <button class="btn btn-primary" onClick={add}>
            Crear
          </button>
          <div className="mt-3">
        <Link to="/login" >¿Ya tienes cuenta? Inica sesion aquí</Link>
      </div>
        </div>
      </div>
    </div>
  );
}
