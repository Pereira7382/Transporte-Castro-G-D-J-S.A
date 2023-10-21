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
        header: "Nombre",
        accessorKey: "nombre",
      },
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

  

  const handleReporteProveedor = (proveedorId) => {
    // Realizar una solicitud al backend para obtener los datos del proveedor
    fetch(`http://localhost:8080/proveedor/${proveedorId}`)
      .then((responseProveedor) => responseProveedor.json())
      .then((proveedorData) => {
        // Realizar una segunda solicitud al backend para obtener los datos del inventario del proveedor
        fetch(`http://localhost:8080/inventario/${proveedorId}/inventario`)
          .then((responseInventario) => responseInventario.json())
          .then((inventarioData) => {
            // Combinar los datos del proveedor y del inventario
            const datosParaReporte = {
              proveedor: proveedorData,
              inventario: inventarioData,
            };
  
            // Generar el PDF
            const doc = new jsPDF();
  
            // Agregar datos del proveedor al PDF
            doc.text("Proveedor:", 20, 20);
            doc.autoTable({
              startY: 30,
              head: [["Campo", "Valor"]],
              body: [
                ["Nombre", datosParaReporte.proveedor && datosParaReporte.proveedor.nombre ? datosParaReporte.proveedor.nombre : ""],
                ["ID Proveedor", datosParaReporte.proveedor && datosParaReporte.proveedor.id_proveedor ? datosParaReporte.proveedor.id_proveedor : ""],
                ["Correo Electrónico", datosParaReporte.proveedor && datosParaReporte.proveedor.correo_electronico ? datosParaReporte.proveedor.correo_electronico : ""],
                ["Teléfono", datosParaReporte.proveedor && datosParaReporte.proveedor.telefono ? datosParaReporte.proveedor.telefono : ""],
                ["Contacto", datosParaReporte.proveedor && datosParaReporte.proveedor.contacto ? datosParaReporte.proveedor.contacto : ""],
                ["Dirección", datosParaReporte.proveedor && datosParaReporte.proveedor.direccion ? datosParaReporte.proveedor.direccion : ""],
                ["Estado", datosParaReporte.proveedor && datosParaReporte.proveedor.estado ? "Activo" : "Inactivo"],
              ],
              theme: "striped",
              styles: { fontSize: 12, cellPadding: 3, overflow: "linebreak" },
            });
          
            // Agregar datos del inventario al PDF
            doc.text("Inventario:", 20, doc.autoTable.previous.finalY + 20);
            doc.autoTable({
              startY: doc.autoTable.previous.finalY + 30,
              head: [["ID", "Código", "Nombre", "Descripción", "Cantidad", "Tipo", "Activo"]],
              body: datosParaReporte.inventario.map((item) => [
                item.id,
                item.codigo,
                item.nombre,
                item.descripcion,
                item.cantidad,
                item.tipo,
                item.activo ? "Sí" : "No"
              ]),
              theme: "striped",
              styles: { fontSize: 10, cellPadding: 3, overflow: "linebreak" },
            });
          
            // Guardar el PDF
            doc.save("reporte_proveedor.pdf");
          })
          .catch((error) => {
            console.error("Error al obtener los datos del inventario:", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener los datos del proveedor:", error);
      });
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
           
            <button
              variant="contained"
              color="default"
              onClick={() => handleReporteProveedor(row.original.id_proveedor)}
            >
              GenerarReporte
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
