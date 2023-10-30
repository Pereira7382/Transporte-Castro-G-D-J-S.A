import { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import "jspdf-autotable";
import { FaPlus } from "react-icons/fa";
import ModalInsertarGastoC from "./ModalInsertarGastoC";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';

// Definición del componente TablaCamiones que recibe una lista de datos como prop (lista)
const TablaGastoCombustible = ({ lista }) => {
    const [gastos, setGastos] = useState(lista);


    const confirmDeleteAlert = (id, matricula) => {
        const result = window.confirm("¿Estás seguro de eliminar este registro con ID: " + id + " y Matrícula: " + matricula + "?");
        if (result) {
            handleEliminar(id, matricula);
        }
    };
    
    const handleEliminar = (id, matricula) => {
        console.log("entro a eliminar");
        fetch(`http://localhost:8080/gastoCombustible/${id}/${matricula}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    const updatedGastos = gastos.filter((gasto) => gasto.id !== id);
                    setGastos(updatedGastos);
                   
                } else {
                    console.error("Error al eliminar el registro");
                }
            })
            .catch((error) => {
                console.error("Error de red:", error);
            });
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
          head: [columns.map(column => column.header)],
          body: gastos.map(item => columns.map(column => item[column.accessorKey])),
        });
        doc.save("tabla_Gastos_Combustible.pdf");   
      };

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
                accessorKey: "matricula",
            },
            {
                header: "Km anterior",
                accessorKey: "kilometrajeAnterior",
            },
            {
                header: "Km actual",
                accessorKey: "kilometrajeActual",
            },
            {
                header: "Proveedor",
                accessorKey: "nombre",
            },
            {
                header: "Fecha",
                accessorKey: "fecha",
            },
            {
                header: "Litros",
                accessorKey: "litros",
            },

        ],
        []
    );

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
                      <Button
                        onClick={() => confirmDeleteAlert(row.original.id, row.original.matricula)}
                        startIcon={<DeleteIcon />}
                        color="error"
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
                        <Tooltip arrow placement="right" title="Registrar Gasto">
                            <IconButton
                                size="small"
                                color="success"
                                id="btnModalInsertarGasto"
                                data-bs-toggle="modal"
                                data-bs-target="#modalInsertarGasto"
                            >
                                <FaPlus />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
            </div>
            <ModalInsertarGastoC />
        </>
    );
};

export default TablaGastoCombustible;