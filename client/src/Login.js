import "./App.css";
import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const login = async () => {
    try {
      const response = await Axios.post('http://localhost:3001/login', {
        correo,
        contrasena
      });
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: '¡Bienvenido de nuevo!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al intentar iniciar sesión',
      });
    }
  };

  return (
    
    <div className="container">
      <div className="card text-center">
      <h1 className="card-header">InvitME</h1>
      <h2>Iniciar Sesión</h2>
      <div className="input-group mb-3">
        <span htmlFor="email" className="input-group-text" id="basic-addon1">Correo Electrónico</span>
        <input type="email" className="form-control" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div className="input-group mb-3">
        <span htmlFor="password" className="input-group-text" id="basic-addon1">Contraseña</span>
        <input type="password" className="form-control" id="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
      </div>
      <div className="card-footer text-body-secondary">
      <button className="btn btn-primary" onClick={login}>Iniciar Sesión</button>
      <div className="mt-3">
        <Link to="/component" >¿No tienes una cuenta? Regístrate aquí</Link>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
