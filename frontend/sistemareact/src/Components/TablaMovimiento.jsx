import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FaPlus } from "react-icons/fa";
import ModalInsertarFechaReporte from "./ModalInsertarFechaReporte";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';


const TablaMovimiento = ({ lista }) => {
  const [movimientoAActualizar, setMovimientoAActualizar] = useState(null);
  const [movimientos, setMovimientos] = useState(lista);

  const columns = useMemo(
    () => [
      {
        header: "Descripción",
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
      head: [columns.map((column) => column.header)],
      body: movimientos.map((item) => columns.map((column) => item[column.accessorKey])),
    });
    doc.save("tabla_movimiento.pdf");
  };

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

  const handleEliminar = (id) => {
    fetch(`http://localhost:8080/movimientoinventario/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedMovimientos = movimientos.filter((movimiento) => movimiento.id !== id);
          setMovimientos(updatedMovimientos);
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
      <div style={{ position: "relative", zIndex: 0 }}>
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
            <Button
              onClick={() => confirmDeleteAlert(row.original.id)}
              startIcon={<DeleteIcon />}
              color="error"
            >
            </Button>
           
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
                 <PictureAsPdfIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Registrar Movimiento">
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
      </div>
      <ModalInsertarFechaReporte onExportar={setMovimientos} />
    </>
  );
};

export default TablaMovimiento;
