import React, { useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ModalInsertar from "./ModalInsertar";
import { FaPlus } from "react-icons/fa";

const TablaCamiones = ({lista}) => {
    const exportPDF = ()=>{

    }

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
  return (
    <>
      <MaterialReactTable
            //enableColumnOrdering//modificar el orden de las columnas
            //enableHiding={false} //boton de ocultar columnas
            enableFullScreenToggle={false} //boton de pantalla completa
            enableDensityToggle={false} //boton para cambiar la densidad de la tabla
            columns={columns} //nombres de columnas
            data={lista} //array de objetos
            localization={MRT_Localization_ES} //lenguaje en español
            enableRowActions //habilita los botones de acciones
            positionActionsColumn="last"
            options={{              exportButton: true,
            }}
            //enableRowSelection//habilita el checkbox de seleccionar
            //enableSelectAll={false}//habilita el checkbox de seleccionar todos
            renderRowActions={({ row, table }) => (  //botones de las accion
              <Box sx={{ display: "flex", gap: "1rem" }}>
                
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

                <Tooltip arrow placement="right" title="Registro Camion">
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
            <ModalInsertar/>
    </>
  )
}

export default TablaCamiones
