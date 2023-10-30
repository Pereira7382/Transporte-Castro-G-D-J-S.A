import '../../Asset/Css/Navbar.css';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import 'animate.css/animate.min.css'; // Importa las animaciones de Animate.css
import logo from '../../Asset/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">

      <div className="container-fluid">
       <div class="logo-img">
       <a href="/home" style={{ textDecoration: 'none' }}>
      <img src={logo}  style={{ width: '150px', marginLeft: '-20px',  marginTop: '-20px' }} alt=""  />
      </a>
      </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="nav-item nav-item-move-right" id="navbarNav">
          <ul className="navbar-nav animate__animated animate__fadeInDown">
            <li className="navbar-nav .nav-link">
              <NavDropdown title="Mantenimiento" id="basic-nav-dropdown" className="nav-dropdown">
                <NavDropdown.Item href="/admin-gastosC"> Administar Combustible</NavDropdown.Item>
                <NavDropdown.Item href="/admin-gastosA"> Administar Cambio de Aceite</NavDropdown.Item>
                <NavDropdown.Item href="/admin-gastosL">Administar Rodaje de Llantas</NavDropdown.Item>
               

              </NavDropdown>
            </li>

            <li className="navbar-nav .nav-link">
              <NavDropdown title="Inventario" id="basic-nav-dropdown" className="nav-dropdown">
                
                <NavDropdown.Item href="/admin-camiones">Administrar Camiones</NavDropdown.Item>
                <NavDropdown.Item href="/admin-movimiento">Administrar Movimiento</NavDropdown.Item>
                <NavDropdown.Item href="/admin-inventario">Administrar Inventario</NavDropdown.Item>
                <NavDropdown.Item href="/admin-proveedor">Administrar Proveedor</NavDropdown.Item>
                <NavDropdown.Item href="/admin-llanta">Administrar Llanta</NavDropdown.Item>
                <NavDropdown.Item href="/admin-aceite">Administrar Aceite</NavDropdown.Item>

              </NavDropdown>
            </li>


            
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
      onClick={handleLogout}
      style={{
        backgroundColor: 'blue',
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
      <FaSignOutAlt  title="Cerrar Sesión"/> 
    </button>

          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
