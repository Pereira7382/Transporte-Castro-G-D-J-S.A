import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

import * as Components from '../Asset/Js/Components';

function Login() {
  const [signIn, toggle] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   //conexion con springboot
  const handleSignUp = async () => {
    try {
      const registro = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post("http://localhost:8080/register", registro); 

      console.log("Usuario registrado con éxito:", response.data);
      
    } catch (error) {
      console.error("Error al registrarse:", error);
     
    }
  };
 //conexion con springboot
  const handleSignIn = async () => {
    try {
      const acceso = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post("http://localhost:8080/login", acceso); 

      console.log("Inicio de sesión exitoso:", response.data);
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
           {/* Para registrarse */}
          <Components.Title>Regístrarse</Components.Title>
          <Components.Input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <Components.Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
           {/* Para acceder */}
          <Components.Title>Acceder</Components.Title>
          <Components.Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
       
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome!</Components.Title>
            <Components.Paragraph>
              Para mantenerse conectado con nosotros, inicie sesión con su información personal
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Introduce tus datos personales y comienza el viaje con nosotros.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Login;
