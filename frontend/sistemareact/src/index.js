import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InsertCamion from './Components/InsertCamion';
import CamionesTabla from './Components/CamionesTabla';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App />} />
        <Route path='/' element={<CamionesTabla />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
