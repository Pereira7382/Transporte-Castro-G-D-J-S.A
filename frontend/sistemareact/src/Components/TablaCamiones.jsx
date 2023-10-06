import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ModalInsertar from "./ModalInsertar";
import ModalActualizarCamion from "./ModalActualizarCamion";
import { FaPlus } from "react-icons/fa";


// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaCamiones = ({ lista }) => {
  const [camionAActualizar, setCamionAActualizar] = useState(null);
  const [camiones, setCamiones] = useState(lista);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map(column => column.header)],
      body: camiones.map(item => columns.map(column => item[column.accessorKey])),
    });
    doc.save("tabla_camiones.pdf");
  };

  const columns = useMemo(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Matrícula",
        accessorKey: "matricula",
      },
      {
        header: "Modelo",
        accessorKey: "modelo",
      },
      {
        header: "Estado",
        accessorKey: "estado",
      },
      {
        header: "Año",
        accessorKey: "anio",
      },
      {
        header: "Número BIN",
        accessorKey: "numero_bin",
      },
      {
        header: "Kilometraje",
        accessorKey: "kilometraje",
      },
      {
        header: "Tipo de Camión",
        accessorKey: "tipo_camion",
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
    fetch(`http://localhost:8080/camion/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedCamiones = camiones.filter((camion) => camion.id !== id);
          setCamiones(updatedCamiones);
        } else {
          console.error("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const handleActualizar = (camion) => {
    setCamionAActualizar({ ...camion });
  };

  useEffect(() => {
    setCamiones(lista);
  }, [lista]);

  return (
    <>
      <MaterialReactTable
        enableFullScreenToggle={true}
        enableDensityToggle={true}
        columns={columns}
        data={camiones}
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
              data-bs-target="#modalActualizarCamion"
              onClick={() => handleActualizar(row.original)}
            >
              Actualizar
            </button>
            <button variant="contained" color="default">
              Mantenimiento
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
            <Tooltip arrow placement="right" title="Registro Camión">
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
      <ModalInsertar />
      <ModalActualizarCamion
        camion={camionAActualizar}
        actualizarTablaCamiones={(nuevoCamion) => {
          const updatedCamiones = camiones.map((camion) =>
            camion.id === nuevoCamion.id ? nuevoCamion : camion
          );
          setCamiones(updatedCamiones);
        }}
      />
    </>
  );
};

export default TablaCamiones;
