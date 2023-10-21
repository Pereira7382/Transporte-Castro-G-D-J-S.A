import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import * as Components from '../Asset/Js/Components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({ setAuthenticated }) {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    usuario: "",
    clave: "",
    repitaclave: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const handleSignUp = async (e) => {
    e.preventDefault();
  
    // Expresión regular para validar la contraseña
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!formData.usuario || !formData.clave || !formData.repitaclave) {
      toast.error("Por favor, complete todos los campos requeridos.");
      return;
    }
  
    // Expresión regular para validar un correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailPattern.test(formData.usuario)) {
      toast.error("El usuario ingresado debe ser un correo electrónico válido.");
      return;
    }
  
    if (!passwordPattern.test(formData.clave)) {
      toast.error("La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
      return;
    }
  
    if (formData.clave !== formData.repitaclave) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }
  
    try {
      // Validar si el correo electrónico ya está registrado
      const responseCorreo = await axios.get(`http://localhost:8080/login/validarCorreo?usuario=${formData.usuario}`);
      if (responseCorreo.data.includes("registrado")) {
        toast.error("El correo electrónico ya está registrado en nuestro sistema.");
        return;
      }
  
      const registro = {
        usuario: formData.usuario,
        clave: formData.clave,
      };
  
      const response = await axios.post("http://localhost:8080/login/agregar", registro);
  
      if (response.data && response.data.success) {
        toast.success("Se ha registrado correctamente.");
        await wait(3000); // Espera 3 segundos antes de recargar la página
        window.location.reload(); // Recarga la página después de esperar 3 segundos
      } else {
        toast.error("Error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      toast.error("Error al registrar el usuario.");
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
      setAuthenticated(true); // Establecer el estado de autenticación en verdadero.
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
            <Components.Input
              type="password"
              name="repitaclave"
              placeholder="Ingrese la clave nuevamente"
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
      <ToastContainer />
    </div>
  );
}

export default Login;
