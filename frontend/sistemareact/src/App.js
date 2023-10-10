import { Route, Routes } from 'react-router-dom';
import InsertCamion from './Components/InsertCamion';
import CamionesTabla from './Components/CamionesTabla';
import AdminInventario from './Components/AdminInventario';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login'
import RecuperarContrasena from './Components/RecuperacionContrasenia';
import ModalMovimientoInventario from './Components/ModalMovimientoInventario';
import CambioContrasenia from './Components/CambioContrasenia';

function App() {
  return (
      <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/admin-camiones" element={<CamionesTabla />} />
          <Route path="/admin-form-camiones" element={<InsertCamion />} />
          <Route path="/admin-inventario" element={<AdminInventario />} />
          <Route path="/admin-RecuperarContrasena" element={<RecuperarContrasena />} />
          <Route path="/admin-ModalMovimientoInventario" element={<ModalMovimientoInventario />} />
          <Route path="/admin-CambioContrasenia" element={<CambioContrasenia />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
  );
}

export default App;
