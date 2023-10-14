import React, { useState, useEffect, useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notificaciones = ({ notificaciones }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const isMounted = useRef(true); // Ref para verificar si el componente está montado

  useEffect(() => {
    return () => {
      // Al desmontar el componente, actualiza el ref isMounted a falso
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (notificaciones.length > 0 && isMounted.current) {
      setCurrentNotification(notificaciones[0]); // Mostrar la primera notificación del array
      setSnackbarOpen(true);
    }
  }, [notificaciones]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      {currentNotification && (
        <Alert onClose={handleCloseSnackbar} severity={currentNotification.severidad}>
          {currentNotification.mensaje}
        </Alert>
      )}
    </Snackbar>
  );
};

export default Notificaciones;
