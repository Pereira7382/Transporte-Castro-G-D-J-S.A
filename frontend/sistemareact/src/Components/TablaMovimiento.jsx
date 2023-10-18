import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ModalInsertarFechaReporte from "./ModalInsertarFechaReporte";
import jsPDF from "jspdf";
import "jspdf-autotable";



import { FaPlus } from "react-icons/fa";



const TablaMovimiento = ({ lista }) => {
  const [movimientoAActualizar, setMovimientoAActualizar] = useState(null);
  const [movimientos, setMovimientos] = useState(lista);
  const [modalPiezaId] = useState(null);
  const [modalReporteFecha] = useState(null);

 
  

    const columns = useMemo(
        () => [

        
            {
                header: "Descripcion",
                accessorKey: "descripcion",
            },
            {
                header: "Tipo movimiento",
                accessorKey: "tipo_movimiento",
            },
            {
                header: "Cantidad",
                accessorKey: "cantidad",
            },
            {
                header: "Fecha movimiento",
                accessorKey: "fecha_movimiento",
            },

        ],
        []
    );


    

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map(column => column.header)],
      body: movimientos.map(item => columns.map(column => item[column.accessorKey])),
    });
    doc.save("tabla_movimiento.pdf");

  };


  const confirmDeleteAlert = (id) => {
    const result = window.confirm("¿Estás seguro de eliminar este registro? " + id);
    if (result) {
      handleEliminar(id);
    }
  };

  const handleEliminar = (id) => {
    fetch(`http://localhost:8080/movimientoinventario/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedProveedores = movimientos.filter((movimiento) => movimiento.id !== id);
          setMovimientos(updatedProveedores);
        } else {
          console.error("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

 
  
  useEffect(() => {
    setMovimientos(lista);
  }, [lista]);

  return (
    <>
      <MaterialReactTable
        enableFullScreenToggle={true}
        enableDensityToggle={true}
        columns={columns}
        data={movimientos}
        localization={MRT_Localization_ES}
        enableRowActions
        positionActionsColumn="last"
        options={{
          exportButton: true,
        }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <button
              variant="contained"
              color="secondary"
              onClick={() => confirmDeleteAlert(row.original.id)}
            >
              Eliminar
            </button>
           
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => (
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
            <Tooltip arrow placement="right" title="Registro Proveedor">
              <IconButton
                size="small"
                color="success"
                id="btnModalInsertar"
                data-bs-toggle="modal"
                data-bs-target="#modalInsertar"
              >
                <FaPlus />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
     <ModalInsertarFechaReporte reporte={modalReporteFecha} />
 
    </>
  );
};

export default TablaMovimiento;