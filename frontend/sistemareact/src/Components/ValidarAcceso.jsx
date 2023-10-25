import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
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

const Message = styled.div`
  color: ${({ success }) => (success ? "#28a745" : "#dc3545")};
  margin-top: 20px;
`;

function ValidarAcceso() {
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [responseType, setResponseType] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("correo");
    if (email) {
      setCorreo(email);
    }
  }, [location.search]);

  const handleActivar = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login/activar-cuenta", {
        correo: correo,
        codigo: codigo,
      });

      if (response.data.success) {
        setResponseType("success");
        toast.success("¡Cuenta activada correctamente!");
      } else {
        setResponseType("error");
        toast.error("Código incorrecto. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setResponseType("error");
      toast.error("Error al activar la cuenta:");
    }
  };

  return (
    <CenteredContainer>
      <Container>
        <Title>Activar Cuenta para {correo}</Title>
        <p>Ingresa el código que has recibido en tu correo para activar tu cuenta.</p>
        <Input
          type="text"
          placeholder="Código de activación"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <SubmitButton onClick={handleActivar}>Activar</SubmitButton>
        {responseType === "success" && (
          <p>
            ¡Cuenta activada correctamente! Haz clic <Link to="/">aquí</Link> para ir al inicio.
          </p>
        )}
        {responseType === "error" && (
          <p>
            Hubo un error al activar la cuenta. Por favor, inténtalo de nuevo o contacta al soporte.
          </p>
        )}
      </Container>
    </CenteredContainer>
  );
}

export default ValidarAcceso;
