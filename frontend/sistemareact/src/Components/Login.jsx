import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

import * as Components from '../Asset/Js/Components';

function Login() {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    usuario: "",
    clave: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Conexión con Spring Boot para registrarse
  const handleSignUp = async () => {
    try {
      if (!formData.usuario || !formData.clave) {
        console.error("Por favor, complete todos los campos requeridos.");
        return;
      }
  
      const registro = {
        usuario: formData.usuario,
        clave: formData.clave,
      };
  
      const response = await axios.post("http://localhost:8080/login/agregar", registro); 
  
      console.log("Usuario registrado con éxito:", response.data);
      
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };
  
  // Conexión con Spring Boot para iniciar sesión
  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      if (!formData.usuario || !formData.clave) {
        console.error("Por favor, complete todos los campos requeridos.");
        return;
      }

      const acceso = {
        usuario: formData.usuario,
        clave: formData.clave,
      };

      const response = await axios.post("http://localhost:8080/login/validar", acceso); 

      console.log("Inicio de sesión exitoso:", response.data);
      navigate("/Home"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  
  return (
    <div className="centered-container">
      <Components.Container>
        <Components.SignUpContainer signIn={signIn}>
          <Components.Form>
            <Components.Title>Registrarse</Components.Title>
      
            <Components.Input
              type="text"
              name="usuario"
              placeholder="Usuario"
              onChange={handleChange}
            />
            <Components.Input
              type="password"
              name="clave"
              placeholder="Clave"
              onChange={handleChange}
            />
            <Components.Button onClick={handleSignUp}>Registrarse</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signIn={signIn}>
          <Components.Form>
            <Components.Title>Acceder</Components.Title>
            <Components.Input
              type="text"
              name="usuario"
              placeholder="Usuario"
              onChange={handleChange}
            />
            <Components.Input
              type="password"
              name="clave"
              placeholder="Clave"
              onChange={handleChange}
            />
            <Components.Anchor href="/admin-RecuperarContrasena">¿Olvidaste tu contraseña?</Components.Anchor>
            <Components.Button onClick={handleSignIn}>Acceder</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signIn={signIn}>
          <Components.Overlay signIn={signIn}>
            <Components.LeftOverlayPanel signIn={signIn}>
              <Components.Title>!Bienvenido!</Components.Title>
              <Components.Paragraph>
                Para mantenerse conectado con nosotros, inicie sesión con su información personal
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(true)}>
                Acceder
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signIn={signIn}>
              <Components.Title>¡Hola!</Components.Title>
              <Components.Paragraph>
                Introduce tus datos personales para crear una cuenta con nosotros.
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Registrarse
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Login;
