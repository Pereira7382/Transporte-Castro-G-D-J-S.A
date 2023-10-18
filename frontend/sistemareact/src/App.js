import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CamionesTabla from './Components/CamionesTabla';
import Seguridad from './Components/Seguridad';
import Login from './Components/Login';
import RecuperarContrasena from './Components/RecuperacionContrasenia';
import Home from './Pages/Home';
import AdminInventario from './Components/AdminInventario';
import AdminProveedor from './Components/AdminProveedor';
import CambioContrasenia from './Components/CambioContrasenia';
import Notificaciones from './Components/Notificaciones'; // Importa el componente de Notificaciones

import GastoCombustible from './Components/GastoCombustible';

export const AuthContext = React.createContext();

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]); // Estado para las notificaciones

  const handleAuthentication = (authenticated) => {
    setAuthenticated(authenticated);
    localStorage.setItem('isAuthenticated', authenticated);
  };

  const mostrarNotificacion = (mensaje, severidad) => {
    const nuevaNotificacion = {
      mensaje,
      severidad,
      open: true,
    };
    setNotificaciones([...notificaciones, nuevaNotificacion]);
  };

  const cerrarNotificacion = (index) => {
    const nuevasNotificaciones = [...notificaciones];
    nuevasNotificaciones[index].open = false;
    setNotificaciones(nuevasNotificaciones);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        {/* Pasa las notificaciones como prop al componente Notificaciones */}
        <Notificaciones notificaciones={notificaciones} cerrarNotificacion={cerrarNotificacion} />
        <Routes>
          <Route
            path="/"
            element={<Login setAuthenticated={handleAuthentication} />}
          />
          <Route
            path="/admin-RecuperarContrasena"
            element={<RecuperarContrasena />}
          />
          <Route
            path="/Home"
            element={<Seguridad element={<Home />} />}
          />
          <Route
            path="/admin-camiones"
            element={<Seguridad element={<CamionesTabla mostrarNotificacion={mostrarNotificacion} />} />}
          />
          <Route
            path="/admin-inventario"
            element={<Seguridad element={<AdminInventario mostrarNotificacion={mostrarNotificacion} />} />}
          />
          <Route
            path="/admin-proveedor"
            element={<Seguridad element={<AdminProveedor mostrarNotificacion={mostrarNotificacion} />} />}
          />
          <Route
            path="/admi-Notificaciones"
            element={
              <Seguridad
                element={
                  <Notificaciones
                    notificaciones={notificaciones} // Pasa las notificaciones como prop
                    cerrarNotificacion={cerrarNotificacion} // Pasa la función para cerrar notificaciones como prop
                  />
                }
              />
            }
          />
          <Route
            path="/admin_RecuperarContrasena"
            element={<Seguridad element={<RecuperarContrasena />} />}
          />
          <Route path="/admin-CambioContrasenia" element={<CambioContrasenia />} />
          <Route
            path="/admin-gastosC"
            element={<Seguridad element={<GastoCombustible />} />}
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;