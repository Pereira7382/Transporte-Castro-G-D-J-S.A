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
import EventIcon from '@mui/icons-material/Event';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import SearchIcon from '@mui/icons-material/Search';
import ModalRellenos from './ModalRellenos';
import axios from 'axios';

const PaginaPrincipalCamion = () => {
  const { id } = useParams();
  const [camion, setCamion] = useState(null);
  const [datosConsumo, setDatosConsumo] = useState(null);
  const [datosAceite, setDatosAceite] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
        setDatosAceite(response.data);
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>

        </div>

        <div className="grid-container">
          <div className="grid-item">
            <div className="icon">
              <BarChartIcon fontSize="large" sx={{ color: 'purple' }} />
            </div>
            <div>Estadisticas</div>

            <div className="contenido">
              {camion ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <LocalShippingIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Matricula: {camion.matricula} .
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SpeedIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Rodaje: {camion.kilometraje} km.
                    </Typography>
                  </div>

                </>
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
                    <LocalGasStationIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Lts consumidos: {datosConsumo.litrosConsumidos}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SpeedIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
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
                    <MonetizationOnIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      por km: {datosConsumo.gastoPorKm}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <LocalGasStationIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Lts por km: {datosConsumo.promLitKm}
                    </Typography>
                  </div>
                </>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <TextField
                    label="inicio"
                    type="date"
                    value={fechaInicio}
                    onChange={handleFechaInicioChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: { fontSize: '10px', marginRight: '4px', width: '55px' }, // Ajusta el tamaño de fuente, el margen y el ancho
                    }}
                  />
                  <TextField
                    label="fin"
                    type="date"
                    value={fechaFin}
                    onChange={handleFechaFinChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: { fontSize: '10px', width: '55px' }, // Ajusta el tamaño de fuente y el ancho
                    }}
                  />
                  <Button
                    onClick={handleFiltrarClick}
                    disabled={loading}
                    startIcon={<SearchIcon />}
                    style={{ fontSize: '12px', minWidth: '20px', padding: '6px', marginLeft: '10px' }}
                  >
                  </Button>
                </div>
              </div>

            </div>
          </div>

          <div className="grid-item">
            <OpacityIcon fontSize="large" sx={{ color: 'purple' }} />
            <div> Mantenimiento de aceite</div>
            <div className="contenido">
              {datosAceite && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <EventIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Fecha : {datosAceite.fecha}
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <HourglassEmptyIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Caducidad {datosAceite.caducidad} km.
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <SpeedIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Recorridos {datosAceite.kmRecorridos} km.
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <TimelineIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Restantes {datosAceite.kmRestantes} km.
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <OpacityIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Aceite consumido {datosAceite.ltConsumidos} lts.
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <OpacityIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      x Km {datosAceite.consXkm} lts.
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <MonetizationOnIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Total invertido {datosAceite.gastoTotal} ₡.
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <MonetizationOnIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Costo por km {datosAceite.costoXkm} ₡.
                    </Typography>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <OpacityIcon style={{ fontSize: '20px', marginRight: '5px', color: 'purple' }} />
                    <Typography variant="body1" style={{ fontSize: '16px', color: 'black' }}>
                      Cantidad: {datosAceite.rellenos}
                      <Button onClick={() => setOpenModal(!openModal)}>
                        <VisibilityIcon />
                      </Button>
                      <ModalRellenos listaRellenos={datosAceite.listaRellenos} handleClose={() => setOpenModal(false)} open={openModal} />

                    </Typography>
                  </div>

                </>
              )}
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
    </Layout >
  );
};

export default PaginaPrincipalCamion;
