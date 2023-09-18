import React, {useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ModalInsertar from "./ModalInsertar";
import { FaPlus } from "react-icons/fa";

// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaCamiones = ({ lista }) => {
  // Función exportPDF que podría ser implementada para exportar la tabla a PDF
  const exportPDF = () => {
    // Implementar la lógica para exportar la tabla a PDF aquí
  };

  // Definición de las columnas de la tabla utilizando useMemo para optimización
  const columns = useMemo(
    () => [
      {
        header: "Id", // Nombre de la columna
        accessorKey: "id", // Nombre de la propiedad en tus datos que contiene el ID
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

  //const [confirmDelete, setConfirmDelete] = useState(null);
    //onClick={() => confirmDeleteAlert(row.id)}
  // Función para mostrar una alerta de confirmación antes de eliminar un registro
  const confirmDeleteAlert = (id) => {
    const result = window.confirm("¿Estás seguro de eliminar este registro? " + id);
    if (result) {
      // Si el usuario confirma la eliminación, llama a la función handleEliminar
      handleEliminar(id);
    }
  };

  // Función handleEliminar para eliminar un registro por su ID
  const handleEliminar = (id) => {
    // Realiza una solicitud de eliminación a la URL http://localhost:8080/camion con el ID
    fetch(`http://localhost:8080/camion/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          //actualizar la lista de registros aquí

        } else {
          //errores de eliminación aquí
          console.error("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  return (
    <>
      <MaterialReactTable
        // Habilitar o deshabilitar funcionalidades de la tabla
        enableFullScreenToggle={true} // Botón de pantalla completa
        enableDensityToggle={true} // Botón para cambiar densidad de la tabla
        columns={columns} // Definición de las columnas
        data={lista} // Datos para llenar la tabla (proporcionados como prop)
        localization={MRT_Localization_ES} // Lenguaje en español para la tabla
        enableRowActions // Habilitar botones de acciones por fila (editar, eliminar, etc.)
        positionActionsColumn="last" // Posición de la columna de acciones (última)
        options={{
          exportButton: true, // Habilitar botón de exportación de la tabla
        }}
        renderRowActions={({ row }) => (
          // Definición de los botones de acciones por fila
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {/* Botón para eliminar */}
            <button
              variant="contained"
              color="secondary"
              onClick={() => confirmDeleteAlert(row.original.id)}
            >
              Eliminar
            </button>
        
            {/* Botón para actualizar */}
            <button
              variant="contained"
              color="primary"
             // onClick={() => handleActualizar(row.id)} // Reemplaza 'handleActualizar' con tu función de actualización
            >
              Actualizar
            </button>
        
            {/* Botón para registrar mantenimiento preventivo */}
            <button
              variant="contained"
              color="default"
             // onClick={() => handleMantenimiento(row.id)} // Reemplaza 'handleMantenimiento' con tu función de registro de mantenimiento
            >
              Mantenimiento
            </button>
          </Box>
        )}        
          
        renderTopToolbarCustomActions={({ table }) => (
          // Definición de acciones personalizadas en la parte superior de la tabla
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              p: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <Tooltip arrow placement="right" title="Exportar tabla">
              {/* Botón para exportar la tabla a PDF */}
              <IconButton onClick={() => exportPDF()}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip arrow placement="right" title="Registro Camión">
              {/* Botón para abrir el modal de registro de camión */}
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
    </>
  );
};

export default TablaCamiones;
