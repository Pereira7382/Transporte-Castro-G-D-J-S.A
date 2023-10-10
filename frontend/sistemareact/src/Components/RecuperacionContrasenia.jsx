import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../Asset/Css/recuperacion.css';
const RecuperarContrasena = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la solicitud de recuperación de contraseña al backend
      const response = await fetch("http://localhost:8080/loginRep/recuperar-contrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Redirigir a una página de éxito o mostrar un mensaje de éxito
        navigate("/recuperacion-exitosa");
      } else {
        // Manejar errores, mostrar mensajes de error, etc.
        console.error("Error al enviar la solicitud de recuperación de contraseña");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Recuperación de Contraseña</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar Solicitud de Recuperación
        </button>
      </form>
    </div>
  );
};

export default RecuperarContrasena;