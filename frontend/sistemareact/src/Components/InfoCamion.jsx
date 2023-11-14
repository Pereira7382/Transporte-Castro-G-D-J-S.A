import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';
import '../Asset/Css/PaginaPrincipalCamion.css';
import Layout from '../Components/Layout/Layout';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BarChartIcon from '@mui/icons-material/BarChart';
import OpacityIcon from '@mui/icons-material/Opacity';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpeedIcon from '@mui/icons-material/Speed';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import axios from 'axios';

const PaginaPrincipalCamion = () => {
  const { id } = useParams();
  const [camion, setCamion] = useState(null);
  const [datosConsumo, setDatosConsumo] = useState(null);
  //const [datosAceite, setDatosAceite] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);

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
      obtenerConsComb();
      obtenerConsAceite();
    }
  }, [camion]);

  useEffect(() => {
    obtenerCamion();
    
  }, [id]);

  const obtenerConsComb = () => {
    // Solicitar datos de consumo de combustible al servidor
    axios.get(`http://localhost:8080/gastoCombustible/${camion.matricula}`)
      .then(response => {
        console.log(response.data);
        setDatosConsumo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de consumo de combustible: ', error);
      });
  };

  const obtenerConsAceite = () => {
    // Solicitar datos de consumo de combustible al servidor
    //solicitar datos de consumo de aceite al servidor 
    axios.get(`http://localhost:8080/gastoAceite/${camion.matricula}`)
      .then(response => {
        console.log(response.data);
        setDatosConsumo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de consumo de aceite: ', error);
      });
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  const handleFiltrarClick = () => {
    setLoading(true);

    const params = {
      fechaInicio: formatDate(fechaInicio),
      fechaFin: formatDate(fechaFin),
    };

    axios.get(`http://localhost:8080/filtro/${camion.matricula}`, { params })
      .then(response => {
        console.log(response.data);
        setDatosConsumo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de consumo de combustible: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Función para formatear la fecha a 'YYYY-MM-DD'
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };


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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <TextField
                    label="Fecha de inicio"
                    type="date"
                    value={fechaInicio}
                    onChange={handleFechaInicioChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: { fontSize: '10px', marginRight: '10px' }, // Ajusta el tamaño de fuente y el margen
                    }}
                  />
                  <TextField
                    label="Fecha de fin"
                    type="date"
                    value={fechaFin}
                    onChange={handleFechaFinChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: { fontSize: '10px' },
                    }}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFiltrarClick}
                  disabled={loading}
                >
                  Filtrar
                </Button>
              </div>
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
