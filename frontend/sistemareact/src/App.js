import { Route, Routes } from 'react-router-dom';
import InsertCamion from './Components/InsertCamion';
import CamionesTabla from './Components/CamionesTabla';
import Home from './Pages/Home';
function App() {
  return (
      <div>
        <Routes>
          <Route path="/admin-camiones" element={<CamionesTabla />} />
          <Route path="/admin-form-camiones" element={<InsertCamion />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
