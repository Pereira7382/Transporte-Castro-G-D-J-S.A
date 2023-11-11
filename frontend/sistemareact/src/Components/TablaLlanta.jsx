import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ModalInsertarLlanta from "./ModalInsertarLlanta";
import ModalActualizarLlanta from "./ModalActualizarLlanta";

import { FaPlus } from "react-icons/fa";


// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaLlanta = ({ lista }) => {

  const [llantaAActualizar, setLlantaAActualizar] = useState(null);
  const [llantas, setLlantas] = useState(lista);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map(column => column.header)],
      body: llantas.map(item => columns.map(column => item[column.accessorKey])),
    });
    doc.save("tabla_llantas.pdf");

  };


  const columns = useMemo(
    () => [
      
      {
        header: "Marca",
        accessorKey: "marca",
      },
      {
        header: "Descripcion",
        accessorKey: "descripcion",
      },
      {
        header: "Duracion",
        accessorKey: "duracion",
      },
      {
        header: "Proveedor",
        accessorKey: "contactoProveedor",
      },
    
   
    ],
    []
  );

  const confirmDeleteAlert = (id) => {
    const result = window.confirm("¿Estás seguro de eliminar este registro? " + id);
    if (result) {
      handleEliminar(id);
    }
  };

  const handleEliminar = (id) => {
    fetch(`http://localhost:8080/llanta/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedLlantas = llantas.filter((llanta) => llanta.id !== id);
          setLlantas(updatedLlantas);
        } else {
          console.error("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const handleActualizar = (llanta) => {
    setLlantaAActualizar({ ...llanta });
  };

  useEffect(() => {
    setLlantas(lista);
  }, [lista]);

  return (
    <>
    <div style={{ position: "relative", zIndex: 0 }}>
      <MaterialReactTable
        enableFullScreenToggle={true}
        enableDensityToggle={true}
        columns={columns}
        data={llantas}
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
            <button
              variant="contained"
              color="primary"
              id="btnModalActualizar"
              data-bs-toggle="modal"
              data-bs-target="#modalActualizarLlanta"
              onClick={() => handleActualizar(row.original)}
            >
              Actualizar
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
            <Tooltip arrow placement="right" title="Registro Llanta">
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
      <ModalInsertarLlanta />
      <ModalActualizarLlanta
        llanta={llantaAActualizar}
        actualizarTablaLlanta={(nuevoLlanta) => {
          const updatedLlantas = llantas.map((llanta) =>
            llanta.id === nuevoLlanta.id ? nuevoLlanta : llanta
          );
          setLlantas(updatedLlantas);
        }}
      />
    </>
  );
};

export default TablaLlanta;

