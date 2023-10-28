import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ModalInsertar from "./ModalInsertar";
import ModalActualizarCamion from "./ModalActualizarCamion";
import { FaPlus } from "react-icons/fa";
import { Button } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';


// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaCamiones = ({ lista }) => {
  const [camionAActualizar, setCamionAActualizar] = useState(null);
  const [camiones, setCamiones] = useState(lista);

  const conectarConApp = (id) => {
    console.log("Conectando con la app para el camión con ID:", id);
    window.location.href = `/info-camion/${id}`;
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map(column => column.header)],
      body: camiones.map(item => columns.map(column => item[column.accessorKey])),
    });
    doc.save("tabla_inventario.pdf");

  };


  const columns = useMemo(
    () => [

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
      <div style={{ position: "relative", zIndex: 0 }}>
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

          renderRow={({ row }) => (
            <div>
              <Button
                onClick={() => conectarConApp(row.original.id)}
                startIcon={<DirectionsBusIcon />}
              >
              </Button>
            </div>
          )}

          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button
                onClick={() => conectarConApp(row.original.id)}
                startIcon={<DirectionsBusIcon />}
                color="success"
              >
              </Button>
              <Button
                onClick={() => confirmDeleteAlert(row.original.id)}
                startIcon={<DeleteIcon />}
                color="error"
              >
              </Button>
              <Button
                id="btnModalActualizar"
                data-bs-toggle="modal"
                data-bs-target="#modalActualizarCamion"
                onClick={() => handleActualizar(row.original)}
                startIcon={<EditIcon />}
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
      </div>
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
