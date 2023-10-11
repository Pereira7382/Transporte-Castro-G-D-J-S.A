import React from 'react'; 

import camion1 from '../Asset/images/camion1.jpg'
import camion2 from '../Asset/images/camion2.jpg'
import camion3 from '../Asset/images/camion3.jpg'


import '../Asset/Css/estiloPrincipal.css';

const Carrusel = () => {

    return (
        <div>

            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={camion1} className="d-block w-100 carousel-image" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={camion2} className="d-block w-100 carousel-image" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={camion3} className="d-block w-100 carousel-image" alt="..." />
                    </div>
                 
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


        </div>


    )



}

export default Carrusel;