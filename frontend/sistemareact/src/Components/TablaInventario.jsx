import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaPlus } from "react-icons/fa";
import ModalInventario from "./ModalInventario";
import ModalActualizarInventario from "./ModalActualizarInventario";
import ModalMovimientoInventario from "./ModalMovimientoInventario";
import ModalInsertarFechaReporte from "./ModalInsertarFechaReporte";
import "react-toastify/dist/ReactToastify.css";
import Campana from './Campana'; 
import Notificaciones from './Notificaciones'; // Asegúrate de que la ruta al archivo Notificaciones sea correcta
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { BiUserVoice } from 'react-icons/bi';
import Swal from 'sweetalert2';


const TablaInventario = ({ lista }) => {
  const [inventarioAActualizar, setInventarioAActualizar] = useState(null);
  const [inventario, setInventario] = useState(lista);
  const [modalPiezaId, setModalPiezaId] = useState(null);
  const [modalPiezaCantidadActual, setModalPiezaCantidadActual] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);;
  const [cargando, setCargando] = useState(true);
  const [modalReporteFecha, setModalReporteFecha] = useState(null);



  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map(column => column.header)],
      body: inventario.map(item => columns.map(column => item[column.accessorKey])),
    });
    doc.save("tabla_inventario.pdf");
  };

  const columns = useMemo(
    () => [
     
      {
        header: "Código",
        accessorKey: "codigo",
      },
      {
        header: "Nombre",
        accessorKey: "nombre",
      },
      {
        header: "Descripción",
        accessorKey: "descripcion",
      },
      {
        header: "Cantidad",
        accessorKey: "cantidad",
      },
      {
        header: "Tipo",
        accessorKey: "tipo",
      },
 
    ],
    []
  );

  const confirmDeleteAlert = (id) => {
    Swal.fire({
        title: '¿Estás seguro de eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          handleEliminar(id);
          Swal.fire('Eliminado', 'El registro ha sido eliminado', 'success');
        
        }
      });
};

  useEffect(() => {
    if (inventario.length > 0) {
    
      const nuevasNotificaciones = inventario.map(item => {
        let mensaje = '';
        let severidad = '';
  
        if (item.cantidad <= 10) {
          mensaje = `¡Alerta! El artículo ${item.nombre} está a punto de agotarse. Cantidad: ${item.cantidad}`;
          severidad = 'warning';
        } else if (item.cantidad > 10 && item.cantidad < 40) {
          mensaje = `Recomendación: Reabastecer el artículo ${item.nombre}. Cantidad: ${item.cantidad}`;
          severidad = 'info';
        }
  
        return {
          mensaje,
          severidad,
        };
      });
  
      setNotificaciones(nuevasNotificaciones);
    }
  }, [inventario]);

  
  

  const handleEliminar = (id) => {
    fetch(`http://localhost:8080/inventario/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedInventario = inventario.filter((item) => item.id !== id);
          setInventario(updatedInventario);
        } else {
          console.error("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const handleActualizar = (item) => {
    setInventarioAActualizar({ ...item });
  };

  const handleOpenModal = (piezaId, cantidadActual) => {
    // Abre el modal y pasa el ID de la pieza al componente ModalMovimientoInventario
    console.log("cantidad actual de la pieza seleccionada: " + cantidadActual);
    setModalPiezaId(piezaId); // Suponiendo que tienes un estado para el ID de la pieza en el componente padre
    setModalPiezaCantidadActual(cantidadActual);
  };
  

  useEffect(() => {
    setInventario(lista);
  }, [lista]);

  return (
    <>
     <div style={{ position: "relative", zIndex: 0 }}>
      <MaterialReactTable
        enableFullScreenToggle={true}
        enableDensityToggle={true}
        columns={columns}
        data={inventario}
        localization={MRT_Localization_ES}
        enableRowActions
        positionActionsColumn="last"
        options={{
          exportButton: true,
        }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
           <Button
              onClick={() => confirmDeleteAlert(row.original.id)}
              startIcon={<DeleteIcon />}
              color="error"
           >
          </Button>
          <Button
                id="btnModalActualizar"
                data-bs-toggle="modal"
                data-bs-target="#modalActualizarInventario"
                onClick={() => handleActualizar(row.original)}
                startIcon={<EditIcon />}
              >
            </Button>

 
         <button
           variant="contained"
           color="primary"
           id="btnModalMovimientoInventario"
           data-bs-toggle="modal"
           data-bs-target="#modalMovimientoInventario"
           onClick={() => handleOpenModal(row.original.id, row.original.cantidad)}
           style={{ background: 'transparent', border: 'none' }} // Establece el fondo y el borde a transparente y sin borde
      >
     <BiUserVoice
      style={{ color: 'blue', fontSize: '24px' }}
      title="Movimiento" // Agrega el título (mensaje) que se mostrará cuando se posicione el cursor
   />
         
         </button>

          </Box>
        )}
        renderTopToolbarCustomActions={({ }) => (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              p: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <Tooltip arrow placement="right" title="Exportar tabla">
              <IconButton onClick={() => exportPDF()}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Registro Inventario">
              <IconButton
                size="small"
                color="success"
                id="btnModalInsertar"
                data-bs-toggle="modal"
                data-bs-target="#modalInventario"
              >
                <FaPlus />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      </div>
      <ModalInventario />
      <ModalActualizarInventario
        inventarioSeleccionado={inventarioAActualizar}
        actualizarTablaInventario={(nuevoItem) => {
          const updatedInventario = inventario.map((item) =>
            item.id === nuevoItem.id ? nuevoItem : item
          );
          setInventario(updatedInventario);
        }}
      />
      
      <ModalInsertarFechaReporte reporte={modalReporteFecha} />
      <Campana notificaciones={notificaciones} />
      <Notificaciones notificaciones={notificaciones} />
    

      <ModalMovimientoInventario pieza={modalPiezaId} cantidadActual={modalPiezaCantidadActual} />


    </>
  );
};

export default TablaInventario;