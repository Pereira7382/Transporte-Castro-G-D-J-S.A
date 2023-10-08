import { Route, Routes } from 'react-router-dom';
import InsertCamion from './Components/InsertCamion';
import CamionesTabla from './Components/CamionesTabla';
import AdminInventario from './Components/AdminInventario';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login'
import RecuperarContrasena from './Components/RecuperacionContrasenia';
import AdminProveedor from './Components/AdminProveedor';

function App() {
  return (
      <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/admin-camiones" element={<CamionesTabla />} />
          <Route path="/admin-form-camiones" element={<InsertCamion />} />
          <Route path="/admin-inventario" element={<AdminInventario />} />
          <Route path="/proveedor" element={<AdminProveedor />} />
          <Route path="/admin-RecuperarContrasena" element={<RecuperarContrasena />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
  );
}

export default App;
