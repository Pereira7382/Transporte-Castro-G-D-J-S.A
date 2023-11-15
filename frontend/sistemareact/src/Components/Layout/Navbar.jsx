import React from 'react';
import { FaSignOutAlt, FaExchangeAlt, FaBoxes, FaTruckMoving, FaUserTie } from 'react-icons/fa';
import 'animate.css/animate.min.css'; // Importa las animaciones de Animate.css
import logo from '../../Asset/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import OpacityIcon from '@mui/icons-material/Opacity';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">

      <div className="container-fluid">
        <div className="logo-img">
          <a href="/home" style={{ textDecoration: 'none' }}>
            <img src={logo} style={{ width: '150px', marginLeft: '-20px', marginTop: '-20px' }} alt="" />
          </a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav" style={{ position: 'relative', zIndex: 1 }}>
            <li className={`nav-item ${location.pathname === '/admin-camiones' ? 'active' : ''}`}>
              <a className="nav-link" href="/admin-camiones"><FaTruckMoving />Camiones</a>
            </li>
            <li className={`nav-item ${location.pathname === '/admin-gastosC' ? 'active' : ''}`}>
              <a className="nav-link" href="/admin-gastosC"><LocalGasStationIcon />Combustible</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-gastosA"><OpacityIcon />Cambio de Aceite</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-gastosL"><DriveEtaIcon />Rodaje de Llantas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-inventario"><FaBoxes />Inventario</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-movimiento"><FaExchangeAlt />Mov inventario</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-proveedor"><FaUserTie />Proveedores</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-llanta"><AgricultureIcon />Llantas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-aceite"><OilBarrelIcon />Aceites</a>
            </li>
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={handleLogout}
            style={{
              cursor: 'pointer',
              borderRadius: '10px',
              border: 'none',
            /*  backgroundColor: '#007bff',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '4px 2px',
              cursor: 'pointer',
              borderRadius: '4px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Agregamos una sombra*/
            }}
          >
            <FaSignOutAlt style={{ marginRight: '30px' }} title="Cerrar Sesión" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
