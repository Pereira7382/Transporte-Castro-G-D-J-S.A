import React, { useState } from "react";

const CambioContrasenia = () => {
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContrasenia !== confirmarContrasenia) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    try {
      // Enviar solicitud al backend para cambiar la contraseña
      const response = await fetch("http://localhost:8080/lo/confirmacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nuevaContrasenia }),
      });

      if (response.ok) {
        // Contraseña cambiada exitosamente
        setMensaje("Contraseña cambiada exitosamente");
        setError(null);
      } else {
        // Manejar errores, mostrar mensajes de error, etc.
        setError("Error al cambiar la contraseña");
      }
    } catch (error) {
      // Manejar errores de red
      setError("Error de red al cambiar la contraseña");
    }
  };

  return (
    <div className="cambio-contrasenia-container">
      <h2>Cambio de Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nueva Contraseña</label>
          <input
            type="password"
            value={nuevaContrasenia}
            onChange={(e) => setNuevaContrasenia(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmar Nueva Contraseña</label>
          <input
            type="password"
            value={confirmarContrasenia}
            onChange={(e) => setConfirmarContrasenia(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cambiar Contraseña</button>
      </form>
      {error && <p className="mensaje-error">{error}</p>}
      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
    </div>
  );
};

export default CambioContrasenia;
