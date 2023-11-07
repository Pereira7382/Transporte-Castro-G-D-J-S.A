import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import * as Components from '../Asset/Js/Components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Login({ setAuthenticated }) {
  const [signIn, setSignIn] = useState(true);
  const [mostrarContraseniaRegistro, setMostrarContraseniaRegistro] = useState(false);
  const [mostrarContraseniaInicioSesion, setMostrarContraseniaInicioSesion] = useState(false);


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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
       
        const emailCheckResponse = await axios.get(`http://localhost:8080/login/validarCorreo?usuario=${formData.usuario}`);

        if (emailCheckResponse.data.includes("registrado")) {
            toast.error("El correo electrónico ya está registrado en nuestro sistema.");
            return;
        }

        // Continuar con el proceso de registro
        const registro = {
            usuario: formData.usuario,
            clave: formData.clave,
        };

        const registerResponse = await axios.post("http://localhost:8080/loginRep/agregar", registro);

        if (registerResponse.data && registerResponse.data.success) {
            if (registerResponse.data.message.includes("espera de ser activada")) {
                toast.info(registerResponse.data.message);
            } else {
                toast.success(registerResponse.data.message || "Se ha enviado un mensaje a su correo para activar su cuenta.");
                await wait(3000); // Espera 3 segundos antes de recargar la página
                window.location.reload(); // Recarga la página después de esperar 3 segundos
            }
        } else {
            toast.error(registerResponse.data.message || "Error al registrar el usuario.");
        }
    } catch (error) {
        console.error("Error al registrarse:", error);
        toast.error("Error al registrar el usuario.");
    }
};

  
 
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
        if (!formData.usuario || !formData.clave) {
            toast.error("Por favor, complete todos los campos requeridos.");
            return;
        }

        const acceso = {
            usuario: formData.usuario,
            clave: formData.clave,
        };

        const response = await axios.post("http://localhost:8080/login/validar", acceso);

        if (response.data.accesoAutorizado) {
            if (response.data.codigo === 401) {
            
                toast.warning(response.data.mensaje);
            } else {
              
            
                setAuthenticated(true);
                navigate("/Home");
            }
        } else {
       
            toast.error(response.data.mensaje);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        toast.error("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
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
      
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <Components.Input
              type={mostrarContraseniaRegistro ? 'text' : 'password'}
              name="clave"
              placeholder="Clave"
              onChange={handleChange}
              style={{ paddingRight: '40px' }} 
            />
         
            <span
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setMostrarContraseniaRegistro(!mostrarContraseniaRegistro)}
            >
              {mostrarContraseniaRegistro ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

      
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <Components.Input
              type={mostrarContraseniaInicioSesion ? 'text' : 'password'}
              name="repitaclave"
              placeholder="Repita la clave"
              onChange={handleChange}
              style={{ paddingRight: '40px' }} 
            />
          
            <span
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setMostrarContraseniaInicioSesion(!mostrarContraseniaInicioSesion)}
            >
              {mostrarContraseniaInicioSesion ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
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
       
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <Components.Input
              type={mostrarContraseniaInicioSesion ? 'text' : 'password'}
              name="clave"
              placeholder="Clave"
              onChange={handleChange}
              style={{ paddingRight: '40px' }} 
            />
           
            <span
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setMostrarContraseniaInicioSesion(!mostrarContraseniaInicioSesion)}
            >
              {mostrarContraseniaInicioSesion ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <Components.Anchor href="/admin-RecuperarContrasena">¿Olvidaste tu contraseña?</Components.Anchor>
          <Components.Button onClick={handleSignIn}>Acceder</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signIn={signIn}>
        <Components.Overlay signIn={signIn}>
          <Components.LeftOverlayPanel signIn={signIn}>
            <Components.Title>¡Bienvenido!</Components.Title>
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
