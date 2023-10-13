import React from 'react';

const AccesoDenegado = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: 'red', // Color rojo para el encabezado
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    textAlign: 'center',
    maxWidth: '400px',
    lineHeight: '1.6',
    color: 'red', // Color rojo para los párrafos
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Acceso Denegado</h2>
      <p style={paragraphStyle}>Se ha detectado un intento de infringir la seguridad del sistema.</p>
      <p style={paragraphStyle}>Por favor, contacta al administrador del sistema para obtener ayuda.</p>
    </div>
  );
};

export default AccesoDenegado;
