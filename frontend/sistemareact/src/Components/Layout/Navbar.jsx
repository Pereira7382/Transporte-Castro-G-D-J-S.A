import '../../Asset/Css/Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css/animate.min.css'; // Importa las animaciones de Animate.css

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Transportes Castro G D JS.A</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="nav-item nav-item-move-right" id="navbarNav">
          <ul className="navbar-nav animate__animated animate__fadeInDown">
            <li className="nav-item">
              <a className="nav-link" href="/admin-inventario">Administrar Inventario</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/proveedor">Administrar Proveedor</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin-camiones">Administrar Camiones</a>
            </li>
            {/*<li className="nav-item">
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
