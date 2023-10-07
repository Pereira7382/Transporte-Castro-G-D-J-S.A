import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ModalInsertarProveedor from "./ModalInsertarProveedor";
import ModalActualizarProveedor from "./ModalActualizarProveedor";
import { FaPlus } from "react-icons/fa";


// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaProveedor = ({ lista }) => {
  const [proveedorAActualizar, setProveedorAActualizar] = useState(null);
  const [proveedores, setProveedores] = useState(lista);

 
  

  const columns = useMemo(
    () => [
    
      {
        header: "Correo Electronico",
        accessorKey: "correo_electronico",
      },
      {
        header: "Telefono",
        accessorKey: "telefono",
      },
      {
        header: "Contacto",
        accessorKey: "contacto",
      },
      {
        header: "Direccion",
        accessorKey: "direccion",
      },
    
    ],
    []
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map(column => column.header)],
      body: proveedores.map(item => columns.map(column => item[column.accessorKey])),
    });
    doc.save("tabla_inventario.pdf");

  };


  const confirmDeleteAlert = (id_proveedor) => {
    const result = window.confirm("¿Estás seguro de eliminar este registro? " + id_proveedor);
    if (result) {
      handleEliminar(id_proveedor);
    }
  };

  const handleEliminar = (id_proveedor) => {
    fetch(`http://localhost:8080/proveedor/${id_proveedor}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedProveedores = proveedores.filter((proveedor) => proveedor.id_proveedor !== id_proveedor);
          setProveedores(updatedProveedores);
        } else {
          console.error("Error al eliminar el registro");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const handleActualizar = (proveedor) => {
    setProveedorAActualizar({ ...proveedor });
  };

  useEffect(() => {
    setProveedores(lista);
  }, [lista]);

  return (
    <>
      <MaterialReactTable
        enableFullScreenToggle={true}
        enableDensityToggle={true}
        columns={columns}
        data={proveedores}
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
              onClick={() => confirmDeleteAlert(row.original.id_proveedor)}
            >
              Eliminar
            </button>
            <button
              variant="contained"
              color="primary"
              id="btnModalActualizar"
              data-bs-toggle="modal"
              data-bs-target="#modalActualizarProveedor"
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
      <ModalInsertarProveedor />
      <ModalActualizarProveedor
        proveedor={proveedorAActualizar}
        actualizarTablaProveedor={(nuevoProveedor) => {
          const updatedProveedores = proveedores.map((proveedor) =>
          proveedor.id_proveedor === nuevoProveedor.id_proveedor ? nuevoProveedor : proveedor
          );
          setProveedores(updatedProveedores);
        }}
      />
    </>
  );
};

export default TablaProveedor;
