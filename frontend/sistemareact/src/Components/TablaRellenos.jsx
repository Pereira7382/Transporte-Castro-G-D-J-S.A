import React, { useState, useMemo, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ModalActualizarRelleno from "./ModalActualizarRelleno";

const TablaRellenos = ({ lista }) => {
    const [rellenoActualizar, setRellenoActualizar] = useState(null);
    const [rellenos, setRellenos] = useState(lista);

    const exportPDF = () => {
        // Lógica de exportación a PDF
    };

    const handleActualizar = (relleno) => {
        setRellenoActualizar({ ...relleno });
    };

    const columns = useMemo(
        () => [
            {
                header: "Fecha",
                accessorKey: "fecha",
            },
            {
                header: "Litros",
                accessorKey: "cantidad",
            },
            {
                header: "Monto",
                accessorKey: "monto",
            },
            {
                header: "Obervaciones",
                accessorKey: "observaciones",
            },
            {
                header: "Km al momento",
                accessorKey: "km_momento",
            },
        ],
        []
    );

    useEffect(() => {
        setRellenos(lista);
    }, [lista]);

    return (
        <>
            <div style={{ position: "relative", zIndex: 0 }}>
                <MaterialReactTable
                    enableFullScreenToggle={true}
                    enableDensityToggle={true}
                    columns={columns}
                    data={rellenos} // Cambiado de 'llantas' a 'rellenos'
                    localization={MRT_Localization_ES}
                    enableRowActions
                    positionActionsColumn="last"
                    options={{
                        exportButton: true,
                    }}
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Button
                                id="btnModalActualizar"
                                data-bs-toggle="modal"
                                data-bs-target="#modalActualizarRelleno"
                                onClick={() => handleActualizar(row.original)}
                                startIcon={<EditIcon />}
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
                        </Box>
                    )}
                />
            </div>
            <ModalActualizarRelleno
                relleno={rellenoActualizar}
                actualizarTablaRellenos={(nuevoRelleno) => {
                    const updatedRellenos = rellenos.map((relleno) =>
                        relleno.id === nuevoRelleno.id ? nuevoRelleno : relleno
                    );
                    setRellenos(updatedRellenos);
                }}
            />
        </>
    );
};

export default TablaRellenos;
