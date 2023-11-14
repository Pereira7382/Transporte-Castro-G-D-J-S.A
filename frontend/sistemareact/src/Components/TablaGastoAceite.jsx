import { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import "jspdf-autotable";
import { FaPlus } from "react-icons/fa";
import ModalInsertarGastoA from "./ModalInsertarGastoA";
import jsPDF from "jspdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EditIcon from '@mui/icons-material/EditOutlined';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import ModalRellenoAceite from "./ModalRellenoAceite";

const TablaGastoAceite = ({ lista }) => {
    const [gastos, setGastos] = useState(lista);

    const confirmDeleteAlert = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              handleEliminar(id);
              Swal.fire('Eliminado', 'El registro ha sido eliminado', 'success');
            
            }
          });
    };

    const [idMantenimiento, setIdMantenimiento] = useState(null);
    const [numeroFactura, setNumeroFactura] = useState(null);

    const handleOpenModal = (id_mantenimiento, numero_factura) => {
        console.log("Abriendo modal con id_mantenimiento:", id_mantenimiento, "y numero_factura:", numero_factura);
        setIdMantenimiento(id_mantenimiento);
        setNumeroFactura(numero_factura);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [columns.map(column => column.header)],
            body: gastos.map(item => columns.map(column => item[column.accessorKey])),
        });
        doc.save("tabla_Gastos_Cambio_Acite.pdf");
    };

    

    const handleEliminar = (id) => {
        fetch(`http://localhost:8080/gastoAceite/${id}`, {
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
                header: "Proveedor",
                accessorKey: "proveedor",
            },
            {
                header: "Marca",
                accessorKey: "marca",
            },
            {
                header: "Kilometraje al momento",
                accessorKey: "kilometrajeActual",
            },
            {
                header: "Duracion Aceite",
                accessorKey: "duracion",
            },
            {
                header: "Fecha",
                accessorKey: "fecha",
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
                                id="btnModalInsertarRellenoAceite"
                                data-bs-toggle="modal"
                                data-bs-target="#modalInsertarRelleno"
                                onClick={() => handleOpenModal(row.original.id, row.original.numero_factura)}
                                startIcon={<LocalDrinkIcon style={{ color: 'blue' }} />} // Icono de aceite
                            >
                            </Button>

                            <Button
                                onClick={() => confirmDeleteAlert(row.original.id)}
                                startIcon={<DeleteIcon />}
                                color="error"
                            >
                            </Button>

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
                            <Tooltip arrow placement="right" title="Registrar Gasto">
                                <IconButton
                                    size="small"
                                    color="success"
                                    id="btnModalInsertarGastoA"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalInsertarGastoA"
                                >
                                    <FaPlus />
                                </IconButton>
                            </Tooltip>
                        </Box>


                    )}
                />
            </div>
            <ModalInsertarGastoA />
            <ModalRellenoAceite onClose={false} id_mantenimiento={idMantenimiento} numero_factura={numeroFactura} />
        </>
    );
};

export default TablaGastoAceite;