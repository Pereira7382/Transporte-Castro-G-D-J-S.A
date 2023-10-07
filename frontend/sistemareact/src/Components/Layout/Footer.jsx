import React from 'react';
import '../../Asset/Css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faIdCard, faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="icon-text">
            <FontAwesomeIcon icon={faBuilding} className="footer-icon" />
            <h2 className="footer-heading">Transportes Castro G D JS.A</h2>
          </div>
          <div className="icon-text">
            <FontAwesomeIcon icon={faIdCard} className="footer-icon" />
            <p className="footer-text">Cédula 3-101-739593</p>
          </div>
        </div>
        <div className="footer-section">
          <div className="icon-text">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
            <h3 className="footer-subheading">Dirección</h3>
            <p className="footer-text">Río Frío 6, Urbanización Villa Nueva</p>
            <p className="footer-text">Horquetas de Sarapiquí, Heredia</p>
          </div>
        </div>
        <div className="footer-section">
          <div className="icon-text">
            <FontAwesomeIcon icon={faPhoneAlt} className="footer-icon" />
            <p className="footer-text">
              Teléfono: <a href="https://wa.me/50689927081" className="footer-link">8992-7081</a>
            </p>
            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
            <p className="footer-text">
              Correo: <a href="mailto:transgdj@hotmail.com" className="footer-link">transgdj@hotmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
