import React from 'react';
import camion1 from '../Asset/images/camion1.jpg';
import '../Asset/Css/estiloPrincipal.css';

const PaginaPrincipal = () => {
  return (
    <div className="pagina-principal">
      <div className="navbar">
        {/* Contenido del Navbar */}
      </div>
      <div className="carousel-container">
     

       <img src={camion1} className="d-block w-100 carousel-image" alt="Camión de carga número 1" />
    
      
      </div>
    </div>
  );
};

export default PaginaPrincipal;