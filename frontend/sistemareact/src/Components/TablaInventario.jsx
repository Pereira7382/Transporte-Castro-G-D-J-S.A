import React, { useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FaPlus } from "react-icons/fa";


// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaInventario = ({ lista }) => {

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
      {
        header: "Estado",
        accessorKey: "activo",
        cellRenderer: (rowData) => {
          console.log(rowData); // Agrega esta línea para depurar
          return rowData.activo == 1 ? "Activo" : "Inactivo";
        },
      },
      
    ],
    []
  );

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
            >
              Eliminar
            </button>
            <button
            >
              Actualizar
            </button>
            <button
              variant="contained"
              color="default"
            >
              Movimiento
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
            <Tooltip arrow placement="right" title="Registro Herramienta">
              <IconButton
              >
                <FaPlus />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </>
  );
};

export default TablaInventario;
