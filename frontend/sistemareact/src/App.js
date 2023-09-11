import { Route, Routes } from 'react-router-dom';
import './App.css';
import InsertCamion from './Components/InsertCamion';
import CamionesTabla from './Components/CamionesTabla';
function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<CamionesTabla />} />
        </Routes>
      </div>
  );
}

export default App;
