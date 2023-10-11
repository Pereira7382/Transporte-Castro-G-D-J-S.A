import '../../Asset/Css/Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css/animate.min.css'; // Importa las animaciones de Animate.css
import logo from '../../Asset/images/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to='/'>
        <img src={logo}  width='150' alt=""/>
        </Link>

        <Link className="navbar-brand" to="/">
          <span className="title">Transportes Castro G D JS.A</span>
        </Link>
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
            {/* <li className="nav-item">
              <a className="nav-link" href="/admin-form-camiones">Pricing</a>
            </li>*/}
            <li className="nav-item">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
