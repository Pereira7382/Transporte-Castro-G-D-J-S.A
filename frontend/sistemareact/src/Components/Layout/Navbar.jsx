import '../../Asset/Css/Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css/animate.min.css'; // Importa las animaciones de Animate.css
import logo from '../../Asset/images/logo.png';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#f44336',
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
            }}
          >
            Cerrar Sesión
          </button>

          <img src={logo} style={{ width: '150px', marginLeft: '20px' }} alt="" />
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="nav-item nav-item-move-right" id="navbarNav">
          <ul className="navbar-nav animate__animated animate__fadeInDown">
            <li className="nav-item nav-item-move-right">
              <a className="nav-link" href="/admin-inventario">Administrar Inventario</a>
            </li>
            <li className="nav-item nav-item-move-right">
              <a className="nav-link" href="/admin-proveedor">Administrar Proveedor</a>
            </li>
            <li className="nav-item nav-item-move-right">
              <a className="nav-link" href="/admin-camiones">Administrar Camiones</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
