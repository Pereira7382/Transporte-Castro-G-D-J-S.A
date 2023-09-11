import { Route, Routes } from 'react-router-dom';
import './App.css';
import InsertCamion from './Components/InsertCamion';

function App() {
  return (
      <div>
        <Routes>
          <Route path='/' element={<InsertCamion />} />
        </Routes>
      </div>
  );
}

export default App;
