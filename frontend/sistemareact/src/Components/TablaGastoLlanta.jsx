import { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import "jspdf-autotable";
import { FaPlus } from "react-icons/fa";
import ModalInsertarGastoL from "./ModalInsertarGastoL";

const TablaGastoLlanta = ({ lista }) => {
    const [gastos, setGastos] = useState(lista);

    const columns = useMemo(
        () => [

          
            {
                header: "Factura # ",
                accessorKey: "numero_factura",
            },
            {
                header: "Monto",
                accessorKey: "monto",
            },
            {
                header: "Placa",
                accessorKey: "matriculaCamion",
            },
            {
                header: "Proveedor",
                accessorKey: "nombreProveedor",
            },
            {
                header: "Marca",
                accessorKey: "marcaLlanta",
            },
            {
                header: "Kilometraje al momento",
                accessorKey: "kmCamion",
            },
            {
                header: "Duracion Rodamiento",
                accessorKey: "duracion",
            },
            {
                header: "Fecha",
                accessorKey: "fecha",
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
        fetch(`http://localhost:8080/gastoLlanta/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              const updatedLlantas = gastos.filter((gasto) => gasto.id !== id);
              setGastos(updatedLlantas);
            } else {
              console.error("Error al eliminar el registro");
            }
          })
          .catch((error) => {
            console.error("Error de red:", error);
          });
      };
    

    useEffect(() => {
        setGastos(lista);
    }, [lista]);

    return (
        <>
            <div style={{ position: "relative", zIndex: 0 }}>
                <MaterialReactTable
                    enableFullScreenToggle={true}
                    enableDensityToggle={true}
                    columns={columns}
                    data={gastos}
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
                            <Tooltip arrow placement="right" title="Registrar Gasto">
                                <IconButton
                                    size="small"
                                    color="success"
                                    id="btnModalInsertarGastoL"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalInsertarGastoL"
                                >
                                    <FaPlus />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                />
            </div>
            <ModalInsertarGastoL />
        </>
    );
    
    
};

export default TablaGastoLlanta;