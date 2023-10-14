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
import GastoCombustible from './Components/GastoCombustible';

export const AuthContext = React.createContext();

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleAuthentication = (authenticated) => {
    setAuthenticated(authenticated);
    localStorage.setItem('isAuthenticated', authenticated);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
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
            element={<Seguridad element={<CamionesTabla />} />}
          />
          <Route
            path="/admin-inventario"
            element={<Seguridad element={<AdminInventario />} />}
          />
          <Route
            path="/admin-proveedor"
            element={<Seguridad element={<AdminProveedor />} />}
          />
          <Route
            path="/admin_RecuperarContrasena"
            element={<Seguridad element={<RecuperarContrasena />} />}
          />
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
