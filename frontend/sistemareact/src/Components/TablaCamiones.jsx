import React, { useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ModalInsertar from "./ModalInsertar";
import ModalActualizarCamion from "./ModalActualizarCamion"; // Importa el nuevo componente
import { FaPlus } from "react-icons/fa";

// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaCamiones = ({ lista }) => {
  const [camionAActualizar, setCamionAActualizar] = useState(null);

  // Función exportPDF que podría ser implementada para exportar la tabla a PDF
  const exportPDF = () => {
    // Implementar la lógica para exportar la tabla a PDF aquí
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
    //
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
          // Actualizar la lista de registros aquí
        } else {
          console.error("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const handleActualizar = (camion) => {
    // Definir una variable de estado para controlar la visibilidad del modal
    setCamionAActualizar({...camion});
  };

  return (
    <>

      <MaterialReactTable
        enableFullScreenToggle={true}
        enableDensityToggle={true}
        columns={columns}
        data={lista}
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
              onClick={() => handleActualizar(row.original)} // Llama a la función handleActualizar
            >
              Actualizar
            </button>
            <button
              variant="contained"
              color="default"
            >
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
      {/* Renderizar el componente ModalInsertar para el formulario de registro */}
      <ModalInsertar />
      {/* Renderizar el componente ModalActualizarCamion */}
      <ModalActualizarCamion camion = {camionAActualizar} />
    </>
  );
};

export default TablaCamiones;
