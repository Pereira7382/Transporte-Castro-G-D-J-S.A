import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 10px;
`;

const RecuperarContrasena = () => {
  const [email, setEmail] = useState("");
  const [envioExitoso, setEnvioExitoso] = useState(false); // Estado para controlar si el envío fue exitoso
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/loginRep/recuperar-contrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const responseBody = await response.json();
  
      if (response.ok) {
        // Mostrar mensaje de éxito si el enlace de recuperación no ha expirado
        toast.success(responseBody.message);
        // Aquí puedes realizar acciones adicionales si es necesario
      } else {
        // Mostrar mensajes de error para otras situaciones
        toast.error(responseBody.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error('Error de red al enviar la solicitud', { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <CenteredContainer>
      <Container>
        <Title>Recuperación de Contraseña</Title>
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label htmlFor="email">
              <Icon>
                <FontAwesomeIcon icon={faEnvelope} />
              </Icon>
              Correo Electrónico
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Enviar Solicitud de Recuperación</SubmitButton>
        </Form>
      </Container>
    </CenteredContainer>
  );
};

export default RecuperarContrasena;
