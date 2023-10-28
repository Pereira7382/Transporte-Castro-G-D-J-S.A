import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import '../Asset/Css/PaginaPrincipalCamion.css';
import Layout from '../Components/Layout/Layout';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BarChartIcon from '@mui/icons-material/BarChart';
import OpacityIcon from '@mui/icons-material/Opacity';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpeedIcon from '@mui/icons-material/Speed';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const PaginaPrincipalCamion = () => {
  const { id } = useParams();
  const [camion, setCamion] = useState(null);
  const [datosConsumo, setDatosConsumo] = useState(null);

  const obtenerCamion = () => {
    axios.get(`http://localhost:8080/camion/${id}`)
      .then(response => {
        console.log(response.data);
        setCamion(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos del camion: ', error);
      });
  };

  useEffect(() => {
    obtenerCamion();
  }, [id]);

  useEffect(() => {
    if (camion?.matricula) {
      // Solicitar datos de consumo de combustible al servidor
      axios.get(`http://localhost:8080/gastoCombustible/${camion.matricula}`)
        .then(response => {
          console.log(response.data);
          setDatosConsumo(response.data);
        })
        .catch(error => {
          console.error('Error al obtener datos de consumo de combustible: ', error);
        });
    }
  }, [camion]);

  return (
    <Layout>
      <div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <LocalShippingIcon sx={{ fontSize: 40, marginRight: '10px', color: 'blue' }} />
          <Typography variant="h4" component="h1">
            {camion ? ` ${camion.matricula}` : 'Cargando...'}
          </Typography>
        </div>


        <div className="grid-container">


          <div className="grid-item">
            <div className="icon">
              <BarChartIcon fontSize="large" sx={{ color: 'purple' }} />
            </div>
            <div>Estadisticas</div>

            <div className="contenido">
              {camion ? (
                <Typography variant="body1">
                  <SpeedIcon style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 5 }} /> {camion.kilometraje}
                </Typography>
              ) : (
                'Cargando...'
              )}
            </div>

          </div>

          <div className="grid-item">
            <LocalGasStationIcon fontSize="large" sx={{ color: 'purple' }} />
            <div>Consumo de combustible</div>

            <div className="contenido" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {datosConsumo && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <LocalGasStationIcon style={{ fontSize: '20px', marginRight: '5px', color: 'blue' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Lts consumidos: {datosConsumo.litrosConsumidos}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SpeedIcon style={{ fontSize: '20px', marginRight: '5px', color: 'green' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Km recorridos: {datosConsumo.kmRecorrido}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <MonetizationOnIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Total: {datosConsumo.gastoTotal}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <MonetizationOnIcon style={{ fontSize: '20px', marginRight: '5px', color: 'orange' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      por km: {datosConsumo.gastoPorKm}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <LocalGasStationIcon style={{ fontSize: '20px', marginRight: '5px', color: 'red' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Lts por km: {datosConsumo.promLitKm}
                    </Typography>
                  </div>
                </>
              )}
            </div>


          </div>

          <div className="grid-item">
            <OpacityIcon fontSize="large" sx={{ color: 'purple' }} />
            <div> Consumo de aceites</div>

            <div className="contenido">
              Estadisticas
            </div>

          </div>

          <div className="grid-item">
            <DriveEtaIcon fontSize="large" sx={{ color: 'purple' }} />
            <div>Rodaje de llantas</div>

            <div className="contenido">
              Estadisticas
            </div>


          </div>

        </div>
      </div>
    </Layout>
  );
};

export default PaginaPrincipalCamion;
