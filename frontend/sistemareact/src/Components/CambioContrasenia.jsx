import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CambioContrasenia = () => {
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");

    if (tokenFromURL) {
      setToken(tokenFromURL);
    } else {
      setError("Token inválido");
    }
  }, []);

  useEffect(() => {
    if (responseType === "success") {
      setNuevaContrasenia("");
      setConfirmarContrasenia("");
    }
  }, [responseType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContrasenia !== confirmarContrasenia) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/loginRep/reset-password?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: nuevaContrasenia }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseType(data.type);
        setSuccessMessage(data.message);
        setError(null);
      } else {
        const errorData = await response.json();
        setResponseType(errorData.type);
        setError(errorData.message);
      }
    } catch (error) {
      setError("Error de red al cambiar la contraseña");
    }
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const successMessageStyle = {
    color: "green",
    marginTop: "10px",
  };

  const errorMessageStyle = {
    color: "red",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2>Cambio de Contraseña</h2>
      {token ? (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <label>Nueva Contraseña</label>
          <input
            type="password"
            value={nuevaContrasenia}
            onChange={(e) => setNuevaContrasenia(e.target.value)}
            style={inputStyle}
            required
          />
          <label>Confirmar Nueva Contraseña</label>
          <input
            type="password"
            value={confirmarContrasenia}
            onChange={(e) => setConfirmarContrasenia(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Cambiar Contraseña
          </button>
          {responseType === "success" && <p style={successMessageStyle}>{successMessage}</p>}
          {responseType === "error" && <p style={errorMessageStyle}>{error}</p>}
        </form>
      ) : (
        <p style={errorMessageStyle}>{error}</p>
      )}

      {responseType === "success" && (
        <p>
          Contraseña cambiada con éxito. Haz clic <Link to="/">aquí</Link> para ir al inicio.
        </p>
      )}
    </div>
  );
};

export default CambioContrasenia;
