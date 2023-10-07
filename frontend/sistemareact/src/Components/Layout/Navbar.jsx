import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">STHC</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin-inventario">Administrar Inventario</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-camiones">Administrar Camiones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/proveedor">Administrar Proveedor</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-form-camiones">Pricing</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link disabled" aria-disabled="true">Disabled</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
