import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from 'sweetalert2'

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();
  
  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con exito!!!</i>",
        icon: 'succes',
        timer: 3000
      })
    });
  };
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!!!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con exito!!!</i>",
        icon: 'succes',
        timer: 3000
      })
    });
  };

  
  
  const limpiarCampos = () => {
    setAnios("");
    setCargo("");
    setNombre("");
    setPais("");
    setEdad("");
    setId("");
    setEditar(false);
  };
 
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">InvitME</div>
        <div className="card-header">Crear Cuenta</div>
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
              value={edad}
              onChange={(event) => setEdad(event.target.value)}
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
              onChange={(event) => setPais(event.target.value)}
              type="password"
              value={pais}
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
              onChange={(event) => setCargo(event.target.value)}
              type="password"
              value={cargo}
              className="form-control"
              placeholder="Confirme su Contraseña"
              aria-label="Cargo"
              aria-describedby="basic-addon2"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
          editar? 
            <div>
              <button className="btn btn-warning mr-2" onClick={update}>
                Actualizar
              </button><button className="btn btn-info mr-2" onClick={limpiarCampos}>
                Cancelar
              </button> 
            </div>
           
            :<button className="btn btn-success" onClick={add}>
              Crear
            </button>
          }
        </div>
      </div>
      
    </div>
  );
}

export default App;