import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
const CambioContrasenia = () => {
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [mostrarNuevaContrasenia, setMostrarNuevaContrasenia] = useState(false);
  const [mostrarConfirmarContrasenia, setMostrarConfirmarContrasenia] = useState(false);



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");
    if (tokenFromURL) {
      // Realizar la solicitud al backend para verificar el token
      async function verificarToken() {
        try {
          const response = await fetch(`http://localhost:8080/loginRep/control-token?token=${tokenFromURL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: nuevaContrasenia }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.type === "success") {
              
              setToken(tokenFromURL);
            } else {
             
              setError("El enlace ha expirado");

              navigate("/");
              
            }
          } else {
           
            navigate("/"); 
            toast.error("El enlace ha expirado");
          }
        } catch (error) {
        
          setError("Error de red al verificar el token");
          navigate("/");
          toast.error("Error de red al verificar el token");
        }
      }

      verificarToken();
    } else {
      setError("Token inválido");
      toast.error("Token inválido");
    }
  }, [nuevaContrasenia]);

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
  
  
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passwordPattern.test(nuevaContrasenia)) {
      toast.error("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
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
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input
              type={mostrarNuevaContrasenia ? 'text' : 'password'}
              value={nuevaContrasenia}
              onChange={(e) => setNuevaContrasenia(e.target.value)}
              style={inputStyle}
              required
            />
      
            <span
              style={{ position: 'absolute', right: '10px', top: '85%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setMostrarNuevaContrasenia(!mostrarNuevaContrasenia)}
            >
              {mostrarNuevaContrasenia ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
  
          <label>Confirmar Nueva Contraseña</label>
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input
              type={mostrarConfirmarContrasenia ? 'text' : 'password'}
              value={confirmarContrasenia}
              onChange={(e) => setConfirmarContrasenia(e.target.value)}
              style={inputStyle}
              required
            />
        
            <span
              style={{ position: 'absolute', right: '10px', top: '85%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setMostrarConfirmarContrasenia(!mostrarConfirmarContrasenia)}
            >
              {mostrarConfirmarContrasenia ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
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
