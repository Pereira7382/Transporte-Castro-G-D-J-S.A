import React, { useState, useEffect, useRef } from 'react';
import { FiBell } from 'react-icons/fi';

const styles = {
  campanaContainer: {
    position: 'absolute',
    top: 120,
    right: 20,
    margin: '10px', // Espacio al borde de la tabla
    zIndex: 1001, // Asegura que la campana esté por encima de la tabla
  },
  campanaIcon: {
    cursor: 'pointer',
    fontSize: '24px',
    color: '#ffc107', // Cambia el color de la campanita a amarillo
    transition: 'color 0.3s ease',
  },
 
  campanaIconHover: {
    color: '#2196f3', // Cambia el color del ícono al pasar el mouse por encima
  },
  notificacionesLista: {
    position: 'absolute',
    top: '100%',
    right: 0,
    padding: '10px',
    width: '300px',
    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.2)', // Sombra ligera para un efecto de elevación
    borderRadius: '5px',
    zIndex: 1000,
  },
  notificacion: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  notificacionWarning: {
    backgroundColor: '#f44336', // Rojo para alertas
    color: '#fff', // Texto blanco
  },
  notificacionDanger: {
    backgroundColor: '#ffc107', // Amarillo para recomendaciones
    color: '#000', // Texto negro
  },
  notificacionHover: {
    backgroundColor: '#f5f5f5',
  },
  notificacionAtractiva: {
    backgroundColor: 'rgba(255, 235, 59, 0.8)', // Amarillo transparente para recomendaciones
    color: '#000', // Texto negro
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
  },
  notificacionPeligrosa: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)', // Rojo transparente para alertas
    color: '#fff', // Texto blanco
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
  },
  notificacionIcono: {
    marginRight: '10px',
  },
};


const Campana = ({ notificaciones }) => {
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const campanaRef = useRef(null);
  const notificacionesRef = useRef(null);

  const handleToggleNotificaciones = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (campanaRef.current && !campanaRef.current.contains(event.target)) {
        setMostrarNotificaciones(false);
      }

      if (notificacionesRef.current && !notificacionesRef.current.contains(event.target)) {
        setMostrarNotificaciones(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cantidadNotificaciones = notificaciones.filter(
    (notification) => notification.mensaje && notification.severidad
  ).length;

  return (
    <div style={styles.campanaContainer} ref={campanaRef}>
      {/* ... (resto del código) */}
      {mostrarNotificaciones && (
        <div style={styles.notificacionesLista} ref={notificacionesRef}>
          {notificaciones
            .filter((notification) => notification.mensaje && notification.severidad)
            .map((notification, index) => (
              <div
                key={index}
                style={{
                  ...styles.notificacion,
                  ...(notification.severidad === 'warning'
                    ? styles.notificacionPeligrosa // Cambiado de 'notificacionAtractiva' a 'notificacionPeligrosa'
                    : styles.notificacionAtractiva), // Cambiado de 'notificacionPeligrosa' a 'notificacionAtractiva'
                }}
              >
                <div style={styles.notificacionIcono}>
                  {notification.severidad === 'warning' ? '⚠️' : '🔔'}
                </div>
                {notification.mensaje}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Campana;