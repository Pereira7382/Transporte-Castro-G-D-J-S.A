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

const TablaInventario = ({ lista }) => {
  const [inventarioAActualizar, setInventarioAActualizar] = useState(null);
  const [inventario, setInventario] = useState(lista);
  const [modalPiezaId, setModalPiezaId] = useState(null);
  const [modalPiezaCantidadActual, setModalPiezaCantidadActual] = useState(null);
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
          return rowData.activo == 1 ? "Activo" : "Inactivo";
        },
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
              data-bs-target="#modalActualizarInventario"
              onClick={() => handleActualizar(row.original)}
            >
              Actualizar
            </button>
            <button
              variant="contained"
              color="primary"
              id="btnModalMovimientoInventario"
              data-bs-toggle="modal"
              data-bs-target="#modalMovimientoInventario"
              onClick={() => handleOpenModal(row.original.id, row.original.cantidad)} // Pasa el ID de la pieza al abrir el modal
            >
              Movimiento
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

      <ModalMovimientoInventario pieza={modalPiezaId} cantidadActual={modalPiezaCantidadActual} />


    </>
  );
};

export default TablaInventario;