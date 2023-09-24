import { Route, Routes } from 'react-router-dom';
import InsertCamion from './Components/InsertCamion';
import CamionesTabla from './Components/CamionesTabla';
import AdminInventario from './Components/AdminInventario';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login'

function App() {
  return (
      <div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/admin-camiones" element={<CamionesTabla />} />
          <Route path="/admin-form-camiones" element={<InsertCamion />} />
          <Route path="/admin-inventario" element={<AdminInventario />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
